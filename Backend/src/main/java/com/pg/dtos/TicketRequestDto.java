package com.pg.dtos;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class TicketRequestDto {

    private String subject;
    private String description;
    //private TicketStatus ticketStatus;     // OPEN, IN_PROGRESS, RESOLVED, CLOSED
    //private String resolutionNotes;
    private Long id;         // Foreign key from Category table
}
