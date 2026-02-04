package com.pg.controller;

import com.pg.payloads.RecordAdvancePaymentReqDTO;
import com.pg.payloads.StripePaymentReqDTO;
import com.pg.service.PaymentService;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Slf4j
@RestController
@PreAuthorize("hasRole('USER')")
@RequestMapping("/client/payments") 
@RequiredArgsConstructor
//@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000","http://localhost:5174"}) 
public class ClientPaymentController {

	@Autowired
    private PaymentService paymentService;
	
    @PostConstruct
    public void init() {
        log.info("**********{} is up and running on /client/payments", getClass().getSimpleName());
    }

    // 1. CREATE checkout session (Pay button)
    @PostMapping("/create-checkout-session")
    public ResponseEntity<Map<String, Object>> createCheckoutSession(
            @RequestBody StripePaymentReqDTO request) {
        
        return ResponseEntity.ok(paymentService.createStripeSession(request));
    }
    
    // 2. RECORD advance payment (Success page)
    @PostMapping("/record-advance-payment")
    public ResponseEntity<String> recordAdvancePayment(
            @RequestBody RecordAdvancePaymentReqDTO request) {
        
        paymentService.recordAdvancePayment(request.getSessionId());
        return ResponseEntity.ok("Advance payment recorded successfully");
    }

}
