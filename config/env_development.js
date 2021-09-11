var  env_vars= {};
env_vars['HOST_NAME'] = "livelocal.firstpost.com";
env_vars['PORT'] = 8041;

env_vars['SITE_URL'] = "http://"+env_vars['HOST_NAME']+":"+env_vars['PORT']+'/';
env_vars['STATIC_URL'] = "http://"+env_vars['HOST_NAME']+":"+env_vars['PORT']+'/';
env_vars['HOST_NAME_PORT'] = env_vars['HOST_NAME']+":"+env_vars['PORT'];

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

/*Export Config Variables here*/
module.exports = env_vars;