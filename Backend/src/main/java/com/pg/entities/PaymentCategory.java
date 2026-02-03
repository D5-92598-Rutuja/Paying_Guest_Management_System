package com.pg.entities;

public enum PaymentCategory {
    ADVANCE,    // One-time booking confirmation
    RENT,       // Monthly recurring
    SECURITY,   // One-time deposit
    MAINTENANCE // Monthly/Quarterly fees
}