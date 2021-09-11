/*
*==================================================================
* Project: Firstpost English
* Controller: Movie Review
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
exports.movieReview = function(req, res, next) {
    var deviceDetails = common.isMobileVar(req);
    const device  = deviceDetails.device;
    const isMobile  = deviceDetails.isMobile;
	//console.log("insideeee  movie review");
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

    Promise.all([
       clientFetch("FP_TopStories").then((topStories)=> {
            temp_vars['topStories'] = JSON.parse(topStories); 
        }),
        clientFetch(serverPrefix + "fp_top_stories_article_data").then((result)=> {
            temp_vars['mostReadArtcles'] = JSON.parse(result); 
        }),        
        clientFetch(serverPrefix + "FP2.0_showshaHP_Rankings_2017reviews").then((result)=> {
            movieReview = JSON.parse(result);     
            temp_vars['movieReview'] = movieReview;   
            //console.log(JSON.stringify(movieReview, null, "  "));
        }), 

        
        /*
        *==================================================================
        * Use This Promise for Level2 Menu only
        *=================================================================
        */
        new Promise((resolve, rej) => {
            common.getCmsHeader(req).then((data) => {
                temp_vars['cmsHeader'] = JSON.parse(data);
                resolve();
            });
        }),
        
        /*
        *==================================================================
        * Use Below Promise for Ads only
        *=================================================================
        */
    ]).then(() => {
        temp_vars['liveMatchList'] = cricketData['liveMatchData'];

        /*
        *==================================================================
        * Schema code start
        *=================================================================
        */
        //var schema_type_arr = [];
        
        var breadcrumbsArr = [];

        /*
        *==================================================================
        * Breadcrumb schema  
        *=================================================================
        */
        var listitem_2 = constant.SITE_URL+'category/entertainment';
        breadcrumbsArr[constant.SITE_URL] = "Latest News";
        breadcrumbsArr[listitem_2] = "Entertainment"; //Donot delete , this is for reference
        breadcrumbsArr['active'] = common.capitalizeFLetter("Movie Reviews");

        //temp_vars['breadcrumb'] = common.getSchema(breadcrumbsArr,["breadcrumbs"],0);

        /* Breadcrumb schema end */

        var schema_meta = [];

        for (const [menuKey, menuitems] of Object.entries(constant.fp_menu[3]['section~entertainment'])) {
            //console.log(menuitems);
            if(menuitems['menu_slug'] == 'movie-reviews'){
                schema_meta['metaTitle'] = menuitems['meta_title'];
                schema_meta['metaDesc'] = menuitems['meta_description'];
            }
        } 

        //schema_meta['metaTitle'] = temp_vars['menus']['mainMenu']['movie-reviews']['title'];
        //schema_meta['metaDesc']  = temp_vars['menus']['mainMenu']['movie-reviews']['body'];
        schema_meta['contentUrl'] =  constant['SITE_URL']+'entertainment/movie-reviews' ;

        schema_meta['schema_type'] = ["webpage"];
        schema_meta['flag'] = 0;
        temp_vars['schema_meta'] = schema_meta;

        /*
        *==================================================================
        * Get SEO data
        *=================================================================
        */
        
        var seoData = {};
        seoData['pageUrl']   = constant['SITE_URL']+'entertainment/movie-reviews';
        seoData['page_name'] = temp_vars['pageName'];
        seoData['page_type'] = "main";
        seoData['page_language'] = "en";
        seoData['metaTitle'] = schema_meta['metaTitle'];
        seoData['metaDesc']  = schema_meta['metaDesc'];
        //temp_vars['metaData'] = common.getMetaHtml(seoData);

         /*
        *==================================================================
        * Get Level 3 slug
        *=================================================================
        */
        temp_vars['level3_nav_slug'] = "section~entertainment";
        
        /*
        *==================================================================
        * Assign Template Varibles Here
        *=================================================================
        */
        temp_vars['constant'] = constant;
        temp_vars['common'] = common;
        temp_vars['dateFormat'] = dateFormat;
        temp_vars['viewpath'] = constant.viewpath;
        temp_vars['device'] = device;
temp_vars['isMobile'] = isMobile;
        temp_vars['footer'] = constant.footer;
        //temp_vars['pgUrl'] = pgUrl;
        temp_vars['seoData'] = seoData;
        temp_vars['pageName'] = 'movieReview';
        temp_vars['breadcrumbsArr'] = breadcrumbsArr;
        temp_vars['mobilePageCss'] = constant.SITE_URL+'static/css/m-entMovieReview-fp.css';
        temp_vars['desktopPageCss'] = constant.SITE_URL+'static/css/entMovieReview-fp.css';
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
        res.render(device + '/firstpost/entMovieReview', templateVars); 
        /*==================== End of rendering a view ==============================*/
    })
}