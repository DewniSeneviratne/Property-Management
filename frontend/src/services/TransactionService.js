import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/api/transactions';

export const listTransaction = ()=>axios.get(REST_API_BASE_URL);

export const createTransaction = (tenant) => axios.post(REST_API_BASE_URL, tenant);

export const getTransaction = (tenantId) => axios.get(REST_API_BASE_URL+'/'+tenantId);

export const updateTransaction = (tenantId, tenant) => axios.put(REST_API_BASE_URL + '/'+ tenantId, tenant);

export const deleteTransaction = (tenantId) => axios.delete(REST_API_BASE_URL + '/' + tenantId);