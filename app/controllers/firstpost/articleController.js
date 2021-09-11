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
const { listenerCount } = require("events");
const error_controller = appRequire("error_controller");
/*==================== End of All Modules declaration ====================*/

exports.article = async (req, res) => {
	try {
		const { device, isMobile } = common.isMobileVar(req);
		const {
			category_slug: catSlug,
			subcategory_slug: sub_catSlug,
			article_slug: postSlug,
			article_id: postid,
		} = req.params;

		if (!postid || typeof postid === "undefined" || postid === null) {
			//res.status(404).redirect(constant.SITE_URL+'error-404');
			return error_controller.error(req, res);
		}

		const client = req.app.get("client");
		const clientFetch = promisify(client.get).bind(client); // now getAsync is a promisified version of client.get:

		let templateVars = {};
		templateVars.ads = {}
		let postPageJson = {};

		let live_tags_data = "";
		let postUrl = (  postPageSlug = content = liveBlog = matchCommentary = iplFlag = videoAdNtAllowedIds = is_this_faq = allQuestionAns = is_this_howto = allTagsOfHowTo = infiniteArticlesListJSON = noCss = iscomment = whatsAppSubTxt_Enable = section = ampWidget = req_url = isUserValid = http_login_val = moreNetworkData = adFlipUpClass = tagpageId = catSlugCapi = tags_data = tags_data_new = infinite_article_data = isPremium = faq_html = faq_url = fifaPredict = shw = iplFlag = mcdFlag = ctTrophyFlg = filteredContent = ogImg = twitImg = youtube_js_flag = articleBody = is_youtube_video = actor_arr = actorHTMLString = movieActorSchemaString = brandedContent = movie_language =
			"");

		let infiniteArticlesList = [];
		let currentArticle = [];
		let shareArr = [];
		let alsoSee = [];
		let videoURLArr = [];
		let schema_meta = [];
		let postContent = "";
		let newPostSlug = "";
		let seoData = {};
		let breadcrumbsArr = [];
		let sanofiIds = ["6636921"];
		let amazonWidget = catSlug == "amazon-fp" ? "yes" : "no";
		let serverPrefix = postid == "3426233" ? "Revamp_" : "";
		let adsexcludearr = [
			"3867719",
			"3938111",
			"3805785",
			"2095981",
			"3225026",
			"3863929",
			"3867719",
			"3863929",
			"3805785",
			"2095981",
			"4279923",
			"3225026",
			"3428522",
			"3805785",
			"2095981",
			"4279923",
			"3867719",
			"4662961",
			"3938111",
			"3421214",
			"3428522",
			"4898911",
			"2386094",
			"3805785",
			"4462829",
			"66390",
			"4873971",
			"4823501",
			"3225026",
			"2343864",
			"4174851",
			"1664381",
			"2240112",
			"4481163",
			"3327156",
			"3024360",
			"528779",
			"4455905",
			"2442214",
			"2443610",
			"3942863",
			"3943683",
			"3906527",
			"4443247",
			"528779",
			"4463699",
			"2877776",
			"4335847",
			"4494527",
			"3863929",
			"3805785",
			"2095981",
			"4279923",
			"3225026",
			"4174851",
			"1664381",
			"1808599",
			"2378692",
			"1175265",
			"2240112",
			"458284",
			"4481163",
			"3327156",
			"2378400",
			"2383180",
			"2442214",
			"2443610",
			"3603559",
			"3617989",
			"3702567",
			"3577999",
			"3678591",
			"4335847",
			"3943683",
			"3241086",
			"4443247",
			"528779",
			"4463699",
			"996091",
			"3867719",
			"996091",
			"4174851",
			"1664381",
			"1175265",
			"2240112",
			"4481163",
			"2383180",
			"3942863",
			"3906527",
			"4443247",
			"528779",
			"4463699",
			"1643567",
			"4174851",
			"5123401",
			"2378200",
			"2376784",
			"2292944",
			"1664381",
			"3270222",
			"2378692",
			"1175265",
			"2240112",
			"4481163",
			"2875320",
			"3327156",
			"4986131",
			"1065821",
			"3906527",
			"4443247",
			"528779",
			"1758627",
			"4463699",
			"765741",
			"4335847",
			"2378400",
			"2367162",
			"2369928",
			"2383180",
			"7101081",
		];

		catSlugCapi = common.capitalizeFLetter(catSlug); 

		const promise1 = async () => {
			let response = await clientFetch(`${serverPrefix}fp_2.0_setPostDetail_${postid}`);
			postPageJson = JSON.parse(response);
			if (!postPageJson) return "404";

			const allowedSlugs = postPageJson.category.map(category => category.category_url);
			let postUrlId = `${postPageJson.post.post_name}-${postid}`;
			let postSlugId = `${postSlug}-${postid}`;

			const matchCatSlug = (url) => url.includes(catSlug);

			if (postUrlId != postSlugId || !allowedSlugs.some(matchCatSlug)) return "301";
			postPageJson.post.post_title = postPageJson.post.post_title.replace(/"/gims, "'");
			postPageJson.post.post_excerpt = postPageJson.post.post_excerpt.replace(/"/gims, "'");

			newPostSlug = postPageJson.post.post_title.replace(/[^a-zA-Z ]/g, "").split(" ")

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
				url =`http://liveblogapi.nw18.com/follow/web/getLiveBlogJson.php?tag=${liveBlogKey}&p=fp&page=1&time=&d=&count=10&jsonp_callback=callbackjson_normal`;
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

		const getVideoData = async () => {
			const response = await clientFetch(`${serverPrefix}FP2.0_FeaturedVideo_Rankings`);
			const rhsVideoDetailsParsed = JSON.parse(response);
			const { post_url, post_date, post_title, ID } = rhsVideoDetailsParsed.rhsVideo[0];
			const vidArray = {
				"media-url": rhsVideoDetailsParsed.rhsVideo[0]["media-url"],
				"Daily-Motion-VideoId": rhsVideoDetailsParsed.rhsVideo[0]["Daily-Motion-VideoId"],
				post_date,
				post_title,
				ID,
			};
			const custom_params = {
				autoplay: "true",
				mute: "true",
				width: "100%",
				height: "250px",
				style: "",
				solarSlug: "",
			};
			let isLive = "";
			let RHS_LIVE_VIDEO_HIDE_TITLE_URL = "";
			if (
				constant.config_flags.RHS_LIVE_VIDEO_WIDGET &&
				constant.config_flags.RHS_LIVE_VIDEO_WIDGET == 1
			) {
				isLive = constant.config_flags.RHS_LIVE_VIDEO_WIDGET;
				if (
					constant.config_flags.RHS_LIVE_VIDEO_HIDE_TITLE_URL &&
					constant.config_flags.RHS_LIVE_VIDEO_HIDE_TITLE_URL == 1
				) {
					RHS_LIVE_VIDEO_HIDE_TITLE_URL =
						constant.config_flags.RHS_LIVE_VIDEO_HIDE_TITLE_URL;
				}
			}
			const { videoUrl, video_player } = await common.getVideoPlayerURL(
				req,
				vidArray,
				custom_params,
				isLive
			);
			return {
				RHS_LIVE_VIDEO_HIDE_TITLE_URL,
				gt_url_rhs: videoUrl,
				rhs_video_player: video_player,
				rhs_video_url: post_url,
				rhs_player: video_player.player,
			};
		};

		const promise2 = async () => {
			/* set title in image alt tag */
			let headline = postPageJson.post.post_title
			headline = headline.replace(/"/gims, "")
			headline = headline.replace(/'/gims, "")
			headline = headline.replace(/[^a-zA-Z0-9\s]/gims, "");

			postContent = postContent.replace(/(<img.*?alt=")(.*?)"/gims, "$1" + headline + '"');
			/* set title in image alt tag */

			/*dailymotion video start*/
			if(typeof catSlug !== "undefined" && catSlug == "art-and-culture"){
				if (isMobile == 1) {
					postContent = common.dailymotionVideo(postContent, "mobile");
				} else {
					postContent = common.dailymotionVideo(postContent, "desktop");
				}
			}
			/*dailymotion video start*/

			brandedContent = "no";
			if (postPageJson.meta["Branded-Content"] != "") {
				brandedContent = postPageJson.meta["Branded-Content"];
			}

			/* Search keywords covid-19 and coronavirus Start */
			// var CovidData = postContent.search(/COVID-19/i);
			//console.log("CovidData===="+CovidData);
			//var CovidData = postContent.match(/covid-19|coronavirus/);
			//if (CovidData != -1) {
			if (sub_catSlug != "brands-blogs" && postid != "9850981" && postid != "9884841" && brandedContent != "yes") {
				if (isMobile == 1) {
					postContent = postContent.replace(
						/\scovid-19\s/gims,
						' <span class="t-out-span"><a href="javascript:void(0);" class="covid-tooltip">COVID-19</a><span class="div-covid-tooltip"><a href="https://www.asianpaints.com/healthshield?cid=DI_N18_DM_B&utm_source=news18&utm_medium=fixed&utm_campaign=RHS&utm_content=banner" target="_blank" class="ap-link"><img class="ap-img" src="/static/images/300x100_asianpaint.gif"></img></a></span></span> '
					);
					postContent = postContent.replace(
						/covid-19\s/gims,
						' <span class="t-out-span"><a href="javascript:void(0);" class="covid-tooltip">COVID-19</a><span class="div-covid-tooltip"><a href="https://www.asianpaints.com/healthshield?cid=DI_N18_DM_B&utm_source=news18&utm_medium=fixed&utm_campaign=RHS&utm_content=banner" target="_blank" class="ap-link"><img class="ap-img" src="/static/images/300x100_asianpaint.gif"></img></a></span></span> '
					);
					postContent = postContent.replace(
						/\scovid-19/gims,
						' <span class="t-out-span"><a href="javascript:void(0);"  class="covid-tooltip">COVID-19</a><span class="div-covid-tooltip"><a href="https://www.asianpaints.com/healthshield?cid=DI_N18_DM_B&utm_source=news18&utm_medium=fixed&utm_campaign=RHS&utm_content=banner" target="_blank" class="ap-link"><img class="ap-img" src="/static/images/300x100_asianpaint.gif"></img></a></span></span> '
					);
					postContent = postContent.replace(
						/\scoronavirus\s/gims,
						' <span class="t-out-span"><a href="javascript:void(0);" class="covid-tooltip">coronavirus</a><span class="div-covid-tooltip"><a href="https://www.asianpaints.com/healthshield?cid=DI_N18_DM_B&utm_source=news18&utm_medium=fixed&utm_campaign=RHS&utm_content=banner" target="_blank" class="ap-link"><img class="ap-img" src="/static/images/300x100_asianpaint.gif"></img></a></span></span> '
					);
					postContent = postContent.replace(
						/coronavirus\s/gims,
						' <span class="t-out-span"><a href="javascript:void(0);" class="covid-tooltip">Coronavirus</a><span class="div-covid-tooltip"><a href="https://www.asianpaints.com/healthshield?cid=DI_N18_DM_B&utm_source=news18&utm_medium=fixed&utm_campaign=RHS&utm_content=banner" target="_blank" class="ap-link"><img class="ap-img" src="/static/images/300x100_asianpaint.gif"></img></a></span></span> '
					);
					postContent = postContent.replace(
						/\scoronavirus/gims,
						' <span class="t-out-span"><a href="javascript:void(0);" class="covid-tooltip">coronavirus</a><span class="div-covid-tooltip"><a href="https://www.asianpaints.com/healthshield?cid=DI_N18_DM_B&utm_source=news18&utm_medium=fixed&utm_campaign=RHS&utm_content=banner" target="_blank" class="ap-link"><img class="ap-img" src="/static/images/300x100_asianpaint.gif"></img></a></span></span> '
					);
				} else {
					postContent = postContent.replace(
						/\scovid-19\s/gims,
						' <span class="t-out-span"><a href="https://www.asianpaints.com/healthshield?cid=DI_N18_DM_B&utm_source=news18&utm_medium=fixed&utm_campaign=RHS&utm_content=banner" target="_blank" class="covid-tooltip">COVID-19</a><span class="div-covid-tooltip"><a href="https://www.asianpaints.com/healthshield?cid=DI_N18_DM_B&utm_source=news18&utm_medium=fixed&utm_campaign=RHS&utm_content=banner" target="_blank"><img src="/static/images/300x100_asianpaint.gif"></img></a></span></span> '
					);
					postContent = postContent.replace(
						/covid-19\s/gims,
						' <span class="t-out-span"><a href="https://www.asianpaints.com/healthshield?cid=DI_N18_DM_B&utm_source=news18&utm_medium=fixed&utm_campaign=RHS&utm_content=banner" target="_blank" class="covid-tooltip">COVID-19</a><span class="div-covid-tooltip"><a href="https://www.asianpaints.com/healthshield?cid=DI_N18_DM_B&utm_source=news18&utm_medium=fixed&utm_campaign=RHS&utm_content=banner" target="_blank"><img src="/static/images/300x100_asianpaint.gif"></img></a></span></span> '
					);
					postContent = postContent.replace(
						/\scovid-19/gims,
						' <span class="t-out-span"><a href="https://www.asianpaints.com/healthshield?cid=DI_N18_DM_B&utm_source=news18&utm_medium=fixed&utm_campaign=RHS&utm_content=banner" target="_blank" class="covid-tooltip">COVID-19</a><span class="div-covid-tooltip"><a href="https://www.asianpaints.com/healthshield?cid=DI_N18_DM_B&utm_source=news18&utm_medium=fixed&utm_campaign=RHS&utm_content=banner" target="_blank"><img src="/static/images/300x100_asianpaint.gif"></img></a></span></span> '
					);
					postContent = postContent.replace(
						/\scoronavirus\s/gims,
						' <span class="t-out-span"><a href="https://www.asianpaints.com/healthshield?cid=DI_N18_DM_B&utm_source=news18&utm_medium=fixed&utm_campaign=RHS&utm_content=banner" target="_blank" class="covid-tooltip">coronavirus</a><span class="div-covid-tooltip"><a href="https://www.asianpaints.com/healthshield?cid=DI_N18_DM_B&utm_source=news18&utm_medium=fixed&utm_campaign=RHS&utm_content=banner" target="_blank"><img src="/static/images/300x100_asianpaint.gif"></img></a></span></span> '
					);
					postContent = postContent.replace(
						/coronavirus\s/gims,
						' <span class="t-out-span"><a href="https://www.asianpaints.com/healthshield?cid=DI_N18_DM_B&utm_source=news18&utm_medium=fixed&utm_campaign=RHS&utm_content=banner" target="_blank" class="covid-tooltip">Coronavirus</a><span class="div-covid-tooltip"><a href="https://www.asianpaints.com/healthshield?cid=DI_N18_DM_B&utm_source=news18&utm_medium=fixed&utm_campaign=RHS&utm_content=banner" target="_blank"><img src="/static/images/300x100_asianpaint.gif"></img></a></span></span> '
					);
					postContent = postContent.replace(
						/\scoronavirus/gims,
						' <span class="t-out-span"><a href="https://www.asianpaints.com/healthshield?cid=DI_N18_DM_B&utm_source=news18&utm_medium=fixed&utm_campaign=RHS&utm_content=banner" target="_blank" class="covid-tooltip">coronavirus</a><span class="div-covid-tooltip"><a href="https://www.asianpaints.com/healthshield?cid=DI_N18_DM_B&utm_source=news18&utm_medium=fixed&utm_campaign=RHS&utm_content=banner" target="_blank"><img src="/static/images/300x100_asianpaint.gif"></img></a></span></span> '
					);
				}
			}
			// }(?<![\w\d])COVID-19(?![\w\d])
			//console.log("====CovidData======"+CovidData);
			/* Search keywords covid-19 and coronavirus End */

			//postContent = postContent.replace(/(<img.*?)src=\"(.*?)\"(.*?>)/, common.inbetween_article_image_replace);
			postContent = postContent.replace(
				/(<img.*?)src=\"(.*?)\"(.*?>)/gims,
				function (match, mat1, mat2, mat3) {
					var result = common.firstpost_imageOptimization(mat2);
					return (result = mat1 + ' src="' + result + '" ' + mat3);
				}
			);

			/*Remove no follow for internal Links Start*/
			postContent = postContent.replace(
				/<a rel="nofollow" target="_blank" href=\"https:\/\/\www.firstpost.com(.*?")/gims,
				'<a href="https://www.firstpost.com $1'
			);
			postContent = postContent.replace(
				/<a rel="nofollow" (target="_blank" href=\"https:\/\/\www.news18.com.*?")/gims,
				"<a $1"
			);
			postContent = postContent.replace(
				/<a rel="nofollow" (target="_blank" href=\"https:\/\/\www.moneycontrol.com.*?")/gims,
				"<a $1"
			);
			/*Remove no follow for internal Links End*/

			/*postContent = postContent.replace(/<blockquote>/gims,'<div class="whatsapp-desc">');
	postContent = postContent.replace(/<\/blockquote>/gims,'<\/div>');*/

			//------get article faq flag --------------//
			is_this_faq = "no";
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
				postContent = postContent.replace(/\[q\]/gims, "<p><b>");
				postContent = postContent.replace(/\[\/q\]/gims, "</b></p>");
				postContent = postContent.replace(/\[ans\]/gims, "<p>");
				postContent = postContent.replace(/\[\/ans\]/gims, "</p>");
				postContent = postContent.replace(/\[hq\]/gims, "<p><b>");
				postContent = postContent.replace(/\[\/hq\]/gims, "</b></p>");
				postContent = postContent.replace(/\[hans\]/gims, "<p>");
				postContent = postContent.replace(/\[\/hans\]/gims, "</p>");
				postContent = postContent.replace(/\[hstep\]/gims, "<p>");
				postContent = postContent.replace(/\[\/hstep\]/gims, "</p>");
			}

			/******* get tags from article ********/
			if (
				typeof postPageJson.tag !== "undefined" &&
				postPageJson.tag !== null &&
				postPageJson.tag != ""
			) {
				for (var [pk, pval] of Object.entries(postPageJson.tag)) {
					if (pval.slug == "fifa-world-cup-2018") fifaPredict = 1;
					if (pval.slug == "birla-mutual-funds") {
						shw = 1;
						break;
					} else if (pval.slug == "world-environment-day-2017") {
						$shw = 2;
						break;
					}
					tags_data += pval.name;
					tags_data_new += pval.name.replace(/'/g, "");
					if (pval.slug == "ipl-2017") iplFlag = true;
					if (pval.slug == "mcd-election-2017") mcdFlag = true;
					if (pval.slug == "ct-2017") ctTrophyFlg = true;
					// For Champions Trophy
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

				const viddata_arr = {
					post_date: postPageJson.post.post_modified,
					post_title: postPageJson.post.post_title,
					ID: postPageJson.post.ID,
					'Daily-Motion-VideoId': postPageJson.meta["Daily-Motion-VideoId"],
					'media-url': postPageJson.meta["Media-URL"],
					'youtube-video-id': postPageJson.meta["youtube-video-id"]
				};

				const custom_params = {
					autoplay: 'true',
					mute: 'true',
					width: '100%',
					height: isMobile == 1 ? '250px' : '350px',
					style: '',
					solarSlug: catSlug
				};

				//videoURLArr = common.getVideoPlayer(viddata_arr , custom_params);
				const videoArr = await common.getVideoPlayerURL(
					req,
					viddata_arr,
					custom_params,
					isLive
				);
				videoURLArr = videoArr.video_player;
			}
			/******* get video player data ******/

			/******* get ads data ******/
			if (constant.hideJSforEU == "no" && !adsexcludearr.includes(postid)) {
				var ads_catSlug = "";
				if (templateVars.liveBlogIncludeFlag == true) {
					ads_catSlug = "liveblog";
				} else if (
					postPageJson.meta["Movie-Name"] != "" &&
					postPageJson.meta["Movie-Rating"] > 0
				) {
					ads_catSlug = "movie-reviews";
				} else {
					ads_catSlug = catSlug;
				}
				var keyArr = ["fprosarticle", `fparticle${ads_catSlug}`];
				//var webarr = ['firstposthp'];
				//var mobarr = ['firstpostwapnewbusinesshp']
				let ads = common.getAds(keyArr, device);

				templateVars.ads = ads;
				
				//templateVars['ads'] = common.getAdsNew(req,webarr,mobarr);
				/*common.getAdsNew(req,webarr,mobarr).then((data) => {
			if(data != null){
				//console.log(JSON.stringify(data));
				adsNew = data['adCodeArr'];
				console.log("adsNew"+adsNew); 
			}
		});*/
				//console.log(templateVars['ads']);

				if (Object.keys(templateVars.ads).length == 0) {
					// delete templateVars.ads;
					templateVars.ads = {}
				}
			

				if (
					postPageJson.post.ID == "8945371" ||
					postPageJson.post.ID == "8944631" ||
					postPageJson.post.ID == "8944621" ||
					postPageJson.post.ID == "8945391"
				) {
					if (
						isMobile == "0" &&
						typeof templateVars.ads !== "undefined" &&
						Object.keys(templateVars.ads).length > 0
					) {
						var inbetween_ads = [];
						inbetween_ads.push(templateVars.ads.Video_1x1);

						postContent = common.breakContentAddAdsNew(
							postid,
							postContent,
							inbetween_ads,
							"desktop"
						);
					} else {
						if (
							isMobile == "1" &&
							typeof templateVars.ads !== "undefined" &&
							Object.keys(templateVars.ads).length > 0
						) {
							var inbetween_ads = [];
							inbetween_ads.push(templateVars.ads.Video_1x1_wap);

							postContent = common.breakContentAddAdsNew(
								postid,
								postContent,
								inbetween_ads,
								"mobile"
							);
						}
					}
				}

				if (
					isMobile == "1" &&
					typeof templateVars.ads !== "undefined" &&
					Object.keys(templateVars.ads).length > 0
				) {
					const inbetween_ads = [
						templateVars.ads.ATF_300,
						templateVars.ads.PG_1x1,
						templateVars.ads.PG_Slider_1x1,
						templateVars.ads.FLY_300,
						templateVars.ads.BTF_300
					];

					postContent = common.breakContentAddAds(postContent, inbetween_ads, "mobile");
				}
			}
		
			
			/******* get ads end ******/

			/******* get related article data ******/
			tags_data += live_tags_data;
			tags_data = tags_data.replace(/"/gims, "");
			tags_data = tags_data.replace(/#/gims, "");

			const articleData = await common.getRelatedArticle(
				postid,
				tags_data,
				(start = 0),
				(limit = 8),
				(page = 1)
			);
			if (articleData) {
				for (let [rel_key] of Object.entries(articleData.solarResults)) {
					alsoSee[rel_key] = articleData.solarResults.pop();
					if (alsoSee.length >= 3) {
						break;
					}
				}
				templateVars.relatedArticle = articleData.solarResults;
			}

			/******* get related article end ******/
		};

		const promise3 = async () => {
			if (templateVars.liveBlogIncludeFlag != true) {
				const catSlug_new = catSlug == "entertainment" ? 'bollywood' : catSlug;
				const response = await clientFetch(`infinite_${catSlug_new}`);
				infinite_article_data = JSON.parse(response);

				if (infinite_article_data != null) {
					//let cnt = 0;
					let i_cnt = 0;
					for (let [, infineArticle] of Object.entries(infinite_article_data)) {
						infineArticle.url = infineArticle.url.replace(
							"http://www.firstpost.com/",
							constant.SITE_URL
						);
						if (
							infineArticle.articleId != postid &&
							infineArticle.category != "sports-news" &&
							infineArticle.category != "firstcricket"
						) {
							if (infiniteArticlesList.length < 3) {
								infiniteArticlesList[i_cnt] = infineArticle; // making new array without current postID
								i_cnt++;
							}

							/*if((infineArticle_key >= (3*alsoSeePg)) && alsoSee.length < 3){
							alsoSee[cnt] = infineArticle; 
							cnt++;
						}*/
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
			}
		};

		let promise4 = async () => {
			if (
				typeof constant.config_flags.OUTBRAINS_ADS_FLAG !== "undefined" &&
				constant.config_flags.OUTBRAINS_ADS_FLAG == 1
			) {
				var outbrainAdsKeyArr = [];
				outbrainAdsKeyArr.pageUrl = postPageJson.post.post_url;
				if (isMobile == 1) {
					if (templateVars.liveBlogIncludeFlag == true) {
						outbrainAdsKeyArr.adsSlot = ["MB_2"];
					} else {
						outbrainAdsKeyArr.adsSlot = ["MB_1"];
					}
				} else {
					if (templateVars.liveBlogIncludeFlag == true) {
						outbrainAdsKeyArr.adsSlot = ["AR_2", "SB_4", "SB_1"];
					} else {
						outbrainAdsKeyArr.adsSlot = ["AR_1", "SB_4", "SB_1"];
					}
				}
				templateVars.outbrain_ads = common.getOutbrainAds(outbrainAdsKeyArr);
			}
		};

		let [rhsVideoData, cricketWidgetJson, mostReadArtcles] = await Promise.all([
			getVideoData(),
			clientFetch("FPCricketEvents"),
			clientFetch(`${serverPrefix}fp_top_stories_article_data`),
			promise2(),
			promise3(),
			promise4(),
		]);

		
		templateVars.pageName = "article";
		

		is_youtube_video = postContent.match(
			/<div.*?data-youtube=\"true\" data-youtube-id=\"(.*?)\"/gims
		);

		if (
			is_youtube_video != null ||
			(typeof postPageJson.meta["youtube-video-id"] !== "undefined" &&
				postPageJson.meta["youtube-video-id"] != "")
		) {
			youtube_js_flag = 1;
		}

		/*
		 *==================================================================
		 * Get Seo Meta
		 *=================================================================
		 */
		if (typeof postPageJson.meta.og_image !== "undefined" && postPageJson.meta.og_image != "") {
			ogImg = postPageJson.meta.og_image.replace("http://s2.firstpost.in/", constant.IMG_URL);
		} else {
			ogImg = postPageJson.post.post_image;
		}

		if (
			typeof postPageJson.meta.twitter_image !== "undefined" &&
			postPageJson.meta.twitter_image != ""
		) {
			//twitImg = postPageJson['meta']['twitter_image'].replace("wp-content/uploads","fpimages/300x300/fixed/jpg/scalex16x9").replace('http://s2.firstpost.in/' , constant.IMG_URL);
			twitImg = postPageJson.meta.twitter_image.replace(
				"http://s2.firstpost.in/",
				constant.IMG_URL
			);
		} else {
			twitImg = postPageJson.post.post_image;
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

		//.replace(/'/gims , "").replace(/"/gims , '')
		seoData = {
			metaTitle: `${postPageJson.post.post_title}-${common.capitalizeFLetter(catSlug)} News , Firstpost`,
			metaDesc: postPageJson.post.post_excerpt,
			newMetaTitle: postPageJson.meta.meta_title,
			newMetaDescription: postPageJson.meta.meta_description,
			newMetaKeywords: postPageJson.meta.meta_keywords,
			pageUrl: postPageJson.post.post_url,
			page_name: templateVars.pageName,
			page_type : templateVars.pageName,
			ogImg,
			twitImg,
			page_language: 'en',
			contentType: templateVars.pageName,
			tags: tags_data,
			tags_arr: postPageJson.tag,
			solarSlug: catSlug,
			ampUrl: `${postPageJson.post.post_url.replace("https://www.firstpost.com/", constant.SITE_URL)}/amp`,
			page_name: templateVars.pageName,
			modified_time: dateFormat(postPageJson.post.post_modified,"yyyy-mm-dd'T'HH:MM:ss+05:30"),
			updated_time: dateFormat(postPageJson.post.post_modified,"yyyy-mm-dd'T'HH:MM:ss+05:30"),
			published_time: dateFormat(postPageJson.post.post_date,"yyyy-mm-dd'T'HH:MM:ss+05:30")
		}
	
		if (templateVars.liveBlogIncludeFlag == true) {
			seoData.metaDesc +=
				" Watch LIVE News, Latest Updates, Live blog, Highlights and Live coverage online at firstpost.com.";
		}
	
		if (postPageJson.meta["Canonical-Url"]) {
			seoData.canonicalUrl = postPageJson.meta["Canonical-Url"];
		} else {
			seoData.canonicalUrl = postPageJson.post.post_url;
		}
	
	
	
		
		//templateVars['metaData'] = common.getMetaHtml(seoData , postPageJson);
		

		/*========== movie review schema ===========*/
		if (postPageJson.meta["Movie-Name"] != "" && postPageJson.meta["Movie-Rating"] > 0) {
			actor_arr = postPageJson.meta["Movie-Cast"].split(",");

			actor_arr.forEach(function (item) {
				actorHTMLString +=`<a href="${constant.SITE_URL}search/${item}">${common.capitalizeEWLetter(item)}</a>,`;
				movieActorSchemaString += `{ 
                            "@type": "Person",
                            "name": "${item}",
                            "sameAs":""
                        },`;
			});

			if (actorHTMLString != "") {
				actorHTMLString = actorHTMLString.slice(0, -1);
			}
			if (movieActorSchemaString != "") {
				movieActorSchemaString = movieActorSchemaString.slice(0, -1);
			}
			templateVars.actorHTMLString = actorHTMLString;
			templateVars.movieActorSchemaString = movieActorSchemaString;

			let language_patern = /^<p><strong>Language\s*:\s*(.*?)\s*<\/strong><\/p>/gims;
			movie_language = language_patern.exec(postContent);

			if (movie_language != null) {
				movie_language = movie_language[1];
			} else {
				movie_language = "";
			}
			templateVars.movie_language = movie_language;

			postContent = postContent.replace(language_patern, "");
		}

		/*
		 *==================================================================
		 * Get Schema Meta
		 *=================================================================
		 */
		var listitem_2 = `${constant.SITE_URL}category/${catSlug}`;
		breadcrumbsArr[constant.SITE_URL] = "Home";
		//breadcrumbsArr[listitem_2] = common.capitalizeFLetter(catSlug); //Donot delete , this is for reference
		breadcrumbsArr[listitem_2] = `${common.capitalizeFLetter(catSlug)} News`;

		/*templateVars['breadcrumb'] = common.getSchema(breadcrumbsArr,.breadcrumbs,0);
                templateVars['organisation'] = common.getSchema('',.organisation,0);
                templateVars['website'] = common.getSchema('',.website,0);*/

		
			schema_meta.metaTitle = postPageJson.post.post_title
			schema_meta.metaDesc =postPageJson.post.post_excerpt
			schema_meta.contentUrl = postPageJson.post.post_url
			schema_meta.metaAuthor =postPageJson.post.post_authorname
			schema_meta.metaAuthorSlug = postPageJson.post.post_authorslug
			schema_meta.post_content = postPageJson.post.post_content.replace(/(<([^>]+)>)/gims, "")
			schema_meta.catSlug = common.capitalizeEWLetter(catSlug)
			schema_meta.post_published = postPageJson.post.post_date.replace(" ", "T") + "+05:30"
			schema_meta.post_modified = postPageJson.post.post_modified.replace(" ", "T") + "+05:30"
			schema_meta.post_image = postPageJson.post.post_image
			schema_meta.tags = tags_data
			schema_meta.flag = 0
			schema_meta.schema_type = ["newsarticle", "photos", "webpage"]
		

		

		if (
			typeof postPageJson.meta["First-Tag"] !== "undefined" &&
			postPageJson.meta["First-Tag"] != "" &&
			postPageJson.meta["Movie-Rating"] != ""
		) {
			let firstTag = postPageJson.meta["First-Tag"].toLowerCase().replace(" ", "");

			if (firstTag == "moviereview") {
				schema_meta.schema_type.push("Review");
			}

			if (
				typeof postPageJson.meta["Movie-Short-Review"] !== "undefined" &&
				postPageJson.meta["Movie-Short-Review"] != ""
			) {
				schema_meta.metaMovieReview = postPageJson.meta["Movie-Short-Review"];
			} else if (
				typeof postPageJson.meta["Movie-Desc"] !== "undefined" &&
				postPageJson.meta["Movie-Desc"] != ""
			) {
				schema_meta.metaMovieReview = postPageJson.meta["Movie-Desc"];
			} else {
				schema_meta.metaMovieReview = schema_meta.metaDesc;
			}
			schema_meta.movieActorSchemaString = movieActorSchemaString;
			schema_meta.movieName = postPageJson.meta["Movie-Name"];
			schema_meta.movieDirector = postPageJson.meta["Movie-Director"];
			schema_meta.movieRating = postPageJson.meta["Movie-Rating"];
		}

		if (is_this_howto == "yes") {
			schema_meta.schema_type.push("HowTo");
			schema_meta.allTagsOfHowTo = allTagsOfHowTo;
		}

		if (is_this_faq == "yes") {
			schema_meta.schema_type.push("FAQPage");
			schema_meta.allQuestionAns = allQuestionAns;
		}

		shareArr.shareTitle = postPageJson.post.post_title
			.replace(/'/gims, "")
			.replace(/"/gims, "");
		shareArr.shareUrl = postPageJson.post.post_url.replace(
			constant.MAIN_SITE_URL,
			constant.SITE_URL
		);

		templateVars = {
			...templateVars,
			...rhsVideoData,
			liveMatchList : cricketData.liveMatchData,
			seoData,
			section: "firstpost",
			schema_meta,
			active_level2_nav_slug: catSlug,
			level3_nav_slug: `section~${catSlug}`,
			active_level3_nav_slug: sub_catSlug,
			constant,
			viewpath: constant.viewpath,
			device,
			isMobile,
			footer: constant.footer,
			common,
			liveBlog,
			postContent,
			postPageJson,
			catSlug,
			postSlug,
			postUrl,
			postid,
			amazonWidget,
			dateFormat,
			shareArr,
			req,
			sanofiIds,
			infiniteArticlesList,
			alsoSee,
			videoURLArr,
			youtube_js_flag,
			articleBody,
			breadcrumbsArr,
			striptags,
			newPostSlug,
			// adsNew
			mobilePageCss: `${constant.SITE_URL}static/css/m-article-fp.css`,
			desktopPageCss: `${constant.SITE_URL}static/css/m-article-fp.css`,
			cricketWidgetJson: JSON.parse(cricketWidgetJson),
			mostReadArtcles: JSON.parse(mostReadArtcles),
		};

		if (templateVars.liveBlogIncludeFlag == true) {
			templateVars.mobilePageCss = `${constant.SITE_URL}static/css/m-live-blog-fp.css`;
			templateVars.desktopPageCss = `${constant.SITE_URL}static/css/live-blog-fp.css`;
			templateVars.pageName = "liveBlog";
		}
		/*==================== End of Assignment of Template Variables ====================*/
		// console.log(JSON.stringify( templateVars['fCrickWidgetData'], null, "  "));

		/*
		 *==================================================================
		 * Render View Here only
		 *=================================================================
		 */
		res.render(`${device}/firstpost/articleConsumption`, templateVars);
		/*==================== End of rendering a view ==============================*/
	} catch (error) {
		console.log({ From: "articleController", Error: error });
	}
};

exports.long_reads = function(req,res,next){
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
    let seoData = [];
    let breadcrumbsArr = [];
    let postid =  req.params['article_id'];
    let postSlug =  req.params['article_slug'];
    let postContent = "";
    let content = "";
    let content_arr = "";
    let new_cnt = "";
    let newtxt =  "";
    let tags_data = "";
    let catSlug = "";
    let schema_meta = [];
    let shareArr = [];
    let redirect_flag = '';
    
    /*
    *==================================================================
    * Create Promise here
    *=================================================================
    */
    if(!postid || typeof postid === 'undefined' || postid === null){
        const error_controller = appRequire('error_controller');
        return error_controller.error(req,res);
    }
    
    clientFetch(serverPrefix+"fp_2.0_setPostDetail_"+postid).then((response) => {
        postPageJson = JSON.parse(response);
        
        if(!postPageJson || typeof postPageJson === 'undefined' || postPageJson === null){
            redirect_flag = '404';
            return redirect_flag;
        }
        
        post_url = postPageJson['post']['post_name']+"-"+postid;
        postUrl = postPageJson['post']['post_url'];
        
        if(postPageJson['post']['post_name'] != postSlug){
            redirect_flag = '301';
            return redirect_flag;
        }
    }).then((redirect_flag) => {
        if(typeof redirect_flag !== 'undefined' && redirect_flag !== null){
            if(redirect_flag == '301'){
                return res.redirect(301, postPageJson['post']['post_url'].replace(constant.MAIN_SITE_URL, constant.SITE_URL));    
            }
            if(redirect_flag == '404'){
                const error_controller = appRequire('error_controller');
                return error_controller.error(req,res);
            }
        }else{
            Promise.all([
                new Promise((resolve, reject) => {
                    
                    content = postPageJson['post']['post_content'];
                    
                    content =  content.replace(/\[lq\].*?<a.*?>(<img.*?alt=\"(.*?)\".*?\/>).*?<\/a>(.*?)(\[\/caption\]|<\/div>).*?\[\/lq\]/gims, '<div class="container-1280"><div class="contain-left-quote wow slideInLeft" data-wow-duration="3s"><div class="blockquote blockquote-right"></div>$3</div><div class="contain-left-img wow fadeIn" data-wow-duration="2s">$1<div class="img-caption">$2</div></div></div>');
                    
                    content =  content.replace(/\[rq\].*?<a.*?>(<img.*?alt=\"(.*?)\".*?\/>).*?<\/a>(.*?)(\[\/caption\]|<\/div>).*?\[\/rq\]/gims, '<div class="container-1280"><div class="contain-left-img wow fadeIn" data-wow-duration="2s" data-wow-offset="100">$1<div class="img-caption">$2</div></div><div class="contain-right-quote wow slideInRight" data-wow-duration="3s" data-wow-offset="100"><div class="blockquote blockquote-left"></div>$3</div></div>');
                    
                    content = content.replace(/<blockquote>(.*?)<\/blockquote>/gims, '<div class="middle-sec-quote wow zoomIn" data-wow-duration="2s"><span class="bt-pink"></span>$1<span class="bb-pink"></span></div>');
                    
                    content = content.replace(/\[imgcenter\](.*?)\[\/imgcenter\]/gims, '<section id="slide2"><div class="img-parent"><div class="section-background"><div class="section-background-image"> $1</div><div class="shape-text wow fadeIn" data-wow-duration="3s"></div></div></div></section>');
                    
                    content_arr = content.split("\n");
                    //console.log(content_arr.length , "console content array");
                    
                    let len_cnt = content_arr.length-1;
                    
                    let cnt_i = 0;
                    
                    for (const [pk, pval] of Object.entries(content_arr)){
                        
                        var long_pval = pval;
                        
                        long_pval = long_pval.replace(/<p><div/gim, "<div");
                        long_pval = long_pval.replace(/<\/div><\/p>/gims, "</div>");
                        long_pval = long_pval.replace(/<p><section/gim, "<section");
                        long_pval = long_pval.replace(/<\/section><\/p>/gims, "</section>");
                        
                        if (long_pval.match(/<div class=\"container-1280\">/gims)) {
                            new_cnt += '</div>'+long_pval+'<div class="main-artical container-730 wow fadeIn" data-wow-duration="3s">';
                        }else if(long_pval.match(/<section id=\"slide2\">/gims)){
                            new_cnt += '</div>'+long_pval+'<div class="main-artical container-730 wow fadeIn" data-wow-duration="3s">';
                        }else{
                            if(cnt_i == 0){
                                new_cnt += '<div class="main-artical first-letter-bold container-730 wow fadeIn" data-wow-duration="3s">';
                                new_cnt += '<div class="big-img-slug share-wrap"><div class="vuukle-powerbar"></div></div> ';
                                cnt_i++;
                            }
                            new_cnt += long_pval;
                        }
                        
                        if(pk == len_cnt){
                            new_cnt += '</div>';
                        }
                    
                        new_cnt = new_cnt.replace(/src="http:\/\/www.firstpost.com\/wp-content/gims, 'src="https:\/\/images.firstpost.com\/wp-content');
                        new_cnt = new_cnt.replace(/href="http:\/\/www.firstpost.com\/wp-content/gims, 'href="https:\/\/images.firstpost.com\/wp-content');
                    }
                    
                    /******* get tags from article ********/
                    if(typeof postPageJson['tag'] !== 'undefined' && postPageJson['tag'] !== null && postPageJson['tag'] != ''){
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
                            
                            if(pval['slug'] == 'ipl-2017'){iplFlag = true;}
                            if(pval['slug'] == 'mcd-election-2017'){mcdFlag = true};
                            if(pval['slug'] == 'ct-2017'){ctTrophyFlg = true}; // For Champions Trophy
                            if(pk != (postPageJson['tag'].length - 1)) tags_data += ',';
                        };
                        
                        tags_data.trim(",");
                    }
                    /******* get tags from article ********/
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
                        outbrainAdsKeyArr['pageUrl'] = postPageJson['post']['post_url'];
                        if(isMobile == 1){
                           outbrainAdsKeyArr['adsSlot'] = ['MB_1'];
                        }else{
                            outbrainAdsKeyArr['adsSlot'] = ['AR_1'];
                        }
                        
                        //console.log(outbrainAdsKeyArr , "outbrainAdsKeyArr");
                        temp_vars['outbrain_ads'] = common.getOutbrainAds(outbrainAdsKeyArr);
                        // console.log(JSON.stringify(temp_vars['ads'],null," "),"temp_vars['ads']");
                    }
                    resOutbrain();
                }),
                new Promise((resolve, rej) => {
                    if(constant.hideJSforEU == 'no')
                    {
                        const adsArr = [];
                        var keyArr = ['fparticlelong-reads'];
        
                        temp_vars['ads'] = common.getAds(keyArr,device);
                        //console.log(JSON.stringify(temp_vars['ads'],null," "),"temp_vars['ads']");
                    }
                    resolve();
                })
            ]).then(()=>{
                temp_vars['liveMatchList'] = cricketData['liveMatchData'];        
                temp_vars['pageName'] = 'long-read';
                /*
                *==================================================================
                * Set SEO Data
                *=================================================================
                */
                if(typeof postPageJson['meta']['og_image'] !== 'undefined' && postPageJson['meta']['og_image'] != ''){
                    ogImg = postPageJson['meta']['og_image'].replace('http://s2.firstpost.in/' , constant.IMG_URL);
                }else{
                    ogImg = postPageJson['post']['post_image'];
                }
                
                if(typeof postPageJson['meta']['twitter_image'] !== 'undefined' && postPageJson['meta']['twitter_image'] != ''){
                    twitImg = postPageJson['meta']['twitter_image'].replace("wp-content/uploads","fpimages/300x300/fixed/jpg/scalex16x9").replace('http://s2.firstpost.in/' , constant.IMG_URL);
                }else{
                    twitImg = postPageJson['post']['post_image'].replace("wp-content/uploads","fpimages/300x300/fixed/jpg/scalex16x9");
                }
                
                seoData['metaTitle'] = postPageJson['post']['post_title'].replace(/'/gims , "").replace(/"/gims , '')+' - Firstpost';
                seoData['metaDesc']  = postPageJson['post']['post_excerpt'].replace(/'/gims , "").replace(/"/gims , '');
                seoData['pageUrl']   = postPageJson['post']['post_url'];
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
                seoData['ampUrl'] = postPageJson['post']['post_url']+'/amp';
                seoData['page_name'] = temp_vars['pageName'];
                seoData['modified_time'] = dateFormat(postPageJson.post.post_modified , "yyyy-mm-dd'T'HH:MM:ss+05:30");
                seoData['updated_time'] = dateFormat(postPageJson.post.post_modified , "yyyy-mm-dd'T'HH:MM:ss+05:30");
                seoData['published_time'] = dateFormat(postPageJson.post.post_date , "yyyy-mm-dd'T'HH:MM:ss+05:30");
                
                /*
                *==================================================================
                * Set Schema Data
                *=================================================================
                */
                
                schema_meta['metaTitle'] = postPageJson['post']['post_title'];
                schema_meta['metaDesc']  = postPageJson['post']['post_excerpt'];
                schema_meta['contentUrl'] = postPageJson['post']['post_url'];
                schema_meta['metaAuthor'] = postPageJson['post']['post_authorname'];
                schema_meta['metaAuthorSlug'] = postPageJson['post']['post_authorslug'];
                
                schema_meta['post_content'] = postPageJson['post']['post_content'].replace( /(<([^>]+)>)/ig, '');
                schema_meta['catSlug'] = common.capitalizeEWLetter(catSlug);
                schema_meta['post_published'] = postPageJson['post']['post_date'].replace(' ' , 'T')+'+05:30';
                
                schema_meta['post_modified'] = postPageJson['post']['post_modified'].replace(' ' , 'T')+'+05:30';
                schema_meta['post_image'] = postPageJson['post']['post_image'];
                schema_meta['tags'] = tags_data;
                
                schema_meta['schema_type'] = ["webpage"];
                
                schema_meta['flag'] = 0;
                temp_vars['schema_meta'] = schema_meta;
                
                shareArr['shareTitle'] = postPageJson['post']['post_title'].replace(/'/gims , "").replace(/"/gims , '');
                shareArr['shareUrl'] = postPageJson['post']['post_url'];
                
                var listitem_2 = constant.SITE_URL+'tag/long-reads';
                breadcrumbsArr[constant.SITE_URL] = "Home";
                //breadcrumbsArr[listitem_2] = common.capitalizeFLetter(catSlug); //Donot delete , this is for reference
                breadcrumbsArr[listitem_2] = "Long Reads";
        
                /*
                *==================================================================
                * Assign Template Varibles Here
                *=================================================================
                */

                temp_vars['constant'] = constant;
                temp_vars['viewpath'] = constant.viewpath;
                temp_vars['device'] = device;
                temp_vars['isMobile'] = isMobile;
                temp_vars['footer'] = constant.footer;
                temp_vars['common'] = common;
                temp_vars['seoData'] = seoData;
                temp_vars['postPageJson'] = postPageJson;
                temp_vars['newPostContent'] = new_cnt;
                temp_vars['shareArr'] = shareArr;
                temp_vars['dateFormat'] = dateFormat;
                temp_vars['breadcrumbsArr'] = breadcrumbsArr;
                
                temp_vars['mobilePageCss'] = constant.SITE_URL+'static/css/m-long-read-fp.css';
                temp_vars['desktopPageCss'] = constant.SITE_URL+'static/css/long-read-fp.css';
                /*==================== End of Assignment of Template Variables ====================*/
                templateVars = {};
                templateVars = common.assignTempVars(temp_vars);
                /*==================== End of assignTempVars() ==============================*/
                
                /*
                *==================================================================
                * Render View Here only
                *=================================================================
                */
                res.render(device + '/firstpost/long-reads', templateVars); 
                /*==================== End of rendering a view ==============================*/
            });
        }    
    });
}