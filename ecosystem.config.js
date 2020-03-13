module.exports = {
  apps: [
    {
      name: 'BoN',
      script: './dist',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
    },
  ],
}
