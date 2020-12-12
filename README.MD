### Project Setup

To run this project you need
- NodeJS >= 10
- NPM
- Docker/Docker-Compose

### Running tests

Before running the application tests you need to start the docker-compose
```
sudo docker-compose up -d
```

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

### Git Hooks

The project has [git hooks](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks) for `pre-commit` (before commit, execute `npm run lint`) and `pre-push` (before push executes `npm run test:unit:coverage`) steps. 

To configure you need to do the following commands:

```
make hook
chmod +x .git/hooks/pre-commit
chmod +x .git/hooks/pre-push
```

If you want to skip these hooks just run  `git commit` or `git push` adding the `--no-verify` flag.

```
git push origin {branch} --no-verify
git commit -m 'Your message' --no-verify
```