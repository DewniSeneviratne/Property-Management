package com.dea.PropertySphere.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "marketing_table")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MarketingModel {

    @Id
    @GeneratedValue
    private int proposalID;
    private String proposalName;
    private String proposalDescription;
    private Boolean proposalApproval;
}
