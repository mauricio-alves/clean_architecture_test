import { useTranslation } from "react-i18next";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Movie } from "@/business/domain/models/movie/Movie";
import { container } from "libs/inversifyjs/container";
import { UserListTokens } from "libs/inversifyjs/tokens/userListTokens";
import { GetUserList } from "business/services/userList/GetUserList";
import { AddMovieToUserList } from "business/services/userList/AddMovieToUserList";
import { RemoveMovieFromUserList } from "business/services/userList/RemoveMovieFromUserList";
import { toast } from "@/presentation/components/atoms/Toast/hook";
import AppError from "@/business/tools/AppError";
import { CodeMessagesEnum } from "@/business/domain/common/enums/code-messages";
import { messageCodeToI18nKey } from "utils/messageCodeToI18nKey";

export const useUserList = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const getUserListUseCase = container.get<GetUserList>(UserListTokens.IGetUserList);
  const addMovieToUserListUseCase = container.get<AddMovieToUserList>(UserListTokens.IAddMovieToUserList);
  const removeMovieFromUserListUseCase = container.get<RemoveMovieFromUserList>(UserListTokens.IRemoveMovieFromUserList);

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

  const addMovieMutation = useMutation({
    mutationFn: async (movie: Movie) => {
      const response = await addMovieToUserListUseCase.execute(movie);
      if (response instanceof AppError) {
        throw response;
      }
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["userList"], data);
      toast({
        title: String(t(messageCodeToI18nKey[CodeMessagesEnum.MOVIE_ADDED_TO_LIST] as any)),
        variant: "success",
      });
    },
    onError: (error: any) => {
      if (error instanceof AppError) {
        toast({ title: String(t(messageCodeToI18nKey[error.code] as any)), variant: "destructive" });
      } else {
        toast({ title: String(t(messageCodeToI18nKey[CodeMessagesEnum.ERROR_ADD_MOVIE] as any)), variant: "destructive" });
      }
    },
  });

  const removeMovieMutation = useMutation({
    mutationFn: async (movieId: number) => {
      const response = await removeMovieFromUserListUseCase.execute(movieId.toString());
      if (response instanceof AppError) {
        throw response;
      }
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["userList"], data);
      toast({
        title: String(t(messageCodeToI18nKey[CodeMessagesEnum.MOVIE_REMOVED_FROM_LIST] as any)),
        variant: "success",
      });
    },
    onError: (error: any) => {
      if (error instanceof AppError) {
        toast({ title: String(t(messageCodeToI18nKey[error.code] as any)), variant: "destructive" });
      } else {
        toast({ title: String(t(messageCodeToI18nKey[CodeMessagesEnum.ERROR_REMOVE_MOVIE] as any)), variant: "destructive" });
      }
    },
  });

  const addMovie = async (movie: Movie) => {
    try {
      await addMovieMutation.mutateAsync(movie);
    } catch {
      // Errors are handled in onError
    }
  };

  const removeMovie = async (movieId: number) => {
    try {
      await removeMovieMutation.mutateAsync(movieId);
    } catch {
      // Errors are handled in onError
    }
  };

  return {
    userList,
    loading,
    addMovie,
    removeMovie,
  };
};
