package com.dea.PropertySphere.repository;

import com.dea.PropertySphere.Model.MarketingModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MarketingRepository extends JpaRepository<MarketingModel, Integer> {
//add custom query
}
