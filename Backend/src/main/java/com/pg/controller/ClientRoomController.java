package com.pg.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.pg.dtos.RoomReqDTO;
import com.pg.dtos.RoomRespDTO;
import com.pg.service.RoomService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class ClientRoomController {

    private final RoomService roomService;

//    @PostMapping("/client/rooms")
//    public ResponseEntity<RoomRespDTO> addRoom(@RequestBody RoomReqDTO dto) {
//        return new ResponseEntity<>(roomService.addRoom(dto), HttpStatus.CREATED);
//    }

    @GetMapping("/api/rooms")
    public List<RoomRespDTO> getAllRooms() {
        return roomService.getAllRooms();
    }
    
    
}