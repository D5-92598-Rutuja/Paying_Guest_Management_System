package com.pg.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.pg.entities.RentPolicy;
import com.pg.entities.SharingType;

public interface RentPolicyRepository extends JpaRepository<RentPolicy, SharingType> {
}
