import axios from "axios";

const PROPERTY_API_BASE_URL = 'http://localhost:8080/api/property';

// Return the list of all properties
export const listProperties = () => axios.get(PROPERTY_API_BASE_URL);

// Create a new property
export const createProperty = (property) => axios.post(PROPERTY_API_BASE_URL, property);

// Get a property by ID
export const getProperty = (propertyId) => axios.get(`${PROPERTY_API_BASE_URL}/${propertyId}`);

// Update a property
export const updateProperty = (propertyId, property) => axios.put(`${PROPERTY_API_BASE_URL}/${propertyId}`, property);

// Delete a property
export const deleteProperty = (propertyId) => axios.delete(`${PROPERTY_API_BASE_URL}/${propertyId}`);
