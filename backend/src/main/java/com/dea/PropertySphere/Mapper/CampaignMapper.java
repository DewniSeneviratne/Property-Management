package com.dea.PropertySphere.Mapper;

import com.dea.PropertySphere.dto.CampaignDto;
import com.dea.PropertySphere.Model.Campaign;

public class CampaignMapper {
    public static CampaignDto mapToCampaignDto(Campaign campaign){
        return  new CampaignDto(
                campaign.getId(),
                campaign.getEstprice(),
                campaign.getStDate(),
                campaign.getEndDate(),
                campaign.getDescription()
        );
    }
    public  static Campaign mapToCampaign(CampaignDto campaignDto){
        return new Campaign(
            campaignDto.getId(),
            campaignDto.getEstprice(),
            campaignDto.getStDate(),
            campaignDto.getEndDate(),
            campaignDto.getDescription()
        );
    }
}
