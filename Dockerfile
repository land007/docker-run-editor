FROM land007/ubuntu-node-all:latest

MAINTAINER Yiqiu Jia <yiqiujia@hotmail.com>

ADD . /node_
RUN . $HOME/.nvm/nvm.sh && cd /node_ && rm -rf node_modules && npm install


#docker build -t "land007/docker-run-editor:latest" .
#docker run -it --rm land007/docker-run-editor bash
#> docker buildx build --platform linux/arm/v7 -t land007/docker-run-editor --load .
#> docker buildx build --platform linux/amd64,linux/arm64,linux/arm/v7 -t land007/docker-run-editor --push .

#docker run -it --rm -p 2222:2222 land007/docker-run-editor

#http://127.0.0.1:2222/ssh/host/${ip_address}
