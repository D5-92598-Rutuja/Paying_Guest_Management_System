package com.pg.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pg.entities.Kyc;
import com.pg.entities.KycStatus;
import com.pg.entities.User;

public interface KycRepository extends JpaRepository<Kyc, Long> {

    Optional<Kyc> findByUser(User user);

    Optional<Kyc> findByKycCode(String kycCode);

    List<Kyc> findByStatus(KycStatus status);

    long countByStatus(KycStatus status);
    
  //Admin-Dashboard
    List<Kyc> findTop5ByOrderByLastUpdatedDesc();
}
