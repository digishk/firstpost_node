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
/*==================== End of All Modules declaration ====================*/

exports.serverConfig = function(req, res, next) {
    /*
    *==================================================================
    * Declare All the Varibles Here only
    *=================================================================
    */
    var client = req.app.get('client');
    const clientFetch = promisify(client.get).bind(client); // now getAsync is a promisified version of client.get:
    //  console.log(client);
    var temp_vars = [];
    /*==================== End of Declaration of all variables ====================*/

    /*
    *==================================================================
    * Create Promise here
    *=================================================================
    */
    Promise.all([
        
    ]).then(() => {
        /*
        *==================================================================
        * Assign Template Varibles Here
        *=================================================================
        */
        temp_vars['constant'] = constant;
        console.log(req,"Request");
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
        res.render('server_view', templateVars); 
        /*==================== End of rendering a view ==============================*/
    })
}
