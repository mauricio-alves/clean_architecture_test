import { useQuery } from "@tanstack/react-query";
import { container } from "libs/inversifyjs/container";
import { UserListTokens } from "libs/inversifyjs/tokens/user-list-tokens";
import type { IGetUserListUseCase } from "@/business/domain/services/user-list/get-user-list";
import AppError from "@/business/tools/app-error";

export const useUserList = () => {
  const getUserListUseCase = container.get<IGetUserListUseCase>(UserListTokens.IGetUserList);

  const { data: userList = [], isLoading: loading } = useQuery({
    queryKey: ["userList"],
    queryFn: async () => {
      const response = await getUserListUseCase.execute();
      if (response instanceof AppError) {
        console.error(response.message);
        throw response;
      }
      return response.data;
    },
  });

  return {
    userList,
    loading,
  };
};
