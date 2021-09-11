/*
*==================================================================
* Project: Firstpost English
* Controller: Shows Article
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
exports.showsArticle = function(req, res, next) {
    var deviceDetails = common.isMobileVar(req);
    const device  = deviceDetails.device;
    const isMobile  = deviceDetails.isMobile;
	//console.log("insideeee  movie review");
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
    let shareArr = [];
    let seoData = [];
    let json_post_response = [];
    let breadcrumbsArr = [];
    let videoURLArr = [];
    let alsoSee = [];
    let solrPageJson = [];
    let newPostSlug = '';
    let post_url = postUrl = postSlugId = postPageSlug = postContent = tags_data  = tags_data_new  = youtube_js_flag = catSlugCapi = episodeArr = "";

    let sub_catSlug =  req.params['subcategory_slug'];
    let postSlug =  req.params['article_slug'];
    let postid =  req.params['article_id'];

    catSlugCapi = common.capitalizeFLetter(sub_catSlug);

    Promise.all([
        clientFetch(serverPrefix + "fp_top_stories_article_data").then((result)=> {
            temp_vars['mostReadArtcles'] = JSON.parse(result); 
        }),        
        clientFetch("FPShowsHomeListing").then((showListing)=> {
            temp_vars['showListing'] = JSON.parse(showListing); 
        }),

        new Promise((resolve, reject) => {
            clientFetch(serverPrefix+"fp_2.0_setPostDetail_"+postid).then((response) => {
                postPageJson = JSON.parse(response);
                //console.log(postPageJson);
                
                if(postPageJson == '' || postPageJson == undefined){
                    //res.status(404).redirect(constant.SITE_URL+'error-404');
                    const error_controller = appRequire('error_controller');
                    return error_controller.error(req,res);
                }
                
                post_url = postPageJson['post']['post_name']+"-"+postid;
                postUrl = postPageJson['post']['post_url'];
                postSlugId = postSlug+'-'+postid;
                //postPageSlug = postPageJson['category'][0]['slug'];

                newPostSlug = postPageJson['post']['post_title'].replace(/[^a-zA-Z ]/g, "").split(" ");

                //temp_vars['postPageSlug'] = postPageSlug;

                postContent = postPageJson['post']['post_content'];

                /******* get tags from article ********/
                if(postPageJson['tag'] != undefined && postPageJson['tag'] != ''){
                    for (const [pk, pval] of Object.entries(postPageJson['tag'])){
                        
                        if(pval['slug'] == 'fifa-world-cup-2018'){
                            fifaPredict = 1; 
                        }
                        if(pval['slug'] == 'birla-mutual-funds'){
                            shw = 1; break;
                        }else if(pval['slug'] == 'world-environment-day-2017'){
                            $shw = 2; break;
                        }
                        tags_data += pval['name'];

                        tags_data_new += pval['name'].replace(/'/g,'');

                        if(pval['slug'] == 'ipl-2017'){iplFlag = true;}
                        if(pval['slug'] == 'mcd-election-2017'){mcdFlag = true};
                        if(pval['slug'] == 'ct-2017'){ctTrophyFlg = true}; // For Champions Trophy
                        if(pk != (postPageJson['tag'].length - 1)) tags_data += ',';
                        if(pk != (postPageJson['tag'].length - 1)) tags_data_new += "','";
                    };
                    
                }
                /******* get tags from article ********/

                var liveBlogIncludeFlag = false;
                temp_vars['liveBlogIncludeFlag'] = liveBlogIncludeFlag;

                /******* get video player data ******/
                if(postPageJson['meta']['Media-URL'] != "" || postPageJson['meta']['Daily-Motion-VideoId'] != "" || postPageJson['meta']['youtube-video-id'] != "" || postPageJson['meta']['Show-URL'] != ""){
                    
                    isLive = '';
                    viddata_arr = {};
                    viddata_arr['post_date'] = postPageJson['post']['post_modified']; 
                    viddata_arr['post_title'] = postPageJson['post']['post_title']; 
                    viddata_arr['ID'] = postPageJson['post']['ID']; 
                    viddata_arr['Daily-Motion-VideoId'] = postPageJson['meta']['Daily-Motion-VideoId'];
                    viddata_arr['media-url'] = postPageJson['meta']['Media-URL'];
                    if(postPageJson['meta']['Show-URL'] != ''){
                    youtube_js_flag = 1;
                    var video_id = postPageJson['meta']['Show-URL'].split('v=')[1];
                    var ampersandPosition = video_id.indexOf('&');

                    if(ampersandPosition != -1) {
                      video_id = video_id.substring(0, ampersandPosition);
                    }
                        viddata_arr['youtube-video-id'] = video_id;
                    }else{
                        viddata_arr['youtube-video-id'] = postPageJson['meta']['youtube-video-id'];
                    }

                    
                    custom_params = {};
                    custom_params['autoplay'] = "true";
                    custom_params['mute'] = "true";
                    custom_params['width'] = "100%";
                    if(isMobile == 1){
                        custom_params['height'] = "250px";
                    }else{
                        custom_params['height'] = "350px";    
                    }
                    custom_params['style'] = "";
                    custom_params['solarSlug'] = "shows";
                    
                    //videoURLArr = common.getVideoPlayer(viddata_arr , custom_params);
                    common.getVideoPlayerURL(req,viddata_arr,custom_params,isLive).then((videoArr) => {
                        videoURLArr = videoArr['video_player'];
                        //console.log("videoURLArr",videoURLArr);
                    });

                }
            })
	    .then(()=>{
                /*
                *==================================================================
                * Use Below Promise for Outbrain Ads only
                *=================================================================
                */
                new Promise((resOutbrain, rejOutbrain) => {
                    if (typeof constant.config_flags.OUTBRAINS_ADS_FLAG !== 'undefined' && constant.config_flags.OUTBRAINS_ADS_FLAG == 1) {
                        const outbrainArr = [];
                        var outbrainAdsKeyArr = [];
                        outbrainAdsKeyArr['pageUrl'] = postPageJson['post']['post_url'];
                        if(isMobile == 1){
                           outbrainAdsKeyArr['adsSlot'] = ['MB_1'];
                        }else{
                            outbrainAdsKeyArr['adsSlot'] = ['AR_1' , 'SB_1'];
                        }
                        
                        //console.log(outbrainAdsKeyArr , "outbrainAdsKeyArr");
                        temp_vars['outbrain_ads'] = common.getOutbrainAds(outbrainAdsKeyArr);
                        // console.log(JSON.stringify(temp_vars['ads'],null," "),"temp_vars['ads']");
                    }
                    resOutbrain();
                })
	    })	
            .then(() => resolve()).catch((err) => { res.redirect('/shows'); })
        }),

        new Promise((resolve, rej) => {
            common.getCategoryResults(1,10,1,sub_catSlug).then((data) => {
                solrPageJson = data;
                //console.log("solrjson",solrPageJson);
                //resolve();
            }).then(() => { 
                let i = 0;
                if(typeof solrPageJson !== 'undefined'){
                    for (var key in solrPageJson['solarResults']) {
                        redisKeys[key] = serverPrefix +"fp_2.0_setPostDetail_" + solrPageJson['solarResults'][key]['ID']; // Will print `OK`
                    }
                } 
                return new Promise((res, rej) => {
                    async.each(redisKeys, function(ky, level2_callback) {
                        client.get(ky, function(err, post_response) {
                            if (err) {
                                return level2_callback(err);
                            }
                            json_post_response[i] = JSON.parse(post_response);// return level2_callback(err,post_response);
                            //console.log(JSON.stringify(json_post_response, null, "  "));
                            i = Number(i) + 1;
                            return level2_callback();
                        });
                    }, function(err) {
                        if (err) {}
                        temp_vars['episodeArr'] = json_post_response; 
                        //console.log("episodeArr",temp_vars['episodeArr']);
                        return res();
                    });
                    
                })   
            }).then((data) => {
                return resolve();
            })    
        }),
        /*
        *==================================================================
        * Use This Promise for Level2 Menu only
        *=================================================================
        */
        new Promise((resolve, rej) => {
            if(constant.hideJSforEU == 'no')
            {
                const adsArr = [];
                var keyArr = ['fprosarticle','fpshowsarticle'];
                
                temp_vars['ads'] = common.getAds(keyArr,device);
                 //console.log(JSON.stringify(temp_vars['ads'],null," "),"temp_vars['ads']");
            }
            resolve();

        })
    ]).then(() => {
        temp_vars['liveMatchList'] = cricketData['liveMatchData'];
        temp_vars['pageName'] = 'showsArticle';

        /*
        *==================================================================
        * Schema code start
        *=================================================================
        */
        //var schema_type_arr = [];
        /*
        *==================================================================
        * Breadcrumb schema  
        *=================================================================
        */
        var formatSlug = common.capitalizeEWLetter(sub_catSlug.replace(/-/g," "))+' Shows';
        
        var listitem_2 = constant.SITE_URL+'shows';
        var listitem_3 = constant.SITE_URL+'shows/'+sub_catSlug;
        breadcrumbsArr[constant.SITE_URL] = "Latest News";
        breadcrumbsArr[listitem_2] = "Shows"; //Donot delete , this is for reference
        breadcrumbsArr[listitem_3] = formatSlug;

        //temp_vars['breadcrumb'] = common.getSchema(breadcrumbsArr,["breadcrumbs"],0);

        /* Breadcrumb schema end */

        var schema_meta = [];

        schema_meta['metaTitle'] = postPageJson['post']['post_title'];
        schema_meta['metaDesc']  = postPageJson['post']['post_excerpt']+'- Watch online HD free at Firstpost.com.';
        schema_meta['contentUrl'] = constant.SITE_URL+'shows/'+sub_catSlug+'/'+postPageJson['post']['post_name']+'-'+postPageJson['post']['ID']+'.html';
        schema_meta['metaAuthor'] = postPageJson['post']['post_authorname'];
        schema_meta['metaAuthorSlug'] = postPageJson['post']['post_authorslug'];

        schema_meta['content_Type'] = postPageJson['post']['Content_Type'];
        
        schema_meta['post_content'] = postPageJson['post']['post_content'].replace( /(<([^>]+)>)/ig, '');
        schema_meta['post_published'] = postPageJson['post']['post_date'].replace(' ' , 'T')+'+05:30';

        schema_meta['post_modified'] = postPageJson['post']['post_modified'].replace(' ' , 'T')+'+05:30';
        schema_meta['post_image'] = postPageJson['post']['post_image'];
        schema_meta['tags'] = tags_data;
        
        schema_meta['schema_type'] = ["organisation","webpage","VideoObject"];

        schema_meta['flag'] = 0;
        temp_vars['schema_meta'] = schema_meta;

        //console.log(schema_meta);

        shareArr['shareTitle'] = postPageJson['post']['post_title'].replace(/'/g , "").replace(/"/g , '');
        shareArr['shareUrl'] = postPageJson['post']['post_url'];    
/*
        *==================================================================
        * Get Seo Data
        *=================================================================
        */
        if(postPageJson['meta']['og_image'] != undefined && postPageJson['meta']['og_image'] != ''){
            ogImg = postPageJson['meta']['og_image'];
        }else{
            ogImg = postPageJson['post']['post_image'];
        }
        
        if(postPageJson['meta']['twitter_image'] != undefined && postPageJson['meta']['twitter_image'] != ''){
            twitImg = postPageJson['meta']['twitter_image'].replace("wp-content/uploads","fpimages/300x300/fixed/jpg/scalex16x9");
        }else{
            twitImg = postPageJson['post']['post_image'].replace("wp-content/uploads","fpimages/300x300/fixed/jpg/scalex16x9");
        }
        
        seoData['metaTitle'] = postPageJson['post']['post_title'].replace(/'/g , "").replace(/"/g , '')+' - Firstpost';
        seoData['metaDesc']  = postPageJson['post']['post_excerpt'].replace(/'/g , "").replace(/"/g , '')+'- Watch online HD free at Firstpost.com.';
        seoData['pageUrl']   = postPageJson['post']['post_url'];
        seoData['page_name'] = temp_vars['pageName'];
        seoData['page_type'] = temp_vars['pageName'];
        seoData['ogImg'] = ogImg;
        seoData['twitImg'] = twitImg;
        if(postPageJson['meta']['Canonical-Url'] != undefined && postPageJson['meta']['Canonical-Url'] != ''){
            seoData['canonicalUrl'] = postPageJson['meta']['Canonical-Url'];
        }else{
            seoData['canonicalUrl'] = postPageJson['post']['post_url'];
        }
        seoData['page_language'] = "en";
        seoData['contentType'] = temp_vars['pageName'];
        seoData['tags'] = tags_data;
        seoData['tags_arr'] = postPageJson['tag'];
        //seoData['solarSlug'] = catSlug;
        seoData['ampUrl'] = postPageJson['post']['post_url']+'/amp';
        seoData['page_name'] = temp_vars['pageName'];
        seoData['modified_time'] = dateFormat(postPageJson.post.post_modified , "yyyy-mm-dd'T'HH:MM:ss+05:30");
        seoData['updated_time'] = dateFormat(postPageJson.post.post_modified , "yyyy-mm-dd'T'HH:MM:ss+05:30");
        if (temp_vars['pageName'] == 'article'){
            seoData['published_time'] = dateFormat(postPageJson.post.post_date , "yyyy-mm-dd'T'HH:MM:ss+05:30");
        }else{
            seoData['published_time'] = dateFormat(postPageJson.post.post_modified , "yyyy-mm-dd'T'HH:MM:ss+05:30");
        }    
        
        //temp_vars['metaData'] = common.getMetaHtml(seoData , postPageJson);
        temp_vars['seoData'] = seoData;

         /*
        *==================================================================
        * Get Level 3 slug
        *=================================================================
        */
        temp_vars['level3_nav_slug'] = "section~entertainment";
        
        /*
        *==================================================================
        * Assign Template Varibles Here
        *=================================================================
        */
        temp_vars['constant'] = constant;
        temp_vars['common'] = common;
        temp_vars['dateFormat'] = dateFormat;
        temp_vars['viewpath'] = constant.viewpath;
        temp_vars['device'] = device;
temp_vars['isMobile'] = isMobile;
        temp_vars['footer'] = constant.footer;
        temp_vars['videoURLArr'] = videoURLArr;
        temp_vars['sub_catSlug'] = sub_catSlug;
        temp_vars['catSlug'] = sub_catSlug;
        temp_vars['newPostSlug'] = newPostSlug;
        temp_vars['postid'] = postid;
        //temp_vars['pgUrl'] = pgUrl;
        temp_vars['seoData'] = seoData;
        temp_vars['shareArr'] = shareArr;
        temp_vars['youtube_js_flag'] = youtube_js_flag;
        temp_vars['breadcrumbsArr'] = breadcrumbsArr;
        temp_vars['mobilePageCss'] = constant.SITE_URL+'static/css/m-shows-lp-fp.css';
        temp_vars['desktopPageCss'] = constant.SITE_URL+'static/css/article-shows-fp.css';
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
        res.render(device + '/firstpost/showsConsumption', templateVars); 
        /*==================== End of rendering a view ==============================*/
    })
}

exports.showsCategory = function(req, res, next) {
    var deviceDetails = common.isMobileVar(req);
    const device  = deviceDetails.device;
    const isMobile  = deviceDetails.isMobile;
    //console.log("insideeee  movie review");
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
    let shareArr = [];
    let seoData = [];
    let json_post_response = [];
    let breadcrumbsArr = [];
    let videoURLArr = [];
    let alsoSee = [];
    let solrPageJson = [];
    let postPageJson = [];
    let categoryData = [];
    let post_url = postUrl = postSlugId = postPageSlug = postContent = tags_data  = youtube_js_flag = episodeArr = "";

    let category_slug =  req.params['category_slug'];

    var pgNo = (req.params['pg'] !== undefined) ? req.params['pg']  : 1;

    var pgUrl =  constant['SITE_URL']+'shows/'+category_slug+'/page/';    //request parameter used in routes.js
    //console.log("pgno",pgNo);
    var limit = 10;
    var start = (isNaN(pgNo)) ? '' : ((pgNo == 1) || (pgNo == 0)) ? '0' : limit*(Number(pgNo)-1);

    var pgNoPerPage = 3;

    

    Promise.all([
        clientFetch(serverPrefix + "fp_top_stories_article_data").then((result)=> {
            temp_vars['mostReadArtcles'] = JSON.parse(result); 
        }),        
        clientFetch("FPShowsHomeListing").then((showListing)=> {
            temp_vars['showListing'] = JSON.parse(showListing); 
            //console.log("showslis",temp_vars['showListing']);
        }),

        new Promise((resolve, rej) => {
            common.getCategoryResults(start,limit,pgNo,category_slug).then((data) => {
                solrPageJson = data;

                temp_vars['ctgData'] = solrPageJson;
                //console.log("ctgData",temp_vars['ctgData']);
                //resolve();
            }).then(() => { 
                if(typeof solrPageJson !== 'undefined'){
                    clientFetch(serverPrefix + "fp_2.0_setPostDetail_" + solrPageJson['solarResults'][0]['ID']).then((response)=> {
                        temp_vars['categoryData'] = JSON.parse(response); 
                        postPageJson = temp_vars['categoryData'];
                        //console.log("caaaa",postPageJson);

                        /*if(postPageJson == '' || postPageJson == undefined){
                            //res.status(404).redirect(constant.SITE_URL+'error-404');
                            const error_controller = appRequire('error_controller');
                            return error_controller.error(req,res);
                        }*/

                        /******* get video player data ******/
                        if(postPageJson['meta']['Media-URL'] != "" || postPageJson['meta']['Daily-Motion-VideoId'] != "" || postPageJson['meta']['youtube-video-id'] != "" || postPageJson['meta']['Show-URL'] != ""){
                            
                            isLive = '';
                            viddata_arr = {};
                            viddata_arr['post_date'] = postPageJson['post']['post_modified']; 
                            viddata_arr['post_title'] = postPageJson['post']['post_title']; 
                            viddata_arr['ID'] = postPageJson['post']['ID']; 
                            viddata_arr['Daily-Motion-VideoId'] = postPageJson['meta']['Daily-Motion-VideoId'];
                            viddata_arr['media-url'] = postPageJson['meta']['Media-URL'];
                            if(postPageJson['meta']['Show-URL'] != ''){
                                youtube_js_flag = 1;
                                var video_id = postPageJson['meta']['Show-URL'].split('v=')[1];
                                var ampersandPosition = video_id.indexOf('&');

                                if(ampersandPosition != -1) {
                                  video_id = video_id.substring(0, ampersandPosition);
                                }
                                viddata_arr['youtube-video-id'] = video_id;
                            }else{
                                viddata_arr['youtube-video-id'] = postPageJson['meta']['youtube-video-id'];
                            }

                            custom_params = {};
                            custom_params['autoplay'] = "true";
                            custom_params['mute'] = "true";
                            custom_params['width'] = "100%";
                            if(isMobile == 1){
                                custom_params['height'] = "250px";
                            }else{
                                custom_params['height'] = "350px";    
                            }
                            custom_params['style'] = "";
                            custom_params['solarSlug'] = "shows";
                            
                            //videoURLArr = common.getVideoPlayer(viddata_arr , custom_params);
                            common.getVideoPlayerURL(req,viddata_arr,custom_params,isLive).then((videoArr) => {
                                videoURLArr = videoArr['video_player'];
                                //console.log("videoURLArr",videoURLArr);
                            });

                        }
                        /******* get video player data ******/
                        //console.log("cattt dat",categoryData);
                    })
                } 
            }).then(() => { 
                let i = 0;
                if(typeof solrPageJson !== 'undefined'){
                    for (var key in solrPageJson['solarResults']) {
                        if(key === 0){ continue; }
                        redisKeys[key] = serverPrefix +"fp_2.0_setPostDetail_" + solrPageJson['solarResults'][key]['ID']; // Will print `OK`
                    }
                } 
                return new Promise((res, rej) => {
                    async.each(redisKeys, function(ky, level2_callback) {
                        client.get(ky, function(err, post_response) {
                            if (err) {
                                return level2_callback(err);
                            }
                            json_post_response[i] = JSON.parse(post_response);// return level2_callback(err,post_response);
                            //console.log(JSON.stringify(json_post_response, null, "  "));
                            i = Number(i) + 1;
                            return level2_callback();
                        });
                    }, function(err) {
                        if (err) {}
                        temp_vars['listingArr'] = json_post_response; 
                        //console.log("listingArr",temp_vars['listingArr']);
                        return res();
                    });
                    
                })   
            }).then((data) => {
                return resolve();
            }) 
        }).catch(() => {
                resolve();
            }),
        /*
        *==================================================================
        * Use This Promise for Level2 Menu only
        *=================================================================
        */
        
        /*
        *==================================================================
        * Use Below Promise for Ads only
        *=================================================================
        */
        new Promise((resolve, rej) => {
            if(constant.hideJSforEU == 'no')
            {
                const adsArr = [];
                var keyArr = ['fpros','fpcatshows'];
                
                temp_vars['ads'] = common.getAds(keyArr,device);
                 //console.log(JSON.stringify(temp_vars['ads'],null," "),"temp_vars['ads']");
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
		outbrainAdsKeyArr['pageUrl'] = (pgNo == 1) ? constant.SITE_URL.replace(constant.SITE_URL , constant.MAIN_SITE_URL)+'shows/'+category_slug : constant.SITE_URL.replace(constant.SITE_URL , constant.MAIN_SITE_URL)+'category/'+category_slug+'/page/'+pgNo;
		if(isMobile == 1){
		   outbrainAdsKeyArr['adsSlot'] = ['MB_2'];
		}else{
		    outbrainAdsKeyArr['adsSlot'] = ['AR_2' , 'SB_4'];
		}
		
		//console.log(outbrainAdsKeyArr , "outbrainAdsKeyArr");
		temp_vars['outbrain_ads'] = common.getOutbrainAds(outbrainAdsKeyArr);
		// console.log(JSON.stringify(temp_vars['ads'],null," "),"temp_vars['ads']");
	    }
	    resOutbrain();
	})
    ]).then(() => {
        temp_vars['liveMatchList'] = cricketData['liveMatchData'];
        if(!solrPageJson || typeof solrPageJson === 'undefined' || solrPageJson === null){
            const error_controller = appRequire('error_controller');
            return error_controller.error(req,res);
        }
        else{
            temp_vars['pageName'] = 'showsCategory';

            if(typeof temp_vars['ctgData'] !== 'undefined'){
                temp_vars['pagination'] =  common.getPagination(temp_vars['ctgData']['solarCount'],pgNo,pgUrl,pgNoPerPage,limit);
            }
            //console.log("pagination",temp_vars['ctgData']);

            /*
            *==================================================================
            * Schema code start
            *=================================================================
            */
            //var schema_type_arr = [];
            /*
            *==================================================================
            * Breadcrumb schema  
            *=================================================================
            */
            var formatSlug = common.capitalizeEWLetter(category_slug.replace(/-/g," "));

            var listitem_2 = constant.SITE_URL+'shows';
            breadcrumbsArr[constant.SITE_URL] = "Latest News";
            breadcrumbsArr[listitem_2] = "Shows"; //Donot delete , this is for reference
            breadcrumbsArr[constant.SITE_URL+'shows/'+category_slug] = formatSlug;

            //temp_vars['breadcrumb'] = common.getSchema(breadcrumbsArr,["breadcrumbs"],0);

            /* Breadcrumb schema end */

            var schema_meta = [];
            
            //console.log("formatSlug",formatSlug);
            schema_meta['metaTitle'] = formatSlug+' by Firstpost - Popular Shows India, Most Watched Programs Online, Watch Episodes and Series Online Videos (HD) Free Popular Shows India - Most Watched Programs Online, Watch Episodes and Series Online Videos (HD) Free by Firstpost';
            schema_meta['metaDesc']  = formatSlug+' by Firstpost popular shows India online videos (HD) free. Get full list of most watched programs, episodes and series online at Firstpost.com. Popular Shows India - Most Watched Programs Online, Watch Episodes and Series Online Videos (HD) Free by Firstpost.';
            schema_meta['contentUrl'] = (pgNo == 1) ? constant['SITE_URL']+'shows/'+category_slug : constant['SITE_URL']+'category/'+category_slug+'/page/'+pgNo;

            schema_meta['schema_type'] = ["organisation","webpage"];

            schema_meta['flag'] = 0;
            temp_vars['schema_meta'] = schema_meta;

            //console.log(schema_meta);

            shareArr['shareTitle'] = schema_meta['metaTitle'];
            if(postPageJson !== undefined && postPageJson['post'] !== undefined && postPageJson['post']['post_url'] !== undefined){
                shareArr['shareUrl'] = postPageJson['post']['post_url'];
            }        
    /*
            *==================================================================
            * Get Seo Data
            *=================================================================
            */
            var next = Number(pgNo)+1;
            var prev = Number(pgNo)-1
            
            seoData['metaTitle'] = formatSlug+' by Firstpost - Popular Shows India, Most Watched Programs Online, Watch Episodes and Series Online Videos (HD) Free Popular Shows India - Most Watched Programs Online, Watch Episodes and Series Online Videos (HD) Free by Firstpost';
            seoData['metaDesc']  = formatSlug+' by Firstpost popular shows India online videos (HD) free. Get full list of most watched programs, episodes and series online at Firstpost.com. Popular Shows India - Most Watched Programs Online, Watch Episodes and Series Online Videos (HD) Free by Firstpost.';
            seoData['pageUrl']   = (pgNo == 1) ? constant['SITE_URL']+'shows/'+category_slug : constant['SITE_URL']+'category/'+category_slug+'/page/'+pgNo;
            seoData['page_name'] = temp_vars['pageName'];
            seoData['page_type'] = temp_vars['pageName'];
            seoData['next'] = constant['SITE_URL']+'shows/'+category_slug+'/page/'+next;
            if(pgNo>1)
            {
                seoData['prev'] = constant['SITE_URL']+'shows/'+category_slug+'/page/'+prev;

            }
            
            //temp_vars['metaData'] = common.getMetaHtml(seoData , postPageJson);
            temp_vars['seoData'] = seoData;

             /*
            *==================================================================
            * Get Level 3 slug
            *=================================================================
            */
            temp_vars['level3_nav_slug'] = "section~entertainment";
            
            /*
            *==================================================================
            * Assign Template Varibles Here
            *=================================================================
            */
            temp_vars['constant'] = constant;
            temp_vars['common'] = common;
            temp_vars['dateFormat'] = dateFormat;
            temp_vars['viewpath'] = constant.viewpath;
            temp_vars['device'] = device;
temp_vars['isMobile'] = isMobile;
            temp_vars['footer'] = constant.footer;
            temp_vars['videoURLArr'] = videoURLArr;
            temp_vars['category_slug'] = category_slug;
            temp_vars['postPageJson'] = postPageJson;
            temp_vars['youtube_js_flag'] = youtube_js_flag;
            temp_vars['pgUrl'] = pgUrl;
            temp_vars['seoData'] = seoData;
            temp_vars['shareArr'] = shareArr;
            temp_vars['breadcrumbsArr'] = breadcrumbsArr;
            temp_vars['mobilePageCss'] = constant.SITE_URL+'static/css/m-shows-lp-fp.css';
            temp_vars['desktopPageCss'] = constant.SITE_URL+'static/css/article-shows-fp.css';
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
            res.render(device + '/firstpost/showsCategory', templateVars); 
            /*==================== End of rendering a view ==============================*/
        }
    })
}