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
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;



@RestController
@RequestMapping("/admin/recurring")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000","http://localhost:5174"}) 
@Validated
@Slf4j
public class AdminRecurringPaymentController {

    private final PaymentService paymentService;
    
    @PostConstruct
    public void init() {
        log.info("**********{} is up and running on /api/payments", getClass().getSimpleName());
    }
    
    @PostMapping("/generate-monthly-bills")
    public ResponseEntity<?> generateMonthlyBills() {
    	ApiResponse response = paymentService.generateMonthlyBills();
        return ResponseEntity.ok(response);
    }



}
