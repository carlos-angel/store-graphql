# store
API de una tienda en linea  con node y postgres

## `getting started`

```bash
# install dependencies
npm install

# copy docker-compose.yml.dist file to docker-compose.yml
cp docker-compose.yml.dist docker-compose.yml
```

## `development`
```bash
# run docker-compose
docker-compose up -d postgres

# run api
npm run dev
```

## `production`

```bash
# run docker-compose
docker-compose up -d postgres

# run api
npm run start
```