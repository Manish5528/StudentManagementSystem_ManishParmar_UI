import axiosClient from "./axiosClient";

export const courseApi = {
  getAll: () => axiosClient.get("/course"),
  importCSV: (formData: FormData) =>
    axiosClient.post("/course/import", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
};
