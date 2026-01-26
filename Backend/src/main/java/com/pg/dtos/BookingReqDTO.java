package com.pg.dtos;

import java.time.LocalDate;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BookingReqDTO {

	private String roomType;
    private LocalDate joinDate;
    private LocalDate endDate;
}
