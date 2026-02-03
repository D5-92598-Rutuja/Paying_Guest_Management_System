package com.pg.entities.Announcements;

import java.time.LocalDate;

import com.pg.entities.BaseEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

//Lombok annotations
@Getter
@Setter
@NoArgsConstructor
@ToString

//JPA annotations
@Entity
@Table(name = "announcements")
public class Announcement extends BaseEntity{
	 // Title shown on announcement card
    // Example: "Monthly Maintenance Schedule"
    @Column(nullable = false, length = 150)
    private String title;

    // Detailed announcement message
    // Example: "Elevator maintenance from 10AM to 2PM"
    @Column(nullable = false, length = 3000)
    private String message;

    // Status of announcement
    // ACTIVE → visible to users
    // INACTIVE → hidden
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private AnnouncementStatus status;

    // Who should see this announcement
    // ALL → everyone
    // ADMIN → only admin
    // USER → only users
//    @Enumerated(EnumType.STRING)
//    @Column(nullable = false, length = 20)
//    private PostedFor postedFor;

    // Type of announcement
    // MAINTENANCE, EVENT, NOTICE
//    @Enumerated(EnumType.STRING)
//    @Column(nullable = false, length = 20)
//    private AnnouncementType type;

    // Date from which the announcement should be visible
    @Column(nullable = false)
    private LocalDate startDate;

    // Date after which the announcement should stop showing
    @Column(nullable = false)
    private LocalDate endDate;
}
