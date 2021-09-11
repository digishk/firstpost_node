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
/*==================== End of All Modules declaration ====================*/

exports.AmpVideo = function(req, res, next) {
    /*
    *==================================================================
    * Declare All the Varibles Here only
    *=================================================================
    */
    var client = req.app.get('client');
    const clientFetch = promisify(client.get).bind(client); // now getAsync is a promisified version of client.get:
    
    let temp_vars = [];
    let postPageJson = [];
    var record = [];
    var redisKeys = [];
    let iframeExist = iframes = track_id = liveblog_url = post_url = postUrl = postSlugId = postPageSlug = content = liveBlog = matchCommentary = iplFlag = videoAdNtAllowedIds = is_this_faq = allQuestionAns = is_this_howto = allTagsOfHowTo = infiniteArticlesListJSON = noCss = iscomment = whatsAppSubTxt_Enable= section = ampWidget = req_url = isUserValid = http_login_val = moreNetworkData = adFlipUpClass  = tagpageId  = catSlugCapi = tags_data = infinite_article_data = isPremium = faq_html = faq_url = fifaPredict = shw = iplFlag = mcdFlag = ctTrophyFlg = headline = filteredContent = ogImg = twitImg = youtube_js_flag = articleBody = is_youtube_video = actor_arr = actorHTMLString = movieActorSchemaString = movie_language = "";
    let infiniteArticlesList = [];
    let currentArticle = [];
    let shareArr = [];
    let adFlipStatus = [];
    let alsoSee = [];
    let videoURLArr = [];
    let schema_meta = [];
    let postContent = '';
    let contentNew = '';
    let finalContent = '';
    let redirect_flag = '';
    
    let catSlug =  req.params['category_slug'];
    let sub_catSlug =  req.params['subcategory_slug'];
    let postSlug =  req.params['article_slug'];
    let postid =  req.params['article_id'];
    let alsoSeePg = 1;
    let seoData = [];
    let breadcrumbsArr = [];
    let adsexcludearr = ['3867719','3938111','3805785','2095981','3225026','3863929','3867719','3863929','3805785','2095981','4279923','3225026','3428522','3805785','2095981','4279923','3867719','4662961','3938111','3421214','3428522','4898911','2386094','3805785','4462829','66390','4873971','4823501','3225026','2343864','4174851','1664381','2240112','4481163','3327156','3024360','528779','4455905','2442214','2443610','3942863','3943683','3906527','4443247','528779','4463699','2877776','4335847','4494527','3863929','3805785','2095981','4279923','3225026','4174851','1664381','1808599','2378692','1175265','2240112','458284','4481163','3327156','2378400','2383180','2442214','2443610','3603559','3617989','3702567','3577999','3678591','4335847','3943683','3241086','4443247','528779','4463699','996091','3867719','996091','4174851','1664381','1175265','2240112','4481163','2383180','3942863','3906527','4443247','528779','4463699','1643567','4174851','5123401','2378200','2376784','2292944','1664381','3270222','2378692','1175265','2240112','4481163','2875320','3327156','4986131','1065821','3906527','4443247','528779','1758627','4463699','765741','4335847','2378400','2367162','2369928','2383180','7101081'];
    let contentFiltered = [];
    
    catSlugCapi = common.capitalizeFLetter(catSlug);
    
    //if(postid == '8105881'){
    serverPrefix = '';
    //}
    
    /*==================== End of Declaration of all variables ====================*/
    
    /*========== if postid not found redirect to 404 page =======================*/
    if(!postid || typeof postid === 'undefined' || postid === null){
        //res.status(404).redirect(constant.SITE_URL+'error-404');
        const error_controller = appRequire('error_controller');
        return error_controller.error(req,res);
    }
  
    /*
    *==================================================================
    * Create Promise here
    *=================================================================
    */
    clientFetch(serverPrefix+"fp_2.0_setPostDetail_"+postid).then((response) => {
        postPageJson = JSON.parse(response);
                
        if(!postPageJson || typeof postPageJson === 'undefined' || postPageJson === null){
            redirect_flag = '404';
            return redirect_flag;
        }
        
        if(postPageJson['meta']['no-amp-page'] == "yes"){
            redirect_flag = '301';
            return redirect_flag;
        }
        
        postPageJson['post']['post_title'] = postPageJson['post']['post_title'].replace(/"/gims , "'");
        postPageJson['post']['post_excerpt'] = postPageJson['post']['post_excerpt'].replace(/"/gims , "'");
        
        post_url = postPageJson['post']['post_name']+"-"+postid;
        postUrl = postPageJson['post']['post_url'];
        postSlugId = postSlug+'-'+postid;
        //postPageSlug = postPageJson['category'][0]['slug'];
        
        if(postPageJson['meta']['not-safe-for-ads'] == 'yes'){
            adsexcludearr.push(postid);
        }
        
        //temp_vars['postPageSlug'] = postPageSlug;
        
        if(post_url != postSlugId){
            redirect_flag = '301';
            return redirect_flag;
        }
        postPageJson['post']['post_image'] = postPageJson['post']['post_image'].replace("http://s2.firstpost.in/" , constant.IMG_URL);
        
        postContent = postPageJson['post']['post_content'];
    }).then((redirect_flag)=>{
        if(typeof redirect_flag !== 'undefined' && redirect_flag !== null){
            if(redirect_flag == '301'){
                return res.redirect(301, postPageJson['post']['post_url'].replace(constant.MAIN_SITE_URL, constant.SITE_URL)+'/amp');    
            }
            if(redirect_flag == '404'){
                const error_controller = appRequire('error_controller');
                return error_controller.error(req,res);
            }
        }else{
            Promise.all([
                clientFetch(serverPrefix + "fp_top_stories_article_data").then((result)=> {
                    temp_vars['mostReadArtcles'] = JSON.parse(result); 
                }),
                new Promise((resolve, reject) => {
                    /* set title in image alt tag */
                    headline = postPageJson['post']['post_title'].replace(/"/gims , '');
                    headline = headline.replace(/'/gims , '');
                    headline = headline.replace(/[^a-zA-Z0-9\s]/gims , '');
                    postContent = postContent.replace(/(<img.*?alt=")(.*?)"/, "$1"+headline+'"');
                    /* set title in image alt tag */
                    
                    postContent = postContent.replace(/(<img.*?)src=\"(.*?)\"(.*?>)/gims, function(match , mat1 , mat2 , mat3){
                        var result = common.firstpost_imageOptimization(mat2);
                        return result = mat1+' src="'+result+'" '+mat3;
                    });
                    
                    /*Remove no follow for internal Links Start*/
                    postContent =  postContent.replace(/<a rel="nofollow" target="_blank" href=\"https:\/\/\www.firstpost.com(.*?")/gims, "<a href=\"https://www.firstpost.com$1");
                    postContent =  postContent.replace(/<a rel="nofollow" (target="_blank" href=\"https:\/\/\www.news18.com.*?")/gims, "<a $1");
                    postContent =  postContent.replace(/<a rel="nofollow" (target="_blank" href=\"https:\/\/\www.moneycontrol.com.*?")/gims, "<a $1");
                    /*Remove no follow for internal Links End*/
                    
                    /***********Sound Cloud Start********************************/
                    var trackid_pattern = /<iframe[^>]+src="([^"]+)"/gims;
                    var trackid_data = trackid_pattern.exec(postContent);
                    
                    if(trackid_data != null){
                        var soundCloud_src = trackid_data[1];
                        if(soundCloud_src.indexOf("api.soundcloud.com/tracks/") !== -1){
                            var soundCloud_spilt = soundCloud_src.split("api.soundcloud.com/tracks/");
                            var soundCloud_spilt_trackId = soundCloud_spilt[1].split("&");
                            track_id = soundCloud_spilt_trackId[0];
                        }
                    }
                    /***********Sound Cloud End********************************/
                    
                    /******* get tags from article ********/
                    if(typeof postPageJson['tag'] !== 'undefined' && postPageJson['tag'] !== null && postPageJson['tag'] != ''){
                        for (var [pk, pval] of Object.entries(postPageJson['tag'])){
                            
                            if(pval['slug'] == 'fifa-world-cup-2018'){
                                fifaPredict = 1; 
                            }
                            if(pval['slug'] == 'birla-mutual-funds'){
                                shw = 1; break;
                            }else if(pval['slug'] == 'world-environment-day-2017'){
                                $shw = 2; break;
                            }
                            tags_data += pval['name'];
                            
                            if(pval['slug'] == 'ipl-2017'){iplFlag = true;}
                            if(pval['slug'] == 'mcd-election-2017'){mcdFlag = true};
                            if(pval['slug'] == 'ct-2017'){ctTrophyFlg = true}; // For Champions Trophy
                            if(pk != (postPageJson['tag'].length - 1)) tags_data += ',';
                        };
                    }
                    /******* get tags from article ********/
                    
                    /******* get video player data ******/
                    if((typeof postPageJson['meta']['Media-URL'] !== 'undefined' && postPageJson['meta']['Media-URL'] != "") || (typeof postPageJson['meta']['Daily-Motion-VideoId'] !== 'undefined' && postPageJson['meta']['Daily-Motion-VideoId'] != "") || (typeof postPageJson['meta']['youtube-video-id'] !== 'undefined' &&  postPageJson['meta']['youtube-video-id'] != "")){
                        
                        isLive = '';
                        viddata_arr = {};
                        viddata_arr['post_date'] = postPageJson['post']['post_modified']; 
                        viddata_arr['post_title'] = postPageJson['post']['post_title']; 
                        viddata_arr['ID'] = postPageJson['post']['ID']; 
                        viddata_arr['Daily-Motion-VideoId'] = postPageJson['meta']['Daily-Motion-VideoId'];
                        viddata_arr['media-url'] = postPageJson['meta']['Media-URL'];
                        viddata_arr['youtube-video-id'] = postPageJson['meta']['youtube-video-id'];
                        
                        custom_params = {};
                        custom_params['autoplay'] = "true";
                        custom_params['mute'] = "true";
                        custom_params['width'] = "100%";
                        custom_params['height'] = "250px";
                        custom_params['style'] = "";
                        custom_params['solarSlug'] = catSlug;
                        
                        //videoURLArr = common.getVideoPlayer(viddata_arr , custom_params);
                        common.getVideoPlayerURL(req,viddata_arr,custom_params,isLive).then((videoArr) => {
                            videoURLArr = videoArr['video_player'];
                        });
                    }
                    /******* get video player data ******/
                    
                    var contentArray  = postContent.split("\r\n");
                    var iframes_data = postContent.match(/<iframe.*?>/gims);
                    
                    if(iframes_data != null){
                        iframes = 1;
                    }
                    if(postPageJson['meta']['youtube-video-id']!=''){
                        iframes = 1;
                    }
                    
                    for (const [cnt_key, cnt_val] of Object.entries(contentArray)){
                        
                        contentNew = cnt_val.replace(/(<[^>]+) style=".*?"/gims, "$1");
                        contentNew = contentNew.replace(/(<[^>]+) height=".*?"/gims, "$1");
                        contentNew = contentNew.replace(/(<[^>]+) width=".*?"/gims, "$1");
                        
                        /***** youtube video code start *****/
                        contentNew = contentNew.replace(/<div\s*class="youTubeVideoPlayer".*?><iframe\s*src="https:\/\/www.youtube.com\/embed\/(.*?)"\s*.*?<\/iframe><\/div>/gims , '<amp-youtube data-videoid="$1" data-param-rel="0" layout="responsive" width="480" height="270"></amp-youtube>');
                        /***** youtube video code end *****/
                       
                        contentNew = contentNew.replace(/<p><iframe\s*src="https:\/\/www.youtube.com\/embed\/(.*?)"\s*.*?<\/iframe><\/p>/gims , '<amp-youtube data-videoid="$1" data-param-rel="0" layout="responsive" width="480" height="270"></amp-youtube>');
                        contentNew = contentNew.replace(/<iframe\s*src="https:\/\/w.soundcloud.com\/.*?\/tracks\/(.*?)&.*?<\/iframe>/gims , '<amp-soundcloud height=300 layout="fixed-height" data-trackid="$1" data-color="ff5500"></amp-soundcloud>');
                        contentNew = contentNew.replace(/<iframe(.*?)src="https:\/\/embeds.audioboom.com\/(.*?)"\s*.*?"\s*.*?<\/iframe>/gims , '<amp-iframe src="https://embeds.audioboom.com/$2" layout="fixed-height" width=auto height=300 sandbox="allow-scripts" ></amp-iframe>');
                        contentNew = contentNew.replace(/<iframe(.*?)src="https:\/\/embeds.audioboom.com\/(.*?)"\s*.*?"\s*.*?<\/iframe>/gims , '<amp-iframe src="https://embeds.audioboom.com/$2" layout="fixed-height" width=auto height=300 sandbox="allow-scripts" ></amp-iframe>');
                        
                        var iframe_pattern = /<iframe(.*?)class="(.*?)dispiframe(.*?)"(.*?)><\/iframe>/gims;
                        while(matches = iframe_pattern.exec(contentNew)){
                            
                            var iframedata2 = matches[0].match(/(.*?)sandbox="(.*?)"(.*?)/gims);
                            
                            if(iframedata2 == null){
                                contentNew = contentNew.replace(/<iframe(.*?)class="(.*?)dispiframe(.*?)"(.*?)><\/iframe>/gims , '<amp-iframe $1 class="$2 dispiframe $3" $4 height="540" sandbox="allow-scripts allow-same-origin" ></amp-iframe>');
                            }else{
                                contentNew = contentNew.replace(/<iframe(.*?)class="(.*?)dispiframe(.*?)"(.*?)><\/iframe>/gims , '<amp-iframe $1 class="$2 dispiframe $3" $4 height="540" ></amp-iframe>');    
                            }
                            //contentNew = contentNew.replace(/<amp-iframe(.*?)height="(.*?)"(.*?)><\/amp-iframe>/gims , '<amp-iframe $1 style="width:100%;height:540px" $3 ></amp-iframe>');
                            //contentNew = contentNew.replace(/<amp-iframe(.*?)width="(.*?)"(.*?)><\/amp-iframe>/gims , '<amp-iframe $1 style="width:100%;height:540px" $3 ></amp-iframe>'); 
                            
                            iframeExist = 1;
                        }
                        contentNew = contentNew.replace(/https:\/\/www.youtube.com\/embed\//gims , '');
                        contentNew = contentNew.replace(/\?rel=0/gim , '');
                        contentNew = contentNew.replace(/data-videoid="(.*?)\?(.*?)"/gims , 'data-videoid="$1"');
                        contentNew = contentNew.replace(/data-videoid="(.*?)\&(.*?)"/gims , 'data-videoid="$1"');
                        contentNew = contentNew.replace(/<img([^>]*)height=["\']([^"\'\/][^"\']*)["\']/gims , '<img $1');
                        contentNew = contentNew.replace(/<img([^>]*)width=["\']([^"\'\/][^"\']*)["\']/gims , '<img $1');
                        
                        contentNew = contentNew.replace(/<audio/gim , '<amp-audio');
                        contentNew = contentNew.replace(/<\/audio>/gims , '</amp-audio>');
                        
                        contentNew = contentNew.replace(/<img/gim , '<amp-img layout="responsive" id="contentimg" width="380" height="285"');
                        contentNew = contentNew.replace(/<amp-img(.*?)\/?>/gims , '<amp-img $1></amp-img>');
                        
                        contentNew = contentNew.replace(/<script(.*?)>(.*?)<\/script>/gims , '');
                        
                        contentNew = contentNew.replace(/(<[^>]+) style=".*?"/gims , "$1");
                        contentNew = contentNew.replace(/<iframe.*?\/iframe>/gims , "");
                        contentNew = contentNew.replace(/<link[^>]+\>/gims , "");
                        contentNew = contentNew.replace(/(<[^>]+) border=".*?"/gims , "$1");
                        contentNew = contentNew.replace(/<param(.*?)\/?>/gims , "");
                        contentNew = contentNew.replace(/<object.*?\/object>/gims , "");
                        contentNew = contentNew.replace(/<embed(.*?)\/?>/gims , "");
                        contentNew = contentNew.replace(/<LCOc1>/gims , "");
                        contentNew = contentNew.replace(/<CLc1>/gims , "");
                        contentNew = contentNew.replace(/<HWT\.UL>/gims , "");
                        contentNew = contentNew.replace(/(<amp-img.*?\s+)align=".*?"(.*?<\/amp-img>)/gims , "$1 $2");
                        
                        /* Old Artilces error */
                        //contentNew = contentNew.replace(/<style.*?\/style>/gims , "");
                        contentNew = contentNew.replace(/<a href="javascript:void(0);" onClick="viewclose()"><amp-img layout="responsive" id="contentimg" width="380" height="285" src="http:\/\/www.firstpost.com\/wp-content\/themes\/firstpost\/images\/close.jpg" alt="Close"><\/amp-img><\/a>/gims , "");
                        contentNew = contentNew.replace(/<a href="javascript:void(0);" onClick="viewclose()"><amp-img layout="responsive" id="contentimg" width="380" height="285" src="https:\/\/www.firstpost.com\/wp-content\/themes\/firstpost\/images\/close.jpg" alt="Close"><\/amp-img><\/a>/gims , "");
                        contentNew = contentNew.replace(/href="javascript:void(0);" onClick="javascript:stepcarousel\.stepBy/gim , "");
                        
                        contentNew = contentNew.replace(/('translide', 1);/gims , "");
                        contentNew = contentNew.replace(/('translide', -1);/gims , "");
                        
                        contentNew = contentNew.replace(/<a href="javascript:void(0);" onClick="viewmore()">view all<\/a>/gims , "");
                        contentNew = contentNew.replace(/<a ><amp-img layout="responsive" id="contentimg" width="380" height="285" src="http:\/\/www.firstpost.com\/wp-content\/themes\/firstpost\/images\/btn_prev.jpg" alt=""><\/amp-img><\/a>/gims , "");
                        contentNew = contentNew.replace(/<a ><amp-img layout="responsive" id="contentimg" width="380" height="285" src="http:\/\/www.firstpost.com\/wp-content\/themes\/firstpost\/images\/btn_next.jpg" alt=""><\/amp-img><\/a>/gims , "");
                        
                        /*Change Instagram Blockquote to iframe*/
                        var insta_pattern = /<blockquote.*?class="instagram-media".*?data-instgrm-permalink=\"https:\/\/www\.instagram\.com\/p\/(.*?)\/\?utm_source.*?\".*?>[\s\S]+?<\/blockquote>/gims;
                        while(insta_matches = insta_pattern.exec(contentNew)){
                            contentNew = contentNew.replace(/<blockquote.*?class="instagram-media".*?data-instgrm-permalink=\"https:\/\/www\.instagram\.com\/p\/(.*?)\/\?utm_source.*?\".*?>[\s\S]+?<\/blockquote>/gims , '<amp-instagram data-shortcode="$1" width="300" height="300" layout="responsive"></amp-instagram>');
                            iframeExist = 1;
                        }
                        
                        if(contentNew != ''){
                            contentFiltered.push(contentNew);
                        }
                    }
                    finalContent = contentFiltered[0];
                    
                    let catSlug_new = 'videos';
                    
                    /**** ads integration start here ****/
                    if(constant.hideJSforEU == 'no' && !adsexcludearr.includes(postid) && typeof finalContent !== 'undefined' && finalContent !== null)
                    {
                        var ads_catSlug = '';
                        
                        ads_catSlug = catSlug_new;
                        
                        const adsArr = [];
                        var keyArr = ['fprosarticle','fparticle'+ads_catSlug];
                        temp_vars['ads'] = common.getAds(keyArr,'amp','ads_arr_amp');
                        
                        if(Object.keys(temp_vars['ads']).length == 0){
                            delete temp_vars['ads'];
                        }
                        
                        if(typeof temp_vars['ads'] !== 'undefined' &&  Object.keys(temp_vars['ads']).length > 0){
                            var inbetween_ads = [];
                            inbetween_ads.push(temp_vars['ads']['ATF_300']);
                            inbetween_ads.push(temp_vars['ads']['BTF_300']);
                            
                            finalContent = common.breakContentAddAds(finalContent , inbetween_ads , "amp");
                        }
                    }
                    /**** ads integration end here ****/
                    
                    /******* get related article data ******/
                    tags_data = tags_data.replace(/"/gims , ""); 
                    tags_data = tags_data.replace(/#/gims , '');
                    common.getRelatedArticle(postid , tags_data , start = 0 , limit = 5 , page = 1).then((data) => {
                        temp_vars['relatedArticle'] = '';
                   
                        if(typeof data !== 'undefined'){
                            temp_vars['relatedArticle'] = data['solarResults'];    
                        }
                    }).then(() => {
                        resolve();
                    });
                    /******* get related article end ******/
                }),
                /*
                *==================================================================
                * Use Below Promise for alsosee data only
                *=================================================================
                */
                new Promise((resolve, reject) => {
                    clientFetch("HP_Node_Widget_LatestVideos").then((response) => {
                        video_article_data = JSON.parse(response);
                        
                        if(video_article_data != null){
                            video_article_data = common.shuffleArr(video_article_data);
                            for (const [video_data_key, video_data_val] of Object.entries(video_article_data)) {
                                let data_arr = [];
                                
                                if(video_data_val['PostID'] != postid){
                                    data_arr['url'] = video_data_val['VidPostURL'];
                                    data_arr['image'] = video_data_val['PostImage'];
                                    data_arr['category'] = "Video";
                                    data_arr['title'] = video_data_val['PostTitle'];
                                    data_arr['ContentType'] = "Video";
                                    if(video_data_key == '0'){
                                        infiniteArticlesList.push(data_arr);
                                    }else{
                                       alsoSee.push(data_arr);
                                        if(alsoSee.length >= 3){
                                            break;
                                        } 
                                    }
                                }
                            }
                        }
                        resolve();
                    })
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
                        outbrainAdsKeyArr['pageUrl'] = postPageJson['post']['post_url'];
                        outbrainAdsKeyArr['adsSlot'] = ['AMP_2'];
                        temp_vars['outbrain_ads'] = common.getOutbrainAds(outbrainAdsKeyArr);
                    }
                    resOutbrain();
                })
            ]).then(()=>{
                temp_vars['pageName'] = 'videoArticle';
                temp_vars['section'] = 'firstpost';
                temp_vars['ampWidget'] = '1';
                
                let catSlug_new = 'Videos';
                
                is_youtube_video = postContent.match(/<div.*?data-youtube=\"true\" data-youtube-id=\"(.*?)\"/gims);
                
                if(is_youtube_video != null || (typeof postPageJson['meta']['youtube-video-id'] !== 'undefined' && postPageJson['meta']['youtube-video-id'] != '')){
                    youtube_js_flag = 1;
                }
                
                /*
                *==================================================================
                * Get Seo Meta
                *=================================================================
                */
                if(typeof postPageJson['meta']['og_image'] !== 'undefined' && postPageJson['meta']['og_image'] != ''){
                    ogImg = postPageJson['meta']['og_image'].replace('http://s2.firstpost.in/' , constant.IMG_URL);
                }else{
                    ogImg = postPageJson['post']['post_image'];
                }
                
                if(typeof postPageJson['meta']['twitter_image'] !== 'undefined' && postPageJson['meta']['twitter_image'] != ''){
                    //twitImg = postPageJson['meta']['twitter_image'].replace("wp-content/uploads","fpimages/300x300/fixed/jpg/scalex16x9").replace('http://s2.firstpost.in/' , constant.IMG_URL);
                    twitImg = postPageJson['meta']['twitter_image'].replace('http://s2.firstpost.in/' , constant.IMG_URL);
                }else{
                    twitImg = postPageJson['post']['post_image']
                }
                
                //.replace(/'/gims , "").replace(/"/gims , '');
                seoData['metaTitle'] = postPageJson['post']['post_title']+' - '+common.capitalizeFLetter(catSlug_new)+ ' News'+' , Firstpost';
                seoData['metaDesc']  = postPageJson['post']['post_excerpt']
                seoData['pageUrl']   = constant.SITE_URL+'videos/'+catSlug+'/'+postSlug+'-'+postid+'.html';
                seoData['page_name'] = temp_vars['pageName'];
                seoData['page_type'] = temp_vars['pageName'];
                seoData['ogImg'] = ogImg;
                seoData['twitImg'] = twitImg;
                if(typeof postPageJson['meta']['Canonical-Url'] !== 'undefined' && postPageJson['meta']['Canonical-Url'] != ''){
                    seoData['canonicalUrl'] = postPageJson['meta']['Canonical-Url'];
                }else{
                    seoData['canonicalUrl'] = seoData['pageUrl']
                }
                seoData['page_language'] = "en";
                seoData['contentType'] = 'video.other';
                seoData['tags'] = tags_data;
                seoData['tags_arr'] = postPageJson['tag'];
                seoData['solarSlug'] = catSlug;
                seoData['ampUrl'] = seoData['pageUrl']+'/amp';
                seoData['page_name'] = temp_vars['pageName'];
                seoData['modified_time'] = dateFormat(postPageJson.post.post_modified , "yyyy-mm-dd'T'HH:MM:ss+05:30");
                seoData['updated_time'] = dateFormat(postPageJson.post.post_modified , "yyyy-mm-dd'T'HH:MM:ss+05:30");
                seoData['published_time'] = dateFormat(postPageJson.post.post_date , "yyyy-mm-dd'T'HH:MM:ss+05:30");
                
                //temp_vars['metaData'] = common.getMetaHtml(seoData , postPageJson);
                temp_vars['seoData'] = seoData;
                
                /*
                *==================================================================
                * Get Schema Meta
                *=================================================================
                */
                var listitem_2 = constant.SITE_URL+'category/'+catSlug_new;
                breadcrumbsArr[constant.SITE_URL] = "Home";
                //breadcrumbsArr[listitem_2] = common.capitalizeFLetter(catSlug); //Donot delete , this is for reference
                //breadcrumbsArr['active'] = common.capitalizeFLetter(catSlug);
                breadcrumbsArr[listitem_2] = common.capitalizeFLetter(catSlug_new)+ ' News';
        
                temp_vars['breadcrumb'] = common.getSchema(breadcrumbsArr,["breadcrumbs"],0);
                temp_vars['organisation'] = common.getSchema('',["organisation"],0);
                temp_vars['website'] = common.getSchema('',["website"],0);
                
                schema_meta['metaTitle'] = postPageJson['post']['post_title'];
                schema_meta['metaDesc']  = postPageJson['post']['post_excerpt'];
                schema_meta['contentUrl'] = seoData['pageUrl']
                schema_meta['metaAuthor'] = postPageJson['post']['post_authorname'];
                schema_meta['metaAuthorSlug'] = postPageJson['post']['post_authorslug'];
                
                schema_meta['post_content'] = postPageJson['post']['post_content'].replace( /(<([^>]+)>)/gims, '');
                //catSlug = 'videos';
                schema_meta['catSlug'] = common.capitalizeEWLetter(catSlug_new);
                
                schema_meta['post_published'] = postPageJson['post']['post_date'].replace(' ' , 'T')+'+05:30';
                
                schema_meta['post_modified'] = postPageJson['post']['post_modified'].replace(' ' , 'T')+'+05:30';
                schema_meta['post_image'] = postPageJson['post']['post_image'];
                schema_meta['tags'] = tags_data;
                
                schema_meta['schema_type'] = ["webpage"];
                
                if(postPageJson['meta']['Media-URL'] != "" || postPageJson['meta']['Daily-Motion-VideoId'] != "" || postPageJson['meta']['youtube-video-id'] != ""){
                    schema_meta['schema_type'].push('VideoObject');
                }
                
                schema_meta['flag'] = 0;
                temp_vars['schema_meta'] = schema_meta;
                
                shareArr['shareTitle'] = postPageJson['post']['post_title'].replace(/'/gims , "").replace(/"/gims , '');
                    shareArr['shareUrl'] = seoData['pageUrl']
                
                /*
                *==================================================================
                * Assign Template Varibles Here
                *=================================================================
                */
                temp_vars['active_level2_nav_slug'] = catSlug;
                temp_vars['level3_nav_slug'] = "section~"+catSlug;    
                temp_vars['active_level3_nav_slug'] = sub_catSlug;
                
                temp_vars['constant'] = constant;
                temp_vars['viewpath'] = constant.viewpath;
                temp_vars['device'] = constant.device;
                temp_vars['footer'] = constant.footer;
                temp_vars['common'] = common;
                temp_vars['postContent'] = finalContent;
                
                temp_vars['postPageJson'] = postPageJson;
                temp_vars['catSlug'] = catSlug;
                temp_vars['postSlug'] = postSlug;
                temp_vars['postUrl'] = postUrl;
                temp_vars['postid'] = postid;
                temp_vars['dateFormat'] = dateFormat;
                temp_vars['shareArr'] = shareArr;
                temp_vars['req'] = req;
                
                temp_vars['infiniteArticlesList'] = infiniteArticlesList;
                temp_vars['alsoSee'] = alsoSee;
                temp_vars['videoURLArr'] = videoURLArr;
                temp_vars['youtube_js_flag'] = youtube_js_flag;
                temp_vars['articleBody'] = articleBody;
                temp_vars['breadcrumbsArr'] = breadcrumbsArr;
                temp_vars['catSlug_new'] = catSlug_new;
                temp_vars['track_id'] = track_id;
                temp_vars['iframeExist'] = iframeExist;
                temp_vars['iframes'] = iframes;
                
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
                let template_name = "ampVideoConsumption";
                res.render('mobile/firstpost/amp/'+template_name, templateVars);
                //res.render(constant.device + '/firstpost/videoConsumption', templateVars); 
                /*==================== End of rendering a view ==============================*/
            });
        }
    });
}
