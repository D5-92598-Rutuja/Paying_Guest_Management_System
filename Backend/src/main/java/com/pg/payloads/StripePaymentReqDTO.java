package com.pg.payloads;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class StripePaymentReqDTO {  
    private Long bookingId;        // Links to your Booking entity
    private BigDecimal amount;     // Total amount (Rent + Deposit)
    
}
