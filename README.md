# snap

CLI tool for calling the Marvel Snap API using authorization tokens extracted from the OS X app

## installation

Clone this repo somewhere and enter its directory:

```
git clone git@github.com:bertrandom/snap.git
cd snap
```

Install the [Marvel Snap app](https://apps.apple.com/us/app/marvel-snap/id1592081003), run it, and let it finish loading.

Quit the app.

Run the extraction script to retrieve your authorization tokens:

```
./extract.sh
```

You will need [deno](https://deno.land/manual@v1.31.2/getting_started/installation) installed.

## usage

```
./snap -h
```

will show you the available options.

For example:

```
./snap collection
```

will retrieve your collection state in JSON format.
