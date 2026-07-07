export const formatDate = (dateString: string, language: string): string => {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) {
    return "Data inválida";
  }
  return date.toLocaleDateString(language === "pt" ? "pt-BR" : "en-US");
};
