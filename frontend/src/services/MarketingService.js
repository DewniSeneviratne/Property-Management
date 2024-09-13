import axios from "axios";

const MARKETING_API_BASE_URL = 'http://localhost:8080/api/marketing';

// Return the list of all the marketing proposals
export const listMarketingProposals = () => axios.get(MARKETING_API_BASE_URL);

// Create a new marketing proposal
export const createMarketingProposal = (marketingProposal) => axios.post(MARKETING_API_BASE_URL, marketingProposal);

// Get a marketing proposal by ID
export const getMarketingProposal = (proposalId) => axios.get(MARKETING_API_BASE_URL + '/' + proposalId);

// Update a marketing proposal
export const updateMarketingProposal = (proposalId, marketingProposal) => axios.put(MARKETING_API_BASE_URL + '/' + proposalId, marketingProposal);

// Delete a marketing proposal
export const deleteMarketingProposal = (proposalId) => axios.delete(MARKETING_API_BASE_URL + '/' + proposalId);
