package com.pg.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pg.entities.Tickets.Ticket;
import com.pg.entities.Tickets.TicketStatus;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long> {
	
	List<Ticket> findByTicketStatus(TicketStatus status);
}
