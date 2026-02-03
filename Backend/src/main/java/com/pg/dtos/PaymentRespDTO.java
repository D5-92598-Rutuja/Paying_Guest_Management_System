package com.pg.dtos;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.pg.entities.PaymentStatus;
import com.pg.entities.PaymentType;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class PaymentRespDTO {

    private Long id;


    private String userName;


    private BigDecimal amountPaid;

    private LocalDateTime paymentDate;

    private PaymentType paymentType;

    private String transactionId;

    
    private PaymentStatus paymentStatus;

    private String remark;
}