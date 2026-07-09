import { useMutation, useQueryClient } from "@tanstack/react-query";
import { container } from "libs/inversifyjs/container";
import { UserListTokens } from "libs/inversifyjs/tokens/user-list-tokens";
import type { IDeleteMovieFromUserListUseCase } from "@/business/domain/services/user-list/delete-movie-from-user-list";
import AppError from "@/business/tools/app-error";

type UseDeleteMovieFromListProps = {
  onSuccess?: () => void;
  onError?: (err: AppError) => void;
};

export const useDeleteMovieFromList = ({ onSuccess, onError }: UseDeleteMovieFromListProps = {}) => {
  const queryClient = useQueryClient();
  const DeleteMovieFromUserListUseCase = container.get<IDeleteMovieFromUserListUseCase>(UserListTokens.IDeleteMovieFromUserList);

  const mutation = useMutation({
    mutationFn: async (movieId: number) => {
      const response = await DeleteMovieFromUserListUseCase.execute(movieId.toString());
      if (response instanceof AppError) {
        throw response;
      }
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["userList"], data);
      onSuccess?.();
    },
    onError: (err: any) => {
      onError?.(err);
    }
  });

  return {
    deleteMovie: (movieId: number) => {
      mutation.mutate(movieId);
    },
    isRemoving: mutation.isPending,
  };
};
