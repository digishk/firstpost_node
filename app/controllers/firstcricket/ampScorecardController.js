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
//const ajax = appRequire('app/services/ajaxCalls');
const constant = appRequire('constant');
var dateFormat = require('dateformat');
var async = require('async');

exports.home = function(req,res,next){
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
    var matchFile = '';
    let schema_meta = [];
    var scoreData = [];
    let breadCrumbVal = "";
    var headingSeo="";
    var fmatchData = '';
    /*==================== End of Declaration of all variables ====================*/

    /*
    *==================================================================
    * Create Promise here
    *=================================================================
    */
        var pageType =  req.params['pageType'];
        var postSlug =  req.params['postSlug'];
        var seriesID =  req.params['seriesID'];
        var matchID =  req.params['matchID'];
        var postId = "";
        let pageTypeVal ="";
        let template = "";
        //console.log(req.params,"request"); 
        temp_vars['quickUrl'] = constant.SITE_URL+'firstcricket/cricket-live-score/'+postSlug+'-quick/'+seriesID+'/'+matchID+'.html';
        temp_vars['fullUrl'] = constant.SITE_URL+'firstcricket/cricket-live-score/'+postSlug+'-full/'+seriesID+'/'+matchID+'.html';
        temp_vars['commUrl'] = constant.SITE_URL+'firstcricket/cricket-live-score/'+postSlug+'-commentary/'+seriesID+'/'+matchID+'.html';
        
            switch(pageType) {
            case "quick":
            /*if($commentary['seriesShortName'] == "IPL, 2019"){
            $seoData['metaTitle'] = "IPL 2019 ".$commentary['matchHeading'].": ".$commentary['teamShorta']." Vs ".$commentary['teamShortb']."  Quick commentary, Match Score and Cricket Updates – FirstCricket, Firstpost";
            $seoData['metaDesc'] = "IPL 2019 ".$commentary['matchHeading']."  Quick  commentary, cricket score and updates. Get IPL 12 ".$commentary['teamShorta']." Vs ".$commentary['teamShortb']." latest cricket match results, scores and statistics, with complete cricket scorecard details online at Firstpost.com.";
            $headIpl = "IPL 2019";
            }else{*/      
                seoData['metaTitle'] = "seoHeading : Quick Scorecard, Match Score and Cricket Updates – Firstcricket";
                seoData['metaDesc'] = "Watch seoHeading quick scorecard, cricket score and updates. Get all latest cricket match results, scores and statistics, with complete cricket scorecard details, India and international at Firstcricket.";
                pageTypeVal = "Quick";
                seoData['pageUrl'] = temp_vars['quickUrl']; 
                temp_vars['mobilePageCss'] = constant.SITE_URL+'static/css/m-scorecard-fc.css';
                temp_vars['desktopPageCss'] = constant.SITE_URL+'static/css/scorecard-fc.css';                
                template = "ampQuickscore";
                schemaHeading = "Quick Scorecard";
            break;

            case "full":
                seoData['metaTitle'] = "seoHeading: Full Scorecard, Match Score and Cricket Updates - Firstcricket";
                seoData['metaDesc'] = "seoHeading full scorecard, cricket score and updates. Get all latest cricket match results, scores and statistics, with complete cricket scorecard details, India and international at Firstcricket.";
                pageTypeVal = "Full";
                seoData['pageUrl'] = temp_vars['fullUrl']; 
                temp_vars['mobilePageCss'] = constant.SITE_URL+'static/css/m-scorecard-fc.css';
                temp_vars['desktopPageCss'] = constant.SITE_URL+'static/css/scorecard-fc.css';
                template = "ampFullscore";
                schemaHeading = "Full Scorecard";
            break;
                    
            break;

            default:            
            seoData['metaTitle'] = "seoHeading: : Ball by Ball Commentary, Match Score and Cricket Updates - Firstcricket";
            seoData['metaDesc'] = "seoHeading  ball by ball commentary, cricket score and updates. Get all latest cricket match results, scores and statistics, with complete cricket scorecard details, India and international at Firstcricket.";

                seoData['pageUrl'] = temp_vars['commUrl']; 
                temp_vars['mobilePageCss'] = constant.SITE_URL+'static/css/m-scorecard-fc.css';
                temp_vars['desktopPageCss'] = constant.SITE_URL+'static/css/scorecard-fc.css';
                template = "ampBallbyballScore";
                schemaHeading = "Commentary";
            break;
            }

        Promise.all([
            /**** ads integration start here ****/
            new Promise((resolveads, rej) => {
                if(constant.hideJSforEU == 'no')
                {
                    const adsArr = [];
                    var keyArr = ['fcscorecard'];
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
                    outbrainAdsKeyArr['pageUrl'] = seoData['pageUrl'].replace(constant.SITE_URL , 'https://www.firstpost.com/');
                    
                    outbrainAdsKeyArr['adsSlot'] = ['AMP_2'];
                    temp_vars['outbrain_ads'] = common.getOutbrainAds(outbrainAdsKeyArr);
                }
                resOutbrain();
            }),
            /*new Promise((resolve1, reject1) => {                      
                clientFetch(serverPrefix + "Revamp_FP_Node_cricLiveData").then((result)=> {
                    cricMatchLists = JSON.parse(result);
                }).then(() => {*/
                    temp_vars['liveMatchList'] = cricketData['liveMatchData'],
                    temp_vars['resultMatchList'] = cricketData['resultMatchData'],
                    temp_vars['upcomingMatchList'] = cricketData['upcomingMatchData'],
                    cricMatchLists = cricketData,
                    new Promise((resolve2, reject2) => {
                        var matchtime_ist = "";
                        var otherMatchData = "";
                        let matchKey = matchID+'_'+seriesID;
                        temp_vars['resultMatchList'] = cricMatchLists['resultMatchData'];
                        temp_vars['upcomingMatchList'] = cricMatchLists['upcomingMatchData'];    
                        //console.log(temp_vars['resultMatchList'][matchKey]); return false
                        if(temp_vars['upcomingMatchList'][matchKey] != undefined){
                            matchFile = cricMatchLists['upcomingMatchData'][matchKey]['matchfile'];
                            matchtime_ist = cricMatchLists['upcomingMatchData'][matchKey]['matchtime_ist'];
                            otherMatchData = cricMatchLists['upcomingMatchData'][matchKey];                            
                        }
                        if(temp_vars['resultMatchList'][matchKey] != undefined){
                            matchFile = cricMatchLists['resultMatchData'][matchKey]['matchfile'];
                            matchtime_ist = cricMatchLists['resultMatchData'][matchKey]['matchtime_ist'];
                            otherMatchData = cricMatchLists['resultMatchData'][matchKey];
                            //console.log(otherMatchData,"aaaa");
                        }                        
                        if(temp_vars['liveMatchList'][matchKey] != undefined){
                            matchFile = cricMatchLists['liveMatchData'][matchKey]['matchfile'];          
                            matchtime_ist = cricMatchLists['liveMatchData'][matchKey]['matchtime_ist'];
                            otherMatchData = cricMatchLists['liveMatchData'][matchKey];
                        }                                    
                        common.getScorecard(req, matchFile, matchKey,seriesID,matchID,pageType,otherMatchData).then((allData) => {
                             try {
                                    allData = JSON.parse(allData);
                                } catch(e) {
                                    allData = "no data";                                     
                                }  
                            try {
                                    var data = JSON.parse(allData['data']);
                                } catch(e) {
                                    data = "no_data";                                     
                                }                        
                        if(data == "no_data"){                            
                             return new Promise((resolveNd, rejectNd) => {
                                clientFetch(serverPrefix + "FP_Node_cricScheduleData").then((response)=> {
                                     var allMatches = JSON.parse(response);                                     
                                     fmatchData = allMatches[matchKey];  
                                     if(typeof fmatchData !== 'undefined'){
                                        
                                                                         
                                         var fmatchDetails = [];
                                         fmatchDetails['teamfa'] = fmatchData['teama'];
                                         fmatchDetails['teamfb'] =  fmatchData['teamb'];
                                         fmatchDetails['matchtype'] = fmatchData['teamb'];
                                         fmatchDetails['Venue'] = fmatchData['venue'];
                                         fmatchDetails['matchdate'] = fmatchData['matchdate_ist'];
                                         fmatchDetails['status'] = fmatchData['matchstatus'].replace(/_/g," ");
                                         currInning = "no";
                                         headingSeo = fmatchData['teama']+" Vs "+fmatchData['teamb']+" Live Score ("+fmatchData['matchtype'].toUpperCase()+") ";                        
                                            temp_vars['headingSeo'] = headingSeo;
                                            breadCrumbVal = fmatchData['teama']+" Vs "+fmatchData['teamb']+" Live Score ("+fmatchData['matchtype'].toUpperCase()+") "+pageTypeVal+" Scorecard";
                                            seoData['metaTitle'] = seoData['metaTitle'].replace("seoHeading",headingSeo);
                                            seoData['metaDesc'] = seoData['metaDesc'].replace("seoHeading",headingSeo);
                                            seoData['metaKeyword'] = fmatchData['teama']+" Vs "+fmatchData['teamb']+" LIVE, "+fmatchData['teama']+" vs "+fmatchData['teamb']+ "LIVE score,"+fmatchData['teama']+" Vs "+fmatchData['teamb']+" LIVE cricket score, cricket score live";
                                            seoData['tags'] = seoData['metaKeyword'];                        
                                            temp_vars['scoreData'] = fmatchDetails;
                                            temp_vars['scoreData']['matchtime_ist'] = matchtime_ist;
                                        }
                                        return resolveNd();                                        
                                    });
                                })                                
                        }else{
                        var matchData = allData['matchData'];
                        matchFile = matchData['match_filename'];
                        temp_vars['pseudo_value'] = matchData['pseudo_value'];
                        postId = matchData['post_id'];
                        temp_vars['postId'] = postId;
                        headingSeo = data['teamfa']+" Vs "+data['teamfb']+" Live Score ("+data['matchtype'].toUpperCase()+") ";                        
                        temp_vars['headingSeo'] = headingSeo;
                        breadCrumbVal = data['teama']+" Vs "+data['teamb']+" Live Score ("+data['matchtype'].toUpperCase()+") "+pageTypeVal+" Scorecard";
                        seoData['metaTitle'] = seoData['metaTitle'].replace("seoHeading",headingSeo);
                        seoData['metaDesc'] = seoData['metaDesc'].replace("seoHeading",headingSeo);
                        seoData['metaKeyword'] = data['teamfa']+" Vs "+data['teamfb']+" LIVE, "+data['teamfa']+" vs "+data['teamfb']+ "LIVE score,"+data['teamfa']+" Vs "+data['teamfb']+" LIVE cricket score, cricket score live";
                        seoData['tags'] = seoData['metaKeyword'];                        
                        temp_vars['scoreData'] = data;
                        temp_vars['scoreData']['matchtime_ist'] = matchtime_ist;                        
                        let currInning = '';
                        let currInn = "";   
                        temp_vars['innCount'] = 1;     

                        if(data['fourthInnings']['status'] == '1'){
                            currInning = "fourthInnings";
                            currInn = "fourth";
                            temp_vars['innCount'] = 4;
                        }
                        else if(data['thirdInnings']['status'] == '1'){
                            currInning = "thirdInnings";
                            currInn = "third";
                            temp_vars['innCount'] = 3;
                        }
                        else if(data['secondInnings']['status'] == '1'){
                            currInning = "secondInnings";
                            currInn = "second";
                            temp_vars['innCount'] = 2;
                        }
                        else{
                            currInning = "firstInnings"; 
                            currInn =   "first";
                        } 
                        temp_vars['currInning'] = currInning;
                        if(data[currInning]['Battingteam_id'] == data['teama_id']){
                            teamName = data['teama'].toLowerCase();
                        }else{
                            teamName = data['teamb'].toLowerCase();
                        } 
                            if(pageType == "quick" || pageType == "commentary"){             ``          
                             return new Promise((resolve3, reject3) => {
                                common.getcommentry(req,matchFile,teamName,currInn).then((CommData) => {
                                    //console.log(CommData,"aa");
                                    if(CommData != "noData"){
                                    CommData = JSON.parse(CommData);                                    
                                    }
                                    //CommData['commentry'] = CommData['commentry'].reverse()
                                    temp_vars['commentryData'] = CommData;                            
                                    }).then(function(){                                    
                                        return resolve3();
                                    });
                                })
                            }
                        }
                        }).then(function(){                            
                            postId = temp_vars['postId'];
                            
                            if(postId != "" && postId != undefined){
                                return new Promise((resolve4, reject4) => {
                                    clientFetch(serverPrefix + "fp_2.0_setPostDetail_" + postId).then((response)=> {
                                    postPageJson = JSON.parse(response);                                    
                                    temp_vars['blogUrl'] = postPageJson['post']['post_url'];
                                    }).then(function(){
                                     return resolve4();
                                    }).then(function(){
                                     return resolve2();
                                    });
                                })
                            }
                            return resolve2();
                        })
                    }),/*.then(function(){
                        return resolve1();
                    })
                })
            }),*/
            clientFetch(serverPrefix + "fp_top_stories_article_data").then((result)=> {
                temp_vars['mostReadArtcles'] = JSON.parse(result); 
            }),        
    
        ]).then(()=>{
            if(typeof fmatchData === 'undefined'){
                const error_controller = appRequire('error_controller');
                return error_controller.error(req,res);
            }        
             // console.log(temp_vars['blogUrl'],"1121");
        /*
        *==================================================================
        * Get Firstpost Menus
        *=================================================================
        */        
                     
        /*temp_vars['monthL'] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        temp_vars['monthS'] = ['','Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];*/        
        seoData['page_name'] = temp_vars['pageName'];
        seoData['page_type'] = "main";
        seoData['page_language'] = "en";       
        
        seoData['canonicalUrl'] = seoData['pageUrl'];
        schema_meta['metaTitle'] = seoData['metaTitle'];
        schema_meta['metaDesc']  = seoData['metaDesc'];
        schema_meta['contentUrl'] = seoData['pageUrl'];
        
        schema_meta['tags'] = seoData['metaKeyword'];
        schema_meta['matchVenue'] = temp_vars['scoreData']['Venue'];        
        schema_meta['matchHeading'] = temp_vars['headingSeo']+', '+schemaHeading;
        schema_meta['matchDate'] = temp_vars['scoreData']['matchdate'];
        schema_meta['matchIndTime'] = temp_vars['scoreData']['matchtime_ist'];        
        schema_meta['schema_type'] = ["webpage","event"];
        schema_meta['flag'] = 0;

        temp_vars['seoData'] = seoData;
        temp_vars['inningArr'] = ['','firstInnings','secondInnings','thirdInnings','fourthInnings'];
        temp_vars['inningText'] = ['','1st Innings','2nd Innings','3rd Innings','4th Innings'];
        temp_vars['deFUrl'] = "https://www.firstpost.com/firstcricket/player-profile/";       
        
        /*
        *==================================================================
        * Assign Template Varibles Here
        *=================================================================
        */
        //console.log(temp_vars['upcomingMatchList']," ddd live list...."); return false;
        var listitem_2 = constant.SITE_URL+'firstcricket/cricket-live-score/';
        breadcrumbsArr[constant.SITE_URL] = "Home";
        breadcrumbsArr[listitem_2] = common.capitalizeFLetter("scorecard"); //Donot delete , this is for reference
        breadcrumbsArr['active'] = breadCrumbVal;    
        temp_vars['breadcrumbsArr'] = breadcrumbsArr;
        temp_vars['postId'] = postId;
                temp_vars['schema_meta'] = schema_meta;
        temp_vars['constant'] = constant;
        temp_vars['viewpath'] = constant.viewpath;
        temp_vars['device'] = constant.device;
        temp_vars['footer'] = constant.footer;
        temp_vars['common'] = common;
        //console.log(matchFile,"sdfsf");
        temp_vars['matchFile'] = matchFile;
        temp_vars['pageType'] = pageType;
        temp_vars['seriesID'] = seriesID;
        temp_vars['matchID'] = matchID
        temp_vars['postSlug'] = postSlug;
        temp_vars['pageName'] = 'firstcricket-home';
        temp_vars['otherFirstPaintCss'] = 'firstpaint-fc'; 
        temp_vars['desktopCricJs'] = constant.SITE_URL+'static/js/main-fc.js';
        temp_vars['mobileCricJs'] = constant.SITE_URL+'static/js/main-fc.js';
        temp_vars['dateFormat'] = dateFormat;
        temp_vars['showRhsScore'] = 'yes';
        temp_vars['showRhsResults'] = 'yes';
        temp_vars['l2navbar'] = 'yes';
        temp_vars['seoData'] = seoData;
        temp_vars['active_level2_nav_slug'] = "sports";
        temp_vars['level3_nav_slug'] = "section~sports";
        temp_vars['active_level3_nav_slug'] = "cricket";
        temp_vars['template'] = template;
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
        res.render('mobile/firstcricket/'+template, templateVars);
        /*==================== End of rendering a view ==============================*/    
    })
}