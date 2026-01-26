package com.pg.service;

import java.util.List;

import com.pg.dtos.RoomReqDTO;
import com.pg.dtos.RoomRespDTO;

public interface RoomService {

    RoomRespDTO addRoom(RoomReqDTO dto);

    List<RoomRespDTO> getAllRooms();
    
   

}
