module.exports = {
  apps : [{
    name      : 'GENARA',
    script    : 'node src/index.js',
    env: {
      NODE_ENV: 'development',
      GENARA_TOKEN: '',
      ANTUAN_TOKEN: '',
      MARAM_TOKEN: '',
      MONGODB_URI: 'mongodb://localhost/genara',
    }
  }],

  deploy : {
    production : {
      user : 'node',
      host : 'amatiasq.com',
      ref  : 'origin/master',
      repo : 'git@github.com:amatiasq/genara.git',
      path : '/home/amatiasq/www/repos/genara',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
};

