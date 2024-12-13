# Projeto-Inovia-FullStack

## Clonar o Repositório
Abra o terminal e execute o seguinte comando para clonar o repositório:
```bash
git clone https://seu-repositorio.git
cd Projeto-Inovia-FullStack
```

## Configuração

### Backend
#### Configurar o Arquivo .env:
Crie um arquivo `.env` na raiz do backend (por exemplo, `backend/.env`) com as seguintes variáveis:
```env
DATABASE_URL=mongodb://mongodb:27017/ConsultorioNutricionista
PORT=3000
JWT_SECRET=sua-chave-secreta
```

#### Explicação das Variáveis:
- **DATABASE_URL**: URL de conexão com o MongoDB. Para uso com Docker, utilize `mongodb://mongodb:27017/ConsultorioNutricionista`.
- **PORT**: Porta na qual o backend será executado. O padrão é `3000`.
- **JWT_SECRET**: Chave secreta para autenticação JWT. Substitua por uma chave segura.

#### Configuração Alternativa (Local):
Caso deseje configurar o backend para rodar localmente sem Docker, ajuste o `DATABASE_URL` conforme seu ambiente:
```env
DATABASE_URL=mongodb://localhost:27018/ConsultorioNutricionista
PORT=3000
JWT_SECRET=sua-chave-secreta
```
**Nota**: Ao usar Docker, o MongoDB estará acessível internamente via `mongodb:27017`, mas externamente na porta `27018`.

#### Usando MongoDB Compass:
Para conectar e visualizar os dados graficamente, utilize o URL:
```
mongodb://localhost:27018/ConsultorioNutricionista
```

### Frontend
#### Configurar o Arquivo .env:
No frontend (`frontend/.env`), crie um arquivo com a seguinte variável:
```env
VITE_API_URL=http://localhost:3000
```

#### Explicação:
- **VITE_API_URL**: URL do backend que o frontend irá consumir. Com Docker, utilize também `http://localhost:3000`.

#### Configuração Alternativa (Local):
Caso não use Docker, ajuste o `VITE_API_URL` para o ambiente do backend local.

## Rodando a Aplicação

### Usando Docker
Certifique-se que o Docker e Docker Compose estão instalados e rodando.

Navegue até a pasta raiz do projeto (`Projeto-Inovia-FullStack`) e execute:
```bash
docker-compose up --build
```

#### O que o comando faz:
- **Backend (NestJS)**: Construirá e iniciará o servidor backend.
- **Frontend (React)**: Construirá e iniciará o servidor frontend.
- **MongoDB**: Iniciará um container MongoDB acessível internamente via `mongodb:27017` e externamente na porta `27018`.

#### Acesse a Aplicação:
- **Frontend**: [http://localhost:5173](http://localhost:5173) (ou a porta especificada no `docker-compose.yml`).
- **Backend**: [http://localhost:3000](http://localhost:3000).

### Configurando e Rodando Sem Docker
#### Inicie o MongoDB Localmente:
Certifique-se de que o MongoDB está rodando na porta `27018` e conecte-se com o MongoDB Compass para visualizar os dados dentro do banco.

#### Inicie o Backend e o Frontend Manualmente:
- No backend, execute:
  ```bash
  npm install
  npm run start
  ```
- No frontend, execute:
  ```bash
  npm install
  npm run dev
  ```

## Gerenciar Consultas

- **Adicionar Consulta**: Clique no botão "Agendar" para abrir o modal de criação de eventos. Preencha os detalhes e salve.
- **Atualizar Consulta**: Clique em um evento existente no calendário para abrir o modal de edição. Faça as alterações necessárias e salve.
- **Excluir Consulta**: No modal de atualização, clique na opção de deletar para remover o evento.
- **Visualizar Estatísticas**: Clique no botão "Estatísticas" na barra de ferramentas do calendário para abrir o modal com gráficos de estatísticas diárias, semanais e mensais.

### Atualização Automática do Calendário:
Após adicionar, atualizar ou deletar uma consulta, o calendário será recarregado automaticamente para refletir as mudanças. Além disso, o frontend realiza um polling (requisições periódicas) para computar as recorrências.

