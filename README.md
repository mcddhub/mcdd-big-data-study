<div align="center">
<h1 align="center">Mcdd-Big-Data-Study</h1>
study project for big data (hadoop、zookeeper、kafka、flink、spark)
</div>

## 功能 ✨

> [!NOTE]
> - hadoop 3.3.6 (with jdk 1.8、maven 3.6.3)
> - zookeeper 3.9.2
> - kafka_2.12-3.7.1

## 安装 📦

```sh
git clone https://github.com/mcddhub/mcdd-big-data-study.git --depth=1
```

## 配置 🛠

1. 构建镜像
2. docker compose up
3. init dev path

### build with local (without vs code)

```shell
cd docker
docker build -f docker\Dockerfile -t caobaoqi1029/big-data-study:0.4.0 .
```

构建出 big-data-study 镜像

![image-20240914062413373](https://mcddhub-1311841992.cos.ap-beijing.myqcloud.com/picgo/202409140624869.png)

![image-20240914063024077](https://mcddhub-1311841992.cos.ap-beijing.myqcloud.com/picgo/202409140630136.png)

### build with code-server(vs code)

```shell
cd docker/vscode
docker build -t caobaoqi1029/big-data-study-vscode:0.4.0 .
```

构建出 big-data-study-vscode 镜像

![image-20240914063057735](https://mcddhub-1311841992.cos.ap-beijing.myqcloud.com/picgo/202409140630798.png)

![image-20240914063327139](https://mcddhub-1311841992.cos.ap-beijing.myqcloud.com/picgo/202409140633229.png)

docker compose up

```sh
docker compose up -d
```

![image-20240914063500121](https://mcddhub-1311841992.cos.ap-beijing.myqcloud.com/picgo/202409140635196.png)

init dev path

```sh
docker exec -it master bash
mkdir -p .config/code-server
exit
```

![image-20240914063708134](https://mcddhub-1311841992.cos.ap-beijing.myqcloud.com/picgo/202409140637226.png)

```sh
docker cp ./docker/vscode/config.yaml master:/root/.config/code-server
```

![image-20240914063742017](https://mcddhub-1311841992.cos.ap-beijing.myqcloud.com/picgo/202409140637073.png)

```sh
docker exec -it master bash
cd scripts
./vscode.sh
code server
```

![image-20240914063900871](https://mcddhub-1311841992.cos.ap-beijing.myqcloud.com/picgo/202409140639971.png)

验证 访问 localhost:8080 访问 code-server 其中密码在 

![image-20240914063950319](https://mcddhub-1311841992.cos.ap-beijing.myqcloud.com/picgo/202409140639432.png)

![image-20240914064338017](https://mcddhub-1311841992.cos.ap-beijing.myqcloud.com/picgo/202409140643164.png)

启动 hadoop 环境

```sh
hdfs namenode -format
```

![image-20240914065454899](https://mcddhub-1311841992.cos.ap-beijing.myqcloud.com/picgo/202409140654020.png)

```sh
start-all.sh
```

![image-20240914065600313](https://mcddhub-1311841992.cos.ap-beijing.myqcloud.com/picgo/202409140656454.png)

使用 

```sh
vim input.txt
hdfs dfs -put -f ./input.txt /
hdfs dfs -ls /
```

![image-20240914065847822](https://mcddhub-1311841992.cos.ap-beijing.myqcloud.com/picgo/202409140658928.png)

```sh
mvn clean package
cd target/
hadoop jar big-data.jar
```

> [!TIP]
>
> 或者也可以通过 `export CLASSPATH=$CLASSPATH:/tmp/ # 将其写入 .bashrc 否则执行 jar 会提示找不到 XXX` 即可直接执行 Java 无需手动执行 mvn 命令

![image-20240914070100713](https://mcddhub-1311841992.cos.ap-beijing.myqcloud.com/picgo/202409140701832.png)

```sh
hdfs dfs -ls /output
hdfs dfs -cat /output/part-r-00000
```

![image-20240914070205413](https://mcddhub-1311841992.cos.ap-beijing.myqcloud.com/picgo/202409140702534.png)

或者

![image-20240914070246292](https://mcddhub-1311841992.cos.ap-beijing.myqcloud.com/picgo/202409140702423.png)

![image-20240914070300541](https://mcddhub-1311841992.cos.ap-beijing.myqcloud.com/picgo/202409140703678.png)

## 更新日志 📅

- v0.4.0 (hadoop、zookeeper、kafka、code-server)

## 贡献 🤝

欢迎贡献！请随时提交拉取请求。有关详细信息，请参阅 [贡献指南](https://github.com/mcddhub/mcdd-big-data-study/blob/main/CONTRIBUTING.md)。

这个项目的存在感谢所有贡献者：

<a href="https://github.com/mcddhub/mcdd-big-data-study/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=mcddhub/mcdd-big-data-study" />
</a>

## 许可证 📄

此项目根据 MIT 许可证授权 -
有关详细信息，请参阅 [LICENSE](https://github.com/mcddhub/mcdd-big-data-study/blob/main/LICENSE) 文件。

## 支持 💖

如果你觉得这个项目有帮助，请考虑在 [GitHub](https://github.com/mcddhub/mcdd-big-data-study) 上给它一个 ⭐️！

## Star 历史 ⭐

<div align="center">

<img src="https://api.star-history.com/svg?repos=mcddhub/mcdd-big-data-study&type=Date" width="600" height="400" alt="Star History Chart" valign="middle">
