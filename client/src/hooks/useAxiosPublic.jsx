import axios from "axios";

const axiosPublic = axios.create({
    baseURL: "local"
})

const useAxiosPublic = () => {
    return axiosPublic
};

export default useAxiosPublic;