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
const error_controller = appRequire('error_controller');
/*==================== End of All Modules declaration ====================*/

exports.AmpArticle = function(req, res, next) {
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
    let live_tags_data = iframeExist = iframes = track_id = liveblog_url = post_url = postUrl = postSlugId = postPageSlug = content = liveBlog = matchCommentary = iplFlag = videoAdNtAllowedIds = is_this_faq = allQuestionAns = is_this_howto = allTagsOfHowTo = infiniteArticlesListJSON = noCss = iscomment = whatsAppSubTxt_Enable= section = ampWidget = req_url = isUserValid = http_login_val = moreNetworkData = adFlipUpClass  = tagpageId  = catSlugCapi = tags_data = infinite_article_data = isPremium = faq_html = faq_url = fifaPredict = shw = iplFlag = mcdFlag = ctTrophyFlg = headline = filteredContent = ogImg = twitImg = youtube_js_flag = articleBody = is_youtube_video = actor_arr = actorHTMLString = movieActorSchemaString = movie_language = "";
    let infiniteArticlesList = [];
    let currentArticle = [];
    let shareArr = [];
    let adFlipStatus = [];
    let alsoSee = [];
    let videoURLArr = [];
    let schema_meta = [];
    let postContent = '';
    let finalContent = '';
    let contentNew = '';
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
    
    /*==========Sanofi start=======================*/
    let sanofiIds = ['6636921'];
    //$utm_source_sanofi = ;
    /*==========Sanofi end=======================*/
    
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
        
        /**** liveblog code start here ****/
        content = postContent.replace( /http:\/\/d1lveptg2al0ok.cloudfront.net\/fp\//gims, "http://api.liveblog.in.com/fp/");
        liveblog_url = "";
        filteredContent = postContent;
        filteredContent = postContent.replace('src="https://www.firstpost.com/wp-content', 'src="https://images.firstpost.com/wp-content');
        articleBody = filteredContent;

        var pattern  = /http:\/\/api.liveblog.in.com\/fp\/([^"\/']+)/gims;
        var liveBlogKey = common.getLiveBlogStatus(pattern , content);
        var liveBlogIncludeFlag = false;
        var liveBlogSchemaString = '';
        temp_vars['liveBlog'] = '';
        temp_vars['liveBlogIncludeFlag'] = liveBlogIncludeFlag;
        temp_vars['liveBlogKey'] = liveBlogKey;
        if (liveBlogKey != "" )
        {
            url = 'http://liveblogapi.nw18.com/follow/web/getLiveBlogJson.php?tag='+liveBlogKey+'&p=fp&page=1&time=&d=&count=50&jsonp_callback=callbackjson_normal';
            liveBlogIncludeFlag = true;
            postContent = content.replace(/<iframe(.*?)api.liveblog.in.com(.*?)<\/iframe>/gims, '');

            return new Promise((resolve1, reject1) => {
                common.getRawData(url).then((liveBlogRaw) => {  
                    live_blog_json = ltrim(liveBlogRaw, 'callbackjson_normal(');
                    live_blog_json = rtrim(live_blog_json, ')');
                    liveBlog = JSON.parse(live_blog_json);
                    //console.log(liveBlog.data,'liveBlog');
                    
                    for (var [liveblog_key , liveblog_val] of Object.entries(liveBlog.data)){
                        //liveBlog['data'][liveblog_key]['post']['title_amp']  = striptags(liveblog_val['post']['title']);
                        liveBlog['data'][liveblog_key]['post']['title_amp']  = liveblog_val['post']['title'].replace(/style=".*?"/gims, '');
                        //console.log(liveblog_val['post']['title'] , "hii ");
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
                    
                    live_tags_data = ' live news, live updates, latest updates, latest news, live blog, highlights, live coverage, news online';
                })
                .then(() => {
                    return resolve1();
                }).catch((err) => {
                    if(err) {
                        return error_controller.error(req,res);
                    }
                });
            });
        }
    }).then((redirect_flag) =>{
        if(typeof redirect_flag !== 'undefined' && redirect_flag !== null){
            if(redirect_flag == '301'){
                //return res.redirect(301, postPageJson['post']['post_url'].replace(constant.MAIN_SITE_URL, constant.SITE_URL)+'/amp');   
                if(postPageJson['meta']['no-amp-page'] == "yes"){
                    return res.redirect(301, postPageJson['post']['post_url'].replace(constant.MAIN_SITE_URL, constant.SITE_URL));
                }else{
                    return res.redirect(301, postPageJson['post']['post_url'].replace(constant.MAIN_SITE_URL, constant.SITE_URL)+'/amp');
                } 
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
                    /* Search keywords covid-19 and coronavirus Start */


                           
                   // }(?<![\w\d])COVID-19(?![\w\d])
                    //console.log("====CovidData======"+CovidData);
                /* Search keywords covid-19 and coronavirus End */


                    //postContent = postContent.replace(/(<img.*?)src=\"(.*?)\"(.*?>)/, common.inbetween_article_image_replace);
                    postContent = postContent.replace(/(<img.*?)src=\"(.*?)\"(.*?>)/gims, function(match , mat1 , mat2 , mat3){
                        var result = common.firstpost_imageOptimization(mat2);
                        return result = mat1+' src="'+result+'" '+mat3;
                    });
                    
                    /*Remove no follow for internal Links Start*/
                    postContent =  postContent.replace(/<a rel="nofollow" target="_blank" href=\"https:\/\/\www.firstpost.com(.*?")/gims, "<a href=\"https://www.firstpost.com$1");
                    postContent =  postContent.replace(/<a rel="nofollow" (target="_blank" href=\"https:\/\/\www.news18.com.*?")/gims, "<a $1");
                    postContent =  postContent.replace(/<a rel="nofollow" (target="_blank" href=\"https:\/\/\www.moneycontrol.com.*?")/gims, "<a $1");
                    //postContent =  postContent.replace(/<a rel="nofollow" target="_blank" href="(.*?)"/gims, "<a href=$1");
                    /*Remove no follow for internal Links End*/
                    
                    /*postContent = postContent.replace(/<blockquote>/gims,'<div class="whatsapp-desc">');
                    postContent = postContent.replace(/<\/blockquote>/gims,'<\/div>');*/
                    
                    //------get article faq flag --------------//
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
                        try{
                            allTagsOfHowTo = common.getSchemaContentFromPageContent(faq_html , faq_url , 'howto');    
                        }
                        catch(err) {
                            res.redirect('/category/'+catSlug);
                        }    
                    }
                    
                    if(is_this_howto == 'yes' || is_this_faq == 'yes'){
                        postContent = postContent.replace(/\[q\]/gims,'<p><b>');
                        postContent = postContent.replace(/\[\/q\]/gims,'</b></p>');
                        postContent = postContent.replace(/\[ans\]/gims,'<p>');
                        postContent = postContent.replace(/\[\/ans\]/gims,'</p>');
                        postContent = postContent.replace(/\[hq\]/gims,'<p><b>');
                        postContent = postContent.replace(/\[\/hq\]/gims,'</b></p>');
                        postContent = postContent.replace(/\[hans\]/gims,'<p>');
                        postContent = postContent.replace(/\[\/hans\]/gims,'</p>');
                        postContent = postContent.replace(/\[hstep\]/gims,'<p>');
                        postContent = postContent.replace(/\[\/hstep\]/gims,'</p>');
                    }
                    
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
                            //console.log(postPageJson['meta'] , "videoURLArr");
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
                       
                        contentNew = contentNew.replace(/<iframe\s*src="https:\/\/www.youtube.com\/embed\/(.*?)"\s*.*?<\/iframe>/gims , '<amp-youtube data-videoid="$1" data-param-rel="0" layout="responsive" width="480" height="270"></amp-youtube>');
                        contentNew = contentNew.replace(/<iframe\s*src="https:\/\/w.soundcloud.com\/.*?\/tracks\/(.*?)&.*?<\/iframe>/gims , '<amp-soundcloud height=300 layout="fixed-height" data-trackid="$1" data-color="ff5500"></amp-soundcloud>');
                        contentNew = contentNew.replace(/<iframe(.*?)src="https:\/\/embeds.audioboom.com\/(.*?)"\s*.*?"\s*.*?<\/iframe>/gims , '<amp-iframe src="https://embeds.audioboom.com/$2" layout="fixed-height" width=auto height=300 sandbox="allow-scripts" ></amp-iframe>');
                        contentNew = contentNew.replace(/<iframe(.*?)src="https:\/\/embeds.audioboom.com\/(.*?)"\s*.*?"\s*.*?<\/iframe>/gims , '<amp-iframe src="https://embeds.audioboom.com/$2" layout="fixed-height" width=auto height=300 sandbox="allow-scripts" ></amp-iframe>');
                        iframeExist = 1;
                        
                        var iframe_pattern = /<iframe(.*?)class="(.*?)dispiframe(.*?)"(.*?)><\/iframe>/gims;
                        while(matches = iframe_pattern.exec(contentNew)){
                            
                            var iframedata2 = matches[0].match(/(.*?)sandbox="(.*?)"(.*?)/gims);
                            
                            if(iframedata2 == null){
                                contentNew = contentNew.replace(/<iframe(.*?)class="(.*?)dispiframe(.*?)"(.*?)><\/iframe>/gims , '<amp-iframe $1 class="$2 dispiframe $3" $4 height="615" sandbox="allow-scripts allow-same-origin" ></amp-iframe>');
                            }else{
                                contentNew = contentNew.replace(/<iframe(.*?)class="(.*?)dispiframe(.*?)"(.*?)><\/iframe>/gims , '<amp-iframe $1 class="$2 dispiframe $3" $4 height="615" ></amp-iframe>');    
                            }
                            //contentNew = contentNew.replace(/<amp-iframe(.*?)height="(.*?)"(.*?)><\/amp-iframe>/gims , '<amp-iframe $1 style="width:100%;height:540px" $3 ></amp-iframe>');
                            //contentNew = contentNew.replace(/<amp-iframe(.*?)width="(.*?)"(.*?)><\/amp-iframe>/gims , '<amp-iframe $1 style="width:100%;height:540px" $3 ></amp-iframe>'); 
                            
                            iframeExist = 1;
                        }
                        contentNew = contentNew.replace(/https:\/\/www.youtube.com\/embed\//gims , '');
                        contentNew = contentNew.replace(/\?rel=0/gims , '');
                        contentNew = contentNew.replace(/data-videoid="(.*?)\?(.*?)"/gims , 'data-videoid="$1"');
                        contentNew = contentNew.replace(/data-videoid="(.*?)\&(.*?)"/gims , 'data-videoid="$1"');
                        contentNew = contentNew.replace(/<img([^>]*)height=["\']([^"\'\/][^"\']*)["\']/gims , '<img $1');
                        contentNew = contentNew.replace(/<img([^>]*)width=["\']([^"\'\/][^"\']*)["\']/gims , '<img $1');
                        
                        contentNew = contentNew.replace(/<audio/gims , '<amp-audio');
                        contentNew = contentNew.replace(/<\/audio>/gims , '</amp-audio>');
                        
                        contentNew = contentNew.replace(/<img/gims , '<amp-img layout="responsive" id="contentimg" width="380" height="285"');
                        contentNew = contentNew.replace(/<amp-img(.*?)\/?>/gims , '<amp-img $1></amp-img>');
                        
                        contentNew = contentNew.replace(/<script(.*?)>(.*?)<\/script>/gims , '');
                        contentNew = contentNew.replace(/\[imgcenter\]/gims , '');
                        contentNew = contentNew.replace(/\[\/imgcenter\]/gims , '');
                        contentNew = contentNew.replace(/\[rq\]/gims , '');
                        contentNew = contentNew.replace(/\[\/rq\]/gims , '');
                        contentNew = contentNew.replace(/\[lq\]/gims , '');
                        contentNew = contentNew.replace(/\[\/lq\]/gims , '');
                        
                        contentNew = contentNew.replace(/(<[^>]+) style=".*?"/gims , "$1");
                        contentNew = contentNew.replace(/<style>.*?<\/style>/gims , " ");
                        contentNew = contentNew.replace(/<table .*?>/gims , "<table>");
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
                        contentNew = contentNew.replace(/<a(.*)href="javascript:void\(0\);"(.*)onClick="viewclose\(\)"><amp-img(.*)layout="responsive"(.*)id="contentimg"(.*)width="380"(.*)height="285"(.*)src="\/\/www.firstpost.com\/wp-content\/themes\/firstpost\/images\/close.jpg"(.*)alt="Close"><\/amp-img><\/a>/gims , "");
                        contentNew = contentNew.replace(/<a href="javascript:void(0);" onClick="viewclose()"><amp-img layout="responsive" id="contentimg" width="380" height="285" src="http:\/\/www.firstpost.com\/wp-content\/themes\/firstpost\/images\/close.jpg" alt="Close"><\/amp-img><\/a>/gims , "");
                        contentNew = contentNew.replace(/<a href="javascript:void(0);" onClick="viewclose()"><amp-img layout="responsive" id="contentimg" width="380" height="285" src="https:\/\/www.firstpost.com\/wp-content\/themes\/firstpost\/images\/close.jpg" alt="Close"><\/amp-img><\/a>/gims , "");
                        contentNew = contentNew.replace(/href="javascript:void\(0\);" onClick="javascript:stepcarousel\.stepBy/gims , "");
                        contentNew = contentNew.replace(/onClick="window.open(.*)"/gims , "");
                        
                        contentNew = contentNew.replace(/\('translide', 1\);"/gims , "");
                        contentNew = contentNew.replace(/\('translide', -1\);"/gims , "");
                        
                        contentNew = contentNew.replace(/<a href="javascript:void\(0\);" onClick="viewmore\(\)">view all<\/a>/gims , "");
                        contentNew = contentNew.replace(/<a ><amp-img layout="responsive" id="contentimg" width="380" height="285" src="http:\/\/www.firstpost.com\/wp-content\/themes\/firstpost\/images\/btn_prev.jpg" alt=""><\/amp-img><\/a>/gims , "");
                        contentNew = contentNew.replace(/<a ><amp-img layout="responsive" id="contentimg" width="380" height="285" src="http:\/\/www.firstpost.com\/wp-content\/themes\/firstpost\/images\/btn_next.jpg" alt=""><\/amp-img><\/a>/gims , "");
                        
                        /*Change Instagram Blockquote to iframe*/
                        var insta_patterns = [
                            /<blockquote.*?class="instagram-media".*?data-instgrm-permalink=\"https:\/\/www\.instagram\.com\/tv\/(.*?)\/\?utm_source.*?\".*?>[\s\S]+?<\/blockquote>/gim,
                            /<blockquote.*?class="instagram-media".*?data-instgrm-permalink=\"https:\/\/www\.instagram\.com\/tv\/(.*?)\/\.*?\".*?>[\s\S]+?<\/blockquote>/gim,
                            /<blockquote.*?class="instagram-media".*?data-instgrm-permalink=\"https:\/\/www\.instagram\.com\/p\/(.*?)\/\?utm_source.*?\".*?>[\s\S]+?<\/blockquote>/gim,
                            /<blockquote.*?class="instagram-media".*?data-instgrm-permalink=\"https:\/\/www\.instagram\.com\/p\/(.*?)\/\.*?\".*?>[\s\S]+?<\/blockquote>/gim
                        ]

                        insta_patterns.map(pattern =>{
                            while(insta_matches = pattern.exec(contentNew)){
                                contentNew = contentNew.replace(pattern,'<amp-instagram data-shortcode="$1" width="300" height="300" layout="responsive"></amp-instagram>');
                                iframeExist = 1;
                            }
                        });
                        
                        if(contentNew != ''){
                            contentFiltered.push(contentNew);
                        }
                    }
                    finalContent = contentFiltered[0];
                    
                    /******* get ads data start ******/
                    if(constant.hideJSforEU == 'no' && !adsexcludearr.includes(postid) && typeof finalContent !== 'undefined' && finalContent !== null)
                    {
                        
                        var ads_catSlug = '';
                        if(temp_vars['liveBlogIncludeFlag'] == true){
                            ads_catSlug = 'liveblog';
                        }else if(postPageJson['meta']['Movie-Name'] != '' && postPageJson['meta']['Movie-Rating'] > 0){
                            ads_catSlug = 'movie-reviews';
                        }else{
                           ads_catSlug = catSlug;
                        }
                        const adsArr = [];
                        var keyArr = ['fprosarticle','fparticle'+ads_catSlug];
                        temp_vars['ads'] = common.getAds(keyArr,'amp','ads_arr_amp');
                        
                        if(Object.keys(temp_vars['ads']).length == 0){
                            delete temp_vars['ads'];
                        }
                        
                        if(typeof temp_vars['ads'] !== 'undefined' &&  Object.keys(temp_vars['ads']).length > 0){
                            var inbetween_ads = [];
                            
                            if(temp_vars['liveBlogIncludeFlag'] == true){
                                inbetween_ads.push(temp_vars['ads']['FLY_300']);
                                inbetween_ads.push(temp_vars['ads']['BTF_300']);
                            }else if(ads_catSlug == 'long-reads'){
                                inbetween_ads.push(temp_vars['ads']['ATF_300']);
                                inbetween_ads.push(temp_vars['ads']['BTF_300']);
                            }else{
                                inbetween_ads.push(temp_vars['ads']['ATF_300']);
                                inbetween_ads.push(temp_vars['ads']['FLY_300']);
                                inbetween_ads.push(temp_vars['ads']['BTF_300']);
                            }
                            
                            finalContent = common.breakContentAddAds(finalContent , inbetween_ads , "amp" , ads_catSlug);
                        }
                    }
                    /******* get ads data end ******/
                    
                    /******* get related article data ******/
                    tags_data += live_tags_data;
                    
                    tags_data = tags_data.replace(/"/gims , "");
                    tags_data = tags_data.replace(/#/gims , '');
                    
                    common.getRelatedArticle(postid , tags_data , start = 0 , limit = 8 , page = 1).then((data) => {
                        if(typeof data !== 'undefined'){
                            for (const [rel_key, rel_data] of Object.entries(data['solarResults'])) {
                                alsoSee[rel_key] = data['solarResults'].pop();
                                if(alsoSee.length >= 3){
                                    break;
                                }
                            }
                            
                            temp_vars['relatedArticle'] = data['solarResults'];
                        }
                    }).then(() => {
                        resolve();
                    });
                    /******* get related article end ******/
                }),
                /*
                *==================================================================
                * Use Below Promise for getting Infinite article ids only
                *=================================================================
                */
                new Promise((resolve, reject) => {
                    let catSlug_new = '';
                    if(catSlug == 'entertainment'){
                        catSlug_new = 'bollywood';
                    }else{
                        catSlug_new = catSlug
                    }
                    if(catSlug != 'long-reads'){
                        clientFetch("infinite_"+catSlug_new).then((response) => {
                            infinite_article_data = JSON.parse(response);
                            if(infinite_article_data != null){
                                infinite_article_data = common.shuffleArr(infinite_article_data);
                            
                                //let cnt = 0;
                                let i_cnt = 0;
                                for (const [infineArticle_key, infineArticle] of Object.entries(infinite_article_data)) {
                                    infineArticle['url'] = infineArticle['url'].replace('http://www.firstpost.com/',constant['SITE_URL']);
                                    if(infineArticle['articleId'] != postid && (infineArticle['category'] != "sports-news" && infineArticle['category'] != "firstcricket")){        
                                        if(infiniteArticlesList.length < 1){
                                            infiniteArticlesList[i_cnt] = infineArticle; // making new array without current postID
                                            i_cnt++;
                                        }  
                                    }
                                    if(infiniteArticlesList.length >= 1){
                                        break;
                                    }
                                }
                            }
                            resolve();
                        })
                    }else{
                        resolve();
                    }    
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
                        outbrainAdsKeyArr['adsSlot'] = ['AMP_2', 'AMP_1'];
                        temp_vars['outbrain_ads'] = common.getOutbrainAds(outbrainAdsKeyArr);
                    }
                    resOutbrain();
                })
            ]).then(() => {
                temp_vars['liveMatchList'] = cricketData['liveMatchData'];
                temp_vars['pageName'] = 'article';
                temp_vars['section'] = 'firstpost';
                temp_vars['ampWidget'] = '1';
                
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
                if(typeof postPageJson['meta']['meta_title'] !== 'undefined' && postPageJson['meta']['meta_title'] != ''){
                    postPageJson['meta']['meta_title'] = postPageJson['meta']['meta_title'].replace(/"/gims , "'");
                }
                if(typeof postPageJson['meta']['meta_description'] !== 'undefined' && postPageJson['meta']['meta_description'] != ''){
                    postPageJson['meta']['meta_description'] = postPageJson['meta']['meta_description'].replace(/"/gims , "'");
                }
                if(typeof postPageJson['meta']['meta_keywords'] !== 'undefined' && postPageJson['meta']['meta_keywords'] != ''){
                    postPageJson['meta']['meta_keywords'] = postPageJson['meta']['meta_keywords'].replace(/"/gims , "'");
                }
                //.replace(/'/gims , "").replace(/"/gims , '');
                seoData['metaTitle'] = postPageJson['post']['post_title']+' - '+common.capitalizeFLetter(catSlug)+ ' News'+' , Firstpost';
                seoData['metaDesc']  = postPageJson['post']['post_excerpt'];
                seoData['newMetaTitle'] = postPageJson['meta']['meta_title'];
                seoData['newMetaDescription'] = postPageJson['meta']['meta_description'];
                seoData['newMetaKeywords'] = postPageJson['meta']['meta_keywords'];
                if(temp_vars['liveBlogIncludeFlag'] == true){
                    seoData['metaDesc'] += ' Watch LIVE News, Latest Updates, Live blog, Highlights and Live coverage online at firstpost.com.'
                }
                seoData['pageUrl']   = postPageJson['post']['post_url']+'/amp';
                seoData['page_name'] = temp_vars['pageName'];
                seoData['page_type'] = temp_vars['pageName'];
                seoData['ogImg'] = ogImg;
                seoData['twitImg'] = twitImg;
                if(typeof postPageJson['meta']['Canonical-Url'] !== 'undefined' && postPageJson['meta']['Canonical-Url'] != ''){
                    seoData['canonicalUrl'] = postPageJson['meta']['Canonical-Url'];
                }else{
                    seoData['canonicalUrl'] = postPageJson['post']['post_url'];
                }
                seoData['page_language'] = "en";
                seoData['contentType'] = temp_vars['pageName'];
                seoData['tags'] = tags_data;
                seoData['tags_arr'] = postPageJson['tag'];
                seoData['solarSlug'] = catSlug;
                seoData['ampUrl'] = postPageJson['post']['post_url'].replace('https://www.firstpost.com/' , constant.SITE_URL)+'/amp';
                seoData['page_name'] = temp_vars['pageName'];
                seoData['modified_time'] = dateFormat(postPageJson.post.post_modified , "yyyy-mm-dd'T'HH:MM:ss+05:30");
                seoData['updated_time'] = dateFormat(postPageJson.post.post_modified , "yyyy-mm-dd'T'HH:MM:ss+05:30");
                seoData['published_time'] = dateFormat(postPageJson.post.post_date , "yyyy-mm-dd'T'HH:MM:ss+05:30");
                    
                //temp_vars['metaData'] = common.getMetaHtml(seoData , postPageJson);
                temp_vars['seoData'] = seoData;
                
                /*========== movie review schema ===========*/
                if(postPageJson['meta']['Movie-Name']!='' && postPageJson['meta']['Movie-Rating']>0){
                    
                    actor_arr = postPageJson['meta']['Movie-Cast'].split(',');
                                
                    actor_arr.forEach(function(item){
                        actorHTMLString += '<a href="'+constant.SITE_URL+'search/'+item+'" >'+common.capitalizeEWLetter(item)+'</a>,';
                        movieActorSchemaString += `{ 
                            "@type": "Person",
                            "name": "${item}",
                            "sameAs":""
                        },`;
                    });
                    
                    if(actorHTMLString != ""){
                        actorHTMLString = actorHTMLString.slice(0 , -1);
                    }
                    if(movieActorSchemaString != ""){
                        movieActorSchemaString = movieActorSchemaString.slice(0 , -1);
                    }
                    temp_vars['actorHTMLString'] = actorHTMLString;
                    temp_vars['movieActorSchemaString'] = movieActorSchemaString;
                    
                    let language_patern = /^<p><strong>Language\s*:\s*(.*?)\s*<\/strong><\/p>/gims;
                    movie_language = language_patern.exec(postContent);
                    
                    if(movie_language != null){
                        movie_language = movie_language[1]
                    }else{
                        movie_language = '';
                    }
                    temp_vars['movie_language'] = movie_language;
                    
                    postContent = postContent.replace(language_patern ,'');
                }
                
                /*
                *==================================================================
                * Get Schema Meta
                *=================================================================
                */
                var listitem_2 = constant.SITE_URL+'category/'+catSlug;
                breadcrumbsArr[constant.SITE_URL] = "Home";
                //breadcrumbsArr[listitem_2] = common.capitalizeFLetter(catSlug); //Donot delete , this is for reference
                breadcrumbsArr[listitem_2] = common.capitalizeFLetter(catSlug)+ ' News';
                
        
                /*temp_vars['breadcrumb'] = common.getSchema(breadcrumbsArr,["breadcrumbs"],0);
                temp_vars['organisation'] = common.getSchema('',["organisation"],0);
                temp_vars['website'] = common.getSchema('',["website"],0);*/
                
                schema_meta['metaTitle'] = postPageJson['post']['post_title'];
                schema_meta['metaDesc']  = postPageJson['post']['post_excerpt'];
                schema_meta['contentUrl'] = postPageJson['post']['post_url'];
                schema_meta['metaAuthor'] = postPageJson['post']['post_authorname'];
                schema_meta['metaAuthorSlug'] = postPageJson['post']['post_authorslug'];
                
                schema_meta['post_content'] = postPageJson['post']['post_content'].replace( /(<([^>]+)>)/gims, '');
                schema_meta['catSlug'] = common.capitalizeEWLetter(catSlug);
                
                schema_meta['post_published'] = postPageJson['post']['post_date'].replace(' ' , 'T')+'+05:30';
                
                schema_meta['post_modified'] = postPageJson['post']['post_modified'].replace(' ' , 'T')+'+05:30';
                schema_meta['post_image'] = postPageJson['post']['post_image'];
                schema_meta['tags'] = tags_data;
                schema_meta['postPageJson'] = postPageJson;
                schema_meta['isAmp'] = 1;
                
                schema_meta['schema_type'] = ["newsarticle","photos","webpage"];
                
                if(temp_vars['liveBlogIncludeFlag'] == true){
                    schema_meta['schema_type'].push('LiveBlogPosting');
                    schema_meta['liveBlog'] = temp_vars['liveBlog'];
                }
                
                if(typeof postPageJson['meta']['First-Tag'] !== 'undefined' && postPageJson['meta']['First-Tag'] != '' && postPageJson['meta']['Movie-Rating'] != ''){
                    let firstTag = postPageJson['meta']['First-Tag'].toLowerCase().replace(' ' , '');
                    
                    let movieDesc = (postPageJson['meta']['Movie-Desc'].length > 200) ? postPageJson['meta']['Movie-Desc'].substr(0,197)+"..." : postPageJson['meta']['Movie-Desc'];
                    if(firstTag == "moviereview"){
                        schema_meta['schema_type'].push('Review');
                    }
                    
                    if(typeof postPageJson['meta']['Movie-Short-Review'] !== 'undefined' && postPageJson['meta']['Movie-Short-Review'] != ''){
                        schema_meta['metaMovieReview']  = postPageJson['meta']['Movie-Short-Review'];
                    }else if(typeof postPageJson['meta']['Movie-Desc'] !== 'undefined' && postPageJson['meta']['Movie-Desc'] != ''){
                        schema_meta['metaMovieReview']  = postPageJson['meta']['Movie-Desc'];
                    }else{
                        schema_meta['metaMovieReview']  = schema_meta['metaDesc'];
                    }
                    schema_meta['movieActorSchemaString']  = movieActorSchemaString;
                    schema_meta['movieName']  = postPageJson['meta']['Movie-Name'];
                    schema_meta['movieDirector']  = postPageJson['meta']['Movie-Director'];
                    schema_meta['movieRating']  = postPageJson['meta']['Movie-Rating'];
                }
                
                if(is_this_howto == 'yes'){
                    schema_meta['schema_type'].push('HowTo');
                    schema_meta['allTagsOfHowTo'] = allTagsOfHowTo;
                }
                
                if(is_this_faq == 'yes'){
                    schema_meta['schema_type'].push('FAQPage');
                    schema_meta['allQuestionAns'] = allQuestionAns;
                }
                
                schema_meta['flag'] = 0;
                temp_vars['schema_meta'] = schema_meta;
                
                shareArr['shareTitle'] = postPageJson['post']['post_title'].replace(/'/gims , "").replace(/"/gims , '');
                shareArr['shareUrl'] = postPageJson['post']['post_url'];
            
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
                
                //temp_vars['liveBlog'] = liveBlog;
                temp_vars['postContent'] = finalContent;
                temp_vars['postPageJson'] = postPageJson;
                temp_vars['catSlug'] = catSlug;
                temp_vars['postSlug'] = postSlug;
                temp_vars['postUrl'] = postUrl;
                temp_vars['postid'] = postid;
                temp_vars['dateFormat'] = dateFormat;
                temp_vars['shareArr'] = shareArr;
                temp_vars['req'] = req;
                temp_vars['sanofiIds'] = sanofiIds;
                temp_vars['infiniteArticlesList'] = infiniteArticlesList;
                temp_vars['alsoSee'] = alsoSee;
                temp_vars['videoURLArr'] = videoURLArr;
                temp_vars['youtube_js_flag'] = youtube_js_flag;
                temp_vars['articleBody'] = articleBody;
                temp_vars['breadcrumbsArr'] = breadcrumbsArr;
                temp_vars['striptags'] = striptags;
                temp_vars['track_id'] = track_id;
                temp_vars['iframeExist'] = iframeExist;
                temp_vars['iframes'] = iframes;
                
                
                
                /*temp_vars['adFlipStatus'] = adFlipStatus;
                temp_vars['adFlipData'] = adFlipData;
                temp_vars['adFlipUpClass'] = adFlipUpClass;
                temp_vars['adFlipDown'] = adFlipDown;
                temp_vars['adFlipDownClass'] = adFlipDownClass;
                temp_vars['adFlipUp'] = adFlipUp;*/
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
                let template_name = "ampArticleConsumption";
                res.render('mobile/firstpost/amp/'+template_name, templateVars);
                /*==================== End of rendering a view ==============================*/
            });
        }
    });
}