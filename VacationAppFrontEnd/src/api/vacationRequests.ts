import api from "./axiosConfig";

export const getAll = () => api.get("/VacationRequests");
export const getById = (id: number) => api.get(`/VacationRequests/${id}`);
export const create = (dto: any) => api.post("/VacationRequests", dto);
export const update = (id: number, dto: any) =>
  api.put(`/VacationRequests/${id}`, dto);
export const remove = (id: number) => api.delete(`/VacationRequests/${id}`);
export const approve = (id: number) =>
  api.post(`/VacationRequests/${id}/approve`);
export const reject = (id: number) =>
  api.post(`/VacationRequests/${id}/reject`);
