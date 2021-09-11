/*
*==================================================================
* Project: Firstpost English
* Controller: Authors Listing / Detail 
* Created By: Digish Kansara
* Note: Please read comments before doing any task. 
        Commented code is only reference.
*=================================================================
*/

const {promisify} = require("util");
const common = appRequire('common_functions');
const constant = appRequire('constant');
var dateFormat = require('dateformat');
var async = require('async');
/*==================== End of All Modules declaration ====================*/

exports.listing = function(req, res, next) {
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
    var temp_vars = [];
    var authors_list = [];
    /*==================== End of Declaration of all variables ====================*/

    /*
    *==================================================================
    * Create Promise here
    *=================================================================
    */

    Promise.all([

    new Promise((resolve, reject) => {
            clientFetch("FP_AuthorDetails").then((response) => {
            var authors_list = JSON.parse(response); 
            temp_vars['authors_list'] = authors_list; 
	            resolve();

            })
        }),

    /*clientFetch("FP_AuthorDetailsID").then((result)=> {
         var authors_list = JSON.parse(result); 

        var authors_sorted_list =  authors_list.then((result1)=>{
        	sort((a, b) => a.firstname.localeCompare(b.firstname))
        })
		console.log(authors_sorted_list);
    }),*/	

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
    //console.log(temp_vars['authors_list']);	
    temp_vars['pageName'] = 'authors';
    var seoData = [];
    seoData['metaTitle'] = 'Authors Firstpost';
    seoData['metaDesc']  = 'Authors Firstpost';
    seoData['pageUrl']   = constant.SITE_URL+'authors.html';
    seoData['canonicalURL']   = constant.SITE_URL+'authors.html';
    seoData['page_name'] = temp_vars['pageName'];
    seoData['page_type'] = "main";
    seoData['page_language'] = "en";
    var schema_meta = [];

    schema_meta['metaTitle'] = seoData['metaTitle'];
    schema_meta['metaDesc']  = seoData['metaDesc'];
    schema_meta['contentUrl'] = seoData['pageUrl'];

    schema_meta['schema_type'] = ["organisation","website","webpage"];
    schema_meta['flag'] = 0;
    temp_vars['schema_meta'] = schema_meta;
    //temp_vars['metaData'] = common.getMetaHtml(seoData);

    var breadcrumbsArr = [];

    /*
    *==================================================================
    * Breadcrumb schema  
    *=================================================================
    */
    
    breadcrumbsArr[constant.SITE_URL] = "Latest News";
    breadcrumbsArr[constant.SITE_URL+'authors.html'] = "Authors";

    /* Breadcrumb schema end */
    /*
    *==================================================================
    * Assign Template Varibles Here
    *=================================================================
    */
    temp_vars['liveMatchList'] = cricketData['liveMatchData'];
    temp_vars['seoData'] = seoData;
    temp_vars['constant'] = constant;
    temp_vars['viewpath'] = constant.viewpath;
    temp_vars['device'] = device;
    temp_vars['isMobile'] = isMobile;
    temp_vars['footer'] = constant.footer;
    temp_vars['dateFormat'] = dateFormat;
    temp_vars['common'] = common;
    temp_vars['breadcrumbsArr'] = breadcrumbsArr;
    temp_vars['mobilePageCss'] = constant.SITE_URL+'static/css/m-authors-fp.css';
    temp_vars['desktopPageCss'] = constant.SITE_URL+'static/css/authors-fp.css';
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
    res.render(device + '/firstpost/authors-list', templateVars); 
    /*==================== End of rendering a view ==============================*/

    });

     	

}	

exports.detail = function(req,res,next){
    
    /*
    *==================================================================
    * Declare All the Varibles Here only
    *=================================================================
    */
    var deviceDetails = common.isMobileVar(req);
    const device  = deviceDetails.device;
    const isMobile  = deviceDetails.isMobile;
    var author_slug =  req.params['author_slug'];    //request parameter used in routes.js
    var page = (req.params['page'] !== undefined) ? req.params['page']  : 1;
    var limit = 20;
    var start = (isNaN(page)) ? '' : ((page == 1) || (page == 0)) ? '0' : limit*(Number(page)-1);
    var pgUrl =  constant['SITE_URL']+'author/'+author_slug+'/page/';
    var pgNoPerPage = 3;
    var client = req.app.get('client');
    const clientFetch = promisify(client.get).bind(client); // now getAsync is a promisified version of client.get:
    var temp_vars = [];
    var author_details = [];
    /*==================== End of Declaration of all variables ====================*/

    /*
    *==================================================================
    * Create Promise here
    *=================================================================
    */

    Promise.all([

        new Promise((resolve, reject) => {
            clientFetch("FP_AuthorDetails").then((response) => {
                var authors_list = JSON.parse(response);
                if (typeof authors_list[author_slug] === 'undefined') {
                    return resolve();
                }
                var authorId = authors_list[author_slug]['ID']; 
                temp_vars['authorPageJson'] = authors_list[author_slug];
                common.getAuthorArticles(authorId,start,limit,page).then((data) => {
                    temp_vars['author_details'] = data;
                    resolve();
                })
            })        
        }),

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
                var keyArr = ['fprosarticle'];

                temp_vars['ads'] = common.getAds(keyArr,device);
                // console.log(JSON.stringify(temp_vars['ads'],null," "),"temp_vars['ads']");
            }
            resolve();

        })

    ]).then(() => {
        if(typeof temp_vars['authorPageJson'] === 'undefined' || typeof temp_vars['author_details'] === 'undefined')
        {
            const error_controller = appRequire('error_controller');
            return error_controller.error(req,res);
        }
     //   console.log(temp_vars['author_details']);
        //console.log(temp_vars['authorPageJson']);
        //console.log(page);
    temp_vars['pageName'] = 'authors';   
    var seoData = [];
    seoData['metaTitle'] = temp_vars['authorPageJson']['displayname']+', Author at Firstpost';
    seoData['metaDesc']  = temp_vars['authorPageJson']['description'];
    seoData['pageUrl']   = constant['SITE_URL'].slice(0, -1)+req.url;
    seoData['page_name'] = temp_vars['pageName'];
    seoData['page_type'] = "main";
    seoData['page_language'] = "en";
    var schema_meta = [];

    schema_meta['metaTitle'] = seoData['metaTitle'];
    schema_meta['metaDesc']  = seoData['metaDesc'];
    schema_meta['contentUrl'] = seoData['pageUrl'];

    schema_meta['schema_type'] = ["organisation","website","webpage"];
    schema_meta['flag'] = 0;
    temp_vars['schema_meta'] = schema_meta;
    //temp_vars['metaData'] = common.getMetaHtml(seoData);
    /*
    *==================================================================
    * Get Pagination Data 
    *=================================================================
    */
    temp_vars['pagination'] =  common.getPagination(temp_vars['author_details']['solarCount'],page,pgUrl,pgNoPerPage,limit);
    //console.log("pagination is",temp_vars['pagination']);    

    var breadcrumbsArr = [];

    /*
    *==================================================================
    * Breadcrumb schema  
    *=================================================================
    */
    var listitem_2 = constant.SITE_URL+'authors.html';
    breadcrumbsArr[constant.SITE_URL] = "Latest News";
    breadcrumbsArr[listitem_2] = common.capitalizeFLetter("authors");
    breadcrumbsArr[temp_vars['authorPageJson']['authorslug']] = common.capitalizeFLetter(temp_vars['authorPageJson']['displayname']);
    
    /* Breadcrumb schema end */
    /*
    *==================================================================
    * Assign Template Varibles Here
    *=================================================================
    */
    //temp_vars['breadcrumb'] = common.getSchema(breadcrumbsArr,["breadcrumbs"],0);
    temp_vars['liveMatchList'] = cricketData['liveMatchData'];
    temp_vars['seoData'] = seoData;
    temp_vars['breadcrumbsArr'] = breadcrumbsArr;
    temp_vars['constant'] = constant;
    temp_vars['viewpath'] = constant.viewpath;
    temp_vars['device'] = device;
    temp_vars['isMobile'] = isMobile;
    temp_vars['footer'] = constant.footer;
    temp_vars['common'] = common;
    temp_vars['pgNo'] = page;
    temp_vars['pgUrl'] = pgUrl;
    temp_vars['start'] = start;
    temp_vars['dateFormat'] = dateFormat;
    temp_vars['breadcrumbsArr'] = breadcrumbsArr;
    temp_vars['mobilePageCss'] = constant.SITE_URL+'static/css/m-authors-fp.css';
    temp_vars['desktopPageCss'] = constant.SITE_URL+'static/css/authors-fp.css';    
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
    res.render(device + '/firstpost/authors-detail', templateVars); 
    /*==================== End of rendering a view ==============================*/
    })    
}