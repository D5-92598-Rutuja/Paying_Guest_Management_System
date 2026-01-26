package com.pg.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.pg.dtos.AllocateRoomDTO;
import com.pg.dtos.BookingReqDTO;
import com.pg.dtos.BookingRespDTO;
import com.pg.entities.Room;
import com.pg.service.BookingService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/bookings")
public class BookingController {

    private final BookingService bookingService;

    @PostMapping
    public ResponseEntity<String> bookRoom(@RequestBody BookingReqDTO dto) {

        Long userId = 1L;  

        bookingService.createBooking(dto, userId);

        return ResponseEntity.ok("Booking request created");
    }

    @GetMapping
    public ResponseEntity<List<BookingRespDTO>> getAll() {
        return ResponseEntity.ok(bookingService.getAllBookings());
    }

    @GetMapping("/pending")
    public ResponseEntity<List<BookingRespDTO>> getPending() {
        return ResponseEntity.ok(bookingService.getPendingBookings());
    }
    
    @PostMapping("/allocate")
    public ResponseEntity<String> allocateRoom(@RequestBody AllocateRoomDTO dto) {

        bookingService.allocateRoom(dto.getBookingId(), dto.getRoomId());
        return ResponseEntity.ok("Room Allocated Successfully");
    }


    @GetMapping("/available-rooms/{bookingId}")
    public ResponseEntity<List<Room>> getAvailableRooms(@PathVariable Long bookingId) {

        return ResponseEntity.ok(
                bookingService.getAvailableRoomsForBooking(bookingId)
        );
    }



}
