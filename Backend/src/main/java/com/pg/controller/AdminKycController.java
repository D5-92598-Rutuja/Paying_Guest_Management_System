package com.pg.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.pg.entities.Kyc;
import com.pg.service.KycService;

@RestController
@RequestMapping("/api/admin/kyc")
@CrossOrigin
public class AdminKycController {

    @Autowired
    private KycService kycService;

    // 🔹 Pending count (top card: "3 Pending")
    @GetMapping("/pending/count")
    public long getPendingCount() {
        return kycService.getPendingCount();
    }

    // 🔹 List pending KYCs
    @GetMapping("/pending")
    public List<Kyc> getPendingKycs() {
        return kycService.getPendingKycs();
    }

    // ✅ Approve
    @PostMapping("/{kycCode}/approve")
    public ResponseEntity<String> approveKyc(
            @PathVariable String kycCode,
            @RequestParam String adminName) {

        kycService.approveKyc(kycCode, adminName);
        return ResponseEntity.ok("KYC Approved");
    }

    // ❌ Reject
    @PostMapping("/{kycCode}/reject")
    public ResponseEntity<String> rejectKyc(
            @PathVariable String kycCode,
            @RequestParam String reason,
            @RequestParam String adminName) {

        kycService.rejectKyc(kycCode, reason, adminName);
        return ResponseEntity.ok("KYC Rejected");
    }
}
