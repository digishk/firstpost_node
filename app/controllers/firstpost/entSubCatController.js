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
exports.subCat = function(req, res, next) {
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

    var sub_category_name =  req.params['sub_category_name'];    //request parameter used in routes.js
    let template_name = '';
    switch(sub_category_name){
        case "movie-reviews":    
            template_name = "entMovieReview";
            desktopCss = "entMovieReview-fp";
            mobileCss = "m-entMovieReview-fp";
            var pgNo = (req.params['pg'] !== undefined) ? req.params['pg']  : 1;
            var limit = 20;
            var start = (isNaN(pgNo)) ? '' : ((pgNo == 1) || (pgNo == 0)) ? '0' : limit*(Number(pgNo)-1);
        break;
        default:
            var pgNo = (req.params['pg'] !== undefined) ? req.params['pg']  : 1;
            var pgUrl =  constant['SITE_URL']+'entertainment/'+sub_category_name+'/page/';    //request parameter used in routes.js
            var limit = 20;
            var start = (isNaN(pgNo)) ? '' : ((pgNo == 1) || (pgNo == 0)) ? '0' : limit*(Number(pgNo)-1);
            var pgNoPerPage = 3;
            template_name = "entSubCat";
            desktopCss = "category-fp";
            mobileCss = "m-category-fp";
        break;   
    }

    Promise.all([
        clientFetch(serverPrefix + "fp_top_stories_article_data").then((result)=> {
            temp_vars['mostReadArtcles'] = JSON.parse(result); 
        }),
        clientFetch(serverPrefix + "FP2.0_showshaHP_Rankings_2017reviews").then((result)=> {
            if(sub_category_name == "movie-reviews"){
                movieReview = JSON.parse(result);     
                temp_vars['movieReview'] = movieReview;   
                //console.log(JSON.stringify(movieReview, null, "  "));
            }
        }), 

        clientFetch(serverPrefix + "FP2.0_showshaCategory_Rankings").then((result)=> {
            if(sub_category_name != "movie-reviews"){
                subCat = JSON.parse(result);     
                temp_vars['subCat'] = subCat; 
                //console.log(JSON.stringify(subCat, null, "  "));
            }
        }), 



        /*
        *==================================================================
        * Use This Promise for Level2 Menu only
        *=================================================================
        */
        
        new Promise((resolve, rej) => {
            var catVal = '';
            (sub_category_name == "bollywood") ? catVal = common.getCategoryResults(start,limit,pgNo,sub_category_name) : catVal = common.getTagPageResults(sub_category_name,start,limit,pgNo);

            catVal.then((data) => {
                    temp_vars['subCatData'] = data;
                    //console.log(temp_vars['subCatData']);
                    resolve();
                });
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
                if(sub_category_name == "movie-reviews"){
                    var keyArr = ['fpcatmovie-reviews'];
                }else{
                    var keyArr = ['fpros','fpcatentertainment'];
                }    
                
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
                outbrainAdsKeyArr['pageUrl'] = constant.SITE_URL.replace(constant.SITE_URL , constant.MAIN_SITE_URL)+'entertainment/'+sub_category_name;
                if(isMobile == 1){
                   outbrainAdsKeyArr['adsSlot'] = ['MB_2'];
                }else{
                   outbrainAdsKeyArr['adsSlot'] = ['AR_2' , 'SB_4'];
                }
                
                temp_vars['outbrain_ads'] = common.getOutbrainAds(outbrainAdsKeyArr);
            }
            resOutbrain();
        })
    ]).then(() => {
        
        temp_vars['liveMatchList'] = cricketData['liveMatchData'];

        if((typeof sub_category_name === 'undefined' || typeof temp_vars['subCatData'] === 'undefined' || typeof temp_vars['subCat'] === 'undefined' || typeof temp_vars['subCat']['showsha'][sub_category_name] === 'undefined') && (sub_category_name != "movie-reviews")){
            const error_controller = appRequire('error_controller');
            return error_controller.error(req,res);
        }
        else{
	
	if(sub_category_name != "movie-reviews" && temp_vars['subCatData'] !== null && temp_vars['subCatData']['solarCount'] !== null && typeof temp_vars['subCatData']['solarCount'] !== 'undefined'){
            temp_vars['pagination'] =  common.getPagination(temp_vars['subCatData']['solarCount'],pgNo,pgUrl,pgNoPerPage,limit);
        }

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
        var listitem_3 = constant.SITE_URL+'entertainment/'+sub_category_name;
        var subCatReplace = (sub_category_name.replace(/-/g, ' '));
        breadcrumbsArr[constant.SITE_URL] = "Latest News";
        breadcrumbsArr[listitem_2] = "Entertainment News"; //Donot delete , this is for reference
        breadcrumbsArr[listitem_3] = common.capitalizeFLetter(subCatReplace);

        //temp_vars['breadcrumb'] = common.getSchema(breadcrumbsArr,["breadcrumbs"],0);

        /* Breadcrumb schema end */

        var pageSeo = (pgNo == 1) || (pgNo == 0) || (pgNo == undefined) ? '' : "- Page -"+ pgNo;

        var schema_meta = [];

        for (const [menuKey, menuitems] of Object.entries(constant.fp_menu[3]['section~entertainment'])) {
            //console.log(menuitems);
            if(menuitems['menu_slug'] == sub_category_name){
                schema_meta['metaTitle'] = menuitems['meta_title'].replace(/\\'/g,"'");
                schema_meta['metaDesc'] = menuitems['meta_description'].replace(/\\'/g,"'");
            }
        }   

        //schema_meta['metaTitle'] = temp_vars['menus']['mainMenu'][sub_category_name]['title']+ pageSeo;
        //schema_meta['metaDesc']  = temp_vars['menus']['mainMenu'][sub_category_name]['body']+ pageSeo;
        schema_meta['contentUrl'] =  constant['SITE_URL']+'entertainment/'+sub_category_name;

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
        seoData['metaTitle'] = schema_meta['metaTitle']+ pageSeo;
        seoData['metaDesc']  = schema_meta['metaDesc']+ pageSeo;
        //temp_vars['metaData'] = common.getMetaHtml(seoData);

         /*
        *==================================================================
        * Get Level 3 slug
        *=================================================================
        */
        temp_vars['level3_nav_slug'] = "section~entertainment";
        temp_vars['active_level2_nav_slug'] = "entertainment";
        temp_vars['active_level3_nav_slug'] = sub_category_name;
        
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
        temp_vars['sub_category_name'] = sub_category_name;
        temp_vars['pgNo'] = pgNo;
        temp_vars['pgUrl'] = pgUrl;
        temp_vars['start'] = start;
        //temp_vars['pgUrl'] = pgUrl;
        temp_vars['seoData'] = seoData;
        temp_vars['pageName'] = 'entertainmentSubCat';
        temp_vars['breadcrumbsArr'] = breadcrumbsArr;
        temp_vars['mobilePageCss'] = constant.SITE_URL+'static/css/'+mobileCss+'.css';
        temp_vars['desktopPageCss'] = constant.SITE_URL+'static/css/'+desktopCss+'.css';
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
        res.render(device + '/firstpost/'+template_name, templateVars); 
        /*==================== End of rendering a view ==============================*/
       } 
    })
}