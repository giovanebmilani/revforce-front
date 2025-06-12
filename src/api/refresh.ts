import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;
const ACCOUNT_ID = localStorage.getItem("account_id");
const GET_REFRESH_ENDPOINT = `${API_BASE_URL}/refresh/${ACCOUNT_ID}`;
const POST_REFRESH_ENDPOINT = `${API_BASE_URL}/refresh`;

export type RefreshData = {
    next_refresh_time: string;
};

export const useGetRefresh = () => {
    return useMutation({
        mutationKey: ["getRefresh"],
        mutationFn: async () => {
            try {
                if (!ACCOUNT_ID) {
                    throw new Error("Account ID not found in local storage.");
                }
                const response = await axios.get<RefreshData>(GET_REFRESH_ENDPOINT, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                return response.data;
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    const friendlyMessage =
                        error.response?.data?.message || error.message;
                    throw new Error(friendlyMessage);
                } else {
                    throw new Error("An unexpected error occurred.");
                }
            }
        },
    });
};

export const usePostRefresh = () => {
    return useMutation({
        mutationKey: ["postRefresh"],
        mutationFn: async () => {
            try {
                if (!ACCOUNT_ID) {
                    throw new Error("Account ID not found in local storage.");
                }
                const response = await axios.post<RefreshData>(
                    POST_REFRESH_ENDPOINT,
                    { account_id: ACCOUNT_ID },
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                return response.data;
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    const friendlyMessage =
                        error.response?.data?.message || error.message;
                    throw new Error(friendlyMessage);
                } else {
                    throw new Error("An unexpected error occurred.");
                }
            }
        },
    });
};
