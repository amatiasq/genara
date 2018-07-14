module.exports = {
  apps : [{
    name      : 'GENARA',
    script    : 'node src/index.js',
    env: {
      NODE_ENV: 'development',
      GENARA_TOKEN: 'Mzg5NzUzOTQ3NzgwNTQ2NTYz.DRAKPQ.SKEiDLMiqf901He3rSBtXSy6Sxg',
      ANTUAN_TOKEN: 'MzkxMjQzNTI4Nzk5Mzg3NjUy.DRV1jA.UdFyZODfzHTy-oFstBKZe9zbQ6g',
      MARAM_TOKEN: 'MzkxMjQ0MDEzNDIxODU0NzIy.DRV15g.qth8hQ9dhSvcEdQgixpxswQxGFc',
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

