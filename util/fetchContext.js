import { API } from "../config";
import axios from "axios";

export const fetchContext = async (token) => {
  try {
    const { data } = await axios.get(`${API}/context`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      timeout: 5000,
    });
    return data;
  } catch (err) {
    return null;
  }
};
