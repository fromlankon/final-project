import { API } from "../config/axios";

export const getProducts = async (filters) => {
    const page = 1;
    const perPage = 999;
    const search = "";

    try {
        let res = await API.get(`/site/products?page=${page}&perPage=${perPage}&search=${search}`, { params: filters });
        return res.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getSingleProduct = async (_id) => {
    try {
        let res = await API.get(`/site/products/${_id}`);
        return res.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getBrands = async () => {
    try {
        let res = await API.get("/site/brands");
        return res.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}