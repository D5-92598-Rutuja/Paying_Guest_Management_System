package com.pg.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pg.entities.Kyc;
import com.pg.entities.KycStatus;
import com.pg.repository.KycRepository;

@Service
public class KycServiceImpl implements KycService {

    @Autowired
    private KycRepository kycRepository;

    @Override
    public List<Kyc> getPendingKycs() {
        return kycRepository.findByStatus(KycStatus.PENDING);
    }

    @Override
    public long getPendingCount() {
        return kycRepository.countByStatus(KycStatus.PENDING);
    }

    @Override
    public Kyc approveKyc(String kycCode, String adminName) {
        Kyc kyc = kycRepository.findByKycCode(kycCode)
                .orElseThrow(() -> new RuntimeException("KYC not found"));

        kyc.setStatus(KycStatus.APPROVED);
        kyc.setReviewedBy(adminName);
        kyc.setReviewedOn(LocalDate.now());

        return kycRepository.save(kyc);
    }

    @Override
    public Kyc rejectKyc(String kycCode, String reason, String adminName) {
        Kyc kyc = kycRepository.findByKycCode(kycCode)
                .orElseThrow(() -> new RuntimeException("KYC not found"));

        kyc.setStatus(KycStatus.REJECTED);
        kyc.setRejectionReason(reason);
        kyc.setReviewedBy(adminName);
        kyc.setReviewedOn(LocalDate.now());

        return kycRepository.save(kyc);
    }
}
