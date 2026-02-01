package com.pg.dtos;

import com.pg.entities.Tickets.TicketStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TicketStatusUpdateDto {
	private TicketStatus status;
    private String resolutionNotes;
}
