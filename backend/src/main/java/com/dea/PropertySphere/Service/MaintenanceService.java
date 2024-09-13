package com.dea.PropertySphere.Service;

import com.dea.PropertySphere.Model.Maintenance;

import java.util.List;

public interface MaintenanceService {

    void save(Maintenance property);

    List<Maintenance> listAll();
    Maintenance getById(Long id);

    void delete(Long id);

    Maintenance updateProperty(Long id, Maintenance propertyDetails);
}
