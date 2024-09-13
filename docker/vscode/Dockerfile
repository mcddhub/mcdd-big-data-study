FROM caobaoqi1029/big-data-study:0.4.0

RUN mkdir -p ~/.cache/code-server

# 使用 curl 下载 code-server 的 .deb 文件
RUN curl -#fL -o ~/.cache/code-server/code-server_4.92.2_amd64.deb.incomplete -C - https://github.com/coder/code-server/releases/download/v4.92.2/code-server_4.92.2_amd64.deb && \
    mv ~/.cache/code-server/code-server_4.92.2_amd64.deb.incomplete ~/.cache/code-server/code-server_4.92.2_amd64.deb



