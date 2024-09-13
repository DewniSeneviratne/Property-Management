package com.dea.PropertySphere.Service.Implimentation;

import com.dea.PropertySphere.dto.CampaignDto;
import com.dea.PropertySphere.exception.CampaignNotFoundException;
import com.dea.PropertySphere.Mapper.CampaignMapper;
import com.dea.PropertySphere.Model.Campaign;
import com.dea.PropertySphere.repository.CampaignRepository;
import com.dea.PropertySphere.service.ICampaignService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class CampaignService implements ICampaignService {

    private CampaignRepository campaignRepository;

    @Override
    public CampaignDto createCampaign(CampaignDto campaignDto) {
        System.out.println("CreateCampaign: " + campaignDto);
        Campaign campaign = CampaignMapper.mapToCampaign(campaignDto);
        Campaign savedCampaign = campaignRepository.save(campaign);
        return CampaignMapper.mapToCampaignDto(savedCampaign);
    }

    @Override
    public CampaignDto getCampaignById(Long campaignId) {
        Campaign campaign = campaignRepository.findById(campaignId)
                .orElseThrow(()->
                        new CampaignNotFoundException("Campaign Not exist with the given Id:  "+campaignId));
        return  CampaignMapper.mapToCampaignDto(campaign);

    }

    @Override
    public List<CampaignDto> getAllCampaigns() {
        List<Campaign> campaigns = campaignRepository.findAll();
        return campaigns.stream().map((campaign) -> CampaignMapper.mapToCampaignDto(campaign))
                .collect(Collectors.toList());
    }

    @Override
    public CampaignDto updateCampaign(Long campaignId, CampaignDto updatedCampaign) {
        Campaign campaign = campaignRepository.findById(campaignId).orElseThrow(
                ()-> new CampaignNotFoundException("Campaign not exist with the given id: "+campaignId)
        );
        campaign.setId(updatedCampaign.getId());
        campaign.setEstprice(updatedCampaign.getEstprice());
        campaign.setStDate(updatedCampaign.getStDate());
        campaign.setEndDate(updatedCampaign.getEndDate());
        campaign.setDescription(updatedCampaign.getDescription());


        Campaign updatedCampaignObj = campaignRepository.save(campaign);

        return CampaignMapper.mapToCampaignDto(updatedCampaignObj);
    }

    @Override
    public void deleteCampaign(Long campaignId) {
        Campaign campaign = campaignRepository.findById(campaignId).orElseThrow(
                ()-> new CampaignNotFoundException("Campaign not exist with the given id: "+campaignId)
        );

        campaignRepository.deleteById(campaignId);
    }
}
