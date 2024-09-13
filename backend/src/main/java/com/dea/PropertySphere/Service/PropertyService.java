package com.dea.PropertySphere.Service;

import com.dea.PropertySphere.Model.PropertyModel;

import java.util.List;
import java.util.Optional;

public interface PropertyService {

    List<PropertyModel> getAllProperties();

    // Save a property
    PropertyModel saveProperty(PropertyModel property);

    // Read a property by ID
    Optional<PropertyModel> readProperty(int propertyId);

    // Delete a property by ID
    void deleteProperty(int propertyId);

    // Update an existing property
    PropertyModel updateProperty(int propertyId, PropertyModel updatedProperty);

}
