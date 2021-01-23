#!/bin/bash

echo "Create image"
sudo docker build -t tcc_front .
echo "tag image"
sudo docker tag tcc_front:latest srochg/tcc_front
echo "push image"
sudo docker push srochg/tcc_front:latest
sudo docker run -d -p 8800:8080 tcc_front
