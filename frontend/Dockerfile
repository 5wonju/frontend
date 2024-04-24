# 빌드 스테이지
FROM node:20 AS build
WORKDIR /app
RUN ls -al
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
RUN ls -al /app

# 서브 스테이지
FROM nginx:alpine
COPY --from=build /app ./
EXPOSE 3000
CMD ["npm", "start"]
