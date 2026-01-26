package com.pg.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.pg.entities.Booking;
import com.pg.entities.BookingStatus;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    List<Booking> findByStatus(BookingStatus status);

    List<Booking> findByStatusAndRoomIsNull(BookingStatus status);
}
