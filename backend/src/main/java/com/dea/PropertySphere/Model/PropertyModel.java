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
@Table(name = "property_table")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PropertyModel {
    @Id
    @GeneratedValue
    int propertyID;
    String propertyName;
    String propertyLocation;
    String propertyOwner;
    String propertyImg;


}
