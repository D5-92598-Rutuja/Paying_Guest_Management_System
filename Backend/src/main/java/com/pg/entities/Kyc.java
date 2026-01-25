package com.pg.entities;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Setter
@Getter
@Table(name = "kyc")
public class Kyc {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long kycId;

    private String kycCode;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    private String aadhaarNumber;
    private String aadhaarDocUrl;
    private String photoUrl;

    @Enumerated(EnumType.STRING)
    private KycStatus status;

    private LocalDate submittedOn;
    private LocalDate reviewedOn;
    private String reviewedBy;
    private String rejectionReason;
    
    public void setStatus(KycStatus status) {
        this.status = status;
    }

    public void setReviewedBy(String reviewedBy) {
        this.reviewedBy = reviewedBy;
    }

    public void setReviewedOn(LocalDate reviewedOn) {
        this.reviewedOn = reviewedOn;
    }

    public void setRejectionReason(String rejectionReason) {
        this.rejectionReason = rejectionReason;
    }

}

