package com.pg.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pg.entities.Booking;
import com.pg.entities.RentPolicy;
import com.pg.entities.SharingType;

public interface RentPolicyRepository extends JpaRepository<RentPolicy, SharingType> {

	Optional<RentPolicy> findBySharingType(SharingType sharingType);
}
