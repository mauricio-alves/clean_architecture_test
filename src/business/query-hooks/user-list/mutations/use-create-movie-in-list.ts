import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Movie } from "@/business/domain/models/movie/movie";
import { container } from "libs/inversifyjs/container";
import { UserListTokens } from "libs/inversifyjs/tokens/user-list-tokens";
import type { ICreateMovieInUserListUseCase } from "@/business/domain/services/user-list/create-movie-in-user-list";
import AppError from "@/business/tools/app-error";

type UseCreateMovieInListProps = {
  onSuccess?: () => void;
  onError?: (err: AppError) => void;
};

export const useCreateMovieInList = ({ onSuccess, onError }: UseCreateMovieInListProps = {}) => {
  const queryClient = useQueryClient();
  const CreateMovieInUserListUseCase = container.get<ICreateMovieInUserListUseCase>(UserListTokens.ICreateMovieInUserList);

  const mutation = useMutation({
    mutationFn: async (movie: Movie) => {
      const response = await CreateMovieInUserListUseCase.execute(movie);
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
    createMovie: (movie: Movie) => {
      mutation.mutate(movie);
    },
    isAdding: mutation.isPending,
  };
};
