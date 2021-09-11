var  env_vars= {};
env_vars['HOST_NAME'] = "stg.firstpost.com";
env_vars['PORT'] = 8080;

env_vars['SITE_URL'] = "https://"+env_vars['HOST_NAME']+'/';
env_vars['STATIC_URL'] = "https://"+env_vars['HOST_NAME']+'/';
env_vars['HOST_NAME_PORT'] = env_vars['HOST_NAME'];

env_vars['REDIS_SERVERS'] = [{
        host: '172.18.4.59',
        port: 6379
    }, {
        host: '172.18.4.60',
        port: 6379
    }, {
        host: '172.18.4.61',
        port: 6379
    }, {
        host: '172.18.4.75',
        port: 6379
    }, {
        host: '172.18.4.76',
        port: 6379
    }, {
        host: '172.18.4.77',
        port: 6379
    }, ];

// env_vars['newrelic'] = require('newrelic');

/*Export Config Variables here*/
module.exports = env_vars;