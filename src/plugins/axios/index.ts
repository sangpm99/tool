import axios from "axios";

axios.defaults.headers.common["contentType"] = "application/json";
axios.defaults.headers.common["Cache-Control"] = "no-cache";
axios.defaults.headers.common["Cache-control"] = "no-store";
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.common["Pragma"] = "no-cache";
axios.defaults.headers.common["Expires"] = 0;
axios.defaults.headers.common["X-Request-With"] = "XMLHttpRequest";
axios.defaults.withCredentials = true;

const axiosDefault = axios.create();

axiosDefault.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;

export { axiosDefault };
