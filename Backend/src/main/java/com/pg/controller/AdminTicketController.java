package com.pg.controller;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pg.dtos.ApiResponse;
import com.pg.dtos.TicketRequestDto;
import com.pg.dtos.TicketResponseDto;
import com.pg.dtos.TicketStatusUpdateDto;
import com.pg.entities.Tickets.Ticket;
import com.pg.entities.Tickets.TicketStatus;
import com.pg.service.TicketService;

//@CrossOrigin(origins = "*")
@RestController
@PreAuthorize("hasRole('ADMIN')")

//@RequestMapping("/api/tickets")
@RequestMapping("/admin/tickets")
public class AdminTicketController {
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

    // GET BY STATUS 
    @GetMapping("/status/{status}")
    public List<Ticket> getByStatus(@PathVariable TicketStatus status) {
        return ticketService.getTicketsByStatus(status);
    }

    //UPDATE STATUS (ADMIN)
    @PutMapping("/{ticketId}/status")
    public ResponseEntity<TicketResponseDto> updateTicketStatus(
            @PathVariable Long ticketId,
            @RequestBody TicketStatusUpdateDto dto) {

        Ticket ticket = ticketService.updateTicketStatus(ticketId, dto);

        return ResponseEntity.ok(
                new TicketResponseDto(
                        ticket.getTicketStatus(),
                        ticket.getResolutionNotes()
                )
        );
    }
 
}
