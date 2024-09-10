import { api, requestConfig } from '../utils/config';

// Get user details
const profile = async (data, token) => {
    const config = requestConfig("GET", data, token);
    // console.log("Request Config:", config); // Adicione este console.log

    try {
        const res = await fetch(api + "/users/profile", config)
            .then((res) => res.json())
            .catch((err) => err);
        // console.log("Response Data:", res); // Adicione este console.log
        return res;
    } catch (error) {
        console.log("Error:", error.message);
    }
};

const userService = {
    profile,
};

export default userService;
