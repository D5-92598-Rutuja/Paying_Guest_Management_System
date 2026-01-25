package com.pg.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pg.entities.Kyc;
import com.pg.entities.KycStatus;

public interface KycRepository extends JpaRepository<Kyc, Long> {

    List<Kyc> findByStatus(KycStatus status);

    Optional<Kyc> findByKycCode(String kycCode);

    long countByStatus(KycStatus status);
}

