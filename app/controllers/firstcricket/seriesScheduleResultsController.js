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

exports.seriesSchRes = function(req, res, next) {    
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
    var seriesSlug =  req.params['seriesSlug'];    //request parameter used in routes.js    
    var tag_name = 'cricket';    
    var pgNo = (req.params['pg'] !== undefined) ? req.params['pg']  : 1;
    var pgUrl =  constant['SITE_URL']+'firstcricket/sports-news/series/'+seriesSlug+'/page/';
    var limit = 10;
    var start = (isNaN(pgNo)) ? '' : ((pgNo == 1) || (pgNo == 0)) ? '0' : limit*(Number(pgNo)-1);
    var pgNoPerPage = 3;
    if(seriesSlug.includes("ipl")){
        var iplYearArr = seriesSlug.split("-");    
        var iplYear = iplYearArr[1];
        var iplEventNo = (iplYear == "2018") ? "11" : (iplYear == "2019") ? "12" : "13";
        temp_vars['iplYear'] = iplYear;
    }
    /*==================== End of Declaration of all variables ====================*/

    /*
    *==================================================================
    * Create Promise here
    *=================================================================
    */
        let pageType =  req.params['pageType'];
             
            switch(pageType) {
            case "cricket-schedule":                
                seoData['metaTitle'] = 'seriesName: Live Cricket Score, Cricket News, Match Report & Analysis - Firstcricket';
                seoData['metaDesc'] = "seriesName - Get Live Cricket Scores, Cricket Series Latest News & Updates onindia-vs-new-zealand-2020,Match Report, Blogs & Expert Analysis, Photos and Videos Gallery Online at Firstcricket.";
                if(seriesSlug.includes("ipl")){
                seoData['metaTitle'] = "IPL "+iplYear+" Schedule: Todays Match Timings, Upcoming Matches, Fixtures (Dates), Indian Premier League (IPL "+iplEventNo+") Match Time Table – FirstCricket, Firstpost";
                seoData['metaDesc'] = "IPL "+iplYear+" Schedule – Get complete schedule of Indian Premier League matches including IPL "+iplEventNo+" match time table, todays match timing, upcoming matches, dates, fixtures, venue, latest IPL news and live match updates only at Firstpost.com.";
                seoData['tags'] = "IPL "+iplYear+" Schedule, Indian Premier League, IPL "+iplEventNo+" Match Time Table, IPL "+iplEventNo+" Fixtures, IPL Match Dates, IPL Venue";
                seoData['metaKeyword'] = "IPL "+iplYear+" Schedule, Indian Premier League, IPL "+iplEventNo+" Match Time Table, IPL "+iplEventNo+" Fixtures, IPL Match Dates, IPL Venue";
                }
                seoData['pageUrl'] = constant.SITE_URL+'firstcricket/cricket-schedule/series/'+seriesSlug+'.html';
                template2 = "seriesSchedule";
                adsArrKey = "schedule";
                breadText = " Schedule";
            break;            

            case "results":                     
                seoData['metaTitle'] = "seriesName Result: Cricket Results, Points Table, News, Match Report - Firstcricket";
                seoData['metaDesc']  = "Get complete Result of seriesName only on Firstcricket. Read latest cricket news and updates, cricket Result, videos, photo and more online.";
                if(seriesSlug.includes("ipl")){
                seoData['metaTitle'] = "IPL "+iplYear+" Match Results: Recent Match Score Online, Statistics, Match Report, Winner, IPL "+iplEventNo+" Live News – FirstCricket, Firstpost";
                seoData['metaDesc'] = "IPL "+iplYear+" Match Results – Get Indian Premier League Recent (Latest) Cricket Match Results, Report and Statistics, IPL "+iplEventNo+" Played Match Summary with Complete Cricket Scorecard Details Live Online at Firstpost.com.";
                seoData['tags'] = "IPL "+iplYear+" Match Results, Indian Premier League Matches Result, IPL "+iplEventNo+" Match Result, IPL Live News";
                seoData['metaKeyword'] = "IPL "+iplYear+" Match Results, Indian Premier League Matches Result, IPL "+iplEventNo+" Match Result, IPL Live News";
                }
                seoData['pageUrl'] = constant.SITE_URL+'firstcricket/results/series/'+seriesSlug+'.html';
                template2 = "seriesResult";
                adsArrKey = "results";
                breadText = " Result";
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
            new Promise((resolve, rej) => {
                clientFetch(serverPrefix + "FP2.0_FCricket_RankingsForSeries_"+seriesSlug).then((result)=> {
                    var seriesData = JSON.parse(result);                    
                    temp_vars['rankMainData'] = seriesData['main_story'];
                    temp_vars['rankOtherData'] = seriesData['related_story'];
                    temp_vars['seriesName'] = seriesName = seriesData['series']['series_name'];
                    temp_vars['seriesId'] = seriesId =  seriesData['series']['sub_series_ids'];
                    temp_vars['seriesMenu'] = seriesData['series']['series_menu'];
                    temp_vars['seriesSlug'] = seriesSlug = seriesData['series']['series_url'];
                    temp_vars['tag_name'] = seriesData['series']['common_tag'];
                    seoData['metaTitle'] = seoData['metaTitle'].replace("seriesName", seriesName);
                    seoData['metaDesc'] = seoData['metaDesc'].replace("seriesName", seriesName);  
                    if(pageType == "cricket-schedule"){                        
                        return common.getSeriesCricketSchedule(req,seriesId).then((fnData) => {
                            var seriesfnData = JSON.parse(fnData);
                            temp_vars['scheduleMonthList'] = seriesfnData;
                            //console.log(seriesfnData);
                        });
                    }else{                        
                        return common.getSeriesCricketResults(req,seriesId).then((fnData) => {
                            var seriesfnData = JSON.parse(fnData);              
                            //console.log(Object.entries(seriesfnData).reverse());
                            temp_vars['scheduleMonthList'] = seriesfnData;                            
                        });
                    }                    
                                                        
                }).then(()=>{
                        return common.getTagPageResults(tag_name,start,limit,pgNo).then((data) => {
                            temp_vars['tagData'] = data;
                            temp_vars['solrCnt'] = data['solarCount'];                            
                            resolve();
                        })                    
                }).catch((err) => {
                    if(err) {
                        res.redirect('/firstcricket/'+pageType);
                    }
                });
            }),
            new Promise((resolve) => {
                clientFetch(serverPrefix + "FP2.0_IPLCricket_Prediction").then((result) => {
                    temp_vars['prediction'] = JSON.parse(result);
                    resolve()
                })
            }),
            clientFetch(serverPrefix + "fp_top_stories_article_data").then((result)=> {
                temp_vars['mostReadArtcles'] = JSON.parse(result); 
            }),        
            //console.log(temp_vars['scheduleMatchList'],"photos"),

        ]).then(()=>{            
        
        temp_vars['liveMatchList'] = cricketData['liveMatchData'];
        temp_vars['resultMatchList'] = cricketData['resultMatchData'];
        temp_vars['upcomingMatchList'] = cricketData['upcomingMatchData'];       
        
        /*
        *==================================================================
        * Get Firstpost Menus
        *=================================================================
        */        
        temp_vars['mobilePageCss'] = constant.SITE_URL+'static/css/m-schedule-fc.css';
        temp_vars['desktopPageCss'] = constant.SITE_URL+'static/css/schedule-fc.css';
        temp_vars['monthL'] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        temp_vars['monthS'] = ['','Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];        
                
        seoData['page_name'] = temp_vars['pageName'];
        seoData['page_type'] = "main";
        seoData['page_language'] = "en";
        //temp_vars['metaData'] = common.getMetaHtml(seoData);
        temp_vars['seoData'] = seoData;
        shareArr['shareTitle'] = seoData['metaTitle'];
        shareArr['shareUrl'] = seoData['pageUrl'];
        temp_vars['shareArr'] = shareArr;
        seoData['canonicalUrl'] = seoData['pageUrl'];
        schema_meta['metaTitle'] = seoData['metaTitle'];
        schema_meta['metaDesc']  = seoData['metaDesc'];
        schema_meta['contentUrl'] = seoData['pageUrl'];        
        schema_meta['tags'] = seoData['metaKeyword']    ;
        schema_meta['schema_type'] = ["webpage"];

        schema_meta['flag'] = 0;
        temp_vars['schema_meta'] = schema_meta;
        temp_vars['pgNo'] = pgNo;
        temp_vars['pgUrl'] = pgUrl;
        temp_vars['start'] = start;

        temp_vars['pagination'] =  common.getPagination(temp_vars['solrCnt'],pgNo,pgUrl,pgNoPerPage,limit);
        /*
        *==================================================================
        * Assign Template Varibles Here
        *=================================================================
        */
        //console.log(temp_vars['upcomingMatchList']," ddd live list...."); return false;
        var listitem_2 = constant.SITE_URL+'firstcricket/';
        breadcrumbsArr[constant.SITE_URL] = "Home";
        breadcrumbsArr[listitem_2] = common.capitalizeFLetter("cricket"); //Donot delete , this is for reference
        var listitem_3 = listitem_2+'series/'+seriesSlug+'.html';
        breadcrumbsArr[listitem_3] = common.capitalizeFLetter(seriesName);
        breadcrumbsArr[seoData['pageUrl']] = seriesName+common.capitalizeFLetter(breadText);
        temp_vars['breadcrumbsArr'] = breadcrumbsArr;
        temp_vars['constant'] = constant;
        temp_vars['viewpath'] = constant.viewpath;
        temp_vars['device'] = device;
temp_vars['isMobile'] = isMobile;
        temp_vars['footer'] = constant.footer;
        temp_vars['common'] = common;
        temp_vars['pageName'] =  template2;        
        temp_vars['otherFirstPaintCss'] = 'firstpaint-fc'; 
        temp_vars['desktopCricJs'] = constant.SITE_URL+'static/js/main-fc.js';
        temp_vars['mobileCricJs'] = constant.SITE_URL+'static/js/main-fc.js';
        temp_vars['dateFormat'] = dateFormat;
        temp_vars['showRhsScore'] = 'yes';
        temp_vars['showRhsResults'] = 'yes';
        temp_vars['showRhsOrangeCap'] = 'no';
        temp_vars['showRhsPurpleCap'] = 'no';
        temp_vars['menuHighlight'] = "";
        temp_vars['l2navbar'] = 'yes';
        temp_vars['seoData'] = seoData;
        temp_vars['template'] = "series";
        temp_vars['template2'] = template2;
        temp_vars['active_level2_nav_slug'] = "sports";
temp_vars['level3_nav_slug'] = "section~sports";
        temp_vars['active_level3_nav_slug'] = "cricket";
        temp_vars['level4_nav_slug'] = "section~sports~cricket";
        temp_vars['active_level4_nav_slug'] = seriesSlug;
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
        res.render(device + '/firstcricket/'+template2, templateVars); 
        /*==================== End of rendering a view ==============================*/    
    })
}