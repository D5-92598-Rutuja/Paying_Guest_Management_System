package com.pg.controller;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.pg.dtos.*;
import com.pg.entities.Tickets.Ticket;
import com.pg.entities.Tickets.TicketStatus;
import com.pg.service.TicketService;

@CrossOrigin(origins = "*")
@RestController
@PreAuthorize("hasRole('USER')")
//@RequestMapping("/api/tickets")
@RequestMapping("/client/tickets")
public class ClientTicketController {

    @Autowired
    private TicketService ticketService;

    @Autowired
    private ModelMapper modelMapper;

    //GET ALL
    @GetMapping
    public ResponseEntity<?> getAllTickets() {
        List<Ticket> tickets = ticketService.getAllTickets();

        if (tickets.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }
        return ResponseEntity.ok(tickets);
    }

    // CREATE
    @PostMapping
    public ResponseEntity<?> createTicket(@RequestBody TicketRequestDto ticket) {
        try {
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(ticketService.createTicket(ticket));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(new ApiResponse(e.getMessage(), "Failed"));
        }
    }
}
