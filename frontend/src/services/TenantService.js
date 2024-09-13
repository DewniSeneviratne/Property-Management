import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/api/tenants';

//Return the list of all the tenants
export const listTenants = ()=>axios.get(REST_API_BASE_URL);

//Create tenant
export const createTenant = (tenant) => axios.post(REST_API_BASE_URL, tenant);

//Get tenant by ID
export const getTenant = (tenantId) => axios.get(REST_API_BASE_URL+'/'+tenantId);

//Update tenant
export const updateTenant = (tenantId, tenant) => axios.put(REST_API_BASE_URL + '/'+ tenantId, tenant);

//DeleteTenant
export const deleteTenant = (tenantId) => axios.delete(REST_API_BASE_URL + '/' + tenantId);