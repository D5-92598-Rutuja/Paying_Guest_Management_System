package com.pg.controller;

import java.time.LocalDateTime;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.pg.dtos.CashPaymentReqDTO;
import com.pg.dtos.MonthlyBillRespDTO;
import com.pg.dtos.MonthlyBillsSummaryDTO;
import com.pg.dtos.PaymentReqDTO;
import com.pg.dtos.PaymentRespDTO;
import com.pg.entities.Payment;
import com.pg.entities.PaymentStatus;
import com.pg.entities.PaymentType;
import com.pg.payloads.StripePaymentReqDTO;
import com.pg.repository.PaymentRepository;
import com.pg.service.PaymentService;

import jakarta.annotation.PostConstruct;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;



@RestController
@PreAuthorize("hasRole('ADMIN')")
@RequestMapping("/admin/payments")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000","http://localhost:5174"}) 
@RequiredArgsConstructor
@Slf4j

public class AdminPaymentController {

	@Autowired
    private PaymentService paymentService;
	
	
    @PostConstruct
    public void init() {
        log.info("**********{} is up and running on /admin/payments", getClass().getSimpleName());
    }
	
    //FOR ADMIN- Monthly Revenue Card- at top left - Get summary for all the payments 

    @GetMapping("/dashboard")
    public ResponseEntity<Map<String, Object>> getDashboardMetrics() {
    	log.info("getDashboardMetrics()"+ getClass());
        return ResponseEntity.ok(paymentService.getDashboardMetrics());
    }

    //FOR ADMIN - Getting all the Payment recods - Pagination
    @PostMapping 
    public ResponseEntity<Page<PaymentRespDTO>> getPayments(@Valid @RequestBody PaymentReqDTO req) {
    	System.out.println("getPayments() : "+ getClass());

        return ResponseEntity.ok(paymentService.getPayments(
            req.getPage(), req.getSize(), 
            req.getStatus(), req.getType(), 
            req.getMonthYear(), req.getSearch()
        ));
    }
    
    
    //FOR ADMIN - To Record Cash Payment from View Bookings Pannel
    @PostMapping("/cash")
    public ResponseEntity<Void> markCashPayment(@Valid @RequestBody CashPaymentReqDTO req) {
        paymentService.processCashPayment(req);
        return ResponseEntity.ok().build();
    }
    
    //FOR ADMIN - TO see all the monthly bills record
    @GetMapping("/monthly-bills")
    public ResponseEntity<Page<MonthlyBillRespDTO>> getAllMonthlyBills(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        
        log.info("Fetching all monthly bills: page={}, size={}", page, size);
        
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "dueDate"));
        Page<MonthlyBillRespDTO> bills = paymentService.getAllMonthlyBills(pageable);
        
        return ResponseEntity.ok(bills);
    }

    //FOR ADMIN- Monthly Payment Card- at top left - Get summary for monthly bill card 
    @GetMapping("/monthly-bills/summary")
    public ResponseEntity<MonthlyBillsSummaryDTO> getMonthlyBillsSummary() {
        MonthlyBillsSummaryDTO summary = paymentService.getMonthlyBillsSummary();
        log.info("Monthly bills summary: total={}, unpaid={}, outstanding=₹{}", 
                 summary.getTotalRecords(), summary.getUnpaidCount(), summary.getTotalOutstanding());
        return ResponseEntity.ok(summary);
    }





}
