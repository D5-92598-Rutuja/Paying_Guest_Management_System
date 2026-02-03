package com.pg.entities;

import java.time.LocalDate;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "allocations")
@AttributeOverride(name = "id", column = @Column(name = "allocation_id"))
@Getter
@Setter
public class Allocation extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "booking_id", nullable = false)
    private Booking booking;

    @ManyToOne
    @JoinColumn(name = "room_id")
    private Room room;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "allocation_status", nullable = false)
    @Enumerated(EnumType.STRING)
    private AllocationStatus allocationStatus;

    @Column(name = "isVerified", nullable = false)
    private boolean isVerified;

    @Column(name = "isPaymentDone", nullable = false)
    private boolean isPaymentDone;

    private LocalDate allocationDate;
}
