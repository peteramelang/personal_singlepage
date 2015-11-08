#!/usr/bin/env bash


## Apache - Vhosts
####################################################
sudo cp /project/dev/vagrantprovisioning/vhosts/* /etc/apache2/sites-enabled/
sudo rm /etc/apache2/sites-enabled/000-default.conf

## Apache - Restart
####################################################
sudo /etc/init.d/apache2 restart

## MySQL Remote Access & Database Import
####################################################
sudo sed -i 's/= 127.0.0.1/= 0.0.0.0/g' /etc/mysql/my.cnf
mysql -u root -e "GRANT ALL PRIVILEGES ON *.* TO 'root'@'192.168.59.10' IDENTIFIED BY '' WITH GRANT OPTION; FLUSH PRIVILEGES;"
sudo /etc/init.d/mysql restart