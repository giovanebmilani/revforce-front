# Rev Force Frontend

Este é o frontend do projeto Rev Force, construído com React 19, Vite e Tailwind CSS.

## Visão Geral

Este projeto foi inicializado usando Vite e está configurado para utilizar:

* **React 19:** A biblioteca JavaScript para construir interfaces de usuário.
* **Vite:** Uma ferramenta de construção rápida para desenvolvimento web moderno.
* **Tailwind CSS:** Um framework CSS utilitário para estilização rápida.
* **TypeScript:** Para tipagem estática e melhor desenvolvimento.
* **TanStack Query**: Para gerenciamento de estado de dados assíncronos.
* **TanStack Router**: Para gerenciamento de rotas.

## Pré-requisitos

Antes de começar, certifique-se de ter instalado o seguinte:

* **Node.js:** Versão 22.14.0 ou superior.
* **npm:** Versão 10.9.2 ou superior.

_Caso não saiba como instalar uma versão do node específica, utilize o Node Version Manager (NVM)_

[Como instalar o NVM - Unix](https://www.youtube.com/watch?v=B9Hd11RT7Bk)

_No Windows é só baixar a versão no próprio site do node_

[Node.js](https://nodejs.org/pt/download)
## Instalação

1.  Clone o repositório:

    ```bash
    $ git clone https://tools.ages.pucrs.br/plataforma-de-marketing-e-sales-analytics/revforce-front.git

    $ cd rev-force-frontend
    ```

2.  Instale as dependências:

    ```bash
    $ npm install
    ```

## Scripts

Os seguintes scripts estão disponíveis no `package.json`:

* `npm run dev`: Inicia o servidor de desenvolvimento Vite.
* `npm run lint`: Executa o ESLint para verificar a qualidade do código.

## Desenvolvimento

Para iniciar o servidor de desenvolvimento:

```bash
npm run dev
```

O aplicativo estará disponível em `http://localhost:5173/`

## Dependencias

### Dependências Principais

```bash
react: A biblioteca React.

react-dom: O DOM para React.

@tanstack/react-query: Para gerenciamento de dados assíncronos.

@tanstack/react-router: Para gerenciamento de rotas.

class-variance-authority: Para composição de classes condicionais.

clsx: Para manipulação de classes CSS.

lucide-react: Para icones.

tailwind-merge: Para mesclar classes tailwind.

tailwindcss: O framework CSS utilitário.

tailwindcss-animate: Para animações tailwind.
```

### Dependências de Desenvolvimento
```bash
@vitejs/plugin-react: Plugin React para Vite.

typescript: Para tipagem estática.

eslint: Para análise de código.

@tanstack/eslint-plugin-query: Plugin para eslint para tanstack query.

@tanstack/react-router-devtools: Ferramentas para desenvolvedores para o tanstack router.

@tanstack/router-plugin: Plugin para o tanstack router.

@types/react: Definições de tipo para React.

@types/react-dom: Definições de tipo para ReactDOM.

vite: A ferramenta de construção.

@eslint/js: Configurações padrão do eslint.

eslint-plugin-react-hooks: Plugin para regras de hooks do react.

eslint-plugin-react-refresh: Plugin para regras de refresh do react.

globals: Para definir variaveis globais para o eslint.

typescript-eslint: Plugin para typescript e eslint.

@types/node: Definições de tipos para node
```