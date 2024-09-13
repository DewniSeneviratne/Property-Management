package com.dea.PropertySphere.Controller;

import com.dea.PropertySphere.Model.Maintenance;
import com.dea.PropertySphere.Service.Implimentation.MaintenanceServiceImpl;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@AllArgsConstructor
@RequestMapping("/api/maintenance")
public class MaintenanceController {

    @Autowired
    private MaintenanceServiceImpl propertyService;

    @GetMapping
    public List<Maintenance> list() {
        return propertyService.listAll();
    }

    @GetMapping("{id}")
    public ResponseEntity<Maintenance> getPropertyById(@PathVariable Long id) {
        Maintenance property = propertyService.getById(id);
        return ResponseEntity.ok(property);
    }

    @PostMapping
    public String add(@RequestBody Maintenance property) {
        propertyService.save(property);
        return "New property added";
    }

    @DeleteMapping("{id}")
    public String delete(@PathVariable Long id) {
        propertyService.delete(id);
        return "Deleted property with id " + id;
    }

    @PutMapping("{id}")
    public ResponseEntity<Maintenance> updateProperty(@PathVariable Long id, @RequestBody Maintenance propertyDetails) {
        Maintenance updatedProperty = propertyService.updateProperty(id, propertyDetails);
        return ResponseEntity.ok(updatedProperty);
    }
}
