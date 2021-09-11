/*
*==================================================================
* Project: Firstpost English
* Controller: Board Result
* Created By: Nitin Mankani
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
exports.stateresult = function(req, res, next) {
    var deviceDetails = common.isMobileVar(req);
    const device  = deviceDetails.device;
    const isMobile  = deviceDetails.isMobile;
    //console.log("insideeee  cat func");
    /*
    *==================================================================
    * Declare All the Varibles Here only
    *=================================================================
    */
    var client = req.app.get('client');
    const clientFetch = promisify(client.get).bind(client); // now getAsync is a promisified version of client.get:
    //  console.log(client);
    var temp_vars = [];
    var record = [];
    var redisKeys = [];
    var board = (typeof req.params['board'] !== 'undefined') ? req.params['board'] : '';       //request parameter used in routes.js
    var tag_name = 'board-result';
    var pgNo = (typeof req.params['pg'] !== 'undefined') ? req.params['pg']  : 1;
    
    var pgUrl =  constant['SITE_URL']+'board-results/'+board+'-exam-result/page/';    //request parameter used in routes.js
    var limit = 10;
    var start = (isNaN(pgNo)) ? '' : ((pgNo == 1) || (pgNo == 0)) ? '0' : limit*(Number(pgNo)-1);

    var pgNoPerPage = 3;
    serverPrefix = '';
    var boardname = '';
    var stateBoardIframe = '';
    var stateBoardIframeUrl= '';
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

        /*new Promise((resolve, rej) => {
            url = "https://www.news18.com/board-results-pubstack/sequence/v2/www.news18.com.json";
            common.getRawData(url).then((urlData) => {
                boardids = JSON.parse(urlData);
                boardTopIframeUrl = common.getBoardTopIframeUrl(boardids);
                //console.log(boardTopIframeUrl);
                //temp_vars['boardData'] = boardlist;
                resolve();
            })    
        }),*/
        new Promise((resolve, rej) => {
            url = "https://www.news18.com/board-results-pubstack/priority/www.news18.com.json";
            common.getRawData(url).then((urlData) => {                                       
                //console.log(urlData,"team List");
                var boardlist = JSON.parse(urlData);
                for (const [list_key, list_value] of Object.entries(boardlist)){
                    boardname = list_value['name']['english'];
                    boardname = boardname.replace(/\s+/g, '-').toLowerCase();
                    if(boardname == board){
                        stateBoardIframe = list_value['baseUrl']+"/board-results-pubstack/board_iframe_slider.html?bid="+list_value['_id'];
                        break;
                    }
                }
                stateBoardIframeUrl = '<iframe id="boardresults" src="'+stateBoardIframe+'" frameborder="0" scrolling="no"></iframe>';
                //console.log(boardlist);
                temp_vars['boardData'] = boardlist;
                resolve();
            })    
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
                var keyArr = ['fprosarticle'];

                temp_vars['ads'] = common.getAds(keyArr,device);
                // console.log(JSON.stringify(temp_vars['ads'],null," "),"temp_vars['ads']");
            }
            resolve();

        }),
        /*
        *==================================================================
        * Use Below Promise for Outbrain Ads only
        *=================================================================
        */
        /*new Promise((resOutbrain, rejOutbrain) => {
            if (typeof constant.config_flags.OUTBRAINS_ADS_FLAG !== 'undefined' && constant.config_flags.OUTBRAINS_ADS_FLAG == 1) {
                const outbrainArr = [];
                var outbrainAdsKeyArr = [];
                outbrainAdsKeyArr['pageUrl'] = (pgNo == 1) ? constant.SITE_URL.replace(constant.SITE_URL , constant.MAIN_SITE_URL)+'tag/'+tag_name : constant.SITE_URL.replace(constant.SITE_URL , constant.MAIN_SITE_URL)+'tag/'+tag_name+'/page/'+pgNo;
                if(isMobile == 1){
                   outbrainAdsKeyArr['adsSlot'] = ['MB_2'];
                }else{
                   outbrainAdsKeyArr['adsSlot'] = ['AR_2','SB_4'];
                }
                
                temp_vars['outbrain_ads'] = common.getOutbrainAds(outbrainAdsKeyArr);
            }
            resOutbrain();
        })*/
    ]).then(() => {
        if(typeof temp_vars['tagData'] === 'undefined'){
            /*if(tag_name == ''){
                temp_vars['tagData'] = '';
            }
            else{*/
                const error_controller = appRequire('error_controller');
                return error_controller.error(req,res);
            /*}*/
            //const error_controller = appRequire('error_controller');
            //return error_controller.error(req,res);
        }
        
        else{
        temp_vars['liveMatchList'] = cricketData['liveMatchData'];
        /*
        *==================================================================
        * Get Pagination Data 
        *=================================================================
        */
        temp_vars['pagination'] =  common.getPagination(temp_vars['tagData']['solarCount'],pgNo,pgUrl,pgNoPerPage,limit);
        //console.log("tag",temp_vars['pagination']);

        /*
        *==================================================================
        * Schema code start
        *=================================================================
        */
        var schema_type_arr = [];
        var schema_meta = [];
        var breadcrumbsArr = [];

        /*
        *==================================================================
        * Get SEO data
        *=================================================================
        */
        var pageSeo = (pgNo == 1) || (pgNo == 0) ? '' : "- Page -"+ pgNo;
        var seoData = {};
        var next = Number(pgNo)+1;
        var prev = Number(pgNo)-1;
        seoData['pageUrl']   = (pgNo == 1) ? constant['SITE_URL']+'board-results/'+board+'-exam-result' : constant['SITE_URL']+'board-results/'+board+'-exam-result/page/'+pgNo;
        seoData['page_name'] = temp_vars['pageName'];
        seoData['page_type'] = "main";
        seoData['page_language'] = "en";
        //seoData['ampUrl'] = constant['SITE_URL']+'education/board-results/amp';
        seoData['metaTitle'] = common.capitalizeFLetter(board.replace(/-/g, " "))+" Exam Results 2020: Check Class 10th (SSC) / 12th (HSC) Exam Result Online India, Latest News and Updates";
        seoData['metaDesc']  = common.capitalizeFLetter(board.replace(/-/g, " "))+" Exam Results 2020 - Find 10th (SSC) / 12th (HSC) Board Exam Results 2020 on a single page. Get latest news and updates online on board exams.";
        seoData['tags'] = "board result, board result 2020, board exam result, india exam, result 2020, board results";
        seoData['next'] = constant['SITE_URL']+'board-results/'+board+'-exam-result/page/'+next;
        if(pgNo>1)
        {
            seoData['metaTitle'] = common.capitalizeFLetter(board.replace(/-/g, " "))+" Exam Results 2020: Check Class 10th (SSC) / 12th (HSC) Exam Result Online India, Latest News and Updates - Page "+pgNo;
            seoData['metaDesc'] = common.capitalizeFLetter(board.replace(/-/g, " "))+" Exam Results 2020 - Find 10th (SSC) / 12th (HSC) Board Exam Results 2020 on a single page. Get latest news and updates online on board exams - Page "+pgNo;
            seoData['prev'] = constant['SITE_URL']+'board-results/'+board+'-exam-result/page/'+prev;
        }
        //temp_vars['metaData'] = common.getMetaHtml(seoData);

        var schema_meta = [];

        schema_meta['metaTitle'] = common.capitalizeFLetter(board.replace(/-/g, " "))+" Exam Results 2020: Check Class 10th (SSC) / 12th (HSC) Exam Result Online India, Latest News and Updates";
        schema_meta['metaDesc']  = common.capitalizeFLetter(board.replace(/-/g, " "))+" Exam Results 2020 - Find 10th (SSC) / 12th (HSC) Board Exam Results 2020 on a single page. Get latest news and updates online on board exams.";
        schema_meta['contentUrl'] = (pgNo == 1) ? constant['SITE_URL']+'board-results/'+board+'-exam-result' : constant['SITE_URL']+'board-results/'+board+'-exam-result/page/'+pgNo;
        schema_meta['schema_type'] = ["webpage","state"];
        schema_meta['flag'] = 0;
        temp_vars['schema_meta'] = schema_meta;
        
        /*
        *==================================================================
        * Assign Template Varibles Here
        *=================================================================
        */
        temp_vars['constant'] = constant;
        temp_vars['common'] = common;
        temp_vars['dateFormat'] = dateFormat;
        temp_vars['seoData'] = seoData;
        temp_vars['viewpath'] = constant.viewpath;
        temp_vars['device'] = device;
        temp_vars['isMobile'] = isMobile;
        temp_vars['footer'] = constant.footer;
        temp_vars['tag_name'] = tag_name;
        temp_vars['board'] = board;
        temp_vars['stateBoardIframeUrl'] = stateBoardIframeUrl;
        temp_vars['pgNo'] = pgNo;
        temp_vars['pgUrl'] = pgUrl;
        temp_vars['start'] = start;
        temp_vars['pageName'] = 'stateResult';
        temp_vars['breadcrumbsArr'] = breadcrumbsArr;
        temp_vars['mobilePageCss'] = constant.SITE_URL+'static/css/m-category-fp.css';
        temp_vars['desktopPageCss'] = constant.SITE_URL+'static/css/tag-fp.css';
        //console.log("ccccc",temp_vars['schema_meta']);
        /*==================== End of Assignment of Template Variables ====================*/
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
        res.render(device + '/firstpost/stateResult', templateVars); 
        /*==================== End of rendering a view ==============================*/
        }
    })
    
}
