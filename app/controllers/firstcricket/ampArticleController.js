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
var moment = require('moment');
/*==================== End of All Modules declaration ====================*/

exports.article = function(req, res, next) {
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
    let postPageJson = [];
    let infiniteArticlesList = [];
    let currentArticle = [];
    let shareArr = [];
    let adFlipStatus = [];
    let alsoSee = [];
    let videoURLArr = [];
    let schema_meta = [];
    let finalContent = iframeExist = contentNew = iframes = track_id = liveblog_url = post_url = postUrl = postSlugId = postPageSlug = liveBlog = matchCommentary = iplFlag = videoAdNtAllowedIds = is_this_faq = allQuestionAns = is_this_howto = allTagsOfHowTo = infiniteArticlesListJSON = noCss = iscomment = whatsAppSubTxt_Enable= section = ampWidget = req_url = isUserValid = http_login_val = moreNetworkData = adFlipUpClass  = tagpageId  = catSlugCapi = infinite_article_data = isPremium = faq_html = faq_url = fifaPredict = shw = iplFlag = mcdFlag = ctTrophyFlg = headline = filteredContent = ogImg = twitImg = youtube_js_flag = articleBody = is_youtube_video = actor_arr = actorHTMLString = movieActorSchemaString = movie_language = "";
    let postSlug =  req.params['postSlug'];
    let postid =  req.params['postid'];
    let postContent = '';
    let alsoSeePg = 1;
    let seoData = [];
    let breadcrumbsArr = [];
    let adsexcludearr = [];
    let tags_data = liveBlog = "";
    let catSlug =  "sports";
    let seriesId = "";
    let matchId = "";
    temp_vars['pseudo_value'] = "";
    temp_vars['coverageEndTime'] = "";
    temp_vars['liveMatchList'] = cricketData['liveMatchData'];
    temp_vars['resultMatchList'] = cricketData['resultMatchData'];
    temp_vars['upcomingMatchList'] = cricketData['upcomingMatchData'];
    /*==================== End of Declaration of all variables ====================*/
    
    
    /*========== if postid not found redirect to 404 page =======================*/
    if(postid == '' || postid == undefined){
        //res.status(404).render('404', {title: "Sorry, page not found", session: req.sessionbo});
        const error_controller = appRequire('error_controller');
        return error_controller.error(req,res);
    }
  
    /*
    *==================================================================
    * Create Promise here
    *=================================================================
    */
    temp_vars['quickUrl'] = "";
    temp_vars['fullUrl'] = "";
    temp_vars['commUrl'] = "";

    Promise.all([
        
        clientFetch(serverPrefix + "fp_top_stories_article_data").then((result)=> {
            temp_vars['mostReadArtcles'] = JSON.parse(result); 
        }),
        new Promise((resolve, reject) => {
            clientFetch(serverPrefix + "fp_2.0_setPostDetail_" + postid).then((response)=> {  
                if(!response) {
                    throw new Error('Response is null')
                }
                postPageJson = JSON.parse(response);
                temp_vars['contentType'] = postPageJson['meta']['Content Type'];

                if(postPageJson == '' || postPageJson == undefined){
                    //res.status(404).render('404', {title: "Sorry, page not found", session: req.sessionbo});
                    const error_controller = appRequire('error_controller');
                    return error_controller.error(req,res);
                }
                if(postPageJson['meta']['no-amp-page'] == "yes"){
                    res.redirect(301,postPageJson['post']['post_url']);
                }
                post_url = postPageJson['post']['post_name']+"-"+postid;
                temp_vars['blogUrl'] = postUrl = postPageJson['post']['post_url'];
                postSlugId = postSlug+'-'+postid;
                postPageSlug = postPageJson['category'][0]['slug'];

                if(postPageJson['meta']['not-safe-for-ads'] == 'yes'){
                    adsexcludearr.push(postid);
                }

                postContent = postPageJson['post']['post_content'];
                if(post_url != postSlugId){
                    res.redirect(301, postPageJson['post']['post_url']);
                }
                var contentArray  = postContent.split("\r\n");
                let contentFiltered = [];
                var iframes_data = postContent.match(/<iframe.*?>/g);
                if(iframes_data != null){
                iframes = 1;
                }
                if(postPageJson['meta']['youtube-video-id']!=''){
                iframes = 1;
                }


            for (const [cnt_key, cnt_val] of Object.entries(contentArray)){
                    
                    contentNew = cnt_val.replace(/(<[^>]+) style=".*?"/gim, "$1");
                    contentNew = contentNew.replace(/(<[^>]+) height=".*?"/gim, "$1");
                    contentNew = contentNew.replace(/(<[^>]+) width=".*?"/gim, "$1");
                    
                    /***** youtube video code start *****/
                    contentNew = contentNew.replace(/<div\s*class="youTubeVideoPlayer".*?><iframe\s*src="https:\/\/www.youtube.com\/embed\/(.*?)"\s*.*?<\/iframe><\/div>/gim , '<amp-youtube data-videoid="$1" data-param-rel="0" layout="responsive" width="480" height="270"></amp-youtube>');
                    /***** youtube video code end *****/
                   
                    contentNew = contentNew.replace(/<p><iframe\s*src="https:\/\/www.youtube.com\/embed\/(.*?)"\s*.*?<\/iframe><\/p>/gim , '<amp-youtube data-videoid="$1" data-param-rel="0" layout="responsive" width="480" height="270"></amp-youtube>');
                    contentNew = contentNew.replace(/<iframe\s*src="https:\/\/w.soundcloud.com\/.*?\/tracks\/(.*?)&.*?<\/iframe>/gim , '<amp-soundcloud height=300 layout="fixed-height" data-trackid="$1" data-color="ff5500"></amp-soundcloud>');
                    contentNew = contentNew.replace(/<iframe(.*?)src="https:\/\/embeds.audioboom.com\/(.*?)"\s*.*?"\s*.*?<\/iframe>/gim , '<amp-iframe src="https://embeds.audioboom.com/$2" layout="fixed-height" width=auto height=300 sandbox="allow-scripts" ></amp-iframe>');
                    contentNew = contentNew.replace(/<iframe(.*?)src="https:\/\/embeds.audioboom.com\/(.*?)"\s*.*?"\s*.*?<\/iframe>/gim , '<amp-iframe src="https://embeds.audioboom.com/$2" layout="fixed-height" width=auto height=300 sandbox="allow-scripts" ></amp-iframe>');
                    
                    var iframe_pattern = /<iframe(.*?)class="(.*?)dispiframe(.*?)"(.*?)><\/iframe>/gim;
                    while(matches = iframe_pattern.exec(contentNew)){
                        
                        var iframedata2 = matches[0].match(/(.*?)sandbox="(.*?)"(.*?)/gim);
                        
                        if(iframedata2 == null){
                            contentNew = contentNew.replace(/<iframe(.*?)class="(.*?)dispiframe(.*?)"(.*?)><\/iframe>/gim , '<amp-iframe $1 class="$2 dispiframe $3" $4 height="540" sandbox="allow-scripts allow-same-origin" ></amp-iframe>');
                        }else{
                            contentNew = contentNew.replace(/<iframe(.*?)class="(.*?)dispiframe(.*?)"(.*?)><\/iframe>/gim , '<amp-iframe $1 class="$2 dispiframe $3" $4 height="540" ></amp-iframe>');    
                        }
                        //contentNew = contentNew.replace(/<amp-iframe(.*?)height="(.*?)"(.*?)><\/amp-iframe>/gim , '<amp-iframe $1 style="width:100%;height:540px" $3 ></amp-iframe>');
                        //contentNew = contentNew.replace(/<amp-iframe(.*?)width="(.*?)"(.*?)><\/amp-iframe>/gim , '<amp-iframe $1 style="width:100%;height:540px" $3 ></amp-iframe>'); 
                        
                        iframeExist = 1;
                    }
                    contentNew = contentNew.replace(/https:\/\/www.youtube.com\/embed\//gim , '');
                    contentNew = contentNew.replace(/\?rel=0/gim , '');
                    contentNew = contentNew.replace(/data-videoid="(.*?)\?(.*?)"/gim , 'data-videoid="$1"');
                    contentNew = contentNew.replace(/data-videoid="(.*?)\&(.*?)"/gim , 'data-videoid="$1"');
                    contentNew = contentNew.replace(/<img([^>]*)height=["\']([^"\'\/][^"\']*)["\']/gim , '<img $1');
                    contentNew = contentNew.replace(/<img([^>]*)width=["\']([^"\'\/][^"\']*)["\']/gim , '<img $1');
                    
                    contentNew = contentNew.replace(/<audio/gim , '<amp-audio');
                    contentNew = contentNew.replace(/<\/audio>/gim , '</amp-audio>');
                    
                    contentNew = contentNew.replace(/<img/gim , '<amp-img layout="responsive" id="contentimg" width="380" height="285"');
                    contentNew = contentNew.replace(/<amp-img(.*?)\/?>/gim , '<amp-img $1></amp-img>');
                    
                    contentNew = contentNew.replace(/<script(.*?)>(.*?)<\/script>/gim , '');
                    
                    contentNew = contentNew.replace(/(<[^>]+) style=".*?"/gim , "$1");
                    contentNew = contentNew.replace(/<iframe.*?\/iframe>/gim , "");
                    contentNew = contentNew.replace(/<link[^>]+\>/gim , "");
                    contentNew = contentNew.replace(/(<[^>]+) border=".*?"/gim , "$1");
                    contentNew = contentNew.replace(/<param(.*?)\/?>/gim , "");
                    contentNew = contentNew.replace(/<object.*?\/object>/gim , "");
                    contentNew = contentNew.replace(/<embed(.*?)\/?>/gim , "");
                    contentNew = contentNew.replace(/<LCOc1>/gim , "");
                    contentNew = contentNew.replace(/<CLc1>/gim , "");
                    contentNew = contentNew.replace(/<HWT\.UL>/gim , "");
                    contentNew = contentNew.replace(/(<amp-img.*?\s+)align=".*?"(.*?<\/amp-img>)/gim , "$1 $2");
                    
                    /* Old Artilces error */
                    //contentNew = contentNew.replace(/<style.*?\/style>/gim , "");
                    contentNew = contentNew.replace(/<a href="javascript:void(0);" onClick="viewclose()"><amp-img layout="responsive" id="contentimg" width="380" height="285" src="http:\/\/www.firstpost.com\/wp-content\/themes\/firstpost\/images\/close.jpg" alt="Close"><\/amp-img><\/a>/gim , "");
                    contentNew = contentNew.replace(/<a href="javascript:void(0);" onClick="viewclose()"><amp-img layout="responsive" id="contentimg" width="380" height="285" src="https:\/\/www.firstpost.com\/wp-content\/themes\/firstpost\/images\/close.jpg" alt="Close"><\/amp-img><\/a>/gim , "");
                    contentNew = contentNew.replace(/href="javascript:void(0);" onClick="javascript:stepcarousel\.stepBy/gim , "");
                    
                    contentNew = contentNew.replace(/('translide', 1);/gim , "");
                    contentNew = contentNew.replace(/('translide', -1);/gim , "");
                    
                    contentNew = contentNew.replace(/<a href="javascript:void(0);" onClick="viewmore()">view all<\/a>/gim , "");
                    contentNew = contentNew.replace(/<a ><amp-img layout="responsive" id="contentimg" width="380" height="285" src="http:\/\/www.firstpost.com\/wp-content\/themes\/firstpost\/images\/btn_prev.jpg" alt=""><\/amp-img><\/a>/gim , "");
                    contentNew = contentNew.replace(/<a ><amp-img layout="responsive" id="contentimg" width="380" height="285" src="http:\/\/www.firstpost.com\/wp-content\/themes\/firstpost\/images\/btn_next.jpg" alt=""><\/amp-img><\/a>/gim , "");
                    
                    /*Change Instagram Blockquote to iframe*/
                    var insta_pattern = /<blockquote.*?class="instagram-media".*?data-instgrm-permalink=\"https:\/\/www\.instagram\.com\/p\/(.*?)\/\?utm_source.*?\".*?>[\s\S]+?<\/blockquote>/gim;
                    while(insta_matches = insta_pattern.exec(contentNew)){
                        contentNew = contentNew.replace(/<blockquote.*?class="instagram-media".*?data-instgrm-permalink=\"https:\/\/www\.instagram\.com\/p\/(.*?)\/\?utm_source.*?\".*?>[\s\S]+?<\/blockquote>/gim , '<amp-instagram data-shortcode="$1" width="300" height="300" layout="responsive"></amp-instagram>');
                        iframeExist = 1;
                    }
                    
                    if(contentNew != ''){
                        contentFiltered.push(contentNew);
                    }
                }
                finalContent = contentFiltered[0];                
                                
                /*Remove no follow for internal Links Start*/
                postContent =  postContent.replace(/<a rel="nofollow" target="_blank" href=\"https:\/\/\www.firstpost.com(.*?")/gim, "<a href=\"https://www.firstpost.com$1");
                postContent =  postContent.replace(/<a rel="nofollow" (target="_blank" href=\"https:\/\/\www.news18.com.*?")/gim, "<a $1");
                postContent =  postContent.replace(/<a rel="nofollow" (target="_blank" href=\"https:\/\/\www.moneycontrol.com.*?")/gim, "<a $1");                
                /*Remove no follow for internal Links End*/

                is_this_faq = 'no';
                    if(postPageJson['meta']['is-this-faq'] != ""){
                        is_this_faq = postPageJson['meta']['is-this-faq'];    
                    }
                    
                    if(is_this_faq == 'yes'){
                        faq_html = postPageJson['post']['post_content'];
                        faq_url = postPageJson['post']['post_url'];
                        allQuestionAns = common.getSchemaContentFromPageContent(faq_html , faq_url , 'faq');
                    }
                    
                    is_this_howto = 'no';
                    if(postPageJson['meta']['is-this-howto'] != ""){
                        is_this_howto = postPageJson['meta']['is-this-howto'];    
                    }
                    
                    if(is_this_howto == 'yes'){
                        faq_html = postPageJson['post']['post_content'];
                        faq_url = postPageJson['post']['post_url'];
                        allTagsOfHowTo = common.getSchemaContentFromPageContent(faq_html , faq_url , 'howto');
                    }
                    
                    if(is_this_howto == 'yes' || is_this_faq == 'yes'){
                        postContent = postContent.replace(/\[q\]/g,'<p><b>');
                        postContent = postContent.replace(/\[\/q\]/g,'</b></p>');
                        postContent = postContent.replace(/\[ans\]/g,'<p>');
                        postContent = postContent.replace(/\[\/ans\]/g,'</p>');
                        postContent = postContent.replace(/\[hq\]/g,'<p><b>');
                        postContent = postContent.replace(/\[\/hq\]/g,'</b></p>');
                        postContent = postContent.replace(/\[hans\]/g,'<p>');
                        postContent = postContent.replace(/\[\/hans\]/g,'</p>');
                        postContent = postContent.replace(/\[hstep\]/g,'<p>');
                        postContent = postContent.replace(/\[\/hstep\]/g,'</p>');
                    }
                    
                    /******* get tags from article ********/
                    if(postPageJson['tag'] != undefined && postPageJson['tag'] != ''){
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
                if(postPageJson['meta']['Media-URL'] != "" || postPageJson['meta']['Daily-Motion-VideoId'] != "" || postPageJson['meta']['youtube-video-id'] != ""){
                    
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
                    
                    /**** liveblog code start here ****/
                    content = postContent.replace( /http:\/\/d1lveptg2al0ok.cloudfront.net\/fp\//gim, "http://api.liveblog.in.com/fp/");
                    liveblog_url = "";
                    filteredContent = postContent;
                    filteredContent = postContent.replace('src="https://www.firstpost.com/wp-content', 'src="https://images.firstpost.com/wp-content');
                    articleBody = filteredContent;
                    
                    var pattern  = /http:\/\/api.liveblog.in.com\/fp\/([^"\/']+)/gim;
                    var liveBlogKey = common.getLiveBlogStatus(pattern , content);
                    var liveBlogIncludeFlag = false;
                    temp_vars['liveBlog'] = '';
                    temp_vars['liveBlogIncludeFlag'] = liveBlogIncludeFlag;
                    temp_vars['liveBlogKey'] = liveBlogKey;
                    if (liveBlogKey != "" )
                    {
                        url = 'http://liveblogapi.nw18.com/follow/web/getLiveBlogJson.php?tag='+liveBlogKey+'&p=fp&page=1&time=&d=&count=70&jsonp_callback=callbackjson_normal';
                        liveBlogIncludeFlag = true;
                        postContent = content.replace(/<iframe(.*?)api.liveblog.in.com(.*?)<\/iframe>/gim, '', content);

                        return new Promise((resolve1, reject1) => {
                        common.getRawData(url).then((liveBlogRaw) => {  
                            live_blog_json = ltrim(liveBlogRaw, 'callbackjson_normal(');
                            live_blog_json = rtrim(live_blog_json, ')');
                            liveBlog = JSON.parse(live_blog_json);                            
                             //console.log(liveBlog.data,'liveBlog');
                            for (var [liveblog_key , liveblog_val] of Object.entries(liveBlog.data)){
                                //liveBlog['data'][liveblog_key]['post']['title_amp']  = striptags(liveblog_val['post']['title']);
                                liveBlog['data'][liveblog_key]['post']['title_amp']  = liveblog_val['post']['title'].replace(/style=".*?"/gims, '');
                        if(liveblog_val['post']['source'] != '' && liveblog_val['post']['source'] != null ){
                            
                            liveBlog['data'][liveblog_key]['post']['source_amp']  = liveblog_val['post']['source'].replace(/<script(.*?)>(.*?)<\/script>/gims, '');
                            
                            liveBlog['data'][liveblog_key]['post']['source_amp']  = liveBlog['data'][liveblog_key]['post']['source_amp'].replace(/<iframe(.*?)class="nw18boardresultiframe(.*?)dispiframe(.*?)".*?(src=\".*?\")\s*.*?\s*.*?\s*(sandbox=\".*?\").*?><\/iframe>/gims, '<amp-iframe $1 class="nw18boardresultiframe $2 dispiframe" $4 style="width:100%;height:615px" height="615" $5 ></amp-iframe>');
                            
                            liveBlog['data'][liveblog_key]['post']['source_amp']  = liveBlog['data'][liveblog_key]['post']['source_amp'].replace(/<iframe.*?\/iframe>/gims, '');
                            
                            /* TO get Twitter ID from Blockqote of twiitter */
                            var twit_pattern = /<a.*?href=\".*?\".*?>/gims;
                            var twit_url_pattern = /<a.*?href=\"(.*?)\".*?>/gims;
                            if(liveblog_val['post']['source_amp'] != ''){
                                var match_data = liveBlog['data'][liveblog_key]['post']['source_amp'].match(twit_pattern);
                            }
                             
                            if(match_data != null){
                                var twit_url_data = match_data.pop();
                                var twit_url_match_data = twit_url_pattern.exec(twit_url_data);
                                if(twit_url_match_data != null){
                                    var twit_url = twit_url_match_data[1];
                                    var twt_arr = twit_url.split("/");
                                    liveBlog['data'][liveblog_key]['post']['tweet_id'] = twt_arr.pop();
                                }
                            }
                            /* TO get Twitter ID from Blockqote of twiitter */
                            /* For Instagram */
                            var insta_mtch = 'class="instagram-media"';
                            if (liveblog_val['post']['source'].indexOf(insta_mtch) !== -1) {
                                var insta_feed_patern = /<blockquote.*?class="instagram-media".*?data-instgrm-permalink=\"https:\/\/www\.instagram\.com\/p\/(.*?)\/\?utm_source.*?\".*?>[\s\S]+?<\/blockquote>/gims;
                                var insta_match_data = insta_feed_patern.exec(liveblog_val['post']['source']);
                                
                                if(insta_match_data != null){
                                    liveBlog['data'][liveblog_key]['post']['insta_postid'] = insta_match_data[1];
                                }
                            }
                        }
                        /* For Instagram */
                        var authorname = '';
                        if(liveblog_val['author_name'] != ''){
                            authorname = liveblog_val['author_name'];
                        } else {
                            authorname = postPageJson['post']['post_authorname'];
                        }
                    }
                            temp_vars['liveBlog'] = liveBlog;
                            temp_vars['liveBlogIncludeFlag'] = liveBlogIncludeFlag;
                            temp_vars['liveBlogKey'] = liveBlogKey;
                            tags_data =  tags_data+' live news, live updates, latest updates, latest news, live blog, highlights, live coverage, news online';
                            return common.getRelatedArticle(postid , tags_data , start = 0 , limit = 5 , page = 1);
                        })
                        .then((data) => {
                            return resolve1(data);
                            
                            });
                        });
                        // $liveBlogKey =  getLiveBlogStatus( $pattern , $content );
                    }
                
                /****** get related article data *******/
                return common.getRelatedArticle(postid , tags_data , start = 0 , limit = 8 , page = 1);
            
            })
            .then((data) => {
                
                    temp_vars['relatedArticle'] = '';
                    if(typeof data !== 'undefined'){
                        
                        for (const [rel_key, rel_data] of Object.entries(data['solarResults'])) {
                            alsoSee[rel_key] = data['solarResults'].pop();
                            if(alsoSee.length >= 3){
                                break;
                            }
                        }                        
                        temp_vars['relatedArticle'] = data['solarResults'];
                    }

                    /**** ads integration start here ****/
                    new Promise((resolveads, rej) => {
                        if(constant.hideJSforEU == 'no' && !adsexcludearr.includes(postid))
                        {
                            var ads_catSlug = '';
                            if(temp_vars['liveBlogIncludeFlag'] == true){
                                ads_catSlug = 'liveblog';                                
                            }else if(temp_vars['contentType'] == 'Video'){
                                ads_catSlug = 'videos';
                            }
                            const adsArr = [];
                            var keyArr = ['fcarticle'+ads_catSlug];
                            temp_vars['ads'] = common.getAds(keyArr,'amp','ads_arr_cricket');

                            if(constant.isMobile == '1' && typeof temp_vars['ads'] !== 'undefined'){
                                var inbetween_ads = [];
                                inbetween_ads.push(temp_vars['ads']['ATF_300']);
                                inbetween_ads.push(temp_vars['ads']['FLY_300']);
                                inbetween_ads.push(temp_vars['ads']['BTF_300']);
                                
                                finalContent = common.breakContentAddAds(finalContent , inbetween_ads , "amp");
                            }
                            
                            if(typeof temp_vars['ads'] === 'undefined'){
                                delete temp_vars['ads'];
                            }
                        }
                        resolveads();
                    });
                    /**** ads integration end here ****/
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
                    });
                    /*=========== get infiniteArticle & alsoSee data ==========*/
                    temp_vars['catSlug'] = catSlug;    
                    let catSlug_new = 'sports-news';

                    return new Promise((res, rej) => {
                        clientFetch("infinite_"+catSlug_new).then((response) => {
                            infinite_article_data = JSON.parse(response);
                            
                            if(infinite_article_data != null){
                                infinite_article_data = common.shuffleArr(infinite_article_data);
                                let cnt = 0;
                                for (const [infineArticle_key, infineArticle] of Object.entries(infinite_article_data)) {
                                    infineArticle['url'] = infineArticle['url'].replace('http://www.firstpost.com/',constant['SITE_URL']);
                                    if(infineArticle['articleId'] != postid && (infineArticle['category'] == "sports-news" || infineArticle['category'] == "firstcricket")){        
                                        if(infiniteArticlesList.length < 1){
                                            infiniteArticlesList[cnt] = infineArticle; // making new array without current postID
                                            cnt++;
                                        }  
                                    }
                                    if(infiniteArticlesList.length >= 1){
                                        break;
                                    }
                                }
                                currentArticle['id'] = 4;
                                currentArticle['title'] = postPageJson['post']['post_title'];
                                currentArticle['url'] = postPageJson['post']['post_url'].replace('http://www.firstpost.com/',constant['SITE_URL']);
                                currentArticle['articleId'] = postid;
                                
                                infiniteArticlesList.unshift(currentArticle); // push current post to first in infinite strip.
                            }
                            return res();
                        })
                    })
            })
            .then(() => resolve()).catch(e => reject())
        }),        

            clientFetch(serverPrefix + "FP_cricket_post_"+postid).then((postCricketData)=> {
            temp_vars['postCricketData'] = ""; 
            
            if(typeof postCricketData !== 'undefined' && postCricketData != null && postCricketData != "")
            {
                postCricketData = JSON.parse(postCricketData); 
                temp_vars['postCricketData'] = postCricketData; 
                
                 return new Promise((resolve1, reject1) => {
                    clientFetch(serverPrefix + "FP_cricket_widget_matchid_"+postCricketData['series_id']+"_"+postCricketData['match_id']).then((matchFileInfo)=> {
                        var matchtime_ist = "";
                        temp_vars['seriesID'] = seriesId = postCricketData['series_id'];
                        temp_vars['matchID'] = matchId = postCricketData['match_id'];
                        matchFileInfo = JSON.parse(matchFileInfo); 
                        matchFile = matchFileInfo['match_filename'];
                        temp_vars['pseudo_value'] = matchFileInfo['pseudo_value'];                        
                        matchKey = matchId+'_'+seriesId;                        
                        let otherMatchData = "";
                        if(temp_vars['upcomingMatchList'][matchKey] != undefined){
                            matchFile = cricketData['upcomingMatchData'][matchKey]['matchfile'];
                            matchtime_ist = cricketData['upcomingMatchData'][matchKey]['matchtime_ist'];
                            otherMatchData = cricketData['upcomingMatchData'][matchKey];
                        }
                         if(temp_vars['resultMatchList'][matchKey] != undefined){
                            matchFile = cricketData['resultMatchData'][matchKey]['matchfile'];
                            matchtime_ist = cricketData['resultMatchData'][matchKey]['matchtime_ist'];
                            otherMatchData = cricketData['resultMatchData'][matchKey];                            
                        }                    
                         if(temp_vars['liveMatchList'][matchKey] != undefined){                        
                            matchFile = cricketData['liveMatchData'][matchKey]['matchfile'];          
                            matchtime_ist = cricketData['liveMatchData'][matchKey]['matchtime_ist'];
                            otherMatchData = cricketData['liveMatchData'][matchKey];
                        }
                        return common.getScorecard(req,matchFile,matchKey,seriesId,matchId,'quick',otherMatchData).then((commentary) => { 
                            try {
                                    commentary = JSON.parse(commentary);
                                } catch(e) {
                                    commentary = "no data";                                     
                                }  
                            try {
                                    var commentaryData = JSON.parse(commentary['data']);
                                } catch(e) {
                                    commentaryData = "no_data";                                     
                                } 
                        if(commentaryData != "no_data"){                       
                        temp_vars['blogUrl'] = postPageJson['post']['post_url'];
                        temp_vars['scoreData'] = commentaryData;
                        temp_vars['scoreData']['matchtime_ist'] = matchtime_ist;                        
                        let currInning = '';                        
                        temp_vars['innCount'] = 1;     
                        if(commentaryData['fourthInnings']['status'] == '1'){
                            currInning = "fourthInnings";                            
                            temp_vars['innCount'] = 4;
                        }
                        else if(commentaryData['thirdInnings']['status'] == '1'){
                            currInning = "thirdInnings";                            
                            temp_vars['innCount'] = 3;
                        }
                        else if(commentaryData['secondInnings']['status'] == '1'){
                            currInning = "secondInnings";                            
                            temp_vars['innCount'] = 2;
                        }
                        else{
                            currInning = "firstInnings";                             
                        } 
                        temp_vars['currInning'] = currInning;
                        temp_vars['deFUrl'] = "https://www.firstpost.com/firstcricket/player-profile/";
                        
                            teama = commentaryData['teama'];
                            teamb = commentaryData['teamb'];
                            matchType = commentaryData['matchtype'];
                            var postSlug = teama.toLowerCase() + '-vs-' + teamb.toLowerCase() + '-' + matchType.toLowerCase()+'-live-cricket-score';
                            
                            temp_vars['quickUrl'] = constant.SITE_URL+'firstcricket/cricket-live-score/'+postSlug+'-quick/'+seriesId+'/'+matchId+'.html';
                            temp_vars['fullUrl'] = constant.SITE_URL+'firstcricket/cricket-live-score/'+postSlug+'-full/'+seriesId+'/'+matchId+'.html';
                            temp_vars['commUrl'] = constant.SITE_URL+'firstcricket/cricket-live-score/'+postSlug+'-commentary/'+seriesId+'/'+matchId+'.html';
                            temp_vars['postId'] = postid;

                            
                            if(typeof matchFileInfo['match_otherData'] !== 'undefined' && matchFileInfo['match_otherData'] !== null && matchFileInfo['match_otherData'] != ''){
                                
                                var datechange = matchFileInfo['match_otherData']['end_matchdate_ist'].split('/');
                                var changedDate = datechange[1]+'-'+datechange[0]+'-'+datechange[2],   
                                timeParts = matchFileInfo['match_otherData']['end_matchtime_ist'].split(':'),
                                date = new Date(datechange[2], parseInt(datechange[0], 10) - 1, datechange[1], timeParts[0], timeParts[1]);
                            
                                var changeTime = date.getTime()+2700000;
                                var date_ob = new Date(changeTime);

                                var coverageEndTime = date_ob.getFullYear() + "-" + ("0" + (date_ob.getMonth() + 1)).slice(-2) + "-" + ("0" + date_ob.getDate()).slice(-2) + " " + ("0" + date_ob.getHours()).slice(-2) + ":" + ("0" + date_ob.getMinutes()).slice(-2);

                                temp_vars['coverageEndTime'] = coverageEndTime;
                            }
                            }

                            resolve1();
                        })
                    }) /*FP_cricket_widget_matchid_*/
                }) /*promise_resolve1*/
            }
                
        }),
        
    ]).then(() => {        
        
        temp_vars['pageName'] = 'firstcricket-article';
        temp_vars['section'] = 'firstcricket';
        temp_vars['ampWidget'] = '1';
        temp_vars['seoData'] = seoData;        
        temp_vars['device'] = device;
        temp_vars['isMobile'] = isMobile;
        /*
        *==================================================================
        * Get Seo Meta
        *=================================================================
        */
        var schema_meta = [];

        if(postPageJson['meta']['og_image'] != undefined && postPageJson['meta']['og_image'] != ''){
            ogImg = postPageJson['meta']['og_image'].replace('http://s2.firstpost.in/' , constant.SITE_URL);
        }else{
            ogImg = postPageJson['post']['post_image'];
        }
        
        if(postPageJson['meta']['twitter_image'] != undefined && postPageJson['meta']['twitter_image'] != ''){
            twitImg = postPageJson['meta']['twitter_image'].replace("wp-content/uploads","fpimages/300x300/fixed/jpg/scalex16x9").replace('http://s2.firstpost.in/' , constant.SITE_URL);
        }else{
            twitImg = postPageJson['post']['post_image'].replace("wp-content/uploads","fpimages/300x300/fixed/jpg/scalex16x9");
        }
        if(typeof postPageJson['meta']['meta_title'] !== 'undefined' && postPageJson['meta']['meta_title'] != ''){
            postPageJson['meta']['meta_title'] = postPageJson['meta']['meta_title'].replace(/"/gims , "'");
        }
        if(typeof postPageJson['meta']['meta_description'] !== 'undefined' && postPageJson['meta']['meta_description'] != ''){
            postPageJson['meta']['meta_description'] = postPageJson['meta']['meta_description'].replace(/"/gims , "'");
        }
        if(typeof postPageJson['meta']['meta_keywords'] !== 'undefined' && postPageJson['meta']['meta_keywords'] != ''){
            postPageJson['meta']['meta_keywords'] = postPageJson['meta']['meta_keywords'].replace(/"/gims , "'");
        }
        
        seoData['metaTitle'] = postPageJson['post']['post_title'].replace(/"/g , "'")+' - Firstpost';        
        seoData['metaDesc']  = postPageJson['post']['post_excerpt'].replace(/"/g , "'");
        seoData['newMetaTitle'] = postPageJson['meta']['meta_title'];
        seoData['newMetaDescription'] = postPageJson['meta']['meta_description'];
        seoData['newMetaKeywords'] = postPageJson['meta']['meta_keywords'];
        
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
        seoData['tags'] = tags_data.replace(/"/g , "'");
        seoData['tags_arr'] = postPageJson['tag'];
        seoData['solarSlug'] = catSlug;
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
        * Get Schema Meta
        *=================================================================
        */
        var listitem_2 = constant.SITE_URL+'firstcricket/';
        breadcrumbsArr[constant.SITE_URL] = "Home";
        breadcrumbsArr[listitem_2] = "Cricket";        
        breadcrumbsArr['active'] = "News";

        temp_vars['breadcrumbsArr'] = breadcrumbsArr;    
        schema_meta['isAmp'] = 1;
        schema_meta['metaTitle'] = postPageJson['post']['post_title'];
        schema_meta['metaDesc']  = postPageJson['post']['post_excerpt'].replace(/"/g , "'");
        schema_meta['contentUrl'] = postPageJson['post']['post_url'];
        schema_meta['metaAuthor'] = postPageJson['post']['post_authorname'];
        schema_meta['metaAuthorSlug'] = postPageJson['post']['post_authorslug'];
        
        schema_meta['post_content'] = postPageJson['post']['post_content'].replace( /(<([^>]+)>)/ig, '');
        schema_meta['catSlug'] = 'FirstCricket';
        if(liveBlog.data != '' && typeof liveBlog.data != 'undefined'){
            schema_meta['post_published'] = postPageJson['post']['post_modified'].replace(' ' , 'T')+'+05:30';    
        }else{
            schema_meta['post_published'] = postPageJson['post']['post_date'].replace(' ' , 'T')+'+05:30';
        }
        schema_meta['post_modified'] = postPageJson['post']['post_modified'].replace(' ' , 'T')+'+05:30';
        schema_meta['post_image'] = postPageJson['post']['post_image'];
        schema_meta['tags'] = tags_data.replace(/"/g , "'");
        
        schema_meta['schema_type'] = ["newsarticle","webpage"];        
        
        schema_meta['flag'] = 0;
        temp_vars['schema_meta'] = schema_meta;
        
        shareArr['shareTitle'] = postPageJson['post']['post_title'].replace(/'/g , "").replace(/"/g , '');
        shareArr['shareUrl'] = postPageJson['post']['post_url'];
    
        /*
        *==================================================================
        * Get Firstpost Menus
        *=================================================================
        */        
        /*
        *==================================================================
        * Assign Template Varibles Here
        *=================================================================
        */
        temp_vars['postContent'] = finalContent;
        temp_vars['constant'] = constant;
        temp_vars['viewpath'] = constant.viewpath;
        temp_vars['device'] = constant.device;
        temp_vars['footer'] = constant.footer;
        temp_vars['common'] = common;
        temp_vars['pageType'] = "article";        
        temp_vars['postSlug'] = postSlug;
        temp_vars['postid'] = postid;
        temp_vars['dateFormat'] = dateFormat;
        temp_vars['req'] = req;
        temp_vars['infiniteArticlesList'] = infiniteArticlesList;
        temp_vars['active_level2_nav_slug'] = "sports";
        temp_vars['level3_nav_slug'] = "section~sports";        
        temp_vars['active_level3_nav_slug'] = "cricket";
        temp_vars['level4_nav_slug'] = "section~sports~cricket";
        temp_vars['active_level4_nav_slug'] = "news";
        temp_vars['template'] = "ampArticleConsumption";
        temp_vars['articleBody'] = articleBody;
        temp_vars['postPageJson'] = postPageJson;
        temp_vars['videoURLArr'] = videoURLArr;
        temp_vars['shareArr'] = shareArr;
        temp_vars['alsoSee'] = alsoSee;
        temp_vars['showRhsScore'] = 'yes';
        temp_vars['showRhsResults'] = 'yes';
        temp_vars['striptags'] = striptags;
        
        temp_vars['mobilePageCss'] = constant.SITE_URL+'static/css/m-article-fc.css';
        temp_vars['desktopPageCss'] = constant.SITE_URL+'static/css/article-fc.css';
        if(temp_vars['liveBlogIncludeFlag'] == true){
            schema_meta['schema_type'].push('LiveBlogPosting');
            schema_meta['liveBlog'] = temp_vars['liveBlog'];
        }
        if(temp_vars['liveBlogIncludeFlag'] == true || temp_vars['pseudo_value'] == "1")
        {
            temp_vars['mobilePageCss'] = constant.SITE_URL+'static/css/m-scorecard-fc.css';
            temp_vars['desktopPageCss'] = constant.SITE_URL+'static/css/scorecard-fc.css';
        }
        temp_vars['otherFirstPaintCss'] = 'firstpaint-fc';
        temp_vars['desktopCricJs'] = constant.SITE_URL+'static/js/main-fc.js';
        temp_vars['mobileCricJs'] = constant.SITE_URL+'static/js/main-fc.js';
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
        res.render('mobile/firstcricket/ampArticleConsumption', templateVars); 
        /*==================== End of rendering a view ==============================*/
    }).catch(e => {
        res.set('location', '/firstcricket')
        res.status(301).send();
    })
}
