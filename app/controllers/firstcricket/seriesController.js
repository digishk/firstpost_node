/*
*==================================================================
* Project: Firstpost English
* Controller: News Controller
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
const error_controller = appRequire('error_controller');
/*==================== End of All Modules declaration ====================*/
exports.series = function(req, res, next) {    
    var deviceDetails = common.isMobileVar(req);
    const device  = deviceDetails.device;
    const isMobile  = deviceDetails.isMobile;
/*
*==================================================================
* Declare All the Varibles Here only
*=================================================================
*/
//console.log(req.params,"request"); return false;
var client = req.app.get('client');
const clientFetch = promisify(client.get).bind(client); // now getAsync is a promisified version of client.get:
var temp_vars = [];
var redisKeys = [];
let breadcrumbsArr = [];
var seriesSlug =  req.params['seriesSlug'];    //request parameter used in routes.js
var tag_name = 'cricket';
var pgNo = (req.params['pg'] !== undefined) ? req.params['pg']  : 1;
var pgUrl =  constant['SITE_URL']+'firstcricket/sports-news/series/'+seriesSlug+'/page/';
var limit = 10;
var start = (isNaN(pgNo)) ? '' : ((pgNo == 1) || (pgNo == 0)) ? '0' : limit*(Number(pgNo)-1);
var template2 = "seriesHome";
var pgNoPerPage = 3;
serverPrefix = '';
let schema_meta = [];
var showRanking = "yes";
let pageType =  req.params['pageType'];
var seoData = [];
var seriesSlugText = seriesSlug.replace("-"," ");
/*==================== End of Declaration of all variables ====================*/

switch(pageType) {
    case "sports-news":                
        seoData['metaTitle'] = "seriesName: Latest Cricket News, Ball by ball Match Updates, Commentary, Expert Blogs - Firstcricket";
        seoData['metaDesc'] = "Firstcricket: Get seriesName Cricket Breaking News, Latest Match Report, Live Blogs, Ball by ball Match Updates, Cricket Photos, Videos, Expert Blogs, Upcoming Cricket Series News & Alerts.";
        seoData['metaKeyword'] = "";
        seoData['pageUrl'] = constant.SITE_URL+'firstcricket/sports-news/series/'+seriesSlug+'/';          
        breadText = " News";
        menuHighlight = "seriesNews";
        showRanking = "no";        
    break;            

    case "series":                     
        seoData['metaTitle'] = "seriesName: Live Cricket Score, Cricket News, Match Report & Analysis - Firstcricket";
        seoData['metaDesc']  = "seriesName - Get Live Cricket Scores, Cricket Series Latest News & Updates onindia-vs-sri-lanka-2020,Match Report, Blogs & Expert Analysis, Photos and Videos Gallery Online at Firstcricket.";
        seoData['metaKeyword'] = "";
        seoData['pageUrl'] = constant.SITE_URL+'firstcricket/series/'+seriesSlug+'.html';
        menuHighlight = "seriesHome";
        breadText = "";
    break;

    default:
        //res.status(404).render('404', {title: "Sorry, page not found", session: req.sessionbo});
        const error_controller = appRequire('error_controller');
        return error_controller.error(req,res);
    break;
}
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
                var ads_catSlug = '';
                const adsArr = [];                
                var keyArr = ['fcarticle'];
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
                    temp_vars['seriesMenu'] = seriesData['series']['series_menu'];
                    temp_vars['seriesSlug'] = seriesSlug = seriesData['series']['series_url'];
                    tag_name = seriesData['series']['common_tag'];
                    seoData['metaTitle'] = seoData['metaTitle'].replace("seriesName", seriesName);
                    seoData['metaDesc'] = seoData['metaDesc'].replace("seriesName", seriesName);
                    common.getTagPageResults(tag_name,start,limit,pgNo).then((data) => {
                        temp_vars['tagData'] = data;
                        temp_vars['solrCnt'] = data['solarCount'];
                        resolve();
                    }).catch((err)=> {
                        if(err) {
                            return error_controller.error(req,res);
                        }
                    });
                }).catch((err) => {
                    res.redirect('/firstcricket');
                });
            }),
            clientFetch(serverPrefix + "fp_top_stories_article_data").then((result)=> {
                        temp_vars['mostReadArtcles'] = JSON.parse(result); 
            }),
]).then(() => {
            
temp_vars['liveMatchList'] = cricketData['liveMatchData'];
temp_vars['resultMatchList'] = cricketData['resultMatchData'];
temp_vars['upcomingMatchList'] = cricketData['upcomingMatchData'];       
        
seoData['page_type'] = "main";
seoData['page_language'] = "en";


var listitem_2 = constant.SITE_URL+'firstcricket/';
breadcrumbsArr[constant.SITE_URL] = "Home";
breadcrumbsArr[listitem_2] = common.capitalizeFLetter("cricket"); //Donot delete , this is for reference
if(pageType == "sports-news"){
    var listitem_3 = constant.SITE_URL+"firstcricket/series/"+temp_vars['seriesSlug']+".html";
    breadcrumbsArr[listitem_3] = common.capitalizeFLetter(seriesName);    
    breadcrumbsArr[seoData['pageUrl']] = seriesName+" News";
}
else{
    breadcrumbsArr[seoData['pageUrl']] = seriesName;    
}

/*
*==================================================================
* Get Pagination Data 
*=================================================================
*/
temp_vars['pagination'] =  common.getPagination(temp_vars['solrCnt'],pgNo,pgUrl,pgNoPerPage,limit);
/*
*==================================================================
* Assign Template Varibles Here
*=================================================================
*/
seoData['canonicalUrl'] = seoData['pageUrl'];
schema_meta['metaTitle'] = seoData['metaTitle'];
schema_meta['metaDesc']  = seoData['metaDesc'];
schema_meta['contentUrl'] = seoData['pageUrl'];
schema_meta['tags'] = seoData['metaKeyword'];
schema_meta['schema_type'] = ["webpage"];
//console.log(schema_meta,"Schema");
schema_meta['flag'] = 0;
temp_vars['schema_meta'] = schema_meta;

temp_vars['constant'] = constant;
temp_vars['common'] = common;
temp_vars['dateFormat'] = dateFormat;
temp_vars['seoData'] = seoData;
temp_vars['viewpath'] = constant.viewpath;
temp_vars['device'] = device;
temp_vars['isMobile'] = isMobile;
temp_vars['footer'] = constant.footer;
temp_vars['tag_name'] = tag_name;
temp_vars['pgNo'] = pgNo;
temp_vars['pgUrl'] = pgUrl;
temp_vars['start'] = start;
temp_vars['pageName'] = 'tag';
temp_vars['template'] = "series";
temp_vars['template2'] = template2;
temp_vars['menuHighlight'] = menuHighlight;
temp_vars['showRhsScore'] = 'yes';
temp_vars['showRhsResults'] = 'yes';
temp_vars['showRanking'] = showRanking;
temp_vars['breadcrumbsArr'] = breadcrumbsArr;
temp_vars['otherFirstPaintCss'] = 'firstpaint-fc'; 
temp_vars['mobilePageCss'] = constant.SITE_URL+'static/css/m-home-fc.css';
temp_vars['desktopPageCss'] = constant.SITE_URL+'static/css/home-fc.css';
temp_vars['desktopCricJs'] = constant.SITE_URL+'static/js/main-fc.js';
temp_vars['mobileCricJs'] = constant.SITE_URL+'static/js/main-fc.js';
temp_vars['active_level2_nav_slug'] = "sports";
temp_vars['level3_nav_slug'] = "section~sports";
temp_vars['active_level3_nav_slug'] = "cricket";
temp_vars['level4_nav_slug'] = "section~sports~cricket";
temp_vars['active_level4_nav_slug'] = seriesSlug;
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