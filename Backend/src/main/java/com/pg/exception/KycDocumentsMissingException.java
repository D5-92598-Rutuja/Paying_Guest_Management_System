package com.pg.exception;

public class KycDocumentsMissingException extends RuntimeException {
    public KycDocumentsMissingException(String message) {
        super(message);
    }
}
