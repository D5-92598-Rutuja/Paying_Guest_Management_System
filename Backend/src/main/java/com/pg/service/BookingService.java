package com.pg.service;

import java.util.List;
import com.pg.dtos.BookingReqDTO;
import com.pg.dtos.BookingRespDTO;
import com.pg.entities.Room;

public interface BookingService {

    void createBooking(BookingReqDTO dto, Long userId);

    List<BookingRespDTO> getAllBookings();

    List<BookingRespDTO> getPendingBookings();
    
    void allocateRoom(Long bookingId, Long roomId);
    
    List<Room> getAvailableRoomsForBooking(Long bookingId);
}
