import { API } from "../config/axios";

export const RegisterCall = (data) => {
    let res = API.post("/site/register", data)
    return res
};

export const LoginCall = (data) => {
    let res = API.post("/login", data)
    return res
};

export const ProfileCall = () => {
    let res = API.get("/profile")
    return res
};