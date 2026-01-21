package com.pg.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pg.dtos.AuthRequest;
import com.pg.dtos.UserResp;
import com.pg.service.UserService;

@RestController 
@RequestMapping("/users")

public class UserController {
	// depcy
	@Autowired
	private UserService userService;

	@GetMapping
	public ResponseEntity<?> getAllUsers() {
		System.out.println("in get all users");
		List<UserResp> users = userService.getAllUsers();
		if (users.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NO_CONTENT) // SC 204
					.build();
		}
		return ResponseEntity.ok(users);
	}

	@GetMapping("/{userId}")
	public ResponseEntity<?> getUserDetailsById(@PathVariable Long userId) {
		System.out.println("in get user dtls " + userId);
		return ResponseEntity.ok(userService.getUserDetails(userId));

	}

	@PostMapping("/signin")
	public ResponseEntity<?> authenticateUser(@RequestBody  AuthRequest dto) {
		System.out.println("in sign in " + dto);
		return ResponseEntity.ok(userService.authenticateUser(dto));
	}


}
