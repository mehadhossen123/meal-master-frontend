import { useQuery } from "@tanstack/react-query";
import React, { use } from "react";
import useAxios from "./axios/useAxios";
import { AuthContext } from "../auth/AuthContext";

const useRole = () => {
  const publicAxios = useAxios();
  const { user } = use(AuthContext);
  const {data:userRole="",isLoading:roleLoading} = useQuery({
    queryKey: ["user",user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await publicAxios.get(`/user?email=${user?.email}`);
      return res?.data?.role;
    },
  });
  return {userRole,roleLoading};
};

export default useRole;
