import React from 'react';
import useAxiosSecure from './UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import UseAuth from './UseAuth';

const useUserRole = () => {
    const {user, loading} = UseAuth();
    const axiosSecure = useAxiosSecure();
    
    const {data: roleData = {}, isLoading: roleLoading} = useQuery({
        queryKey: ["userRole", user?.email],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/email/${user.email}`);
            console.log(res.data);
            return res.data;
        }
    })

    const role = roleData?.role;
    return {role, roleLoading};
};

export default useUserRole;