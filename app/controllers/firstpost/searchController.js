/*
*==================================================================
* Project: Firstpost English
* Controller: Search
* Created By: Digish Kansara
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

exports.search = function(req, res, next) {
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
    let temp_vars = [];
    
    
    if(req.query['q'] != undefined || req.query['q'] != null){
    	var searchSlug =  req.query['q'];
    	searchSlug = common.slug_to_space(searchSlug);
    }else{
    	var searchSlug =  req.params['search_slug'];
    	searchSlug = common.validate_input(searchSlug);
    }
    let seoData = [];
    /*
    *==================================================================
    * Create Promise here
    *=================================================================
    */
    Promise.all([
        clientFetch(serverPrefix + "fp_top_stories_article_data").then((result)=> {
            temp_vars['mostReadArtcles'] = JSON.parse(result); 
        }),
        /*
        *==================================================================
        * Use Below Promise for Ads only
        *=================================================================
        */
        new Promise((resolve, rej) => {
            if(constant.hideJSforEU == 'no')
            {
                const adsArr = [];
                var keyArr = ['fpros'];

                temp_vars['ads'] = common.getAds(keyArr,device);
                // console.log(JSON.stringify(temp_vars['ads'],null," "),"temp_vars['ads']");
            }
            resolve();

        })

    ]).then(() => {
    /*
    *==================================================================
    * Get Seo Meta
    *=================================================================
    */
    seoData['metaTitle'] = "Search Hub - Firstpost.com";
    seoData['metaDesc'] = "The search bub by firstpost.com.";
    seoData['pageUrl'] = constant.SITE_URL+'search/';
    seoData['ogImg'] = seoData['twitImg'] = constant.IMG_URL+'wp-content/uploads/2016/03/FP-Logo.png';
    /*
    *==================================================================
    * Assign Template Varibles Here
    *=================================================================
    */
    temp_vars['constant'] = constant;
    temp_vars['seoData'] = seoData;
    temp_vars['viewpath'] = constant.viewpath;
    temp_vars['device'] = device;
temp_vars['isMobile'] = isMobile;
    temp_vars['footer'] = constant.footer;
    temp_vars['common'] = common;
    temp_vars['dateFormat'] = dateFormat;
    temp_vars['pageName'] = 'search';
    temp_vars['searchSlug'] = searchSlug;
    temp_vars['mobilePageCss'] = constant.SITE_URL+'static/css/m-home-fp.css';
    temp_vars['desktopPageCss'] = constant.SITE_URL+'static/css/home-fp.css';
    templateVars = {};
    templateVars = common.assignTempVars(temp_vars);

    /*
    *==================================================================
    * Render View Here only
    *=================================================================
    */
        res.render(device + '/firstpost/search', templateVars); 
        /*==================== End of rendering a view ==============================*/
    })	
}

exports.auto_suggest = function(req,res,next){
	var client = req.app.get('client');
    //const clientFetch = promisify(client.get).bind(client); // now getAsync is a promisified version of client.get:
	var temp_vars = [];
	var searchSlug =  req.params['search_slug'];
    searchSlug = common.validate_input(searchSlug);
	/*
    *==================================================================
    * Create Promise here
    *=================================================================
    */
    Promise.all([
        /*clientFetch(serverPrefix + "fp_top_stories_article_data").then((result)=> {
                temp_vars['mostReadArtcles'] = JSON.parse(result); 
                resolve();
        }),*/
         
        new Promise((resolve, rej) => {
                common.getSearchAutoSuggest(searchSlug,5).then((data) => {
                    temp_vars['searchData'] = (data);
                    resolve();
                });
        })	

	

    ]).then(() => {
    
    
    templateVars = {};
    templateVars = common.assignTempVars(temp_vars);
    //console.log(JSON.stringify(temp_vars['searchData']));
    //var jsonString = JSON.parse(temp_vars['searchData']);

    console.log(temp_vars['mostReadArtcles']);	
    /*
    *==================================================================
    * Render View Here only
    *=================================================================
    */
    //res.contentType('json');
    //res.send({ some: JSON.stringify({response:'json'}) });
    res.send(temp_vars['searchData']);
    //res.end();	
    })	
}
