package com.pg.service;

import com.pg.dtos.ApiResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class RecurringPaymentScheduler {

    private final PaymentService paymentService;
    
    @Scheduled(cron = "0 0 1 1 * ?") // 1 AM on 1st of every month
//    @Scheduled(cron = "*/10 * * * * ?")
    public void processMonthlyBills() {
        log.info("Starting automatic monthly bill generation...");
        
        try {
            // Calls YOUR existing generateMonthlyBills() method
            ApiResponse response = paymentService.generateMonthlyBills();
            log.info("Monthly bills generated successfully: {}", response);
        } catch (Exception e) {
            log.error("Failed to generate monthly bills", e);
        }
    }
}
