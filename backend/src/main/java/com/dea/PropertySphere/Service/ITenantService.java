package com.dea.PropertySphere.Service;

import com.dea.PropertySphere.dto.TenantDto;

import java.util.List;

public interface ITenantService {
    TenantDto createTenant (TenantDto tenantDto);
    TenantDto getTenantById(Long tenantId);
    List<TenantDto> getAllTenants();
    TenantDto updateTenant(Long tenantId, TenantDto updatedTenant);
    void deleteTenant(Long tenantId);
}
