package com.pg.dtos;

import java.time.LocalDate;

import com.pg.entities.AllocationStatus;
import com.pg.entities.SharingType;
import com.pg.entities.Status;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserRoomProfileDTO {

    private String roomNumber;
    private SharingType sharingType;
    private double monthlyRent;
    private LocalDate allocationDate;
    private AllocationStatus allocationStatus;
}
