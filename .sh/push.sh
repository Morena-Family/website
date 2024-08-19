#!/bin/bash
echo -e "\e[93mAcuérdate de hacer\e[0m \e[94m\e[5mgit pull\e[0m\e[0m"
read -p "Mensaje del commit: " msg
echo -e "\e[96mIniciando la subida que sube\e[0m"
git add *
git commit -m "feat:$msg"
git push origin main
