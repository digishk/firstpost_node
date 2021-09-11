/*
*==================================================================
* Project: Firstpost English
* Controller: Error
* Created By: Digish
* Note: Please read comments before doing any task. 
        Commented code is only reference.
*=================================================================
*/
const {promisify} = require("util");
const common = appRequire('common_functions');
const constant = appRequire('constant');
var dateFormat = require('dateformat');
var async = require('async');
/*==================== End of All Modules declaration ====================*/
exports.error = function(req, res, next) {
    var deviceDetails = common.isMobileVar(req);
    const device  = deviceDetails.device;
    const isMobile  = deviceDetails.isMobile;
	/*
    *==================================================================
    * Declare All the Varibles Here only
    *=================================================================
    */
    var client = req.app.get('client');
    const clientFetch = promisify(client.get).bind(client); // now getAsync is a promisified version of client.get:
    var errorPageJson = [];
    var temp_vars = [];
	/*
    *==================================================================
    * Create Promise here
    *=================================================================
    */

    Promise.all([
    	new Promise((resolve, reject) => {
            clientFetch("FP_404Content").then((response) => {
            var errorPageJson = JSON.parse(response);
            temp_vars['errorPageJson'] = errorPageJson; 
	            resolve();

            })
        }),

		/*clientFetch("fp_2.0_latest_category_news_content").then((result)=> {
		    temp_vars['menusJson'] = JSON.parse(result); 
		    console.log(temp_vars['menusJson']);
		}),*/
    ]).then(() => {     
       
        /*
        *==================================================================
        * Get SEO data
        *=================================================================
        */
        var seoData = {};
        seoData['metaTitle'] = "404 - Page Not Found | Firstpost";
        seoData['metaDesc']  ="The page you are looking for might have been removed, had its name changed, or is temporarily unavailable on firstpost.com.";
        
        var schema_meta = [];

        schema_meta['metaTitle'] = seoData['metaTitle'];
        schema_meta['metaDesc']  = seoData['metaDesc'];
        schema_meta['contentUrl'] = seoData['pageUrl'];

        schema_meta['schema_type'] = ["organisation","website","webpage"];
        schema_meta['flag'] = 0;
        temp_vars['schema_meta'] = schema_meta;
        
	    var breadcrumbsArr = [];

	    /*
	    *==================================================================
	    * Breadcrumb schema  
	    *=================================================================
	    */
	    
	    breadcrumbsArr[constant.SITE_URL] = "Latest News";
	    breadcrumbsArr['active'] = "Page not found!";

	    /* Breadcrumb schema end */

        /*
        *==================================================================
        * Assign Template Varibles Here
        *=================================================================
        */
        //console.log(temp_vars['tagData']);
        temp_vars['constant'] = constant;
        temp_vars['common'] = common;
        temp_vars['viewpath'] = constant.viewpath;
        temp_vars['seoData'] = seoData;
        temp_vars['breadcrumbsArr'] = breadcrumbsArr;
        temp_vars['device'] = device;
temp_vars['isMobile'] = isMobile;
        temp_vars['dateFormat'] = dateFormat;
        temp_vars['footer'] = constant.footer;
        temp_vars['mobilePageCss'] = constant.SITE_URL+'static/css/m-404-fp.css';
        temp_vars['desktopPageCss'] = constant.SITE_URL+'static/css/404-fp.css';
        temp_vars['pageName'] = 'error';
        
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
         res.render(device + '/firstpost/error-404', templateVars); 
        /*==================== End of rendering a view ==============================*/
    }) 	
}	