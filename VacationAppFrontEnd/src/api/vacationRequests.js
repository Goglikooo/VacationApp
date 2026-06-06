import api from "./axiosConfig";

export const getAll = () => api.get("/VacationRequests");
export const getById = (id) => api.get(`/VacationRequests/${id}`);
export const create = (dto) => api.post("/VacationRequests", dto);
export const update = (id, dto) => api.put(`/VacationRequests/${id}`, dto);
export const remove = (id) => api.delete(`/VacationRequests/${id}`);
export const approve = (id) => api.post(`/VacationRequests/${id}/approve`);
export const reject = (id) => api.post(`/VacationRequests/${id}/reject`);
