package com.pg.dtos;

import com.pg.entities.SharingType;
import com.pg.entities.Status;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RoomRespDTO {

	 private Long id;
    private Integer floorNumber;
    private String roomNumber;
    private SharingType sharingType;
    private int totalBeds;
    private int availableBeds;
    private double rentPerBed;
    private Status status;
}
