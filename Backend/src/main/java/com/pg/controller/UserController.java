package com.pg.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
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
    
  //MY PROFILE
    @GetMapping("/me")
    public UserProfileResponse getMyProfile(Authentication authentication) {
//  	  System.out.println("=== DEBUG ===");
//  	    System.out.println("1. userDetails: " + userDetails);  // null?
//  	    System.out.println("2. Header: " + request.getHeader("Authorization"));  // Bearer present?
//  	    System.out.println("3. Auth: " + authentication);  // null or anonymousUser?
//  	    System.out.println("4. Principal: " + (authentication != null ? authentication.getPrincipal() : "null"));
//  	    System.out.println("=============");
  	  String email = authentication.getPrincipal().toString();
//  	  System.out.println("email:"+email);
        return userService.getMyProfile(email);
    }

    // UPDATE MY PROFILE
    @PutMapping("/me")
    public ResponseEntity<?> updateMyProfile(Authentication authentication,
            @RequestBody UserProfileRequest request) {
  	  String email = authentication.getPrincipal().toString();

        userService.updateMyProfile(email, request);
        return ResponseEntity.ok("Profile updated");
    }
}
