
import axios from "axios";

const API_BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:" +
      (process.env.PORT ? process.env.PORT
        : "4545") +
      "/api"
    : "/api";

const useApi = (url, config = null) => {
  return axios(API_BASE_URL + url, { ...config });
};

export default useApi;
