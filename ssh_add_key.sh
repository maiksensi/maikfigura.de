#!/bin/bash

eval $(ssh-agent)
SSH_ASKPASS=./ssh_give_pass.sh ssh-add $MAIKFIGURA_DE_DEPLOYMENT_KEY <<<"$MAIKFIGURA_DE_DEPLOYMENT_KEY_PASSWORD"
