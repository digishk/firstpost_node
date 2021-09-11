module.exports = {
  apps : [{
    name : "firstpost_dev_app",
    script: 'app.js',
    watch: '.',
    error_file:'dev_firstpost_error.log',
    out_file:'dev_firstpost_access.log',
    instances : 2,
    exec_mode : "cluster",
    combine_logs: true,
    time: true,
    log_date_format: 'YYYY-MM-DD HH:mm Z',
    env: {
      "NODE_ENV": "env_development",
    }
  },
  {
    name : "firstpost_stg_app",
    script: 'app.js',
    watch: false,
    error_file:'/var/log/pm2/stg_firstpost_error.log',
    out_file:'/var/log/pm2/stg_firstpost_access.log',
    instances : "max",
    exec_mode : "cluster",
    combine_logs: true,
    time: true,
    log_date_format: 'YYYY-MM-DD HH:mm Z',
    env : {
       "NODE_ENV": "env_staging"
    }
  },
  {
    name : "firstpost_prod_app",
    script: 'app.js',
    watch: false,
    error_file:'/var/log/pm2/firstpost_error.log',
    out_file:'/var/log/pm2/firstpost_access.log',
    instances : "max",
    exec_mode : "cluster",
    combine_logs: true,
    time: true,
    log_date_format: 'YYYY-MM-DD HH:mm Z',
    env : {
       "NODE_ENV": "env_production"
    }
  }],

 /* deploy : {
    development : {
      'post-deploy' : 'pm2 save',
    },
    staging : {
      'post-deploy' : 'pm2 save',
    },
    production : {
      'post-deploy' : 'pm2 save',
    }
  }*/
};
