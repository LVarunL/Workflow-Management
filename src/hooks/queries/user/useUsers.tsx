import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../../../common/utils/enums";
import UserServices from "../../../services/userServices";

export const useUsers = () => {
  return useQuery({
    queryKey: [QueryKeys.USERS],
    queryFn: UserServices.getUsers,
  });
};
