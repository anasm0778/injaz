module.exports = {
  script: './src/server.ts',
  interpreter: 'ts-node/register',
  exec_mode: 'fork',
  instances: 1,
  watch: true,
  // Other PM2 configurations...
};
