package com.dea.PropertySphere.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class CampaignNotFoundException extends ResourceNotFoundException {
    // Default message
    private static final String DEFAULT_MESSAGE = "0 Search Results";

    // Constructor with default message
    public CampaignNotFoundException() {
        super(DEFAULT_MESSAGE);
    }

    // Constructor with custom message
    public CampaignNotFoundException(String message) {
        super(message);
    }
}