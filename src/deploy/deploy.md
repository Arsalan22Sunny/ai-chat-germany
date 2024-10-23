# Deployment

## Login with private key

```sh
cd ~/.ssh
cd santo
ssh -i id_rsa root@217.160.190.143
```

## Setup directory

```sh
# remote
mkdir -p /var/www/sanbjur.de
```

## Setup git repository

```sh
cd /var/www/sanbjur.de
git init
git remote add origin https://github.com/santokhan/ai-chat-germany.git
git fetch --all
# username: santokhan
# passowrd: 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
git pull origin main
if [ -f .env.txt ]; then
    sudo mv .env.txt .env
fi
```

## Build

```sh
cd /var/www/sanbjur.de
npm i
npm run build
```

## Give file to nginx permission

```sh
sudo chown -R www-data:www-data /var/www/sanbjur.de
sudo chmod -R 755 /var/www/sanbjur.de
```

```sh
sudo chown -R www-data:www-data /var/www/sanbjur.de/dist
sudo chmod -R 755 /var/www/sanbjur.de/dist
```

## Setup NGINX if does not exists

```sh
cat /etc/nginx/sites-available/sanbjur
sudo nano /etc/nginx/sites-available/sanbjur
```

## Restart

```sh
sudo service nginx reload
```
