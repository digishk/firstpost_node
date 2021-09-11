/*
*==================================================================
* Project: Firstpost English
* Controller: FirstCricket Home
* Created By: Digish Kansara
* Note: Please read comments before doing any task. 
        Commented code is only reference.
*=================================================================
*/

const{
    promisify
} = require("util");
const common = appRequire('common_functions');
const constant = appRequire('constant');
var dateFormat = require('dateformat');
var async = require('async');

exports.home = function(req, res, next) {    
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
    var tag_name = 'cricket';    
    var cricMatchLists = {};
    let breadcrumbsArr = [];
    let schema_meta = [];
    let shareArr = [];
    var adsArrKey = "";
    let template = "";
    /*==================== End of Declaration of all variables ====================*/

    /*
    *==================================================================
    * Create Promise here
    *=================================================================
    */
        let pageType =  req.params['pageType'];                
            temp_vars['showRhsScore'] = 'yes';
            temp_vars['showRhsResults'] = 'yes';
            switch(pageType) {
            case "cricket-schedule":
                var RedKey = "FP_Node_cricScheduleMonthData";                                
                seoData['metaTitle'] = 'Cricket Schedule: India vs New Zealand, Todays Match Timings, Upcoming Matches, Fixtures, India, and International - Firstcricket';
                seoData['metaDesc'] = "Cricket Match Schedule: India vs New Zealand, Cricket Full Schedule 2021, List of all upcoming matches India and International series, ODI, Test & T20I Cricket Schedule, today's match, venue, and fixture and team information on Firstcricket.";
                seoData['metaKeyword'] = "India vs New Zealand, cricket schedule, india cricket schedule, india cricket schedule 2021, india cricket schedule 2021, india cricket schedule, which cricket match is today, today cricket match time, live cricket match today india, India vs New Zealand";
                seoData['tags'] = "India vs New Zealand, cricket schedule, india cricket schedule, india cricket schedule 2021, india cricket schedule 2021, india cricket schedule, which cricket match is today, today cricket match time, live cricket match today india, India vs New Zealand";
                seoData['pageUrl'] = constant.SITE_URL+'firstcricket/cricket-schedule';  
                template = "schedule";
                adsArrKey = "schedule";
                breadText = "schedule";
                temp_vars['active_level4_nav_slug'] = "schedule";
            break;
            
            case "cricket-live-score":
                var RedKey = "FP_Node_cricScheduleMonthData";                
                seoData['metaTitle'] = 'Live Cricket Scores, Firstcricket Commentary, Match Schedule, Highlights, News | Firstcricket, Firstpost.';
                seoData['metaDesc'] = "Latest cricket news, live cricket scores and updates, match series with cricket match schedule, photos, videos and more on Firstcricket of Firstpost.";
                seoData['pageUrl'] = constant.SITE_URL+'firstcricket/cricket-live-score/';  
                template = "live-score";
                adsArrKey = "scorecard";
                breadText = "Live Cricket Score";
                temp_vars['active_level4_nav_slug'] = "series";
            break;


            case "series":
                //common.getAllSeriesList(req);
                var RedKey = "FP_Node_cricAllSeriesList";                
                seoData['metaTitle'] = 'Cricket Series: Current and Upcoming Cricket Series | India and International Match Series Listing – Firstcricket';
                seoData['metaDesc'] = "Cricket Series - List of all current and upcoming cricket series. India and International match series, ODI, Test & T20I Cricket Schedule, today’s match, venue, and fixture and team information on Firstcricket.";
                seoData['pageUrl'] = constant.SITE_URL+'firstcricket/series/';  
                template = "series";
                adsArrKey = "series";
                breadText = "Cricket Series";
                temp_vars['active_level4_nav_slug'] = "series";
            break;

            case "results":     
                var RedKey = "FP_Node_cricResultMonthData";                                
                seoData['metaTitle'] = "Cricket Results - Recent Match Score, Statistics, Match Report, Winner, India, International - Firstcricket";
                seoData['metaDesc']  = "Firstcricket: Get Recent (Latest) Cricket Match Results, Report and Statistics, Played Match Summary with Complete Cricket Scorecard Details, Venue Profile, India and international Cricket Series Updates online.";
                seoData['pageUrl'] = constant.SITE_URL+'firstcricket/results';
                temp_vars['showRhsScore'] = 'yes';
                temp_vars['showRhsResults'] = 'no';
                template = "results";
                adsArrKey = "results";
                breadText = "results";
                temp_vars['active_level4_nav_slug'] = "results";
            break;

            default:
                res.status(404).render('404', {title: "Sorry, page not found", session: req.sessionbo});
            break;
            }

        Promise.all([            
            /*
        *==================================================================
        * Use Below Promise for Outbrain Ads only
        *=================================================================
        */
        new Promise((resOutbrain, rejOutbrain) => {
            if (typeof constant.config_flags.OUTBRAINS_ADS_FLAG !== 'undefined' && constant.config_flags.OUTBRAINS_ADS_FLAG == 1) {
                const outbrainArr = [];
                var outbrainAdsKeyArr = [];      
                outbrainAdsKeyArr['pageUrl'] = seoData['pageUrl'].replace(constant.SITE_URL , 'https://www.firstpost.com/');
                if(isMobile == 1){
                   outbrainAdsKeyArr['adsSlot'] = ['MB_2'];
                }else{
                   outbrainAdsKeyArr['adsSlot'] = ['AR_2' , 'SB_4'];
                }
                
                temp_vars['outbrain_ads'] = common.getOutbrainAds(outbrainAdsKeyArr);
            }
            resOutbrain();
        }),
            /**** ads integration start here ****/
            new Promise((resolveads, rej) => {
                if(constant.hideJSforEU == 'no')
                {                            
                    const adsArr = [];
                    var keyArr = ['fc'+adsArrKey];
                    temp_vars['ads'] = common.getAds(keyArr,device,'ads_arr_cricket');
                    
                    if(typeof temp_vars['ads'] === 'undefined'){
                        delete temp_vars['ads'];
                    }
                }
                resolveads();
            }),
            /**** ads integration end here ****/
            clientFetch(serverPrefix + RedKey).then((result)=> {                
                if(result == null){
                    common.getYearCricketData(req).then((yearData) => { 
                        console.log("year data set");
                    })
                    if(pageType == "cricket-schedule"){
                        common.getCricketSchedule(req).then((yearData) => { 
                            console.log("schedule set");
                        })
                    }
                    if(pageType == "results"){
                        common.getCricketResults(req).then((yearData) => { 
                            console.log("result set");
                        })
                    }
                    if(pageType == "series"){
                        common.getAllSeriesList(req).then((yearData) => { 
                            console.log("series set");
                        })
                    }                    
                }
                cricScheduleLists = JSON.parse(result);
                temp_vars['scheduleMonthList'] = cricScheduleLists;            
            }),            
            clientFetch(serverPrefix + "fp_top_stories_article_data").then((result)=> {
                temp_vars['mostReadArtcles'] = JSON.parse(result); 
            }),                        
        ]).then(()=>{
        /*
        *==================================================================
        * Get Firstpost Menus
        *=================================================================
        */        
        temp_vars['liveMatchList'] = cricketData['liveMatchData'];
        temp_vars['resultMatchList'] = cricketData['resultMatchData'];
        temp_vars['upcomingMatchList'] = cricketData['upcomingMatchData'];
        
        temp_vars['monthL'] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        temp_vars['monthS'] = ['','Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];        
                
        seoData['page_name'] = template;
        seoData['page_type'] = "main";
        seoData['page_language'] = "en";
        //temp_vars['metaData'] = common.getMetaHtml(seoData);
        temp_vars['seoData'] = seoData;
        shareArr['shareTitle'] = seoData['metaTitle'];
        shareArr['shareUrl'] = seoData['pageUrl'];
        temp_vars['shareArr'] = shareArr;
        schema_meta['metaTitle'] = seoData['metaTitle'];
        schema_meta['metaDesc']  = seoData['metaDesc'];
        schema_meta['contentUrl'] = seoData['pageUrl'];        
        schema_meta['tags'] = seoData['metaKeyword']    ;
        schema_meta['schema_type'] = ["webpage"];

        schema_meta['flag'] = 0;
        temp_vars['schema_meta'] = schema_meta;
        /*
        *==================================================================
        * Assign Template Varibles Here
        *=================================================================
        */
        //console.log(temp_vars['upcomingMatchList']," ddd live list...."); return false;
        var listitem_2 = constant.SITE_URL+'firstcricket/';
        breadcrumbsArr[constant.SITE_URL] = "Home";
        breadcrumbsArr[listitem_2] = common.capitalizeFLetter("cricket"); //Donot delete , this is for reference
        breadcrumbsArr[seoData['pageUrl']] = common.capitalizeFLetter(breadText);        
        temp_vars['breadcrumbsArr'] = breadcrumbsArr;
        temp_vars['constant'] = constant;
        temp_vars['viewpath'] = constant.viewpath;
        temp_vars['device'] = device;
temp_vars['isMobile'] = isMobile;
        temp_vars['footer'] = constant.footer;
        temp_vars['common'] = common;        
        temp_vars['otherFirstPaintCss'] = 'firstpaint-fc'; 
        temp_vars['mobilePageCss'] = constant.SITE_URL+'static/css/m-schedule-fc.css';
        temp_vars['desktopPageCss'] = constant.SITE_URL+'static/css/schedule-fc.css';                   
        temp_vars['desktopCricJs'] = constant.SITE_URL+'static/js/main-fc.js';
        temp_vars['mobileCricJs'] = constant.SITE_URL+'static/js/main-fc.js';
        temp_vars['dateFormat'] = dateFormat;
        temp_vars['showRhsScore'] = 'yes';
        temp_vars['showRhsResults'] = 'no';
        temp_vars['l2navbar'] = 'yes';
        temp_vars['seoData'] = seoData;
        temp_vars['pageName'] =  template;
        temp_vars['active_level2_nav_slug'] = "sports";
        temp_vars['level3_nav_slug'] = "section~sports";
        temp_vars['active_level3_nav_slug'] = "cricket";
        temp_vars['level4_nav_slug'] = "section~sports~cricket";    
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
        res.render(device + '/firstcricket/'+template, templateVars); 
        /*==================== End of rendering a view ==============================*/    
    })
}