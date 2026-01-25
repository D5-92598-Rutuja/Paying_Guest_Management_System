package com.pg.service;

import java.util.List;

import com.pg.entities.Kyc;

public interface KycService {

    List<Kyc> getPendingKycs();

    long getPendingCount();

    Kyc approveKyc(String kycCode, String adminName);

    Kyc rejectKyc(String kycCode, String reason, String adminName);
}
