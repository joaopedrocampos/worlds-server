### Running application

Starting Mongo DB
```
sudo docker-compose up -d
```

The command gonna start the Mongo DB and create the worlds database

Using Mongo default user
```
mongo -u "ae_natan" -p "mudar1234" --authenticationDatabase worlds
```

Using Mongo root user
```
mongo -u root -p password --authenticationDatabase admin
```