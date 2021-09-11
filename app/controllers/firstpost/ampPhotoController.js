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

exports.AmpPhoto = function(req, res, next) {
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
    let catSlug_new = liveblog_url = post_url = postUrl = postSlugId = postPageSlug = content = liveBlog = matchCommentary = iplFlag = videoAdNtAllowedIds = is_this_faq = allQuestionAns = is_this_howto = allTagsOfHowTo = infiniteArticlesListJSON = noCss = iscomment = whatsAppSubTxt_Enable= section = ampWidget = req_url = isUserValid = http_login_val = moreNetworkData = adFlipUpClass  = tagpageId  = catSlugCapi = tags_data = infinite_article_data = isPremium = faq_html = faq_url = fifaPredict = shw = iplFlag = mcdFlag = ctTrophyFlg = headline = filteredContent = ogImg = twitImg = youtube_js_flag = articleBody = is_youtube_video = actor_arr = actorHTMLString = movieActorSchemaString = movie_language = photoArr = photoCat = catSlug = "";
    let infiniteArticlesList = [];
    let currentArticle = [];
    let shareArr = [];
    let adFlipStatus = [];
    let alsoSee = [];
    let videoURLArr = [];
    let schema_meta = [];
    let postContent = '';
    let redirect_flag = '';
    
    if(typeof req.params['category_slug'] !== undefined){
        catSlug =  req.params['category_slug'];
    }else{
        catSlug =  'photos';
    }
    
    let sub_catSlug =  req.params['subcategory_slug'];
    let postSlug =  req.params['article_slug'];
    let postid =  req.params['article_id'];
    let alsoSeePg = 1;
    let seoData = [];
    let breadcrumbsArr = [];
    let adsexcludearr = [];
        
    catSlugCapi = common.capitalizeFLetter(catSlug);
    catSlug_new = 'photos';
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
                /*
                *==================================================================
                * Use Below Promise for getting most read article only
                *=================================================================
                */
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
                    
                    /*Remove no follow for internal Links Start*/
                    postContent =  postContent.replace(/<a rel="nofollow" target="_blank" href=\"https:\/\/\www.firstpost.com(.*?")/gims, "<a href=\"https://www.firstpost.com$1");
                    postContent =  postContent.replace(/<a rel="nofollow" (target="_blank" href=\"https:\/\/\www.news18.com.*?")/gims, "<a $1");
                    postContent =  postContent.replace(/<a rel="nofollow" (target="_blank" href=\"https:\/\/\www.moneycontrol.com.*?")/gims, "<a $1");
                    /*Remove no follow for internal Links End*/
                    
                    for (const [cat_key, cat_val] of Object.entries(postPageJson['category'])){
                        if(cat_val['slug'] != 'photos'){
                            photoCat = cat_val['slug'];
                        }
                    }
                    
                    /******* get photos from article content *********/
                    photoArr = common.getPhotosFromPostContent(postContent , photoCat , postPageJson)
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
                    tags_data = tags_data.replace(/"/gims , "");
                    tags_data = tags_data.replace(/#/gims , '');
                    /******* get tags from article ********/
                    
                    /**** ads integration start here ****/
                    if(constant.hideJSforEU == 'no' && !adsexcludearr.includes(postid))
                    {
                        var ads_catSlug = '';
                        
                        ads_catSlug = catSlug_new;
                        
                        const adsArr = [];
                        var keyArr = ['fprosarticle','fparticle'+ads_catSlug];
                        temp_vars['ads'] = common.getAds(keyArr,'amp','ads_arr_amp');
                        
                        if(Object.keys(temp_vars['ads']).length == 0){
                            delete temp_vars['ads'];
                        }
                    }
                    /**** ads integration end here ****/
                    
                    /******* get related article data ******/
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
                * Use Below Promise for getting Infinite article ids only
                *=================================================================
                */
                new Promise((resolve, reject) => {
                    clientFetch("infinite_articles_"+catSlug_new).then((response) => {
                        infinite_article_data = JSON.parse(response);
                        if(infinite_article_data != null){
                            infinite_article_data = common.shuffleArr(infinite_article_data);
                        
                            let cnt = 0;
                            for (const [infineArticle_key, infineArticle] of Object.entries(infinite_article_data)) {
                                infineArticle['url'] = infineArticle['url'].replace('http://www.firstpost.com/',constant['SITE_URL']);
                                if(infineArticle['articleId'] != postid && (infineArticle['category'] != "sports-news" && infineArticle['category'] != "firstcricket")){        
                                    if(infiniteArticlesList.length < 1){
                                        infiniteArticlesList[cnt] = infineArticle; // making new array without current postID
                                        cnt++;
                                    }
                                }
                                if(infiniteArticlesList.length >= 1){
                                    break;
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
                temp_vars['pageName'] = 'photoArticle';
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
                seoData['metaDesc']  = postPageJson['post']['post_excerpt'];
                
                if(catSlug == 'photos'){
                    seoData['pageUrl']   = constant.SITE_URL+'photos/'+postSlug+'-'+postid+'.html';
                }else{
                    seoData['pageUrl']   = constant.SITE_URL+'photos/'+catSlug+'-gallery/'+postSlug+'-'+postid+'.html';
                }
                
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
                seoData['contentType'] = 'image.gallery';
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
                breadcrumbsArr[listitem_2] = common.capitalizeFLetter(catSlug_new)+ ' News';
                
            
                temp_vars['breadcrumb'] = common.getSchema(breadcrumbsArr,["breadcrumbs"],0);
                temp_vars['organisation'] = common.getSchema('',["organisation"],0);
                temp_vars['website'] = common.getSchema('',["website"],0);
                
                schema_meta['metaTitle'] = postPageJson['post']['post_title'];
                schema_meta['metaDesc']  = postPageJson['post']['post_excerpt'];
                schema_meta['contentUrl'] = seoData['pageUrl'];
                schema_meta['metaAuthor'] = postPageJson['post']['post_authorname'];
                schema_meta['metaAuthorSlug'] = postPageJson['post']['post_authorslug'];
                
                schema_meta['post_content'] = postPageJson['post']['post_content'].replace( /(<([^>]+)>)/gims, '');
                catSlug = 'photos';
                schema_meta['catSlug'] = common.capitalizeEWLetter(catSlug);
                schema_meta['post_published'] = postPageJson['post']['post_date'].replace(' ' , 'T')+'+05:30';
                schema_meta['post_modified'] = postPageJson['post']['post_modified'].replace(' ' , 'T')+'+05:30';
                schema_meta['post_image'] = postPageJson['post']['post_image'];
                schema_meta['tags'] = tags_data;
                
                schema_meta['schema_type'] = ["newsarticle","photos","webpage"];
                
                schema_meta['flag'] = 0;
                temp_vars['schema_meta'] = schema_meta;
                
                shareArr['shareTitle'] = postPageJson['post']['post_title'].replace(/'/gims , "").replace(/"/gims , '');
                    shareArr['shareUrl'] = seoData['pageUrl'];
            
                /*
                *==================================================================
                * Assign Template Varibles Here
                *=================================================================
                */
                serverPrefix = '';
                temp_vars['active_level2_nav_slug'] = catSlug;
                temp_vars['level3_nav_slug'] = "section~"+catSlug;    
                temp_vars['active_level3_nav_slug'] = sub_catSlug;
                temp_vars['constant'] = constant;
                temp_vars['viewpath'] = constant.viewpath;
                temp_vars['device'] = constant.device;
                temp_vars['footer'] = constant.footer;
                temp_vars['common'] = common;
                temp_vars['postContent'] = postContent;
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
                
                temp_vars['youtube_js_flag'] = youtube_js_flag;
                temp_vars['articleBody'] = articleBody;
                temp_vars['breadcrumbsArr'] = breadcrumbsArr;
                temp_vars['catSlug_new'] = catSlug_new;
                temp_vars['photoArr'] = photoArr;
                
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
                let template_name = "ampPhotoConsumption";
                res.render('mobile/firstpost/amp/'+template_name, templateVars);
                //res.render(constant.device + '/firstpost/photoConsumption', templateVars); 
                /*==================== End of rendering a view ==============================*/
            });
        }
    });
}
