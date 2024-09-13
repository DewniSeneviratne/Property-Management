package com.dea.PropertySphere.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "transactions") //transactions is the table we are gonna to create
public class Transaction {
    @Id //define the pk
    @GeneratedValue(strategy = GenerationType.IDENTITY) //strategy is set to auto increment the pk
    private Long id;

    @Column(name = "tenant_id", nullable = false) //annotation for mapping a db table columns with these fields
    private Long tenantId;

    @Column(name = "amount", nullable = false)
    private Double amount;

    @Column(name = "transaction_type", nullable = false)
    private String transactionType;

    @Column(name = "transaction_date", nullable = false)
    private LocalDateTime transactionDate;

    @Column(name = "description")
    private String description;
}
