package com.pg.dtos;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DashboardDTO {
    private long totalRooms;
    private long bookedRooms;
    private long unresolvedTickets;
   private BigDecimal pendingDues;
}