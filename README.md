# Sistema Pata - Sistema de Adoção de Pets

## Índice
1. [Sobre o Projeto](#sobre-o-projeto)
2. [Funcionalidades](#funcionalidades)
3. [Tecnologias Utilizadas](#tecnologias-utilizadas)
4. [Estrutura do Projeto](#estrutura-do-projeto)
5. [Instalação e Configuração](#instalação-e-configuração)
6. [Como Usar](#como-usar)
7. [Contribuição](#contribuição)
8. [Licença](#licença)

---

## Sobre o Projeto
O **Sistema Pata** é uma aplicação web desenvolvida para facilitar o processo de adoção em um abrigo de animais. Com o sistema, o abrigo pode gerenciar e organizar o cadastro de pets e adotantes, acompanhar o processo de adoção de forma digital e centralizar todas as informações relevantes. Isso torna o processo mais eficiente e acessível, proporcionando uma experiência amigável tanto para o abrigo quanto para os adotantes.

### Contexto
A gestão manual de dados no abrigo gerava atrasos e desorganização, dificultando o controle de pets disponíveis para adoção e o histórico de adoções realizadas. O Sistema Pata visa solucionar esses problemas, permitindo ao abrigo registrar, visualizar e atualizar informações de pets e adotantes em uma interface intuitiva e prática.

## Funcionalidades

### 1. Cadastro e Gerenciamento de Pets
   - O sistema permite o **registro de novos pets** no abrigo, com as seguintes informações:
     - **Nome**: Identificação do pet no abrigo.
     - **Espécie**: Tipo de animal, como cachorro, gato, etc.
     - **Data de Nascimento**: Aproximada, para calcular a idade.
     - **Descrição**: Texto que descreve características especiais e personalidade.
     - **Status**: Estado do pet (disponível ou adotado), atualizado automaticamente ao ocorrer uma adoção.
   - **Edição e Exclusão**: Permite alterar ou remover registros de pets, mantendo as informações do sistema atualizadas.

### 2. Cadastro e Gerenciamento de Adotantes
   - **Registro de adotantes** com dados para contato e informações básicas:
     - **Nome Completo**: Nome do adotante.
     - **E-mail**: Para envio de notificações e informações.
     - **Telefone**: Para contato direto.
     - **Endereço**: Local de residência, útil para logística e verificações de adoção.
   - **Histórico de Adoções**: Permite visualizar o histórico de adoções feitas pelo adotante.

### 3. Processo de Adoção
   - O processo de adoção é formalizado diretamente no sistema:
     - **Escolha do pet**: Ao selecionar um pet, o adotante é vinculado ao registro de adoção.
     - **Data da Adoção**: O sistema registra automaticamente a data em que a adoção é realizada.
     - **Atualização de Status**: O status do pet é atualizado para "adotado", removendo-o automaticamente da lista de pets disponíveis.

### 4. Visualização de Pets Disponíveis
   - Possíveis adotantes podem visualizar uma lista de pets ainda disponíveis, com filtros para:
     - **Espécie**: Exibir pets por tipo de animal.
     - **Idade**: Filtragem por idade aproximada.
     - **Status**: Mostrar pets disponíveis ou adotados.

### 5. Extras (Funcionalidades Opcionais)
   - **Filtro Avançado**: Permite busca por tamanho e personalidade.
   - **Autenticação e Perfis de Usuário**:
     - **Administração**: Apenas administradores podem cadastrar e gerenciar pets e adotantes.
     - **Adotantes**: Usuários adotantes podem visualizar seu histórico de adoções e pets favoritos.

## Tecnologias Utilizadas

### Backend
- **Node.js**: Ambiente de execução do backend.
- **Express**: Framework para criação de rotas e gerenciamento de requisições HTTP.
- **Prisma ORM**: Gerenciamento de operações no banco de dados, com suporte a operações CRUD.
- **Banco de Dados Relacional**: PostgreSQL ou MySQL, com o Prisma ORM para abstração.

### Frontend
- **React.js**: Biblioteca para construção de interfaces de usuário dinâmicas e interativas.
- **Axios**: Para comunicação entre frontend e backend.
- **CSS Modules / Styled Components**: Para estilização da aplicação, garantindo modularidade e escalabilidade.

## Estrutura do Projeto

```plaintext
Sistema-Pata/
├── backend/
│   ├── src/
│   │   ├── controllers/       # Lógica dos endpoints de pets, adotantes e adoções
│   │   ├── models/            # Definição dos schemas de dados com Prisma
│   │   ├── routes/            # Rotas para pets, adotantes e adoções
│   │   └── index.js           # Inicialização do servidor
│   ├── prisma/                # Arquivos de configuração do Prisma e migrações de banco de dados
│   └── .env                   # Variáveis de ambiente do backend
├── frontend/
│   ├── src/
│   │   ├── components/        # Componentes React para interface de usuário
│   │   ├── pages/             # Páginas principais (Landing, Lista de Pets, Cadastro, etc.)
│   │   ├── services/          # Configurações de comunicação com API
│   │   └── App.js             # Configuração e roteamento principal
│   └── .env                   # Variáveis de ambiente do frontend
└── README.md
```

## Instalação e Configuração

### Pré-requisitos
- **Node.js** e **npm**
- **Banco de Dados**: PostgreSQL ou MySQL

### Passos para Instalação

1. **Clone o Repositório**
   ```bash
   git clone https://github.com/seu_usuario/sistema-pata.git
   cd sistema-pata
   ```

2. **Backend Setup**
   - Entre na pasta `backend`:
     ```bash
     cd backend
     ```
   - Instale as dependências:
     ```bash
     npm install
     ```
   - Configure as variáveis de ambiente no arquivo `.env` com as credenciais do banco de dados.
   - Execute as migrações do banco de dados:
     ```bash
     npx prisma migrate dev
     ```
   - Inicie o servidor:
     ```bash
     npm start
     ```

3. **Frontend Setup**
   - Entre na pasta `frontend`:
     ```bash
     cd frontend
     ```
   - Instale as dependências:
     ```bash
     npm install
     ```
   - Configure as variáveis de ambiente do frontend.
   - Inicie o servidor de desenvolvimento do React:
     ```bash
     npm start
     ```

### Uso
- Acesse a aplicação no navegador:
  - **Frontend**: [http://localhost:3000](http://localhost:3000)
  - **Backend**: [http://localhost:5000](http://localhost:5000)

## Como Usar

1. **Cadastro de Pets e Adotantes**: Administradores podem acessar os formulários de cadastro para registrar novos pets e adotantes.
2. **Visualização de Pets**: Acesse a lista de pets disponíveis para encontrar informações e usar filtros.
3. **Processo de Adoção**: Selecione um pet e finalize o processo para atualizar seu status.
4. **Filtros**: Utilize as opções de filtro avançado para refinar a busca de pets com base em características como espécie, idade e personalidade.

## Contribuição
Contribuições são bem-vindas! Siga as diretrizes de contribuição e abra issues para melhorias ou para relatar problemas.

## Licença
Este projeto está licenciado sob a Licença MIT.
