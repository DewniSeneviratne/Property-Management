package com.dea.PropertySphere.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "campaigns")
public class Campaign {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "estprice")
    private Double estprice;
    @Column(name = "camp_st_date")
    private LocalDate stDate;
    @Column(name = "camp_end_date")
    private LocalDate endDate;
    @Column(name = "description")
    private String description;
   

}
