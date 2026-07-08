# Plano de Refatoração Arquitetural (Business/Infra/Presentation)

Este plano detalha a migração da estrutura atual para o padrão estrito de 3 camadas especificado no guia `architecture.md`.

## User Review Required

> [!WARNING]
> Esta é uma refatoração em larga escala que moverá quase todos os arquivos do projeto. Recomenda-se commitar ou fazer stash de qualquer código não salvo antes de prosseguir.

## Open Questions

> [!IMPORTANT]
> O guia menciona formulários (`@tanstack/react-form`). Atualmente, o componente `Search` é um input simples sem uma biblioteca pesada de forms. Deseja que eu introduza o `@tanstack/react-form` apenas para o campo de busca (Search), ou podemos mantê-lo simples e focar apenas na reestruturação arquitetural?

## Proposed Changes

---
### 1. Reestruturação de Diretórios Básicos e Aliases

Atualização dos caminhos base do projeto para refletir a nova arquitetura.
- **[MODIFY]** `tsconfig.json`: Atualizar paths (`@business`, `@infrastructure`, `@presentation`, etc).
- **[MODIFY]** `vite.config.ts`: Atualizar configuração de aliases.

---
### 2. Camada Business (`src/business/`)

Criação da camada central de negócios englobando o antigo `domain` e partes do `data`, além dos hooks do React Query.

- **[NEW]** `src/business/domain/`: Mover todas as Entidades, Erros e MessageCodes do `src/domain/`.
- **[NEW]** `src/business/domain/models/`: Mover os DTOs atuais (`src/data/dtos`) para cá, conforme a regra de "explicit interfaces for DTOs in domain/models".
- **[NEW]** `src/business/domain/repositories/`: Mover as interfaces dos repositórios (`src/domain/repositories/`).
- **[NEW]** `src/business/services/`: Mover os antigos casos de uso (`src/domain/useCases/`) para cá. Ex: `src/business/services/movie/get-movies-by-category.ts`.
- **[NEW]** `src/business/mappers/`: Mover os arquivos de mapeamento (`src/data/mappers/`).
- **[NEW]** `src/business/custom-hooks/`: Mover todos os hooks do TanStack Query (`src/presentation/hooks/movie/` e `src/presentation/hooks/userList/`) para cá.
- **[DELETE]** Diretório antigo `src/domain/`.

---
### 3. Camada Infrastructure (`src/infrastructure/`)

Acomodação das implementações externas (chamadas de API, fontes de dados).

- **[NEW]** `src/infrastructure/repositories/`: Mover as implementações concretas dos repositórios e dataSources (`src/data/repositories/` e `src/data/dataSources/`). Conforme a regra, eles devem seguir o padrão Use Case (ex: `src/infrastructure/repositories/movie/get-movies-by-category.ts`).
- **[DELETE]** Diretório antigo `src/data/`.

---
### 4. Refatoração da Injeção de Dependência (Inversify)

Divisão do arquivo massivo de injeção em módulos baseados em entidade, seguindo o padrão especificado.

- **[NEW]** `src/libs/inversifyjs/modules/movie.module.ts`: Tokens e bindings exclusivos para filmes.
- **[NEW]** `src/libs/inversifyjs/modules/user-list.module.ts`: Tokens e bindings para a lista do usuário.
- **[NEW]** `src/libs/inversifyjs/modules/config.module.ts`: Bindings de infraestrutura global (ex: IHttpClient).
- **[MODIFY]** `src/libs/inversifyjs/container.ts`: Carregar os módulos fragmentados.
- **[DELETE]** `src/libs/inversifyjs/tokens.ts` (ou reduzir substancialmente distribuindo para os módulos).

---
### 5. Camada Presentation (`src/presentation/`)

Desacoplamento estrito de Lógica e Renderização nos componentes e páginas. Todo componente atual (.tsx) será desdobrado em múltiplos arquivos.

Exemplo de refatoração a ser aplicada em **TODOS** os Atoms, Molecules, Organisms e Pages:
- **Card:**
  - **[NEW]** `src/presentation/components/organisms/Card/index.ts` (Apenas JSX)
  - **[NEW]** `src/presentation/components/organisms/Card/hook.ts` (Lógica e Injeção via `custom-hooks`)
  - **[MODIFY]** `src/presentation/components/organisms/Card/styles.ts` (Ajustes de imports)
  - **[DELETE]** `src/presentation/components/organisms/Card/Card.tsx`
- **Home Page:**
  - **[NEW]** `src/presentation/pages/Home/index.ts`
  - **[NEW]** `src/presentation/pages/Home/hook.ts`
  - **[DELETE]** `src/presentation/pages/Home/Home.tsx`
*(Esse padrão será replicado para Header, Footer, Search, NotFound, e demais páginas).*

---
## Verification Plan

### Automated Tests
- Rodar `npx tsc --noEmit` para validar que todas as tipagens e imports estão corretos em toda a base de código após as movimentações intensivas de pastas.

### Manual Verification
- Iniciar o servidor dev (`npm run start`) e navegar pela aplicação: listar filmes, adicionar aos favoritos, ver detalhes.
- Validar se o Hot Module Replacement (HMR) e a geração de rotas TanStack continuam operando normalmente sobre a nova estrutura de pastas.
