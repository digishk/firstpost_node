/*
*==================================================================
* Project: Firstpost English
* Controller: FirstCricket Team Listing
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

exports.team = function(req, res, next) {    
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
    var cricMatchLists = {};
    var countries = [];
    let breadcrumbsArr = [];
    var prioTeams = ["Afghanistan","Australia","Bangladesh","England","New Zealand","Pakistan","South Africa","Sri Lanka","West Indies","Zimbabwe","Ireland","Kenya","Scotland","United Arab Emirates"];
    var team_name =  req.params['team_name'];    //request parameter used in routes.js
    //console.log(prioTeams.length);
    /*==================== End of Declaration of all variables ====================*/

    /*
    *==================================================================
    * Create Promise here
    *=================================================================
    */

    Promise.all([            
            clientFetch(serverPrefix + "fp_top_stories_article_data").then((result)=> {
                temp_vars['mostReadArtcles'] = JSON.parse(result);
                //console.log(temp_vars['mostReadArtcles']); 
            }),
            clientFetch(serverPrefix + "cricket_squad").then((result)=> {
                cricketSquad = JSON.parse(result);
                for(count = 0; count < 15; count++){
                    for(const [country_key, country_value] of Object.entries(cricketSquad)){
                        if(country_value['short_name'] != "IND" && country_value['short_name'] != "SLA"){
                            if(country_value['name'].includes(prioTeams[count])){
                            countries[country_key] = country_value;
                            //country_value['fname'] = country_value['name'];
                            //country_value['name'] = country_value['short_name'];
                            }
                        }    
                    }
                }
                temp_vars['countries'] = countries;
                //console.log(temp_vars['countries']);
                if(cricketSquad[team_name]['players'] !== null){
                    temp_vars['players'] = cricketSquad[team_name]['players']['player'];
                    //console.log(temp_vars['players']);
                }    
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
                    var keyArr = ['fcteams'];

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
                    outbrainAdsKeyArr['pageUrl'] = constant.SITE_URL.replace(constant.SITE_URL , 'https://www.firstpost.com/')+'firstcricket/players/'+team_name+'-national-cricket-team';
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
        seoData['pageUrl']   = constant.SITE_URL+'firstcricket/players/'+team_name+'-national-cricket-team';
        seoData['page_name'] = temp_vars['pageName'];
        seoData['page_type'] = "main";
        seoData['page_language'] = "en";
        seoData['canonicalUrl'] = seoData['pageUrl'];

        seoData['metaTitle'] = common.capitalizeFLetter(team_name.replace('-',' ')) + ' National Cricket Team Players: ICC Test Match, ODI and T20 ' + common.capitalizeFLetter(team_name) + ' Cricket Squad, Batsmen and Bowlers Latest News, Full Info, Stats, Photos & Videos Online – FirstCricket, Firstpost';
        seoData['metaDesc']  = common.capitalizeFLetter(team_name) + ' National Cricket Team Players List – Get ICC Test Match, ODI and T20 ' + common.capitalizeFLetter(team_name) + ' Cricket Squad full info, ' + common.capitalizeFLetter(team_name) + ' Batsmen and Bowlers Latest News, live score updates, Stats, Photos and Videos Online at Firstpost.com.';
        
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
        //breadcrumbsArr[listitem_2] = common.capitalizeFLetter("cricket"); //Donot delete , this is for reference
        breadcrumbsArr[seoData['pageUrl']] = common.capitalizeFLetter(team_name.replace('-',' ') + " Squad");
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
        schema_meta['schema_type'] = ["webpage","SportsTeam"];

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
        temp_vars['team_name'] = team_name;
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
        res.render(device + '/firstcricket/teamsListing', templateVars); 
        /*==================== End of rendering a view ==============================*/    
    }).catch((err) => {
        if(err) {
            res.redirect('/firstcricket/players/india-national-cricket-team');
        }
    })
}