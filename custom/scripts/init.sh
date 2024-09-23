#! /bin/bash

if [ $# -eq 0 ]; then
  echo "Usage: $0 <num>"
  exit 1
fi

num=$1

# 向 myid 文件写入 id
echo "$num" > /root/zookeeper/tmp/myid