import api from "./config";

export const fetchData = async (endpoint: string, params = {}) => {
  const response = await api.get(endpoint, { params });
  return response.data;
};
