# Sistema Pata - Sistema de Adoção de Pets

## Índice
1. [Sobre o Projeto](#sobre-o-projeto)
2. [Funcionalidades](#funcionalidades)
3. [Tecnologias Utilizadas](#tecnologias-utilizadas)
4. [Instalação e Configuração](#instalação-e-configuração)
5. [Como Usar](#como-usar)
6. [Contribuição](#contribuição)

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
     - **Adotantes**: Usuários adotantes podem visualizar seu histórico de adoções e realizar adoções.

## Tecnologias Utilizadas

### Backend
- **Node.js**: Ambiente de execução do backend.
- **Express**: Framework para criação de rotas e gerenciamento de requisições HTTP.
- **Prisma ORM**: Gerenciamento de operações no banco de dados, com suporte a operações CRUD.
- **Banco de Dados Relacional**: PostgreSQL ou MySQL, com o Prisma ORM para abstração.

## Documentação da API

#### Registrar usuário
```http
  POST /usuario/
```

| Body        | Tipo     | Descrição                                             |
| :---------- | :------- | :---------------------------------------------------- |
| `nome`      | `string` | Tamanho mínimo de 3 caracteres.                        |
| `email`     | `string` | Email deve ser único para cada usuário.          |
| `senha`  | `string` | A senha deve ter no mínimo 8 caracteres.              |
| `telefone`| `string` | O telefone deve conter 11 dígitos.                              |
| `tipo` | `string` | usuario ou administrador.                            |

##### Exemplo
```json
{
    "nome": "joao silva",
    "email": "silva1234@gmail.com",
    "senha": "1234Joao!",
    "telefone": "40029822111",
    "tipo": "administrador"
}
```

#### Registrar Pet
```http
  POST /pet/
```

| Body        | Tipo     | Descrição                                             |
| :---------- | :------- | :---------------------------------------------------- |
| `nome`      | `string` |  Nome do Pet.       |
| `especie`     | `string` | Qual espécie pertence.         |
| `data_nascimento`  | `string` | O formato da data deve ser dd-mm-yyy.              |
| `descricao`| `string` | Um resumo breve sobre o animal.                              |
| `tamanho` | `string` | pequno, medio ou grande.               |
| `personalidade` | `string` | independente, calmo ou brincalhao    .                        |

##### Exemplo
```json
{
    "nome": "Iggy",
    "especie": "cachorro",
    "descricao": "possui algumas habilidades bizarras",
    "tamanho": "pequeno",
    "personalidade": "independente",
    "data_nascimento": "11-06-2014"
}
```

#### Registrar Adoção
```http
  POST /adocao/
```

| Body        | Tipo     | Descrição                                             |
| :---------- | :------- | :---------------------------------------------------- |
| `pet_id`      | `string` |  ID do pet.       |
| `user_id`     | `string` | ID do usuário.         |


##### Exemplo
```json
{
    "pet_id": "1",
    "user_id": "1"
}
```

#### Retorna todos os itens

```http
  GET /usuarios

  GET /pets/

  GET /adocoes/

```
#### Retorna um item

```http
  GET /usuario/{id}
  
  GET /pet/{id}
  
  GET /adocao/{id}

  GET /adocao/usuario/{id}
```

#### Deletar itens 
```http
  DELETE /usuario/{id}

  DELETE /pet/{id}
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
   - Entre na pasta `sistema-pata`:
     ```bash
     cd sistema-pata
     ```
   - Instale as dependências:
     ```bash
     npm install
     ```
   - Configure as variáveis de ambiente no arquivo `.env` com as credenciais do banco de dados, caso queira um modelo pronto, utilize como base o arquivo `.env copy`.
   ```bash
    DATABASE_URL=
    
    JWT_SECRET=

    PORT=
   ```
   - Execute as migrações do banco de dados:
     ```bash
     npx prisma migrate dev
     ```
   - Inicie o servidor:
     ```bash
     npm run dev
     ```


### Uso
- Acesse a aplicação no navegador:
  - **Backend**: [http://localhost:3000](http://localhost:3000) 
  - Caso não tenha colocado um outro valor na variável PORT, o valor por padrão sera 3000

## Como Usar

1. **Cadastro de Pets e Adotantes**: Administradores podem acessar os formulários de cadastro para registrar novos pets e adotantes.
2. **Visualização de Pets**: Acesse a lista de pets disponíveis para encontrar informações e usar filtros.
3. **Processo de Adoção**: Selecione um pet e finalize o processo para atualizar seu status.
4. **Filtros**: Utilize as opções de filtro avançado para refinar a busca de pets com base em características como espécie, idade e personalidade.
