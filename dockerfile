# Use uma imagem Node.js como base
FROM node:14

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie os arquivos de aplicação (incluindo package.json e package-lock.json) para o diretório de trabalho
COPY package*.json ./

# Instale as dependências da aplicação
RUN npm install

# Copie o restante dos arquivos da aplicação
COPY . .

# Expõe a porta que a aplicação irá ouvir
EXPOSE 3000

# Comando para iniciar a aplicação (ajuste conforme o seu aplicativo)
CMD ["node", "app."] 