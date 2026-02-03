package com.pg.repository;

import com.pg.entities.BillStatus;
import com.pg.entities.MonthlyBill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface MonthlyBillRepository extends JpaRepository<MonthlyBill, Long> {
    
    //bookingId (matches entity field)
    List<MonthlyBill> findByBookingIdOrderByDueDateAsc(Long bookingId);
    
    //For unpaid bills
    List<MonthlyBill> findByBookingIdAndStatusOrderByDueDateAsc(Long bookingId, BillStatus status);
    
    //Unique bill lookup
    Optional<MonthlyBill> findByBookingIdAndMonthAndYear(Long bookingId, Integer month, Integer year);
    
    //Overdue unpaid bills
    List<MonthlyBill> findByBookingIdAndDueDateBeforeAndStatusOrderByDueDateAsc(
        Long bookingId, LocalDate date, BillStatus status);
   
    
 // MonthlyBillRepository.java
    
    @Query("""
    	    SELECT COUNT(b) FROM MonthlyBill b 
    	    WHERE b.month = :month AND b.year = :year
    	    """)
    	Long countByMonthYear(@Param("month") Integer month, @Param("year") Integer year);
    
    @Query("""
    	    SELECT COUNT(b) FROM MonthlyBill b 
    	    WHERE b.status = :status 
    	    AND b.month = :month 
    	    AND b.year = :year
    	    """)
    	Long countByStatusAndMonthYear(@Param("status") BillStatus status, 
    	                               @Param("month") Integer month, 
    	                               @Param("year") Integer year);

    	@Query("""
    	    SELECT COALESCE(SUM(b.amount), 0) FROM MonthlyBill b 
    	    WHERE b.status = :status 
    	    AND b.month = :month 
    	    AND b.year = :year
    	    """)
    	BigDecimal sumAmountByStatusAndMonthYear(@Param("status") BillStatus status, 
    	                                         @Param("month") Integer month, 
    	                                         @Param("year") Integer year);


}
