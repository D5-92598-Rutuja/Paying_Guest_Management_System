package com.pg.dtos;

import java.math.BigDecimal;
import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.validation.constraints.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MonthlyBillRespDTO {
    @NotNull
    @Positive
    @Min(value = 1)
    private Long billId;

    @NotNull
    @DecimalMin(value = "0.0")
    @DecimalMax(value = "100000.00")
    private BigDecimal amount;

    @NotNull
    @Positive
    @Min(value = 1)
    private Long bookingId;

    @NotNull
    @PastOrPresent
    private LocalDate dueDate;

    @NotNull
    @Min(value = 1)
    @Max(value = 12)
    private Integer month;

    @NotBlank
    @Size(min = 3, max = 12)
    private String monthName;

    @NotNull
    @Min(value = 2020)
    private Integer year;

    @NotBlank
    @Size(max = 20)
    private String status;

    @PastOrPresent
    private LocalDate paidDate;

    private Long paymentId;
}
