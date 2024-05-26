
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import {useQuery} from '@tanstack/react-query'

const useRole = () => {
    const axiosSecure = useAxiosSecure()
    const {user, loading} = useAuth()  
    // Fetch user info using logged in user email

    const {data:role, isLoading} = useQuery({
        queryKey: ['role', user?.email],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            const {data} = await axiosSecure(`/user/${user.email}`)
            return data.role
        }
    })
    return [role, isLoading]
};

export default useRole;