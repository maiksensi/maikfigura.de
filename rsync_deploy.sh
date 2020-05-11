#!/bin/bash

rsync -e "ssh -p $SSH_PORT -i $MAIKFIGURA_DE_DEPLOYMENT_KEY" -P -rvzc --delete $OUTPUTDIR $SSH_USER@$SSH_HOST:$SSH_TARGET_DIR --cvs-exclude
