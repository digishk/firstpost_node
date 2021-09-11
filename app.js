var path = require('path');
const requireConfig = require('./require.config');
global.appRequire = alias => require(path.join(__dirname, `/${requireConfig[alias.toLowerCase()]}`));

var env_file = process.env.NODE_ENV || 'env_development';
global.env_vars = appRequire(env_file);

/*--------------------New relic code-----------------------*/
var newrelicexist = 0;
if(env_file.toLowerCase() != 'env_development')
{
    const fs = require('fs');
    const newrelicpath = 'newrelic.js';

    try {
      if (fs.existsSync(newrelicpath)) {
        var newrelic = require('newrelic');
        newrelicexist = 1;
      }
    } catch(err) {
      console.error(err);
    }
    
}
/*--------------------New relic code-----------------------*/

const http = require('http');
var express = require('express');
var app = express();
var multer = require('multer')
var constants = require('constants');
const querystring = require('querystring');
const {promisify} = require("util");


global.constant = "";
global.serverPrefix = '';
global.cricketData = ''; 
global.covidData = '';
global.iplData = ''; 
global.covidCatData = '';
global.rhs_video_fp = '';
global.cricketLive = '';
global.environment =  "Development";//"Development"; //Production

const constant = appRequire('constant');
if (serverPrefix == "Revamp_") {
    constant.MAIN_SITE_URL = "http://revamp.firstpost.com/";
}
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var dateFormat = require('dateformat');
const { addSlashes, stripSlashes } = require('slashes');
var htmlDecode = require('decode-html');
constant.stripSlashes = stripSlashes;
constant.htmlDecode = htmlDecode;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
//set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
//app.use(bodyParser()); // get information from html forms
//view engine setup
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname)));
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'ejs');
// app.use(express.static(__dirname + '/public'));
/*==========================Redis Connection==============================*/
/*var RedisClustr = require('redis-clustr');
var RedisClient = require('redis');
var redis = new RedisClustr({
    servers: env_vars['REDIS_SERVERS'],
    slaves: 'share',
    wait: 5000, 
    slotInterval: 1000,
    createClient: function(port, host,options) {
        //this is the default behaviour

        return RedisClient.createClient(port, host, options);
    },redisOptions: {
    // options passed to the node_redis client https://github.com/NodeRedis/node_redis#options-is-an-object-with-the-following-possible-properties
    retry_strategy: function(options){
        
        if (options.error && options.error.code === "ECONNRESET") {
            console.log(options.error,"error");
            console.log(options.total_retry_time,"total_retry_time");
        }
        
        return Math.min(options.attempt * 100, 3000);
    },
    // etc
  }
});*/
var Redis = require('ioredis');

var redis = new Redis.Cluster(env_vars['REDIS_SERVERS'],
    {
        clusterRetryStrategy: function (times) {
            console.log(times,"times==");
              var delay = Math.min(100 + times * 2, 2000);
              return delay;
            },
            scaleReads: "all",
    }
    );
app.set('client', redis);
var client = app.get('client');
client.on('error',function(err){ console.error(err,"error found")})
/*==========================End of Redis Connection==============================*/
// constant ======================================================================
if(environment.toLowerCase() != "development")
{
var minifyHTML = require('express-minify-html');
app.use(minifyHTML({
    override:      true,
    exception_url: false,
    htmlMinifier: {
        removeComments:            true,
        collapseWhitespace:        true,
        collapseBooleanAttributes: true,
        removeAttributeQuotes:     true,
        removeEmptyAttributes:     true,
        minifyJS:                  true
    }
}));
}
app.use(async function(req, res, next) {
    includeBelowCalls = ["", ".html"];
    urlext = path.extname(req.url);
    for (const [includeBelowCalls_key, includeBelowCalls_val] of Object.entries(includeBelowCalls)) {
        if (urlext != "") {
            if (urlext.includes(includeBelowCalls_val) == false) {
                return next();
            }
        }
    }
    constant.reqheaders = req.headers;
    // res.constant = constant;
    constant.viewpath = path.join(__dirname, 'app/views');
    /*==========================isMobile Parameter & device name==============================*/
    const ismobile_check = await appRequire('ismobile_check')(app,constant);
    /*==========================isMobile Parameter & device name==============================*/
    /*==========================hideJSforEU Parameter ==============================*/
    const hideJSforEU_check = await appRequire('hideJSforEU_check')(app,constant);
    /*==========================hideJSforEU Parameter ==============================*/    


    const common = appRequire('common_functions');
    const clientFetch = promisify(redis.get).bind(redis);
    return Promise.all([
            clientFetch(serverPrefix + 'FP2.0_config_flags').then((response) => {
                constant.config_flags = JSON.parse(response, "res");
            }),
            clientFetch(serverPrefix + 'FP2.0_ipl_ranking_article').then((response) => {
                iplData = JSON.parse(response, "res");
            }),
            clientFetch(serverPrefix + 'fp_level_wise_menu_items').then((response) => {
                constant.fp_menu = JSON.parse(response, "res");
            }),
            clientFetch(serverPrefix + 'FP_Node_CategoryPageContents_firstcricket').then((response) => {
                var liveData = JSON.parse(response, "res");
                for (const [key, val] of Object.entries(liveData['CatMainRanking']['main_ranking'])) {
                    if(val['isliveBlog'] == '1'){
                        cricketLive = val['post_url'];
                    }
                }
            }),
            clientFetch(serverPrefix + 'FP_Node_cricLiveData').then((result) => {
                var rData = cricketData =  JSON.parse(result);                
                if(rData != null){
                    var now = new Date();
                    var currTime = now.getTime();
                    timeDiff = currTime-rData['redis_set'];
                    if (timeDiff >= 0) {
                       return common.getcricketScores(req);
                    }
                }else if(rData == null){
                    return common.getcricketScores(req);
                }
            }),
            new Promise((resolve, reject) => {
                return common.getFooter(req).then((data) => {
                    constant.footer = data;
                    resolve();
                });
            }),
            new Promise((resolve, reject) => {
                return common.getCovidData(req).then((data) => {
                    covidData = data;
                    resolve();
                });
            }),
            new Promise((resolve, reject) => {
                if(newrelicexist == 1)
                {
                    try {
                      newrelic.setTransactionName(req.originalUrl);
                    } catch(err) {
                      console.error(err);
                    }
                    
                }
                resolve();
            }),
            clientFetch(serverPrefix + 'FP_Node_CategoryPageContents_health').then((response) => {
                covidCatData = JSON.parse(response, "res");
            }),
            clientFetch(serverPrefix + 'FP2.0_RHS_Video').then((response) => {
                rhs_video_fp = JSON.parse(response, "res");
            }),
        ]).then(() => {
            next();
        });
        
    /*await redis.get(serverPrefix + 'FP2.0_config_flags', function(err, response) {
        constant.config_flags = JSON.parse(response, "res");
    });

    await redis.get(serverPrefix + 'Revamp_fp_level_wise_menu_items', function(err, response) {
       constant.fp_menu = JSON.parse(response, "res");
    });*/
    /*==========================Get Footer====================================*/
    // constant.footer = await common.getFooter(req);
    /*==========================End of Footer====================================*/
    // console.log(constant.config_flags);
    // next();
});
// routes ======================================================================
require('./config/routes.js')(app, function() { // load our routes and pass in our app and fully configured passport
    //launch ======================================================================
    // app.listen(port);
    // console.log(common_functions.cleanText);
    var options = {
        hostname: constant['HOST_NAME'],
        port: constant['PORT']
    }
    const server = http.createServer(app);
    //res.write("hello world\n");
    server.listen(options, (err, res, body) => {
        console.log(`Server running at http://${options.hostname}:${options.port}/`);
    });
    //catch 404 and forward to error handler
     
    app.use(function(req, res, next) {
        if(res.status(404).statusCode == 404 || res.status(500).statusCode == 500)
        {
            const error_controller = appRequire('error_controller');
            return error_controller.error(req,res);
        }
        // res.status(404).render('404', {
        //     title: "Sorry, page not found",
        //     session: req.sessionbo
        // });
    });
    /*app.use(function(req, res, next) {
        res.status(500).render('404', {
            title: "Sorry, page not found"
        });
    });*/
    exports = module.exports = app;
});