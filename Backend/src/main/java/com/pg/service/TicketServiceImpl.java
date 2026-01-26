package com.pg.service;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pg.custom_exception.ApiException;
import com.pg.dtos.ApiResponse;
import com.pg.dtos.TicketRequestDto;
import com.pg.entities.Categories.Category;
import com.pg.entities.Tickets.Ticket;
import com.pg.entities.Tickets.TicketStatus;
import com.pg.repository.CategoryRepository;
import com.pg.repository.TicketRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class TicketServiceImpl implements TicketService{
	

	
	
	@Autowired
	private TicketRepository ticketRepository;
	
	@Autowired
    private CategoryRepository categoryRepository;

	
	@Override
	public List<Ticket> getAllTickets() {
		return ticketRepository.findAll();
	}

	@Override
	public ApiResponse createTicket(TicketRequestDto ticket) {
		System.out.print(ticket);
		if (ticket.getId() == null) {
	        throw new ApiException("Category ID must not be null");
	    }
		
		// 1. Validate Category
	    Category category = categoryRepository.findById(ticket.getId())
	            .orElseThrow(() -> new ApiException("Invalid category id"));



	    // 3. Create Ticket entity
	    Ticket myTicket = new Ticket();
	    myTicket.setSubject(ticket.getSubject());
	    myTicket.setDescription(ticket.getDescription());
	    myTicket.setCategory(category);          // gives priority automatically
	    myTicket.setTicketStatus(TicketStatus.OPEN);
	    myTicket.setResolutionNotes(null);


        // Save ticket
        ticketRepository.save(myTicket);

        // Return API response
        return new ApiResponse("Ticket created successfully with ID : " 
                              ,"Success");
	}
	
}
