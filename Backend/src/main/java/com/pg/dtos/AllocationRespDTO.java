package com.pg.dtos;

import lombok.Data;

@Data
public class AllocationRespDTO {

    private Long bookingId;
    private String userName;
    private String roomType;
    private String joinDate;
}
