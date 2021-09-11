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
var async = require('async');
var dateFormat = require('dateformat');

/*==================== End of All Modules declaration ====================*/

exports.shows = function(req, res, next) {
    var deviceDetails = common.isMobileVar(req);
    const device  = deviceDetails.device;
    const isMobile  = deviceDetails.isMobile;
    
	console.log('In Shows');
	/*
	*==================================================================
	* Declare All the Varibles Here only
	*=================================================================
	*/
	var client = req.app.get('client');
	const clientFetch = promisify(client.get).bind(client); // now getAsync is a promisified version of client.get:
	let temp_vars = [];
	let seoData = [];
	/*
	*==================================================================
	* Create Promise here
	*=================================================================
	*/
	Promise.all([
		clientFetch("FPShowsHomeListing").then((showListing)=> {
            temp_vars['showListing'] = JSON.parse(showListing); 
        }),
        
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
                var keyArr = ['fpros','fpcatshows'];
                
                temp_vars['ads'] = common.getAds(keyArr,device);
                 //console.log(JSON.stringify(temp_vars['ads'],null," "),"temp_vars['ads']");
            }
            resolve();

        }),
        /*
        *==================================================================
        * Use Below Promise for Outbrain Ads only
        *=================================================================
        */
        new Promise((resOutbrain, rejOutbrain) => {
            if (typeof constant.config_flags.OUTBRAINS_ADS_FLAG !== 'undefined' && constant.config_flags.OUTBRAINS_ADS_FLAG == 1) {
                const outbrainArr = [];
                var outbrainAdsKeyArr = [];
                outbrainAdsKeyArr['pageUrl'] = constant.SITE_URL.replace(constant.SITE_URL , constant.MAIN_SITE_URL)+'shows';
                if(isMobile == 1){
                   outbrainAdsKeyArr['adsSlot'] = ['MB_2'];
                }else{
                    outbrainAdsKeyArr['adsSlot'] = ['AR_2' , 'SB_4'];
                }
                
                //console.log(outbrainAdsKeyArr , "outbrainAdsKeyArr");
                temp_vars['outbrain_ads'] = common.getOutbrainAds(outbrainAdsKeyArr);
                // console.log(JSON.stringify(temp_vars['ads'],null," "),"temp_vars['ads']");
            }
            resOutbrain();
        })
	]).then(() => {
	//console.log(temp_vars['showListing']);

    var breadcrumbsArr = [];
	/*
    *==================================================================
    * Breadcrumb schema  
    *=================================================================
    */
    
    breadcrumbsArr[constant.SITE_URL] = "Latest News";
    breadcrumbsArr[constant.SITE_URL+'shows'] = "Shows";

    /* Breadcrumb schema end */	

    var schema_meta = [];
            
    schema_meta['metaTitle'] = "Popular Shows India - Most Watched Programs Online, Watch Episodes and Series Online Videos (HD) Free by Firstpost";
    schema_meta['metaDesc']  = "Watch popular fiction and nonfiction shows India online videos (HD) free by Firstpost. Get full list of most watched programs, episodes and series online at Firstpost.com.";
    schema_meta['contentUrl'] = constant['SITE_URL']+'shows';

    schema_meta['schema_type'] = ["organisation","webpage"];

    schema_meta['flag'] = 0;
    temp_vars['schema_meta'] = schema_meta;


	/*
	*==================================================================
	* Get Seo Meta
	*=================================================================
	*/
	seoData['metaTitle'] = "Popular Shows India - Most Watched Programs Online, Watch Episodes and Series Online Videos (HD) Free by Firstpost";
	seoData['metaDesc'] = "Watch popular fiction and nonfiction shows India online videos (HD) free by Firstpost. Get full list of most watched programs, episodes and series online at Firstpost.com.";
	seoData['pageUrl'] = constant.SITE_URL+'shows';
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
    temp_vars['pageName'] = 'shows';
    temp_vars['breadcrumbsArr'] = breadcrumbsArr;
    temp_vars['mobilePageCss'] = constant.SITE_URL+'static/css/m-shows-lp-fp.css';
    temp_vars['desktopPageCss'] = constant.SITE_URL+'static/css/show-lp-fp.css';
    templateVars = {};
    templateVars = common.assignTempVars(temp_vars);
    /*
    *==================================================================
    * Render View Here only
    *=================================================================
    */
    res.render(device + '/firstpost/shows', templateVars); 
    /*==================== End of rendering a view ==============================*/
	}) 	
}	