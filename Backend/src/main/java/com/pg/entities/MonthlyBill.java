package com.pg.entities;

import java.math.BigDecimal;
import java.time.LocalDate;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "monthly_bills")
@AttributeOverride(name = "id", column = @Column(name = "bill_id"))
@NoArgsConstructor
@Getter
@Setter
public class MonthlyBill extends BaseEntity {

    @Column(name = "booking_id", nullable = false)
    private Long bookingId;

    @Column(name = "month", nullable = false)
    private Integer month; // 1-12

    @Column(name = "year", nullable = false)
    private Integer year; // 2026

    @Column(name = "amount", nullable = false, precision = 10, scale = 2)
    private BigDecimal amount;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 20)
    private BillStatus status = BillStatus.UNPAID;

    @Column(name = "due_date", nullable = false)
    private LocalDate dueDate;

    @Column(name = "paid_date")
    private LocalDate paidDate;

    @Column(name = "payment_id") // Link to payments table
    private Long paymentId;
    
    // Computed
    @Transient
    public BigDecimal getOutstanding() {
        return amount;  // Since paid_amount not in table
    }

    @Transient
    public String getMonthName(Integer monthNum) {
        return switch (monthNum) {
            case 1 -> "January";
            case 2 -> "February";
            case 3 -> "March";
            case 4 -> "April";
            case 5 -> "May";
            case 6 -> "June";
            case 7 -> "July";
            case 8 -> "August";
            case 9 -> "September";
            case 10 -> "October";
            case 11 -> "November";
            case 12 -> "December";
            default -> monthNum.toString();
        };
    }



}
