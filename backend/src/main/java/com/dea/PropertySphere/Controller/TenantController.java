package com.dea.PropertySphere.Controller;

import com.dea.PropertySphere.dto.TenantDto;
import com.dea.PropertySphere.Service.ITenantService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/tenants")
public class TenantController {
    private ITenantService tenantService;

    //Build Add Tenant Rest API
    @PostMapping
    public ResponseEntity<TenantDto> createTenant(@RequestBody TenantDto tenantDto){
        System.out.println("Received Tenant: " + tenantDto);
        TenantDto savedTenant = tenantService.createTenant(tenantDto);
        return new ResponseEntity<>(savedTenant, HttpStatus.CREATED);
    }

    @GetMapping("/test")
    public ResponseEntity<String> testEndpoint() {
        return new ResponseEntity<>("Test successful", HttpStatus.OK);
    }
    //Build get employee Rest API
    @GetMapping("{id}")
    public ResponseEntity<TenantDto> getTenantId(@PathVariable("id") Long tenantId){
        TenantDto tenantDto = tenantService.getTenantById(tenantId);
        return ResponseEntity.ok(tenantDto);
    }


    //build get all employees rest API
    @GetMapping
    public ResponseEntity<List<TenantDto>> getAllTenants(){
        List<TenantDto> tenants= tenantService.getAllTenants();
        return  ResponseEntity.ok(tenants);
    }

    @PutMapping("{id}")
    public ResponseEntity<TenantDto> updateTenant(@PathVariable("id") Long tenantId,
                                                        @RequestBody TenantDto updatedTenant){
        TenantDto tenantDto = tenantService.updateTenant(tenantId, updatedTenant);
        return ResponseEntity.ok(tenantDto);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteTenant(@PathVariable("id") Long tenantId){
        tenantService.deleteTenant(tenantId);
        return ResponseEntity.ok("Tenant deleted successfully");
    }

}
