import { NotFound } from "@/presentation/components/molecules/NotFound";
import { Card } from "@/presentation/components/organisms/Card";
import {
  UserListContainer,
  UserListTitle,
  BackButtonWrapper,
  ListBackButton,
  ListGrid
} from "./styles";
import { useDetailsUserList } from "./hook";

export const DetailsUserListPage = () => {
  const { t, userList } = useDetailsUserList();

  return (
    <UserListContainer>
      <div>
        <UserListTitle>{t("myList.title")}</UserListTitle>
      </div>
      <BackButtonWrapper>
        <ListBackButton to="/">
          {t("common.backToHome")}
        </ListBackButton>
      </BackButtonWrapper>
      <div style={{ width: "100%" }}>
        {userList.length === 0 ? (
          <NotFound />
        ) : (
          <ListGrid>
            {userList.map((movie) => (
              <Card key={movie.id} movie={movie} variant="remove" />
            ))}
          </ListGrid>
        )}
      </div>
    </UserListContainer>
  );
};
