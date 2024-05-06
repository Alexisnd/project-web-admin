import { post } from "@/services/apiService";

export const loginAdmin = async (user: string, password: string) => {
    const data = await post("/auth/admin/login",{email: user, password});
    return data;
}