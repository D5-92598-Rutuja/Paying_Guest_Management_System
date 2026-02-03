package com.pg.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pg.dtos.BookingReqDTO;
import com.pg.service.BookingService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@PreAuthorize("hasRole('USER')")
@RequestMapping("/client/bookings")
public class ClientBookingController {

	private final BookingService bookingService;

    @PostMapping
    public ResponseEntity<?> bookRoom(@RequestBody BookingReqDTO dto,Authentication authentication) {

      

        Long bookingId = bookingService.createBooking(dto,authentication);
        

        return ResponseEntity.ok(bookingId);
    }
}
