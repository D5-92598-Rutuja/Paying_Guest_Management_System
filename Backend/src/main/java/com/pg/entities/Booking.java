package com.pg.entities;

import java.time.LocalDate;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "bookings")
@AttributeOverride(name = "id", column = @Column(name = "booking_id"))
@Getter
@Setter
public class Booking extends BaseEntity {

    @Enumerated(EnumType.STRING)
    @Column(name = "room_type", nullable = false)
    private SharingType roomType;

    @Column(name = "join_date", nullable = false)
    private LocalDate joinDate;

    @Column(name = "end_date")
    private LocalDate endDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private BookingStatus status;

    @Enumerated(EnumType.STRING)
    @Column(name = "kyc_status", nullable = false)
    private KycStatus kycStatus;

    @Enumerated(EnumType.STRING)
    @Column(name = "payment_status", nullable = false)
    private PaymentStatus paymentStatus;

    // uid (user_id)
    @ManyToOne
    @JoinColumn(name = "uid", nullable = false)
    private User user;
}
