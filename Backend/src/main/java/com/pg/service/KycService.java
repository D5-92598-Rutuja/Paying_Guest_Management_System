package com.pg.service;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.pg.entities.Kyc;


public interface KycService {

    Kyc getKycByUser(String email);

    void uploadAadhaar(String email, MultipartFile file) throws IOException;

    void uploadPhoto(String email, MultipartFile file) throws IOException;

    void submitKyc(String email);

    void approveKyc(String kycCode);

    void rejectKyc(String kycCode);

    List<Kyc> getPendingKycs();

    long getPendingCount();
}
