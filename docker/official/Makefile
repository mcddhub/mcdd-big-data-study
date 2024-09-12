install-spark:
	sudo tar -zxvf /opt/spark/spark-3.5.2-bin-hadoop3.tgz -C /opt/spark

install-python3:
	sudo yum install -y python3
	sudo unlink /usr/bin/python
	sudo ln -s /usr/bin/python3 /usr/bin/python

start-namenode:
	hdfs namenode &
	sleep 30