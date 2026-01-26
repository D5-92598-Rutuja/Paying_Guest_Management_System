package com.pg.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.pg.entities.Kyc;
import com.pg.service.KycService;
//@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/admin/kyc")
@PreAuthorize("hasRole('ADMIN')")
public class AdminKycController {

    @Autowired
    private KycService kycService;

    @GetMapping("/pending")
    public List<Kyc> pendingKycs() {
    	 System.out.println("🔥 Admin KYC CONTROLLER HIT");
        return kycService.getPendingKycs();
    }

    @GetMapping("/pending/count")
    public long pendingCount() {
        return kycService.getPendingCount();
    }

    @PostMapping("/{kycCode}/approve")
    public void approve(@PathVariable String kycCode) {
        kycService.approveKyc(kycCode);
    }

    @PostMapping("/{kycCode}/reject")
    public void reject(@PathVariable String kycCode) {
        kycService.rejectKyc(kycCode);
    }
}
