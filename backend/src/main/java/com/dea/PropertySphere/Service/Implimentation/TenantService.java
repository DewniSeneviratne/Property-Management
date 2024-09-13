package com.dea.PropertySphere.Service.Implimentation;

import com.dea.PropertySphere.dto.TenantDto;
import com.dea.PropertySphere.exception.TenantNotFoundException;
import com.dea.PropertySphere.Mapper.TenantMapper;
import com.dea.PropertySphere.Model.Tenant;
import com.dea.PropertySphere.repository.ITenantRepository;
import com.dea.PropertySphere.Service.ITenantService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class TenantService implements ITenantService {

    private ITenantRepository tenantRepository;

    @Override
    public TenantDto createTenant(TenantDto tenantDto) {
        System.out.println("TenantService: createTenant method called with data: " + tenantDto);
        Tenant tenant = TenantMapper.mapToTenant(tenantDto);
        Tenant savedTenant = tenantRepository.save(tenant);
        return TenantMapper.mapToTenantDto(savedTenant);
    }

    @Override
    public TenantDto getTenantById(Long tenantId) {
        Tenant tenant = tenantRepository.findById(tenantId)
                .orElseThrow(()->
                        new TenantNotFoundException("Tenant Not exist with the given Id:  "+tenantId));
        return  TenantMapper.mapToTenantDto(tenant);

    }

    @Override
    public List<TenantDto> getAllTenants() {
        List<Tenant> tenants = tenantRepository.findAll();
        return tenants.stream().map((tenant) -> TenantMapper.mapToTenantDto(tenant))
                .collect(Collectors.toList());
    }

    @Override
    public TenantDto updateTenant(Long tenantId, TenantDto updatedTenant) {
        Tenant tenant = tenantRepository.findById(tenantId).orElseThrow(
                ()-> new TenantNotFoundException("Tenant not exist with the given id: "+tenantId)
        );
        tenant.setFirstName(updatedTenant.getFirstName());
        tenant.setLastName(updatedTenant.getLastName());
        tenant.setEmail(updatedTenant.getEmail());
        tenant.setPhone(updatedTenant.getPhone());
        tenant.setAddress(updatedTenant.getAddress());
        tenant.setMoveInDate(updatedTenant.getMoveInDate());
        tenant.setMoveOutDate(updatedTenant.getMoveOutDate());
        tenant.setStatus(updatedTenant.getStatus());


        Tenant updatedTenantObj = tenantRepository.save(tenant);

        return TenantMapper.mapToTenantDto(updatedTenantObj);
    }

    @Override
    public void deleteTenant(Long tenantId) {
        Tenant tenant = tenantRepository.findById(tenantId).orElseThrow(
                ()-> new TenantNotFoundException("Tenant not exist with the given id: "+tenantId)
        );

        tenantRepository.deleteById(tenantId);
    }
}
