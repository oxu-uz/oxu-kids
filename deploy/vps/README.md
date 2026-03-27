# OXU KIDS VPS Deploy

This setup uses:

- `Nginx` for the public web server
- `Java 21` + `systemd` for the Spring Boot backend
- `PostgreSQL` for the production database

The examples below assume:

- domain: `kids.example.com`
- backend app dir: `/srv/oxu-kids/backend`
- uploads dir: `/srv/oxu-kids/uploads`
- frontend static dir: `/var/www/oxu-kids/current`
- backend service name: `oxu-kids-backend`

## 1. Install system packages

Example for Ubuntu:

```bash
sudo apt update
sudo apt install -y openjdk-21-jre nginx postgresql postgresql-contrib
```

If your Ubuntu image does not include the PostgreSQL version you want, use the PostgreSQL APT repository.

## 2. Create deploy user and folders

```bash
sudo useradd --system --home /srv/oxu-kids --shell /usr/sbin/nologin oxukids
sudo mkdir -p /srv/oxu-kids/backend
sudo mkdir -p /srv/oxu-kids/uploads
sudo mkdir -p /var/www/oxu-kids/current
sudo mkdir -p /etc/oxu-kids
sudo chown -R oxukids:oxukids /srv/oxu-kids
```

## 3. Create PostgreSQL database

```bash
sudo -u postgres psql
```

Then run:

```sql
CREATE DATABASE oxu_kids;
CREATE USER oxu_kids WITH ENCRYPTED PASSWORD 'replace-with-a-strong-db-password';
GRANT ALL PRIVILEGES ON DATABASE oxu_kids TO oxu_kids;
\q
```

## 4. Build backend jar

On your server or CI runner:

```bash
cd backend
mvn -DskipTests package
```

Copy the built jar to:

```bash
/srv/oxu-kids/backend/app.jar
```

## 5. Configure backend environment

Copy [backend.env.example](./backend.env.example) to:

```bash
sudo cp deploy/vps/backend.env.example /etc/oxu-kids/backend.env
sudo nano /etc/oxu-kids/backend.env
```

Important values to update:

- `DATABASE_PASSWORD`
- `JWT_SECRET`
- `FRONTEND_URL`
- `SUPER_ADMIN_EMAIL`
- `SUPER_ADMIN_PASSWORD`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`

Secure the file:

```bash
sudo chown root:oxukids /etc/oxu-kids/backend.env
sudo chmod 640 /etc/oxu-kids/backend.env
```

## 6. Install systemd service

```bash
sudo cp deploy/vps/oxu-kids-backend.service /etc/systemd/system/oxu-kids-backend.service
sudo systemctl daemon-reload
sudo systemctl enable oxu-kids-backend
sudo systemctl start oxu-kids-backend
sudo systemctl status oxu-kids-backend
```

Logs:

```bash
sudo journalctl -u oxu-kids-backend -f
```

## 7. Build frontend

Use the production frontend env:

```bash
cp deploy/vps/frontend.env.production.example frontend/.env.production
cd frontend
npm install
npm run build
```

Copy the contents of `frontend/dist/` to:

```bash
/var/www/oxu-kids/current
```

Example:

```bash
sudo rsync -av --delete frontend/dist/ /var/www/oxu-kids/current/
```

## 8. Install Nginx config

Copy and edit the domain in [oxu-kids.nginx.conf](./oxu-kids.nginx.conf), then:

```bash
sudo cp deploy/vps/oxu-kids.nginx.conf /etc/nginx/sites-available/oxu-kids
sudo ln -s /etc/nginx/sites-available/oxu-kids /etc/nginx/sites-enabled/oxu-kids
sudo nginx -t
sudo systemctl reload nginx
```

## 9. Enable HTTPS

After DNS points to the VPS, install SSL with Certbot:

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d kids.example.com -d www.kids.example.com
```

## 10. Health check

Backend health:

```bash
curl http://127.0.0.1:8080/actuator/health
```

Public site:

```bash
curl -I http://kids.example.com
```

## Update flow

For each new release:

1. Pull latest code
2. Build backend jar
3. Replace `/srv/oxu-kids/backend/app.jar`
4. Build frontend
5. Sync `frontend/dist/` to `/var/www/oxu-kids/current/`
6. Restart backend:

```bash
sudo systemctl restart oxu-kids-backend
```

## Notes

- The backend serves uploaded files from the directory defined by `UPLOAD_DIR`
- Nginx proxies `/api` and `/uploads` to Spring Boot
- Keep production secrets out of Git; use `/etc/oxu-kids/backend.env`
