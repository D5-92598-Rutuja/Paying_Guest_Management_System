package com.pg.entities.Tickets;

import com.pg.entities.BaseEntity;
import com.pg.entities.Categories.Category;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

@AttributeOverride(name = "id", column = @Column(name = "ticket_id"))

@Entity
@Table(name = "ticket")
public class Ticket extends BaseEntity {
	@Column(length = 200)
    private String subject;
	
	@Column(length = 5000, nullable = false)
	private String description;

	// OPEN, IN_PROGRESS, RESOLVED, CLOSED
    @Enumerated(EnumType.STRING)
    @Column(name = "ticket_status",length = 30)
    private TicketStatus ticketStatus;   // OPEN, IN_PROGRESS, RESOLVED, CLOSED
    
    @Column(length = 5000)
    private String resolutionNotes;

    //Many tickets belong to one category
    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;
    
}
