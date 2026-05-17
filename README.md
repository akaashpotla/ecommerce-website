# ecommerce-website

## Seeding database for development

```
$ docker cp seed.csv ecommerce_db:/seed.csv
$ docker exec -it ecommerce_db psql -U postgres -d ecommerce
```

```
COPY products(name, description, price)
FROM '/seed.csv'
DELIMITER ','
CSV HEADER;
```