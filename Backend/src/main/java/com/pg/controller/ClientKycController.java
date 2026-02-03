package com.pg.controller;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.io.File;
import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;


import com.pg.entities.Kyc;
import com.pg.entities.KycStatus;
import com.pg.entities.User;
import com.pg.repository.KycRepository;
import com.pg.service.KycService;

@RestController
@RequestMapping("/client/kyc")
@PreAuthorize("hasRole('USER')")
public class ClientKycController {

    @Autowired
    private KycService kycService;

    @GetMapping
    public Kyc getMyKyc(Authentication auth) {
        return kycService.getKycByUser(auth.getName());
    }

    @PostMapping("/upload-aadhaar")
    public ResponseEntity<?> uploadAadhaar(
            @RequestParam MultipartFile file,
            Authentication auth) throws IOException {
        kycService.uploadAadhaar(auth.getName(), file);
        return ResponseEntity.ok("Aadhaar uploaded");
    }

    @PostMapping("/upload-photo")
    public ResponseEntity<?> uploadPhoto(
            @RequestParam MultipartFile file,
            Authentication auth) throws IOException {
        kycService.uploadPhoto(auth.getName(), file);
        return ResponseEntity.ok("Photo uploaded");
    }

    @PostMapping("/submit")
    public ResponseEntity<?> submitKyc(Authentication auth) {
        kycService.submitKyc(auth.getName());
        return ResponseEntity.ok("KYC submitted");
    }
}
