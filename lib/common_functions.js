const {promisify} = require("util");
const constant = appRequire('constant');
const http = require('http');
const fetch = require('node-fetch');
const convert = require('xml-js');
//const CurlRequest = require('curl-request');
var xml2js = require('xml2js');
var ltrim = require( 'ltrim' );
var rtrim = require( 'rtrim' );
var striptags = require('striptags');
var Akamai = require('akamai-auth-token');
//var crypto = require('crypto');
/*exports.getMenus = function() { 
    var menus = {};
    menus['mainMenu'] = {
        "arts-culture": {
            'name': "Arts & culture",
            'title': "Arts & culture News, Latest Arts & culture News India, Top Arts & culture Headlines, Current Affairs Politics - Firstpost",
            'body': "Firstpost provides the latest politics news india, today's politics news, current affairs politics, indian politics news india, top politics news, latest news in indian politics",
        },
        "sports": {
            'name': "Sports",
            'title': "Latest Sports News, Live Cricket Sports News, Today's India Sports News, Score, Updates and Analysis - Firstpost",
            'body': "Firstpost provides the latest sports news India, sports event, cricket & football news, current match scores, commentary and updates",
        },
        "firstcricket": {
            'name': "Cricket",
            'title': "Firstcricket: Cricket News, Live Cricket Scores, Cricket Live News, Latest Match Updates Online",
            'body': "Firstcricket: coverage of all latest cricket news, cricket live updates and cricket series including cricket match schedule, photos, videos and more only on Firstpost.com/firstcricket/",
        },
        "health" : {
            'name': "Health",
            'title' : "Health News, Latest Health, Lifestyle and Fitness Tips, Medical Research, Trending Articles India, Disease, Nutrition – Firstpost",
            'body' : 'Our expert’s and professionals at Firstpost provides the latest health news, lifestyle and fitness tips, medical research, trending articles India, disease and nutrition tips online.',
        },
        "lifestyle" : {
            'name': "Lifestyle",
            'title' : "lifestyle News, Latest News in lifestyle, Latest Breaking News Lifestyle, Indian States and Cities Headlines - Firstpost",
            'body' : "Firstpost provides Latest News in India, Live News India, India Breaking News, today's India news, Top headlines of India.",
        },
        "entertainment" : {
            'name' : "Entertainment",
            'title' : 'Story in Images, Photos of Bollywood Stars, Celebrities Pictures, Models, Politicians - Firstpost',
            'body' : 'Firstpost provides Latest news in pictures. Top photo news gallery from around the world, covering a variety of topics politics, current events/affairs, celebrities, Bollywood, sports and more',
        },
        "opinion" : {
            'name' : "Opinion",
            'title' : 'Opinion in Images, Photos of Bollywood Stars, Celebrities Pictures, Models, Politicians - Firstpost',
            'body' : 'Firstpost provides Latest news in pictures. Top photo news gallery from around the world, covering a variety of topics politics, current events/affairs, celebrities, Bollywood, sports and more',
        },
        "fashion-trends" : {
            'name' : "Fashion & Trends",
            'title' : 'Story in Images, Photos of Bollywood Stars, Celebrities Pictures, Models, Politicians - Firstpost',
            'body' : 'Firstpost provides Latest news in pictures. Top photo news gallery from around the world, covering a variety of topics politics, current events/affairs, celebrities, Bollywood, sports and more',
        },
        "photos" : {
            'name' : "Photos",
            'title' : 'Story in Images, Photos of Bollywood Stars, Celebrities Pictures, Models, Politicians - Firstpost',
            'body' : 'Firstpost provides Latest news in pictures. Top photo news gallery from around the world, covering a variety of topics politics, current events/affairs, celebrities, Bollywood, sports and more',
        },
        "videos" : {
            'name' : "Videos",
            'title' : 'Firstpost Videos: Latest Political Video, Sports Video, Bollywood, Business, World and Politics Video',
            'body' : 'Latest News Video -  Get Top Political News Video, Today&#039;s Sports Video, Latest Bollywood Videos, Top Business News Video, World News and Politics Videos at Firstpost.com',
        },
        "politics" : {
            'name' : "politics",
            'title' : 'Firstpost politics: Latest Political Video, Sports Video, Bollywood, Business, World and Politics Video',
            'body' : 'Latest News politics -  Get Top Political News Video, Today&#039;s Sports Video, Latest Bollywood Videos, Top Business News Video, World News and Politics Videos at Firstpost.com',
        },
        "india" : {
            'name' : "india",
            'title' : 'Firstpost india: Latest india Video, Sports Video, Bollywood, Business, World and Politics Video',
            'body' : 'Latest News india -  Get Top india News Video, Today&#039;s Sports Video, Latest Bollywood Videos, Top Business News Video, World News and Politics Videos at Firstpost.com',
        },
        "world" : {
            'name' : "world",
            'title' : 'Firstpost world: Latest world Video, Sports Video, Bollywood, Business, World and Politics Video',
            'body' : 'Latest News world -  Get Top world News Video, Today&#039;s Sports Video, Latest Bollywood Videos, Top Business News Video, World News and Politics Videos at Firstpost.com',
        },
        "business" : {
            'name' : "business",
            'title' : 'Firstpost business: Latest business Video, Sports Video, Bollywood, Business, business and Politics Video',
            'body' : 'Latest News business -  Get Top business News Video, Today&#039;s Sports Video, Latest Bollywood Videos, Top Business News Video, World News and Politics Videos at Firstpost.com',
        },
        "movie-reviews" : {
            'name' : "Movie Reviews",
            'title' : "Bollywood Movies Reviews | Latest Movie Review of Bollywood, Hollywood, Tamil and Regional Movies",
            'body' : "Latest Movie Reviews: Check out movie reviews of Bollywood, Hollywood and Regional movies including critic reviews, audience reviews and more at Firstpost.",
        },
        "buzz-patrol" : {
            'name' : "Buzz Patrol",
            'title' : "Bollywood & Hollywood News | Celebrity Gossips | Controversy | Interviews - Firstpost",
            'body' : "Check out latest news from Bollywood & Hollywood at Firstpost. The trending portal for all Bollywood celebrities gossips, TV serials updates, top celebrity controversy & interviews.",
        },
        "bollywood" : {
            'name' : "Bollywood",
            'title' : "Bollywood News | Bollywood Celebrity Gossip | Controversy | Interviews - Firstpost",
            'body' : "Read latest Bollywood news & celebrities gossip at Firstpost. The leading portal for Bollywood action including TV serials updates, top celebrity photos, controversy & interviews.",
        },
        "hollywood" : {
            'name' : "Hollywood",
            'title' : "Hollywood News | Hollywood Celebrity Gossip & Trending Stories | Controversy | Interviews",
            'body' : "Check out latest Hollywood news & celebrity gossips at Firstpost. The leading portal for all Hollywood action including TV serials updates, top celebrity photos, trending stories, controversy, interviews and more.",
        },
        "south-indian-movies" : {
            'name' : "South Indian Movies",
            'title' : "South Indian Movies News | Tamil Movies News, Reviews, Celebrity Gossip | Interviews",
            'body' : "Check out latest South Indian Movies news, reviews & celebrity gossips at Firstpost. The leading portal for Tollywood & Mollywood action including TV serials updates, celebrity photos, controversy & interviews.",
        },
        "box-office" : {
            'name' : "Box Office",
            'title' : "Bollywood Movies Box Office Collection | Bollywood & Hollywood Box Office Collection Reports & Latest Updates",
            'body' : "Check out box office collection reports of all latest Bollywood & Hollywood movies online at Firstpost. Get daily updates with box office news, reports, prediction, verdict, features and more.",
        }
    }
    return menus;
}*/

exports.getCmsHeader = function(req, cb) {
    var cmsheader = {};
    var client = req.app.get('client');
    const clientFetch = promisify(client.get).bind(client); // now getAsync is a promisified version of client.get:
    /*client.get("FP2.0_Cms_Header", function(err, response) {
                cmsheader = response; // Will print `OK`
                return cb(cmsheader);
            });*/
    //return cmsheader;
    return new Promise((resolve, reject) => {
        clientFetch("FP2.0_Cms_Header").then((response) => {
            cmsheader = response;
            resolve(cmsheader);
        })
    });
    /*const cmsheader1 = new Promise(function(resolve, reject) {
        clientFetch("FP2.0_Cms_Header")
        .then((response) => {
            cmsheader = response;
            if (response.statusCode == 200) {
                resolve(cmsheader);   
            }
        })
    });
*/
    // return Promise.all([cmsheader]);
}

exports.getPlayerData = function(req,playerId){
    var client = req.app.get('client');
    const clientFetch = promisify(client.get).bind(client);

    return new Promise((resolve, reject) => {
        var url = "https://xmlns.cricketnext.com/cktnxt/scorecard/players/player_"+playerId+".xml";
        var parser = new xml2js.Parser();
        let xmldata = '';
        this.getRawData(url).then((data) => {
            xmldata = data;
            xml2js.parseString(xmldata , { explicitArray : false }, function (err, result) {
                return resolve(JSON.stringify(result));
                //console.log(result);
            });
        }).catch((err) => {
            reject(err);
        });

    }).catch((error) => {
        console.log(error);
    });
}

exports.getCricketRanking = function(req){
    var client = req.app.get('client');
    const clientFetch = promisify(client.get).bind(client);
    return new Promise((resolve,reject)=>{        
            var url = "http://xmlns.cricketnext.com/cktnxt/scorecard/rankings/iccranking-test-team.json";
            var url2 = "http://xmlns.cricketnext.com/cktnxt/scorecard/rankings/iccranking-odi-team.json";
            var url3 = "http://xmlns.cricketnext.com/cktnxt/scorecard/rankings/iccranking-t20-team.json";
            //var parser = new xml2js.Parser();    
            return clientFetch(serverPrefix + "cricket_ranking").then((result)=> {                
                if(result == ""){
                var rankArr = {};
                this.getRawData(url).then((test) => {                         
                    rankArr['test'] = JSON.parse(test);
                }).then((data) => {
                   this.getRawData(url2).then((odi) => {
                    rankArr['odi'] = JSON.parse(odi);
                    }).then((data) => {
                        this.getRawData(url3).then((t20) => {
                            rankArr['t20'] = JSON.parse(t20);                            
                            client.set("cricket_ranking",JSON.stringify(rankArr), function(err, reply) {});
                            return resolve(JSON.stringify(rankArr));                            
                        })  
                    });                    
                });                               
            }            
            return resolve(result);
        }).catch((error) => {
            console.log(error);
        });    
    });  
}

exports.getYearCricketData = function(req){
    var client = req.app.get('client');
    const clientFetch = promisify(client.get).bind(client);

    return new Promise((resolve,reject)=>{

        var url = "http://xmlns.cricketnext.com/cktnxt/scorecard/calendar_new.xml";
        var url2 = "http://xmlns.cricketnext.com/cktnxt/scorecard/calendar_new_womens_international.xml";
        var url3 = "http://xmlns.cricketnext.com/cktnxt/scorecard/calendar_new_youth_international.xml";
        let result_match_arr ={};
        let upcoming_match_arr ={};
        let all_matches_arr = {};
        var date = new Date();
        var date2 = new Date();        
        var allCricData ='';
        var count =0;                 
        var sixMonthsFromNow = new Date(date.setMonth(date.getMonth() - 6)).getTime();
        var nxtSixMonthsFromNow = new Date(date2.setMonth(date2.getMonth()+6)).getTime();
        var mensData = {};
        var womensData = {};
        var youthData = {};                
        mensData['upcoming_match_arr'] = {};
        womensData['upcoming_match_arr'] = {};
        youthData['upcoming_match_arr'] = {};
        mensData['result_match_arr'] = {};
        womensData['result_match_arr'] = {};
        youthData['result_match_arr'] = {};
        //console.log(nxtSixMonthsFromNow, "nxt last month");
        Promise.all([
            this.getRawData(url).then((data) => {        
            xmldata = data;
            xml2js.parseString(xmldata , { explicitArray : false }, function (err, result) {
            let match_data = result;                
            let match = match_data.calendar.match;                              
                match.forEach(function(item){
                    var matchkey = item['$']['match_Id']+"_"+item['$']['series_Id'];
                    let timewise = new Date(item['$']['matchdate_ist']).getTime();
                    item['$']["category"] = "men";
                    if(item['$']['matchstatus'] == 'Match Ended' || item['$']['matchstatus'] == 'Match Abandoned' || item['$']['matchstatus'] == 'Match Cancelled' || item['$']['matchstatus'] == "No updates available"){
                        if(sixMonthsFromNow < timewise){
                        //console.log(item['$']['matchdate_ist'],"date");
                        mensData['result_match_arr'][count] = item['$'];                         
                        count = count+1;
                        }
                    }else{
                        if(timewise < nxtSixMonthsFromNow){
                            mensData['upcoming_match_arr'][matchkey] = item['$'];
                        }
                    }
                });
            });
        }),
            this.getRawData(url2).then((data) => {
                xmldata = data;
                xml2js.parseString(xmldata , { explicitArray : false }, function (err, result) {
                let match_data = result;                
                let match = match_data.calendar.match;                              
                    match.forEach(function(item){
                        var matchkey = item['$']['match_Id']+"_"+item['$']['series_Id'];
                        let timewise = new Date(item['$']['matchdate_ist']).getTime();
                        item['$']["category"] = "women";
                        if(item['$']['matchstatus'] == 'Match Ended' || item['$']['matchstatus'] == 'Match Abandoned' || item['$']['matchstatus'] == 'Match Cancelled' || item['$']['matchstatus'] == "No updates available"){
                            if(sixMonthsFromNow < timewise){
                                womensData['result_match_arr'][count] = item['$'];
                                count = count+1;
                            }
                        }else{    
                            if(timewise < nxtSixMonthsFromNow){
                            womensData['upcoming_match_arr'][matchkey] = item['$'];
                        }
                        }               
                    });
                });
            
            }),
                this.getRawData(url3).then((data) => {
                xmldata = data;
                xml2js.parseString(xmldata , { explicitArray : false }, function (err, result) {
                    let match_data = result;
                    let match = match_data.calendar.match;
                    match.forEach(function(item){
                        var matchkey = item['$']['match_Id']+"_"+item['$']['series_Id'];
                        let timewise = new Date(item['$']['matchdate_ist']).getTime();
                        //console.log(sixMonthsFromNow +" -   "+ timewise,"timewasie for u19");
                        item['$']["category"] = "under19";
                        if(item['$']['matchstatus'] == 'Match Ended' || item['$']['matchstatus'] == 'Match Abandoned' || item['$']['matchstatus'] == 'Match Cancelled' || item['$']['matchstatus'] == "No updates available"){
                            if(sixMonthsFromNow < timewise){
                                youthData['result_match_arr'][count] = item['$'];
                                count = count+1;
                            }
                        }else{
                            if(timewise < nxtSixMonthsFromNow){
                                youthData['upcoming_match_arr'][matchkey] = item['$'];
                            }
                        }               
                    });                                      
                });                  
            })
           ]).then(() => {     

            const upcoming_match_arr = Object.assign(mensData['upcoming_match_arr'], womensData['upcoming_match_arr'],youthData['upcoming_match_arr']); 
            
            const result_match_arr = Object.assign(mensData['result_match_arr'], womensData['result_match_arr'],youthData['result_match_arr']); 
                
                var cricScheduleRedKey = "FP_Node_cricScheduleData";
                var cricResultRedKey = "FP_Node_cricResultData";
                //console.log("redis set for new");
                client.set(cricScheduleRedKey,JSON.stringify(upcoming_match_arr), function(err, reply) {});
                client.set(cricResultRedKey,JSON.stringify(result_match_arr), function(err, reply) {});
                return resolve(JSON.stringify(result_match_arr));                            
            }).catch((error) => {
                console.log(error);
            });    
        });    
}
exports.getAllSeriesList = function(req){
    var client = req.app.get('client');
    var seriesSchedule = {};   
    return new Promise((resolve, reject) => {     
        client.get(serverPrefix + "FP_Node_cricScheduleData", async function(err, result) {        
            result = JSON.parse(result);                
            for (const [key, value] of Object.entries(result)) {            
                let matchDate = new Date(value['matchdate_ist']).getDate();            
                let month = new Date(value['matchdate_ist']).getMonth();
                let year = new Date(value['matchdate_ist']).getFullYear();            
                var seriesKey = "series_"+value['series_Id'];
                if(seriesSchedule[seriesKey] == undefined){
                    seriesSchedule[seriesKey] = {};                
                    seriesSchedule[seriesKey]["data"] = {};
                }
                seriesSchedule[seriesKey]['name'] = value['seriesname'];                    
                seriesSchedule[seriesKey]["data"][key] = value;            
            }         
            var cricAllSeriesList = "FP_Node_cricAllSeriesList";
            client.set(cricAllSeriesList,JSON.stringify(seriesSchedule), function(err, reply) {});
            return resolve(JSON.stringify(seriesSchedule));
        });        
    }).catch((error) => {
        console.log(error);
    });    
}
exports.getCricketSchedule = function(req){
    var client = req.app.get('client');
    var scheduleMonth = {};        
    return new Promise((resolve, reject) => {
        client.get(serverPrefix + "FP_Node_cricScheduleData", async function(err, result) {        
            result = JSON.parse(result);                
            for (const [key, value] of Object.entries(result)) {            
                let month = new Date(value['matchdate_ist']).getMonth();
                let year = new Date(value['matchdate_ist']).getFullYear();            
                var monthYear = month+"_"+year;
                if(scheduleMonth[monthYear] == undefined){
                    scheduleMonth[monthYear] = {};                
                    scheduleMonth[monthYear]["data"] = {};
                }
                scheduleMonth[monthYear]['month'] = month;                    
                scheduleMonth[monthYear]["data"][key] = value;            
            }         
            var cricScheduleMonthData = "FP_Node_cricScheduleMonthData";
            client.set(cricScheduleMonthData,JSON.stringify(scheduleMonth), function(err, reply) {});       
            return resolve(JSON.stringify(scheduleMonth));    
        });        
    }).catch((error) => {
        console.log(error);
    });    
}
exports.getSeriesCricketSchedule = function(req,seriesId){
    //console.log(seriesId.split(",")); return false;
    var client = req.app.get('client');
    const clientFetch = promisify(client.get).bind(client);
    var seriesSchedule = {};            
    return clientFetch(serverPrefix + "FP_Node_cricScheduleData").then((result)=> {    
        result = JSON.parse(result);                
        for (const [key, value] of Object.entries(result)) {
            if(seriesId.includes(value['series_Id'])){
                let month = new Date(value['matchdate_ist']).getMonth();
                let year = new Date(value['matchdate_ist']).getFullYear();            
                var monthYear = month+"_"+year;
                if(seriesSchedule[monthYear] == undefined){
                    seriesSchedule[monthYear] = {};                
                    seriesSchedule[monthYear]["data"] = {};
                }
                seriesSchedule[monthYear]['month'] = month;                    
                seriesSchedule[monthYear]["data"][key] = value;
            }            
        }         
        //console.log(seriesSchedule);
        return JSON.stringify(seriesSchedule);        
    });    
}
exports.getSeriesCricketResults = function(req,seriesId){
    var client = req.app.get('client');
    const clientFetch = promisify(client.get).bind(client);
    var resultMonth = {};            
    return clientFetch(serverPrefix + "FP_Node_cricResultData").then((result)=> {    
        result = JSON.parse(result);
        var resultData = Object.entries(result);        
        //for (const [key, value] of Object.entries(result)) {            
            //console.log(seriesId);
        for (let i = resultData.length-1; i >= 0; i--) {            
            if(seriesId.includes(result[i]['series_Id'])){
                let month = new Date(result[i]['matchdate_ist']).getMonth();
                let year = new Date(result[i]['matchdate_ist']).getFullYear();            
                var monthYear = month+"_"+year;
                //console.log(monthYear,"monthYear");
                if(resultMonth[monthYear] == undefined){
                    resultMonth[monthYear] = {};                
                    resultMonth[monthYear]["data"] = {};
                }
                resultMonth[monthYear]['month'] = month;                    
                resultMonth[monthYear]["data"][i] = result[i];                        
            }
        }
        return JSON.stringify(resultMonth);
    });    
}
exports.getCricketResults = function(req){
    var client = req.app.get('client');
    var resultMonth = {};        
    return new Promise((resolve, reject) => {
        client.get(serverPrefix + "FP_Node_cricResultData", async function(err, result) {        
            result = JSON.parse(result);
            var resultData = Object.entries(result);        
            //for (const [key, value] of Object.entries(result)) {            
            for (let i = resultData.length-1; i >= 0; i--) {
                let month = new Date(result[i]['matchdate_ist']).getMonth();
                let year = new Date(result[i]['matchdate_ist']).getFullYear();            
                var monthYear = month+"_"+year;
                console.log(monthYear,"monthYear"); 
                if(resultMonth[monthYear] == undefined){
                    resultMonth[monthYear] = {};                
                    resultMonth[monthYear]["data"] = {};
                }
                resultMonth[monthYear]['month'] = month;   
                resultMonth[monthYear]["data"][i] = result[i];                        
            }         
            var cricresultMonthData = "FP_Node_cricResultMonthData";
            client.set(cricresultMonthData,JSON.stringify(resultMonth), function(err, reply) {}); 
            //console.log(resultMonth, "all set");
            return resolve(JSON.stringify(resultMonth));
        });
    }).catch((error) => {
        console.log(error);
    });    
}
exports.getScorecard = function(req,matchFile,matchKey,seriesID="",matchID="",pageType,otherMatchData=""){
    var client = req.app.get('client');
    const clientFetch = promisify(client.get).bind(client);
    var allData = {};
    if(pageType == "quick")
        var url = "https://cricketnext.nw18.com/json/"+matchFile+"_fastest.json";
    else
        var url = "https://cricketnext.nw18.com/json/"+matchFile+".json";
//console.log(matchFile, "fucntion");
    return new Promise((resolve, reject) => {
        let matchRedK = "FP_cricket_widget_matchid_"+seriesID+"_"+matchID;
        var matchShortData = [];
        if(matchFile == ''){            
            clientFetch(serverPrefix + matchRedK).then((matchRedData)=> {
                matchShortData = JSON.parse(matchRedData);                
                if(matchShortData == null){
                    console.log(matchShortData,"file"); return resolve(JSON.stringify("noData"));;
                }
                matchFile = matchShortData['match_filename'];                 
                if(pageType == "quick")
                    var url = "https://cricketnext.nw18.com/json/"+matchFile+"_fastest.json";
                else
                    var url = "https://cricketnext.nw18.com/json/"+matchFile+".json";
                this.getRawData(url).then((data) => {     
                    allData['data'] = data;
                    allData['matchData'] = matchShortData;                                    
                    return resolve(JSON.stringify(allData));
                }).catch((err) => {
                    reject(err);            
                });                   
            })
        }
        else
        {
            /*Set MatchFile in redis for future use as it will get vanish from calendar xml*/

            this.getRawData(url).then((data) => {  

                clientFetch(serverPrefix + matchRedK).then((matchRedData)=> {
                    matchShortData = JSON.parse(matchRedData);
                    if(typeof matchShortData['match_filename'] === 'undefined' && matchShortData !== null){
                        var cricOtherData = {};
                        cricOtherData['series_id'] = matchShortData['series_id'];
                        cricOtherData['match_id'] = matchShortData['match_id'];
                        cricOtherData['post_id'] = matchShortData['post_id'];                        
                        cricOtherData['pseudo_value'] = matchShortData['pseudo_value'];
                        cricOtherData['match_filename'] = matchFile;
                        cricOtherData['match_meta'] = matchShortData['match_meta'];
                        cricOtherData['match_otherData'] = otherMatchData;                        
                        client.set(matchRedK,JSON.stringify(cricOtherData), function(err, reply) {
                            /*console.log(reply);
                            console.log(err);*/
                        });
                    }
                    else{
                        matchShortData['match_filename'] = matchFile;
                    }
                    //console.log(matchShortData,"aaa");
                    allData['data'] = data;
                    allData['matchData'] = matchShortData;                
                    return resolve(JSON.stringify(allData));
                }).catch((err) => {
                    reject('Redis key is null');
                })

            }).catch((err) => {
                reject(err);            
            });
        }
    }).catch((error) => {
        console.log(error);
    });    
}
exports.getcommentry = function(req,matchFile,teamName,currInn){
//console.log(matchFile, "fucntion");
    return new Promise((resolve, reject) => {
        var url = "https://cricketnext.nw18.com/json/"+matchFile+"_"+teamName+"_"+currInn+"_fullcommentry.json";
        //const fs = require('fs');
        this.getRawData(url).then((data) => {
            try {
                var tryData = data;
                JSON.parse(tryData);                
            } catch (e) {                
                var data = "noData";                
            }
            return resolve(data);            
        }).catch((err) => {
            reject(err);            
        });

    }).catch((error) => {
        console.log(error);
    });    
}
exports.getcricketScores = function(req,ajax=""){
    // console.log("----cricket------");
    var client = req.app.get('client');
    const clientFetch = promisify(client.get).bind(client); // now getAsync is a promisified version of client.get:
    //return new Promise((resolve, reject) => {
    return new Promise((resolve, reject) => {
        var url = "http://xmlns.cricketnext.com/cktnxt/scorecard/calendar_new_liupre.xml";
        var url2 = "http://xmlns.cricketnext.com/cktnxt/scorecard/calendar_new_womens_international_liupre.xml";
        var url3 = "http://xmlns.cricketnext.com/cktnxt/scorecard/calendar_new_youth_international_liupre.xml";
        var parser = new xml2js.Parser();                        
        let xmldata = '';
        let match_data_arr = {};
        let live_match_arr = {};
        let upcoming_match_arr = {};
        let result_match_arr = {};        
        var dataCric ="";
        var date = new Date();
        var timestamp = '';
        var cricketData = {};
        var mensData = {};
        var womensData = {};
        var youthData = {};
        mensData['live_match_arr'] = {};
        womensData['live_match_arr'] = {};
        youthData['live_match_arr'] = {};
        mensData['upcoming_match_arr'] = {};
        womensData['upcoming_match_arr'] = {};
        youthData['upcoming_match_arr'] = {};
        mensData['result_match_arr'] = {};
        womensData['result_match_arr'] = {};
        youthData['result_match_arr'] = {};
        Promise.all([
            this.getRawData(url).then((data) => {
                xmldata = data;
                xml2js.parseString(xmldata , { explicitArray : false }, function (err, result) {
                    let match_data = result;
                    //console.log(match_data.calendar.match , "get data check length");
                    let match = match_data.calendar.match;              
                    match.forEach(function(item){                
                        var matchkey = item['$']['match_Id']+"_"+item['$']['series_Id'];                    
                        item['$']["category"] = "men";       
                        if(item['$']['live'] == '1'){                        
                            live_match_arr[matchkey] = item['$'];
                            mensData['live_match_arr'][matchkey] = item['$'];
                        }
                        if(item['$']['upcoming'] == '1'){                        
                            upcoming_match_arr[matchkey] = item['$'];
                            mensData['upcoming_match_arr'][matchkey] = item['$'];
                        }
                        if(item['$']['matchstatus'] == 'Match Ended'){                        
                            result_match_arr[matchkey] = item['$'];
                            mensData['result_match_arr'][matchkey] = item['$'];
                        }                    
                    });

                });                     
            }),
            this.getRawData(url2).then((data2) => {
                xmldata2 = data2;
                xml2js.parseString(xmldata2 , { explicitArray : false }, function (err, result) {               
                    let match_data = result;
                    //console.log(match_data.calendar.match , "get data check length");
                    let match = match_data.calendar.match;              
                    match.forEach(function(item){                   
                        var matchkey = item['$']['match_Id']+"_"+item['$']['series_Id'];
                        item['$']["category"] = "women";                        
                        if(item['$']['live'] == '1'){
                            live_match_arr[matchkey] = item['$'];
                            womensData['live_match_arr'][matchkey] = item['$'];
                        }
                        if(item['$']['upcoming'] == '1'){                        
                            upcoming_match_arr[matchkey] = item['$'];
                            womensData['upcoming_match_arr'][matchkey] = item['$'];
                        }
                        if(item['$']['matchstatus'] == 'Match Ended'){                        
                            result_match_arr[matchkey] = item['$'];
                            womensData['result_match_arr'][matchkey] = item['$'];
                        }
                        //console.log(match_data_arr);
                    });
                });            
            }),
            this.getRawData(url3).then((data3) => {
                xmldata3 = data3;
                xml2js.parseString(xmldata3 , { explicitArray : false }, function (err, result) {               
                    let match_data = result;
                    //console.log(match_data.calendar.match , "get data check length");
                    let match = match_data.calendar.match;              
                    match.forEach(function(item){                   
                        var matchkey = item['$']['match_Id']+"_"+item['$']['series_Id'];
                        item['$']["category"] = "youth";                        
                        if(item['$']['live'] == '1'){
                            live_match_arr[matchkey] = item['$'];
                            youthData['live_match_arr'][matchkey] = item['$'];
                        }
                        if(item['$']['upcoming'] == '1'){                        
                            upcoming_match_arr[matchkey] = item['$'];
                            youthData['upcoming_match_arr'][matchkey] = item['$'];
                        }
                        if(item['$']['matchstatus'] == 'Match Ended'){                        
                            result_match_arr[matchkey] = item['$'];
                            youthData['result_match_arr'][matchkey] = item['$'];
                        }
                    });
                    //console.log(JSON.stringify(match_data_arr) , "final data");               
                    //console.log(dataCric , "final data string");                  
                });                         
        })    
    ]).then(() => {
       
        timestamp = date.getTime();   
        const live_match_arr = Object.assign(mensData['live_match_arr'], womensData['live_match_arr'],youthData['live_match_arr']); 
        const upcoming_match_arr = Object.assign(mensData['upcoming_match_arr'], womensData['upcoming_match_arr'],youthData['upcoming_match_arr']); 
        const result_match_arr = Object.assign(mensData['result_match_arr'], womensData['result_match_arr'],youthData['result_match_arr']); 
    
        match_data_arr['liveMatchData'] = live_match_arr;
        match_data_arr['upcomingMatchData'] = upcoming_match_arr;
        match_data_arr['resultMatchData'] =  result_match_arr;
        match_data_arr["redis_set"] = timestamp+420000;  
        dataCric = JSON.stringify(match_data_arr);   
        // console.log(dataCric,'live_match_arr1');    
        var matchesRedKey = "FP_Node_cricLiveData";            
        cricketData = match_data_arr;
        if(ajax == ""){
            client.set(matchesRedKey,dataCric, function(err, reply) {            
                //console.log("FP_Node_cricLiveData "+reply);
            });
        }
        //client.expire(matchesRedKey, 900); 
        return resolve(cricketData);
    }).catch((error) => {
        console.log(error);
    });    
    });    
}

exports.getFooter = function(req, cb) {
    var footer = {};
    var client = req.app.get('client');
    const clientFetch = promisify(client.get).bind(client); // now getAsync is a promisified version of client.get:
    return new Promise((resolve, reject) => {
        clientFetch("firstpost_fp_2.0_footerlist").then((response) => {
            footer = JSON.parse(response);
            const link = req.protocol + '://' + req.get('host') + req.originalUrl;
            const regex = /(.*?).com.*?\/(.*?)\/(.*)/ims;
            let m;
            if ((m = regex.exec(link)) !== null) {
                // The result can be accessed through the `m`-variable.
                switch(m[1]) {
                  case 'tech':
                    index = 'tech';
                    break;
                  default:
                    index = 'home';
                }
            }
            else {
                index = 'home';
            }
            resolve(footer[index]);
        }).catch(console.error);
    });
}

exports.getOutbrainAds = function(keyArr , outbrain_arr = 'outbrain_arr') {
    const outbrainArr = {};
    if(typeof keyArr !== 'undefined')
    {
        for (const [adKey, advalue] of Object.entries(keyArr['adsSlot'])){
            //console.log(advalue , "advalue");
            if(typeof appRequire(outbrain_arr)[advalue] !== 'undefined')
            {
                outbrainArr[advalue] = appRequire(outbrain_arr)[advalue].replace("DROP_PERMALINK_HERE", keyArr['pageUrl']);
            }
        }
    }
    return outbrainArr;
}

exports.getAds = function(keyArr,deviceName,ads_arr = 'ads_arr') {
    const adsArr = {};
    if(typeof keyArr !== 'undefined')
    {
        for (const [adKey, advalue] of Object.entries(keyArr)){ 
            if(typeof appRequire(ads_arr)[deviceName][advalue] !== 'undefined')
            {
                for (const [adKey1, advalue1] of Object.entries(appRequire(ads_arr)[deviceName][advalue])){ 
                    adsArr[adKey1] = advalue1;
                }
            }
        }
    }
    return adsArr;
}

exports.displayAds = function(key) {
    // html = '';
       
    // html += "<div style='position: relative;z-index: 2;' id='"+key+"'><script type='text/javascript'>googletag.cmd.push(function() { googletag.display('"+key+"');  });";
    // html += "</script></div>";

    // return html;

    return `<div style="position: relative;z-index: 2;" id="${key}">
        <script type="text/javascript">
            googletag.cmd.push(function() { googletag.display("${key}");  });
        </script>
    </div>`
}

exports.displayAmpAds = function(key , width , height, mul_slot , flyunit = '' , ads_catSlug) {
    html = '';
    if(ads_catSlug && ads_catSlug === "art-and-culture"){
        if(flyunit == ''){
        html += `<amp-ad width=`+width+` height="`+height+`" type="doubleclick" data-slot="/1039154/`+key+`" data-enable-refresh="30"
        data-loading-strategy="prefer-viewability-over-views" data-multi-size-validation="false"
        data-multi-size="`+mul_slot+`" rtc-config='{"vendors": {"openwrap": {"PROFILE_ID" : "3206" ,"PUB_ID" : "113941"
        }},"timeoutMillis": 1000}'></amp-ad>`;
        }else{
            html += `<amp-fx-flying-carpet height="`+height+`px"><amp-ad width=`+width+` height="`+height+`" layout="fixed" type="doubleclick" data-slot="/1039154/`+key+`" data-enable-refresh="30" data-loading-strategy="prefer-viewability-over-views" rtc-config='{"vendors": {"openwrap": {"PROFILE_ID" : "3206","PUB_ID" : "113941"}},"timeoutMillis": 1000}'></amp-ad></amp-fx-flying-carpet>`;
        }
    }else{
        if(flyunit == ''){
        html += "<amp-ad width="+width+" height='"+height+"' type='doubleclick' data-slot='/1039154/"+key+"' data-enable-refresh='30' data-loading-strategy='prefer-viewability-over-views' data-multi-size-validation='false' data-multi-size='"+mul_slot+"'></amp-ad>";
        }else{
            html += "<amp-fx-flying-carpet height='"+height+"px'><amp-ad width="+width+" height='"+height+"' layout='fixed' type='doubleclick' data-slot='/1039154/"+key+"' data-enable-refresh='30' data-loading-strategy='prefer-viewability-over-views'></amp-ad></amp-fx-flying-carpet>";
        }
    }
    
    return html;
}

exports.getAdsNew = function(req,webKeyArr,mobKeyArr, cb) {
    var client = req.app.get('client');
    const clientFetch = promisify(client.get).bind(client); // now getAsync is a promisified version of client.get:
    return new Promise((resolve, reject) => {
        clientFetch("FPAdJSONSmarty").then((response) => {
            adsRedis = JSON.parse(response);

            var adsRaw = {};
            var ads = {};
            var ads_data = {};
            var adCodeArr = {};
            adsRaw['web'] = "";
            adsRaw['mobile'] = "";

            for (const [key, value] of Object.entries(webKeyArr)) {
                adsRaw['web'] += adsRedis['Desktop'][value];
                if(key != ((webKeyArr.length)-1))  adsRaw['web'] += '~';
            }

            for (const [key, value] of Object.entries(mobKeyArr)) {
                adsRaw['mobile'] += adsRedis['Mobile'][value];
                if(key != ((mobKeyArr.length)-1))  adsRaw['mobile'] += '~';
            }

            webAdsFiltered = adsRaw['web'].split("~");
            mobileAdsFiltered = adsRaw['mobile'].split("~");
            mergedArray = webAdsFiltered.concat(mobileAdsFiltered);
            
            for (const [key, item] of Object.entries(mergedArray)) {
                items = item.split("|");
                ads[items[0]] = items[1];
            }
            ads_data['ads']       = ads;
            ads_data['fallback']  = adsRedis['Fallback'];

            for (const [key, value] of Object.entries(ads_data['ads'])) {
                adCode = this.generateAdCode(key);
                adCodeArr[key] = adCode;
            }   
            ads_data['adCodeArr']  = adCodeArr;
            // console.log(adCodeArr);
            resolve(ads_data);
        })
    });
}

exports.generateAdCode = function(key) {
    html = '';
       
    html += "<div id='"+key+"'><script type='text/javascript'>";
    html += "var width = window.innerWidth || document.documentElement.clientWidth;";
    html += "adKey = '"+key+"';";
    html += "if (width >= 768 && (adKey.indexOf('FirstPost') != -1 || adKey.indexOf('Tech') != -1 || adKey.indexOf('TECH2_ENG_DESKTOP') != -1 || adKey.indexOf('FSTPST_ENG') != -1) && adKey.indexOf('FirstPost_Wap_New') < 0) {";
    html += "googletag.cmd.push(function() { googletag.display('"+key+"') });";
    html += "}";
    html += "if (width < 768 && (adKey.indexOf('FirstPost_Wap_New') != -1 || adKey.indexOf('FSTPST_ENG_WAP') != -1 || adKey.indexOf('TECH2_ENG_WAP') != -1)){\
                googletag.cmd.push(function() { googletag.display('"+key+"') });";
    html += "}";
    html += "</script></div>";

    return html;
}

exports.getVideoPlayerURL = function(req,vidArray,custom_params,isLive = "") {
    var client = req.app.get('client');
    const clientFetch = promisify(client.get).bind(client); // now getAsync is a promisified version of client.get:
    // console.log(JSON.stringify( constant, null, "  "));
    return new Promise((resolve, reject) => {
        
        // clientFetch(constant.LIVE_VIDEO_KEY).then((getVideoFromRedis) => {

        videoArr = {};
        hls = '';
        pd = '';
        mediaUrl = vidArray['media-url'];
        DailyMotionVideoId = vidArray['Daily-Motion-VideoId'];
        YoutubeVideoId = vidArray['youtube-video-id'];
        postTitle = vidArray['post_title'];
        postId = vidArray['ID'];

        if (typeof constant.config_flags.RHS_LIVE_VIDEO_WIDGET !== 'undefined' && constant.config_flags.RHS_LIVE_VIDEO_WIDGET == 1 && isLive != "") {
           mediaUrl = constant.config_flags.RHS_LIVE_VIDEO_MEDIA_URL;
           DailyMotionVideoId = constant.config_flags.RHS_LIVE_VIDEO_DAILY_MOTION_ID;
        }
        if ( mediaUrl && mediaUrl.length > 4  ) {
            if(isLive == "") 
                delete constant.akamaiconfig['live_key']; 
            else 
                delete constant.akamaiconfig['key']; 

            var akamai = new Akamai.default(constant.akamaiconfig),
            token = akamai.generateToken();

            videoMeta = mediaUrl.split(".");
            videoPath = videoMeta[0]+"-,256000,512000,712000,."+videoMeta[1]+".csmil";
            hls = "https://fpvodhls-vh.akamaihd.net/i/"+videoPath+"/master.m3u8?hdnts="+token;   
            pd = "http://vod.firstpost.com/"+videoMeta[0]+"."+videoMeta[1]+"?hdnts="+token;  

            if(isLive != "") {
                hls = constant.config_flags.RHS_LIVE_VIDEO_HLS+"?hdnts="+token;
                pd = constant.config_flags.RHS_LIVE_VIDEO_PD+"?hdnts="+token;
                postTitle = constant.config_flags.RHS_LIVE_VIDEO_POST_TITLE;
                postId = constant.config_flags.RHS_LIVE_VIDEO_POST_ID;
            }
        }
        if(mediaUrl != "" || DailyMotionVideoId != '' || YoutubeVideoId != '')
        {
            videoArr['videoUrl'] = {
                    'hls' : hls,
                    'pd'  : pd,
                    'postTitle' : postTitle,
                    'postId' : postId,
                    'MediaUrl' : mediaUrl,
                    'DailyMotionVideoId' : DailyMotionVideoId,
                    'YoutubeVideoId' : YoutubeVideoId,
                };
            videoArr['video_player'] = this.getVideoPlayer(videoArr['videoUrl'],custom_params);
        }
            resolve(videoArr);
        // })
    });
}


exports.getVideoPlayer = function(videoArr,custom_params) {
    if(videoArr['DailyMotionVideoId'] != "" && typeof videoArr['DailyMotionVideoId'] !== 'undefined')
    {
        return vid_arr = {  "autoplay" :  custom_params['autoplay'], 
                        "video_id" :  videoArr["DailyMotionVideoId"], 
                        "mute" :  custom_params['mute'], 
                        "width" :  custom_params['width'], 
                        "height" :  custom_params['height'], 
                        "post_id" :  videoArr['postId'], 
                        "post_title" :  videoArr['postTitle'], 
                        "divid" :  "dm_"+videoArr['postId'], 
                        "style" :  custom_params['style'], 
                        "solarSlug": custom_params['solarSlug'],
                        "player" : "player-dailymotion",
                    };
    }
    
    if(videoArr['YoutubeVideoId'] != "" && typeof videoArr['YoutubeVideoId'] !== 'undefined')
    {
    return vid_arr = {  "autoplay" :  custom_params['autoplay'], 
                        "video_id" :  videoArr["YoutubeVideoId"], 
                        "mute" :  custom_params['mute'], 
                        "width" :  custom_params['width'], 
                        "height" :  custom_params['height'], 
                        "post_id" :  videoArr['postId'], 
                        "post_title" :  videoArr['postTitle'], 
                        "divid" :  "yt_"+videoArr['postId'], 
                        "style" :  custom_params['style'], 
                        "solarSlug": custom_params['solarSlug'],
                        "player" : "youtube-player",
                    };
    }
    
    if(videoArr['MediaUrl'] != "" && typeof videoArr['MediaUrl'] !== 'undefined')
    {
    return vid_arr = {  "autoplay" :  custom_params['autoplay'], 
                        "video_id" :  videoArr["MediaUrl"], 
                        "hls" :  videoArr["hls"], 
                        "pd" :  videoArr["pd"], 
                        "mute" :  custom_params['mute'], 
                        "width" :  custom_params['width'], 
                        "height" :  custom_params['height'], 
                        "post_id" :  videoArr['postId'], 
                        "post_title" :  videoArr['postTitle'], 
                        "divid" :  "vdo_"+videoArr['postId'], 
                        "style" :  custom_params['style'], 
                        "solarSlug": custom_params['solarSlug'],
                        "player" : "player-sidebar-hola",
                    };
    }

}


exports.assignTempVars = function(tempVars) {
    var templateVars = {};
    for (const [key, temp_varsvalue] of Object.entries(tempVars)){
      templateVars[key] = temp_varsvalue;
    };

    return templateVars;
}

exports.capitalizeFLetter = function(inputText){
    if(typeof inputText !== 'undefined' && inputText !== null){
       let txtName = inputText[0].toUpperCase()+inputText.slice(1);
        return txtName; 
    }else{
        return inputText;
    }
}

exports.capitalizeEWLetter = function(inputText){
    let splitStr = inputText.toLowerCase().split(' ');
    for (let i = 0; i < splitStr.length; i++) {
       splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
   // Directly return the joined string
   return splitStr.join(' ').replace(/&Amp;/ , '&'); 
}

exports.htmlEntities = function(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

exports.getSchema = function(schema_meta = [] , schema_type , flag = ''){
    
    var schema = datePublished = tags = liveBlog = solarSlug = date_Published = post_title = "";
    if(Array.isArray(schema_type)){
        var schema_type_arr = '';
        schema_type_arr = schema_type;
    }else{
        var schema_type_arr = [];
        schema_type_arr = schema_type;
    }
    //console.log(JSON.stringify(schema_type_arr, null, "  "));
    //console.log("========================================");
    if(schema_meta['metaTitle'] != undefined){
    schema_meta['metaTitle'] = schema_meta['metaTitle'].replace(/'/g , '');
    schema_meta['metaTitle'] = schema_meta['metaTitle'].replace(/"/g , '');    
    }
    
    if(schema_meta['metaDesc'] != undefined){
    schema_meta['metaDesc'] = schema_meta['metaDesc'].replace(/"/g , '');
    schema_meta['metaDesc'] = schema_meta['metaDesc'].replace(/'/g , '');
    }
    
    var schema = '';
    for (const [schema_key, schema_val] of Object.entries(schema_type_arr)) {
        //console.log((schema_meta['metaTitle']);
        //var post_title = '';

        if(schema_meta.includes(schema_meta['post_title'])){
            if(((schema_val.toLowerCase()).indexOf("newsarticle" , "webpage"))){
                //console.log("inside ifffff");
                if(schema_meta['post']['post_title'].length > 108){
                    post_title = this.htmlentities(escapeHtml(schema_meta['post']['post_title'].slice(0,52)))+'..';
                    post_title += this.htmlentities(escapeHtml(schema_meta['post']['post_title'].substring ,  -54));
                }   
                else{
                    post_title = this.htmlentities(escapeHtml(schema_meta['post']['post_title']));
                } 
                post_title = post_title.replace('"' , '');
            } 
        }        
        switch(schema_val.toLowerCase()){
        case "newsarticle":
        schema += `<script type="application/ld+json">
            [{
            "@context": "http://schema.org",
            "mainEntityOfPage" : "${schema_meta['contentUrl']}",
            "@type": "NewsArticle",
            "url" : "${schema_meta['contentUrl']}",
            "articleBody" : "${schema_meta['post_content']}",
            
            "articleSection" : "${schema_meta['catSlug']}",
            "headline" : "${post_title}",
            "description" : "${schema_meta['metaDesc']}",
            "author" : "${schema_meta['metaAuthor']}",
            }]  
        </script>`;
        
        break;
            case "webpage":
        if(schema_meta.includes(schema_meta['tag'])){
                    //console.log("insdeeee tag if");
                    if(Array.isArray(schema_meta['tag'])){
                        var tags = '';
                        for (const [tag_k, tag_v] of Object.entries(schema_meta['tag'])) {
                            tags +=  tag_v['name'].replace("&amp;", "&")+',';
                        }    
                            tags = tags.trim(',');
                    }    
                }
                
                schema += '<script type="application/ld+json">'+
                       ' [{'+
                           ' "@context": "http://schema.org",'+
                            '"@type": "WebPage",'+
                           ' "name": "'+schema_meta['metaTitle']+'",'+
                           ' "description": "'+schema_meta['metaDesc']+'",'+
                            '"keywords":"'+tags+'",'+
                            '"url" : "'+schema_meta['contentUrl']+'",'+
                           ' "publisher":{'+
                                '"@context": "http://schema.org",'+
                                '"@type": "Organization",'+
                               ' "name": "Firstpost",'+
                               ' "logo": {'+
                                   ' "@context": "http://schema.org",'+
                                   ' "@type": "ImageObject",'+
                                   ' "width": "100px",'+
                                   ' "height": "100px",'+
                                    ' "url": "'+constant['WP_IMG_UPLOAD_URL']+'2016/03/FP-Logo-resize.png"'+
                                    '},'+
                                '"url":"'+constant['SITE_URL']+'"'+
                            '}'+
                        '}]'+
                        '</script>';
                         //console.log(JSON.stringify(schema, null, "  "));
            break;
            case "organisation":
                schema += '<script type="application/ld+json">'+
                '{'+
                    ' "@context": "http://schema.org",'+
                    ' "@type": "Organization",'+
                    ' "name": "Firstpost",'+
                    ' "url": "https://www.firstpost.com/",'+
                    ' "logo": "https://images.firstpost.com/wp-content/uploads/2016/03/FP-Logo.png",'+
                    ' "sameAs": ['+
                        ' "https://www.facebook.com/firstpostin",'+
                        ' "https://twitter.com/firstpost",  '+
                        ' "https://plus.google.com/+Firstpost"]'+
                '}'+
                  '</script>';        
                 // console.log(JSON.stringify(schema, null, "  "));
            break;
            case "website":
                schema += '<script type="application/ld+json">'+
                '{'+
                    '"@context": "http://schema.org",'+
                   ' "@type": "WebSite",'+
                   ' "url": "https://www.firstpost.com/",'+
                   ' "potentialAction": '+
                   ' {'+
                   ' "@type": "SearchAction",'+
                   ' "target": "https://www.firstpost.com/search/{search_term_string}",'+
                   ' "query-input": "required name=search_term_string"}}'+
                ' </script>';     
               //console.log(JSON.stringify(schema, null, "  "));   
            break;
        case 'photos':
        schema += '<script type="application/ld+json">'+
                '{'+
                    '"@context": "http://schema.org",'+
                   ' "@type": "ImageObject",'+
                   ' "name": "'+schema_meta['metaTitle']+'",'+
                   ' "author": "'+schema_meta['metaAuthor']+'",'+
                   ' "contentUrl": "'+schema_meta['contentUrl']+'",'+
                   ' "datePublished": "'+schema_meta['datePublished']+'"'+
        '}'+   
                ' </script>'; 
        break;  
            case "breadcrumbs":
                    schema += '<script type="application/ld+json">'+
                            '{'+
                               ' "@context":"http://schema.org",'+
                               ' "@type":"BreadcrumbList",'+
                               ' "itemListElement":[ ';
                    var i = 0;
                    var cntArr = [];
                    cntArr = Object.keys(schema_meta).length;
                    for (const [key, value] of Object.entries(schema_meta)) {
                        i++;
                        schema += '{'+
                                   ' "@type":"ListItem",'+
                                   ' "position":"'+i+'",'+
                                   ' "item":{'+
                                               ' "@id":"'+key+'",'+
                                               ' "name":"'+value+'"'+
                                            '}'+
                                    '}';

                        if(i < cntArr)
                        {
                            schema += ',';
                        }
                    }
                    schema += ']}</script>';
                    //console.log(JSON.stringify(schema, null, "  "));
            break;   
    }
    };   
    return schema;
}

exports.getMetaHtml = function(seoData = [] , articleData = []){
    refresh_arr = ['/controllers/category/category.php','/controllers/category/categoryPagination.php'];

    if(seoData['pageUrl'] != undefined && seoData['pageUrl'] != ""){
        seoData['pageUrl'] = seoData['pageUrl'].replace('http://','https://');
    }

    if(seoData['canonicalURL'] != undefined && seoData['canonicalURL'] != ""){
        seoData['canonicalURL'] = seoData['canonicalURL'].replace('http://','https://');
    }
    var metaHTML = '';
    var formattedText = (environment.toLowerCase() == "development") ? "\n" : "";
    metaHTML +=  '<meta charset="utf-8">'+formattedText;
    metaHTML +=  '<meta http-equiv="X-UA-Compatible" content="IE=edge">'+formattedText;
    metaHTML +=  '<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />'+formattedText;
    metaHTML +=  '<meta name="HandheldFriendly" content="true" />'+formattedText;
    metaHTML += '<title>'+seoData['metaTitle']+'</title>'+formattedText;
    metaHTML += '<meta name="description" content="'+seoData['metaDesc']+'" />'+formattedText;

    if(seoData['tags'] != undefined && seoData['tags'] != ""){
        metaHTML += '<meta name="news_keywords" content="'+seoData['tags']+'" />';   +formattedText 
        metaHTML += '<meta name="Keywords" content="'+seoData['tags']+'">'+formattedText;
    }

    if(seoData['metaTitle'] != undefined && seoData['metaTitle'] != "")
        metaHTML += '<meta property="og:title" content="'+seoData['metaTitle']+'" />'+formattedText;

    if(seoData['metaDesc'] != undefined && seoData['metaDesc'] != "")
       metaHTML += '<meta property="og:description" content="'+seoData['metaDesc']+'"/>'+formattedText;

    contentType = (seoData['contentType'] != undefined && seoData['contentType'] != "") ? seoData['contentType'] : "website";
    metaHTML += '<meta property="og:locale" content="en_US" />'+formattedText;
    metaHTML += '<meta property="og:site_name" content="Firstpost" />'+formattedText;
    metaHTML += '<meta property="og:type" content="'+contentType+'" />'+formattedText;
    metaHTML += '<meta property="fb:app_id" content="1162386820478832" />'+formattedText;
    metaHTML += '<meta property="fb:admins" content="500851548" />'+formattedText;
    metaHTML += '<meta property="fb:pages" content="165818073477856" />'+formattedText;

    if(seoData['ogImg'] != undefined && seoData['ogImg'] != ""){
        metaHTML += '<meta property="og:image" content="'+seoData['ogImg']+'"/>';+formattedText 
    }else{ 
        metaHTML += '<meta property="og:image" content="'+constant.SITE_URL+constant.config_flags.FP_SOCIAL_SHARE_LOGO+'" />'+formattedText;
    }

    metaHTML += '<meta name="twitter:title" content="'+seoData['metaTitle']+'"/>'+formattedText;
    metaHTML += '<meta name="twitter:description" content="'+seoData['metaDesc']+'"/>'+formattedText;
    metaHTML += '<meta name="twitter:card" content="summary_large_image"/>'+formattedText;
    metaHTML += '<meta property="twitter:account_id" content="4503599627804328" />'+formattedText;


    if(seoData['twitImg'] != undefined && seoData['twitImg'] != ""){
        metaHTML += '<meta property="twitter:image:src" content="'+seoData['twitImg']+'" />'+formattedText;
    }else{
        metaHTML += '<meta property="twitter:image:src" content="'+constant.SITE_URL+constant.config_flags.FP_SOCIAL_SHARE_LOGO+'" />'+formattedText;
    }
    
    metaHTML += '<meta name="twitter:widgets:csp" content="on">'+formattedText;
    metaHTML += '<meta name="twitter:domain" content="Firstpost"/>'+formattedText;
    metaHTML += '<meta name="twitter:site" value="@firstpost">'+formattedText;
    metaHTML += '<meta name="twitter:url" content="'+seoData['pageUrl']+'">'+formattedText;
    
    if(seoData['canonicalUrl'] != undefined && seoData['canonicalUrl'] != ""){
        metaHTML += '<link rel="canonical" href="'+seoData['canonicalUrl']+'"/>'+formattedText;
    }else{
        metaHTML += '<link rel="canonical" href="'+seoData['pageUrl']+'"/>'+formattedText;
    }
    if(seoData['next'] != undefined && seoData['next'] != ""){
        metaHTML += '<link rel="next" href="'+seoData['next']+'"/>'+formattedText;
    }
    if(seoData['prev'] != undefined && seoData['prev'] != ""){
        metaHTML += '<link rel="prev" href="'+seoData['prev']+'"/>'+formattedText;
    }
    
    if(seoData['ampUrl'] != undefined && seoData['ampUrl'] != ""){
        metaHTML += '<link rel="amphtml" href="'+seoData['ampUrl']+'"/>'+formattedText;
    }
    
    /*if(in_array(_SERVER['SCRIPT_NAME'],refresh_arr)) {
        metaHTML += '<meta http-equiv="refresh" content="600">'+formattedText;
    }elseif(_SERVER['SCRIPT_NAME']=='/index.php'){
        metaHTML += '<meta http-equiv="refresh" content="120">'+formattedText;
            }*/
    
    /*if((seoData['solarSlug'] != undefined && seoData['solarSlug'] == 'amazon-fp') || (articleData['meta']['push-to-amazonfeed'] != undefined && articleData['meta']['push-to-amazonfeed'] == 'yes')){
        metaHTML += '<meta name="ROBOTS" content="NOINDEX, NOFOLLOW">'+formattedText;
    }*/
    metaHTML += '<meta property="og:url" content="'+seoData['pageUrl']+'" />'+formattedText;
    metaHTML += '<link rel="shortcut icon prefetch" href="'+constant.SITE_URL+'static/images/favicon.ico?v='+constant.config_flags.VERSION_NO+'" />'+formattedText;
    metaHTML += '<link rel="icon prefetch" type="image/vnd.microsoft.icon" href="'+constant.SITE_URL+'static/images/favicon.ico?v='+constant.config_flags.VERSION_NO+'"/>'+formattedText;
    metaHTML += '<link href="'+constant.SITE_URL+'static/images/favicon.ico?v='+constant.config_flags.VERSION_NO+'" rel="shortcut icon prefetch" type="image/x-icon">'+formattedText;
    metaHTML += '<link href="'+constant.SITE_URL+'static/images/favicon.ico?v='+constant.config_flags.VERSION_NO+'" rel="icon prefetch" type="image/x-icon"/>'+formattedText;
    metaHTML += '<link href="//b.scorecardresearch.com" rel="dns-prefetch"/>'+formattedText;
    metaHTML += '<link href="//b.scorecardresearch.com" rel="preconnect"/>'+formattedText;
    metaHTML += '<link href="https://securepubads.g.doubleclick.net" rel="dns-prefetch"/>'+formattedText;
    metaHTML += '<link href="https://securepubads.g.doubleclick.net" rel="preconnect"/>'+formattedText;
    metaHTML += '<link href="https://pubads.g.doubleclick.net" rel="dns-prefetch"/>'+formattedText;
    metaHTML += '<link href="https://pubads.g.doubleclick.net" rel="preconnect"/>'+formattedText;
    metaHTML += '<link href="https://www.google-analytics.com" rel="dns-prefetch"/>'+formattedText;
    metaHTML += '<link href="https://www.google-analytics.com" rel="preconnect"/>'+formattedText;
    metaHTML += '<link href="//www.googletagservices.com" rel="dns-prefetch"/>'+formattedText;
    metaHTML += '<link href="//www.googletagservices.com" rel="preconnect"/>'+formattedText;
    metaHTML += '<link href="//tpc.googlesyndication.com" rel="dns-prefetch"/>'+formattedText;
    metaHTML += '<link href="//tpc.googlesyndication.com" rel="preconnect"/>'+formattedText;
    metaHTML += '<link href="https://fonts.gstatic.com" rel="dns-prefetch"/>'+formattedText;
    metaHTML += '<link href="https://fonts.gstatic.com" rel="preconnect"/>'+formattedText;
    metaHTML += '<link href="//connect.facebook.net" rel="dns-prefetch" />'+formattedText;
    metaHTML += '<link href="//connect.facebook.net" rel="preconnect" />'+formattedText;
    metaHTML += '<link href="//static.xx.fbcdn.net" rel="dns-prefetch" />'+formattedText;
    metaHTML += '<link href="//static.xx.fbcdn.net" rel="preconnect" />'+formattedText;

    metaHTML += '<link rel="apple-touch-icon" href="'+constant.AKAMAI_STATIC+'static/images/icons/apple-touch-icon.png">'+formattedText;
    if(constant.IO_SCRIPT_FLAG == 1){
        if(constant.hideJSforEU != 'yes'){
            metaHTML += '<!-- script for IO start--><script async src="https://cdn.onthe.io/io.js/xmKBQHduOqzQ"></script><!-- script for IO end-->'+formattedText;
        }
    }
    
    ignore_amp_cat = ['press-release','breathefree'];

    /*if(isset(_REQUEST['postid']) && !in_array(articleData['category'][0]['slug'], ignore_amp_cat) && articleData['meta']['no-amp-page'] != "yes"){                      
        metaHTML += '<link rel="amphtml" href="'.seoData['pageUrl'].'/amp">'+formattedText;
    }*/

    if(seoData['page_name'] == 'home'){
        metaHTML += '<link rel="alternate" type="application/rss+xml" title="Firstpost" href="https://www.firstpost.com/news-sitemap.xml" />'+formattedText;
    }
    if(seoData['page_name'] == 'category'){
        metaHTML += '<link rel="alternate" type="application/rss+xml" title="'+ucfirst(seoData['solarSlug'])+'" href="https://www.firstpost.com/rss/'+strtolower(seoData['solarSlug'])+'.xml" />'+formattedText;
        metaHTML += '<link rel="alternate" type="application/rss+xml" title="'+ucfirst(seoData['solarSlug'])+'" href="https://www.firstpost.com/rss/'+strtolower(seoData['solarSlug'])+'-news-feed.xml" />'+formattedText;
    }    
    return metaHTML; 
}

/*exports.inbetween_article_image_replace = function(matches , mat1 , mat2 , mat3){
    const common = appRequire('common_functions');
    new_img = common.firstpost_imageOptimization(mat2 , '' , '' , 1);
    console.log(new_img,"new_img");
    return new_img;
}*/

// image Optimization
exports.firstpost_imageOptimization = function(imageURL, width = '' , height = '', article_img = ''){
    const url = require('url');
    imageURL = imageURL.replace(/https:\/\/|http:\/\//gi, "//");
    //imageURL = imageURL.replace(/www.firstpost.com/gi, "images.firstpost.com");
    if(width == "" || height == "")
    {
        return imageURL;
    }
    
    //console.log(imageURL+"?impolicy=website&width="+width+"&height="+height);
    return imageURL+"?impolicy=website&width="+width+"&height="+height;
    /*
    let imageUrlPath = imageURL.substr(0, imageURL.lastIndexOf("/") + 1);
    var imageName = encodeURIComponent(imageURL.substr(imageURL.lastIndexOf("/") + 1));
    var original_image = imageUrlPath+imageName;
    
    var arrImageParsedURL = url.parse(original_image); 

    if(article_img == ''){
        imagePath = width+'x'+height+'/'+arrImageParsedURL['host']+arrImageParsedURL['path'];
        var sha1_imagePath = crypto.createHmac("sha1", "1VGJ99SR1S").update("imagePath").digest();
        sha1_imagePath = sha1_imagePath.toString('base64');
        sha1_imagePath = sha1_imagePath.replace('/', '_').replace('+', '-');
        return 'https://images.firstpost.com/optimize/'+sha1_imagePath+'/'+width+'x'+height+'/'+arrImageParsedURL['host']+arrImageParsedURL['path'];
    }else{
        imagePath = arrImageParsedURL['host']+arrImageParsedURL['path'];
        var sha1_imagePath = crypto.createHmac("sha1", "1VGJ99SR1S").update("imagePath").digest();
        sha1_imagePath = sha1_imagePath.toString('base64');
        sha1_imagePath = sha1_imagePath.replace('/', '_').replace('+', '-');
        return 'https://images.firstpost.com/optimize/'+sha1_imagePath+'/'+arrImageParsedURL['host']+arrImageParsedURL['path'];
    }*/
}

exports.getCategoryResults = function(start, perPage, currentPage, solarSlug)
{
    // commented code is for refernce, donot delete
    /*return new Promise((resolve, reject) => {
        //console.log("inside common function");
        if ( solarSlug == "entertainment" ) { solarSlug = "bollywood"; }
        if(solarSlug != 'videos'){
            url ="http://pvt-api.firstpost.com/solr/solr_search_firstpost.php?query=cat_slug_arr:"+solarSlug+"&start="+start+"&limit="+perPage+"&sort=dismax&exact=true&origin=search";
        }else {
            url = "http://pvt-api.firstpost.com/solr/solr_search_firstpost.php?query=content_type:youtube&start="+start+"&limit="+perPage+"&sort=dismax&exact=true&origin=search";
        }
        this.processSolarResults(url, perPage, currentPage).then(function(results){
            resolve(results);
        });
        
    })
    .catch((error) => {
        console.log(error);
    })*/
    if ( solarSlug == "entertainment" ) { solarSlug = "bollywood"; }
    /*if(solarSlug != 'videos'){
        url ="http://pvt-api.firstpost.com/solr/solr_search_firstpost.php?query=cat_slug_arr:"+solarSlug+"&start="+start+"&limit="+perPage+"&sort=dismax&exact=true&origin=search";
    }else {
        url = "http://pvt-api.firstpost.com/solr/solr_search_firstpost.php?query=content_type:youtube&start="+start+"&limit="+perPage+"&sort=dismax&exact=true&origin=search";
    }*/
    url ="http://pvt-api.firstpost.com/solr/solr_search_firstpost.php?query=cat_slug_arr:"+solarSlug+"&start="+start+"&limit="+perPage+"&sort=dismax&exact=true&origin=search";

    return this.processSolarResults(url, perPage, currentPage).then(function(results){
            return results;
    });
}
exports.getVideoTagResults = function(solarSlug, start, perPage, currentPage)
{
    url = "http://pvt-api.firstpost.com/solr/solr_search_firstpost.php?query=tags_slug_fp_str:"+solarSlug+"+AND+content_type:Video&start="+start+"&limit="+perPage+"&sort=dismax&exact=true&fq=-cat_id:11%20OR%20-cat_id:29&origin=search";
    return this.processSolarResults(url, perPage, currentPage).then(function(results){
            return results;
        });
}

// Removes Invisible Special Characters which come with encoded text
const removeSpecialCharacters = exports.removeSpecialCharacters = (str) => {
    if(!str) {
        return ''
    }
    return str.split('').filter(letter => encodeURI(letter) === letter).join('')
}
exports.getTagPageResults = function(solarSlug, start, perPage, currentPage)
{
    url = "http://pvt-api.firstpost.com/solr/solr_search_firstpost.php?query=tags_slug_fp_str:"+encodeURI(removeSpecialCharacters(solarSlug))+"&start="+start+"&limit="+perPage+"&exact=true&fq=-cat_id:11%20OR%20-cat_id:29&origin=search";    
    
    return this.processSolarResults(url, perPage, currentPage).then(function(results){
            return results;
    });
}
exports.getMultipleTagPageResults = function(solarSlug1, solarSlug2, solarSlug3 = '', start, perPage, currentPage)
{
    if(solarSlug3 != ''){
        url = "http://pvt-api.firstpost.com/solr/solr_search_firstpost.php?query=tags_slug_fp_str:"+encodeURI(solarSlug1)+"+AND+tags_slug_fp_str:"+encodeURI(solarSlug2)+"+AND+tags_slug_fp_str:"+encodeURI(solarSlug3)+"&start="+start+"&limit="+perPage+"&exact=true&fq=-cat_id:11%20OR%20-cat_id:29&origin=search";   
    }
    else{
        url = "http://pvt-api.firstpost.com/solr/solr_search_firstpost.php?query=tags_slug_fp_str:"+encodeURI(solarSlug1)+"+AND+tags_slug_fp_str:"+encodeURI(solarSlug2)+"&start="+start+"&limit="+perPage+"&exact=true&fq=-cat_id:11%20OR%20-cat_id:29&origin=search";  
    }   
    //console.log("url is",url); 
    return this.processSolarResults(url, perPage, currentPage).then(function(results){
            return results;
    });
}

exports.getMoreAlbums = function(start, perPage, currentPage)
{
    url ="http://pvt-api.firstpost.com/solr/solr_search_firstpost.php?query=cat_slug_arr:photos&start="+start+"&limit="+perPage+"&sort=dismax&exact=true&origin=search";
    return this.processSolarResults(url, perPage, currentPage).then(function(results){
            return results;
    });
}

exports.getAuthorArticles = function(authorId,start,perPage,currentPage){
    url ="http://pvt-api.firstpost.com/solr/solr_search_firstpost.php?query=author_id:"+authorId+"&start="+start+"&limit="+perPage+"&sort=dismax&exact=true&origin=search";
    return this.processSolarResults(url, perPage, currentPage).then(function(results){
            return results;
    });

}

exports.processSolarResults = function(url, perPage, currentPage){
    let xmldata = "";
    var solarResults = [];
    var solarPageJson = [];
    return new Promise((resolve, reject) => {
        //this.getRawData(url);

        this.getRawData(url).then((data) => {
            xmldata = data;

            xml2js.parseString(xmldata , { explicitArray : false }, function (err, result) {

                let solr_data = result;
                if(typeof solr_data !== 'undefined' && solr_data.xml.length > 0  ){
                    if(solr_data.xml.item) {
            items = solr_data.xml.item;
            } else {
            items = solr_data.xml.story;
            }
            
            if(typeof items !== 'undefined'){
            if(typeof items.length === 'undefined' || items.length == '1'){
                tags = items['tags_slug'].split(",");
                
                var plainTags = [];
    
                tags.forEach(function(tag){
                var plainTag = tag.split("||");
                var tag = [];
                tag["name"] = plainTag[1];
                tag["slug"]  = plainTag[2],
                plainTags.push(tag);
                });
    
                if( items['cat_name'] == 'Life'){
                cat_name='Living';             
                }else{
                cat_name=items['cat_name'];
                }
    
                postSlugArr =  items['url'].split("/");
                postSlug    = postSlugArr[postSlugArr.length-1];
                post_image_arr = JSON.parse(items['post_image_arr']); 
    
                var tag = [];
                tag["ID"] = items['id'];
                tag["title"] = items['title'];
                if(typeof items['post_excerpt'] !== 'object'){
                tag["description"] = items['post_excerpt'];
                }else{
                tag["description"] = '';
                }
                tag["image"] = items['thumbnail'];
                tag["PostImageThumbnail"] = post_image_arr['featured_image'];
                tag["url"] = items['url'];
                tag["postSlug"] = postSlug;
                //tag["date"] = items['title'];
                tag["tags"] = plainTags;
                tag["cat_slug"] = cat_name;
                tag["category"] = items['cat_name'];
                tag["ContentType"] = items['content_type'];
                tag["author_id"] = items['author_id'];
                tag["author"] = items['author'];
                //dateFormat(items['post_date'] , "mmm dd',' yyyy"),
    
                solarResults.push(tag);
            }else{
                items.forEach(function(item){
                   
                if(typeof item['tags_slug'] !== 'undefined'){
                    tags = item['tags_slug'].split(",");
                }else{
                    tags = '';
                }
                
                // console.log(JSON.stringify(item['tags_slug'], null, "  "));
                var plainTags = [];
                if(tags != ''){
                    tags.forEach(function(tag){
                    var plainTag = tag.split("||");
                    var tag = [];
                    tag["name"] = plainTag[1];
                    tag["slug"]  = plainTag[2],
                    plainTags.push(tag);
                    });
                }
                if( item['cat_name'] == 'Life'){
                    cat_name='Living';             
                }else{
                    cat_name=item['cat_name'];
                }
                postSlugArr =  item['url'].split("/");
                postSlug    = postSlugArr[postSlugArr.length-1];
                var post_image_arr = [];
                post_image_arr = (typeof item['post_image_arr'] !== 'undefined') ? JSON.parse(item['post_image_arr']) : {};
    
                var tag = [];
                tag["ID"] = item['id'];
                tag["title"] = item['title'];
                if(typeof item['post_excerpt'] !== 'object'){
                    tag["description"] = item['post_excerpt'];
                }else{
                    tag["description"] = '';
                }
                
                tag["image"] = item['thumbnail'];
                tag["PostImageThumbnail"] = (typeof post_image_arr['featured_image'] !== 'undefined') ? post_image_arr['featured_image'] : '';
                tag["url"] = item['url'];
                tag["postSlug"] = postSlug;
                //tag["date"] = items['title'];
                tag["tags"] = plainTags;
                tag["cat_slug"] = cat_name;
                tag["category"] = item['cat_name'];
                tag["ContentType"] = item['content_type'];
                tag["author_id"] = item['author_id'];
                tag["author"] = item['author'];
                //dateFormat(items['post_date'] , "mmm dd',' yyyy"),
                solarResults.push(tag);
                });
            }
            totalItems = solr_data.xml.length;
    
            solarPageJson['solarCount'] = totalItems;
            solarPageJson['solarResults'] = solarResults;
            solarPageJson['currentOffset'] = ((currentPage-1) * perPage);
            solarPageJson['nextOffset'] = (currentPage * perPage);
            }else{
            reject();
            }   
        }else{
                    reject();
                }
            });
            this.get_replace_in_array(solarResults).then((solrData) => {
                solarPageJson['solarResults'] = solrData;
                resolve(solarPageJson);  
                //console.log(solarPageJson);
            });
        }).catch((err) => {
            reject(err);
        });
    }).catch((error) => {
        console.log(error);
    })
}

exports.get_replace_in_array = function (data_arr){
    
    let find = 'http://images.firstpost.com';
    let find1 = 'http://s1.firstpost.in';
    let find2 = 'http://s2.firstpost.in';
    let find3 = 'http://s3.firstpost.in';
    let find4 = 'http://www.firstpost.com/wp-content/uploads';
    let find5 = 'http://lbimg.in.com';
    let find6 = 'http://www.firstpost.com';
    let replace = 'https://images.firstpost.com';
    let replace1 = 'https://images.firstpost.com/wp-content/uploads';
    let replace2 = 'https://lbimg.in.com';
    let replace3 = 'https://www.firstpost.com';
    
    return new Promise((resolve, reject) => {
    data_arr.map(function(val, index){
        //console.log(val  , "hiii 6666677777");
        for (let [key, value] of Object.entries(val)){
        if (typeof value === 'string'){
            val[key] = value.replace( find , replace );
            val[key] = value.replace( find1 , replace );
            val[key] = value.replace( find2 , replace );
            val[key] = value.replace( find3 , replace );
            val[key] = value.replace( find4 , replace1 );
            val[key] = value.replace( find5 , replace2 );
            val[key] = value.replace( find6 , replace3 );
            data_arr[index][key] = val[key];
        }
        };
    });
    resolve(data_arr);
    });
};

exports.getRawData = function(url , custom_params){
    return new Promise((resolve, reject) => {
    var options = {
            host: url,
            method: 'GET'
        };
        
        fetch(url).then(response => response.text()).then(str => {
//            dataAsJson = JSON.parse(convert.xml2json(str));
            //console.log(str , "xml data match");
            return resolve(str);
            //console.log(dataAsJson['elements'][0]['elements']);
        })
    
    .catch((err) => {
            reject(err);
        })
    })/*.then((dataAsJson) => {
        resolve(dataAsJson);
    }).catch((err) => {
        reject(err);
    })*/
}

exports.getPagination = function(total, pgNo, pgUrl, pgNoPerPage, limit){
    var totalPgCnt = Math.ceil(total / limit);
     var pagination = {};
     pagination['total'] = total;
     pagination['totalPgCnt'] = totalPgCnt;
     pagination['pageUrl'] = pgUrl;
     pagination['pageNo'] = pgNo;
    //console.log(pagination);
    var pages = Math.ceil(total / limit);
    var tot = parseInt(pgNo) + pgNoPerPage;
    var nxtpg = parseInt(pgNo) + 1;
    var prevpg = parseInt(pgNo) - 1;
   //console.log("pgNo",pgNo);
    //console.log("nxtpg",nxtpg);

     if((pgNo - 1) % pgNoPerPage == 0){
        //console.log("inside if");
         strt = pgNo;
         lst = tot;
     }
    else{
        var cal_no = (pgNoPerPage * Math.round(pgNo / pgNoPerPage));
         strt = cal_no - 1;
        lst = cal_no + 2;
        tot = lst;
        lst = cal_no + 2;
        tot = lst;
        //console.log("strt",tot);
     }
     pagination['previous'] = (pgNo == 1) ? '' : pgUrl.concat(prevpg);

    pagination['pages'] = [];
    for(let i = strt; i < lst; i++){
         if(i <= pages){
             pagination['pages'][i] = pgUrl.concat(i);
         }
     }
     pagination['next'] = (pgNo == pages) ? '': pgUrl.concat(nxtpg);
     return pagination;

}

exports.getRelatedArticle = function(postId, tags, start, perPage, currentPage){
    
    let url ="http://pvt-api.firstpost.com/solr/firstpost_similar_article_keywords.php?tags="+encodeURI(tags)+"&start="+start+"&limit="+perPage+"&fq=content_type:Article&id="+postId;
    return results = this.processSolarResults(url, perPage, currentPage);
   
}

exports.getVideoRelatedArticle = function(postId, tags, start, perPage, currentPage){
    
    let url ="http://pvt-api.firstpost.com/solr/firstpost_similar_article_keywords.php?tags="+encodeURI(tags)+"&start="+start+"&limit="+perPage+"&sort=dismax&fq=content_type:Video&id="+postId;
    return results = this.processSolarResults(url, perPage, currentPage);
   
}
exports.getSchemaContentFromPageContent = function (html , url , type){
    switch(type) {
    case 'faq' :
        let allQuestionAns = '';
        let pattern1 = '/\[q\](.*)\[\/q\]/';
            let pattern2 = '/\[ans\](.*)\[\/ans\]/';

            let allQtags = [];
            let allAtags = [];
        
        allQtags = html.match(/\[q\](.*)\[\/q\]/gims);
        allAtags = html.match(/\[ans\](.*)\[\/ans\]/gims);
        
        if(typeof allQtags !== 'undefined' && allQtags !== null && allQtags != ''){
        for(let s = 0 ; s < allQtags.length ; s++){
            allQuestionAns +='{'+
                    '"@type": "Question",'+
                    '"name": "'+allQtags[s]+'",'+
                    '"acceptedAnswer": {'+
                        '"@type": "Answer",'+
                        '"text": "'+allAtags[s]+'"'+
                    '}'+
                    '}';
            if(s != (allQtags.length-1)){
            allQuestionAns += ',';
            }       
        }
        }
        return allQuestionAns;
    break;
    case 'howto' :
        let allHowToTags = '';
        let sub_allHowToTags = '';
        let aHtml = '';
        
        let allhQtags = [];
        let allhAtags = [];
        let allStepTags = [];
        
        allhQtags = html.match(/\[hq\](.*?)\[\/hq\]/gims);
        allhAtags = html.match(/\[hans\](.*?)\[\/hans\]/gims);
	if(allhAtags == null){
	    allhAtags = html.match(/\[hans\](.*?)\[\hans\]/gims);
	}
        if(typeof allhQtags !== 'undefined' && allhQtags !== null && allhQtags != ''){
        for(let s = 0 ; s < allhQtags.length ; s++){
            allhQtags[s] = this.tags_replace(allhQtags[s]);
            allHowToTags += '"@type": "HowToStep",'+
                    '"url" : "'+url+'",'+
                    '"name" : "'+allhQtags[s]+'",'+
                    '"itemListElement": [';
                    
                    if(allhAtags) {
                        aHtml = allhAtags[s];
                    }

                    allStepTags = aHtml.match(/\[hstep\](.*?)\[\/hstep\]/gims);
                   
                    if(allStepTags == null){
			            allStepTags = aHtml.match(/\[hstep\](.*?)\[hstep\]/gims);
                    }
                    
                    if(allStepTags) {
                        for(let k = 0 ; k < allStepTags.length ; k++){
                            if(allStepTags[k] != ""){
                            allStepTags[k] = this.tags_replace(allStepTags[k]);
                            allHowToTags += '{'+
                                        '"@type": "HowToDirection",'+
                                        '"text": "'+allStepTags[k]+'"';
                                        
                            }
                            if(k == (allStepTags.length-1)){
                            allHowToTags += '}]';
                            }else if(typeof allStepTags[k+1] !== 'undefined' && allStepTags[k+1] !== null && allStepTags[k+1] != ''){
                            allHowToTags += '},';
                            }
                        }      
                    }     
                        
            if(s != (allhQtags.length-1)){
            allHowToTags += ',';
            }
        }
        }
        return allHowToTags;
    break;
    }
}

exports.tags_replace = function(data_str){
    
    data_str = data_str.replace(/"/g,'\\"');
    data_str = data_str.replace(/\[q\]/g,'');
    data_str = data_str.replace(/\[\/q\]/g,'');
    data_str = data_str.replace(/\[ans\]/g,'');
    data_str = data_str.replace(/\[\/ans\]/g,'');
    data_str = data_str.replace(/\[hq\]/g,'');
    data_str = data_str.replace(/\[\/hq\]/g,'');
    data_str = data_str.replace(/\[hans\]/g,'');
    data_str = data_str.replace(/\[\/hans\]/g,'');
    data_str = data_str.replace(/\[hstep\]/g,'');
    data_str = data_str.replace(/\[\/hstep\]/g,'');
    data_str = data_str.replace(/<b>/g,'');
    data_str = data_str.replace(/<\/b>/g,'');
    
    return data_str;
}

exports.getPhotosFromPostContent = function(postContent,photoCat,postPageJson,category="photos"){
    
    let photo_patern = /<img.+src=[\'"]([^\'"]+)[\'"].*\/>/gim;
    let caption_pattern = /<p class=\"wp\-caption\-text\">(.*?)<\/p>/gim;
    let photo_arr = [];
    let caption_arr = [];
    let photosData = []
    
    while((match = photo_patern.exec(postContent)) != null ){
        photo_arr.push(match[1]);
    }
   
    postContent = postContent.replace(/<a(.*)\/><\/a>/gim , '');
    
    while((caption_match = caption_pattern.exec(postContent)) != null ){
        caption_arr.push(caption_match[1]);
    }
    
    if(photo_arr != 'undefined'){
    var pcnt = 1;
    for (const [photo_key, photo_val] of Object.entries(photo_arr)){
        let data_arr = [];
        
        data_arr['img_src'] = photo_val.replace('http://www.firstpost.com/', constant.IMG_URL);
        data_arr['img_src'] = data_arr['img_src'].replace('http://www.firstpost.com/', constant.IMG_URL);
        
            data_arr['title'] = caption_arr[photo_key];
        
        if(photoCat != ""){
        if(photoCat.indexOf('gallery') < 0 ){
            data_arr['url_new'] = constant.SITE_URL+category+'/'+photoCat+'-gallery/'+postPageJson['post']['post_name']+'-'+postPageJson['post']['ID']+'.html';
        }else{
            data_arr['url_new'] = constant.SITE_URL+category+'/'+photoCat+'/'+postPageJson['post']['post_name']+'-'+postPageJson['post']['ID']+'.html';
        }
        }else{
        data_arr['url_new'] = constant.SITE_URL+category+'/'+postPageJson['post']['post_name']+'-'+postPageJson['post']['ID']+'.html'; 
        }
        if(photo_key == 0){
        data_arr['url_new'] = data_arr['url_new'];
        }else{
        data_arr['url_new'] = data_arr['url_new'].replace('.html', '-'+(pcnt)+'.html');
        }
        
        data_arr['photo_cnt'] = pcnt;
        pcnt++;
        photosData.push(data_arr);
    }
    }
    
    return photosData;
}

exports.getLiveBlogStatus = function(pattern , content){
    let m;
    let result = "";
    if ((m = pattern.exec(content)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if(typeof m[1] !== undefined)
        {
            result = m[1];
        }
    }
    return result;
}

exports.shuffleArr = function(input){
    
    for (let i = input.length - 1; i >= 0; i--) {
  
      let randomIndex = Math.floor(Math.random() * (i + 1));
      let itemAtIndex = input[randomIndex];
  
      input[randomIndex] = input[i];
      input[i] = itemAtIndex;
    }
    return input;
}

exports.validate_input = function(data) {
    var data = ltrim(data);
    data = rtrim(data);
    data = striptags(data);
    data = data.replace(' ','-',data);
    return data;
}

exports.slug_to_space = function(data) {
    var data = ltrim(data);
    data = rtrim(data);
    data = data.replace(/-/g, ' ');
    return data;
}

exports.getSearchAutoSuggest = function(searchText,limit =5){
    
       
    /*return this.processSolarResults(url, 5, 1).then(function(results){
            console.log(results);
    });*/
    /*var solarXmlFormat =  new JSDOM(solarRawResults);
    console.log(solarRawResults);*/

    return new Promise((resolve, reject) => {
        url = "http://pvt-api.firstpost.com/autocomplete/solr_tags_author_autosuggest.php?query="+searchText+"&start=0&limit="+limit;
        //const fs = require('fs');
        this.getRawData(url).then((data) => {
            xml2js.parseString(data , { explicitArray : false }, function (err, result) {
                        let solr_data = result;
                        if(solr_data.xml.length > 0){
                            if(solr_data.xml.item) {
                            items = solr_data.xml.item;
                            } else {
                            items = solr_data.xml.story;
                            }
                            
                            if(typeof items !== 'undefined'){
                                var plainTags = [];
                                items.forEach(function(item){
                                    var tag = {};
                                    tag["name"] = item['name'];
                                    tag["slug"]  = item['slug'];
                                    plainTags.push(tag);
                                });    
                            }
                               
                        }else{
                            reject();
                        }   
                    return resolve(plainTags);            
                   }) 

            
        }).catch((err) => {
            reject(err);            
        });

    }).catch((error) => {
        console.log(error);
    }); 
}

exports.getBoardTopIframeUrl = function(boardids){
    let boardTopIframeUrl = '';
    let boardData = '';
    let boardbaseUrl = '';
    if(boardids != ""){
        for (const [board_key, board_val] of Object.entries(boardids)) {
            boardData = boardData + " " + board_val['id'] +',';
            if(boardbaseUrl == ''){
                boardbaseUrl = board_val['baseUrl'];
            }
        }
    }
    boardTopIframeUrl = boardbaseUrl+"/board-results-pubstack/board_iframe_slider.html?bid="+boardData.replace(/,\s*$/, "").trim();

    boardTopIframeUrl = '<iframe id="boardresults" src="'+boardTopIframeUrl+'" frameborder="0" scrolling="no" ></iframe>';
    return boardTopIframeUrl;
}

exports.getCovidData = function(req){
    let covidIndiaDataJson = [];
    let covidWorldDataJson = [];
    let covidFinalDataJson = [];
    return new Promise((resolve,reject)=>{        
            var indiaUrl = "http://pvt-election.nw18.com/electiondata/electionjson/covid19/covid19_toolbar_india.json";
            var worldUrl = "http://pvt-election.nw18.com/electiondata/electionjson/covid19/covid19_toolbar_world.json"; 
            return this.getRawData(indiaUrl).then((data1) => {    
                    if(data1 !== null){
                        covidFinalDataJson['India'] = JSON.parse(data1);
                    }                     
                }).then((data) => {
                   this.getRawData(worldUrl).then((data2) => {
                    if(data2 !== null){
                        covidFinalDataJson['World'] = JSON.parse(data2);
                    }
                    
                    //console.log("covidFinalDataJson=",covidFinalDataJson);
                    }).then((data) => {
                        return resolve(covidFinalDataJson);
                          
                    });                    
                });
        }).catch((error) => {
            console.log(error);
        });    
}

exports.getAllMenuLinks = function (menuArr) {
    
    menulinks = {};
    seperator = '=##=';
    for (const [level_key, level_val] of Object.entries(menuArr)) {
        menulinks[level_key] = {};
        for (const [main_level_key, main_level_val] of Object.entries(level_val)) {
            for (const [menu_name_key, menu_name_val] of Object.entries(main_level_val)) {
                menulinks[level_key][main_level_key+seperator+menu_name_val['menu_slug']] = menu_name_val['menu_url'].replace(constant.MAIN_SITE_URL, constant.SITE_URL);
            }
        }
    }
    return menulinks;
}

exports.breakContentAddAdsNew = function(postId, postContent , adsSlot , disp_type){
    var article_data = postContent.split('<p>');
    var content_length = article_data.lenght;
    var ads_length = adsSlot.length;
    var final_content = '';
    if(postId == '8945371'){
        var ads_position = 5;
    }else if(postId == '8944631'){
        var ads_position = 3;
    }else if(postId == '8944621'){
        var ads_position = 4;
    }else if(postId == '8945391'){
        var ads_position = 4;
    }
    

    for (var i=1; i <= ads_length; i++) {
        var ad_limit = i*ads_position;
        if(typeof adsSlot !== 'undefined' && typeof adsSlot[i-1] !== 'undefined'){

            if(disp_type == 'desktop'){
                //article_data[ad_limit] += this.displayAds(adsSlot[i-1][0]);
                article_data[ad_limit] += "<div id='div-gpt-ad-1601978510340-0'><script type='text/javascript'>googletag.cmd.push(function() { googletag.display('div-gpt-ad-1601978510340-0');  });</script></div>";
            }else if(disp_type == 'mobile'){
                article_data[ad_limit] += "<div id='div-gpt-ad-1602761115771-0'><script type='text/javascript'>googletag.cmd.push(function() { googletag.display('div-gpt-ad-1602761115771-0');  });</script></div>";
            }
            console.log("inside brk function");
            //article_data[ad_limit] += '</div>';
        }    
    }

    final_content = article_data.join("<p>");
    return final_content;

}

exports.dailymotionVideo = function(postContent , disp_type){
    var article_data = postContent.split('<p>');
    var content_length = article_data.length;
    var final_content = '';
    var video_position = 3;
    
        var i=1;
        var ad_limit = i*video_position;
        const div = '<div class="dm-player" owners="firstpost" cpeid="5df6e56e3e8c0962957f6a76" sort="recent" style="margin-bottom:30px" getupdatedvideo="false" showadonly="true" pipAtStart="true" showCloseButtonPip="true"></div>'
        if(disp_type == 'desktop'){
            if(article_data[ad_limit]){
                article_data[ad_limit] += div
            } else {
                article_data[ad_limit] = div
            }
        }else if(disp_type == 'mobile'){
            if(article_data[ad_limit]){
                article_data[ad_limit] += div
            } else {
                article_data[ad_limit] = div
            }
        }
    final_content = article_data.join("<p>");
    return final_content;

}

exports.breakContentAddAds = function(postContent , adsSlot , disp_type , ads_catSlug){
    var article_data = postContent.split('<p>');
    var content_length = article_data.lenght;
    var ads_length = adsSlot.length;
    var final_content = '';
    var ads_position = 2;
    
    for (var i=1; i <= ads_length; i++) {
        var fly_ads_cls = fly_ads_start_div = fly_ads_end_div = '';
        var ad_limit = i*ads_position;
        
        if(typeof article_data[ad_limit] !== 'undefined' && article_data[ad_limit].indexOf("<blockquote") > 0 ) {
            ad_limit = ad_limit - 1;
	}
        
        if(typeof adsSlot !== 'undefined' && typeof adsSlot[i-1] !== 'undefined'){
            if(typeof adsSlot[i-1][2] !== 'undefined' && adsSlot[i-1][2] == 'flying_carpet_ads'){
               fly_ads_cls = 'flying_carpet_ads';
               fly_ads_start_div = '<div class="adinner"><div class="adinner-fxbox">';
               fly_ads_end_div = '</div></div>';
            }
            
            if(typeof adsSlot[i-1][4] === 'undefined' && adsSlot[i-1][4] != 'flying_carpet_ads'){
                if(article_data[ad_limit]) {
                    article_data[ad_limit] += '<div class="ad-center '+fly_ads_cls+'"  data-ad-id="'+adsSlot[i-1][0]+'" data-ad-size="'+adsSlot[i-1][1]+'">';  
                } else {
                    article_data[ad_limit] = '<div class="ad-center '+fly_ads_cls+'"  data-ad-id="'+adsSlot[i-1][0]+'" data-ad-size="'+adsSlot[i-1][1]+'">';  
                }
            }
            
            if(disp_type == 'mobile'){
                if(article_data[ad_limit]){
                    article_data[ad_limit] += fly_ads_start_div;
                    article_data[ad_limit] += this.displayAds(adsSlot[i-1][0]);
                    article_data[ad_limit] += fly_ads_end_div;
                } else {
                    article_data[ad_limit] = fly_ads_start_div;
                    article_data[ad_limit] = this.displayAds(adsSlot[i-1][0]);
                    article_data[ad_limit] = fly_ads_end_div;
                }
                
            }else{
                if( article_data[ad_limit]){
                    article_data[ad_limit] += this.displayAmpAds(adsSlot[i-1][0] , adsSlot[i-1][1] , adsSlot[i-1][2] , adsSlot[i-1][3] , adsSlot[i-1][4] , ads_catSlug);
                } else {
                    article_data[ad_limit] = this.displayAmpAds(adsSlot[i-1][0] , adsSlot[i-1][1] , adsSlot[i-1][2] , adsSlot[i-1][3] , adsSlot[i-1][4] , ads_catSlug);
                }
            }
            
            if(typeof adsSlot[i-1][4] === 'undefined' && adsSlot[i-1][4] != 'flying_carpet_ads'){
                if(article_data[ad_limit]) {
                    article_data[ad_limit] += '</div>';
                } else {
                    article_data[ad_limit] = '</div>';
                }
            }
        }    
    }
    
    final_content = article_data.join("<p>");
    return final_content;
}

exports.isMobileVar = function(req){
    let reqheaders = req.headers;
    let isMobile = 0;
    if (reqheaders['x-akamai-device-characteristics'] != undefined) {
        deviceChar = reqheaders['x-akamai-device-characteristics'];
        deviceChracterizaionArr = deviceChar.split("=");
        isMobile = deviceChracterizaionArr[1];
        if (isMobile == 'true') {
            isMobile = 1;
        } else {
            isMobile = 0;
        }
    }
    if (isMobile == 1) {
        device = 'mobile';
    } else {
        device = 'desktop';
    }
    let deviceDetails = {
        'device':device,
        'isMobile':isMobile
    };
    return deviceDetails;

}