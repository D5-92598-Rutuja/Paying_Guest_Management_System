package com.pg.controller;

import com.pg.dtos.ApiResponse;
import com.pg.entities.MonthlyBill;
import com.pg.service.PaymentService;

import jakarta.annotation.PostConstruct;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/client/recurring")
@PreAuthorize("hasRole('USER')")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:5173","http://localhost:5174"}) 
@Validated
@Slf4j
public class ClientRecurringPaymentController {

    private final PaymentService paymentService;
    
    
    @PostConstruct
    public void init() {
        log.info("**********{} is up and running on /api/payments", getClass().getSimpleName());
    }

    // Get unpaid bills for a user/booking
    @GetMapping("/bills")
    public ResponseEntity<List<MonthlyBill>> getUnpaidBills(Authentication authentication) {
    	String email = authentication.getPrincipal().toString();
        
        List<MonthlyBill> bills = paymentService.getUnpaidBills(email);
        return ResponseEntity.ok(bills);
    }
    
    //STRIPE Session
    @PostMapping("/pay-bill/{billId}")
    public ResponseEntity<Map<String, Object>> createBillPaymentSession(@PathVariable Long billId) {
        Map<String, Object> response = paymentService.createBillPaymentSession(billId);
        return ResponseEntity.ok(response);
    }

    //Recording payment in database
    @PostMapping("/record-bill-payment")
    public ResponseEntity<?> recordBillPayment(@RequestBody Map<String, String> request) {
        String sessionId = request.get("sessionId");
        String billId = request.get("billId");
    	ApiResponse response = paymentService.recordBillPayment(sessionId,billId);

        return ResponseEntity.ok(response);
    }

}
