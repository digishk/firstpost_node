/*
*==================================================================
* Project: Firstpost English
* Controller: FirstCricket Home
* Created By: Keval Solanki
* Note: Please read comments before doing any task. 
        Commented code is only reference.
*=================================================================
*/
const { promisify } = require("util");
const common = appRequire("common_functions");
const constant = appRequire("constant");
const dateFormat = require("dateformat");
exports.home = async (req, res) => {
	try {
		const { SITE_URL, config_flags, hideJSforEU } = constant;
		const { device, isMobile } = common.isMobileVar(req);
		const client = req.app.get("client");
		const clientFetch = promisify(client.get).bind(client); //now getAsync is a promisified version of client.get:
		const serverPrefix = "";
		const tag_name = "cricket";
		const pgNo = req.params["pg"] !== undefined ? req.params["pg"] : 1;
		const pgUrl = `${SITE_URL}firstcricket/sports-news/page/`; //request parameter used in routes.js
		const limit = 5;
		const start = isNaN(pgNo) ? "" : pgNo == 1 || pgNo == 0 ? "0" : limit * (Number(pgNo) - 1);
		const pgNoPerPage = 3;
        let breadcrumbsArr = [];
        let schema_meta = [];
        
        const adsPromise = async () => {
			if (hideJSforEU == "no") {
				const keyArr = ["fchome"];
				return common.getAds(keyArr, device, "ads_arr_cricket");
			}
		};


		const outbrainPromise = async () => {
			if (
				typeof config_flags.OUTBRAINS_ADS_FLAG !== "undefined" &&
				config_flags.OUTBRAINS_ADS_FLAG == 1
			) {
				var outbrainAdsKeyArr = [];
				outbrainAdsKeyArr["pageUrl"] =
					SITE_URL.replace(SITE_URL, "https://www.firstpost.com/") +
					"firstcricket";
				if (isMobile == 1) {
					outbrainAdsKeyArr["adsSlot"] = ["MB_2"];
				} else {
					outbrainAdsKeyArr["adsSlot"] = ["AR_2", "SB_4"];
				}
				return common.getOutbrainAds(outbrainAdsKeyArr);
			}
		};

		
		const categoryPageContent = await clientFetch("FP_Node_CategoryPageContents_firstcricket");

		let homePageJson = JSON.parse(categoryPageContent);

		const { main_ranking, related_ranking } = homePageJson && homePageJson.CatMainRanking;

		const redisKeyBuilder = (rankingData) => {
			const keys = [];
			for (const key in rankingData) {
				const { ID } = rankingData[key];
				const redisID = `${serverPrefix}fp_2.0_setPostDetail_${ID}`;
				keys.push(redisID);
			}
			return keys;
		};

		const homePageJsonBuilder = async (redisKey, rankingKey, homePageJson) => {
			const data = await clientFetch(redisKey);
			const parsedData = JSON.parse(data);
			const { ID, post_title, post_url, post_image, post_excerpt } = parsedData.post;
			const rankID = `id_${ID}`;
			const newData = {
				modified_title: post_title,
				modified_posturl: post_url,
				modified_postImg: post_image,
			};
			if (rankingKey === "related_ranking") {
				newData.modified_postExcerpt = post_excerpt
			};

			const rankData = homePageJson.CatMainRanking[rankingKey];
			homePageJson.CatMainRanking[rankingKey][rankID] = { ...rankData[rankID], ...newData };
			
		};

		const redisKeysMainRanking = redisKeyBuilder(main_ranking);
		const redisKeysRelatedRanking = redisKeyBuilder(related_ranking);

		const mainRankingPromises = redisKeysMainRanking.map((key) =>
			homePageJsonBuilder(key, "main_ranking", homePageJson)
		);
		const relatedRankingPromises = redisKeysRelatedRanking.map((key) =>
			homePageJsonBuilder(key, "related_ranking", homePageJson)
		);
        
        const mainStoryPromise = async (homePageJson) => {
            if(homePageJson && homePageJson.main_story && homePageJson.main_story.ID){
                const response = await clientFetch(`fp_2.0_setPostDetail_${homePageJson.main_story.ID}`)
                homePageJson.main_story.postData = JSON.parse(response)
            }
        }
		let [mostReadArticles, cricketNews, photoGallery, videosList, ads, outbrain_ads] = await Promise.all([
			clientFetch(`${serverPrefix}fp_top_stories_article_data`),
			common.getCategoryResults(start, 5, pgNo, "sports-news"),
			common.getCategoryResults(start, 4, pgNo, "photo-gallery"),
            common.getVideoTagResults(tag_name, start, limit, pgNo),
            adsPromise(),
            outbrainPromise(),
			...mainRankingPromises,
            ...relatedRankingPromises,
            // mainStoryPromise(homePageJson)
		]);
		let pagination = common.getPagination(
			cricketNews.solarCount,
			pgNo,
			pgUrl,
			pgNoPerPage,
			limit
		);
		let seoData = {
			pageUrl: `${SITE_URL}firstcricket`,
			canonicalUrl: `${SITE_URL}firstcricket`,
			ampUrl: `${SITE_URL}firstcricket/amp`,
			page_name: "firstcricket-home",
			page_type: "main",
			page_language: "en",
			metaTitle:
				"Live Cricket Scores, Firstcricket Commentary, Match Schedule, Highlights, News | Firstcricket, Firstpost.",
			metaDesc:
				"Latest cricket news, live cricket scores and updates, match series with cricket match schedule, photos, videos and more on Firstcricket of Firstpost.",
			metaKeyword:''
		};
		
			schema_meta.metaTitle = seoData.metaTitle
			schema_meta.metaDesc = seoData.metaDesc
			schema_meta.contentUrl = seoData.pageUrl
			schema_meta.metaAuthor = ""
			schema_meta.metaAuthorSlug = ""
			schema_meta.post_content = ""
			schema_meta.catSlug = ""
			schema_meta.post_published = ""
			schema_meta.post_modified = ""
			schema_meta.post_image = ""
			schema_meta.tags = seoData.metaKeyword
			schema_meta.schema_type = ["webpage"]
			schema_meta.flag = 0
		
		const listitem_2 = `${SITE_URL}firstcricket`;
		breadcrumbsArr[SITE_URL] = "Home";
		breadcrumbsArr[listitem_2] = "Cricket";
		const { liveMatchData, resultMatchData, upcomingMatchData } = cricketData;
		let templateVars = {
			outbrain_ads,
			ads,
			mostReadArtcles: JSON.parse(mostReadArticles),
			cricketNews,
			photoGallery,
			videosList,
			homePageJson,
			pagination,
			schema_meta,
			breadcrumbsArr,
			liveMatchList: liveMatchData,
			resultMatchList: resultMatchData,
			upcomingMatchList: upcomingMatchData,
			constant,
			viewpath: constant.viewpath,
			device,
			isMobile,
			footer: constant.footer,
			common,
			pageName: "firstcricket-home",
			mobilePageCss: `${SITE_URL}static/css/m-home-fc.css`,
			desktopPageCss: `${SITE_URL}static/css/home-fc.css`,
			otherFirstPaintCss: "firstpaint-fc",
			desktopCricJs: `${SITE_URL}static/js/main-fc.js`,
			mobileCricJs: `${SITE_URL}static/js/main-fc.js`,
			dateFormat,
			showRhsScore: "yes",
			showRhsResults: "yes",
			l2navbar: "yes",
			pgNo,
			pgUrl,
			start,
			seoData,
			template: "home",
			active_level2_nav_slug: "sports",
			level3_nav_slug: "section~sports",
			active_level3_nav_slug: "cricket",
			level4_nav_slug: "section~sports~cricket",
			active_level4_nav_slug: "home",
		};
		
		if (!templateVars.ads) delete templateVars.ads;
		res.render(`${device}/firstcricket/home`, templateVars);
	} catch (error) {
		console.log({From: 'firstcricket homeController', Error: error})
	}
};