package com.pg.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@AttributeOverride(name = "id", column = @Column(name = "room_id"))
@Table(
    name = "rooms",
    uniqueConstraints = @UniqueConstraint(columnNames = {"floorNumber", "roomNumber"})
)
@Getter
@Setter
@NoArgsConstructor
public class Room extends BaseEntity {

    @Column(nullable = false)
    private Integer floorNumber;

    @Column(nullable = false)
    private String roomNumber;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private SharingType sharingType;

    @Column(nullable = false)
    private int totalBeds;

    @Column(nullable = false)
    private int availableBeds;

    @Column(nullable = false)
    private double rentPerBed;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status;
}
