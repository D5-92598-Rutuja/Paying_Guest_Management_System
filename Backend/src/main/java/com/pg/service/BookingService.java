package com.pg.service;

import java.util.List;

import org.springframework.security.core.Authentication;

import com.pg.dtos.AllocationRespDTO;
import com.pg.dtos.BookingReqDTO;
import com.pg.dtos.BookingRespDTO;
import com.pg.entities.Room;

public interface BookingService {

    Long createBooking(BookingReqDTO dto,Authentication authentication);

    List<BookingRespDTO> getAllBookings();

    List<BookingRespDTO> getPendingBookings();
    
    void allocateRoom(Long bookingId, Long roomId);
    
    List<Room> getAvailableRoomsForBooking(Long bookingId);
    
    List<AllocationRespDTO> getReadyForAllocation();
    
    List<BookingRespDTO> getBookingsReadyForAllocation();

}
