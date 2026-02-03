package com.pg.dtos;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class PaymentReqDTO {
    
    @Min(value = 0, message = "Page should be >= 0")
    private int page = 0;
    
    @Min(value = 1, message = "Size should be >= 1")
    @Max(value = 50, message = "Size should be <= 50")
    private int size = 7;
    
    @Size(max = 20, message = "Status must not exceed 20 characters")
    private String status;
    
    @Size(max = 20, message = "Type must not exceed 20 characters")
    private String type;
    
    private String monthYear;
    
    @Size(max = 100, message = "Search query must not exceed 100 characters")
    private String search;
}
