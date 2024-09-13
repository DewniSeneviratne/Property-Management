import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/api/campaigns';

// Return the list of all the campaigns
export const listCampaigns = () => axios.get(REST_API_BASE_URL);

// Create campaign
export const createCampaign = (campaign) => axios.post(REST_API_BASE_URL, campaign);

// Get campaign by ID
export const getCampaign = (campaignId) => axios.get(`${REST_API_BASE_URL}/${campaignId}`);

// Update campaign
export const updateCampaign = (campaignId, campaign) => axios.put(`${REST_API_BASE_URL}/${campaignId}`, campaign);

// Delete campaign
export const deleteCampaign = (campaignId) => axios.delete(`${REST_API_BASE_URL}/${campaignId}`);
