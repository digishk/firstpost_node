/*
*==================================================================
* Project: Firstpost English
* Controller: Static
* Created By: Digish Kansara
* Note: Please read comments before doing any task. 
        Commented code is only reference.
*=================================================================
*/

const {
    promisify
} = require("util");
const common = appRequire('common_functions');
const constant = appRequire('constant');
var dateFormat = require('dateformat');

exports.static = function(req, res, next) {
    var deviceDetails = common.isMobileVar(req);
    const device  = deviceDetails.device;
    const isMobile  = deviceDetails.isMobile;
    
	var client = req.app.get('client');
	var temp_vars = [];
	temp_vars['seoData'] = {};
	var seoData = [];
	var template = "about-firstpost";
	const clientFetch = promisify(client.get).bind(client);

	let pageType =  req.params['pageType'];	

	switch(pageType) {
    case "terms-of-use":
	    seoData['metaTitle'] = 'Terms of use - Firstpost';
	    seoData['metaDesc'] = 'By visiting our site you are agreeing to be bound by the following terms and conditions. We may change these terms and conditions at any time. Your continued use of firstpost.com means that you accept any new or modified terms and conditions that we come up with. Please re-visit the `Terms of Use\' link at.';
	    seoData['pageUrl'] = '/terms-of-use';
	    template = "terms-of-use";

	    break;
	case "privacy":
	    seoData['metaTitle'] = 'Privacy Firstpost - Firstpost';
	    seoData['metaDesc'] = 'Privacy Firstpost - Firstpost.com will serve as a trusted guide to the crush of news and ideas around you. With thoughtful analysis and fearless views our team of editors and writers will track news in India and the world and provide a perspective that is reflective of a changing dynamic.';
	    seoData['pageUrl'] = '/privacy';
	    template = "privacy";
	    break;
	case "about-firstpost":
	    seoData['metaTitle'] = 'About Firstpost - Firstpost';
	    seoData['metaDesc'] = 'Firstpost.com will serve as a trusted guide to the crush of news and ideas around you. With thoughtful analysis and fearless views our team of editors and writers will track news in India and the world and provide a perspective that is reflective of a changing dynamic.';
	    seoData['pageUrl'] = '/about-firstpost';
	    template = "about-firstpost";
	    break;
	case "cookie-policy":
	    seoData['metaTitle'] = 'About Firstpost - Firstpost';
	    seoData['metaDesc'] = 'Firstpost.com will serve as a trusted guide to the crush of news and ideas around you. With thoughtful analysis and fearless views our team of editors and writers will track news in India and the world and provide a perspective that is reflective of a changing dynamic.';
	    seoData['pageUrl'] = '/cookie-policy';
	    template = "cookie-policy";
	    break;    
	case "rss":
	    seoData['metaTitle'] = 'RSS - Firstpost';
	    seoData['metaDesc'] = 'RSS Firstpost - Firstpost.com will serve as a trusted guide to the crush of news and ideas around you. With thoughtful analysis and fearless views our team of editors and writers will track news in India and the world and provide a perspective that is reflective of a changing dynamic.';
	    seoData['pageUrl'] = '/rss';
	    template = "rss";
	    break;    
	case "subscription-print":
	    seoData['metaTitle'] = 'Subscription for Firstpost Weekly Printed Newspaper | Prices & Offers';
	    seoData['metaDesc'] = 'Subscribe to our weekly printed newspaper with affordable price and enjoy reading latest news on politics, India, and global issues by well-known Indian and international columnists at Firstpost.';
	    seoData['pageUrl'] = '/subscription-premium';
	    template = "subscription-print";
	    break;
	case "whatsapp":
	    seoData['pageUrl'] = '/whatsapp';
	    template = "whatsapp";
	    break;      
	default:
		seoData['metaTitle'] = 'About Firstpost - Firstpost';
	    seoData['metaDesc'] = 'Firstpost.com will serve as a trusted guide to the crush of news and ideas around you. With thoughtful analysis and fearless views our team of editors and writers will track news in India and the world and provide a perspective that is reflective of a changing dynamic.';
	    seoData['pageUrl'] = '/about-firstpost';
	    break;
	}
		Promise.all([
		 
		clientFetch(serverPrefix + "fp_top_stories_article_data").then((result)=> {
        temp_vars['mostReadArtcles'] = JSON.parse(result); 
        }),
		/*
        *==================================================================
        * Use Below Promise for Ads only
        *=================================================================
        */
        new Promise((resolve, rej) => {
            if(constant.hideJSforEU == 'no')
            {
                const adsArr = [];
                var keyArr = ['fpros'];

                temp_vars['ads'] = common.getAds(keyArr,device);
                // console.log(JSON.stringify(temp_vars['ads'],null," "),"temp_vars['ads']");
            }
            resolve();

        })

       ]).then(() => { 	

        var breadcrumbsArr = [];
        breadcrumbsArr[constant.SITE_URL] = "Latest News";
        breadcrumbsArr[seoData['pageUrl']] = common.capitalizeFLetter(template);
        /*
        *==================================================================
        * Assign Template Varibles Here
        *=================================================================
        */

        var schema_meta = [];

        schema_meta['metaTitle'] = seoData['metaTitle'];
        schema_meta['metaDesc']  = seoData['metaDesc'];
        schema_meta['contentUrl'] = seoData['pageUrl'];

        schema_meta['schema_type'] = ["organisation","website","webpage"];
        schema_meta['flag'] = 0;
        temp_vars['schema_meta'] = schema_meta;
        temp_vars['seoData'] = seoData;
        temp_vars['metaData'] = common.getMetaHtml(seoData);
        temp_vars['constant'] = constant;
        temp_vars['viewpath'] = constant.viewpath;
        temp_vars['dateFormat'] = dateFormat;
        temp_vars['device'] = device;
temp_vars['isMobile'] = isMobile;
        temp_vars['footer'] = constant.footer;
        temp_vars['common'] = common;
        temp_vars['pageName'] = 'static';
        temp_vars['breadcrumbsArr'] = breadcrumbsArr;
		temp_vars['mobilePageCss'] = constant.SITE_URL+'static/css/m-static-fp.css';
        temp_vars['desktopPageCss'] = constant.SITE_URL+'static/css/static-fp.css';
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
        res.render(device + '/firstpost/'+template, templateVars); 
        /*==================== End of rendering a view ==============================*/
        console.log(process.env.NODE_ENV)
	//return;
	//console.log(pageType);return;
	})    
}	