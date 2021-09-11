/*
*==================================================================
* Project: Firstpost English
* Controller: FirstCricket Home Amp
* Created By: Nitin Mankani
* Note: Please read comments before doing any task. 
        Commented code is only reference.
*=================================================================
*/

const{promisify} = require("util");
const common = appRequire('common_functions');
const constant = appRequire('constant');
var dateFormat = require('dateformat');
var async = require('async');

exports.ampHome = function(req,res,next){
    /*
    *==================================================================
    * Declare All the Varibles Here only
    *=================================================================
    */
    var client = req.app.get('client');
    const clientFetch = promisify(client.get).bind(client); //now getAsync is a promisified version of client.get:
    //console.log(client);
    var temp_vars = [];
    var homePageJson = [];
    var serverPrefix = "";
   	var date = new Date();
   	var timestamp = '';
    var tag_name = 'cricket';
    var pgNo = (req.params['pg'] !== undefined) ? req.params['pg']  : 1;    
    var pgUrl =  constant['SITE_URL']+'firstcricket/sports-news/page/';    //request parameter used in routes.js
    var limit = 5;
    var start = (isNaN(pgNo)) ? '' : ((pgNo == 1) || (pgNo == 0)) ? '0' : limit*(Number(pgNo)-1);
    var pgNoPerPage = 3;
    var cricMatchLists = {};
    let breadcrumbsArr = [];
    let schema_meta = [];
    /*==================== End of Declaration of all variables ====================*/

    /*
    *==================================================================
    * Create Promise here
    *=================================================================
    */

    Promise.all([
        /**** ads integration start here ****/
        new Promise((resolveads, rej) => {
            if(constant.hideJSforEU == 'no')
            {
                const adsArr = [];
                var keyArr = ['fchome'];
                temp_vars['ads'] = common.getAds(keyArr,'amp','ads_arr_cricket');
                if(typeof temp_vars['ads'] === 'undefined'){
                    delete temp_vars['ads'];
                }
            }
            resolveads();
        }),
        /**** ads integration end here ****/
        /*
        *==================================================================
        * Use Below Promise for Outbrain Ads only
        *=================================================================
        */
        new Promise((resOutbrain, rejOutbrain) => {
            if (typeof constant.config_flags.OUTBRAINS_ADS_FLAG !== 'undefined' && constant.config_flags.OUTBRAINS_ADS_FLAG == 1) {
                const outbrainArr = [];
                var outbrainAdsKeyArr = [];
                outbrainAdsKeyArr['pageUrl'] = 'https://firstpost.com/firstcricket/amp';
                outbrainAdsKeyArr['adsSlot'] = ['AMP_2'];
                temp_vars['outbrain_ads'] = common.getOutbrainAds(outbrainAdsKeyArr);
            }
            resOutbrain();
        }),
        /*
        *==================================================================
        * Use Below Promise for getting First Cricket Data
        *=================================================================
        */    
    clientFetch(serverPrefix + "fp_top_stories_article_data").then((result)=> {
            temp_vars['mostReadArtcles'] = JSON.parse(result); 
    }),    
    new Promise((resolve, rej) => {                        
            common.getCategoryResults(start,5,pgNo,"sports-news").then((data) => {
                temp_vars['cricketNews'] = data;
                //console.log(temp_vars['cricketNews'],"NEws");
                resolve();
            });            
    }),
    new Promise((resolve, rej) => {                        
            common.getCategoryResults(start,4,pgNo,"photo-gallery").then((data) => {
                temp_vars['photoGallery'] = data;
                //console.log(temp_vars['photoGallery'],"photos");
                resolve();
            });            
    }),
    new Promise((resolve, rej) => {                
            common.getVideoTagResults(tag_name,start,limit,pgNo).then((data) => {
                temp_vars['videosList'] = data;
            //console.log(temp_vars['videosList']);
                resolve();
            });            
    }),
    new Promise((resolve, reject) => {
            homePageJson = {};
            clientFetch("FP_Node_CategoryPageContents_firstcricket").then((response) => {
                  homePageJson = JSON.parse(response);                  
            }).then(() => {
                let i = 0;
                var redisKeys = [];

                for (const [key, value] of Object.entries(homePageJson['CatMainRanking']['main_ranking'])){ 
                        redisKeys[i] = serverPrefix + "fp_2.0_setPostDetail_" + value['ID']; 
                        i = Number(i) + 1;
                }
                return new Promise((res, rej) => {
                    async.each(redisKeys, function(redisKeysVal, level2_callback) {
                        client.get(redisKeysVal, function(err, post_response) {
                            if (err) {
                                return level2_callback(err);
                            }
                            json_post_response = JSON.parse(post_response);
                            //console.log(json_post_response);
                            homePageJson['CatMainRanking']['main_ranking']['id_'+json_post_response['post']['ID']]['modified_title'] = json_post_response['post']['post_title'];
                            homePageJson['CatMainRanking']['main_ranking']['id_'+json_post_response['post']['ID']]['modified_posturl'] = json_post_response['post']['post_url'];
                            homePageJson['CatMainRanking']['main_ranking']['id_'+json_post_response['post']['ID']]['modified_postImg'] = json_post_response['post']['post_image'];
                            
                            i = Number(i) + 1;
                            return level2_callback();
                        });
                    }, function(err) {
                        if (err) {}
                        temp_vars['homePageJson'] = homePageJson;                             
                        return res();
                    });
                })
            }).then(() => {
                let i = 0;
                var redisKeys = [];
                for (const [key, value] of Object.entries(homePageJson['CatMainRanking']['related_ranking'])){
                        redisKeys[i] = serverPrefix + "fp_2.0_setPostDetail_" + value['ID']; 
                        i = Number(i) + 1;
                }
                return new Promise((res, rej) => {
                    async.each(redisKeys, function(ky, level2_callback) {
                        client.get(ky, function(err, post_response) {
                            if (err) {
                                return level2_callback(err);
                            }
                            json_post_response = JSON.parse(post_response);
                            //console.log(json_post_response); return false;
                            homePageJson['CatMainRanking']['related_ranking']['id_'+json_post_response['post']['ID']]['modified_title'] = json_post_response['post']['post_title'];
                            homePageJson['CatMainRanking']['related_ranking']['id_'+json_post_response['post']['ID']]['modified_posturl'] = json_post_response['post']['post_url'];
                            homePageJson['CatMainRanking']['related_ranking']['id_'+json_post_response['post']['ID']]['modified_postImg'] = json_post_response['post']['post_image'];
                            homePageJson['CatMainRanking']['related_ranking']['id_'+json_post_response['post']['ID']]['modified_postExcerpt'] = json_post_response['post']['post_excerpt'];

                            i = Number(i) + 1;
                            return level2_callback();
                        });
                    }, function(err) {
                        if (err) {}
                        temp_vars['homePageJson'] = homePageJson; 
                        return res();
                    });
                })
            }).then((data) => {
                 //console.log(JSON.stringify( homePageJson, null, "  "));
                return resolve();
            })
                /*clientFetch('fp_2.0_setPostDetail_'+homePageJson['main_story']['ID']).then((response1) => {
                    homePageJson['main_story']['postData'] = JSON.parse(response1);
                    temp_vars['homePageJson'] = homePageJson; 
                    resolve();
                })*/
        }),
    ]).then(()=>{        
        /*
        *==================================================================
        * Get Firstpost Menus
        *=================================================================
        */
        //console.log(temp_vars['photoGallery'],"photos");
        //temp_vars['pagination'] =  common.getPagination(temp_vars['cricketNews']['solarCount'],pgNo,pgUrl,pgNoPerPage,limit);        

        var seoData = [];
        seoData['pageUrl']   = constant.SITE_URL.replace(constant.SITE_URL , constant.MAIN_SITE_URL)+'firstcricket/amp';
        seoData['page_name'] = temp_vars['pageName'];
        seoData['page_type'] = "main";
        seoData['page_language'] = "en";
        seoData['canonicalUrl'] = constant.SITE_URL.replace(constant.SITE_URL , constant.MAIN_SITE_URL)+'firstcricket/';
                
        seoData['metaTitle'] = "Live Cricket Scores, Firstcricket Commentary, Match Schedule, Highlights, News | Firstcricket, Firstpost.";
        seoData['metaDesc']  = "Latest cricket news, live cricket scores and updates, match series with cricket match schedule, photos, videos and more on Firstcricket of Firstpost.";
        //temp_vars['metaData'] = common.getMetaHtml(seoData);
        temp_vars['seoData'] = seoData;

        schema_meta['metaTitle'] = seoData['metaTitle'];
        schema_meta['metaDesc']  = seoData['metaDesc'];
        schema_meta['contentUrl'] = seoData['pageUrl'];
        schema_meta['metaAuthor'] = "";
        schema_meta['metaAuthorSlug'] = "";
        schema_meta['post_content'] = "";
        schema_meta['catSlug'] = "";
        schema_meta['post_published'] = "";
        schema_meta['post_published'] = "";
        schema_meta['post_modified'] = "";
        schema_meta['post_image'] = "";
        schema_meta['tags'] = seoData['metaKeyword']    ;
        schema_meta['schema_type'] = ["webpage"];

        schema_meta['flag'] = 0;
        temp_vars['schema_meta'] = schema_meta;
        /*
        *==================================================================
        * Assign Template Varibles Here
        *=================================================================
        */
        var listitem_2 = constant.SITE_URL+'firstcricket/';
        breadcrumbsArr[constant.SITE_URL] = "Home";
        //breadcrumbsArr[listitem_2] = common.capitalizeFLetter(category_name); //Donot delete , this is for reference
        breadcrumbsArr['active'] = common.capitalizeFLetter("Cricket");
        
        temp_vars['breadcrumbsArr'] = breadcrumbsArr;
        temp_vars['liveMatchList'] = cricketData['liveMatchData'];
        temp_vars['resultMatchList'] = cricketData['resultMatchData'];
        temp_vars['upcomingMatchList'] = cricketData['upcomingMatchData'];
        temp_vars['constant'] = constant;
        temp_vars['viewpath'] = constant.viewpath;
        temp_vars['device'] = 'mobile';
        temp_vars['footer'] = constant.footer;
        temp_vars['common'] = common;
        temp_vars['pageName'] = 'firstcricket-home-amp';
        //temp_vars['mobilePageCss'] = constant.SITE_URL+'static/css/m-home-fc.css';
        //temp_vars['desktopPageCss'] = constant.SITE_URL+'static/css/home-fc.css';
        //temp_vars['otherFirstPaintCss'] = 'firstpaint-fc';
        temp_vars['desktopCricJs'] = constant.SITE_URL+'static/js/main-fc.js';
        temp_vars['mobileCricJs'] = constant.SITE_URL+'static/js/main-fc.js';
        temp_vars['dateFormat'] = dateFormat;
        temp_vars['showRhsScore'] = 'yes';
        temp_vars['showRhsResults'] = 'yes';
        temp_vars['l2navbar'] = 'yes';
        temp_vars['pgNo'] = pgNo;
        temp_vars['pgUrl'] = pgUrl;
        temp_vars['start'] = start;
        temp_vars['seoData'] = seoData;
        temp_vars['template'] = "home";
        temp_vars['active_level2_nav_slug'] = "sports";
temp_vars['level3_nav_slug'] = "section~sports";
        temp_vars['active_level3_nav_slug'] = "cricket";
        temp_vars['level4_nav_slug'] = "section~sports~cricket";
        temp_vars['active_level4_nav_slug'] = "home";
        
        /*
        *==================================================================
        * assignTempVars() creates variables for template
        * Please do not remove this function untill it's not in use
        *=================================================================
        */
        
        //console.log(JSON.stringify(temp_vars['homePageJson'], null, "  "));
        templateVars = {};
        templateVars = common.assignTempVars(temp_vars);
        /*==================== End of assignTempVars() ==============================*/

        /*
        *==================================================================
        * Render View Here only
        *=================================================================
        */
        res.render('mobile/firstcricket/ampHome', templateVars); 
        /*==================== End of rendering a view ==============================*/
    })
    
}