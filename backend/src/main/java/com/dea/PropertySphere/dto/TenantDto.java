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
public class TenantDto {
    private Long id;
    private  String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String address;
    private LocalDate moveInDate;
    private LocalDate moveOutDate;
    private String status;
}
