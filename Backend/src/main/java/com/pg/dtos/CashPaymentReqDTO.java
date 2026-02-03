package com.pg.dtos;

import lombok.Data;
import jakarta.validation.constraints.*;
import java.math.BigDecimal;

@Data
public class CashPaymentReqDTO {
    @NotNull(message = "Booking ID is required")
    @Positive(message = "Booking ID must be a positive number")
    @Min(value = 1, message = "Booking ID must be at least 1")
    private Long bookingId;

    @NotNull(message = "Amount is required")
    @DecimalMin(value = "0.01", message = "Amount must be greater than 0")
    @DecimalMax(value = "1000000.00", message = "Amount must not exceed 1,000,000")
    private BigDecimal amount;

    @Size(max = 500, message = "Remark must not exceed 500 characters")
    private String remark;
}
