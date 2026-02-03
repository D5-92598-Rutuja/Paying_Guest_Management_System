package com.pg.entities;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.UniqueConstraint;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Setter
@Getter
@Table(name = "kyc")
@AttributeOverride(name = "id", column = @Column(name = "kyc_id"))
public class Kyc extends BaseEntity{

    @Column(unique = true)
    private String kycCode;

    @OneToOne
    @JoinColumn(name = "user_id", unique = true, nullable = false)
    private User user;

    private String aadhaarDocUrl;
    private String photoUrl;

    @Enumerated(EnumType.STRING)
    private KycStatus status;

    
    public void setStatus(KycStatus status) {
        this.status = status;
    }

}

