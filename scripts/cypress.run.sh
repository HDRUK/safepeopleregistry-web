#!/bin/bash
source .env

scripts/cypress.backup.sh

cleanup () {
    scripts/cypress.restore.sh
}

trap cleanup SIGINT

npx cypress run -b chrome --record --key 37722b13-e215-4d2b-95e9-96de1cc70df8

scripts/cypress.restore.sh

exit 0;