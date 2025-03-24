module.exports = {
    apps: [
      {
        name: 'kuby-blog',
        cwd: './',
        script: 'npm',
        args: 'start',
        env: {
          NODE_ENV: 'production',
        },
      },
    ],
  };