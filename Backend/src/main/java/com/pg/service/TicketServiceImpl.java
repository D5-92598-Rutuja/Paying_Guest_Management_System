package com.pg.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pg.custom_exception.ApiException;
import com.pg.dtos.ApiResponse;
import com.pg.dtos.TicketRequestDto;
import com.pg.dtos.TicketStatusUpdateDto;
import com.pg.entities.Categories.Category;
import com.pg.entities.Tickets.Ticket;
import com.pg.entities.Tickets.TicketStatus;
import com.pg.repository.CategoryRepository;
import com.pg.repository.TicketRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class TicketServiceImpl implements TicketService {

    @Autowired
    private TicketRepository ticketRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    // ================= GET ALL TICKETS =================
    @Override
    public List<Ticket> getAllTickets() {
        return ticketRepository.findAll();
    }

    // ================= CREATE TICKET (USER) =================
    @Override
    public ApiResponse createTicket(TicketRequestDto ticket) {

        if (ticket.getId() == null) {
            throw new ApiException("Category ID must not be null");
        }

        Category category = categoryRepository.findById(ticket.getId())
                .orElseThrow(() -> new ApiException("Invalid category id"));

        Ticket myTicket = new Ticket();
        myTicket.setSubject(ticket.getSubject());
        myTicket.setDescription(ticket.getDescription());
        myTicket.setCategory(category);
        myTicket.setTicketStatus(TicketStatus.OPEN);
        myTicket.setResolutionNotes(null);

        ticketRepository.save(myTicket);

        return new ApiResponse(
                "Ticket created successfully with ID : " + myTicket.getId(),
                "Success"
        );
    }

    // ================= GET TICKETS BY STATUS =================
    @Override
    public List<Ticket> getTicketsByStatus(TicketStatus status) {
        return ticketRepository.findByTicketStatus(status);
    }

    // ================= UPDATE TICKET (USER) =================
    @Override
    public Ticket updateTicket(Long id, TicketRequestDto dto) {

        Ticket ticket = ticketRepository.findById(id)
                .orElseThrow(() -> new ApiException("Ticket not found"));

        ticket.setSubject(dto.getSubject());
        ticket.setDescription(dto.getDescription());

        // Optional: update category
        if (dto.getId() != null) {
            Category category = categoryRepository.findById(dto.getId())
                    .orElseThrow(() -> new ApiException("Invalid category id"));
            ticket.setCategory(category);
        }

        return ticketRepository.save(ticket);
    }

    // ================= UPDATE STATUS (ADMIN) =================
    @Override
    public Ticket updateTicketStatus(Long ticketId, TicketStatusUpdateDto dto) {

        Ticket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new ApiException("Ticket not found"));

        // BUSINESS RULES
        if (dto.getStatus() == TicketStatus.CLOSED &&
            ticket.getTicketStatus() != TicketStatus.RESOLVED) {
            throw new ApiException("Ticket must be RESOLVED before CLOSING");
        }

        ticket.setTicketStatus(dto.getStatus());

        if (dto.getResolutionNotes() != null && !dto.getResolutionNotes().isBlank()) {
            ticket.setResolutionNotes(dto.getResolutionNotes());
        }

        return ticketRepository.save(ticket);
    }

}
