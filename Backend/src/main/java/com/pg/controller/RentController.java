package com.pg.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.pg.dtos.RentUpdateDTO;
import com.pg.service.RentService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/rent")
@RequiredArgsConstructor
public class RentController {

    private final RentService rentService;

    @GetMapping
    public ResponseEntity<RentUpdateDTO> getCurrentRent() {
        return ResponseEntity.ok(rentService.getCurrentRent());
    }

    @PostMapping
    public ResponseEntity<String> updateRent(@RequestBody RentUpdateDTO dto) {
        rentService.updateRent(dto);
        return ResponseEntity.ok("Rent updated successfully");
    }
}
