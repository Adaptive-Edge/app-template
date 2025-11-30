module.exports = {
  apps: [{
    name: '{{APP_SLUG}}-api',
    script: 'index.js',
    cwd: '/var/www/{{APP_SLUG}}',
    env: {
      PORT: {{PORT}},
      DB_HOST: 'localhost',
      DB_USER: 'admin',
      DB_PASSWORD: '{{DB_PASSWORD}}',
      DB_NAME: '{{APP_SLUG}}',
      NODE_ENV: 'production'
    }
  }]
};
