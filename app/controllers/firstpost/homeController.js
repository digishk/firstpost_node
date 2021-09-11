/*
*==================================================================
* Project: Firstpost English
* Controller: Home
* Created By: Keval Solanki
* Note: Please read comments before doing any task. 
        Commented code is only reference.
*=================================================================
*/
const { promisify } = require("util");
const common = appRequire("common_functions");
const constant = appRequire("constant");
const { SITE_URL } = constant;

const dateFormat = require("dateformat");

exports.home = async (req, res) => {
	try {
		const { device, isMobile } = common.isMobileVar(req);
		const client = req.app.get("client");
		const clientFetch = promisify(client.get).bind(client); // now getAsync is a promisified version of client.get:

		let postPageJson = "";

		const response = await clientFetch(`${serverPrefix}FPNodeHomeRankingContents`);
		let homePageJson = JSON.parse(response);
		const { main_ranking, related_ranking } = homePageJson && homePageJson.HPRanking;

		const ads = (() => {
			if (constant.hideJSforEU == "no") {
				var keyArr = ["fphome"];
				return common.getAds(keyArr, device);
			}
		})();

		const outbrain_ads = (() => {
			if (
				typeof constant.config_flags.OUTBRAINS_ADS_FLAG !== "undefined" &&
				constant.config_flags.OUTBRAINS_ADS_FLAG == 1
			) {
				var outbrainAdsKeyArr = [];
				outbrainAdsKeyArr["pageUrl"] = SITE_URL.replace(SITE_URL, constant.MAIN_SITE_URL);
				if (isMobile == 1) {
					outbrainAdsKeyArr["adsSlot"] = ["MB_7"];
				} else {
					outbrainAdsKeyArr["adsSlot"] = ["SB_4"];
				}

				//console.log(outbrainAdsKeyArr , "outbrainAdsKeyArr");
				return common.getOutbrainAds(outbrainAdsKeyArr);
			}
		})();

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
			const { post_content, ID, post_title, post_url } = parsedData.post;
			const rankID = `id_${ID}`;
			if (rankingKey === "main_ranking") {
				const pattern = /http:\/\/api.liveblog.in.com\/fp\/([^"\/']+)/gims;
				const content = post_content.replace(
					/http:\/\/d1lveptg2al0ok.cloudfront.net\/fp\//gims,
					"http://api.liveblog.in.com/fp/"
				);

				const liveBlogKey = common.getLiveBlogStatus(pattern, content);
				if (liveBlogKey != "") homePageJson.HPRanking[rankingKey][rankID]["isliveBlog"] = 1;
			}
			homePageJson.HPRanking[rankingKey][rankID].modified_title = post_title;
			homePageJson.HPRanking[rankingKey][rankID].modified_posturl = post_url;
		};

		const redisKeysMainRanking = redisKeyBuilder(main_ranking);
		const redisKeysRelatedRanking = redisKeyBuilder(related_ranking);

		const mainRankingPromises = redisKeysMainRanking.map((key) =>
			homePageJsonBuilder(key, "main_ranking", homePageJson)
		);
		const relatedRankinhPromises = redisKeysRelatedRanking.map((key) =>
			homePageJsonBuilder(key, "related_ranking", homePageJson)
		);

		const getVideoData = async () => {
			const response = await clientFetch(`${serverPrefix}FP2.0_FeaturedVideo_Rankings`);
			const rhsVideoDetailsParsed = JSON.parse(response); 
			const {post_url,post_date, post_title, ID} = rhsVideoDetailsParsed.rhsVideo[0] 
			const vidArray = {
				'media-url': rhsVideoDetailsParsed.rhsVideo[0]['media-url'],
				'Daily-Motion-VideoId': rhsVideoDetailsParsed.rhsVideo[0]['Daily-Motion-VideoId'],
				post_date,
				post_title,
				ID
			}
			const custom_params = {
				autoplay: 'true',
				mute: 'true',
				width: '100%',
				height: '250px',
				style: '',
				solarSlug: ''
			}
			let isLive = ''
			let RHS_LIVE_VIDEO_HIDE_TITLE_URL = ''
			if (constant.config_flags.RHS_LIVE_VIDEO_WIDGET && constant.config_flags.RHS_LIVE_VIDEO_WIDGET == 1) {
		        isLive = constant.config_flags.RHS_LIVE_VIDEO_WIDGET;
		        if (constant.config_flags.RHS_LIVE_VIDEO_HIDE_TITLE_URL && constant.config_flags.RHS_LIVE_VIDEO_HIDE_TITLE_URL == 1) {
		            RHS_LIVE_VIDEO_HIDE_TITLE_URL = constant.config_flags.RHS_LIVE_VIDEO_HIDE_TITLE_URL;
		        }
		    }
		   	const {videoUrl, video_player} = await common.getVideoPlayerURL(req,vidArray,custom_params,isLive)
			return {
				RHS_LIVE_VIDEO_HIDE_TITLE_URL,
				gt_url_rhs: videoUrl,
				rhs_video_player: video_player,
				rhs_video_url: post_url,
				rhs_player: video_player.player
			}
		}

		const getCricketWidgetData = async () => {
			const response = await clientFetch("FP2.0_FCricket_RankingsMainRelated")
			let fCrickWidgetData = JSON.parse(response);
			const response2 = await clientFetch(`fp_2.0_setPostDetail_${fCrickWidgetData.main_story.ID}`)
			fCrickWidgetData.main_story.postData = JSON.parse(response2)
			return fCrickWidgetData
		}

		const [
			mostReadArtcles, 
			// rhsVideoData,
			// cricketWidgetJson,
			// fCrickWidgetData
		] = await Promise.all([
			clientFetch(`${serverPrefix}fp_top_stories_article_data`),
			// getVideoData(),
			// clientFetch("FPCricketEvents"),
			// getCricketWidgetData(),
			...mainRankingPromises,
			...relatedRankinhPromises,
		]);

		const schema_meta = {
			schema_type: ["organisation", "website"],
		};


		const originalMetaData = {
			metaTitle:
				"LIVE updates, Latest News, Breaking News, Bollywood, Business and Political News – Firstpost",
			metaDesc:
				"LIVE Updates: Get the Latest Breaking News from India and the World, Health, Politics, Arts and Entertainment, Sports, Business, Education, Technology and much more - Firstpost.com",
			tags: "live updates, latest news, breaking news, live news, trending topics, live news today, India news, world news, current headlines, news online, news headlines, live news online, latest current headlines, education, science, technology, sports news, entertainment, politics news, opinion news"
		}

		const modifiedMetaData = {
			metaTitle:
				"LIVE updates, Latest News, Assembly Election 2021 Results, West Bengal, Assam, Kerala, Puducherry, Tamil Nadu - Firstpost",
			metaDesc:
				"Get all the Latest 2021 Vidhan Sabha election results News & Coverage on West Bengal, Assam, Kerala, Tamil Nadu and Puducherry, counting of votes, election news, party wise results, Also check who won and who lost, Explore more at Firstpost",
			tags: 'Latest News, Latest headlines, Breaking news, West Bengal election result 2021, assembly election results, assembly elections 2021, assembly elections 2021 results, Vote Counting, live updates, latest updates, live blog, highlights, live coverage, Vidhan Sabha Chunav, Election results today, Election results Bengal, Election results 2021, Election live result, bengal election results 2021'
		}

		const metaData = constant.config_flags.TEMP_SEO_FLAG == "1" ? modifiedMetaData : originalMetaData

		const seoData = {
			pageUrl: "https://www.firstpost.com",
			page_name: "home",
			page_type: "main",
			page_language: "en",
			...metaData
		};

		const templateVars = {
			ads,
			outbrain_ads,
			pageName: seoData.page_name,
			schema_meta,
			newPostSlug: seoData.metaTitle.replace(/[^a-zA-Z ]/g, "").split(" "),
			liveMatchList: cricketData.liveMatchData,
			constant,
			viewpath: constant.viewpath,
			device,
			isMobile,
			footer: constant.footer,
			common,
			seoData,
			dateFormat,
			mobilePageCss: `${SITE_URL}static/css/m-home-fp.css`,
			desktopPageCss: `${SITE_URL}static/css/home-fp.css`,
			postPageJson,
			mostReadArtcles: JSON.parse(mostReadArtcles),
			homePageJson,
			// ...rhsVideoData,
			// cricketWidgetJson: JSON.parse(cricketWidgetJson),
			// fCrickWidgetData
		};
		res.render(`${device}/firstpost/home`, templateVars);
	} catch (error) {
		console.log(error.message);
	}
};