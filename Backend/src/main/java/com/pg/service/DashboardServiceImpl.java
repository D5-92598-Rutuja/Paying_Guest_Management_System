package com.pg.service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pg.dtos.ActivityDTO;
import com.pg.dtos.DashboardDTO;
import com.pg.dtos.DashboardResponse;
import com.pg.entities.BillStatus;
import com.pg.entities.BookingStatus;
import com.pg.entities.Tickets.Ticket;
import com.pg.entities.Tickets.TicketStatus;
import com.pg.repository.BookingRepository;
import com.pg.repository.KycRepository;
import com.pg.repository.MonthlyBillRepository;
import com.pg.repository.PaymentRepository;
import com.pg.repository.RoomRepository;
import com.pg.repository.TicketRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class DashboardServiceImpl implements DashboardService {

    @Autowired
    private RoomRepository roomRepo;

    @Autowired
    private BookingRepository bookingRepo;

    @Autowired
    private TicketRepository ticketRepo;
    
    @Autowired
    private PaymentRepository paymentRepo;
    
    @Autowired
    private KycRepository kycRepo;
    
    @Autowired
    private MonthlyBillRepository monthlyBillRepository;

    @Override
    public DashboardResponse getDashboardData() {
        try {
        	int currentMonth = LocalDate.now().getMonthValue();
    	    int currentYear = LocalDate.now().getYear();
    	    
            long totalRooms = roomRepo.count();
            long bookedRooms = bookingRepo.countByStatus(BookingStatus.ACTIVE);
            long openTickets = ticketRepo.countByTicketStatus(TicketStatus.OPEN);
    	    BigDecimal totalOutstanding = monthlyBillRepository.sumAmountByStatusAndMonthYear(BillStatus.UNPAID, currentMonth, currentYear);
            		
            

            List<ActivityDTO> activities = getLatestActivities();

            DashboardDTO stats = new DashboardDTO(totalRooms, bookedRooms, openTickets,totalOutstanding);
            return new DashboardResponse(stats, activities);

        } catch (Exception e) {
            e.printStackTrace();
            // Safe defaults to prevent 500 errors
            return new DashboardResponse(new DashboardDTO(0, 0, 0,BigDecimal.ZERO), new ArrayList<>());
        }
    }
    
    private List<ActivityDTO> getLatestActivities() {
        List<ActivityDTO> activities = new ArrayList<>();

        // 1. Tickets
        ticketRepo.findTop5ByOrderByLastUpdatedDesc().forEach(t -> {
            activities.add(new ActivityDTO(
                t.getSubject() != null ? t.getSubject() : "No Subject",
                t.getLastUpdated() != null ? t.getLastUpdated() : LocalDateTime.now(),
                "TICKET"
            ));
        });

        // 2. Bookings
        bookingRepo.findTop5ByOrderByLastUpdatedDesc().forEach(b -> {
            activities.add(new ActivityDTO(
                "Booking updated: " + b.getId(),
                b.getLastUpdated() != null ? b.getLastUpdated() : LocalDateTime.now(),
                "BOOKING"
            ));
        });

        // 3. Payments
        paymentRepo.findTop5ByOrderByLastUpdatedDesc().forEach(p -> {
            Long bookingId = p.getBooking() != null ? p.getBooking().getId() : null;
            activities.add(new ActivityDTO(
                "Payment updated for booking: " + (bookingId != null ? bookingId : "N/A"),
                p.getLastUpdated() != null ? p.getLastUpdated() : LocalDateTime.now(),
                "PAYMENT"
            ));
        });

        // 4. KYC
        kycRepo.findTop5ByOrderByLastUpdatedDesc().forEach(k -> {
            Long userId = k.getUser() != null ? k.getUser().getId() : null;
            activities.add(new ActivityDTO(
                "KYC updated for user: " + (userId != null ? userId : "N/A"),
                k.getLastUpdated() != null ? k.getLastUpdated() : LocalDateTime.now(),
                "KYC"
            ));
        });

        // 5. Sort safely (now timestamps are never null)
        activities.sort((a, b) -> b.getTimestamp().compareTo(a.getTimestamp()));

        // 6. Return only latest 5
        return activities.size() > 5 ? activities.subList(0, 5) : activities;
    }

    
    
}