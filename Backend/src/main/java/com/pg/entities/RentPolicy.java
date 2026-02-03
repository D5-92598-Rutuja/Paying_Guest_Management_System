package com.pg.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "rent_policy")
@Getter
@Setter
@NoArgsConstructor
public class RentPolicy {

    @Id
    @Enumerated(EnumType.STRING)
    private SharingType sharingType;   // SINGLE / DOUBLE / TRIPLE

    @Column(nullable = false)
    private double rentPerBed;
}
