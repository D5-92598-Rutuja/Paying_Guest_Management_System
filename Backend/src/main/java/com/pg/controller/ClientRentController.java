package com.pg.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.pg.dtos.RentUpdateDTO;
import com.pg.service.RentService;

import lombok.RequiredArgsConstructor;

@RestController
//@RequestMapping("/api/rent")
@RequiredArgsConstructor
public class ClientRentController {

    private final RentService rentService;

    @GetMapping("/api/rent")
    public ResponseEntity<RentUpdateDTO> getCurrentRent() {
        return ResponseEntity.ok(rentService.getCurrentRent());
    }

}
