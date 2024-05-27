import { get, post } from "@/services/apiService";

export const getBrands = async () => {
    const data = await get("/brand/getAll");
    return data;
}