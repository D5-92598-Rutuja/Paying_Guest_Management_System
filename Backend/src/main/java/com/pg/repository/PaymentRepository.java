package com.pg.repository;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.pg.entities.MonthlyBill;
import com.pg.entities.Payment;
import com.pg.entities.PaymentStatus;

public interface PaymentRepository extends JpaRepository<Payment, Long>, JpaSpecificationExecutor<Payment> {

    // Dashboard metrics - current month
	@Query("""
		    SELECT COALESCE(SUM(p.amountPaid), 0) 
		    FROM Payment p 
		    WHERE YEAR(p.paymentDate) = YEAR(CURRENT_DATE) 
		    AND MONTH(p.paymentDate) = MONTH(CURRENT_DATE)
		    AND p.paymentStatus = PaymentStatus.COMPLETED
		""")
		BigDecimal getCurrentMonthRevenue();


    @Query("""
        SELECT COUNT(p) 
        FROM Payment p 
        WHERE p.paymentStatus = :status 
        AND YEAR(p.paymentDate) = YEAR(CURRENT_DATE) 
        AND MONTH(p.paymentDate) = MONTH(CURRENT_DATE)
        """)
    long getCurrentMonthCountByStatus(@Param("status") PaymentStatus status);

    // By month range (for last 3 months filter)
    Page<Payment> findByPaymentDateBetween(LocalDateTime start, LocalDateTime end, Pageable pageable);
    
    //GET Total Revenue for Month (including failed one- for expected revenue)
    @Query("SELECT SUM(p.amountPaid) FROM Payment p WHERE YEAR(p.paymentDate) = :year AND MONTH(p.paymentDate) = :month")
    BigDecimal getRevenueByMonth(@Param("year") int year, @Param("month") int month);
    
    Page<Payment> findAll(Specification<Payment> spec, Pageable pageable);
    
    Optional<Payment> findByTransactionId(String transactionId);
    

    @Query("SELECT p FROM Payment p WHERE p.transactionId = :transactionId AND p.paymentStatus = :status")
    Optional<Payment> findFirstByTransactionIdAndPaymentStatus(
        @Param("transactionId") String transactionId, 
        @Param("status") PaymentStatus status);
    
    //Admin-Dashboard
    List<Payment> findTop5ByOrderByLastUpdatedDesc();
       
}
