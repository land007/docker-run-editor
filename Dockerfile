FROM land007/ubuntu-node-all:latest

MAINTAINER Yiqiu Jia <yiqiujia@hotmail.com>

ADD . /node
RUN cd /node && npm install


#docker build -t "land007/docker-run-editor:latest" .
#docker run -it --rm land007/docker-run-editor bash
#> docker buildx build --platform linux/arm/v7 -t alpine-arm32 --load .
