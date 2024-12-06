import axios from "axios";

// This code was taken from the Code Institute's Moments walkthrough.
axios.defaults.baseURL = "https://artly-api-a39d790259f4.herokuapp.com/";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;