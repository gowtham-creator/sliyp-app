import axios from "axios";

const api = axios.create({
  baseURL: "https://user-service-ib7aiys5la-el.a.run.app/api/v1",
});
export default api;
