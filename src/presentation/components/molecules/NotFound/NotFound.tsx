import notFoundImg from "assets/images/not-found.png";
import { NotFoundContainer, NotFoundImage } from "./styles";

export const NotFound = () => {
  return (
    <NotFoundContainer>
      <NotFoundImage src={notFoundImg} alt="imagem de não encontrado" />
      <p>Desculpe, nenhum filme encontrado. Tente novamente!</p>
    </NotFoundContainer>
  );
};
