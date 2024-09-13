package com.dea.PropertySphere.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
//annotations for creating constructors
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

//we use TransactionDto class to transfer data between the server and the client
public class TransactionDto {
    private Long id;
    private Long tenantId;
    private Double amount;
    private String transactionType;
    private LocalDateTime transactionDate;
    private String description;
}