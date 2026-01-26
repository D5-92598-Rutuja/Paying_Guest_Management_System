package com.pg.entities;

import java.time.LocalDate;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import com.pg.entities.SharingType;

@Entity
@Table(name = "bookings")
@AttributeOverride(name = "id", column = @Column(name = "booking_id"))
@Getter
@Setter
public class Booking extends BaseEntity {

	@Enumerated(EnumType.STRING)
	private SharingType roomType;

    @Column(nullable = false)
    private LocalDate joinDate;

    private LocalDate endDate;

    @Enumerated(EnumType.STRING)
    private BookingStatus status;

    @Enumerated(EnumType.STRING)
    private KycStatus kycStatus;

    @Enumerated(EnumType.STRING)
    private PaymentStatus paymentStatus;

    // 🔗 Student
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // 🔗 Room (after allocation)
    @ManyToOne
    @JoinColumn(name = "room_id")
    private Room room;
}
