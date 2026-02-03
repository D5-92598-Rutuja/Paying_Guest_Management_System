package com.pg.dtos;

import com.pg.entities.SharingType;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RoomReqDTO {

    private Integer floorNumber;
    private String roomNumber;
    private SharingType sharingType;
}
