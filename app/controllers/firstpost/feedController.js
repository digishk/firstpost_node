/*
*==================================================================
* Project: Firstpost English
* Controller: RSS
* Created By: Digish Kansara
* Note: Please read comments before doing any task. 
        Commented code is only reference.
*=================================================================
*/
const {promisify} = require("util");
const common = appRequire('common_functions');
const constant = appRequire('constant');
/*==================== End of All Modules declaration ====================*/

exports.rss = function(req, res, next) {  

    var client = req.app.get('client');
	var temp_vars = [];
	const clientFetch = promisify(client.get).bind(client);

	let rssType =  req.params['rssType'];

	switch(rssType) {	
	
    case "rss":
    var feedCat =  req.params['feedCat'];
	temp_vars['r_key'] = "FP2.0_rssfeed_"+feedCat;
	break;

	case "newsFeed":
    var feedCat =  req.params['feedCat'];
	temp_vars['r_key'] = "FP2.0_apiRssFeed_"+feedCat;
	break;

	case "newsSitemap":
	var feedCat =  req.params['feedCat'];
	temp_vars['r_key'] = "FP2.0_newsSitemapxml";
	break;

	case "sitemapIndex":
	var feedCat =  req.params['feedCat'];
	temp_vars['r_key'] = "FP2.0_indexSitemapxml";
	break;

	case "sitemap":
	var feedCat =  req.params['feedCat'];
	temp_vars['r_key'] = "FP2.0_main_sitemapxml";
	break;

	case "sitemaptopic":
	var feedCat =  req.params['feedCat'];
	temp_vars['r_key'] = "FP2.0_topicsSitemapxml";
	break;

	case "today":
	var feedCat =  req.params['feedCat'];
	temp_vars['r_key'] = "FP2.0_todaySitemapxml";
	break;

	case 'monthly':
    var year = req.params['year'];
    var month = req.params['month'];
    temp_vars['r_key'] = "FP2.0_monthlySitemapxml_sitemap-pt-post-"+year+"-"+month;
    break;

    case 'opera':
    var feedCat =  req.params['feedCat'];
    temp_vars['r_key'] = "FP2.0_"+feedCat+"_opera_feeds";
    break;
     
    case 'other':    
    var feedCat =  req.params['feedCat'];      
    temp_vars['r_key'] = "FP2.0_"+feedCat+"_feeds";
    break;
    
	case 'social':
    var feedCat =  req.params['feedCat'];
    temp_vars['r_key'] = "FP2.0_socialrssfeed_"+feedCat;
    break;

	default:
	var feedCat =  req.params['feedCat'];
	temp_vars['r_key'] = "FP2.0_rssfeed_"+feedCat;
	    break;
	}

	Promise.all([
		 
		clientFetch(serverPrefix + temp_vars['r_key']).then((result)=> {
        temp_vars['feedData'] = JSON.parse(result);
        }),
    ]).then(() => { 	    
	//console.log(temp_vars['feedData']);
	//res.setHeader("Content-Type", "text/xml");
	 res.writeHead(200, {'Content-Type': 'text/xml'});
	 res.end(temp_vars['feedData']);
	 })
}	