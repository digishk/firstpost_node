/*
*==================================================================
* Project: FirstCricket 
* Controller: IPL Controller
* Created By: Nitin Mankani
* Note: Please read comments before doing any task. 
        Commented code is only reference.
*=================================================================
*/
const {promisify} = require("util");
const common = appRequire('common_functions');
const constant = appRequire('constant');
var dateFormat = require('dateformat');
/*==================== End of All Modules declaration ====================*/
exports.series = function(req, res) {
    var deviceDetails = common.isMobileVar(req);
    const device = deviceDetails.device;
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
    var iplEventNo = (iplYear == "2018") ? "11" : (iplYear == "2019") ? "12" : "13";
    var tag_name = 'ipl-2021';
    var factbox_tag = 'ipl-factbox';
    var photos_tag = 'ipl-2021-photos';
    var lighterside_tag = 'ipl-2021';
    var podcast_tag = 'ipl-2021-podcast';
    var pgNo = (req.params['pg'] !== undefined) ? req.params['pg'] : 1;
    var pgUrl = constant['SITE_URL'] + 'firstcricket/sports-news/series/' + seriesSlug + '/page/';
    var limit = 10;
    var start = (isNaN(pgNo)) ? '' : ((pgNo == 1) || (pgNo == 0)) ? '0' : limit * (Number(pgNo) - 1);
    var template2 = "seriesHome";
    var pgNoPerPage = 3;
    serverPrefix = '';
    let schema_meta = [];
    let newPostSlug = tags_data_new = targeting = "";
    var showRanking = "yes";
    let pageType = req.params['pageType'];
    var seoData = [];
    var rankingData = [];
    var seriesSlugText = seriesSlug.replace("-", " ");
    var mpageCss = "m-home-ipl.css";
    var pageCss = "home-ipl.css";
    /*==================== End of Declaration of all variables ====================*/
    switch (pageType) {
        case "sports-news":
            seoData['metaTitle'] = seriesSlugText.toUpperCase() + " Latest News and LIVE Updates: Latest IPL " + iplEventNo + " News, Ball by ball Match Score Updates, Commentary, Expert Blogs – Firstcricket, Firstpost";
            seoData['metaDesc'] = seriesSlugText.toUpperCase() + " Latest News and LIVE Score Updates Online - Get IPL " + iplEventNo + " Cricket Breaking News, Latest Match Report, Live Blogs, Ball by ball Match Updates, Cricket Photos, Videos, Expert Blogs, Upcoming Cricket Series News & Alerts only at Firstpost.com.";
            seoData['tags'] = "IPL " + iplYear + " News, Indian Premier League Latest News, IPL " + iplEventNo + " Live News, IPL News";
            seoData['metaKeyword'] = "IPL " + iplYear + " News, Indian Premier League Latest News, IPL " + iplEventNo + " Live News, IPL News";
            seoData['pageUrl'] = constant.SITE_URL + 'firstcricket/sports-news/series/' + seriesSlug + '/';
            breadText = seriesSlugText + " news";
            menuHighlight = "seriesNews";
            targeting = "IPLT20_News";
            showRanking = "no";
            break;
        case "series":
            if(iplYear == "2021"){
                seoData['metaTitle'] = "Indian Premier League 2021, IPL Schedule, Points Table, IPL Team and Players, Live Score";
                seoData['metaDesc'] = "Get IPL 2021 News, Live Match Coverage, photo-galleries, videos on Firstpost. Indian Premier League 2021 Teams, Match Schedule, Players, Points Table, Live Score and More.";
                seoData['tags'] = "IPL, IPL 2021, Indian Premier League, IPL Schedule, IPL Points Table, IPL Live Score";
                seoData['metaKeyword'] = "IPL, IPL 2021, Indian Premier League, IPL Schedule, IPL Points Table, IPL Live Score";
            }else{
                seoData['metaTitle'] = "IPL " + iplYear + ": Indian Premier League LIVE Cricket Score and Updates Online, IPL " + iplEventNo + " Latest News, Match Stats, Highlights, Photos, Videos – FirstCricket, Firstpost";
                seoData['metaDesc'] = "IPL " + iplYear + " LIVE Cricket Score and Latest Updates Online – Stay with FirstCricket for latest IPL news and live updates of all IPL " + iplEventNo + " cricket matches including IPL " + iplEventNo + " schedule, match stats, highlights, points table (fixtures), match results, match timings and venues, photos, videos and more at Firstpost.com.";
                seoData['tags'] = "IPL " + iplYear + ", Indian Premier League, Live News Updates, IPL " + iplEventNo + " Latest News, IPL latest news";
                seoData['metaKeyword'] = "IPL " + iplYear + ", Indian Premier League, Live News Updates, IPL " + iplEventNo + " Latest News, IPL latest news";
            }
            seoData['pageUrl'] = constant.SITE_URL + 'firstcricket/series/' + seriesSlug + '.html';
            if(iplYear == "2021"){
               var template2 = "ipl/home";
            }
            menuHighlight = "seriesHome";
            targeting = "IPLT20_series";
            breadText = seriesSlugText;
            showRanking = "no";
            break;
        case 'points-table':
            seoData['metaTitle'] = "IPL " + iplYear + " Points Table: Indian Premier League Points Table, IPL " + iplEventNo + " Teams Standings and Rankings – FirstCricket, Firstpost";
            seoData['metaDesc'] = "IPL " + iplYear + " Points Table – Find Indian Premier League points table including IPL " + iplEventNo + " teams standings, net run rate, matches won by teams, latest IPL news and live updates online only at Firstpost.com.";
            seoData['tags'] = "IPL " + iplYear + " Points Table, Indian Premier League Points Table, IPL " + iplEventNo + " Teams Standings";
            seoData['metaKeyword'] = "IPL " + iplYear + " Points Table, Indian Premier League Points Table, IPL " + iplEventNo + " Teams Standings";
            var template2 = "ipl/points-table";
            mpageCss = "m-schedule-fc.css";
            pageCss = "schedule-fc.css";
            menuHighlight = "points-table";
            targeting  = "IPLT20_points_table";
            breadText = seriesSlugText + " points table";
            if (iplYear == "2018") {
                seoData['pageUrl'] = constant.SITE_URL + "firstcricket/points-table/series/IPL-2018.html";
            } else {
                seoData['pageUrl'] = constant.SITE_URL + "firstcricket/points-table/series/ipl-" + iplYear + ".html";
            }
            if (iplYear == "2019") {
                temp_vars['iplText'] = "<p>The 12th edition of the Indian Premier League (IPL) kicked off with a clash between defending Chennai Super Kings (CSK) and Royal Challengers Bangalore (RCB) at the MA Chidambaram Stadium in Chennai on 23 March. Eight teams are participating in 2019 IPL including Chennai Super Kings, Royal Challengers Bangalore , Delhi Capitals (DC), Sunrisers Hyderabad (SRH), Mumbai Indians (MI), Kolkata Knight Riders (KKR), Rajasthan Royals (RR) and Kings XI Punjab, who will be fighting for the coveted trophy.<br><br>All eight sides will compete against each other in the league phase. Every side will play seven games at home during the league and 14 in total. The top four teams at the end of league phase will qualify for the playoffs. During the league stage, two points are awarded to a side for a win and one in case of a washout.<br><br>IPL, which began in 2008, has been won by CSK and MI on three occasions. KKR have won the cash-rich league two times while SRH and RR have won the title once. The now-defunct franchise Deccan Chargers won the IPL title in 2009.<br></p>";
            } else if(iplYear == "2020") {
                temp_vars['iplText'] = "<p>The 13th edition of the Indian Premier League (IPL) kicked off with a clash between defending champions Mumbai Indians and Chennai Super Kings (CSK) at the Wankhede Stadium in Mumbai on 29 March. Eight teams are participating in 2019 IPL including Chennai Super Kings, Royal Challengers Bangalore , Delhi Capitals (DC), Sunrisers Hyderabad (SRH), Mumbai Indians (MI), Kolkata Knight Riders (KKR), Rajasthan Royals (RR) and Kings XI Punjab, who will be fighting for the coveted trophy.<br><br>All eight sides will compete against each other in the league phase. Every side will play seven games at home during the league and 14 in total. The top four teams at the end of league phase will qualify for the playoffs. During the league stage, two points are awarded to a side for a win and one in case of a washout. Mumbai Indians have been the most successful IPL team with four trophy wins followed by CSK who have three crowns in their bag. KKR have won the cash-rich league two times while SRH and RR have won the title once. The now-defunct franchise Deccan Chargers won the IPL title in 2009.<br></p>";
            } else {
                temp_vars['iplText'] = "<p>The 14th edition of the Indian Premier League (IPL) kicked off with a clash between defending champions Mumbai Indians and Royal Challengers Bangalore (RCB) at the MA Chidambaram Stadium in Chennai on 9 April. Eight teams are participating in 2021 IPL including Chennai Super Kings, Royal Challengers Bangalore , Delhi Capitals (DC), Sunrisers Hyderabad (SRH), Mumbai Indians (MI), Kolkata Knight Riders (KKR), Rajasthan Royals (RR) and Punjab Kings, who will be fighting for the coveted trophy. All eight sides will compete against each other in the league phase. Every side will play a total of 14 games in the group stage. The top four teams at the end of league phase will qualify for the playoffs. During the league stage, two points are awarded to a side for a win and one in case of a washout. Mumbai Indians have been the most successful IPL team with five trophy wins followed by CSK who have three crowns in their bag. KKR have won the cash-rich league two times while SRH and RR have won the title once. The now-defunct franchise Deccan Chargers won the IPL title in 2009.<br></p>";
            }
            //var rawUrl = "http://xmlns.cricketnext.com/cktnxt/scorecard/standings/standing_"+seriesId+".txt";
            menuHighlight = "points-table";
            break;
        case 'cap-holder':
            var capType = req.params['capType'];
            if (capType == "orange") {
                seoData['metaTitle'] = "Orange Cap " + iplYear + ": IPL Orange Cap Holder, Winners List and Table | Highest Run Scorer of IPL " + iplYear + "";
                seoData['metaDesc'] = "Orange Cap " + iplYear + " - Get Daily update of highest run-scorers of IPL " + iplYear + ". IPL Orange Cap Holder, Orange Cap Winner List.";
                if (iplYear == "2019") {
                    temp_vars['iplText'] = "The Orange Cap is the award for the top run-getter in the Indian Premier League (IPL), an award that is juggled around from one batsman to another as the group stage of the IPL progresses along. It finally is awarded to the batsman with most runs at the end of the tournament.Australian batsman Shaun Marsh won the award in the inaugural edition of the league, and was followed by compatriot Matthew Hayden in 2009 edition. Indian batting icon Sachin Tendulkar won the award in 2010, a season in which he led the Mumbai Indians from the front while stamping his class on the shortest format. India skipper Virat Kohli had bagged the award after an incredible run with the bat in 2016. Chris Gayle (2011 and 2012) and David Warner (2015 and 2017) are the only batsmen in the league to have won the Orange Cap on two different occasions. Kane Williamson had won the prestigious award in the 2018 season, enjoying a consistent run with the bat while handling captaincy duties for the Sunrisers. Who walks away with the IPL 2019 orange cap is a matter of conjecture. With Warner and Steve Smith making their return to the IPL after serving year-long bans, the orange cap in IPL 2019 should make for an exciting contest.";
                } else if (iplYear == "2020") {
                    temp_vars['iplText'] = "The Orange Cap is the award for the top run-getter in the Indian Premier League (IPL), an award that is juggled around from one batsman to another as the group stage of the IPL progresses along. It finally is awarded to the batsman with most runs at the end of the tournament. Australian batsman Shaun Marsh won the award in the inaugural edition of the league, and was followed by compatriot Matthew Hayden in 2009 edition. Indian batting icon Sachin Tendulkar won the award in 2010, a season in which he led the Mumbai Indians from the front while stamping his class on the shortest format. India skipper Virat Kohli had bagged the award after an incredible run with the bat in 2016. David Warner (2015, 2017 and 2019) has donned the Orange cap most times in the IPL, followed by Chris Gayle (2011 and 2012). Kane Williamson had won the prestigious award in the 2018 season, enjoying a consistent run with the bat while handling captaincy duties for the Sunrisers. Who walks away with the IPL 2020 orange cap is a matter of conjecture. With world class batsmen in action along with some exciting youngsters and talented first-timers, the competition for the Orange Cap may well go down the wire in IPL 2020.";
                } else {
                    temp_vars['iplText'] = "The Orange Cap is the award for the top run-getter in the Indian Premier League (IPL), an award that is juggled around from one batsman to another as the group stage of the IPL progresses along. It finally is awarded to the batsman with most runs at the end of the tournament. Australian batsman Shaun Marsh won the award in the inaugural edition of the league, and was followed by compatriot Matthew Hayden in 2009 edition. Indian batting icon Sachin Tendulkar won the award in 2010, a season in which he led the Mumbai Indians from the front while stamping his class on the shortest format. India skipper Virat Kohli had bagged the award after an incredible run with the bat in 2016. David Warner (2015, 2017 and 2019) has donned the Orange cap most times in the IPL, followed by Chris Gayle (2011 and 2012). Kane Williamson had won the prestigious award in the 2018 season, enjoying a consistent run with the bat while handling captaincy duties for the Sunrisers. After Warner in 2019, KL Rahul of Kings XIP Punjab (now Punjab Kings) won it for the first time in 2020, scoring 670 runs from 14 matches. Who walks away with the IPL 2021 orange cap is a matter of conjecture. With world class batsmen in action along with some exciting youngsters and talented first-timers, the competition for the Orange Cap may well go down the wire in IPL 2021.";
                }
            }
            if (capType == "purple") {
                seoData['metaTitle'] = "Purple Cap " + iplYear + ": IPL Purple Cap Holder, Winners List and Table | Leading Wicket Taker of IPL " + iplYear + "      ";
                seoData['metaDesc'] = "Purple Cap " + iplYear + " - Get Daily update of Leading Wicket Taker of IPL " + iplYear + ". IPL purple Cap Holder, purple Cap Winner List " + iplYear + ".";
                if (iplYear == "2019") {
                    temp_vars['iplText'] = "The Purple Cap will be awarded to the bowler with most dismissals at the end of IPL 2019, an award that will pass from one bowler to another as the tournament progresses before settling with the leading wicket-taker at the end of the tournament.Pakistan left-arm pacer Sohail Tanvir had won the award in the inaugural edition of the league in 2008, his 22 wickets playing a key role in Rajasthan Royals’ victorious campaign. The award went to the now-defunct Deccan Chargers’ camp in the next two seasons through RP Singh (2009) and Pragyan Ojha (2010). Sri Lanka pacer Lasith Malinga, who also happens to be the league’s all-time leading wicket-taker, won the Purple Cap for the only time in 2011. Chennai Super Kings’ Dwayne Bravo (2013 and 2015) and Sunrisers Hyderabad’s Bhuvneshwar Kumar (2016 and 2017) are the only bowlers to have won the Purple Cap on two different occasions. Kings XI Punjab’s Andrew Tye had bagged the award in IPL 2018, although his consistent performances with the ball couldn’t prevent his side from finish seventh in the IPL points table. Let us see who bags the IPL 2019 purple cap.";
                } else if (iplYear == "2020") {
                    temp_vars['iplText'] = "The Purple Cap will be awarded to the bowler with most dismissals at the end of IPL 2020, an award that will pass from one bowler to another as the tournament progresses before settling with the leading wicket-taker at the end of the tournament.Pakistan left-arm pacer Sohail Tanvir had won the award in the inaugural edition of the league in 2008, his 22 wickets playing a key role in Rajasthan Royals’ victorious campaign. The award went to the now-defunct Deccan Chargers’ camp in the next two seasons through RP Singh (2009) and Pragyan Ojha (2010). Sri Lanka pacer Lasith Malinga, who also happens to be the league’s all-time leading wicket-taker, won the Purple Cap for the only time in 2011. Chennai Super Kings’ Dwayne Bravo (2013 and 2015) and Sunrisers Hyderabad’s Bhuvneshwar Kumar (2016 and 2017) are the only bowlers to have won the Purple Cap on two different occasions. Kings XI Punjab’s Andrew Tye had bagged the award in IPL 2018, although his consistent performances with the ball couldn’t prevent his side from finish seventh in the IPL points table. Imran Tahir donned the cap in the 2019 edition, taking 26 wickets. Let us see who bags the IPL 2020 purple cap.";
                } else {
                    temp_vars['iplText'] = "The Purple Cap will be awarded to the bowler with most dismissals at the end of IPL 2021, an award that will pass from one bowler to another as the tournament progresses before settling with the leading wicket-taker at the end of the tournament. Pakistan left-arm pacer Sohail Tanvir had won the award in the inaugural edition of the league in 2008, his 22 wickets playing a key role in Rajasthan Royals’ victorious campaign. The award went to the now-defunct Deccan Chargers’ camp in the next two seasons through RP Singh (2009) and Pragyan Ojha (2010). Sri Lanka pacer Lasith Malinga, who also happens to be the league’s all-time leading wicket-taker, won the Purple Cap for the only time in 2011. Chennai Super Kings’ Dwayne Bravo (2013 and 2015) and Sunrisers Hyderabad’s Bhuvneshwar Kumar (2016 and 2017) are the only bowlers to have won the Purple Cap on two different occasions. Kings XI Punjab’s Andrew Tye had bagged the award in IPL 2018, although his consistent performances with the ball couldn’t prevent his side from finish seventh in the IPL points table. Imran Tahir donned the cap in the 2019 edition, taking 26 wickets. While his countryman Kagiso Rabada donned that cap in 2020 with 30 wickets from 17 matches. Let us see who bags the IPL 2021 purple cap.";    
                }
            }
            seoData['pageUrl'] = constant.SITE_URL + "firstcricket/" + capType + "-cap-holder/series/ipl-" + iplYear + ".html";
            var template2 = "ipl/cap-holder";
            mpageCss = "m-schedule-fc.css";
            pageCss = "schedule-fc.css";
            breadText = seriesSlugText + " cap holder";
            menuHighlight = capType;
            targeting = "IPLT20_"+capType+"_cap";
            break;
        case 'team-players':
            var teamName = req.params['teamName'];
            var teamFullName = temp_vars['team_name'] = common.capitalizeEWLetter(teamName.replace(/-/g, " "));
            var teamCapital = teamFullName.match(/\b(\w)/g);
            var teamShortName = teamCapital.join('');
            seoData['metaTitle'] = teamFullName + " Team: IPL " + iplYear + " " + teamShortName + " Players List, Match Playing 11, Full Squad, Captain, Coaches and More - FirstCricket, Firstpost";
            seoData['metaDesc'] = "IPL " + teamFullName + " (" + teamShortName + ") Team " + iplYear + " Players List, Match Playing 11 - Full List of Players in " + teamFullName + " Squad for IPL " + iplYear + ". Get full information of IPL " + teamShortName + " Team, Players List, Captain, Coaches, Squad and more online at Firstpost.com.";
            seoData['tags'] = "IPL " + iplYear + " Teams, Indian Premier League Playing Teams, IPL " + iplEventNo + " Teams, IPL News";
            seoData['metaKeyword'] = "IPL " + iplYear + " Teams, Indian Premier League Playing Teams, IPL " + iplEventNo + " Teams, IPL News";
            if (iplYear == "2018") {
                seoData['pageUrl'] = constant.SITE_URL + "firstcricket/teams/series/IPL-2018.html";
            } else {
                seoData['pageUrl'] = constant.SITE_URL + "firstcricket/teams/" + teamName + "-team-players/series/ipl-" + iplYear + ".html";
            }
            pageCss = "player-fc.css";
            mpageCss = "m-player-fc.css";
            var capType = req.params['capType'];
            var template2 = "ipl/team-page";
            if(teamShortName == 'PK'){
                var team_tag = "ipl-2021-kxip";    
            }else{
                var team_tag = "ipl-2021-"+teamShortName.toLowerCase();
            }
            breadText = teamFullName + " team";
            menuHighlight = "teams";
            targeting = "IPLT20_Teams_"+teamShortName;
            break;
        case 'teams':
            seoData['metaTitle'] = "IPL " + iplYear + " Teams: Indian Premier League Playing XI, Squads and Complete List of Players, IPL " + iplEventNo + " News & Updates Online – FirstCricket, Firstpost";
            seoData['metaDesc'] = "IPL " + iplYear + " Teams – Know more about Indian Premier League Playing XI teams full squads and complete list of players including captains, wicket keepers, bowlers, all-rounders, batsmen in the playing IPL " + iplEventNo + ", latest IPL news and updates online only at Firstpost.com.";
            seoData['tags'] = "IPL " + iplYear + " Teams, Indian Premier League Playing Teams, IPL " + iplEventNo + " Teams, IPL News";
            seoData['metaKeyword'] = "IPL " + iplYear + " Teams, Indian Premier League Playing Teams, IPL " + iplEventNo + " Teams, IPL News";
            if (iplYear == "2018") {
                seoData['pageUrl'] = constant.SITE_URL + "firstcricket/teams/series/IPL-2018.html";
            } else {
                seoData['pageUrl'] = constant.SITE_URL + "firstcricket/teams/series/ipl-" + iplYear + ".html";
            }
            /*if(iplYear != "2018")
                seoData['ampUrl'] = seoData['pageUrl']."/amp";*/
            var template2 = "ipl/all-team";
            mpageCss = "m-schedule-fc.css";
            pageCss = "schedule-fc.css";
            breadText = seriesSlugText + " teams";
            menuHighlight = "teams";
            targeting = "IPLT20_Teams";
            break;
        case "trivia":
            seoData['metaTitle'] = "IPL 2021 Trivia: IPL 14 Trivia, Indian Premier League Cricket News";
            seoData['metaDesc'] = "Get all trivia and news on IPL 2021 only at Firstpost. Read latest cricket news and live updates updates on Indian Premier League (IPL 14) matches including cricket Result, videos, photo and more.";
            seoData['tags'] = "IPL 2021 Trivia, IPL 14 Trivia, Cricket Trivia, Cricket News, Indian Premier League";
            seoData['metaKeyword'] = "IPL 2021 Trivia, IPL 14 Trivia, Cricket Trivia, Cricket News, Indian Premier League";
            seoData['pageUrl'] = constant.SITE_URL + 'firstcricket/trivia/series/ipl-2021.html';
            breadText = "trivia";
            menuHighlight = "trivia";
            var template2 = "ipl/trivia";
            break;    
        default:
            //res.status(404).render('404', {title: "Sorry, page not found", session: req.sessionbo});
            const error_controller = appRequire('error_controller');
            return error_controller.error(req, res);
            break;
    }
    /*
     *==================================================================
     * Create Promise here
     *=================================================================
     */
    Promise.all([
        new Promise((resolve) => {
            clientFetch(serverPrefix + "FP2.0_ipl_ranking_article").then((response) => {
                rankingData = JSON.parse(response);
                resolve()
            })
        }),
        /**** ads integration start here ****/
        new Promise((resolveads) => {
            if (constant.hideJSforEU == 'no') {
                var keyArr = ['fcseriesipl'];
                temp_vars['ads'] = common.getAds(keyArr, device, 'ads_arr_cricket');
                if (typeof temp_vars['ads'] === 'undefined') delete temp_vars['ads'];
            }
            resolveads();
        }),
        /**** ads integration end here ****/
        new Promise((resolve, rej) => {
            common.getTagPageResults(factbox_tag,start,limit,pgNo).then((data) => {
                temp_vars['factbox'] = data;
                resolve();
            }).catch(e => reject(e.message))
        }),
        new Promise((resolve, rej) => {
            common.getTagPageResults(photos_tag,start,limit,pgNo).then((data) => {
                temp_vars['photos_ipl'] = data;
                resolve();
            }).catch(e => reject(e.message))
        }),
        new Promise((resolve, rej) => {
            common.getTagPageResults(lighterside_tag,start,limit,pgNo).then((data) => {
                temp_vars['lighterside'] = data;
                resolve();
            }).catch(e => reject(e.message))
        }),
        new Promise((resolve, rej) => {
            common.getTagPageResults(podcast_tag,start,limit,pgNo).then((data) => {
                temp_vars['podcast'] = data;
                resolve();
            }).catch(e => reject(e.message))
        }),
        new Promise((resolve, rej) => {
            common.getTagPageResults(team_tag,start,limit,pgNo).then((data) => {
                temp_vars['iplTeamData'] = data;
                resolve();
            }).catch(e => reject(e.message))
        }),
        new Promise((resolve) => {
            clientFetch(serverPrefix + "FP2.0_FCricket_RankingsForSeries_"+seriesSlug).then((result) => {
                var seriesData = JSON.parse(result);
                temp_vars['seriesId'] = seriesData['series']['sub_series_ids'];
                temp_vars['iplYear'] = iplYear;
                temp_vars['rankMainData'] = seriesData['main_story'];
                temp_vars['rankOtherData'] = seriesData['related_story'];
                temp_vars['seriesName'] = seriesName = seriesData['series']['series_name'];
                temp_vars['seriesMenu'] = seriesData['series']['series_menu'];
                temp_vars['seriesSlug'] = seriesSlug = seriesData['series']['series_url'];
                tag_name = seriesData['series']['common_tag'];
                var seriesId = temp_vars['seriesId'];
                
                Promise.all([
                    new Promise((resolve, reject) => {
                        common.getTagPageResults(tag_name, start, limit, pgNo).then((data) => {
                            temp_vars['tagData'] = data;
                            temp_vars['solrCnt'] = data['solarCount'];
                            resolve()
                        }).catch(() => {
                            temp_vars['tagData'] = null;
                            res.redirect('/firstcricket');
                            reject()
                        })
                    }),
                    new Promise((resolve, reject) => {
                        const url = "http://xmlns.cricketnext.com/cktnxt/scorecard/standings/standing_" + seriesId + ".txt";
                        common.getRawData(url).then((urlData) => {
                            temp_vars['pointsData'] = JSON.parse(urlData);
                            resolve();
                        }).catch(e => reject(e.message))
                    }),
                    new Promise((resolve,reject) => {
                        const url = "http://xmlns.cricketnext.com/cktnxt/scorecard/teams/squad/2_squad.json";
                        common.getRawData(url).then((urlData) => {
                            temp_vars['teamsData'] = JSON.parse(urlData);
                            resolve();
                        }).catch(e => reject(e.message))
                    }),
                    new Promise((resolve, reject) => {
                        const url = "https://xmlns.cricketnext.com/cktnxt/scorecard/leaderboard/" + seriesId + "_2_stats.json";
                        common.getRawData(url).then((capData) => {
                            try {
                                temp_vars['orangeCap'] = JSON.parse(capData);
                              
                                //console.log(orangeCap['leaderboard']);
                            } catch(e) {
                                temp_vars['orangeCap'] = "no-data";
                            }    
                            resolve();
                        }).catch(e => reject(e.message))
                    }),
                    new Promise((resolve, reject) => {
                        const url = "https://xmlns.cricketnext.com/cktnxt/scorecard/leaderboard/" + seriesId + "_13_stats.json";
                        common.getRawData(url).then((capData) => {
                            try {
                                temp_vars['purpleCap'] = JSON.parse(capData);
                            } catch(e) {
                                temp_vars['purpleCap'] = "no-data";
                            }    
                            resolve();
                        }).catch(e => reject(e.message))
                    })
                ]).then(() => {
                }).catch(e=> console.log(e)) // NOTE: Code was breaking because of unhandled promise
            }).then((res) => {
                resolve()
            }).catch(err => {
                res.redirect('/firstcricket');
            })
        }),
        new Promise((resolve, reject) => {
            common.getTagPageResults(tag_name, start, limit, pgNo).then((data) => {
                
                if(!data) {
                    reject('No Data')
                    return
                }
                
                temp_vars['tagData'] = data;
                temp_vars['solrCnt'] = data['solarCount'];
                resolve();
            })
        }),
        new Promise((resolve) => {
            clientFetch(serverPrefix + "FP_Node_CategoryPageContents_firstcricket").then((result) => {
                temp_vars['latestStories'] = JSON.parse(result);
                resolve()
            })
        }),
        new Promise((resolve) => {
            clientFetch(serverPrefix + "FP2.0_IPLCricket_Trivia").then((result) => {
                temp_vars['trivia'] = JSON.parse(result);
                resolve()
            })
        }),
        new Promise((resolve) => {
            clientFetch(serverPrefix + "FP2.0_IPLCricket_Prediction").then((result) => {
                temp_vars['prediction'] = JSON.parse(result);
                resolve()
            })
        })
    ]).then(() => {
        schema_meta['schema_type'] = ["webpage"];
        temp_vars['liveMatchList'] = cricketData['liveMatchData'];
        temp_vars['resultMatchList'] = cricketData['resultMatchData'];
        temp_vars['upcomingMatchList'] = cricketData['upcomingMatchData'];
        seoData['page_type'] = "main";
        seoData['page_language'] = "en";
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
        breadcrumbsArr[seoData['pageUrl']] = common.capitalizeFLetter(breadText);
        /*
         *==================================================================
         * Get Pagination Data 
         *=================================================================
         */
        temp_vars['pagination'] = common.getPagination(temp_vars['solrCnt'], pgNo, pgUrl, pgNoPerPage, limit);
        /*
         *==================================================================
         * Assign Template Varibles Here
         *=================================================================
         */
        newPostSlug = seoData['metaTitle'].replace(/[^a-zA-Z ]/g, "").split(" ");
        temp_vars['newPostSlug'] = newPostSlug; 
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
        temp_vars['teamFullName'] = teamFullName;
        temp_vars['viewpath'] = constant.viewpath;
        temp_vars['device'] = device;
        temp_vars['isMobile'] = isMobile;
        temp_vars['footer'] = constant.footer;
        temp_vars['tag_name'] = tag_name;
        temp_vars['pgNo'] = pgNo;
        temp_vars['pgUrl'] = pgUrl;
        temp_vars['start'] = start;
        temp_vars['pageName'] = 'firstcricket-ipl';
        temp_vars['template'] = "series";
        temp_vars['capType'] = capType;
        temp_vars['template2'] = template2;
        temp_vars['menuHighlight'] = menuHighlight;
        temp_vars['showRhsScore'] = 'no';
        temp_vars['showRhsResults'] = 'no';
        temp_vars['showRhsOrangeCap'] = 'no';
        temp_vars['showRhsPurpleCap'] = 'no';
        temp_vars['showRanking'] = showRanking;
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

        /*==================== End of assignTempVars() ==============================*/
        /*
         *==================================================================
         * Render View Here only
         *=================================================================
         */
        res.render(device + '/firstcricket/' + template2, templateVars);
        /*==================== End of rendering a view ==============================*/
    }).catch((e) => {
        res.set('location', '/firstcricket');
        res.status(301).send();
    })
}