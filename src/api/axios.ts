import axios from "axios";

// const URL = "https://chatbot-be-0654.onrender.com";
const BASE_URL = "http://localhost:8000";

export const axiosClient = axios.create({
  baseURL: BASE_URL,
});
