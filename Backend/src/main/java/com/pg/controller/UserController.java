package com.pg.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.pg.dtos.UserRespDTO;
import com.pg.entities.User;
import com.pg.service.UserService;

import lombok.RequiredArgsConstructor;

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
}
