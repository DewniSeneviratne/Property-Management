package com.dea.PropertySphere.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Maintenance")
public class Maintenance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "facility_name", nullable = false)
    private String facilityName;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "cost")
    private Double cost;

    @Column(name = "status")
    private String status;  // E.g., "Pending", "In Progress", "Completed"

    @Column(name = "request_date", nullable = false)
    private LocalDate requestDate;

    @Column(name = "completion_date")
    private LocalDate completionDate;

}
