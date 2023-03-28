# 指定 node 版本号，满足宿主环境
FROM node:16-alpine as builder

# 指定工作目录，将代码添加至此
WORKDIR /code
ADD . /code

# 如何将项目跑起来
ADD package.json package-lock.json /code

RUN npm install
RUN npm run build
RUN npm start


ADD . /code

RUN npm run build 

# 选择更小体积的基础镜像
FROM nginx:alpine