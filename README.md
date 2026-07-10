# Atividade Final - Bootcamp iTalents (Clean Architecture & SOLID)

Este repositório é uma refatoração completa e modernização de um projeto acadêmico de 2024 para o ano de 2026. O objetivo principal do projeto agora é demonstrar a aplicação estrita de padrões de **Clean Architecture** (Arquitetura Limpa), princípios **SOLID** de design e injeção de dependências nativa no ecossistema React.

## 🎯 Objetivo Arquitetural

Exercitar e validar o desacoplamento de responsabilidades entre as regras de negócio de domínio e as tecnologias de infraestrutura/visualização (React, Axios, LocalStorage). A aplicação é um catálogo de filmes integrado à API gratuita [The Movie DB (TMDb)](https://www.themoviedb.org), permitindo buscar filmes, filtrar por categorias e salvar favoritos em uma lista local persistida.

---

## 🏛️ Estrutura de Camadas (Clean Architecture)

O código está estruturado em 3 camadas (`src/business`, `src/infrastructure`, `src/presentation`), com as dependências fluindo sempre de fora pra dentro: `Presentation → Business → Infrastructure`, nunca o contrário.

### 1. Negócio (`src/business/`)
O núcleo do sistema. Não tem conhecimento de UI ou de detalhes concretos de infraestrutura — só de contratos (interfaces).
* **`domain/models`**: Entidades de negócio puras (ex: `Movie`).
* **`domain/dtos`**: Formato bruto dos dados como eles chegam da fonte externa (ex: `GetMovieDTO`, com campos `snake_case` da API do TMDb).
* **`domain/repositories`**: Contratos granulares (Princípio de Segregação de Interfaces - ISP), um por caso de uso (ex: `IGetMoviesByCategoryRepository`, `IGetUserListRepository`), sempre falando em DTO — nunca em entidade de domínio.
* **`domain/services`**: Contratos dos casos de uso (ex: `IGetMovieDetailsUseCase`), esses sim falando em entidade de domínio.
* **`domain/common`**: Tipos e interfaces compartilhados entre camadas — `IAPIResponse<T>`, `IHttpClient`, `IStorageService`, `IConfigService`, enums (`CodeMessagesEnum`, `MovieCategoryEnum`).
* **`services/`**: Implementação dos casos de uso (SRP — um arquivo por operação, ex: `services/movie/get-movie-details.ts`). Serviços de listagem/detalhe estendem classes base (`services/base/`) que resolvem o fluxo padrão e delegam ao service concreto só o mapeamento DTO → Entidade.
* **`mappers/`**: Conversão explícita DTO ↔ Entidade (ex: `MovieMapper`), usada exclusivamente pelos `services/` — nunca pela infraestrutura.
* **`tools/`**: Utilitários de domínio framework-agnostic (ex: `AppError`, `filterMoviesBySearch`).
* **`query-hooks/`**: Camada de adaptação para o TanStack Query — um hook de `useQuery`/`useMutation` por operação, resolvendo o caso de uso via Inversify e expondo o resultado para a presentation.

### 2. Infraestrutura (`src/infrastructure/`)
Implementações concretas dos contratos definidos no domínio. Fala sempre em DTO — o mapeamento pra entidade de domínio é responsabilidade do `business/services`, nunca daqui.
* **`repositories/`**: Uma classe por operação (ex: `repositories/movie/get-details.ts`), implementando os contratos de `business/domain/repositories`. As operações de `get`/`get-by-category` estendem classes base (`repositories/base/`).
* **`adapters/`**: Implementações concretas dos protocolos de infra definidos no domínio — `AxiosHttpClient` (`IHttpClient`), `LocalStorageService` (`IStorageService`), `EnvConfigService` (`IConfigService`).
* **`interceptors/`**: Interceptors de request/response do Axios (log de erros e mapeamento de status HTTP para `AppError`).
* **`utils/`**: Helpers exclusivos da infra, como `handleResponseRepository` (padroniza o envelope `IAPIResponse<T> | AppError`).

### 3. Apresentação (`src/presentation/`)
A interface de usuário, consumindo o business layer exclusivamente através de casos de uso injetados via Inversify (nunca resolve `infrastructure/` diretamente).
* **`components/`**: Organizados por Atomic Design (`atoms/`, `molecules/`, `organisms/`). Cada componente segue o padrão `index.tsx` (JSX puro) + `hook.ts` (estado, efeitos, resolução de DI) + `styles.ts` (styled-components).
* **`pages/`**: Páginas da aplicação, seguindo o mesmo padrão `index.tsx` + `hook.ts`.
* **`routes/`**: Configuração de rotas baseada em arquivos do **TanStack Router**.

### Diretórios de apoio (fora das 3 camadas)
* **`src/hooks/`**: Hooks React genéricos, compartilhados por toda a aplicação (ex: `useConfig`).
* **`src/context/`**: Contextos React (ex: tema/styled-components).
* **`src/utils/`**: Funções utilitárias puramente de framework/UI, sem regra de negócio (ex: formatação de data).
* **`src/assets/`**: Recursos estáticos e traduções (`i18n/`, `images/`).

---

## 🔌 Injeção de Dependências (`src/libs/inversifyjs/`)

A inicialização e amarração de todas as dependências são coordenadas via **InversifyJS**, com *Constructor Injection* nas classes concretas de serviços e repositórios:
* **`tokens/`**: Símbolos de injeção segregados por entidade (`movie-tokens.ts`, `user-list-tokens.ts`, `infrastructure-tokens.ts`) — nunca um arquivo único e monolítico.
* **`modules/`**: Um `ContainerModule` por entidade (`movie-module.ts`, `user-list-module.ts`, `infrastructure-module.ts`), registrando seus próprios repositórios e casos de uso.
* **`container.ts`**: Cria o `Container` e carrega todos os módulos acima.

---

## 🛡️ Tratamento de Erros e Respostas de Domínio

Os fluxos lógicos e casos de uso adotam uma abordagem funcional livre de `throw` não tratado:
* **`IAPIResponse<T>`**: Envelope padronizado para retornos de sucesso, contendo `success: boolean`, `data: T` e um campo opcional `errors`.
* **`AppError`**: Classe de domínio que estende `Error`, carregando um `code: CodeMessagesEnum` — o código de erro de negócio usado tanto pela infraestrutura (quem lança) quanto pela presentation (quem traduz pra mensagem via i18n).

Todo caso de uso devolve `Promise<IAPIResponse<T> | AppError>`; quem consome verifica `instanceof AppError` antes de acessar `.data`.

---

## 🚀 Como Executar o Projeto

### Pré-requisitos
* Node.js instalado na máquina.
* Uma chave de API gratuita do [The Movie DB](https://www.themoviedb.org).

### Passo a Passo

1. **Clone o Repositório**:
   ```bash
   git clone https://github.com/MauricioAlvesS/clean_architecture_test.git
   ```

2. **Instale as Dependências**:
   ```bash
   npm install
   ```

3. **Configure as Variáveis de Ambiente**:
   Crie um arquivo `.env` na raiz do projeto:
   ```env
   VITE_API_KEY=sua_chave_de_api_aqui
   ```

4. **Inicie o Servidor de Desenvolvimento (Vite)**:
   ```bash
   npm run dev
   ```
   A aplicação subirá localmente em `http://localhost:5173/`.

5. **Gere o Build de Produção**:
   ```bash
   npm run build
   ```

---

## 🛠️ Tecnologias Utilizadas

* **React 18** & **TypeScript**
* **Vite** (Build system)
* **InversifyJS** & **reflect-metadata** (Container de IoC e Injeção de Dependências)
* **styled-components** (Estilização in-JS)
* **Axios** (Integração HTTP)
* **TanStack Router** (Roteamento baseado em arquivos)
* **TanStack Query** (Gerenciamento de cache e requisições assíncronas)
* **TanStack Form** & **Zod** (Formulários e validação)
* **react-i18next** (Internacionalização)
* **Sonner** (Notificações visuais/toasts)
