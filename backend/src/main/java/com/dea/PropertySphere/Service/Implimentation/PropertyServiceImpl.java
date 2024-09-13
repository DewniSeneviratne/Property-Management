package com.dea.PropertySphere.Service.Implimentation;


import com.dea.PropertySphere.Model.PropertyModel;
import com.dea.PropertySphere.repository.PropertyRepo;
import com.dea.PropertySphere.Service.PropertyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PropertyServiceImpl implements PropertyService {

    @Autowired
    PropertyRepo propertyRepo;

//    propertyCreateService
//    return save->database

    public List<PropertyModel> getAllProperties() {
        return propertyRepo.findAll();
    }
    public PropertyModel saveProperty(PropertyModel property){
        return propertyRepo.save(property);
    }

    //Read a property from database
    public Optional<PropertyModel> readProperty(int propertyId){
        if(propertyRepo.findById(propertyId).isEmpty()){
            System.out.println("Property Not Found!!!");
            return Optional.empty();
        }
        else return propertyRepo.findById(propertyId);

    }

    //Delete a property from database
    public void deleteProperty(int propertyId){
        if(propertyRepo.findById(propertyId).isEmpty()){
            System.out.println("Property Not Exists");
        }
        else {
            propertyRepo.deleteById(propertyId);
            System.out.println("Property(" + propertyId + ") Deleted ");
        }
    }

    //Update property details

    @Override
    public PropertyModel updateProperty(int propertyId, PropertyModel updatedProperty) {
        // Check if the property with the given ID exists
        Optional<PropertyModel> existingPropertyOptional = propertyRepo.findById(propertyId);

        if (existingPropertyOptional.isPresent()) {
            // Update the existing property with new values
            PropertyModel existingProperty = existingPropertyOptional.get();

            existingProperty.setPropertyName(updatedProperty.getPropertyName());
            existingProperty.setPropertyOwner(updatedProperty.getPropertyOwner());
            existingProperty.setPropertyLocation(updatedProperty.getPropertyLocation());
            existingProperty.setPropertyImg(updatedProperty.getPropertyImg());

            // Save the updated property and return it
            return propertyRepo.save(existingProperty);
        } else {
            // If property not found, throw an exception (could be custom if needed)
            throw new RuntimeException("Property with ID " + propertyId + " not found.");
        }
    }


}
