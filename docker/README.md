# my custom image

custom image to study for big data the base image is ubuntu:22.04 ,feat:

- custom apt mirrors to tuna (清华源)
- ssh config
- hadoop 3.3.6 with (java-8-openjdk-amd64)
- zookeeper 3.9.2

# ssh、jdk 8

tag: 0.1.0

```shell
# @Author: caobaoqi1029
# @Date: 2024/09/13

FROM ubuntu:22.04

WORKDIR /root/

# apt 换清华源(使用 http, 因为 https 需要 certificates)
RUN sed -i "s@http://.*.ubuntu.com@http://mirrors.tuna.tsinghua.edu.cn@g" /etc/apt/sources.list

# 安装 JDK 等
RUN apt-get update && \
    apt-get install -y openjdk-8-jdk wget vim openssh-server net-tools

ENV JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64

# 配置 SSH 免密码登录
RUN ssh-keygen -t rsa -P '' -f ~/.ssh/id_rsa && \
    cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys \

# 配置 SSH
RUN echo "StrictHostKeyChecking no" >> /etc/ssh/ssh_config
RUN echo "PermitRootLogin yes" >> /etc/ssh/sshd_config
RUN echo "PasswordAuthentication yes" >> /etc/ssh/sshd_config
RUN echo "PubkeyAuthentication yes" >> /etc/ssh/sshd_config


# 启动 SSH 服务
CMD ["bash", "-c", "bash"]
```

---

```yaml
services:
  master:
    image: caobaoqi1029/big-data-study:0.1.0
    container_name: master
    hostname: master # TODO: Change this to name-SID-1
    command: bash -c "
      service ssh restart &&
      tail -f /dev/null"
    networks:
      - hadoop-network
    depends_on:
      - slave1
      - slave2
      - slave3

  slave1:
    image: caobaoqi1029/big-data-study:0.1.0
    container_name: slave1
    hostname: slave1 # TODO: Change this to name-SID-2
    command: bash -c "
      service ssh restart &&
      tail -f /dev/null"
    networks:
      - hadoop-network

  slave2:
    image: caobaoqi1029/big-data-study:0.1.0
    container_name: slave2
    hostname: slave2 # TODO: Change this to name-SID-3
    command: bash -c "
      service ssh restart &&
      tail -f /dev/null"
    networks:
      - hadoop-network

  slave3:
    image: caobaoqi1029/big-data-study:0.1.0
    container_name: slave3
    hostname: slave3 # TODO: Change this to name-SID-4
    command: bash -c "
      service ssh restart &&
      tail -f /dev/null"
    networks:
      - hadoop-network

networks:
  hadoop-network:
    driver: bridge
```

# hadoop、zookeeper

```shell
hdfs namenode -format
start-all.sh
start-dfs.sh 
```

# 

```shell

```

# spark (TODO)

```shell

```
