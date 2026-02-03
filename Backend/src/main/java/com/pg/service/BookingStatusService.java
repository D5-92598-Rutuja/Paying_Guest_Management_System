package com.pg.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.pg.repository.BookingRepository;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class BookingStatusService {
    
    @Autowired
    private BookingRepository bookingRepository;
    
    @Scheduled(cron = "0 0 0 * * ?")  // Daily at midnight
    //@Scheduled(cron = "* * * * * ?")
    public void updateBookingStatuses() {
        int updated = bookingRepository.activateBookings();
        log.info("Activated {} bookings", updated);
    }
}

