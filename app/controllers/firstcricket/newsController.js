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
/*==================== End of All Modules declaration ====================*/
exports.sportsNews = function(req, res, next) {    
    var deviceDetails = common.isMobileVar(req);
    const device  = deviceDetails.device;
    const isMobile  = deviceDetails.isMobile;
/*
*==================================================================
* Declare All the Varibles Here only
*=================================================================
*/
var client = req.app.get('client');
const clientFetch = promisify(client.get).bind(client); // now getAsync is a promisified version of client.get:
var temp_vars = [];
var redisKeys = [];
let breadcrumbsArr = [];
var tag_name =  'cricket';    //request parameter used in routes.js
var pgNo = (req.params['pg'] !== undefined) ? req.params['pg']  : 1;
var pgUrl =  constant['SITE_URL']+'firstcricket/sports-news/page/';    //request parameter used in routes.js
var limit = 20;
var start = (isNaN(pgNo)) ? '' : ((pgNo == 1) || (pgNo == 0)) ? '0' : limit*(Number(pgNo)-1);
template = "news";
var pgNoPerPage = 3;
serverPrefix = '';
let schema_meta = [];
/*==================== End of Declaration of all variables ====================*/

/*
*==================================================================
* Create Promise here
*=================================================================
*/
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
                outbrainAdsKeyArr['pageUrl'] = constant.SITE_URL.replace(constant.SITE_URL , 'https://www.firstpost.com/')+'firstcricket/sports-news';
                if(isMobile == 1){
                   outbrainAdsKeyArr['adsSlot'] = ['MB_2'];
                }else{
                   outbrainAdsKeyArr['adsSlot'] = ['AR_2','SB_4'];
                }                
                temp_vars['outbrain_ads'] = common.getOutbrainAds(outbrainAdsKeyArr);
            }
            resOutbrain();
        }),
		new Promise((resolve, rej) => {
		  common.getTagPageResults(tag_name,start,limit,pgNo).then((data) => {
		      temp_vars['tagData'] = data;
		      temp_vars['solrCnt'] = data['solarCount'];
		      resolve();
		  });
		}),
		/**** ads integration start here ****/
		new Promise((resolveads, rej) => {
		    if(constant.hideJSforEU == 'no')
		    {                            
		        const adsArr = [];
		        var keyArr = ['fc'+template];
		        temp_vars['ads'] = common.getAds(keyArr,device,'ads_arr_cricket');		 		        
		        if(typeof temp_vars['ads'] === 'undefined'){
		            delete temp_vars['ads'];
		        }
		    }
		    resolveads();
		}),
		/**** ads integration end here ****/
		clientFetch(serverPrefix + "fp_top_stories_article_data").then((result)=> {
		            temp_vars['mostReadArtcles'] = JSON.parse(result); 
		}),	

	]).then(() => {
		
		temp_vars['liveMatchList'] = cricketData['liveMatchData'];
        temp_vars['resultMatchList'] = cricketData['resultMatchData'];
        temp_vars['upcomingMatchList'] = cricketData['upcomingMatchData'];

		var seoData = {};
		var pgNoText = "";
		seoData['pageUrl']   = constant.SITE_URL+'firstcricket/sports-news';
		if(pgNo != 1){
			pgNoText = " Page "+pgNo;
			seoData['pageUrl']   = constant.SITE_URL+'firstcricket/sports-news/page/'+pgNo;
		}		
		seoData['metaTitle'] ="Cricket News: Latest Cricket Updates, Today's Match, Live Cricket Score, Highlights - Firstcricket"+pgNoText;
		seoData['metaDesc']  ="Get all latest and breaking cricket news. Cricket live score, updates and coverage of cricket series including cricket match schedule, photos, videos and more only on Firstcricket."+pgNoText;
		seoData['page_type'] = "main";
		seoData['page_language'] = "en";
		seoData['canonicalUrl']   = constant.SITE_URL+'firstcricket/sports-news';

		var listitem_2 = constant.SITE_URL+'firstcricket/';
		breadcrumbsArr[constant.SITE_URL] = "Home";
		breadcrumbsArr[listitem_2] = common.capitalizeFLetter("cricket"); //Donot delete , this is for reference
		breadcrumbsArr[seoData['pageUrl']] = common.capitalizeFLetter("Sports News");

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
		schema_meta['metaTitle'] = seoData['metaTitle'];
		schema_meta['metaDesc']  = seoData['metaDesc'];
		schema_meta['contentUrl'] = seoData['pageUrl'];
		schema_meta['tags'] = seoData['metaKeyword']    ;
		schema_meta['schema_type'] = ["webpage"];
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
		temp_vars['pageName'] = 'sports-news';
		temp_vars['otherFirstPaintCss'] = 'firstpaint-fc';
		temp_vars['showRhsScore'] = 'yes';
		temp_vars['showRhsResults'] = 'yes';
		temp_vars['breadcrumbsArr'] = breadcrumbsArr;
		temp_vars['active_level2_nav_slug'] = "sports";
temp_vars['level3_nav_slug'] = "section~sports";
		temp_vars['active_level3_nav_slug'] = "cricket";
		temp_vars['level4_nav_slug'] = "section~sports~cricket";
        temp_vars['active_level4_nav_slug'] = "news";
		temp_vars['mobilePageCss'] = constant.SITE_URL+'static/css/m-home-fc.css';
		temp_vars['desktopPageCss'] = constant.SITE_URL+'static/css/home-fc.css';
		temp_vars['desktopCricJs'] = constant.SITE_URL+'static/js/main-fc.js';
		temp_vars['mobileCricJs'] = constant.SITE_URL+'static/js/main-fc.js';
		templateVars = {};
		templateVars = common.assignTempVars(temp_vars);
		/*==================== End of assignTempVars() ==============================*/
		/*
		*==================================================================
		* Render View Here only
		*=================================================================
		*/
		res.render(device + '/firstcricket/sports-news', templateVars); 
	/*==================== End of rendering a view ==============================*/		    	
	})


}

