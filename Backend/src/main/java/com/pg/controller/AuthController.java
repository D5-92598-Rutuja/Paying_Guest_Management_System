package com.pg.controller;

import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.pg.dtos.*;
import com.pg.security.JwtUtil;
import com.pg.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authManager;
    private final JwtUtil jwtUtil;
    private final UserService userService;

    @PostMapping("/register")
    public UserRespDTO register(@RequestBody RegisterRequestDTO dto) {
        System.out.println("🔥 REGISTER CONTROLLER HIT");

        return userService.registerUser(dto);
    }

    @PostMapping("/login")
    public LoginResponseDTO login(@RequestBody LoginRequestDTO req) {

        System.out.println("🔥 LOGIN CONTROLLER HIT");
        //System.out.println("EMAIL FROM REQUEST = " + req.getEmail());
        //System.out.println("PASSWORD FROM REQUEST = " + req.getPassword());

        Authentication auth = authManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                req.getEmail(), req.getPassword())
        );

        return new LoginResponseDTO(jwtUtil.createToken(auth));
    }

}
