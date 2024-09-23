# @Author: caobaoqi1029
# @Date: 2024/09/13

FROM ubuntu:22.04

WORKDIR /root/

# apt 换清华源(使用 http, 因为 https 需要 certificates)
RUN sed -i "s@http://.*.ubuntu.com@http://mirrors.tuna.tsinghua.edu.cn@g" /etc/apt/sources.list

# 安装常用工具和依赖
RUN apt-get update && \
    apt-get install -y wget vim openssh-server net-tools curl git zip && \
    apt-get clean

# 安装 SDKMAN
RUN curl -s "https://get.sdkman.io" | bash

# 配置 SDKMAN 环境
RUN bash -c "source /root/.sdkman/bin/sdkman-init.sh && sdk version"

# 使用 SDKMAN 安装 JDK、Maven 和 Gradle
RUN bash -c "source /root/.sdkman/bin/sdkman-init.sh && \
    sdk install java 8.0.352-zulu && \
    sdk install maven 3.6.3"

# 设置 JAVA_HOME
ENV JAVA_HOME=/root/.sdkman/candidates/java/current
ENV MAVEN_HOME=/root/.sdkman/candidates/maven/current
ENV PATH=$JAVA_HOME/bin:$MAVEN_HOME/bin:$PATH

# scripts
COPY scripts/* /root/scripts/
RUN chmod -R 777 /root/scripts
ENV PATH=/root/scripts:$PATH

# 配置 SSH 免密码登录
RUN ssh-keygen -t rsa -P '' -f ~/.ssh/id_rsa && \
    cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys

# 下载并解压 Hadoop
RUN wget https://mirrors.tuna.tsinghua.edu.cn/apache/hadoop/common/hadoop-3.3.6/hadoop-3.3.6.tar.gz
RUN tar -xzvf hadoop-3.3.6.tar.gz && \
    rm hadoop-3.3.6.tar.gz && \
    mv hadoop-3.3.6 hadoop && \
    chmod -R 777 hadoop

# 下载并解压 Zookeeper
RUN wget https://mirrors.tuna.tsinghua.edu.cn/apache/zookeeper/zookeeper-3.9.2/apache-zookeeper-3.9.2-bin.tar.gz
RUN tar -xzvf apache-zookeeper-3.9.2-bin.tar.gz && \
    rm apache-zookeeper-3.9.2-bin.tar.gz && \
    mv apache-zookeeper-3.9.2-bin zookeeper && \
    chmod -R 777 zookeeper

# 下载并解压 Kafka
# RUN wget https://mirrors.aliyun.com/apache/kafka/3.7.1/kafka_2.12-3.7.1.tgz
RUN wget https://mirrors.tuna.tsinghua.edu.cn/apache/kafka/3.7.1/kafka_2.12-3.7.1.tgz
RUN tar -xzvf kafka_2.12-3.7.1.tgz && \
    rm kafka_2.12-3.7.1.tgz && \
    mv kafka_2.12-3.7.1 kafka && \
    chmod -R 777 kafka \

# 下载并解压 Hbase
RUN wget https://mirrors.tuna.tsinghua.edu.cn/apache/hbase/2.5.10/hbase-2.5.10-bin.tar.gz
RUN tar -xzvf hbase-2.5.10-bin.tar.gz && \
    rm hbase-2.5.10-bin.tar.gz && \
    mv hbase-2.5.10 hbase && \
    chmod -R 777 hbase \

# Hadoop
RUN echo "slave1" >> /root/hadoop/etc/hadoop/workers
RUN echo "slave2" >> /root/hadoop/etc/hadoop/workers
RUN echo "slave3" >> /root/hadoop/etc/hadoop/workers

ENV HADOOP_HOME=/root/hadoop
RUN mkdir $HADOOP_HOME/tmp
ENV HADOOP_TMP_DIR=$HADOOP_HOME/tmp
RUN mkdir $HADOOP_HOME/namenode
RUN mkdir $HADOOP_HOME/datanode

ENV HADOOP_CONFIG_HOME=$HADOOP_HOME/etc/hadoop
ENV HADOOP_CONF_DIR=$HADOOP_HOME/etc/hadoop

ENV PATH=$JAVA_HOME/bin:$HADOOP_HOME/bin:$HADOOP_HOME/sbin:$PATH

ENV HADOOP_CLASSPATH=$HADOOP_HOME/share/hadoop/tools/lib/*:$HADOOP_HOME/share/hadoop/common/lib/*:$HADOOP_HOME/share/hadoop/common/*:$HADOOP_HOME/share/hadoop/hdfs/*:$HADOOP_HOME/share/hadoop/hdfs/lib/*:$HADOOP_HOME/share/hadoop/yarn/*:$HADOOP_HOME/share/hadoop/yarn/lib/*:$HADOOP_HOME/share/hadoop/mapreduce/*:$HADOOP_HOME/share/hadoop/mapreduce/lib/*:$HADOOP_CLASSPATH

ENV HDFS_NAMENODE_USER="root"
ENV HDFS_DATANODE_USER="root"
ENV HDFS_SECONDARYNAMENODE_USER="root"
ENV YARN_RESOURCEMANAGER_USER="root"
ENV YARN_NODEMANAGER_USER="root"

# Zookeeper
ENV ZOOKEEPER_HOME=/root/zookeeper
ENV PATH=$ZOOKEEPER_HOME/bin:$PATH

# kafka
ENV KAFKA_HOME=/root/kafka
ENV PATH=$KAFKA_HOME/bin:$PATH

# Hbase
ENV HBASE_HOME=/root/hbase
ENV PATH=$HBASE_HOME/bin:$PATH

# 配置 Hadoop
COPY hadoop_config/* /root/hadoop/etc/hadoop/
RUN sed -i '1i export JAVA_HOME=/root/.sdkman/candidates/java/current' /root/hadoop/etc/hadoop/hadoop-env.sh

# 配置 Zookeeper
RUN mkdir /root/zookeeper/tmp
RUN cp /root/zookeeper/conf/zoo_sample.cfg /root/zookeeper/conf/zoo.cfg
COPY zookeeper_config/* /root/zookeeper/conf/

# 配置 Kafka
COPY kafka_config/* /root/kafka/config/

# 配置 SSH
RUN echo "StrictHostKeyChecking no" >> /etc/ssh/ssh_config
RUN echo "PermitRootLogin yes" >> /etc/ssh/sshd_config
RUN echo "PasswordAuthentication yes" >> /etc/ssh/sshd_config
RUN echo "PubkeyAuthentication yes" >> /etc/ssh/sshd_config

RUN echo "export HADOOP_CLASSPATH=`hadoop classpath`" >> /root/.bashrc

# 启动 SSH 服务
CMD ["bash", "-c", "bash"]
