package com.pg.service;

import java.util.List;

import com.pg.dtos.ApiResponse;
import com.pg.dtos.TicketRequestDto;
import com.pg.entities.Tickets.Ticket;

public interface TicketService {

	List<Ticket> getAllTickets();

	ApiResponse createTicket(TicketRequestDto ticket);

}
