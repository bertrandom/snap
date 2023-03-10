#!/bin/bash
SCRIPT_LOCATION="$(dirname -- "$(readlink -f "${BASH_SOURCE}")")"

mkdir -p "$SCRIPT_LOCATION/data"
mkdir -p "$SCRIPT_LOCATION/tmp"

PLIST="$SCRIPT_LOCATION/tmp/snap.plist"
AUTH_JSON="$SCRIPT_LOCATION/data/auth.json"

for d in /Users/$USER/Library/Containers/* ; do
    SQLITE_DB="$d/Data/Library/Caches/com.nvsgames.snap/Cache.db"
    if [ -f "$SQLITE_DB" ]; then
        echo "Found SQLite DB in $SQLITE_DB"

        echo -n "Extracting plist from DB... "

        sqlite3 $SQLITE_DB "SELECT writefile('$PLIST', bd.request_object) from cfurl_cache_response AS cr, cfurl_cache_blob_data AS bd WHERE cr.request_key LIKE '%game/getActiveGame' AND cr.entry_ID = bd.entry_ID LIMIT 1" > /dev/null
        echo "done."

        echo "Extracting keys from plist... "
        echo "Saving to $AUTH_JSON:"
        plutil -remove Array.21 -o - $PLIST | plutil -extract Array json -o - - | jq '.[19]' | tee $AUTH_JSON

        rm -f $PLIST
        rmdir "$SCRIPT_LOCATION/tmp"

        echo "All done!"

        break;
    fi
done