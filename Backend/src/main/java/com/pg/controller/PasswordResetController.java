package com.pg.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.pg.service.PasswordResetService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth/password")
@RequiredArgsConstructor
public class PasswordResetController {

    private final PasswordResetService passwordResetService;

    @PostMapping("/forgot")
    public ResponseEntity<?> forgotPassword(
            @RequestParam String email
    ) {
        System.out.println("🔥 FORGOT PASSWORD HIT: " + email);

        passwordResetService.sendResetLink(email);
        return ResponseEntity.ok("Reset link sent to email");
    }

    @PostMapping("/reset")
    public ResponseEntity<?> resetPassword(
            @RequestParam String token,
            @RequestParam String newPassword
    ) {
        passwordResetService.resetPassword(token, newPassword);
        return ResponseEntity.ok("Password updated successfully");
    }
    	


}
