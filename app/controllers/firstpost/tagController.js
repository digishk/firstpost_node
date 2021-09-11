/*
*==================================================================
* Project: Firstpost English
* Controller: Tag
* Created By: Shalini
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
exports.tag = function(req, res, next) {
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
    
    var tag_name = (typeof req.params['tag_name'] !== 'undefined') ? req.params['tag_name'] : '';    //request parameter used in routes.js
    var pgNo = (typeof req.params['pg'] !== 'undefined') ? req.params['pg']  : 1;
    
    var pgUrl =  constant['SITE_URL']+'tag/'+tag_name+'/page/';    //request parameter used in routes.js
    var limit = 20;
    var start = (isNaN(pgNo)) ? '' : ((pgNo == 1) || (pgNo == 0)) ? '0' : limit*(Number(pgNo)-1);

    var pgNoPerPage = 3;
    serverPrefix = '';
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
            if(tag_name != ''){
                common.getTagPageResults(tag_name,start,limit,pgNo).then((data) => {
                    temp_vars['tagData'] = data;
                    resolve();
                });
            }
            else
            {
                temp_vars['tagData'] = '';
                return resolve();
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
                var keyArr = ['fpros','fptaglist'];

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
        new Promise((resOutbrain, rejOutbrain) => {
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
        })
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

        menuArr = common.getAllMenuLinks(constant.fp_menu);
        var fullUrl = constant.SITE_URL+'tag/'+tag_name;
        for (const [menuArr_key, menuArr_val] of Object.entries(menuArr[3])) {
            
            if (fullUrl == menuArr_val) {
                splmenuArr_key = menuArr_key.split("=##=");
                splcat = splmenuArr_key[0].split("~");
                if(typeof splcat !== 'undefined')
                {
                    temp_vars['active_level2_nav_slug'] = splcat[1];
                }
                if(typeof splmenuArr_key[0] !== 'undefined')
                {
                    temp_vars['level3_nav_slug'] = splmenuArr_key[0];
                    temp_vars['active_level3_nav_slug'] = splmenuArr_key[1];
                }
            }
        }

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
        * Breadcrumb schema  
        *=================================================================
        */
        
        breadcrumbsArr[constant.SITE_URL] = "Latest News";
        if(tag_name != ''){
            breadcrumbsArr[constant.SITE_URL+'tag/'+tag_name] = common.capitalizeFLetter(tag_name);
        }

        /* Breadcrumb schema end */

        /*
        *==================================================================
        * Get SEO data
        *=================================================================
        */
        var pageSeo = (pgNo == 1) || (pgNo == 0) ? '' : "- Page -"+ pgNo;
        var seoData = {};
        var next = Number(pgNo)+1;
        var prev = Number(pgNo)-1;
        seoData['pageUrl']   = (pgNo == 1) ? constant['SITE_URL']+'tag/'+tag_name : constant['SITE_URL']+'tag/'+tag_name+'/page/'+pgNo;
        seoData['page_name'] = temp_vars['pageName'];
        seoData['page_type'] = "main";
        seoData['page_language'] = "en";
        if(tag_name != "")
            seoData['ampUrl'] = constant['SITE_URL']+'tag/'+tag_name+'/amp';
        if(tag_name != ''){
            seoData['metaTitle'] = common.capitalizeFLetter(tag_name.replace(/-/g, ' '))+" | Latest News on "+common.capitalizeFLetter(tag_name)+" | Breaking Stories and Opinion Articles - Firstpost"+ pageSeo;
            seoData['metaDesc']  ="Latest News on "+common.capitalizeFLetter(tag_name.replace(/-/g, ' '))+". Read breaking stories and opinion articles on "+tag_name+" at Firstpost"+ pageSeo;
        }
        seoData['next'] = constant['SITE_URL']+'tag/'+tag_name+'/page/'+next;
        if(pgNo>1)
        {
            seoData['prev'] = constant['SITE_URL']+'tag/'+tag_name+'/page/'+prev;

        }
        //temp_vars['metaData'] = common.getMetaHtml(seoData);

        var schema_meta = [];

        if(tag_name != ''){
            schema_meta['metaTitle'] = common.capitalizeFLetter(tag_name.replace(/-/g, ' '))+" | Latest News on "+common.capitalizeFLetter(tag_name)+" | Breaking Stories and Opinion Articles - Firstpost"+ pageSeo;
            schema_meta['metaDesc']  = "Latest News on "+common.capitalizeFLetter(tag_name.replace(/-/g, ' '))+". Read breaking stories and opinion articles on "+tag_name+" at Firstpost"+ pageSeo;
        }
        schema_meta['contentUrl'] = (pgNo == 1) ? constant['SITE_URL']+'tag/'+tag_name : constant['SITE_URL']+'tag/'+tag_name+'/page/'+pgNo;

        schema_meta['schema_type'] = ["organisation","website","webpage"];
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
        temp_vars['pgNo'] = pgNo;
        temp_vars['pgUrl'] = pgUrl;
        temp_vars['start'] = start;
        temp_vars['pageName'] = 'tag';
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
        res.render(device + '/firstpost/tag', templateVars); 
        /*==================== End of rendering a view ==============================*/
        }
    })
    
}


exports.manjul_toons = function(req, res, next) {
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
    
    var tag_name =  'manjul';//req.params['tag_name'];    //request parameter used in routes.js
    var pgNo = (req.params['pg'] !== undefined) ? req.params['pg']  : 1;
    
    var pgUrl =  constant['SITE_URL']+'manjul-toons/page/';    //request parameter used in routes.js
    var limit = 21;
    var start = (isNaN(pgNo)) ? '' : ((pgNo == 1) || (pgNo == 0)) ? '0' : limit*(Number(pgNo)-1);

    var pgNoPerPage = 3;
    serverPrefix = '';
    /*==================== End of Declaration of all variables ====================*/
    /*
    *==================================================================
    * Create Promise here
    *=================================================================
    */

    Promise.all([

        new Promise((resolve, rej) => {
            common.getTagPageResults(tag_name,start,limit,pgNo).then((data) => {
               // temp_vars['tagData'] = data;
                 temp_vars['solrCnt'] = data['solarCount'];
                //console.log("cnt is",solrCnt);
                let i = 0;
                var redisKeys = [];

                for (var key in data['solarResults']) {
                    redisKeys[key] = serverPrefix + "fp_2.0_setPostDetail_" + data['solarResults'][key]['ID']; // Will print `OK`
                }

                return new Promise((res, rej) => {
                    var tagData = [];
                    let i = 0;
                    async.each(redisKeys, function(redisKeysVal, level2_callback) {
                        client.get(redisKeysVal, function(err, post_response) {
                            if (err) {
                                return level2_callback(err);
                            }
                            tagData[i] = [];
                            json_post_response = JSON.parse(post_response);
                            tagData[i]['post_date'] = json_post_response['post']['post_date'];
                            tagData[i]['imageUrl'] = json_post_response['meta']['Manjul-img'];
                            tagData[i]['image'] = json_post_response['image'];
                            tagData[i]['url'] = json_post_response['post']['post_url'];
                            tagData[i]['Manjul-img'] = (json_post_response['meta']['Manjul-img']!==undefined && json_post_response['meta']['Manjul-img']!="")?json_post_response['meta']['Manjul-img']:json_post_response['post']['post_image'];
                            tagData[i]['ID'] = json_post_response['post']['ID'];
                            tagData[i]['description'] = json_post_response['post']['post_description'];
                            tagData[i]['title'] = json_post_response['post']['post_title'];
                           // var formatdate = dateFormat(tagData[i]['post_date'], "dddd, mmmm dS, yyyy, h:MM:ss TT");
                            tagData[i]['formatdate'] = dateFormat(tagData[i]['post_date'], "mmm dS, yyyy | h:MM:ss")+" IST";
                            i = Number(i) + 1;
                            return level2_callback();
                        });
                    }, function(err) {
                        if (err) {}
                        temp_vars['tagData'] = tagData; 
                        return res();
                    });
                })
                
                
            }).then((data) => {
                resolve();
            });
        }),
         new Promise((resolve, rej) => {
            if(constant.hideJSforEU == 'no')
            {
                const adsArr = [];
                var keyArr = ['fpmanjul-toons'];

                temp_vars['ads'] = common.getAds(keyArr,device);
                // console.log(JSON.stringify(temp_vars['ads'],null," "),"temp_vars['ads']");
            }
            resolve();

        })

    ]).then(() => {     
        /*
        *==================================================================
        * Get Pagination Data 
        *=================================================================
        */
        //temp_vars['pagination'] =  common.getPagination(temp_vars['tagData']['solarCount'],pgNo,pgUrl,pgNoPerPage,limit);
        temp_vars['pagination'] =  common.getPagination(temp_vars['solrCnt'],pgNo,pgUrl,pgNoPerPage,limit);
        console.log("manjul",temp_vars['pagination']);
        /*
        *==================================================================
        * Get SEO data
        *=================================================================
        */
        var pageSeo = (pgNo == 1) || (pgNo == 0) ? '' : "- Page -"+ pgNo;
        var seoData = {};
        var next = Number(pgNo)+1;
        var prev = Number(pgNo)-1;
        seoData['pageUrl']   = (pgNo == 1) ? constant['SITE_URL']+'manjul-toons' : constant['SITE_URL']+'manjul-toons/page/'+pgNo;
        seoData['page_name'] = temp_vars['pageName'];
        seoData['page_type'] = "main";
        seoData['page_language'] = "en";
        seoData['metaTitle'] = "Manjul Toons | Satirical News | Satire News | Indian Editorial Cartoonist";
        seoData['metaDesc']  ="Read all the latest breaking news on Satire by Manjul toons at Firstpost.com. Find all latest satirical news, Fake News, Bias News, Evaluating News created by Manjul, an editorial cartoonist of India.";
        seoData['tags'] = "Manjul Toons, Satirical News, Satire News, Fake News, Bias News, Evaluating News, Indian cartoonist, Indian Editorial Cartoonist";
        seoData['next'] = constant['SITE_URL']+'manjul-toons/page/'+next;
        if(pgNo>1)
        {
            seoData['prev'] = constant['SITE_URL']+'manjul-toons/page/'+prev;

        }

        var schema_meta = [];

        schema_meta['metaTitle'] = "Manjul Toons | Satirical News | Satire News | Indian Editorial Cartoonist";
        schema_meta['metaDesc']  = "Read all the latest breaking news on Satire by Manjul toons at Firstpost.com. Find all latest satirical news, Fake News, Bias News, Evaluating News created by Manjul, an editorial cartoonist of India.";
        schema_meta['contentUrl'] = (pgNo == 1) ? constant['SITE_URL']+'manjul-toons' : constant['SITE_URL']+'manjul-toons/page/'+pgNo;

        schema_meta['schema_type'] = ["organisation","website","webpage"];
        schema_meta['flag'] = 0;
        temp_vars['schema_meta'] = schema_meta;

        /*
        *==================================================================
        * Assign Template Varibles Here
        *=================================================================
        */
        //console.log(temp_vars['tagData']);
        temp_vars['constant'] = constant;
        temp_vars['common'] = common;
        temp_vars['seoData'] = seoData;
        temp_vars['viewpath'] = constant.viewpath;
        temp_vars['device'] = device;
temp_vars['isMobile'] = isMobile;
        temp_vars['dateFormat'] = dateFormat;
        temp_vars['footer'] = constant.footer;
        temp_vars['pgUrl'] = pgUrl;
        temp_vars['pgNo'] = pgNo;
        temp_vars['start'] = start;
        temp_vars['mobilePageCss'] = constant.SITE_URL+'static/css/m-manjul-toons-fp.css';
        temp_vars['desktopPageCss'] = constant.SITE_URL+'static/css/manjul-toons-fp.css';
        temp_vars['pageName'] = 'manjul-toons';
        
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
        res.render(device + '/firstpost/manjul-toons', templateVars); 
        /*==================== End of rendering a view ==============================*/
    })    
 } 
