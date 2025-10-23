#!/bin/bash
source .env

echo "Backing up DB..."

dbFile=$DB_BACKUP_DIR/cypress-$DB_DATABASE.dump

mkdir -p $DB_BACKUP_DIR

mysqldump -u$DB_USERNAME -p$DB_PASSWORD $DB_DATABASE > $dbFile

echo "DB backup completed!"

exit 0;