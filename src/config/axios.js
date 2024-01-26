import axios from "axios";

export const API = axios.create({
    baseURL: `${import.meta.env.VITE_BASE_URL}/${import.meta.env.VITE_KEY}`,
    headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
    }
});

export const APIwithToken = (token) => axios.create({
    baseURL: `${import.meta.env.VITE_BASE_URL}/${import.meta.env.VITE_KEY}`,
    headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`
    }
});