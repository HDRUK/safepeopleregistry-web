#!/bin/bash
source .env

echo "Restoring DB..."

if ! test -f $dbFile; then
  dbFile=$DB_BACKUP_DIR/cypress-$DB_DATABASE.dump

  mysql -u$DB_USERNAME -p$DB_PASSWORD $DB_DATABASE < $dbFile

  rm -f $dbFile

  echo "DB restore completed!"
fi

exit 0;