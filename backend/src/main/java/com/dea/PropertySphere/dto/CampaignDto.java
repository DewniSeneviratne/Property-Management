package com.dea.PropertySphere.dto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CampaignDto {
     private Long id;
    private Double estprice;
    private LocalDate stDate;
    private LocalDate endDate;
    private String description;
}
