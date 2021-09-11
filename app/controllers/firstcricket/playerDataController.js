/*
*==================================================================
* Project: Firstpost English
* Controller: FirstCricket Players Info
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

exports.player = function(req, res, next) {    
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
    var dob = '';
    var playerId = req.params['player_id'];
    //console.log(playerId);
    var tag_name = req.params['player_name'];
    var cricMatchLists = {};
    let breadcrumbsArr = [];
    
    var pgNo = 1;
    var limit = 3;
    var start = 0;
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
            new Promise((resolve, rej) => {
                common.getPlayerData(req,playerId).then((playerData) => {
                
                    temp_vars['playerData'] = JSON.parse(playerData);
                    team_name = temp_vars['playerData']['profile']['team'];
                    dob = temp_vars['playerData']['profile']['dob'];
                                 
                age = Date.parse(dob);
                diffAge = Date.now() - age;
                ageDate = new Date(diffAge);
                //console.log(ageDate);
                temp_vars['currentYear'] = Math.abs(ageDate.getUTCFullYear() - 1970);
                temp_vars['currentMonth'] = Math.abs(ageDate.getUTCMonth());
                temp_vars['currentDay'] = Math.abs(ageDate.getUTCDate());
                //console.log(currentYear);
                //console.log(currentMonth);
                //console.log(currentDay);
                resolve();
                }).catch((err) => {
                    res.redirect('/firstcricket/players/india-national-cricket-team');
                });
            }),
            new Promise((resolve, rej) => {
                common.getTagPageResults(tag_name,start,limit,pgNo).then((data) => {
                temp_vars['tagData'] = data;
                //console.log(temp_vars['tagData']);
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
                    var keyArr = ['fcplayers'];

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
                    outbrainAdsKeyArr['pageUrl'] = constant.SITE_URL.replace(constant.SITE_URL , 'https://www.firstpost.com/')+'firstcricket/player-profile/'+tag_name+'-'+playerId;
                    if(isMobile == 1){
                       outbrainAdsKeyArr['adsSlot'] = ['MB_2'];
                    }else{
                       outbrainAdsKeyArr['adsSlot'] = ['AR_2'];
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
        seoData['pageUrl']   = constant.SITE_URL+'firstcricket/player-profile/'+tag_name+'-'+playerId;
        seoData['page_name'] = temp_vars['pageName'];
        seoData['page_type'] = "main";
        seoData['page_language'] = "en";
        seoData['canonicalUrl']   = seoData['pageUrl'];

        seoData['metaTitle'] = common.capitalizeFLetter(tag_name.replace('-',' ')) + ' Profile: ' + team_name + ' Cricket Team Player, Latest News, ICC Ranking, Age, Full Career Info, Stats, Photos & Videos Online – FirstCricket, Firstpost'; 
        seoData['metaDesc']  = common.capitalizeFLetter(tag_name.replace('-',' ')) + ' ' + common.capitalizeFLetter(tag_name.replace('-',' ')) + ' Player Full Profile – Get ' + common.capitalizeFLetter(tag_name.replace('-',' ')) + ' Latest News, Photos, Videos Online at Firstpost.com. Find ' + common.capitalizeFLetter(tag_name.replace('-',' ')) + ' ICC ranking, Stats, Individual Records, Biography, Records including Centuries, Runs, Wickets and all about ' + common.capitalizeFLetter(tag_name.replace('-',' ')) + '.';
        
        //temp_vars['metaData'] = common.getMetaHtml(seoData);
        temp_vars['seoData'] = seoData;
        /*
        *==================================================================
        * Assign Template Varibles Here
        *=================================================================
        */
        //console.log(temp_vars['upcomingMatchList']," ddd live list...."); return false;
        var listitem_2 = constant.SITE_URL+'firstcricket/';
        breadcrumbsArr[constant.SITE_URL] = "Home";
        breadcrumbsArr[listitem_2] = common.capitalizeFLetter("players"); //Donot delete , this is for reference
        breadcrumbsArr['active'] = common.capitalizeFLetter(tag_name.replace('-', " "));
        temp_vars['breadcrumb'] = common.getSchema(breadcrumbsArr,["breadcrumbs"],0);
        temp_vars['organisation'] = common.getSchema('',["organisation"],0);
        temp_vars['website'] = common.getSchema('',["website"],0);
        temp_vars['breadcrumbsArr'] = breadcrumbsArr;

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
        schema_meta['schema_type'] = ["webpage","person"];

        schema_meta['flag'] = 0;
        temp_vars['schema_meta'] = schema_meta;

        temp_vars['constant'] = constant;
        temp_vars['viewpath'] = constant.viewpath;
        temp_vars['device'] = device;
temp_vars['isMobile'] = isMobile;
        temp_vars['footer'] = constant.footer;
        temp_vars['common'] = common;
        temp_vars['pageName'] = 'firstcricket-players';
        temp_vars['otherFirstPaintCss'] = 'firstpaint-fc';
        temp_vars['desktopFCpaintCss'] = constant.SITE_URL+'static/css/firstpaint-fc.css';        
        temp_vars['mobileFCpaintCss'] = constant.SITE_URL+'static/css/m-firstpaint-fc.css';        
        temp_vars['desktopCricJs'] = constant.SITE_URL+'static/js/main-fc.js';
        temp_vars['mobileCricJs'] = constant.SITE_URL+'static/js/main-fc.js';
        temp_vars['dateFormat'] = dateFormat;
        temp_vars['showRhsScore'] = 'yes';
        temp_vars['showRhsResults'] = 'no';
        temp_vars['l2navbar'] = 'yes';
        temp_vars['seoData'] = seoData;
        temp_vars['tag_name'] = tag_name;
        temp_vars['template'] = "players";
        temp_vars['active_level2_nav_slug'] = "sports";
temp_vars['level3_nav_slug'] = "section~sports";
        temp_vars['active_level3_nav_slug'] = "cricket";
        temp_vars['level4_nav_slug'] = "section~sports~cricket";
        temp_vars['active_level4_nav_slug'] = "players";
        temp_vars['mobilePageCss'] = constant.SITE_URL+'static/css/m-player-fc.css';
        temp_vars['desktopPageCss'] = constant.SITE_URL+'static/css/player-fc.css';
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
        res.render(device + '/firstcricket/playerInfo', templateVars); 
        /*==================== End of rendering a view ==============================*/    
    })
}