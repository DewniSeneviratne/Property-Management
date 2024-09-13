package com.dea.PropertySphere.Service;

import com.dea.PropertySphere.Model.MarketingModel;

import java.util.List;
import java.util.Optional;

public interface MarketingService {

    MarketingModel saveProposal(MarketingModel marketingModel);
    List<MarketingModel> getAllProposals();

    Optional<MarketingModel> getProposalById(int proposalID);

    void deleteProposal(int proposalID);

    MarketingModel updateProposal(int proposalID, MarketingModel updatedProposal);
}
