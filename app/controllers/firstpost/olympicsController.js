/*
*==================================================================
* Project: Olympics 
* Controller: Olympics Controller
* Created By: Nitin Mankani
* Note: Please read comments before doing any task. 
        Commented code is only reference.
*=================================================================
*/
const {promisify} = require("util");
const common = appRequire('common_functions');
const constant = appRequire('constant');
var dateFormat = require('dateformat');
//console.log("tableTempData" , tableTempData);
var temperoryData = require('./tempData.js');
var tableTempData = temperoryData.tableArr();
var tempDataForIndia = require('./tempDataForIndia.js');
/*==================== End of All Modules declaration ====================*/
exports.olympics = async function(req, res) {
    var tableTempData = await temperoryData.tableArr();
    var tableTempDataForIndia = await tempDataForIndia.tableArr();
    var deviceDetails = common.isMobileVar(req);
    const device = deviceDetails.device;
    // device="mobile";
    const isMobile = deviceDetails.isMobile;
    /*
     *==================================================================
     * Declare All the Varibles Here only
     *=================================================================
     */
    //console.log(req.params,"request"); return false;
    var client = req.app.get('client');
    const clientFetch = promisify(client.get).bind(client); // now getAsync is a promisified version of client.get:
    let shareArr = [];
    var temp_vars = [];
    let breadcrumbsArr = [];
    var iplYear = req.params['year'];
    var seriesSlug = "ipl-" + iplYear; //request parameter used in routes.js
    var factbox_tag = 'firstpost-profiles';
    var latestNewsTag= 'tokyo-olympics-2020';

    var factbox_explainer_tag = 'tokyo-olympics-2020-explained';
    var firstpost_profiles = 'firstpost-profiles';
    var photos_tag = 'olympics-2020-photos';
    var videos_tag = 'firstpost-in-tokyo';
    var pgNo = (req.params['pg'] !== undefined) ? req.params['pg'] : 1;
    var pgUrl = constant['SITE_URL'] + 'firstcricket/sports-news/series/' + seriesSlug + '/page/';
    var limit = 9;
    var start = (isNaN(pgNo)) ? '' : ((pgNo == 1) || (pgNo == 0)) ? '0' : limit * (Number(pgNo) - 1);
    var template2 = "olympics-home";
    var pgNoPerPage = 3;
    serverPrefix = '';
    let schema_meta = [];
    let newPostSlug = tags_data_new = targeting = "";
    let pageType = req.params['pageType'];
    var seoData = [];
    var rankingData = [];
    var quizData = [];
    var playerSlider = [];
    var seriesSlugText = seriesSlug.replace("-", " ");
    var mpageCss = "m-home-ipl.css";
    var pageCss = "fp-olympics.css";

    /*==================== End of Declaration of all variables ====================*/
    switch (pageType) {
        case "photos":
            seoData['metaTitle'] = "Tokyo Olympics 2020 Image: Olympics Games Latest Photos, Schedules, Fixtures, Points Table  Firstcricket";
            seoData['metaDesc'] = "Tokyo Olympic Games 2020 Image - Get Live Olympic Games Photos, about Olympic games  Schedule, results, fixtures, highlights, and all the details Photos and Videos Gallery Online at Firstcricket.";
            seoData['tags'] = "olympic games image, olympic game picture, olympic images free, olympic games names with pictures, olympic photos,olympic game picture,Olympic Games Pictures,Olympics Photo Gallery,olympic games latest news, olympic games updates";
            seoData['metaKeyword'] = "olympic games image, olympic game picture, olympic images free, olympic games names with pictures, olympic photos,olympic game picture,Olympic Games Pictures,Olympics Photo Gallery,olympic games latest news, olympic games updates";
            seoData['pageUrl'] = constant.SITE_URL + 'sports/olympics/photos';
            //breadText = "trivia";
            //menuHighlight = "trivia";
            var template2 = "olympics-photos";
            targeting = "Olympics_Photos";
            break;
        case "videos":
            seoData['metaTitle'] = "Tokyo Olympics 2020 videos: Olympics Games Latest Videos, Schedules, Events, Points Table  Firstcricket";
            seoData['metaDesc'] = "Tokyo Olympic 2020 Videos - Get every popular moment of the Olympic events to watch videos all the match  on-demand via the Olympic Live Summer Olympics topics Series at Firstcricket.";
            seoData['tags'] = "olympic games Videos, olympic game Videos, olympic Videos, olympic Videos, Olympic Videos Schedule, Olympic Videos events, where to watch olympic games, Summer Olympics 2020 Videos, How can I watch the Olympics, When are the Olympics, Summer Olympic Sports";
            seoData['metaKeyword'] = "olympic games Videos, olympic game Videos, olympic Videos, olympic Videos, Olympic Videos Schedule, Olympic Videos events, where to watch olympic games, Summer Olympics 2020 Videos, How can I watch the Olympics, When are the Olympics, Summer Olympic Sports";
            seoData['pageUrl'] = constant.SITE_URL + 'sports/olympics/videos';
            //breadText = "trivia";
            //menuHighlight = "trivia";
            //var template2 = "ipl/trivia";
            var template2 = "olympics-videos";
            targeting = "Olympics_Videos";
            break;   
        case "games":
            seoData['metaTitle'] = "Summer Olympic Games: Summer Olympic Sports, Medals, Results & Latest News";
            seoData['metaDesc'] = "Summer Olympic Games: The Olympic Games are an international sports festival, events and where to watch at Firstcricket";
            seoData['tags'] = "Summer Olympic Games, olympic games list, olympic games history, olympic games information, Summer Olympic Sports, Olympic Games Locations, Olympic Games Winners";
            seoData['metaKeyword'] = "Summer Olympic Games, olympic games list, olympic games history, olympic games information, Summer Olympic Sports, Olympic Games Locations, Olympic Games Winners";
            seoData['pageUrl'] = constant.SITE_URL + 'sports/olympics/games';
            var template2 = "olympics-games";
            targeting = "Olympics_Games";
            break;
        case "schedule":
            seoData['metaTitle'] = "Olympics Schedule Today, Olympic Games Tokyo 2020, Dates, Time, Fixtures, Athletes";
            seoData['metaDesc'] = "Tokyo Olympics 2020 India Schedule to be held from 23 July to 8 August 2021 in Tokyo,Events, dates, time, fixtures, athletes, details and all you need to know at Firstpost";
            seoData['tags'] = "Tokyo Olympics India Schedule, Tokyo Olympics, women s singles semi-finals,women s semi-finals,tokyo olympics 2021 schedule,tokyo olympics 2021,Tokyo Olympics,Tokyo 2020,Olympics 2021 schedule,olympics,India Olympics schedule 2020,India at Tokyo Olympics,olympics schedule today";
            seoData['metaKeyword'] = "Tokyo Olympics India Schedule, Tokyo Olympics, women s singles semi-finals,women s semi-finals,tokyo olympics 2021 schedule,tokyo olympics 2021,Tokyo Olympics,Tokyo 2020,Olympics 2021 schedule,olympics,India Olympics schedule 2020,India at Tokyo Olympics,olympics schedule today";
            seoData['pageUrl'] = constant.SITE_URL + 'sports/olympics/schedule';
            var template2 = "olympics-schedule";
            targeting = "Olympics_Schedule";
            break;    
        case "medal-tally":
            seoData['metaTitle'] = "Tokyo Olympics: 2020 Olympics Medals Tally, Table Predictions & Latest News";
            seoData['metaDesc'] = "2020 Olympic Medal Table Predictions, follow the best athletes in the world and India to find out who won the most gold, silver and bronze medals, details and all you need to know on Firstpost";
            seoData['tags'] = "Olympic medal table predictions,olympic medal table 2020, olympics 2020 medal table, olympic medal tally 2021, olympic medals 2020, Tokyo Olympics Latest News";
            seoData['metaKeyword'] = "Olympic medal table predictions,olympic medal table 2020, olympics 2020 medal table, olympic medal tally 2021, olympic medals 2020, Tokyo Olympics Latest News";
            seoData['pageUrl'] = constant.SITE_URL + 'sports/olympics/medal-tally';
            var template2 = "olympics-medaltally";
            targeting = "Olympics_Medal";
            break;
        case "history":
            seoData['metaTitle'] = "Tokyo Olympics 2020: Olympics Games Latest News, Schedules, Fixtures, Points Table, Match Report & Analysis - Firstcricket";
            seoData['metaDesc'] = "Tokyo Olympic Games 2020 - Get Live Olympic Games Scores, schedule, results, fixtures, highlights, and all the details Live Blogs & Expert Analysis, Opening Ceremony, Photos and Videos Gallery Online at Firstcricket.";
            seoData['tags'] = "Olympic Games highlights, Olympic Games fixtures, Olympic Games schedule,live cricket score india,live match today,live match score, Olympic live score india, Olympic Games photos, Olympic Games, olympics schedule, opening ceremony, olympics latest news";
            seoData['metaKeyword'] = "Olympic Games highlights, Olympic Games fixtures, Olympic Games schedule,live cricket score india,live match today,live match score, Olympic live score india, Olympic Games photos, Olympic Games, olympics schedule, opening ceremony, olympics latest news";
            seoData['pageUrl'] = constant.SITE_URL + 'sports/olympics/history';
            var template2 = "olympics-history";
            targeting  = "Olympics_History";
            break;
        default:
            seoData['metaTitle'] = "Tokyo Olympics 2020: Olympics Games Latest News, Schedules, Fixtures, Points Table, Match Report & Analysis - Firstcricket";
            seoData['metaDesc'] = "Tokyo Olympic Games 2020 - Get Live Olympic Games Scores, schedule, results, fixtures, highlights, and all the details Live Blogs & Expert Analysis, Opening Ceremony, Photos and Videos Gallery Online at Firstcricket.";
            seoData['tags'] = "Olympic Games highlights, Olympic Games fixtures, Olympic Games schedule,live cricket score india,live match today,live match score, Olympic live score india, Olympic Games photos, Olympic Games, olympics schedule, opening ceremony, olympics latest news";
            seoData['metaKeyword'] = "Olympic Games highlights, Olympic Games fixtures, Olympic Games schedule,live cricket score india,live match today,live match score, Olympic live score india, Olympic Games photos, Olympic Games, olympics schedule, opening ceremony, olympics latest news";
            seoData['pageUrl'] = constant.SITE_URL + 'sports/olympics';
            var template2 = "olympics-home";
            targeting  = "Olympics_Home";
            break;
    }

    
    /*
     *==================================================================
     * Create Promise here
     *=================================================================
     */
    Promise.all([
        new Promise((resolveads) => {
            if (constant.hideJSforEU == 'no') {
                var keyArr = ['fpcatsports'];
                temp_vars['ads'] = common.getAds(keyArr, device, 'ads_arr');
                if (typeof temp_vars['ads'] === 'undefined') delete temp_vars['ads'];
            }
            resolveads();
        }),
        new Promise((resolve) => {
            clientFetch(serverPrefix + "FP2.0_Olympics2021_Quiz").then((response) => {
                quizData = JSON.parse(response);
                resolve()
            })
        }),
        new Promise((resolve) => {
            clientFetch(serverPrefix + "FP2.0_olympics_ranking_article").then((response) => {
                rankingData = JSON.parse(response);
                // return res.status(200).json(rankingData);
                resolve()
            })
        }),new Promise((resolve) => {
            clientFetch(serverPrefix + "topic_list_cat_new_smarty2.0_1069_olympicsall_0_90").then((response) => {
                playerSlider = JSON.parse(response);
                //console.log('playerSlider=> ',playerSlider.result);
                resolve()
            })
        }),
        /**** ads integration end here ****/
        new Promise((resolve, rej) => {
            common.getTagPageResults(factbox_tag,start,limit,pgNo).then((data) => {
                temp_vars['factbox'] = data;
               
                resolve();
            }).catch(e => reject(e.message))
        }),
        new Promise((resolve, rej) => {
            common.getTagPageResults(latestNewsTag,start,limit,pgNo).then((data) => {
                temp_vars['latestNewsData'] = data;
              
                resolve();
            }).catch(e => reject(e.message))
        }),
        new Promise((resolve, rej) => {
            common.getTagPageResults(factbox_explainer_tag,start,limit,pgNo).then((data) => {
                temp_vars['factbox_explainers'] = data;
                // console.log("data_explains",data);
                resolve();
            }).catch(e => reject(e.message))
        }),

        new Promise((resolve, rej) => {
            common.getTagPageResults(photos_tag,start,limit,pgNo).then((data) => {
                temp_vars['photos_olympics'] = data;
                resolve();
            }).catch(e => reject(e.message))
        }),
        new Promise((resolve, rej) => {
            common.getTagPageResults(firstpost_profiles,start,limit,pgNo).then((data) => {
                temp_vars['Tfirstpost-profiles'] = data;
                // console.log("firstpost-profiles",data);
                resolve();
            }).catch(e => reject(e.message))
        }),
        new Promise((resolve, rej) => {
            common.getTagPageResults(videos_tag,start,limit,pgNo).then((data) => {
                temp_vars['videos_olympics'] = data;
                resolve();
            }).catch(e => reject(e.message))
        }),
        new Promise((resolve, rej) => {
            url = "https://xmlns.cricketnext.com/cktnxt/scorecard/olympics/32_medals_tally.json";
            common.getRawData(url).then((result) => {
                try {
                        temp_vars['medalData'] = JSON.parse(result);
                        //console.log(temp_vars['medalData']['medals_tally']);
                    } catch(e) {
                        temp_vars['medalData'] = "no-data";
                        //console.log(e,"error");
                    }
                resolve();
            }).catch(e => console.log(e))
        })
    ]).then(() => {
        //console.log('ads=> ',temp_vars['ads']);
        schema_meta['schema_type'] = ["webpage"];
        seoData['page_type'] = "main";
        seoData['page_language'] = "en";
        seoData['ogImg'] = seoData['twitImg'] = "https://www.firstpost.com/wp-content/uploads/2020/06/tokyo-olympics-2020-AP-1024.jpg";
        var listitem_2 = constant.SITE_URL + 'firstcricket/';
        breadcrumbsArr[constant.SITE_URL] = "Home";
        breadcrumbsArr[listitem_2] = common.capitalizeFLetter("cricket"); //Donot delete , this is for reference
        var listitem_3 = constant.SITE_URL + "firstcricket/series/ipl-" + iplYear + ".html";
        breadcrumbsArr[listitem_3] = "IPL " + iplYear; //Donot delete , this is for reference
        if (pageType == "sports-news") {
            var listitem_4 = temp_vars['seriesSlug'];
            breadcrumbsArr[listitem_4] = common.capitalizeFLetter(seriesSlugText);
        }
        if (pageType == "team-players") {
            var listitem_5 = constant.SITE_URL + "firstcricket/teams/series/ipl-" + iplYear + ".html";
            breadcrumbsArr[listitem_5] = "IPL " + iplYear + " Teams";
            schema_meta['schema_type'] = ["webpage", "SportsTeam"];
        }
        //breadcrumbsArr[seoData['pageUrl']] = common.capitalizeFLetter(breadText);
        /*
         *==================================================================
         * Get Pagination Data 
         *=================================================================
         */
        temp_vars['pagination'] = common.getPagination(temp_vars['solrCnt'], pgNo, pgUrl, pgNoPerPage, limit);


        var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
        temp_vars['url'] = fullUrl
        temp_vars['urlToCheck']= "http://" + constant.HOST_NAME_PORT + "/sports/olympics/games"

        /*
         *==================================================================
         * Assign Template Varibles Here
         *=================================================================
         */
         const transform = (data) => {
            const formatedData = []
            data.question.forEach(q => {
              formatedData.push({question: q, options: [], correctOption: null})
            })
            const options = Object.keys(data).filter(key => key.includes('option_'))
            options.forEach(optionKey => {
              data[optionKey].forEach((option, i) => {
              formatedData[i].options.push(option)
            })
            })
            data.correct_option.forEach((correct,i) => {
              formatedData[i].correctOption = correct
            })
            return formatedData
          }
          
    
        let monthArr = []
         for (let i = 1; i <= 31; i++) {
             var data = {month: "JUL",day:"23"}
            i > 22 ? (data.day = `${i}`, monthArr.push(data)) : i < 9 ? (data={month:"AUG",day:`${i}`},monthArr.push(data)) : null
         }
         monthArr.sort(function(a,b){
            var allMonths = ['Jan','Feb','Mar', 'Apr','May','Jun','JUL','AUG','Sep','Oct','Nov','Dec'];

            return allMonths.indexOf(a.month) - allMonths.indexOf(b.month);
        });
        var tableArr= []

        for (let i = 1; i <= 12; i++) {
            let data= {sport:"Shooting",event:"10m Air Rifle Mixed Team",start_time:"7.30",venue:"tokyo"}
            tableArr.push(data);
        }
        let monthArrMobile = []
         monthArr.map((e)=>{
             let data = {date:`${e.month} ${e.day},2021`}
             monthArrMobile.push(data)
         })
        //  console.log("monthArr", monthArr ,monthArr.length)
        // monthArr.splice(-14);
        let tempData = [{
            header:monthArr,
            content: tableTempData,
            mheader: monthArrMobile
        }];
        let transformData = transform(quizData);

        //console.log('data=> ',playerSlider);
        newPostSlug =  seoData['metaTitle'].replace(/[^a-zA-Z ]/g, "").split(" ");
        temp_vars['schedule_olympics'] = tempData;
        temp_vars['schedule_olympics_india'] = tableTempDataForIndia;
        temp_vars['quizData'] = quizData;
        temp_vars['playerSlider'] = playerSlider.result;
        temp_vars['transformData'] = transformData;
        temp_vars['newPostSlug'] = newPostSlug; 
        temp_vars['device'] = device;
        seoData['canonicalUrl'] = seoData['pageUrl'];
        schema_meta['metaTitle'] = seoData['metaTitle'];
        schema_meta['metaDesc'] = seoData['metaDesc'];
        schema_meta['contentUrl'] = seoData['pageUrl'];
        schema_meta['tags'] = seoData['metaKeyword'];
        //console.log(schema_meta,"Schema");
        shareArr['metaTitle'] = seoData['metaTitle'];
        shareArr['metaDesc'] = seoData['metaDesc'];
        schema_meta['flag'] = 0;
        temp_vars['schema_meta'] = schema_meta;
        temp_vars['shareArr'] = shareArr;
        temp_vars['constant'] = constant;
        temp_vars['common'] = common;
        temp_vars['dateFormat'] = dateFormat;
        temp_vars['seoData'] = seoData;
        temp_vars['targeting'] = targeting;
        temp_vars['viewpath'] = constant.viewpath;
        //temp_vars['device'] = 'desktop';
        temp_vars['isMobile'] = isMobile;
        temp_vars['footer'] = constant.footer;
        temp_vars['pgNo'] = pgNo;
        temp_vars['pgUrl'] = pgUrl;
        temp_vars['start'] = start;
        temp_vars['pageName'] = 'firstpost-olympics';
        temp_vars['template'] = "series";
        temp_vars['template2'] = template2;
        //temp_vars['menuHighlight'] = menuHighlight;
        temp_vars['showRhsScore'] = 'no';
        temp_vars['showRhsResults'] = 'no';
        temp_vars['showRhsOrangeCap'] = 'no';
        temp_vars['showRhsPurpleCap'] = 'no';
        temp_vars['rankingData'] = rankingData;
        temp_vars['seriesSlug'] = seriesSlug;
        temp_vars['breadcrumbsArr'] = breadcrumbsArr;
        temp_vars['otherFirstPaintCss'] = 'firstpaint-fc';
        temp_vars['mobilePageCss'] = constant.SITE_URL + 'static/css/' + mpageCss;
        temp_vars['desktopPageCss'] = constant.SITE_URL + 'static/css/' + pageCss;
        temp_vars['desktopCricJs'] = constant.SITE_URL + 'static/js/main-fc.js';
        temp_vars['mobileCricJs'] = constant.SITE_URL + 'static/js/main-fc.js';
        temp_vars['active_level2_nav_slug'] = "sports";
        temp_vars['level3_nav_slug'] = "section~sports";
        temp_vars['active_level3_nav_slug'] = "cricket";
        temp_vars['level4_nav_slug'] = "section~sports~cricket";
        temp_vars['active_level4_nav_slug'] = seriesSlug;
        templateVars = {};
        templateVars = common.assignTempVars(temp_vars); 
        // console.log("======================================================templateVars",templateVars); 
        // res.status(200).json(templateVars);

        /*==================== End of assignTempVars() ==============================*/
        /*
         *==================================================================
         * Render View Here only
         *=================================================================
         */
        res.render('desktop/microsites/' + template2, templateVars);
        /*==================== End of rendering a view ==============================*/
    })
}