package com.pg.dtos;

import java.time.LocalDate;
import com.pg.entities.BookingStatus;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BookingRespDTO {

    private Long bookingId;
    private String userName;
    private String roomType;
    private LocalDate joinDate;
    private LocalDate endDate;
    private BookingStatus status;
}
