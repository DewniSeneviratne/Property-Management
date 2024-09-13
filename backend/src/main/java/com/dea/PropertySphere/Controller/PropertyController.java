package com.dea.PropertySphere.Controller;


import com.dea.PropertySphere.Model.PropertyModel;
import com.dea.PropertySphere.Service.PropertyService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Optional;
@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/property")
public class PropertyController {

    @Autowired
    PropertyService propertyService;


    //get full list
    @GetMapping
    public List<PropertyModel> getAllProperties() {
        return propertyService.getAllProperties();
    }

    //save Property
    @PostMapping
    Void saveProperty(@RequestBody PropertyModel property){
        propertyService.saveProperty(property);
        System.out.println(property.getPropertyName()+ " Saved!");
        return null;
    }

    //read single property
    @GetMapping("{id}")
    Optional<PropertyModel> getSingleProperty(@PathVariable("id") int propertyId){
        //propertyService.readProperty(propertyId);
        Optional<PropertyModel> property = propertyService.readProperty(propertyId);
        return property;
    }

    //delete property
    @DeleteMapping("{id}")
    public void deleteProperty(@PathVariable("id") int propertyId){
        propertyService.deleteProperty(propertyId);
    }

    //Update Property
    @PutMapping("{id}")
    public ResponseEntity<PropertyModel> updatePropertyEndpoint(@PathVariable("id") int propertyId, @RequestBody PropertyModel updatedProperty){
        try {
            PropertyModel updated = propertyService.updateProperty(propertyId, updatedProperty);
            return ResponseEntity.ok(updated);  // Return the updated property
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);  // Handle property not found
        }
    }

}
