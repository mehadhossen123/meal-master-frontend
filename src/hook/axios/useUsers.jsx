
import useAxios from './useAxios';

import { useQuery } from '@tanstack/react-query';

const useUsers = () => {
     const publicAxios = useAxios();
    
     const { data: users=[], isLoading: userLoading } = useQuery({
       queryKey: ["user"],
     
       queryFn: async () => {
         const res = await publicAxios.get(`/user/all`)
         return res?.data;
       }
     });
    return {users,userLoading}
};

export default useUsers;