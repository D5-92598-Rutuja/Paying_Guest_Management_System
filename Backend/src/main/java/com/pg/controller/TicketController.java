package com.pg.controller;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pg.dtos.ApiResponse;
import com.pg.dtos.TicketRequestDto;
import com.pg.entities.Tickets.Ticket;
import com.pg.service.TicketService;



@RestController
@RequestMapping("/tickets")
public class TicketController {
	@Autowired
	private TicketService ticketService;
	
	@Autowired
	private ModelMapper modelMapper;
	
	/*
     * Desc - Get all tickets
     * URI - /tickets
     * Method - GET
     * Payload - none
     * Response - 204 (no tickets) OR 200 (List<Ticket>)
     */
	@GetMapping
	public ResponseEntity<?> getAllTickets(){
		List<Ticket> tickets = ticketService.getAllTickets();
		
		if(tickets.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NO_CONTENT)
					.build();
		}
		
		return ResponseEntity.ok(tickets);
	}
	
	
	/*
     * Desc - Create new ticket
     * URI - /tickets
     * Method - POST
     * Payload - Ticket JSON
     * Response - 201 OR 409
     */
	@PostMapping
	public ResponseEntity<?> createTicket(@RequestBody TicketRequestDto ticket){
		try {
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(ticketService.createTicket(ticket));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(new ApiResponse(e.getMessage(), "Failed"));
        }
	}
}
