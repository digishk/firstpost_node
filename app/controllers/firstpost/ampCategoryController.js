
/*
*==================================================================
* Project: Firstpost English
* Controller: Category
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
exports.ampCategory = function(req, res, next) {
    //console.log("insideeee  cat func",req['originalUrl']);
    /*
    *==================================================================
    * Declare All the Varibles Here only
    *=================================================================
    */
    var client = req.app.get('client');
    const clientFetch = promisify(client.get).bind(client); // now getAsync is a promisified version of client.get:
    //  console.log(client);
    var temp_vars = [];
    var categoryData = [];
    var homePageJson = [];
    var redisKeys = [];
    var getCurrentURL = req['originalUrl'];
    
    var category_name =  req.params['category_name'];    //request parameter used in routes.js
    
    var pgNo = (req.params['pg'] !== undefined) ? req.params['pg']  : 1;
    
    var pgUrl =  constant['SITE_URL']+'category/'+category_name+'/page/';    //request parameter used in routes.js
    //console.log("pgUrl",pgUrl);
    var limit = 20;
    var start = (isNaN(pgNo)) ? '' : ((pgNo == 1) || (pgNo == 0)) ? '0' : limit*(Number(pgNo)-1);

    //var pgNoPerPage = 3;
    let template_name = '';
    switch(category_name){
        case "photos":
            template_name = "ampPhotoCategory";
        break;
        case "videos":    
            template_name = "ampVideoCategory";
        break;
        case "entertainment":    
            template_name = "ampEntertainmentCategory";
        break;
        default:
            template_name = "ampCategory";
            //mobileCss = "m-category-fp";
        break;   
    }

    //var serverPrefix = "Revamp_";
    //console.log("category_name is",category_name);
    /*==================== End of Declaration of all variables ====================*/
    
    /*
    *==================================================================
    * Create Promise here
    *=================================================================
    */
    clientFetch(serverPrefix + "FP_Node_CategoryPageContents_"+category_name).then((response) => {
        categoryData = JSON.parse(response); 
    }).then(() => {
    Promise.all([
       new Promise((resolve, reject) => { 

            if(category_name == "videos" || category_name == "sports"){
                return client.get("CategorySectionVideos", function(err, categoryVideosJson) {
               // clientFetch("CategorySectionVideos").then((categoryVideosJson)=> {
                    temp_vars['categoryVideosJson'] = JSON.parse(categoryVideosJson); 
                    //console.log("qqqq",temp_vars['categoryVideosJson']); 
                    return resolve();
                })
            }
            else
            {
                return resolve();
            }

        }),
        clientFetch(serverPrefix + "fp_top_stories_article_data").then((result)=> {
            temp_vars['mostReadArtcles'] = JSON.parse(result); 
        }),
        new Promise((resolve, reject) => { 
            if(category_name == "sports"){
                return client.get(serverPrefix + "HP_FooterTagListings_"+category_name, function(err, result) {
        // clientFetch(serverPrefix + "HP_FooterTagListings_"+category_name).then((result)=> {
            
                temp_vars['footerTags'] = JSON.parse(result);  
                return resolve();
                })
            }
            else
            {
                return resolve();
            }

        }),
        new Promise((resolve, reject) => { 
            if(category_name == "entertainment"){
                return client.get(serverPrefix + "FP2.0_showshaHP_Rankings_New", function(err, result) {
        // clientFetch(serverPrefix + "Revamp_FP2.0_showshaHP_Rankings_New").then((result)=> {
            // if(category_name == "entertainment"){
                temp_vars['entertainment'] = JSON.parse(result); 
                //console.log("entertainment",temp_vars['entertainment']); 
                return resolve();
                })
            }
            else
            {
                return resolve();
            }
        }),        
        new Promise((resolve, reject) => {
            
            let i = 0;
            if(categoryData !== null && categoryData['CatMainRanking'] !== null && categoryData['CatMainRanking']['main_ranking'] !== null){
                for (const [key, value] of Object.entries(categoryData['CatMainRanking']['main_ranking'])){ 
                    redisKeys[i] = serverPrefix + "fp_2.0_setPostDetail_" + value['ID']; 
                    i = Number(i) + 1;
                }
            }
            async.each(redisKeys, function(ky, level2_callback) {
                client.get(ky, function(err, post_response) {
                    if (err) {
                        return level2_callback(err);
                    }
                    json_post_response = JSON.parse(post_response);
                    if(json_post_response !== null && json_post_response['post'] !== null){
                        categoryData['CatMainRanking']['main_ranking']['id_'+json_post_response['post']['ID']]['modified_title'] = json_post_response['post']['post_title'];
                        categoryData['CatMainRanking']['main_ranking']['id_'+json_post_response['post']['ID']]['modified_posturl'] = json_post_response['post']['post_url'];
                    }    
                    // return level2_callback(err,post_response);
                    //console.log(JSON.stringify(categoryData, null, "  "));
                    return level2_callback();
                });
            }, function(err) {
                if (err) {}
                temp_vars['categoryData'] = categoryData; 
                return resolve();
            });
            
        }),
        new Promise((resolve,reject) => {
            let i = 0;
            if(categoryData !== null && categoryData['CatMainRanking'] !== null && categoryData['CatMainRanking']['related_ranking'] !== null){
                for (const [key, value] of Object.entries(categoryData['CatMainRanking']['related_ranking'])){ 
                    redisKeys[i] = serverPrefix + "fp_2.0_setPostDetail_" + value['ID']; 
                    i = Number(i) + 1;
                }
            }
            async.each(redisKeys, function(ky, level2_callback) {
                client.get(ky, function(err, post_response) {
                    if (err) {
                        return level2_callback(err);
                    }
                    json_post_response = JSON.parse(post_response);
                    categoryData['CatMainRanking']['related_ranking']['id_'+json_post_response['post']['ID']]['modified_title'] = json_post_response['post']['post_title'];
                    categoryData['CatMainRanking']['related_ranking']['id_'+json_post_response['post']['ID']]['modified_posturl'] = json_post_response['post']['post_url'];
                    //console.log(JSON.stringify(categoryData, null, "  "));
                    // return level2_callback(err,post_response);
                    return level2_callback();
                });
            }, function(err) {
                if (err) {}
                temp_vars['categoryData'] = categoryData; 
                return resolve();
            });
                                
        }),
        /*
        *==================================================================
        * Use This Promise for Level2 Menu only
        *=================================================================
        */
        new Promise((resolve, rej) => {
            common.getCategoryResults(start,limit,pgNo,category_name).then((data) => {
                temp_vars['catData'] = data;
                resolve();
            });
        }),

        /* replace  india tag with photo tag*/
        new Promise((resolve, rej) => {
            if(category_name == "sports"){
            return common.getMultipleTagPageResults("sports","india",'',0,4,1).then((data) => {
                /*if(data !== undefined) {
                    temp_vars['sportsPhotos'] = data;
                }else{
                   temp_vars['sportsPhotos'] = ''; 
                }*/
                temp_vars['sportsPhotos'] = data;
                //console.log("data is",temp_vars['sportsPhotos']);
                resolve();
            });
            }
            else
            {
                return resolve();
            }
        }),

        /* Photo category page data start*/
        new Promise((resolve, rej) => {
            if(category_name == "photos"){
                common.getMoreAlbums(0,4,1).then((data) => {
                    temp_vars['moreAlbums'] = data;
                    resolve();
                });
            }
            else
            {
                return resolve();
            }
        }),
        /* Photo category page data end*/

        /* Entertainment category page photo and video data start*/
        new Promise((resolve, rej) => {
            if(category_name == "entertainment"){
                common.getTagPageResults("photooftheday",0,5,1).then((data) => {
                    temp_vars['photoDataArr'] = data;
                    resolve();
                });
            }
            else
            {
                return resolve();
            }
        }),

        new Promise((resolve, rej) => {
            if(category_name == "entertainment"){
                common.getVideoTagResults("videosoftheday",0,5,1).then((data) => {
                    temp_vars['videoDataArr'] = data;
                    resolve();
                });
            }
            else
            {
                return resolve();
            }
        }),

        new Promise((resolve, rej) => {
            if(category_name == "entertainment"){
                common.getTagPageResults("fineprint",0,4,1).then((data) => {
                    temp_vars['fineprint'] = data;
                    resolve();
                });
            }
            else
            {
                return resolve();
            }
        }),

        /* Entertainment category page photo and video data end*/

        /*async function a() {
            common.getMoreAlbums(0,4,1).then((data) => {
                return data;
            });
        }*/
        
        /*
        *==================================================================
        * Use Below Promise for Ads only
        *=================================================================
        */
        new Promise((resolveads, rej) => {
            if(constant.hideJSforEU == 'no')
            {
                const adsArr = [];
                var keyArr = ['fpros','fpcat'+category_name];
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
                outbrainAdsKeyArr['pageUrl'] = (pgNo == 1) ? constant.SITE_URL.replace(constant.SITE_URL , constant.MAIN_SITE_URL)+'category/'+category_name : constant.SITE_URL.replace(constant.SITE_URL , constant.MAIN_SITE_URL)+'category/'+category_name+'/page/'+pgNo;
                
                outbrainAdsKeyArr['adsSlot'] = ['AMP_2'];
                temp_vars['outbrain_ads'] = common.getOutbrainAds(outbrainAdsKeyArr);
            }
            resOutbrain();
        })
    ]).then(() => {
        if(typeof categoryData === 'undefined' || typeof temp_vars['catData'] === 'undefined'){
            const error_controller = appRequire('error_controller');
            return error_controller.error(req,res);
        }
        else{
        /*
        *==================================================================
        * Get Pagination Data 
        *=================================================================
        */
        //temp_vars['pagination'] =  common.getPagination(temp_vars['catData']['solarCount'],pgNo,pgUrl,pgNoPerPage,limit);
        

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
        var listitem_2 = constant.SITE_URL+'category/'+category_name;
        breadcrumbsArr[constant.SITE_URL] = "Latest News";
        //breadcrumbsArr[listitem_2] = common.capitalizeFLetter(category_name); //Donot delete , this is for reference
        breadcrumbsArr[listitem_2] = common.capitalizeFLetter(category_name.replace(/-/g, ' '))+ ' News';

        //temp_vars['breadcrumb'] = common.getSchema(breadcrumbsArr,["breadcrumbs"],0);

        /* Breadcrumb schema end */

        //var pageSeo = (pgNo == 1) || (pgNo == 0) ? '' : "- Page -"+ pgNo;

        var schema_meta = [];

        for (const [menuKey, menuitems] of Object.entries(constant.fp_menu[2]['section'])) {
            //console.log(menuitems);
            if(menuitems['menu_slug'] == category_name){
                schema_meta['metaTitle'] = menuitems['meta_title'];
                schema_meta['metaDesc'] = menuitems['meta_description'];
            }
        } 
        //schema_meta['metaTitle'] = temp_vars['menus']['mainMenu'][category_name]['title'];
        //schema_meta['metaDesc']  = temp_vars['menus']['mainMenu'][category_name]['body'];
        schema_meta['contentUrl'] = (pgNo == 1) ? constant.SITE_URL.replace(constant.SITE_URL , constant.MAIN_SITE_URL)+'category/'+category_name : constant.SITE_URL.replace(constant.SITE_URL , constant.MAIN_SITE_URL)+'category/'+category_name+'/page/'+pgNo;

        schema_meta['schema_type'] = ["organisation","website","webpage"];
        schema_meta['flag'] = 0;
        temp_vars['schema_meta'] = schema_meta;

        /*
        *==================================================================
        * Get SEO data
        *=================================================================
        */
        
        var seoData = {};
        seoData['canonicalUrl'] = constant.SITE_URL.replace(constant.SITE_URL , constant.MAIN_SITE_URL)+'category/'+category_name;
        seoData['pageUrl']   = (pgNo == 1) ? constant.SITE_URL.replace(constant.SITE_URL , constant.MAIN_SITE_URL)+'category/'+category_name+'/amp' : constant.SITE_URL.replace(constant.SITE_URL , constant.MAIN_SITE_URL)+'category/'+category_name+'/page/'+pgNo+'/amp';
        seoData['page_name'] = temp_vars['pageName'];
        seoData['page_type'] = "main";
        seoData['page_language'] = "en";
        seoData['metaTitle'] = (typeof schema_meta['metaTitle'] !== 'undefined') ? schema_meta['metaTitle'] : "";
        seoData['metaDesc'] = (typeof schema_meta['metaDesc'] !== 'undefined') ? schema_meta['metaDesc'] : "";
        //temp_vars['metaData'] = common.getMetaHtml(seoData);

         /*
        *==================================================================
        * Get Level 3 slug
        *=================================================================
        */
        temp_vars['level3_nav_slug'] = "section~"+category_name;
        
        /*
        *==================================================================
        * Assign Template Varibles Here
        *=================================================================
        */
        temp_vars['constant'] = constant;
        temp_vars['common'] = common;
        temp_vars['dateFormat'] = dateFormat;
        temp_vars['viewpath'] = constant.viewpath;
        temp_vars['device'] = 'mobile';
        temp_vars['footer'] = constant.footer;
        temp_vars['category_name'] = category_name;
        temp_vars['pgNo'] = pgNo;
        temp_vars['pgUrl'] = pgUrl;
        temp_vars['getCurrentURL'] = getCurrentURL;
        temp_vars['start'] = start;
        temp_vars['seoData'] = seoData;
        temp_vars['pageName'] = 'category';
        temp_vars['breadcrumbsArr'] = breadcrumbsArr;
        //temp_vars['mobilePageCss'] = constant.SITE_URL+'static/css/'+mobileCss+'.css';
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
        res.render('mobile/firstpost/amp/'+template_name, templateVars); 
        /*==================== End of rendering a view ==============================*/
    }
    })
    })
    
}
