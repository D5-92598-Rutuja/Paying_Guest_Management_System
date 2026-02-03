package com.pg.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pg.entities.Allocation;
import com.pg.entities.AllocationStatus;

public interface AllocationRepository extends JpaRepository<Allocation, Long> {

    Optional<Allocation> findByBooking_Id(Long bookingId);
    
    List<Allocation> findByIsVerifiedTrueAndIsPaymentDoneTrueAndAllocationStatus(AllocationStatus status);
    
   // Optional<Allocation> findByBookingId(Long bookingId);
    
    //Room Profile
   // Optional<Allocation> findTopByUserIdOrderByCreatedOnDesc(Long userId);
    Optional<Allocation> findTopByUserEmailOrderByCreatedOnDesc(String email);
    
}
