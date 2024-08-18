#!/bin/bash

read -p "Mensaje del commit: " msg

git add *
git commit -m "feat:$msg"
git push origin main
