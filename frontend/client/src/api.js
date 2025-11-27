import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/api",
});

export default api;


//a reusable API instance for making HTTP requests to the backend server.
// This instance is configured with a base URL, allowing other parts of the frontend
//  application to easily make requests to the backend without repeatedly specifying the full URL.

