package com.pg.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.pg.dtos.UserRoomProfileDTO;
import com.pg.service.ProfileService;

@RestController
@RequestMapping("/client/profile")
@PreAuthorize("hasRole('USER')")
@CrossOrigin("*")
public class ProfileController {

    @Autowired
    private ProfileService profileService;

    @GetMapping("/room")
    public ResponseEntity<?> getUserRoomProfile(Authentication authentication) {
        try {
            // Get email of logged-in user
            String email = authentication.getName(); // safer than getPrincipal().toString()

            UserRoomProfileDTO profile = profileService.getUserRoomProfile(email);
            return ResponseEntity.ok(profile);
        } catch (RuntimeException e) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(e.getMessage());
        }
    }
    

}
