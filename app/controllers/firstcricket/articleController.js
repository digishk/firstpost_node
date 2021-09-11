/*
*==================================================================
* Project: Firstpost English
* Controller: Article
* Created By: Shailesh Parab
* Note: Please read comments before doing any task. 
        Commented code is only reference.
*=================================================================
*/
const { promisify } = require("util");
const common = appRequire("common_functions");
const constant = appRequire("constant");
const dateFormat = require("dateformat");
const ltrim = require("ltrim");
const rtrim = require("rtrim");
const striptags = require("striptags");
const error_controller = appRequire("error_controller");
/*==================== End of All Modules declaration ====================*/

exports.article = async (req, res) => {
	
	try {
		const { device, isMobile } = common.isMobileVar(req);
		const { postSlug, postid } = req.params;
		/*
		 *==================================================================
		 * Declare All the Varibles Here only
		 *=================================================================
		 */
		const client = req.app.get("client");
		const clientFetch = promisify(client.get).bind(client); // now getAsync is a promisified version of client.get:

		let templateVars = {};
		let postPageJson = {};
		let isMatchLive = "";

		let infiniteArticlesList = [];
		let currentArticle = [];
		let shareArr = [];
		let alsoSee = [];
		let videoURLArr = [];
		let newPostSlug = "";

		let live_tags_data = (liveblog_url = post_url = postUrl = postSlugId = postPageSlug = liveBlog = matchCommentary = iplFlag = videoAdNtAllowedIds = allQuestionAns = is_this_howto = allTagsOfHowTo = infiniteArticlesListJSON = noCss = iscomment = whatsAppSubTxt_Enable = section = ampWidget = req_url = isUserValid = http_login_val = moreNetworkData = adFlipUpClass = tagpageId = catSlugCapi = infinite_article_data = isPremium = fifaPredict = shw = iplFlag = mcdFlag = ctTrophyFlg = headline = filteredContent = ogImg = twitImg = youtube_js_flag = articleBody = is_youtube_video = actor_arr = actorHTMLString = movieActorSchemaString = movie_language =
			"");
		let postContent = "";

		let seoData = {};
		let breadcrumbsArr = [];
		let adsexcludearr = [];
		let tags_data = (tags_data_new = liveBlog = "");
		let catSlug = "sports";
		let seriesId = "";
		let matchId = "";
		templateVars.pseudo_value = "";
		templateVars.coverageEndTime = "";
		templateVars.liveMatchList = cricketData.liveMatchData;
		templateVars.resultMatchList = cricketData.resultMatchData;
		templateVars.upcomingMatchList = cricketData.upcomingMatchData;
		/*==================== End of Declaration of all variables ====================*/

		/*========== if postid not found redirect to 404 page =======================*/
		if (!postid) {
			//res.status(404).redirect(constant.SITE_URL+'error-404');
			return error_controller.error(req, res);
		}

		templateVars.quickUrl = "";
		templateVars.fullUrl = "";
		templateVars.commUrl = "";

		/*
		 *==================================================================
		 * Create Promise here
		 *=================================================================
		 */

		const promise1 = async () => {

			let response = await clientFetch(`${serverPrefix}fp_2.0_setPostDetail_${postid}`);
			postPageJson = JSON.parse(response);
			if (!postPageJson) return "404";

			let postUrlId = `${postPageJson.post.post_name}-${postid}`;
			let postSlugId = `${postSlug}-${postid}`;

			if (postUrlId != postSlugId) return "301";

			postPageJson.post.post_title = postPageJson.post.post_title.replace(/"/gims, "'");
			postPageJson.post.post_excerpt = postPageJson.post.post_excerpt.replace(/"/gims, "'");

			newPostSlug = postPageJson.post.post_title.replace(/[^a-zA-Z ]/g, "").split(" ");

			postUrl = postPageJson.post.post_url;

			if (postPageJson.meta["not-safe-for-ads"] == "yes") adsexcludearr.push(postid);

			postPageJson.post.post_image = postPageJson.post.post_image.replace(
				"http://s2.firstpost.in/",
				constant.IMG_URL
			);

			postContent = postPageJson.post.post_content;
			/**** liveblog code start here ****/
			content = postContent.replace(
				/http:\/\/d1lveptg2al0ok.cloudfront.net\/fp\//gims,
				"http://api.liveblog.in.com/fp/"
			);

			liveblog_url = "";

			articleBody = postContent.replace(
				'src="https://www.firstpost.com/wp-content',
				'src="https://images.firstpost.com/wp-content'
			);

			let pattern = /http:\/\/api.liveblog.in.com\/fp\/([^"\/']+)/gims;
			let liveBlogKey = common.getLiveBlogStatus(pattern, content);
			let liveBlogIncludeFlag = false;
			templateVars.liveBlog = "";
			templateVars.liveBlogIncludeFlag = liveBlogIncludeFlag;
			templateVars.liveBlogKey = liveBlogKey;

			if (liveBlogKey != "") {
				url = `http://liveblogapi.nw18.com/follow/web/getLiveBlogJson.php?tag=${liveBlogKey}&p=fp&page=1&time=&d=&count=10&jsonp_callback=callbackjson_normal`;
				liveBlogIncludeFlag = true;
				postContent = content.replace(
					/<iframe(.*?)api.liveblog.in.com(.*?)<\/iframe>/gims,
					"",
					content
				);

				delete templateVars.gt_url_rhs;
				delete templateVars.rhs_video_player;
				delete templateVars.rhs_video_url;
				delete templateVars.rhs_player;

				try {
					let liveBlogRaw = await common.getRawData(url);
					live_blog_json = ltrim(liveBlogRaw, "callbackjson_normal(");
					live_blog_json = rtrim(live_blog_json, ")");
					liveBlog = JSON.parse(live_blog_json);
					templateVars.liveBlog = liveBlog;
					templateVars.liveBlogIncludeFlag = liveBlogIncludeFlag;
					templateVars.liveBlogKey = liveBlogKey;

					live_tags_data =
						" live news, live updates, latest updates, latest news, live blog, highlights, live coverage, news online";
				} catch (error) {
					res.redirect(`/category/${catSlug}`);
				}
			}
		};

		const redirectFlag = await promise1();

		if (redirectFlag) {
			if (redirectFlag == "301") {
				return res.redirect(
					301,
					postPageJson.post.post_url.replace(constant.MAIN_SITE_URL, constant.SITE_URL)
				);
			}
			if (redirectFlag == "404") {
				let error_controller = appRequire("error_controller");
				return error_controller.error(req, res);
			}
		}

		const promise2 = async () => {
			/*Remove no follow for internal Links Start*/
			postContent = postContent.replace(
				/<a rel="nofollow" target="_blank" href=\"https:\/\/\www.firstpost.com(.*?")/gim,
				'<a href="https://www.firstpost.com$1'
			);
			postContent = postContent.replace(
				/<a rel="nofollow" (target="_blank" href=\"https:\/\/\www.news18.com.*?")/gim,
				"<a $1"
			);
			postContent = postContent.replace(
				/<a rel="nofollow" (target="_blank" href=\"https:\/\/\www.moneycontrol.com.*?")/gim,
				"<a $1"
			);
			/*Remove no follow for internal Links End*/
			let is_this_faq = "no";
			let faq_html = "";
			let faq_url = "";

			if (postPageJson.meta["is-this-faq"] != "") {
				is_this_faq = postPageJson.meta["is-this-faq"];
			}

			if (is_this_faq == "yes") {
				faq_html = postPageJson.post.post_content;
				faq_url = postPageJson.post.post_url;
				allQuestionAns = common.getSchemaContentFromPageContent(faq_html, faq_url, "faq");
			}

			is_this_howto = "no";
			if (postPageJson.meta["is-this-howto"] != "") {
				is_this_howto = postPageJson.meta["is-this-howto"];
			}

			if (is_this_howto == "yes") {
				faq_html = postPageJson.post.post_content;
				faq_url = postPageJson.post.post_url;
				allTagsOfHowTo = common.getSchemaContentFromPageContent(faq_html, faq_url, "howto");
			}

			if (is_this_howto == "yes" || is_this_faq == "yes") {
				postContent = postContent.replace(/\[q\]/g, "<p><b>");
				postContent = postContent.replace(/\[\/q\]/g, "</b></p>");
				postContent = postContent.replace(/\[ans\]/g, "<p>");
				postContent = postContent.replace(/\[\/ans\]/g, "</p>");
				postContent = postContent.replace(/\[hq\]/g, "<p><b>");
				postContent = postContent.replace(/\[\/hq\]/g, "</b></p>");
				postContent = postContent.replace(/\[hans\]/g, "<p>");
				postContent = postContent.replace(/\[\/hans\]/g, "</p>");
				postContent = postContent.replace(/\[hstep\]/g, "<p>");
				postContent = postContent.replace(/\[\/hstep\]/g, "</p>");
			}

			/******* get tags from article ********/
			if (postPageJson.tag != undefined && postPageJson.tag != "") {
				for (var [pk, pval] of Object.entries(postPageJson.tag)) {
					if (pval.slug == "fifa-world-cup-2018") {
						fifaPredict = 1;
					}
					if (pval.slug == "birla-mutual-funds") {
						shw = 1;
						break;
					} else if (pval.slug == "world-environment-day-2017") {
						$shw = 2;
						break;
					}
					tags_data += pval.name;

					tags_data_new += pval.name.replace(/'/g, "");

					if (pval.slug == "ipl-2017") {
						iplFlag = true;
					}
					if (pval.slug == "mcd-election-2017") {
						mcdFlag = true;
					}
					if (pval.slug == "ct-2017") {
						ctTrophyFlg = true;
					} // For Champions Trophy
					if (pk != postPageJson.tag.length - 1) tags_data += ", ";
					if (pk != postPageJson.tag.length - 1) tags_data_new += "','";
				}
			}
			/******* get tags from article ********/

			/******* get video player data ******/
			if (
				postPageJson.meta["Media-URL"] != "" ||
				postPageJson.meta["Daily-Motion-VideoId"] != "" ||
				postPageJson.meta["youtube-video-id"] != ""
			) {
				isLive = "";

				let viddata_arr = {
					post_date: postPageJson.post.post_modified,
					post_title: postPageJson.post.post_title,
					ID: postPageJson.post.ID,
					"Daily-Motion-VideoId": postPageJson.meta["Daily-Motion-VideoId"],
					"media-url": postPageJson.meta["Media-URL"],
					"youtube-video-id": postPageJson.meta["youtube-video-id"],
				};

				let custom_params = {
					autoplay: "true",
					mute: "true",
					width: "100%",
					height: isMobile == 1 ? "250px" : "350px",
					style: "",
					solarSlug: catSlug,
				};

				let videoArr = await common.getVideoPlayerURL(
					req,
					viddata_arr,
					custom_params,
					isLive
				);
				videoURLArr = videoArr.video_player;
			}
			/******* get video player data ******/

			tags_data += live_tags_data;
			tags_data = tags_data.replace(/"/gims, "");
			tags_data = tags_data.replace(/#/gims, "");

			let data = await common.getRelatedArticle(
				postid,
				tags_data,
				(start = 0),
				(limit = 8),
				(page = 1)
			);
			if (typeof data !== "undefined") {
				for (let [rel_key] of Object.entries(data.solarResults)) {
					alsoSee[rel_key] = data.solarResults.pop();
					if (alsoSee.length >= 3) {
						break;
					}
				}
				templateVars.relatedArticle = data.solarResults;
			}
		};

		const promise3 = async () => {
			templateVars.catSlug = catSlug;
			let catSlug_new = "sports";

			let response = await clientFetch("infinite_" + catSlug_new);

			infinite_article_data = JSON.parse(response);

			if (infinite_article_data != null) {
				for (let [infineArticle_key, infineArticle] of Object.entries(
					infinite_article_data
				)) {
					infineArticle.url = infineArticle.url.replace(
						"http://www.firstpost.com/",
						constant.SITE_URL
					);
					if (
						infineArticle.articleId != postid &&
						(infineArticle.category == "sports-news" ||
							infineArticle.category == "firstcricket")
					) {
						if (infiniteArticlesList.length < 3) {
							infiniteArticlesList[infineArticle_key] = infineArticle; // making new array without current postID
						}

						/*if((infineArticle_key >= (3*alsoSeePg)) && alsoSee.length < 3){
                                            alsoSee[cnt] = infineArticle; 
                                            alsoSee[cnt]['image'] = infineArticle['post_image']; 
                                            cnt++;
                                        }    */
					}
					if (infiniteArticlesList.length >= 3) {
						break;
					}
				}
				currentArticle.id = 4;
				currentArticle.title = postPageJson.post.post_title;
				currentArticle.url = postPageJson.post.post_url.replace(
					"http://www.firstpost.com/",
					constant.SITE_URL
				);
				currentArticle.articleId = postid;

				infiniteArticlesList.unshift(currentArticle); // push current post to first in infinite strip.
			}
		};

		const promise4 = async () => {

			let postCricketData = await clientFetch(`${serverPrefix}FP_cricket_post_${postid}`);

			templateVars.postCricketData = "";

			if (
				typeof postCricketData !== "undefined" &&
				postCricketData != null &&
				postCricketData != ""
			) {
				postCricketData = JSON.parse(postCricketData);
				templateVars.postCricketData = postCricketData;
				clientFetch(serverPrefix + "FP_cricket_widget_matchid_"+postCricketData['series_id']+"_"+postCricketData['match_id']).then((matchFileInfo)=> {
					var matchtime_ist = "";
					templateVars['seriesID'] = seriesId = postCricketData['series_id'];
					templateVars['matchID'] = matchId = postCricketData['match_id'];
					matchFileInfo = JSON.parse(matchFileInfo); 
					matchFile = matchFileInfo['match_filename'];
					templateVars['pseudo_value'] = matchFileInfo['pseudo_value'];                        
					matchKey = matchId+'_'+seriesId;
					let otherMatchData = "";
					if(templateVars['upcomingMatchList'][matchKey] != undefined){
						matchFile = cricketData['upcomingMatchData'][matchKey]['matchfile'];
						matchtime_ist = cricketData['upcomingMatchData'][matchKey]['matchtime_ist'];
						otherMatchData = cricketData['upcomingMatchData'][matchKey];
						isMatchLive = cricketData['upcomingMatchData'][matchKey]['live'];
					}
					 if(templateVars['resultMatchList'][matchKey] != undefined){
						matchFile = cricketData['resultMatchData'][matchKey]['matchfile'];
						matchtime_ist = cricketData['resultMatchData'][matchKey]['matchtime_ist'];
						otherMatchData = cricketData['resultMatchData'][matchKey];
						isMatchLive = cricketData['resultMatchData'][matchKey]['live'];
						//console.log(otherMatchData,"aaaa");
					}                    
					 if(templateVars['liveMatchList'][matchKey] != undefined){                        
						matchFile = cricketData['liveMatchData'][matchKey]['matchfile'];          
						matchtime_ist = cricketData['liveMatchData'][matchKey]['matchtime_ist'];
						otherMatchData = cricketData['liveMatchData'][matchKey];
						isMatchLive = cricketData['liveMatchData'][matchKey]['live'];
					}
					templateVars['matchFile'] = matchFile;
					templateVars['isMatchLive'] = isMatchLive;
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
					templateVars['blogUrl'] = postPageJson['post']['post_url'];
					templateVars['scoreData'] = commentaryData;
					templateVars['scoreData']['matchtime_ist'] = matchtime_ist;                        
					let currInning = '';                        
					templateVars['innCount'] = 1;     
					if(commentaryData['fourthInnings']['status'] == '1'){
						currInning = "fourthInnings";                            
						templateVars['innCount'] = 4;
					}
					else if(commentaryData['thirdInnings']['status'] == '1'){
						currInning = "thirdInnings";                            
						templateVars['innCount'] = 3;
					}
					else if(commentaryData['secondInnings']['status'] == '1'){
						currInning = "secondInnings";                            
						templateVars['innCount'] = 2;
					}
					else{
						currInning = "firstInnings";                             
					} 
					templateVars['currInning'] = currInning;
					templateVars['deFUrl'] = "https://www.firstpost.com/firstcricket/player-profile/";
					
						teama = commentaryData['teama'];
						teamb = commentaryData['teamb'];
						matchType = commentaryData['matchtype'];
						var postSlug = teama.toLowerCase() + '-vs-' + teamb.toLowerCase() + '-' + matchType.toLowerCase()+'-live-cricket-score';
						
						templateVars['quickUrl'] = constant.SITE_URL+'firstcricket/cricket-live-score/'+postSlug+'-quick/'+seriesId+'/'+matchId+'.html';
						templateVars['fullUrl'] = constant.SITE_URL+'firstcricket/cricket-live-score/'+postSlug+'-full/'+seriesId+'/'+matchId+'.html';
						templateVars['commUrl'] = constant.SITE_URL+'firstcricket/cricket-live-score/'+postSlug+'-commentary/'+seriesId+'/'+matchId+'.html';
						templateVars['postId'] = postid;

						
						if(typeof matchFileInfo['match_otherData'] !== 'undefined' && matchFileInfo['match_otherData'] !== null && matchFileInfo['match_otherData'] != ''){                                
							
							var datechange = matchFileInfo['match_otherData']['end_matchdate_ist'].split('/');
							var changedDate = datechange[1]+'-'+datechange[0]+'-'+datechange[2],    
							timeParts = matchFileInfo['match_otherData']['end_matchtime_ist'].split(':'),
							date = new Date(datechange[2], parseInt(datechange[0], 10) - 1, datechange[1], timeParts[0], timeParts[1]);
						
							var changeTime = date.getTime()+2700000;
							var date_ob = new Date(changeTime);

							var coverageEndTime = date_ob.getFullYear() + "-" + ("0" + (date_ob.getMonth() + 1)).slice(-2) + "-" + ("0" + date_ob.getDate()).slice(-2) + " " + ("0" + date_ob.getHours()).slice(-2) + ":" + ("0" + date_ob.getMinutes()).slice(-2);

							templateVars['coverageEndTime'] = coverageEndTime;
							}
						}
					})
				}) /*FP_cricket_widget_matchid_*/

			}
		};

		const [mostReadArtcles] = await Promise.all([
			clientFetch(`${serverPrefix}fp_top_stories_article_data`),
			promise2(),
			promise3(),
			promise4(),
		]);

		if (
			typeof constant.config_flags.OUTBRAINS_ADS_FLAG !== "undefined" &&
			constant.config_flags.OUTBRAINS_ADS_FLAG == 1
		) {
			var outbrainAdsKeyArr = [];
			outbrainAdsKeyArr.pageUrl = postPageJson.post.post_url;
			if (isMobile == 1) {
				outbrainAdsKeyArr.adsSlot = ["MB_1"];
			} else {
				outbrainAdsKeyArr.adsSlot = ["AR_1", "SB_4"];
			}
			templateVars.outbrain_ads = common.getOutbrainAds(outbrainAdsKeyArr);
		}

		if (constant.hideJSforEU == "no" && !adsexcludearr.includes(postid)) {
			var ads_catSlug = "";
			if (templateVars.liveBlogIncludeFlag == true) {
				ads_catSlug = "liveblog";
			} else if (typeof videoURLArr !== "undefined" && videoURLArr.post_id !== "undefined") {
				ads_catSlug = "videos";
			}
			var keyArr = ["fcarticle" + ads_catSlug];
			templateVars.ads = common.getAds(keyArr, device, "ads_arr_cricket");

			if (isMobile == "1" && typeof templateVars.ads !== "undefined") {
				var inbetween_ads = [];
				inbetween_ads.push(templateVars.ads.ATF_300);
				inbetween_ads.push(templateVars.ads.FLY_300);
				inbetween_ads.push(templateVars.ads.BTF_300);

				postContent = common.breakContentAddAds(postContent, inbetween_ads, "mobile");
			}

			if (typeof templateVars.ads === "undefined") {
				delete templateVars.ads;
			}
		}

		templateVars.pageName = "firstcricket-article";
		templateVars.section = "firstcricket";
		templateVars.seoData = seoData;

		/*
		 *==================================================================
		 * Get Seo Meta
		 *=================================================================
		 */
		var schema_meta = [];

		if (postPageJson.meta.og_image != undefined && postPageJson.meta.og_image != "") {
			ogImg = postPageJson.meta.og_image.replace("http://s2.firstpost.in/", constant.IMG_URL);
		} else {
			ogImg = postPageJson.post.post_image;
		}

		if (postPageJson.meta.twitter_image != undefined && postPageJson.meta.twitter_image != "") {
			twitImg = postPageJson.meta.twitter_image
				.replace("wp-content/uploads", "fpimages/300x300/fixed/jpg/scalex16x9")
				.replace("http://s2.firstpost.in/", constant.IMG_URL);
		} else {
			twitImg = postPageJson.post.post_image.replace(
				"wp-content/uploads",
				"fpimages/300x300/fixed/jpg/scalex16x9"
			);
		}
		if(typeof postPageJson.meta.meta_title !== "undefined" && postPageJson.meta.meta_title != ""){
			postPageJson.meta.meta_title = postPageJson.meta.meta_title.replace(/"/gims, "'");
		}
		if(typeof postPageJson.meta.meta_description !== "undefined" && postPageJson.meta.meta_description != ""){
			postPageJson.meta.meta_description = postPageJson.meta.meta_description.replace(/"/gims, "'");
		}
		if(typeof postPageJson.meta.meta_keywords !== "undefined" && postPageJson.meta.meta_keywords != ""){
			postPageJson.meta.meta_keywords = postPageJson.meta.meta_keywords.replace(/"/gims, "'");
		}
		seoData = {
			...seoData,
			metaTitle: postPageJson.post.post_title + " - Firstcricket News, Firstpost",	
			metaDesc: postPageJson.post.post_excerpt,
			newMetaTitle: postPageJson.meta.meta_title,
			newMetaDescription: postPageJson.meta.meta_description,
			newMetaKeywords: postPageJson.meta.meta_keywords,
			pageUrl: postPageJson.post.post_url,
			page_name : templateVars.pageName,
			page_type : templateVars.pageName,
			ogImg,
			twitImg
		}
		
		if (
			postPageJson.meta["Canonical-Url"] != undefined &&
			postPageJson.meta["Canonical-Url"] != ""
		) {
			seoData.canonicalUrl = postPageJson.meta["Canonical-Url"];
		} else {
			seoData.canonicalUrl = postPageJson.post.post_url;
		}
		const formatedModifiedDate = dateFormat(
			postPageJson.post.post_modified,
			"yyyy-mm-dd'T'HH:MM:ss+05:30"
		)

		const formatedDate = dateFormat(
			postPageJson.post.post_date,
			"yyyy-mm-dd'T'HH:MM:ss+05:30"
		)
		seoData = {
			...seoData,
			metaTitle: postPageJson.post.post_title + " - Firstcricket News, Firstpost",	
			metaDesc: postPageJson.post.post_excerpt,
			pageUrl: postPageJson.post.post_url,
			page_name : templateVars.pageName,
			page_type : templateVars.pageName,
			ogImg,
			twitImg,
			page_language : "en",
			contentType : templateVars.pageName,
			tags : tags_data,
			tags_arr : postPageJson.tag,
			solarSlug : catSlug,
			ampUrl : postPageJson.post.post_url + "/amp",
			page_name : templateVars.pageName,
			modified_time :formatedModifiedDate,
			updated_time :formatedModifiedDate
		}
	
		if (templateVars.pageName == "article") {
			seoData.published_time = formatedDate
		} else {
			seoData.published_time = formatedModifiedDate
		}

		//templateVars['metaData'] = common.getMetaHtml(seoData , postPageJson);

		/*
		 *==================================================================
		 * Get Schema Meta
		 *=================================================================
		 */
		var listitem_2 = constant.SITE_URL + "firstcricket/";
		var listitem_3 = constant.SITE_URL + "firstcricket/sports-news";
		breadcrumbsArr[constant.SITE_URL] = "Home";
		breadcrumbsArr[listitem_2] = "Cricket";
		breadcrumbsArr[listitem_3] = "News";

		templateVars.breadcrumbsArr = breadcrumbsArr;

		schema_meta.metaTitle = seoData.metaTitle;
		schema_meta.metaDesc = postPageJson.post.post_excerpt;
		schema_meta.contentUrl = postPageJson.post.post_url;
		schema_meta.metaAuthor = postPageJson.post.post_authorname;
		schema_meta.metaAuthorSlug = postPageJson.post.post_authorslug;

		schema_meta.post_content = postPageJson.post.post_content.replace(/(<([^>]+)>)/gi, "");
		schema_meta.catSlug = "FirstCricket";
		if (liveBlog.data != "" && typeof liveBlog.data != "undefined") {
			schema_meta.post_published =
				postPageJson.post.post_modified.replace(" ", "T") + "+05:30";
		} else {
			schema_meta.post_published = postPageJson.post.post_date.replace(" ", "T") + "+05:30";
		}
		schema_meta.post_modified = postPageJson.post.post_modified.replace(" ", "T") + "+05:30";
		schema_meta.post_image = postPageJson.post.post_image;
		schema_meta.tags = tags_data;

		schema_meta.schema_type = ["newsarticle", "webpage"];

		if (
			postPageJson.meta["Media-URL"] != "" ||
			postPageJson.meta["Daily-Motion-VideoId"] != "" ||
			postPageJson.meta["youtube-video-id"] != ""
		) {
			schema_meta.schema_type.push("VideoObject");
		}

		schema_meta.flag = 0;
		templateVars.schema_meta = schema_meta;

		shareArr.shareTitle = postPageJson.post.post_title.replace(/'/g, "").replace(/"/g, "");
		shareArr.shareUrl = postPageJson.post.post_url;

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

		templateVars = {
			...templateVars,
				seoData,
				postContent,
				device,
				isMobile,
				pageType : "article",
				constant,
				common,
				viewpath : constant.viewpath,
				footer : constant.footer,
				postSlug,
				postid,
				dateFormat,
				req,
				infiniteArticlesList,
				active_level2_nav_slug : "sports",
				level3_nav_slug : "section~sports",
				active_level3_nav_slug : "cricket",
				level4_nav_slug : "section~sports~cricket",
				active_level4_nav_slug : "news",
				template : "articleConsumption",
				articleBody,
				postPageJson,
				videoURLArr,
				shareArr,
				alsoSee,	
				showRhsScore : "yes",
				showRhsResults : "yes",
				striptags,
				tags_data,
				newPostSlug,
				mobilePageCss:constant.SITE_URL + "static/css/m-article-fc.css",
				desktopPageCss :constant.SITE_URL + "static/css/article-fc.css",
				otherFirstPaintCss : "firstpaint-fc",
				desktopCricJs : constant.SITE_URL + "static/js/main-fc.js",
				mobileCricJs : constant.SITE_URL + "static/js/main-fc.js",	
				mostReadArtcles : JSON.parse(mostReadArtcles)	
		}

		if (templateVars.liveBlogIncludeFlag == true || templateVars.pseudo_value == "1") {
			templateVars.mobilePageCss = constant.SITE_URL + "static/css/m-scorecard-fc.css";
			templateVars.desktopPageCss = constant.SITE_URL + "static/css/scorecard-fc.css";
			templateVars.pageName = "firstcricket-liveblog";
		}
		/*==================== End of Assignment of Template Variables ====================*
	



		/*
		 *==================================================================
		 * Render View Here only
		 *=================================================================
		 */

		res.render(device + "/firstcricket/articleConsumption", templateVars);
		/*==================== End of renardering a view ==============================*/
	} catch (error) {
		console.log({ From: "fc-articleController", Error: error });
	}
};