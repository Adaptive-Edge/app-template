# Claude Code Instructions for Adaptive Edge Apps

## Deployment

When deploying to the Adaptive Edge droplet (adaptiveedge.uk):

### Server Details
- **Host:** root@adaptiveedge.uk
- **SSH Key:** ~/.ssh/nathan_droplet_key
- **Web Root:** /var/www/{app-name}/
- **Process Manager:** PM2
- **Reverse Proxy:** Apache

### Deployment Steps
1. Build the app: `npm run build`
2. Copy dist to server: `scp -r dist/* root@adaptiveedge.uk:/var/www/{app-name}/`
3. **ALWAYS inject Umami analytics** (in case source doesn't have it):
   ```bash
   ssh root@adaptiveedge.uk -i ~/.ssh/nathan_droplet_key "grep -q 'umami' /var/www/{app-name}/public/index.html || sed -i 's|</head>|<script defer src=\"https://adaptiveedge.uk/analytics/script.js\" data-website-id=\"2b2469b6-5537-4486-aeef-f03b576123c8\"></script></head>|' /var/www/{app-name}/public/index.html"
   ```
4. Restart PM2 if needed: `pm2 restart {app-name}`

### Port Allocation
Check existing ports before assigning: `pm2 list` shows all apps and their ports.
Current range: 5000-5030

### Apache Configuration
- Config file: `/etc/apache2/sites-available/adaptiveedge-le-ssl.conf`
- After changes: `cp /etc/apache2/sites-available/adaptiveedge-le-ssl.conf /etc/apache2/sites-enabled/ && systemctl reload apache2`

## Analytics

**IMPORTANT:** All Adaptive Edge apps must include Umami analytics tracking.

### Tracking Script
The tracking script is already in `client/index.html`. If for any reason it's missing, add this before `</head>`:

```html
<script defer src="https://adaptiveedge.uk/analytics/script.js" data-website-id="2b2469b6-5537-4486-aeef-f03b576123c8"></script>
```

### After Deployment
Verify the tracking script is present in the deployed `index.html`:
```bash
ssh root@adaptiveedge.uk -i ~/.ssh/nathan_droplet_key "grep -l 'umami' /var/www/{app-name}/**/index.html"
```

If missing, add it:
```bash
ssh root@adaptiveedge.uk -i ~/.ssh/nathan_droplet_key "sed -i 's|</head>|<script defer src=\"https://adaptiveedge.uk/analytics/script.js\" data-website-id=\"2b2469b6-5537-4486-aeef-f03b576123c8\"></script>\n</head>|' /var/www/{app-name}/public/index.html"
```

### Analytics Dashboard
- URL: https://adaptiveedge.uk/analytics
- All apps tracked under single website ID

## Database

- **Type:** MySQL
- **Host:** localhost
- **Credentials:** Set via environment variables on server
- **Push schema:** `DB_HOST=adaptiveedge.uk DB_USER=admin DB_PASSWORD='...' DB_NAME={app} npm run db:push`

## Tech Stack

- React 18 + TypeScript
- Vite (build tool)
- Tailwind CSS + shadcn/ui
- Wouter (routing)
- TanStack Query
- Framer Motion
- Express.js backend
- Drizzle ORM + MySQL
