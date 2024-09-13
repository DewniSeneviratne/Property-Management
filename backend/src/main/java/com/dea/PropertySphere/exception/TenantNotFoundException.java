package com.dea.PropertySphere.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class TenantNotFoundException extends ResourceNotFoundException {
    // Default message
    private static final String DEFAULT_MESSAGE = "Tenant Not Found";

    // Constructor with default message
    public TenantNotFoundException() {
        super(DEFAULT_MESSAGE);
    }

    // Constructor with custom message
    public TenantNotFoundException(String message) {
        super(message);
    }
}
