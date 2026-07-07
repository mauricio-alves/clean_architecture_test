# Walkthrough - Migração para Clean Architecture & SOLID

A migração de arquitetura do projeto foi realizada com sucesso. O código foi totalmente portado de JavaScript para TypeScript, adotando os princípios de **Clean Architecture**, **SOLID estrito**, injeção de dependências via **InversifyJS** e organização de interface com **Atomic Design**.

---

## O que foi realizado

1. **Configuração do Ambiente, Vite e TypeScript**:
   - Habilitação do TypeScript com suporte nativo a decorators e metadados (`experimentalDecorators`, `emitDecoratorMetadata` no `tsconfig.json`).
   - Configuração do **Vite** como empacotador e servidor de desenvolvimento em substituição ao antigo Create React App (`react-scripts`).
   - Configuração de plugins do Babel (`babel-plugin-transform-typescript-metadata`, `@babel/plugin-proposal-decorators` e `@babel/plugin-proposal-class-properties`) integrados nativamente no `vite.config.ts`. Essa configuração resolve de forma nativa e limpa a transpilação e emissão de metadados exigida pelo ecossistema do InversifyJS.
   - Configuração de alias de caminhos no Vite para manter suporte aos **imports absolutos** (ex: `domain/...`).
   - Utilização de **Injeção de Construtor Clássica (Constructor Injection)** com decorators nativos (`@inject`) em todos os parâmetros dos construtores de classes e casos de uso, sem necessidade de injeção programática ou propriedades soltas.

2. **Divisão de Responsabilidades e Camadas (Clean Architecture & SOLID)**:

   ### Camada de Domínio (`src/domain/`)
   - **`entities/Movie.ts`**: Entidade de negócio limpa e independente de infraestrutura tecnológica.
    - **`common/custom-error.ts`**: Interface `ICustomError` para padronização de erros estruturados de API.
    - **`dtos/common/error-message.ts`**: Interface `ErrorMessage` definindo a estrutura de dados de erros.
    - **`errors/AppError.ts`**: Classe de exceção de domínio personalizada (`AppError` estendendo `Error`) que encapsula o `ICustomError` e provê getters públicos correspondentes.
    - **`repositories/`**: Segregação de interfaces (ISP) e responsabilidade única (SRP):
      - `movie/IGetMoviesByCategoryRepository.ts` e `IGetMovieDetailsRepository.ts`: Interfaces segregadas (ISP) para consulta ao catálogo de filmes.
      - `userList/IGetUserListRepository.ts`, `IAddMovieToUserListRepository.ts` e `IRemoveMovieFromUserListRepository.ts`: Interfaces segregadas (ISP) para as operações da lista pessoal do usuário.
   - **`useCases/`**: Centraliza os Casos de Uso padronizados por contratos comuns:
     - `IUseCase.ts`: Interface de contrato genérica do Caso de Uso.
     - `IAPIResponse.ts`: Interface de envelope de resposta estruturado de API contendo `.data` e `.message` de metadados.
     - **Implementações**:
       - `movie/GetMovieDetails.ts` e `GetMoviesByCategory.ts`
        - `userList/GetUserList.ts`, `AddMovieToUserList.ts` e `RemoveMovieFromUserList.ts` (retornando a união de tipos `IAPIResponse | AppError` para tratamento de erros e respostas de forma puramente funcional).

   ### Camada de Dados (`src/data/`)
   - **`protocols/`**: Abstrações de infraestrutura (Inversão de Dependência - DIP):
      - `IHttpClient.ts`: Interface genérica para chamadas HTTP estruturadas com passagem de `HttpGetParams` e retornos envelopados com `HttpResponse<T>` (contendo `statusCode` e `body`).
     - `IStorageService.ts`: Interface genérica de leitura e escrita.
     - `IConfigService.ts`: Interface genérica para chaves de configuração.
   - **`dtos/MovieDTO.ts`**: Definição exata da estrutura de dados externa vinda da API (snake_case), isolando o Domínio de variações externas.
   - **`mappers/MovieMapper.ts`**: Mapper explícito convertendo de DTOs e persistência para as entidades tipadas de Domínio em camelCase (e vice-versa).
   - **`dataSources/`**: Detalhe de transporte de dados dependendo apenas de interfaces:
     - `remote/MovieRemoteDataSource.ts` (consome `IHttpClient` e `IConfigService`).
     - `local/MovieLocalDataSource.ts` (consome `IStorageService`).
   - **`repositories/`**: Implementações concretas das interfaces de domínio:
      - `movie/GetMoviesByCategoryRepositoryImpl.ts` e `GetMovieDetailsRepositoryImpl.ts` (implementações segregadas correspondentes).
     - `userList/GetUserListRepositoryImpl.ts`, `AddMovieToUserListRepositoryImpl.ts` e `RemoveMovieFromUserListRepositoryImpl.ts` (implementações segregadas das interfaces correspondentes).

    ### Camada de Apresentação (`src/presentation/`)
    - **`context/UserListContext.tsx`**: Contexto React que consome os casos de uso injetados pelo container e compartilha o estado da lista personalizada (favoritos) do usuário.
    - **`hooks/`**: Custom hooks que encapsulam o ciclo de vida do carregamento e manipulação de dados para as páginas:
      - `movie/useMovies.ts` (catálogo geral de filmes na Home).
      - `movie/useMovieDetails.ts` (página de detalhes de um filme).
      - `userList/useUserList.ts` (facade para consumo da lista do usuário).
    - **`components/` (Atomic Design)**:
      - **Atoms**: `Button.tsx` (botão de ação com styled-components e suporte a variantes).
      - **Molecules**: `Search.tsx` (barra de busca) e `NotFound.tsx` (mensagem de erro).
      - **Organisms**: `Card.tsx` (card do filme).
      - `Header/` e `Footer/` (organismos visuais de topo e base da aplicação).
    - **`pages/`**:
      - `Home/Home.tsx`, `DetailsMoviePage/DetailsMoviePage.tsx` e `DetailsUserListPage/DetailsUserListPage.tsx` (telas da aplicação).
    - **`routes.tsx`**: Isolamento de rotas do `react-router-dom` fora do arquivo `App.tsx`.

    ### Camada de Infraestrutura Concreta (`src/infrastructure/`)
    - **`interceptors/`**:
      - `request.ts`: Intercepta e loga no console todas as requisições disparadas.
      - `response.ts`: Intercepta e centraliza o tratamento de erros HTTP (401, 404, 500) mapeando para exceções amigáveis.
    - **`services/`**: Subpasta que centraliza os serviços e adaptadores concretos de infraestrutura:
      - `AxiosHttpClient.ts`: Cliente HTTP concreto (`IHttpClient`) encapsulando o Axios e acoplando os interceptadores.
      - `LocalStorageService.ts`: Serviço concreto de persistência local (`IStorageService`) no browser.
      - `EnvConfigService.ts`: Provedor concreto de configurações de ambiente (`IConfigService`).

    ### Camada de Bibliotecas / Containers (`src/libs/`)
    - **`inversifyjs/`**:
      - `tokens.ts`: Símbolos identificadores das abstrações (`TOKENS`).
      - **`container/`**: Subpasta que inicializa os contêineres de injeção de dependência:
        - `index.ts`: Ponto de partida central de IoC configurado com `{ defaultScope: "Singleton" }` e responsável pelo carregamento dos sub-módulos.
        - `infrastructureModule.ts`: Bindings dos serviços comuns de infraestrutura.
        - `movieModule.ts`: Bindings do fluxo e casos de uso de filmes.
        - `userListModule.ts`: Bindings do fluxo e casos de uso da lista de favoritos.
    - **`styled-components/`**:
      - `index.ts`: Adaptador e re-exportador da biblioteca `styled-components` para evitar acoplamento direto fora de `libs`.
      - `global.ts`: Definição de reset global de box-sizing e tipografia padrão do projeto in-JS.

3. **Bootstrap e Limpeza**:
   - `App.tsx` simplificado, atuando puramente como inicializador do provedor global do contexto (`UserListProvider`) e renderizando as rotas desacopladas.
   - `index.tsx` contendo o bootstrap global com inicialização obrigatória de metadados (`import "reflect-metadata"` na primeira linha).
   - Remoção de todos os arquivos legados JavaScript (`.js`) duplicados.
   - **Estilização in-JS (styled-components)**: Remoção de todos os arquivos `.css` e `.module.css` obsoletos (`global.css`, `style.module.css`). O projeto agora utiliza `styled-components` para todos os estilos visuais, adotando um estilo de reset global (`src/libs/styled-components/global.ts`) e estilizações encapsuladas e modulares por componente (`styles.ts`).

---

## Verificação e Build

- Executada a checagem de tipos estáticos com `npx tsc --noEmit` obtendo **sucesso de integridade sem nenhum erro**.
- Executado o empacotamento completo com `npm run build` gerando a build estática de produção via Vite (na pasta `/dist`) com **sucesso**.

---

## Como Rodar e Testar

1. Certifique-se de configurar a sua chave de API no arquivo `.env` (baseado no `.example.env`):
   ```env
   REACT_APP_API_KEY=sua_chave_do_tmdb_aqui
   ```
2. Inicialize o servidor de desenvolvimento do Vite:
   ```bash
   npm start
   ```
3. O servidor subirá em `http://localhost:5173`. Navegue pela Home, alterne entre categorias (Populares, Agora no Cinema, etc.), digite no campo de busca para filtrar, entre na tela de detalhes de um filme, adicione filmes à lista e acesse a tela de favoritos para remover ou ver detalhes. Graças ao `LocalStorageService`, a sua lista de favoritos persistirá mesmo após atualizar a página!
