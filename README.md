# Atividade Final - Bootcamp iTalents (Clean Architecture & SOLID)

Este repositório é uma refatoração completa e modernização de um projeto acadêmico de 2024 para o ano de 2026. O objetivo principal do projeto agora é demonstrar a aplicação estrita de padrões de **Clean Architecture** (Arquitetura Limpa), princípios **SOLID** de design e injeção de dependências nativa no ecossistema React.

## 🎯 Objetivo Arquitetural

Exercitar e validar o desacoplamento de responsabilidades entre as regras de negócio de domínio e as tecnologias de infraestrutura/visualização (React, Axios, LocalStorage). A aplicação é um catálogo de filmes integrado à API gratuita [The Movie DB (TMDb)](https://www.themoviedb.org), permitindo buscar filmes, filtrar por categorias e salvar favoritos em uma lista local persistida.

---

## 🏛️ Estrutura de Camadas (Clean Architecture)

O código está estruturado em 4 divisões bem delimitadas de forma a garantir independência tecnológica e testabilidade:

### 1. Domínio (`src/domain/`)
O núcleo do sistema. Não tem conhecimento de bancos de dados, frameworks, UI ou APIs de rede.
* **Entities**: Estruturas de dados de negócio puras (ex: `Movie`).
* **Use Cases**: As regras de negócio e fluxos lógicos individuais (ex: `GetMovieDetails`, `AddMovieToUserList`), executados de forma independente.
* **Repositories (Interfaces)**: Contratos altamente granulares segregados (Princípio de Segregação de Interfaces - ISP) contendo um único método de execução (ex: `IGetMoviesByCategoryRepository`, `IGetUserListRepository`).

### 2. Dados (`src/data/`)
A ponte de comunicação entre o domínio e os detalhes físicos externos.
* **Repositories (Implementações)**: Implementações independentes e com responsabilidade única (SRP) para cada contrato de domínio (ex: `GetMoviesByCategoryRepositoryImpl`).
* **DataSources**: Interfaces e fontes concretas de dados externos (`MovieRemoteDataSource` e `MovieLocalDataSource`).
* **Mappers & DTOs**: Conversores de dados para evitar o vazamento do modelo bruto de resposta da API do TMDb para dentro do domínio.
* **Protocols**: Contratos abstratos de infraestrutura (ex: `IHttpClient`, `IStorageService`).

### 3. Infraestrutura (`src/infrastructure/`)
Implementações tecnológicas e interações físicas com o mundo exterior.
* **Services (`src/infrastructure/services/`)**: Implementações concretas de serviços como `AxiosHttpClient`, `LocalStorageService` e `EnvConfigService`.
* **Interceptors (`src/infrastructure/interceptors/`)**: Interceptadores de request (para auditoria/logs) e response (para tratamento centralizado de falhas e mapeamento de status HTTP) do Axios.

### 4. Apresentação (`src/presentation/`)
A interface de usuário que consome os casos de uso.
* **Pages & Components**: Componentes construídos sob Atomic Design, estilizados de forma modular in-JS com **styled-components** (adaptado em `src/libs/styled-components`).
* **Hooks & Contexts**: Custom hooks (`src/presentation/hooks/`) e contextos do React (`src/presentation/context/`) encapsulando o estado da UI de forma isolada dos componentes.

---

## 🔌 Injeção de Dependências (`src/libs/inversifyjs/`)

A inicialização e amarração de todas as dependências são coordenadas via **InversifyJS** utilizando *Constructor Injection* tradicional nas classes concretas e casos de uso:
* **`tokens.ts`**: Centraliza os símbolos identificadores (`TOKENS`) de injeção.
* **`container/`**: Agrupa a definição modular de bindings do container principal (`index.ts`) dividida em sub-módulos específicos (`infrastructureModule`, `movieModule`, `userListModule`).

---

## 🛡️ Tratamento de Erros e Respostas de Domínio

Os fluxos lógicos e Casos de Uso adotam uma abordagem puramente funcional livre de `throw` silenciosos:
* **`IAPIResponse<T>`**: Envelope padronizado para retornos de sucesso contendo `.data` e metadados como `.message`.
* **`AppError`**: Classe de domínio estendendo `Error` que unifica e tipa erros estruturados de negócios (suporta a interface `ICustomError` com múltiplas mensagens de validação e erros traduzidos `translatedErrors`).

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
   Crie um arquivo `.env` na raiz do projeto baseado no modelo `.env.example`:
   ```env
   VITE_API_KEY=sua_chave_de_api_aqui
   ```

4. **Inicie o Servidor de Desenvolvimento (Vite)**:
   ```bash
   npm start
   ```
   A aplicação subirá localmente em `http://localhost:5173/`.

5. **Gere o Build de Produção**:
   ```bash
   npm run build
   ```

---

## 🛠️ Tecnologias Utilizadas

* **React 19** & **TypeScript**
* **Vite** (Build system)
* **InversifyJS** & **reflect-metadata** (Container de IoC e Injeção de Dependências)
* **styled-components** (Estilização in-JS)
* **Axios** (Integração HTTP)
* **React Router DOM v6** (Gerenciamento de rotas)
* **React Hot Toast** (Notificações visuais)
