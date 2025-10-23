#!/bin/bash
source .env

echo "Restoring DB..."

if ! test -f $dbFile; then
  echo "${$dbFile} file does not exist";

  exit 1;
fi

dbFile=$DB_BACKUP_DIR/cypress-$DB_DATABASE.dump

mysql -u$DB_USERNAME -p$DB_PASSWORD $DB_DATABASE < $dbFile

rm -f $dbFile

echo "DB restore completed!"

exit 0;