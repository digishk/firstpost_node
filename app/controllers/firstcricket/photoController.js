/*
*==================================================================
* Project: Firstpost English
* Controller: FirstCricket Photo
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

exports.photo = function(req, res, next) {    
    var deviceDetails = common.isMobileVar(req);
    const device  = deviceDetails.device;
    const isMobile  = deviceDetails.isMobile;
    /*
    *==================================================================
    * Declare All the Varibles Here only
    *=================================================================
    */
    var client = req.app.get('client');
    const clientFetch = promisify(client.get).bind(client); //now getAsync is a promisified version of client.get:
    //console.log(client);
    var temp_vars = [];
    temp_vars['seoData'] = {};
    var seoData = [];
    var homePageJson = [];
    var serverPrefix = "";
    var date = new Date();
    var timestamp = '';
    var tag_name = 'photo-gallery';    
    var cricMatchLists = {};
    let breadcrumbsArr = [];

    var pgNo = (req.params['pg'] !== undefined) ? req.params['pg']  : 1;
    var pgUrl =  constant['SITE_URL']+'firstcricket/'+tag_name+'/page/';    //request parameter used in routes.js
    var limit = 9;
    var start = (isNaN(pgNo)) ? '' : ((pgNo == 1) || (pgNo == 0)) ? '0' : limit*(Number(pgNo)-1);
    var pgNoPerPage = 3;
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
            //console.log(temp_vars['scheduleMatchList'],"photos"),
            new Promise((resolve, rej) => {
                common.getCategoryResults(start,limit,pgNo,tag_name).then((data) => {
                    temp_vars['photoGallery'] = data;
                    temp_vars['solrCnt'] = data['solarCount'];
                    //console.log(temp_vars['photoGallery']);
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
                    var keyArr = ['fcphotos'];

                    temp_vars['ads'] = common.getAds(keyArr,device,'ads_arr_cricket');
                    // console.log(JSON.stringify(temp_vars['ads'],null," "),"temp_vars['ads']");
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
                    outbrainAdsKeyArr['pageUrl'] = (pgNo == 1) ? constant.SITE_URL.replace(constant.SITE_URL , constant.MAIN_SITE_URL)+'firstcricket/photo-gallery/' : constant.SITE_URL.replace(constant.SITE_URL , constant.MAIN_SITE_URL)+'firstcricket/photo-gallery/page/'+pgNo;
                    if(isMobile == 1){
                       outbrainAdsKeyArr['adsSlot'] = ['MB_2'];
                    }else{
                       outbrainAdsKeyArr['adsSlot'] = ['AR_2' , 'SB_4'];
                    }
                    
                    temp_vars['outbrain_ads'] = common.getOutbrainAds(outbrainAdsKeyArr);
                }
                resOutbrain();
            })
        ]).then(()=>{
        
        temp_vars['liveMatchList'] = cricketData['liveMatchData'];
        temp_vars['resultMatchList'] = cricketData['resultMatchData'];
        temp_vars['upcomingMatchList'] = cricketData['upcomingMatchData'];
        
        var seoData = [];
        seoData['pageUrl']   = constant.SITE_URL+'firstcricket/photo-gallery/';
        seoData['canonicalURL']   = constant.SITE_URL+'firstcricket/photo-gallery/';
        seoData['page_name'] = temp_vars['pageName'];
        seoData['page_type'] = "main";
        seoData['page_language'] = "en";
        
        seoData['metaTitle'] = 'View Cricket Photos - Cricket Photo Gallery, Latest Images, India, International - FirstCricket';
        seoData['metaDesc']  = 'Latest Cricket Photos - See all latest cricket photos, best pictures, matches galleries, India and International cricket team images online at FirstCricket.';
        
        //temp_vars['metaData'] = common.getMetaHtml(seoData);
        temp_vars['seoData'] = seoData;
        /*
        *==================================================================
        * Assign Template Varibles Here
        *=================================================================
        */
        //console.log(temp_vars['upcomingMatchList']," ddd live list...."); return false;
        var listitem_2 = constant.SITE_URL+'firstcricket';
        var listitem_3 = constant.SITE_URL+'firstcricket/photo-gallery';
        breadcrumbsArr[constant.SITE_URL] = "Home";
        breadcrumbsArr[listitem_2] = common.capitalizeFLetter("cricket"); //Donot delete , this is for reference
        breadcrumbsArr[listitem_3] = common.capitalizeFLetter("cricket photo gallery");
        temp_vars['breadcrumb'] = common.getSchema(breadcrumbsArr,["breadcrumbs"],0);
        temp_vars['organisation'] = common.getSchema('',["organisation"],0);
        temp_vars['website'] = common.getSchema('',["website"],0);
        temp_vars['breadcrumbsArr'] = breadcrumbsArr;

        /*
        *==================================================================
        * Get Pagination Data 
        *=================================================================
        */
        temp_vars['pagination'] =  common.getPagination(temp_vars['solrCnt'],pgNo,pgUrl,pgNoPerPage,limit);

        var schema_meta = [];
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

        temp_vars['constant'] = constant;
        temp_vars['viewpath'] = constant.viewpath;
        temp_vars['device'] = device;
temp_vars['isMobile'] = isMobile;
        temp_vars['footer'] = constant.footer;
        temp_vars['common'] = common;
        temp_vars['pageName'] = 'firstcricket-photos';
        temp_vars['pgUrl'] = pgUrl;
        temp_vars['otherFirstPaintCss'] = 'firstpaint-fc';
        temp_vars['desktopFCpaintCss'] = constant.SITE_URL+'static/css/firstpaint-fc.css';        
        temp_vars['mobileFCpaintCss'] = constant.SITE_URL+'static/css/m-firstpaint-fc.css';        
        temp_vars['desktopCricJs'] = constant.SITE_URL+'static/js/main-fc.js';
        temp_vars['mobileCricJs'] = constant.SITE_URL+'static/js/main-fc.js';
        temp_vars['dateFormat'] = dateFormat;
        temp_vars['showRhsScore'] = 'no';
        temp_vars['showRhsResults'] = 'no';
        temp_vars['l2navbar'] = 'yes';
        temp_vars['seoData'] = seoData;
        temp_vars['template'] = "photos";
        temp_vars['active_level2_nav_slug'] = "sports";        
        temp_vars['level3_nav_slug'] = "section~sports";
        temp_vars['active_level3_nav_slug'] = "cricket";
        temp_vars['level4_nav_slug'] = "section~sports~cricket";
        temp_vars['active_level4_nav_slug'] = "photos";
        temp_vars['mobilePageCss'] = constant.SITE_URL+'static/css/m-home-fc.css';
        temp_vars['desktopPageCss'] = constant.SITE_URL+'static/css/home-fc.css';
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
        res.render(device + '/firstcricket/photoListing', templateVars); 
        /*==================== End of rendering a view ==============================*/    
    })
}