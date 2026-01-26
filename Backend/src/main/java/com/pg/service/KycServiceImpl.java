package com.pg.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.pg.entities.Kyc;
import com.pg.entities.KycStatus;
import com.pg.entities.User;
import com.pg.repository.KycRepository;
import com.pg.repository.UserRepository;

@Service
public class KycServiceImpl implements KycService {

    private final String BASE_DIR = "files/kyc/";

    @Autowired
    private KycRepository kycRepo;

    @Autowired
    private UserRepository userRepo;

    private String saveFile(MultipartFile file, String type) throws IOException {
        String dir = BASE_DIR + type + "/";
        Files.createDirectories(Paths.get(dir));

        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
        Path path = Paths.get(dir + fileName);
        Files.write(path, file.getBytes());

        return "/files/kyc/" + type + "/" + fileName;
    }

    @Override
    public Kyc getKycByUser(String email) {
        User user = userRepo.findByEmail(email).orElseThrow();
        return kycRepo.findByUser(user).orElseGet(() -> {
            Kyc kyc = new Kyc();
            kyc.setUser(user);
            kyc.setKycCode("KYC" + System.currentTimeMillis());
            kyc.setStatus(KycStatus.NEW);
            return kycRepo.save(kyc);
        });
    }

    @Override
    public void uploadAadhaar(String email, MultipartFile file) throws IOException {
        Kyc kyc = getKycByUser(email);
        kyc.setAadhaarDocUrl(saveFile(file, "aadhaar"));
        kycRepo.save(kyc);
    }

    @Override
    public void uploadPhoto(String email, MultipartFile file) throws IOException {
        Kyc kyc = getKycByUser(email);
        kyc.setPhotoUrl(saveFile(file, "photo"));
        kycRepo.save(kyc);
    }

    @Override
    public void submitKyc(String email) {
        Kyc kyc = getKycByUser(email);

        if (kyc.getAadhaarDocUrl() == null || kyc.getPhotoUrl() == null) {
            throw new RuntimeException("Documents missing");
        }

        kyc.setStatus(KycStatus.PENDING);
        kyc.setSubmittedOn(LocalDate.now());
        kycRepo.save(kyc);
    }

    @Override
    public void approveKyc(String kycCode) {
        Kyc kyc = kycRepo.findByKycCode(kycCode).orElseThrow();
        kyc.setStatus(KycStatus.APPROVED);
        kycRepo.save(kyc);
    }

    @Override
    public void rejectKyc(String kycCode) {
        Kyc kyc = kycRepo.findByKycCode(kycCode).orElseThrow();
        kyc.setStatus(KycStatus.REJECTED);
        kycRepo.save(kyc);
    }

    @Override
    public List<Kyc> getPendingKycs() {
    	System.out.println("Pending KYC Hit");
        return kycRepo.findByStatus(KycStatus.PENDING);
    }

    @Override
    public long getPendingCount() {
        return kycRepo.countByStatus(KycStatus.PENDING);
    }
}
