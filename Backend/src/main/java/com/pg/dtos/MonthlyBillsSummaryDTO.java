package com.pg.dtos;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MonthlyBillsSummaryDTO {
    private Long totalRecords;
    private Long unpaidCount;
    private BigDecimal totalOutstanding;
    private BigDecimal totalCollected;
    private Double collectionRate;  // %
}
