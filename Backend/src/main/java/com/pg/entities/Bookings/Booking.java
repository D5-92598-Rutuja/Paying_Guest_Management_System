package com.pg.entities.Bookings;

import java.time.LocalDate;

import com.pg.entities.BaseEntity;
import com.pg.entities.User;

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

@AttributeOverride(name = "id", column=@Column(name="booking_id"))

@Entity
@Table(name = "booking")
public class Booking extends BaseEntity{
	@Column(name = "room_type")
	private String roomType;
	 
	 @Column(name = "join_date")
	 private LocalDate joinDate;

	 @Column(name = "end_date")
	 private LocalDate endDate;
	 
	 @Column(name = "status", nullable = false)
	 @Enumerated(EnumType.STRING)
	 private BookingStatus status;
	 
	 @Column(name = "kyc_status")
	 @Enumerated(EnumType.STRING)
	 private KycStatus kycStatus;
	 
	 @Column(name = "payment_status")
	 @Enumerated(EnumType.STRING)
	 private PaymentStatus paymentStatus;
	 
	 @ManyToOne
	 @JoinColumn(name = "user_id", nullable = false)
	 private User user;
}
