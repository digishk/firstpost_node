/*
*==================================================================
* Project: Firstpost English
* Controller: Article
* Created By: Shailesh Parab
* Note: Please read comments before doing any task. 
        Commented code is only reference.
*=================================================================
*/
const {promisify} = require("util");
const common = appRequire('common_functions');
const constant = appRequire('constant');
var dateFormat = require('dateformat');
var async = require('async');
var array_unique = require('array-unique');
var ltrim = require( 'ltrim' );
var rtrim = require( 'rtrim' );
var striptags = require('striptags');
/*==================== End of All Modules declaration ====================*/
module.exports = function(request, response) {
    // console.log(request.query,"function name");
    // response.setHeader('Content-Type', 'text/plain');
    return ajaxFunctions[request.params.function_name](request, response);
}
let ajaxFunctions = {
    pvCandidate : function(req, res) {
        res.write('pageview_candidate');
        res.end();
    },
    getLiveBlog : function(req, res) {
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
        
        let temp_vars = [];
        let liveblog_url = post_url = postUrl = postSlugId = postPageSlug = postContent = content = liveBlog = matchCommentary = iplFlag = hideJSforEU = videoAdNtAllowedIds = is_this_faq = allQuestionAns = is_this_howto = allTagsOfHowTo = infiniteArticlesListJSON = noCss = iscomment = whatsAppSubTxt_Enable= section = ampWidget = req_url = isUserValid = http_login_val = moreNetworkData = adFlipUpClass  = tagpageId  = catSlugCapi = tags_data = infinite_article_data = isPremium = faq_html = faq_url = fifaPredict = shw = iplFlag = mcdFlag = ctTrophyFlg = headline = filteredContent = ogImg = twitImg = youtube_js_flag = articleBody = is_youtube_video = actor_arr = actorHTMLString = movieActorSchemaString = movie_language = "";
        let infiniteArticlesList = [];
        let currentArticle = [];
        let shareArr = [];
        
        
      
        /*
        *==================================================================
        * Create Promise here
        *=================================================================
        */
        return Promise.all([
            
            new Promise((resolve, reject) => {
                    var liveBlogKey = req.query.tag;
                    var liveBlogIncludeFlag = false;
                    temp_vars['liveBlog'] = '';
                    temp_vars['liveBlogIncludeFlag'] = liveBlogIncludeFlag;
                    temp_vars['liveBlogKey'] = req.query.tag;
                    
                    if (liveBlogKey != "" )
                    {
                        url = 'http://liveblogapi.nw18.com/follow/web/getLiveBlogJson.php?tag='+liveBlogKey+'&p=fp&page=1&time=&d=&count=50&jsonp_callback=callbackjson_normal';
                        liveBlogIncludeFlag = true;
                        postContent = content.replace(/<iframe(.*?)api.liveblog.in.com(.*?)<\/iframe>/gim, '', content);

                        return new Promise((resolve1, reject1) => {
                            common.getRawData(url).then((liveBlogRaw) => {  
                                live_blog_json = ltrim(liveBlogRaw, 'callbackjson_normal(');
                                live_blog_json = rtrim(live_blog_json, ')');
                                liveBlog = JSON.parse(live_blog_json);
                                // console.log(liveBlog.data,'liveBlog');
                                temp_vars['liveBlog'] = liveBlog;
                                temp_vars['liveBlogIncludeFlag'] = liveBlogIncludeFlag;
                                temp_vars['liveBlogKey'] = liveBlogKey;
                            })
                            .then((data) => { return resolve1(data); })
                            .then((data) => { resolve(data) })
                        });
                    }
                })
               
        ]).then(() => {

           
            shareArr['shareTitle'] = req.query.shareTitle;
    	    shareArr['shareUrl'] = req.query.shareUrl;
        
            
            /*
            *==================================================================
            * Assign Template Varibles Here
            *=================================================================
            */            
            temp_vars['viewpath'] = constant.viewpath;
            temp_vars['device'] = device;
            temp_vars['footer'] = constant.footer;
            temp_vars['common'] = common;
            
            temp_vars['liveBlog'] = liveBlog;
            temp_vars['constant'] = constant;
            temp_vars['common'] = common;
            temp_vars['viewpath'] = constant.viewpath;
            temp_vars['device'] = device;
            temp_vars['footer'] = constant.footer;
            temp_vars['dateFormat'] = dateFormat;
            temp_vars['shareArr'] = shareArr;
            temp_vars['req'] = req;
            temp_vars['striptags'] = striptags;
            temp_vars['lastUpdatedTime'] = req.query.lastUpdatedTime;
            
            /*==================== End of Assignment of Template Variables ====================*/
            // console.log(JSON.stringify( temp_vars['fCrickWidgetData'], null, "  "));
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
            res.render('desktop/firstpost/live-blog-html-content', templateVars); 
            res.end();
            /*==================== End of rendering a view ==============================*/
        })
    },
    getScoreData : function(req, res) {
        var deviceDetails = common.isMobileVar(req);
        const device  = deviceDetails.device;
        const isMobile  = deviceDetails.isMobile;
        //console.log(req.query.matchID,"function name"); return false;        
        var temp_vars = [];
        Promise.all([                                        
            new Promise((resolve, reject2) => {                        
                var matchtime_ist = "";
                var otherMatchData = "";
                var matchID = temp_vars['matchID'] =  req.query.matchID;
                var seriesID = temp_vars['seriesID'] =  req.query.seriesID;
                var matchFile = temp_vars['matchFile'] =  req.query.matchFile;
                var pageType = temp_vars['pageType'] =  req.query.pageType;
                if(pageType == "article")
                    temp_vars['pageType'] = pageType =  "quick";
                //var postSlug = temp_vars['postSlug'] = req.query.postSlug;
                //console.log(postSlug,"aaa12313"); return false;                
                let matchKey = matchID+'_'+seriesID;
                common.getScorecard(req, matchFile, matchKey,seriesID,matchID,pageType,otherMatchData).then((allData) => {                    
                        allData = JSON.parse(allData);                        
                        var data = JSON.parse(allData['data']);                        
                        var matchData = allData['matchData'];
                        matchFile = matchData['match_filename'];
                        postId = matchData['post_id'];
                        temp_vars['postId'] = postId;
                        temp_vars['pseudo_value'] = matchData['pseudo_value'];
                        temp_vars['blogUrl'] = "";
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
                        temp_vars['postSlug'] = data['teamfa'].toLowerCase().replace(" ","-")+'-vs-'+data['teamfb'].toLowerCase().replace(" ","-")+'-'+data['matchtype'].toLowerCase()+'-live-cricket-score';
                        if(data[currInning]['Battingteam_id'] == data['teama_id']){
                            teamName = data['teama'].toLowerCase();
                        }else{
                            teamName = data['teamb'].toLowerCase();
                        } 
                            if(pageType == "quick" || pageType == "commentary"){             ``          
                             return new Promise((resolve2, reject3) => {
                                common.getcommentry(req,matchFile,teamName,currInn).then((CommData) => {
                                    //console.log(CommData,"aa");
                                    if(CommData != "noData"){
                                    CommData = JSON.parse(CommData);                                    
                                    }
                                    //CommData['commentry'] = CommData['commentry'].reverse()
                                    temp_vars['commentryData'] = CommData;                            
                                    }).then(function(){                                    
                                        return resolve2();                                        
                                    }).then(function(){
                                     return resolve();
                                    });
                                })
                            }
                            return resolve();
                        })
                    }),            
    
        ]).then(()=>{                      
        postSlug = temp_vars['postSlug'];
        matchID = temp_vars['matchID'];
        seriesID = temp_vars['seriesID'];
        matchFile = temp_vars['matchFile'];
        pageType = temp_vars['pageType'] =  req.query.pageType;        
        if(pageType == "commentary"){
            template = "ballbyballScore";
        }
        else if(pageType == "article"){
            template = "articleConsumption";
        }else
        template = pageType+"score";

        quickUrl = temp_vars['quickUrl'] = constant.SITE_URL+'firstcricket/cricket-live-score/'+postSlug+'-quick/'+seriesID+'/'+matchID+'.html';
        fullUrl = temp_vars['fullUrl'] = constant.SITE_URL+'firstcricket/cricket-live-score/'+postSlug+'-full/'+seriesID+'/'+matchID+'.html';
        commUrl = temp_vars['commUrl'] = constant.SITE_URL+'firstcricket/cricket-live-score/'+postSlug+'-commentary/'+seriesID+'/'+matchID+'.html';        
        //temp_vars['seoData'] = seoData;
        temp_vars['inningArr'] = ['','firstInnings','secondInnings','thirdInnings','fourthInnings'];
        temp_vars['inningText'] = ['','1st Innings','2nd Innings','3rd Innings','4th Innings'];
        temp_vars['deFUrl'] = "https://www.firstpost.com/firstcricket/player-profile/";
        
        var listitem_2 = constant.SITE_URL+'firstcricket/cricket-live-score/';
        
        temp_vars['postId'] = postId;        
        temp_vars['template'] = template;
        temp_vars['constant'] = constant;
        temp_vars['viewpath'] = constant.viewpath;
        temp_vars['device'] = device;
        temp_vars['footer'] = constant.footer;
        temp_vars['common'] = common;        
        temp_vars['matchFile'] = "aaa";
        temp_vars['dateFormat'] = dateFormat;
                
        templateVars = {};
        templateVars = common.assignTempVars(temp_vars);        
        //res.send('I want this string to return to the client');
        res.render(device + '/firstcricket/quick-score-ajax-widget', templateVars); 
        res.end();
    })                    
            //return "amit";
    },

    getScoreStripData : function(req, res) {        
        var temp_vars = [];        
        var matchID = temp_vars['matchID'] =  req.query.matchID;
        var deviceDetails = common.isMobileVar(req);
        const device  = deviceDetails.device;
        const isMobile  = deviceDetails.isMobile;
        var dateFormat = require('dateformat');                
        Promise.all([                                        
            new Promise((resolve, reject2) => {                 
                common.getcricketScores(req,"ajax").then((allData) => {
                    cricketData['liveMatchList'] = allData['liveMatchData'];
                    cricketData['resultMatchList'] = allData['resultMatchData'];
                    cricketData['upcomingMatchList'] = allData['upcomingMatchData'];
                    return resolve();
                })    
            }),
        ]).then(()=>{         
            var temp_vars = [];                          
            temp_vars['liveMatchList'] = cricketData['liveMatchList'];
            temp_vars['resultMatchList'] = cricketData['resultMatchList'];
            temp_vars['upcomingMatchList'] = cricketData['upcomingMatchList'];                        
            temp_vars['dateFormat'] = dateFormat;
            temp_vars['constant'] = constant;
            temp_vars['isMobile'] = isMobile;
            templateVars = {};
            templateVars = common.assignTempVars(temp_vars);  
            if(matchID == "fchome"){                
                res.render('widgets/ajax_scorecard_caraousal', templateVars); 
            }else if(isMobile == 1) {
                res.render('widgets/m-ajax_cricketscore_strip', templateVars); 
            }else{
                res.render('widgets/ajax_cricketscore_strip', templateVars);     
            }              
            res.end();
        })        
    }
}