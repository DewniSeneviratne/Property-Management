package com.dea.PropertySphere.Service.Implimentation;

import com.dea.PropertySphere.Model.MarketingModel;
import com.dea.PropertySphere.Service.MarketingService;
import com.dea.PropertySphere.repository.MarketingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MarketingServiceImpl implements MarketingService {

    @Autowired
    MarketingRepository marketingRepository;


    public MarketingModel saveProposal(MarketingModel marketingModel) {
        return marketingRepository.save(marketingModel);
    }
    @Override
    public List<MarketingModel> getAllProposals() {
        return marketingRepository.findAll();
    }
    public Optional<MarketingModel> getProposalById(int proposalID) {
        if (marketingRepository.findById(proposalID).isEmpty()) {
            System.out.println("Proposal Not Found!!!");
            return Optional.empty();
        } else {
            return marketingRepository.findById(proposalID);
        }
    }

    public void deleteProposal(int proposalID) {
        if (marketingRepository.findById(proposalID).isEmpty()) {
            System.out.println("Proposal Not Exists");
        } else {
            marketingRepository.deleteById(proposalID);
            System.out.println("Proposal(" + proposalID + ") Deleted ");
        }
    }

    @Override
    public MarketingModel updateProposal(int proposalID, MarketingModel updatedProposal) {
        return marketingRepository.findById(proposalID)
                .map(existingProposal -> {
                    // Set all the fields that need to be updated
                    existingProposal.setProposalName(updatedProposal.getProposalName());
                    existingProposal.setProposalDescription(updatedProposal.getProposalDescription()); // Example
                    existingProposal.setProposalApproval(updatedProposal.getProposalApproval());
                    return marketingRepository.save(existingProposal);
                })
                .orElseThrow(() -> new RuntimeException("Proposal Not Found with id " + proposalID));
    }
}
