/*
*==================================================================
* Project: Firstpost English
* Controller: Tag
* Created By: Shalini
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
exports.ampTag = function(req, res, next) {
    //console.log("insideeee  cat func");
    /*
    *==================================================================
    * Declare All the Varibles Here only
    *=================================================================
    */
    var client = req.app.get('client');
    const clientFetch = promisify(client.get).bind(client); // now getAsync is a promisified version of client.get:
    //  console.log(client);
    var temp_vars = [];
    var record = [];
    var redisKeys = [];
    let postPageJson = ''
    
    var tag_name =  req.params['tag_name'];    //request parameter used in routes.js
    var pgNo = (req.params['pg'] !== undefined) ? req.params['pg']  : 1;
    
    var pgUrl =  constant['SITE_URL']+'tag/'+tag_name+'/page/';    //request parameter used in routes.js

    var pgNoPerPage = 3;
    serverPrefix = '';
    /*==================== End of Declaration of all variables ====================*/
    
    /*
    *==================================================================
    * Create Promise here
    *=================================================================
    */
    Promise.all([
        clientFetch(serverPrefix + "fp_top_stories_article_data").then((result)=> {
            temp_vars['mostReadArtcles'] = JSON.parse(result); 
        }),
        
        new Promise((resolve, rej) => {
            common.getTagPageResults(tag_name,0,20,1).then((data) => {
                temp_vars['tagData'] = data;
                resolve();
            });
        }),
        
        /*
        *==================================================================
        * Use Below Promise for Ads only
        *=================================================================
        */
        new Promise((resolveads, rej) => {
            if(constant.hideJSforEU == 'no')
            {
                const adsArr = [];
                var keyArr = ['fpros','fptaglist'];
                temp_vars['ads'] = common.getAds(keyArr,'amp','ads_arr_amp');
                
                if(typeof temp_vars['ads'] === 'undefined'){
                    delete temp_vars['ads'];
                }
            }
            resolveads();
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
                outbrainAdsKeyArr['pageUrl'] = (pgNo == 1) ? constant.SITE_URL.replace(constant.SITE_URL , constant.MAIN_SITE_URL)+'tag/'+tag_name : constant.SITE_URL.replace(constant.SITE_URL , constant.MAIN_SITE_URL)+'tag/'+tag_name+'/page/'+pgNo;
                outbrainAdsKeyArr['adsSlot'] = ['AMP_2'];
                temp_vars['outbrain_ads'] = common.getOutbrainAds(outbrainAdsKeyArr);
            }
            resOutbrain();
        })
    ]).then(() => {
        if(typeof temp_vars['tagData'] === 'undefined'){
            const error_controller = appRequire('error_controller');
            return error_controller.error(req,res);
        }
        else{
        /*
        *==================================================================
        * Get Pagination Data 
        *=================================================================
        */
        //temp_vars['pagination'] =  common.getPagination(temp_vars['tagData']['solarCount'],pgNo,pgUrl,pgNoPerPage,limit);
        //console.log("tag",temp_vars['pagination']);
        
        menuArr = common.getAllMenuLinks(constant.fp_menu);
        var fullUrl = constant.SITE_URL+'tag/'+tag_name;
        for (const [menuArr_key, menuArr_val] of Object.entries(menuArr[3])) {
            
            if (fullUrl == menuArr_val) {
                splmenuArr_key = menuArr_key.split("=##=");
                splcat = splmenuArr_key[0].split("~");
                if(typeof splcat !== 'undefined')
                {
                    temp_vars['active_level2_nav_slug'] = splcat[1];
                }
                if(typeof splmenuArr_key[0] !== 'undefined')
                {
                    temp_vars['level3_nav_slug'] = splmenuArr_key[0];
                    temp_vars['active_level3_nav_slug'] = splmenuArr_key[1];
                }
            }
        }

        /*
        *==================================================================
        * Schema code start
        *=================================================================
        */
        var schema_type_arr = [];
        var schema_meta = [];
        var breadcrumbsArr = [];

        /*
        *==================================================================
        * Breadcrumb schema  
        *=================================================================
        */
        
        breadcrumbsArr[constant.SITE_URL] = "Latest News";
        breadcrumbsArr[constant.SITE_URL+'tag/'+tag_name] = common.capitalizeFLetter(tag_name);

        /* Breadcrumb schema end */

        /*
        *==================================================================
        * Get SEO data
        *=================================================================
        */
        //var pageSeo = (pgNo == 1) || (pgNo == 0) ? '' : "- Page -"+ pgNo;
        var seoData = {};
        seoData['canonicalUrl'] = constant.SITE_URL.replace(constant.SITE_URL , constant.MAIN_SITE_URL)+'tag/'+tag_name;
        seoData['pageUrl']   = (pgNo == 1) ? constant.SITE_URL.replace(constant.SITE_URL , constant.MAIN_SITE_URL)+'tag/'+tag_name+'/amp' : constant.SITE_URL.replace(constant.SITE_URL , constant.MAIN_SITE_URL)+'tag/'+tag_name+'/page/'+pgNo+'/amp';
        seoData['page_name'] = temp_vars['pageName'];
        seoData['page_type'] = "main";
        seoData['page_language'] = "en";
        seoData['metaTitle'] = common.capitalizeFLetter(tag_name)+" | Latest News on "+common.capitalizeFLetter(tag_name)+" | Breaking Stories and Opinion Articles - Firstpost";
        seoData['metaDesc']  ="Latest News on "+common.capitalizeFLetter(tag_name)+". Read breaking stories and opinion articles on "+tag_name+" at Firstpost";
        
        //temp_vars['metaData'] = common.getMetaHtml(seoData);

        var schema_meta = [];

        schema_meta['metaTitle'] = common.capitalizeFLetter(tag_name)+" | Latest News on "+common.capitalizeFLetter(tag_name)+" | Breaking Stories and Opinion Articles - Firstpost";
        schema_meta['metaDesc']  = "Latest News on "+common.capitalizeFLetter(tag_name)+". Read breaking stories and opinion articles on "+tag_name+" at Firstpost";
        schema_meta['contentUrl'] = (pgNo == 1) ? constant.SITE_URL.replace(constant.SITE_URL , constant.MAIN_SITE_URL)+'tag/'+tag_name : constant.SITE_URL.replace(constant.SITE_URL , constant.MAIN_SITE_URL)+'tag/'+tag_name+'/page/'+pgNo;

        schema_meta['schema_type'] = ["organisation","website","webpage"];
        schema_meta['flag'] = 0;
        temp_vars['schema_meta'] = schema_meta;
        
        /*
        *==================================================================
        * Assign Template Varibles Here
        *=================================================================
        */
        temp_vars['postPageJson'] = postPageJson
        temp_vars['constant'] = constant;
        temp_vars['common'] = common;
        temp_vars['dateFormat'] = dateFormat;
        temp_vars['seoData'] = seoData;
        temp_vars['viewpath'] = constant.viewpath;
        temp_vars['device'] = constant.device;
        temp_vars['footer'] = constant.footer;
        temp_vars['tag_name'] = tag_name;
        temp_vars['pgNo'] = pgNo;
        temp_vars['pgUrl'] = pgUrl;
        temp_vars['pageName'] = 'ampTag';
        temp_vars['breadcrumbsArr'] = breadcrumbsArr;
        temp_vars['mobilePageCss'] = constant.SITE_URL+'static/css/m-category-fp.css';
        temp_vars['desktopPageCss'] = constant.SITE_URL+'static/css/category-fp.css';
        //console.log("ccccc",temp_vars['schema_meta']);
        /*==================== End of Assignment of Template Variables ====================*/
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
        res.render('mobile/firstpost/amp/ampTag', templateVars); 
        /*==================== End of rendering a view ==============================*/
    }
    })
    
}

