import axios from "axios";
const healthITgov = axios.create({
  baseURL: "https://www.healthit.gov/data/open-api?source=hospital-mu-public-health-measures.csv",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});
export const apiService = {};