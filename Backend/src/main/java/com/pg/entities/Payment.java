package com.pg.entities;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@Table(name = "payments")
@AttributeOverride(name = "id", column = @Column(name = "payment_id"))
@NoArgsConstructor
@Getter
@Setter
public class Payment extends BaseEntity {

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "booking_id", nullable = false)
    private Booking booking;
//	private Long booking;

    @Column(name = "amount_paid", nullable = false, precision = 10, scale = 2)
    private BigDecimal amountPaid;

    @Enumerated(EnumType.STRING)
    @Column(name = "payment_type", nullable = false, length = 30)
    private PaymentType paymentType;

    @Enumerated(EnumType.STRING)
    @Column(name = "payment_status", nullable = false, length = 20)
    private PaymentStatus paymentStatus;

    @Column(name = "payment_date", nullable = false)
    private LocalDateTime paymentDate;

    // For Stripe: payment_intent_id or charge id; for UPI/Bank: txn id; for cash: custom code
    @Column(name = "transaction_id", length = 100)
    private String transactionId;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "payment_category", nullable = false, length = 20)
    private PaymentCategory category; 

    @Column(name = "remark", length = 255)
    private String remark;

}
