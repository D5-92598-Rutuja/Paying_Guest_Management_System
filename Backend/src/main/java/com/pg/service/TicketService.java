package com.pg.service;

import java.util.List;

import com.pg.dtos.ApiResponse;
import com.pg.dtos.TicketRequestDto;
import com.pg.dtos.TicketStatusUpdateDto;
import com.pg.entities.Tickets.Ticket;
import com.pg.entities.Tickets.TicketStatus;

public interface TicketService {

    List<Ticket> getAllTickets();

    ApiResponse createTicket(TicketRequestDto ticket);

    List<Ticket> getTicketsByStatus(TicketStatus status);

    Ticket updateTicket(Long id, TicketRequestDto dto);

    Ticket updateTicketStatus(Long ticketId,
                              TicketStatusUpdateDto dto);
}
