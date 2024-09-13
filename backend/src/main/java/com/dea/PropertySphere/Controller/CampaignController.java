package com.dea.PropertySphere.Controller;

import com.dea.PropertySphere.dto.CampaignDto;
import com.dea.PropertySphere.service.ICampaignService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/campaigns")
public class CampaignController {
    private ICampaignService campaignService;

  
    @PostMapping
    public ResponseEntity<CampaignDto> createCampaign(@RequestBody CampaignDto campaignDto){
        System.out.println("Succesfully Created!: " + campaignDto);
        CampaignDto savedCampaign = campaignService.createCampaign(campaignDto);
        return new ResponseEntity<>(savedCampaign, HttpStatus.CREATED);
    }

    @GetMapping("/test")
    public ResponseEntity<String> testEndpoint() {
        return new ResponseEntity<>("Test successful", HttpStatus.OK);
    }
    
    @GetMapping("{id}")
    public ResponseEntity<CampaignDto> getCampaignId(@PathVariable("id") Long campaignId){
        CampaignDto campaignDto = campaignService.getCampaignById(campaignId);
        return ResponseEntity.ok(campaignDto);
    }


    
    @GetMapping
    public ResponseEntity<List<CampaignDto>> getAllCampaigns(){
        List<CampaignDto> campaigns= campaignService.getAllCampaigns();
        return  ResponseEntity.ok(campaigns);
    }

    @PutMapping("{id}")
    public ResponseEntity<CampaignDto> updateCampaign(@PathVariable("id") Long campaignId,
                                                        @RequestBody CampaignDto updatedCampaign){
        CampaignDto campaignDto = campaignService.updateCampaign(campaignId, updatedCampaign);
        return ResponseEntity.ok(campaignDto);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteCampaign(@PathVariable("id") Long campaignId){
        campaignService.deleteCampaign(campaignId);
        return ResponseEntity.ok("Successfully Removed");
    }

}
