package com.pg.service; 

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pg.dtos.ApiResponse;
import com.pg.dtos.CashPaymentReqDTO;
import com.pg.dtos.MonthlyBillRespDTO;
import com.pg.dtos.MonthlyBillsSummaryDTO;
import com.pg.dtos.PaymentReqDTO;
import com.pg.dtos.PaymentRespDTO;
import com.pg.entities.BillStatus;
import com.pg.entities.Booking;
import com.pg.entities.BookingStatus;
import com.pg.entities.MonthlyBill;
import com.pg.entities.Payment;
import com.pg.entities.PaymentCategory;
import com.pg.entities.PaymentStatus;
import com.pg.entities.PaymentType;
import com.pg.entities.RentPolicy;
import com.pg.entities.Room;
import com.pg.payloads.StripePaymentReqDTO;
import com.pg.repository.BookingRepository;
import com.pg.repository.MonthlyBillRepository;
import com.pg.repository.PaymentRepository;
import com.pg.repository.RentPolicyRepository;
import com.pg.repository.RoomRepository;
import com.pg.service.PaymentService;
import com.pg.specifications.PaymentSpecifications;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import com.stripe.exception.SignatureVerificationException;
import com.stripe.model.Event;
import com.stripe.model.PaymentIntent;
import com.stripe.net.Webhook;
import org.springframework.beans.factory.annotation.Value;

@Service
@Transactional
public class PaymentServiceImpl implements PaymentService {

	@Autowired
	private PaymentRepository paymentRepository;

	@Autowired
	private BookingRepository bookingRepository;

	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	private MonthlyBillRepository monthlyBillRepository;
	
	@Autowired
	private RentPolicyRepository rentPolicyRepository;
	
	@Autowired
	private RoomRepository roomRepository;

	@Value("${stripe.api.key}")
	private String stripeApiKey;

	@Value("${app.frontend.url}")
	private String frontendUrl;
	


	@Override
	public Map<String, Object> getDashboardMetrics() {
		Map<String, Object> metrics = new HashMap<>();

		//Names are misleading here , I have consider for this month and this year
		metrics.put("totalRevenue", paymentRepository.getCurrentMonthRevenue());
		metrics.put("failedTransactions", paymentRepository.getCurrentMonthCountByStatus(PaymentStatus.FAILED));
		metrics.put("pendingTransactions", paymentRepository.getCurrentMonthCountByStatus(PaymentStatus.PENDING));

		// Last 3 Months Revenue for Graph
		List<Map<String, Object>> revenueTrend = new ArrayList<>();
		LocalDate now = LocalDate.now();

		for (int i = 2; i >= 0; i--) {
			YearMonth ym = YearMonth.from(now.minusMonths(i));
			BigDecimal monthlyRevenue = paymentRepository.getRevenueByMonth(ym.getYear(), ym.getMonthValue());

			Map<String, Object> dataPoint = new LinkedHashMap<>();
			dataPoint.put("month", ym.getMonth().name().substring(0, 3)); // "JAN", "FEB"
			dataPoint.put("revenue", monthlyRevenue != null ? monthlyRevenue : BigDecimal.ZERO);
			revenueTrend.add(dataPoint);
		}
		metrics.put("revenueTrend", revenueTrend);

		return metrics;
	}

	@Override
	public Page<PaymentRespDTO> getPayments(int page, int size, String status, String type, String monthYear,
			String search) {
		Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "paymentDate"));
		Specification<Payment> spec = PaymentSpecifications.filter(status, type, monthYear);

		// Add search spec if needed
		if (search != null && !search.trim().isEmpty()) {
			// spec = spec.and(PaymentSpecifications.search(search));
		}

		Page<Payment> paymentPage = paymentRepository.findAll(spec, pageable);

		Page<PaymentRespDTO> dtoPage = paymentPage.map(payment -> {
			PaymentRespDTO dto = modelMapper.map(payment, PaymentRespDTO.class);
			// Use JOIN FETCH in repo or DTO projection
			// For now, simple concat (add @EntityGraph in repo for production)
            if (payment.getBooking() != null && payment.getBooking().getUser() != null) {
                dto.setUserName(payment.getBooking().getUser().getFirstName() + " " + 
                               payment.getBooking().getUser().getLastName());
            }

			return dto;
		});
		return dtoPage;
	}

	@Override
	public void processCashPayment(CashPaymentReqDTO req) {
		// 1. Find booking
        Booking booking = bookingRepository.findById(req.getBookingId())
                .orElseThrow(() -> new IllegalArgumentException("Booking not found: " + req.getBookingId()));

		// 2. Create Payment entity
		Payment payment = new Payment();

		payment.setBooking(booking);
		payment.setAmountPaid(req.getAmount() != null ? req.getAmount() : BigDecimal.ZERO);
		payment.setPaymentType(PaymentType.CASH);
		payment.setCategory(PaymentCategory.MAINTENANCE); //later take this from admin form
		payment.setPaymentStatus(PaymentStatus.COMPLETED);
		payment.setPaymentDate(LocalDateTime.now());
		payment.setTransactionId("CASH_" + System.currentTimeMillis());
		payment.setRemark(req.getRemark() != null ? req.getRemark() : "Cash payment recorded by admin");

		// 3. Persist payment
		paymentRepository.save(payment);

		// 4. Optionally: update booking.paymentStatus via trigger or here
		// booking.setPaymentStatus(PaymentStatus.COMPLETED);
		// bookingRepository.save(booking);
	}

	// stripe

	@Override
	@Transactional
	public Map<String, Object> createStripeSession(StripePaymentReqDTO req) {
		Stripe.apiKey = stripeApiKey;

		Booking booking = bookingRepository.findById(req.getBookingId())
				.orElseThrow(() -> new RuntimeException("Booking not found: " + req.getBookingId()));

		Payment payment = new Payment();
		payment.setBooking(booking);
		payment.setAmountPaid(req.getAmount());
		payment.setPaymentType(PaymentType.STRIPE);
		payment.setPaymentStatus(PaymentStatus.PENDING);
		payment.setCategory(PaymentCategory.ADVANCE);
		payment.setPaymentDate(LocalDateTime.now());
		payment.setRemark("Stripe Checkout Initiated");

		Payment savedPayment = paymentRepository.save(payment);

		try {
			// Use frontendUrl dynamically
			String successUrl = frontendUrl + "/home/payment-success?session_id={CHECKOUT_SESSION_ID}";
			String cancelUrl = frontendUrl + "/home/rooms";

			SessionCreateParams params = SessionCreateParams.builder().setMode(SessionCreateParams.Mode.PAYMENT)
					.setSuccessUrl(successUrl) 
					.setCancelUrl(cancelUrl)
					.setCustomerEmail(booking.getUser().getEmail())
					.addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD)
					.addLineItem(SessionCreateParams.LineItem.builder().setQuantity(1L)
							.setPriceData(SessionCreateParams.LineItem.PriceData.builder().setCurrency("inr")
									.setUnitAmount(req.getAmount().multiply(BigDecimal.valueOf(100)).longValue())
									.setProductData(SessionCreateParams.LineItem.PriceData.ProductData.builder()
											.setName("PG Booking #" + booking.getId())
											.setDescription("Room: " + booking.getRoomType()).build())
									.build())
							.build())
					.putMetadata("payment_id", String.valueOf(savedPayment.getId()))
					.putMetadata("booking_id", String.valueOf(booking.getId())).build();

			Session session = Session.create(params);

			savedPayment.setTransactionId(session.getId()); // Store cs_test_a1ShEprk...
			Payment persistedPayment = paymentRepository.save(savedPayment); // Update record
		

			Map<String, Object> response = new HashMap<>();
			response.put("url", session.getUrl());
			response.put("sessionId", session.getId());

			return response;

		} catch (Exception e) {
			throw new RuntimeException("Error creating Stripe session", e);
		}
	}


	// Record in Database
//	@Transactional
	public void recordAdvancePayment(String sessionId) {
		// 1. Find payment by Stripe session ID
		Payment payment = paymentRepository.findByTransactionId(sessionId)
				.orElseThrow(() -> new RuntimeException("Payment not found for session: " + sessionId));
		

	    //System.out.println("++++++++++++++++recordAdvancePayment() "+getClass());
		// 2. Mark as ADVANCE/SUCCESS
		payment.setPaymentStatus(PaymentStatus.COMPLETED);
		payment.setRemark("ADVANCE Payment - Frontend Confirmed");
		Payment savedPayment = paymentRepository.save(payment);
		
		if(savedPayment.getPaymentStatus() != PaymentStatus.COMPLETED) {
			throw new RuntimeException("Error in Saving Payment in Database");
		}

		// 3. Update Booking status
		Booking booking = bookingRepository.findById(payment.getBooking().getId()).orElseThrow();
		booking.setStatus(BookingStatus.COMPLETED);
		bookingRepository.save(booking);
	}
	

	// Monthly recurring payments

	@Transactional
	public ApiResponse generateMonthlyBills() {
	    int created = 0;
	    int skipped = 0;
	    
	    LocalDate today = LocalDate.now();   
        int month = today.getMonthValue();   
        int year  = today.getYear();

	    List<Booking> activeBookings = bookingRepository.findByStatusAndEndDateAfterOrNull(BookingStatus.ACTIVE, today);

	    for (Booking booking : activeBookings) {
	        // Skip if bill already exists
	        if (monthlyBillRepository.findByBookingIdAndMonthAndYear(booking.getId(), month, year).isPresent()) {
	            skipped++;
	            continue;
	        }

	        //Can be conflict here
//	        Room room = roomRepository.findById(booking.getRoom().getId()).orElseThrow();
	        
	        // 2. Get RentPolicy for room_type
	        RentPolicy policy = rentPolicyRepository.findBySharingType(booking.getRoomType())
	            .orElseThrow(() -> new RuntimeException("No rent policy for " + booking.getRoomType()));

	        MonthlyBill bill = new MonthlyBill();
	        bill.setBookingId(booking.getId());
	        bill.setMonth(month);
	        bill.setYear(year);
	        BigDecimal rentAmount = BigDecimal.valueOf(policy.getRentPerBed());
	        bill.setAmount(rentAmount); 
	        bill.setDueDate(LocalDate.of(year, month, 5));
	        bill.setStatus(BillStatus.UNPAID);

	        monthlyBillRepository.save(bill);
	        created++;
	    }

	    String message = String.format("Bills generated for %d/%d | created=%d, skipped=%d", 
	                                  month, year, created, skipped);
	    
	    return new ApiResponse(message, "SUCCESS");
	}

	
	
	//get monthly 
	public List<MonthlyBill> getUnpaidBills(String email) {
	//User user= userRepository.findByEmail(email).orElseThrow(()-> new UserNotFoundException("User not found "+getClass()));
		
		Allocation allocationDetails=allocationRepository.findTopByUserEmailOrderByCreatedOnDesc(email)
									.orElseThrow(()-> new UserNotFoundException("User not found "+getClass()));;
		
	    return monthlyBillRepository.findByBookingIdAndStatusOrderByDueDateAsc(
	    		allocationDetails.getBooking().getId(), BillStatus.UNPAID);
	}
	
	
	//For monthly payment stripe - session
	@Override
	public Map<String, Object> createBillPaymentSession(Long billId) {
		Stripe.apiKey = stripeApiKey;

	    MonthlyBill bill = monthlyBillRepository.findById(billId)
	        .orElseThrow(() -> new RuntimeException("Bill not found"));
	    
	    if (!bill.getStatus().equals(BillStatus.UNPAID)) {
	        throw new RuntimeException("Bill already paid");
	    }
        Booking booking = bookingRepository.findById(bill.getBookingId())
                .orElseThrow(() -> new IllegalArgumentException("Booking not found: " + bill.getBookingId()));
        
	    // Create pending payment record (as per your prior flow)
	    Payment payment = new Payment();
	    payment.setBooking(booking);
	    payment.setAmountPaid(bill.getAmount());
		payment.setPaymentDate(LocalDateTime.now());
	    payment.setPaymentType(PaymentType.STRIPE);
	    payment.setPaymentStatus(PaymentStatus.PENDING);
	    payment.setCategory(PaymentCategory.RENT);
	    payment.setRemark("Monthly Bill #" + bill.getId() + " (" + bill.getMonth() + "/" + bill.getYear() + ")");
	    Payment savedPayment = paymentRepository.save(payment);
	    
	    // Stripe Checkout Session (payment mode for one-time bill)
	    Map<String, Object> params = new HashMap<>();
	    params.put("payment_method_types", Arrays.asList("card"));
	    params.put("line_items", Arrays.asList(
	        Map.of(
	            "price_data", Map.of(
	                "currency", "inr",
	                "product_data", Map.of("name", "Monthly Bill #" + billId),
	                "unit_amount", bill.getAmount().multiply(new BigDecimal(100)).longValue()
	            ),
	            "quantity", 1
	        )
	    ));
	    params.put("mode", "payment");  // One-time, not subscription [web:46]
	    params.put("success_url", frontendUrl + "/home/bill-payment-success?session_id={CHECKOUT_SESSION_ID}&billId=" + billId);
	    params.put("cancel_url", frontendUrl + "/home/payments?booking=" + bill.getBookingId());
	    params.put("metadata", Map.of("billId", billId.toString(), "paymentId", savedPayment.getId().toString()));
	    
	    Session session;
	    try {
	        session = Session.create(params);
	    	savedPayment.setTransactionId(session.getId()); // Store cs_test_a1ShEprk...
			paymentRepository.save(savedPayment); // Update record
	    } catch (StripeException e) {
	        throw new RuntimeException("Error creating Stripe session", e);
	    }
	    
	    Map<String, Object> response = new HashMap<>();
	    response.put("url", session.getUrl());
	    response.put("sessionId", session.getId());
	    return response;
	}
	
	@Transactional
	public ApiResponse recordBillPayment(String sessionId, String sbillId) {
	    // 1. Find the PENDING payment by Stripe Session ID
	    Payment payment = paymentRepository.findByTransactionId(sessionId)
	        .orElseThrow(() -> new RuntimeException("Payment not found for session: " + sessionId));

	    // 2. Already processed? (Idempotency)
	    if (payment.getPaymentStatus() == PaymentStatus.COMPLETED) {
	        return new ApiResponse("Payment already processed (idempotent)", "SUCCESS");  // 👈 Early return
	    }

	    // 3. Mark Payment as COMPLETED
	    payment.setPaymentStatus(PaymentStatus.COMPLETED);
	    payment.setRemark("Bill Payment - Frontend Success");
	    payment.setLastUpdated(LocalDateTime.now());
	    paymentRepository.save(payment);

	    // 4. Find & Update the MonthlyBill
	    Long billId = Long.valueOf(sbillId);
	    MonthlyBill bill = monthlyBillRepository.findById(billId)
	        .orElseThrow(() -> new RuntimeException("Bill not found: " + billId));

	    bill.setStatus(BillStatus.PAID);
	    bill.setPaidDate(LocalDate.now());
	    bill.setPaymentId(payment.getId());
	    bill.setLastUpdated(LocalDateTime.now());
	    monthlyBillRepository.save(bill);
	    
	    // Rich success message
	    return new ApiResponse(
	        String.format("Bill #%d marked PAID via payment #%d", billId, payment.getId()),
	        "SUCCESS"
	    );
	}

		
	@Override
	public Page<MonthlyBillRespDTO> getAllMonthlyBills(Pageable pageable) {
	    Page<MonthlyBill> bills = monthlyBillRepository.findAll(pageable);
	    return bills.map(this::toDto);
	}

	private MonthlyBillRespDTO toDto(MonthlyBill bill) {
	    return MonthlyBillRespDTO.builder()
	            .billId(bill.getId())
	            .amount(bill.getAmount())
	            .bookingId(bill.getBookingId())
	            .dueDate(bill.getDueDate())
	            .month(bill.getMonth())
	            .monthName(bill.getMonthName(bill.getMonth()))
	            .year(bill.getYear())
	            .status(bill.getStatus().toString())
	            .paidDate(bill.getPaidDate())
	            .paymentId(bill.getPaymentId())
	            .build();
	}
	
	@Override
	public MonthlyBillsSummaryDTO getMonthlyBillsSummary() {
	    // Current month/year
	    int currentMonth = LocalDate.now().getMonthValue();
	    int currentYear = LocalDate.now().getYear();
	    
	    // Total records (ALL TIME)
	    Long totalRecords = monthlyBillRepository.countByMonthYear(currentMonth, currentYear);
	    
	    // Current month stats
	    Long unpaidCount = monthlyBillRepository.countByStatusAndMonthYear(BillStatus.UNPAID, currentMonth, currentYear);
	    BigDecimal totalOutstanding = monthlyBillRepository.sumAmountByStatusAndMonthYear(BillStatus.UNPAID, currentMonth, currentYear);
	    BigDecimal totalCollected = monthlyBillRepository.sumAmountByStatusAndMonthYear(BillStatus.PAID, currentMonth, currentYear);

	    
	    Double collectionRate = totalCollected.add(totalOutstanding).compareTo(BigDecimal.ZERO) > 0 
	        ? totalCollected.divide(totalCollected.add(totalOutstanding), 2, RoundingMode.HALF_UP)
	            .multiply(BigDecimal.valueOf(100)).doubleValue()
	        : 0.0;

	    return MonthlyBillsSummaryDTO.builder()
	            .totalRecords(totalRecords)
	            .unpaidCount(unpaidCount)
	            .totalOutstanding(totalOutstanding)
	            .totalCollected(totalCollected)
	            .collectionRate(collectionRate)
	            .build();
	}

}
