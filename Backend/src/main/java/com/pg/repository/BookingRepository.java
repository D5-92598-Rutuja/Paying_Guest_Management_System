package com.pg.repository;

import java.time.LocalDate;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.pg.entities.Booking;
import com.pg.entities.BookingStatus;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    List<Booking> findByStatus(BookingStatus status);
    
    // // PAYMENT - For recurring bills - Active bookings not expired
     @Query("""
    	    SELECT b FROM Booking b 
    	    WHERE b.status = :status 
    	      AND (
    	        (b.endDate IS NULL) OR 
    	        (b.endDate IS NOT NULL AND b.endDate > :today)
    	      )
    	    """)
    	List<Booking> findByStatusAndEndDateAfterOrNull(
    	    @Param("status") BookingStatus status, 
    	    @Param("today") LocalDate today
    	);

//    List<Booking> findByStatusAndEndDateAfter(BookingStatus status, LocalDate date);
    
    @Modifying
    @Transactional
    @Query("""
        UPDATE Booking b 
        SET b.status = 'ACTIVE'
        WHERE b.status = 'APPROVED'
        AND b.status != 'ACTIVE'
          AND CURRENT_DATE >= b.joinDate
          AND (b.endDate IS NULL OR CURRENT_DATE <= b.endDate)
        """)
    int activateBookings();
