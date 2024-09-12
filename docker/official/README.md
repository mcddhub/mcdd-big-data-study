# hadoop-docker-official

> 通过 docker 部署大数据生态系统：Dockerized Hadoop、Spark、Hive 和 Zeppelin

# 概述

Apache Hadoop 软件库是一个框架，允许使用简单的编程模型在计算机集群间分布式处理大型数据集。最小 Hadoop 集群由 Hadoop Common
组成，用于支持其他模块，如作为分布式存储的 Hadoop 分布式文件系统（HDFS）、用于调度和管理集群的 Hadoop YARN，以及作为执行引擎用于并行处理的
Hadoop MapReduce。

另一方面，Spark 是处理数据的另一种执行引擎。其主要区别在于，Spark 使用弹性分布式数据集（RDD）并将其存储在内存中，因此性能明显优于
MapReduce。Spark 可以独立运行，实现基本功能。但是，当与 Hadoop 一起使用时，Spark 可以利用 Hadoop 的集群管理、容错、安全等功能。

Hive 是一种分析工具，它利用存储在 HDFS 中的数据，并使用 Spark 或 MapReduce 作为其执行引擎。这样，用户就可以使用熟悉的 SQL
语句分析数据，使开发人员更容易从数据中找到洞察力。

# 为什么需要在 docker 模式下运行？

了解系统内部是必要的。这些知识对于测试调整后的配置或新功能很有价值。在这种情况下，沙箱或开发系统因其易于设置和成本较低而成为理想选择。不过，成熟的
Docker 化生态系统也可用于生产环境。这种方法简化了部署自动化，并实现了集群自动扩展功能。

> [!NOTE]
> 在本文中，我们将尝试使用 Dockerfile 以 docker 模式启动 Hadoop。它将由 Hadoop、Spark、Hive 和 Zeppelin 组成

- Docker Version: 25.0.5
- Docker Compose Version: 2.22.0
- Orbstack Version: 1.5.1
- Hadoop image: apache/hadoop:3
- MySQL image: mysql:latest
- `[Optional]` Firefox image: jlesage/firefox:latest
- `[Optional]` Custom Hadoop image: bayuadiwibowo/hadoop-namenode:latest

# Hadoop Base Hadoop 基础

我们将使用 Docker Compose 构建镜像并运行容器。Link: https://hub.docker.com/r/apache/hadoop

其目录结构为:

```shell
config
docker-compose.yaml
```

## docker-compose.yaml

该 .yaml 配置将启动一个有 2 个数据节点的 Hadoop 基础集群。

```shell
version: "2"
services:
  namenode:
    image: apache/hadoop:3
    hostname: namenode
    ports:
      - "9870:9870"
    env_file:
      - ./config
    environment:
      ENSURE_NAMENODE_DIR: "/tmp/hadoop-root/dfs/name"
    command: ["hdfs", "namenode"]
  datanode_1:
    image: apache/hadoop:3
    command: [ "hdfs", "datanode" ]
    env_file:
      - ./config
  datanode_2:
    image: apache/hadoop:3
    command: [ "hdfs", "datanode" ]
    env_file:
      - ./config
  resourcemanager:
    image: apache/hadoop:3
    hostname: resourcemanager
    command: [ "yarn", "resourcemanager" ]
    ports:
      - "8088:8088"
    env_file:
      - ./config
    volumes:
      - ./test.sh:/opt/test.sh
  nodemanager:
    image: apache/hadoop:3
    command: [ "yarn", "nodemanager" ]
    env_file:
      - ./config
  firefox:
    image: jlesage/firefox
    hostname: firefox
    ports:
      - "5800:5800"
```

> [!NOTE]
> firefox 用于更方便地访问所有 Hadoop 用户界面。由于 firefox 与 Hadoop 位于同一网络，因此无需端口转发即可访问所有 Hadoop
> 容器端口。

## config

该配置文件可帮助我们设置容器使用的环境变量。

```shell
HADOOP_HOME=/opt/hadoop
CORE-SITE.XML_fs.default.name=hdfs://namenode
CORE-SITE.XML_fs.defaultFS=hdfs://namenode
HDFS-SITE.XML_dfs.namenode.rpc-address=namenode:8020
HDFS-SITE.XML_dfs.replication=1
MAPRED-SITE.XML_mapreduce.framework.name=yarn
MAPRED-SITE.XML_yarn.app.mapreduce.am.env=HADOOP_MAPRED_HOME=$HADOOP_HOME
MAPRED-SITE.XML_mapreduce.map.env=HADOOP_MAPRED_HOME=$HADOOP_HOME
MAPRED-SITE.XML_mapreduce.reduce.env=HADOOP_MAPRED_HOME=$HADOOP_HOME
YARN-SITE.XML_yarn.resourcemanager.hostname=resourcemanager
YARN-SITE.XML_yarn.nodemanager.pmem-check-enabled=false
YARN-SITE.XML_yarn.nodemanager.delete.debug-delay-sec=600
YARN-SITE.XML_yarn.nodemanager.vmem-check-enabled=false
YARN-SITE.XML_yarn.nodemanager.aux-services=mapreduce_shuffle
CAPACITY-SCHEDULER.XML_yarn.scheduler.capacity.maximum-applications=10000
CAPACITY-SCHEDULER.XML_yarn.scheduler.capacity.maximum-am-resource-percent=0.1
CAPACITY-SCHEDULER.XML_yarn.scheduler.capacity.resource-calculator=org.apache.hadoop.yarn.util.resource.DefaultResourceCalculator
CAPACITY-SCHEDULER.XML_yarn.scheduler.capacity.root.queues=default
CAPACITY-SCHEDULER.XML_yarn.scheduler.capacity.root.default.capacity=100
CAPACITY-SCHEDULER.XML_yarn.scheduler.capacity.root.default.user-limit-factor=1
CAPACITY-SCHEDULER.XML_yarn.scheduler.capacity.root.default.maximum-capacity=100
CAPACITY-SCHEDULER.XML_yarn.scheduler.capacity.root.default.state=RUNNING
CAPACITY-SCHEDULER.XML_yarn.scheduler.capacity.root.default.acl_submit_applications=*
CAPACITY-SCHEDULER.XML_yarn.scheduler.capacity.root.default.acl_administer_queue=*
CAPACITY-SCHEDULER.XML_yarn.scheduler.capacity.node-locality-delay=40
CAPACITY-SCHEDULER.XML_yarn.scheduler.capacity.queue-mappings=
CAPACITY-SCHEDULER.XML_yarn.scheduler.capacity.queue-mappings-override.enable=false
```

## Starting Cluster 启动组群

```shell
docker-compose up -d
```

## UIs Check 用户界面检查

通过访问 http://localhost:5800/ 打开 firefox 。尝试从 Firefox 访问这些用户界面。

![image-20240912100136894](C:\Users\mcdd2024\AppData\Roaming\Typora\typora-user-images\image-20240912100136894.png)

- Namenode UI: http://namenode:9870/

![image-20240912100241166](C:\Users\mcdd2024\AppData\Roaming\Typora\typora-user-images\image-20240912100241166.png)

- ResourceManager UI: http://resourcemanager:8088/

![image-20240912100351431](C:\Users\mcdd2024\AppData\Roaming\Typora\typora-user-images\image-20240912100351431.png)

## Submit Sample Job

要测试 Hadoop 集群，我们可以提交 MapReduce 示例作业。使用 docker exec 命令访问 Namenode，然后使用 yarn 命令提交一个示例作业。

```shell
docker exec -ti official-namenode-1 /bin/bash
yarn jar share/hadoop/mapreduce/hadoop-mapreduce-examples-3.3.6.jar pi 10 15

Number of Maps  = 10
Samples per Map = 15
...
...
Job Finished in 37.678 seconds
Estimated value of Pi is 3.17333333333333333333
```

> [!NOTE]
> 用 share/hadoop/mapreduce 目录下的可用版本替换 HADOOP_VERSION JAR。
> 从 Namenode 用户界面查找详细的任务信息

![image-20240912100708450](C:\Users\mcdd2024\AppData\Roaming\Typora\typora-user-images\image-20240912100708450.png)

![image-20240912100718303](C:\Users\mcdd2024\AppData\Roaming\Typora\typora-user-images\image-20240912100718303.png)

## Stopping Cluster 停止集群

```shell
docker-compose down
```

# 将 Spark 添加到 Namenode

MapReduce 是 Hadoop 的默认执行引擎。要提交 Spark 作业，必须安装 Spark。添加并编辑以下文件，然后使用 `docker-compse up` 命令重建群集。

```repo
# CentOS-Base.repo
#
# The mirror system uses the connecting IP address of the client and the
# update status of each mirror to pick mirrors that are updated to and
# geographically close to the client.  You should use this for CentOS updates
# unless you are manually picking other mirrors.
#
# If the mirrorlist= does not work for you, as a fall back you can try the
# remarked out baseurl= line instead.
#
#

[base]
name=CentOS-$releasever - Base - mirrors.aliyun.com
failovermethod=priority
baseurl=https://mirrors.aliyun.com/centos/$releasever/os/$basearch/
        https://mirrors.aliyuncs.com/centos/$releasever/os/$basearch/
        https://mirrors.cloud.aliyuncs.com/centos/$releasever/os/$basearch/
gpgcheck=1
gpgkey=https://mirrors.aliyun.com/centos/RPM-GPG-KEY-CentOS-7

#released updates
[updates]
name=CentOS-$releasever - Updates - mirrors.aliyun.com
failovermethod=priority
baseurl=https://mirrors.aliyun.com/centos/$releasever/updates/$basearch/
        https://mirrors.aliyuncs.com/centos/$releasever/updates/$basearch/
        https://mirrors.cloud.aliyuncs.com/centos/$releasever/updates/$basearch/
gpgcheck=1
gpgkey=https://mirrors.aliyun.com/centos/RPM-GPG-KEY-CentOS-7

#additional packages that may be useful
[extras]
name=CentOS-$releasever - Extras - mirrors.aliyun.com
failovermethod=priority
baseurl=https://mirrors.aliyun.com/centos/$releasever/extras/$basearch/
        https://mirrors.aliyuncs.com/centos/$releasever/extras/$basearch/
        https://mirrors.cloud.aliyuncs.com/centos/$releasever/extras/$basearch/
gpgcheck=1
gpgkey=https://mirrors.aliyun.com/centos/RPM-GPG-KEY-CentOS-7

#additional packages that extend functionality of existing packages
[centosplus]
name=CentOS-$releasever - Plus - mirrors.aliyun.com
failovermethod=priority
baseurl=https://mirrors.aliyun.com/centos/$releasever/centosplus/$basearch/
        https://mirrors.aliyuncs.com/centos/$releasever/centosplus/$basearch/
        https://mirrors.cloud.aliyuncs.com/centos/$releasever/centosplus/$basearch/
gpgcheck=1
enabled=0
gpgkey=https://mirrors.aliyun.com/centos/RPM-GPG-KEY-CentOS-7

#contrib - packages by Centos Users
[contrib]
name=CentOS-$releasever - Contrib - mirrors.aliyun.com
failovermethod=priority
baseurl=https://mirrors.aliyun.com/centos/$releasever/contrib/$basearch/
        https://mirrors.aliyuncs.com/centos/$releasever/contrib/$basearch/
        https://mirrors.cloud.aliyuncs.com/centos/$releasever/contrib/$basearch/
gpgcheck=1
enabled=0
gpgkey=https://mirrors.aliyun.com/centos/RPM-GPG-KEY-CentOS-7

```



```shell
Makefile
config
docker-compose.yaml
```

```yaml
version: "2"
services:
  namenode:
    image: apache/hadoop:3
    hostname: namenode
    volumes:
      - ./Makefile:/opt/hadoop/Makefile
      - ./soft/spark-3.5.2-bin-hadoop3.tgz:/opt/spark/spark-3.5.2-bin-hadoop3.tgz
      - ./repos/:/etc/yum.repos.d
    ports:
      - "9870:9870"
    env_file:
      - ./config
    environment:
      ENSURE_NAMENODE_DIR: "/tmp/hadoop-root/dfs/name"
    command: bash -c "sudo yum install -y make && make install-spark && make install-python3 && make start-namenode"
  datanode_1:
    image: apache/hadoop:3
    command: [ "hdfs", "datanode" ]
    env_file:
      - ./config
  datanode_2:
    image: apache/hadoop:3
    command: [ "hdfs", "datanode" ]
    env_file:
      - ./config
  resourcemanager:
    image: apache/hadoop:3
    hostname: resourcemanager
    command: [ "yarn", "resourcemanager" ]
    ports:
      - "8088:8088"
    env_file:
      - ./config
    volumes:
      - ./test.sh:/opt/test.sh
  nodemanager:
    image: apache/hadoop:3
    command: [ "yarn", "nodemanager" ]
    env_file:
      - ./config
  firefox:
    image: jlesage/firefox
    hostname: firefox
    ports:
      - "5800:5800"
```



```shell
docker exec -ti official-namenode-1 /bin/bash
sudo /opt/spark/spark-3.5.2-bin-hadoop3/bin/spark-submit \
--master yarn \
--deploy-mode cluster \
--class org.apache.spark.examples.SparkPi \
/opt/spark/spark-3.5.2-bin-hadoop3/examples/jars/spark-examples_2.12-3.5.2.jar 
```

