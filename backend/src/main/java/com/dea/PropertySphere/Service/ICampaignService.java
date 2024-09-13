package com.dea.PropertySphere.service;

import com.dea.PropertySphere.dto.CampaignDto;

import java.util.List;

public interface ICampaignService {
    CampaignDto createCampaign (CampaignDto campaignDto);
    CampaignDto getCampaignById(Long campaignId);
    List<CampaignDto> getAllCampaigns();
    CampaignDto updateCampaign(Long campaignId, CampaignDto updatedCampaign);
    void deleteCampaign(Long campaignId);
}
