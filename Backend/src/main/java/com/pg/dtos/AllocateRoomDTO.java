package com.pg.dtos;

import lombok.Data;

@Data
public class AllocateRoomDTO {
    private Long bookingId;
    private Long roomId;
}
