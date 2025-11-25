#!/bin/bash
source .env

scripts/cypress.backup.sh

cleanup () {
    scripts/cypress.restore.sh
}

trap cleanup SIGINT

npx cypress run -b chrome

scripts/cypress.restore.sh

exit 0;