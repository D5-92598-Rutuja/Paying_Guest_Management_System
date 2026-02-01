package com.pg.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.pg.dtos.UserProfileRequest;
import com.pg.dtos.UserProfileResponse;
import com.pg.dtos.UserRespDTO;
import com.pg.entities.User;
import com.pg.service.UserService;

import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

   
    @PostMapping
    public ResponseEntity<UserRespDTO> createUser(@RequestBody User user) {
        UserRespDTO response = userService.createUser(user);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<UserRespDTO>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    
    @GetMapping("/{id}")
    public ResponseEntity<UserRespDTO> getUserById(@PathVariable Long id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }
    
    // MY PROFILE
//    @GetMapping("/me")
//    public UserProfileResponse getMyProfile(
//            @AuthenticationPrincipal UserDetails userDetails) {
//
//        return userService.getMyProfile(userDetails.getUsername());
//    }
//
//    // UPDATE MY PROFILE
//    @PutMapping("/me")
//    public ResponseEntity<?> updateMyProfile(
//            @AuthenticationPrincipal UserDetails userDetails,
//            @RequestBody UserProfileRequest request) {
//
//        userService.updateMyProfile(userDetails.getUsername(), request);
//        return ResponseEntity.ok("Profile updated");
//    }
    
    @GetMapping("/me")
    public UserProfileResponse getMyProfile() {
        String username = "amit@pg.com"; // must match a DB record
        return userService.getMyProfile(username);
    }

    @PutMapping("/me")
    public ResponseEntity<?> updateMyProfile(@RequestBody UserProfileRequest request) {
        String username = "amit@pg.com"; // must match a DB record
        userService.updateMyProfile(username, request);
        return ResponseEntity.ok("Profile updated");
    }

}
