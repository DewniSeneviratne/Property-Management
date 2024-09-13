package com.dea.PropertySphere.Service.Implimentation;

import com.dea.PropertySphere.Model.Maintenance;
import com.dea.PropertySphere.repository.MaintenanceRepository;
import com.dea.PropertySphere.Service.MaintenanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MaintenanceServiceImpl implements MaintenanceService {


    @Autowired
    private MaintenanceRepository propertyRepository;

    @Override
    public void save(Maintenance property){
        propertyRepository.save(property);
    }

    @Override
    public List<Maintenance> listAll(){
        return propertyRepository.findAll();

    }

    @Override
    public Maintenance getById(Long id) {
        Optional<Maintenance> optionalProperty = propertyRepository.findById(id);

        if (optionalProperty.isPresent()) {
            return optionalProperty.get();
        } else {
            // Handle the case where the property doesn't exist
            throw new RuntimeException("Property not found with id " + id);
        }
    }

    @Override
    public void delete(Long id){
        propertyRepository.deleteById(id);
    }

    @Override
    public Maintenance updateProperty(Long id, Maintenance propertyDetails) {
        Optional<Maintenance> optionalProperty = propertyRepository.findById(id);

        if (optionalProperty.isPresent()) {
            Maintenance existingProperty = optionalProperty.get();

            // Update the fields with new data
            existingProperty.setFacilityName(propertyDetails.getFacilityName());
            existingProperty.setDescription(propertyDetails.getDescription());
            existingProperty.setCost(propertyDetails.getCost());
            existingProperty.setStatus(propertyDetails.getStatus());
            existingProperty.setRequestDate(propertyDetails.getRequestDate());
            existingProperty.setCompletionDate(propertyDetails.getCompletionDate());

            return propertyRepository.save(existingProperty);
        } else {
            // Handle the case where the property doesn't exist (optional)
            throw new RuntimeException("Property not found with id " + id);
        }
    }
}
