import axiosClient from "./axiosClient";

export interface StudentPayload {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  emailId: string;
  classIds: string[];
}

export const studentApi = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getAll: (params: any) => axiosClient.get("/student", { params }),
  getById: (id: string) => axiosClient.get(`/student/${id}`),
  create: (data: StudentPayload) => axiosClient.post("/student", data),
  update: (id: string, data: StudentPayload) => axiosClient.put(`/student/${id}`, data),
  delete: (id: string) => axiosClient.delete(`/student/${id}`),
};
