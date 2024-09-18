
```shell
mvm clean package
docker cp .\mcdd-big-data-hadoop-study-1.0.0.jar official-namenode-1:/opt/hadoop
vim input.txt
hdfs dfs -put -f ./input.txt /input
hadoop jar ./mcdd-big-data-hadoop-study-1.0.0.jar /input /output
hdfs dfs -cat /output/part-r-00000
```