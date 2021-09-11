/*
*==================================================================
* Project: Firstpost English
* Controller: Config
* Created By: Avdhut Chavan
* Note: Please read comments before doing any task. 
        Commented code is only reference.
*=================================================================
*/
const {
    promisify
} = require("util");
const common = appRequire('common_functions');
const constant = appRequire('constant');
var dateFormat = require('dateformat');
const fetch = require('node-fetch');

/*==================== End of All Modules declaration ====================*/

exports.config_flags = function(req, res, next) {
    const error_controller = appRequire('error_controller');
    return error_controller.error(req,res);
    /*
    *==================================================================
    * Declare All the Varibles Here only
    *=================================================================
    */
    var client = req.app.get('client');
    const clientFetch = promisify(client.get).bind(client); // now getAsync is a promisified version of client.get:
    //  console.log(client);
    var temp_vars = [];
    var redisKey = "FP2.0_config_flags";
    temp_vars['url'] = '/config-flags'; 
    temp_vars['revamp'] = req.query.revamp;
    /*==================== End of Declaration of all variables ====================*/

    var revampRedisKey = "";
    if(temp_vars['revamp'] != "" && temp_vars['revamp'] != undefined)
    {
        revampRedisKey = "Revamp_";
        temp_vars['url'] = temp_vars['url']+'?revamp=1'; 
    }
    redisKey = revampRedisKey+redisKey;
    temp_vars['redisKey'] = redisKey; 
    if(Object.keys(req.body).length > 0)
    {
        client.set(redisKey, JSON.stringify(req.body, null, "  "));
        timeform = Math.floor(Date.now() / 1000);
        locate_url = temp_vars['url']+'?v='+timeform;
        res.writeHead(301, { "Location": locate_url });
        res.end();
         /*return new Promise((resolve, reject) => {
            timeform = Math.floor(Date.now() / 1000);
            locate_url = temp_vars['url']+'?v='+timeform;
            locate_url1 = 'config-flags?v='+timeform;
            return fetch('http://www.firstpost.com/rcheck.php?url='+constant['SITE_URL']+locate_url1).then(response => {response.text();console.log(response);}).then(str => {

                return setTimeout(function (){
                    res.writeHead(301, { "Location": locate_url });
                    res.end();
                    return resolve(str);
                },5000);
            })
        })*/

        
    }
    
    /*
    *==================================================================
    * Create Promise here
    *=================================================================
    */
    Promise.all([
        clientFetch(redisKey).then((configFlags)=> {
            temp_vars['configFlags'] = JSON.parse(configFlags); 
        })
    ]).then(() => {
        /*
        *==================================================================
        * Assign Template Varibles Here
        *=================================================================
        */
        temp_vars['constant'] = constant;
        /*==================== End of Assignment of Template Variables ====================*/
        // console.log(JSON.stringify( temp_vars['fCrickWidgetData'], null, "  "));
        /*
        *==================================================================
        * assignTempVars() creates variables for template
        * Please do not remove this function untill it's not in use
        *=================================================================
        */
        templateVars = {};
        templateVars = common.assignTempVars(temp_vars);
        /*==================== End of assignTempVars() ==============================*/

        /*
        *==================================================================
        * Render View Here only
        *=================================================================
        */
        res.render('config_view', templateVars); 
        /*==================== End of rendering a view ==============================*/
    })
}
