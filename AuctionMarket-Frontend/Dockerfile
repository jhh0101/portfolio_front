# --------- 1. 빌드 스테이지 ---------
FROM node:20-alpine as build-stage
WORKDIR /app

# 패키지 설치 및 빌드
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# --------- 2. 실행 스테이지 (Nginx) ---------
FROM nginx:stable-alpine

# 기존 Nginx 기본 설정 삭제 후, 우리가 만든 설정 파일 복사
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 빌드 스테이지에서 생성된 React 결과물(dist 폴더)을 Nginx 서빙 폴더로 복사
COPY --from=build-stage /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]