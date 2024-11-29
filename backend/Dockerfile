# Usar imagem base oficial do Node.js
FROM node:18-alpine

# Definir diretório de trabalho no container
WORKDIR /usr/src/app

# Copiar o package.json e o package-lock.json para o container
COPY package*.json ./

# Instalar dependências dentro do container
RUN npm install

# Copiar o restante do código do projeto
COPY . .

# Expor a porta padrão do NestJS
EXPOSE 3000

# Comando para iniciar o servidor
CMD ["npm", "run", "start:dev"]
