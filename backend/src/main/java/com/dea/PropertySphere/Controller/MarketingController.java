package com.dea.PropertySphere.Controller;

import com.dea.PropertySphere.Model.MarketingModel;
import com.dea.PropertySphere.Service.MarketingService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import java.util.List;
import java.util.Optional;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping(value = "/api/marketing")
public class MarketingController {

    @Autowired
    MarketingService marketingService;

    @PostMapping
    Void saveProposal(@RequestBody MarketingModel marketingProposal){
        marketingService.saveProposal(marketingProposal);
        System.out.println(marketingProposal.getProposalName() + " Saved!");
        return null;
    }

    @GetMapping
    public List<MarketingModel> getAllProposals() {
        return marketingService.getAllProposals();
    }
    @GetMapping("{id}")
    Optional<MarketingModel> getProposalById(@PathVariable("id") int marketingId){
        Optional<MarketingModel> marketingProposal = marketingService.getProposalById(marketingId);
        return marketingProposal;
    }

    @DeleteMapping("{id}")
    public void deleteProposal(@PathVariable("id") Integer marketingId){
        marketingService.deleteProposal(marketingId);
    }

    @PutMapping("{id}")
    public ResponseEntity<MarketingModel> updateProposal(@PathVariable("id") int marketingId, @RequestBody MarketingModel updatedMarketingProposal) {
        try {
            MarketingModel updatedProposal = marketingService.updateProposal(marketingId, updatedMarketingProposal);
            return ResponseEntity.ok(updatedProposal);  // Return the updated proposal
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);  // Handle proposal not found
        }
    }


}
