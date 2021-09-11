const fs = require('fs');

const controllersFolder = 'app/controllers';
const checkControllersFolder = './'+controllersFolder;
var totalitemCount = 0;
const common = appRequire('common_functions');

var glob = require("glob");
var getDirectories = function(src, callback) {
    glob(src + '/**/*.js', callback);
};

// Add pages which we want to redirect to home
const unknownPages = [
    '/amp',
    '/staticfiles/json/notify.json',
    '/wp-json/wp/v2/posts',
    '/andhra-pradesh-aassembly-elections/myduka-election-result-2019-s01a133'
]

const redirectPage = (app, sourceURL = '/', destinationURL = "/") => {
    app.get(sourceURL, (req, res)=> {
        res.set('location', destinationURL)
        res.status(301).send();
    }); 
}

const redirectPagesToHome = (app, pages) => {
    pages.forEach(page => {
        redirectPage(app, page)
    })
}

module.exports = async function(app, callbackMain) {
    getDirectories(controllersFolder, function(err, res) {
        if (err) {
            console.log('Error', err);
        } else {
            totalitemCount = res.length;

            for (const [key, value] of Object.entries(res)) {
                filepath = value.split(".js")[0];
                
                filename = filepath.split("/");

                mainfilename = filename[filename.length-1];

                if(filename[filename.length-2] != "controllers")
                {
                    mainfilename = filename[filename.length-2]+"_"+filename[filename.length-1];
                }

                // console.log(mainfilename);
                requirefile = "require('../" + filepath + "')";
                eval('var ' + mainfilename + '= ' + requirefile + ';');
            }

            /*
             *==================================================================
             * Create All routes in below block
             * If you need to add your own variables then please create variables in below block.
             * e.g. var homeController = require('../app/controllers/firstpost/homeController');
             * route with variable: app.get('/:category_id/:article_slug-:article_id(\\d+).html' ,  article.article);
             * regex route: app.get(/^\/(.*)\/(.*)-(\d{4,})(-\d|).html$/ims ,  article.article);
             * static path route: app.get('/:pageType(terms-of-use|privacy|about-firstpost)' ,  staticController.static);
             *
             * Pattern of automatic variable is mentioned below:
             * Suppose, a path is like app/controllers/firstpost/homeController.js
             * then your variable name will be firstpost_homeController
             * Another e.g. suppose, a controller is in root folder like app/controllers/configController.js
             * then your variable name will be configController
             *=================================================================
            */

            app.get('/', firstpost_homeController.home);

             // Redirection
            redirectPagesToHome(app, unknownPages)
            redirectPage(app, '/category/blogs/ideas-blogs', '/category/blogs')
            redirectPage(app, '/category/blogs/tech-blogs', '/category/blogs')
            redirectPage(app, '/category/business/economy/feed', '/category/business')
            redirectPage(app, '/category/business/robot.txt', '/category/business')
            redirectPage(app, '/category/business/biztech/feed', '/category/business')
            redirectPage(app, '/category/business/biztech', '/category/business')
            redirectPage(app, '/business/active', '/category/business')
            redirectPage(app, '/author/josha/page/active', '/authors.html')
            redirectPage(app, '/author/saj-sadiq/page/saj-sadiq', '/author/saj-sadiq/')

            app.get('/configdetailfile' ,  serverController.serverConfig);
            app.get('/authors.html',firstpost_authorsController.listing);
            app.get('/author/:author_slug',firstpost_authorsController.detail);
            app.get('/author/:author_slug/page/:page(\\d+)',firstpost_authorsController.detail);

            /*Rss feeds starts here */

            app.get('/rss/:feedCat(india|politics|bollywood|sports|tech|world|business|firstcricketnews|budget-news-feed|election-news-feed|ipl-news-feed|world-cup-2019-news-feed|firstcricket-news-feed|coronavirus-news-feed).xml', function(request, response){
                request.params.rssType = 'rss';
                firstpost_feedController.rss(request, response);
            });

            app.get('/rss/:feedCat(india|politics|bollywood|sports|tech|world|business|firstcricketnews|budget-news-feed|election-news-feed|ipl-news-feed|world-cup-2019-news-feed|firstcricket-news-feed|coronavirus-news-feed)-social.xml', function(request, response){
                request.params.rssType = 'social';
                firstpost_feedController.rss(request, response);
            });
            
            app.get('/rss/:feedCat-news-feed.xml', function(request, response){
                request.params.rssType = 'newsFeed';
                firstpost_feedController.rss(request, response);
            });

            app.get('/rss/:feedCat.xml', function(request, response){
                request.params.rssType = 'rss';
                firstpost_feedController.rss(request, response);
            });

            
            app.get('/news-sitemap.xml', function(request, response){
                request.params.rssType = 'newsSitemap';
                firstpost_feedController.rss(request, response);
            });
            
            app.get('/feeds/sitemap/sitemapIndex.xml', function(request, response){
                request.params.rssType = 'sitemapIndex';
                firstpost_feedController.rss(request, response);
            });

            app.get('/feeds/sitemap/sitemap.xml', function(request, response){
                request.params.rssType = 'sitemap';
                firstpost_feedController.rss(request, response);
            });

            app.get('/feeds/sitemap/sitemaptopic.xml', function(request, response){
                request.params.rssType = 'sitemaptopic';
                firstpost_feedController.rss(request, response);
            });

            app.get('/feeds/sitemap/today.xml', function(request, response){
                request.params.rssType = 'today';
                firstpost_feedController.rss(request, response);
            });

            app.get('/feeds/sitemap/sitemap-pt-post-:year(\\d+)-:month(\\d+).xml', function(request, response){
                request.params.rssType = 'monthly';
                firstpost_feedController.rss(request, response);
            });

            app.get('/feeds/data/opera_:feedCat.json', function(request, response){
                request.params.rssType = 'opera';
                firstpost_feedController.rss(request, response);
            });

            app.get('/feeds/data/:feedCat.xml', function(request, response){
                request.params.rssType = 'other';
                firstpost_feedController.rss(request, response);
            });

            /*Rss feeds ends  here */
            
            //redirect to tech site
            app.get('/category/tech' , function(request, response){
                response.set('location', '/tech');
                response.status(301).send();
            });
            /*FirstCricket Rules Start Here*/

            app.get('/firstcricket' ,  firstcricket_homeController.home);
            app.get('/category/firstcricket' , function(request, response){
                response.set('location', '/firstcricket');
                response.status(301).send();
            });
            app.get('/firstcricket/sports-news/india-vs-england-live-cricket-score-2nd-test-day-1-at-chennai-ind-vs-eng-match-latest-updates-9296651.html' , function(request, response){
                response.set('location', '/firstcricket/sports-news/india-vs-england-live-cricket-score-2nd-test-day-1-at-chennai-ind-vs-eng-match-latest-updates-2-9299621.html');
                response.status(301).send();
            });
            app.get('/firstcricket/amp', firstcricket_ampHomeController.ampHome);
            app.get('/firstcricket/:pageType(cricket-schedule|results|cricket-live-score|series)/' ,  firstcricket_scheduleResultsController.home);
            app.get('/firstcricket/photo-gallery/' , firstcricket_photoController.photo);
            app.get('/firstcricket/photo-gallery/page/:pg(\\d+)', firstcricket_photoController.photo);
            app.get('/firstcricket/cricket-videos/' , firstcricket_videoController.video);
            app.get('/firstcricket/cricket-videos/page/:pg(\\d+)', firstcricket_videoController.video);
            app.get('/firstcricket/teams-ranking/', firstcricket_rankingController.ranking);
            app.get('/firstcricket/players/:team_name-national-cricket-team', firstcricket_teamDataController.team);
            app.get('/firstcricket/player-profile/:player_name-:player_id(\\d+)', firstcricket_playerDataController.player);
            app.get('/firstcricket/cricket-live-score/:postSlug-:pageType(full|commentary|quick)/:seriesID(\\d+)/:matchID(\\d+).html' ,  firstcricket_scorecardController.home);
            app.get('/firstcricket/cricket-live-score/:postSlug-:pageType(full|commentary|quick)/:seriesID(\\d+)/:matchID(\\d+).html/amp' ,  firstcricket_ampScorecardController.home);
            app.get('/firstcricket/sports-news/:postSlug-:postid(\\d+).html' ,  firstcricket_articleController.article);
            app.get('/firstcricket/sports-news/:postSlug-:postid(\\d+).html/amp' ,  firstcricket_ampArticleController.article);        
            app.get('/firstcricket/:category_slug-gallery/:postSlug-:postid(\\d+).html/amp' ,  firstcricket_ampArticleController.article);
            app.get('/firstcricket/sports-news/page/:pg(\\d+)', firstcricket_newsController.sportsNews);
            app.get('/firstcricket/sports-news',firstcricket_newsController.sportsNews);            
            app.get('/firstcricket/:capType(orange|purple)-:pageType(cap-holder)/series/ipl-:year(\\d+).html' , firstcricket_iplSeriesController.series);
            app.get('/firstcricket/:pageType(teams)/series/ipl-:year(\\d+).html' , firstcricket_iplSeriesController.series);            
            app.get('/firstcricket/teams/:teamName-:pageType(team-players)/series/ipl-:year(\\d+).html' , firstcricket_iplSeriesController.series);            
            app.get('/firstcricket/:pageType(series)/ipl-:year(\\d+).html' , firstcricket_iplSeriesController.series);
            app.get('/firstcricket/:pageType(trivia)/series/ipl-:year(\\d+).html' , firstcricket_iplSeriesController.series);            
            app.get('/firstcricket/:pageType(sports-news)/series/ipl-:year(\\d+)/' , firstcricket_iplSeriesController.series);
            app.get('/firstcricket/:pageType(sports-news)/series/ipl-:year(\\d+)/page/:pg(\\d+)' , firstcricket_iplSeriesController.series);
            app.get('/firstcricket/:pageType(points-table)/series/ipl-:year(\\d+).html' , firstcricket_iplSeriesController.series);
            app.get('/firstcricket/:pageType(series)/:seriesSlug.html' , firstcricket_seriesController.series);
            app.get('/firstcricket/:pageType(sports-news)/series/:seriesSlug/' , firstcricket_seriesController.series);
            app.get('/firstcricket/:pageType(sports-news)/series/:seriesSlug/page/:pg(\\d+)' , firstcricket_seriesController.series);
            app.get('/firstcricket/:pageType(cricket-schedule|results)/series/:seriesSlug.html' , firstcricket_seriesScheduleResultsController.seriesSchRes);
            app.get('/firstcricket/:category_slug-gallery/:article_slug-:article_id(\\d+)-:photocnt(\\d{1,3}).html' ,  firstcricket_photoConsumptionController.photo);
            /*FirstCricket Rules Ends Here*/
            
            app.get('/category/:category_name', firstpost_categoryController.category);
            app.get('/category/:category_name/page/:pg(\\d+)', firstpost_categoryController.category);
            
            app.get('/tag/:tag_name/amp', firstpost_ampTagController.ampTag);
           
            /*Amp page rule*/
            app.get('/category/:category_name/amp', firstpost_ampCategoryController.ampCategory);
            app.get('/category/:category_name/page/:pg(\\d+)/amp', firstpost_ampCategoryController.ampCategory);

            app.get('/education/board-results/page/1' , function(request, response){
                response.set('location', '/education/board-results');
                response.status(301).send();
            });
            app.get('/education/board-results', firstpost_boardResultController.board);
            app.get('/education/board-results/page/:pg(\\d+)', firstpost_boardResultController.board);
            app.get('/sports/olympics', firstpost_olympicsController.olympics);
            
            app.get('/sports/olympics/:pageType(photos|videos|history|games|schedule|medal-tally)', firstpost_olympicsController.olympics);
            app.get('/board-results/:board-exam-result', firstpost_stateResultController.stateresult);
            app.get('/board-results/:board-exam-result/page/:pg(\\d+)', firstpost_stateResultController.stateresult);
            app.get('/tag/:tag_name', firstpost_tagController.tag);
            app.get('/tag/', firstpost_tagController.tag);
            app.get('/tag/:tag_name/page/:pg(\\d+)', firstpost_tagController.tag);
            app.get('/manjul-toons/',firstpost_tagController.manjul_toons);
            app.get('/manjul-toons',firstpost_tagController.manjul_toons);
            app.get('/manjul-toons/page/:pg(\\d+)', firstpost_tagController.manjul_toons);
            app.get('/config-flags', configController.config_flags);
            app.post('/config-flags', configController.config_flags);
            app.get('/:pageType(terms-of-use|privacy|about-firstpost|rss|cookie-policy)' , firstpost_staticController.static);

            /*** Shows Consumption***/
            app.get('/shows/:subcategory_slug/:article_slug-:article_id(\\d+).html' ,  firstpost_showsArticleController.showsArticle);  

            /*** Photos consumption ***/
            app.get('/photos/:category_slug-gallery/:article_slug-:article_id(\\d+)-:photocnt(\\d{1,3}).html/amp' ,  firstpost_ampPhotoController.AmpPhoto);
            app.get('/photos/:category_slug-gallery/:article_slug-:article_id(\\d+).html/amp' ,  firstpost_ampPhotoController.AmpPhoto);
            
            app.get('/:category_slug-gallery/:article_slug-:article_id(\\d+)-:photocnt(\\d{1,3}).html/amp' ,  firstpost_ampPhotoController.AmpPhoto);
            app.get('/:category_slug-gallery/:article_slug-:article_id(\\d+).html/amp' ,  firstpost_ampPhotoController.AmpPhoto);
            
            app.get('/:category_slug(photos)/:article_slug-:article_id(\\d+)-:photocnt(\\d{1,3}).html/amp' ,  firstpost_ampPhotoController.AmpPhoto);
            app.get('/:category_slug(photos)/:article_slug-:article_id(\\d+).html/amp' ,  firstpost_ampPhotoController.AmpPhoto);
            
            app.get('/photos/:category_slug-gallery/:article_slug-:article_id(\\d+)-:photocnt(\\d{1,3}).html' ,  firstpost_photoController.photo);
            app.get('/photos/:category_slug-gallery/:article_slug-:article_id(\\d+).html' ,  firstpost_photoController.photo);
            
            app.get('/:category_slug-gallery/:article_slug-:article_id(\\d+)-:photocnt(\\d{1,3}).html' ,  firstpost_photoController.photo);
            app.get('/:category_slug-gallery/:article_slug-:article_id(\\d+).html' ,  firstpost_photoController.photo);

            app.get('/:category_slug(photos)/:article_slug-:article_id(\\d+)-:photocnt(\\d{1,3}).html' ,  firstpost_photoController.photo);
            app.get('/:category_slug(photos)/:article_slug-:article_id(\\d+).html' ,  firstpost_photoController.photo);
            /*** Photos consumption ***/
            /*** Video consumption ***/
            app.get('/long-reads/:article_slug-:article_id(\\d+).html' ,  firstpost_articleController.long_reads);
            app.get('/videos/:category_slug/:article_slug-:article_id(\\d+).html/amp' ,  firstpost_ampVideoController.AmpVideo);
            app.get('/videos/:category_slug/:article_slug-:article_id(\\d+).html' ,  firstpost_videoController.video);
            /*** Video consumption ***/
            /*** article consumption ***/
            app.get('/:category_slug/:article_slug-:article_id(\\d+).html/amp' ,  firstpost_ampArticleController.AmpArticle);
            app.get('/:category_slug/:subcategory_slug/:subcategory1_slug/:subcategory2_slug/:article_slug-:article_id(\\d+).html/amp' ,  firstpost_ampArticleController.AmpArticle);
            app.get('/:category_slug/:subcategory_slug/:subcategory1_slug/:article_slug-:article_id(\\d+).html/amp' ,  firstpost_ampArticleController.AmpArticle);
            app.get('/:category_slug/:subcategory_slug/:article_slug-:article_id(\\d+).html/amp' ,  firstpost_ampArticleController.AmpArticle);
            app.get('/:category_slug/:article_slug-:article_id(\\d+).html' ,  firstpost_articleController.article);
            app.get('/:category_slug/:subcategory_slug/:subcategory1_slug/:subcategory2_slug/:article_slug-:article_id(\\d+).html' ,  firstpost_articleController.article);
            app.get('/:category_slug/:subcategory_slug/:subcategory1_slug/:article_slug-:article_id(\\d+).html' ,  firstpost_articleController.article);
            app.get('/:category_slug/:subcategory_slug/:article_slug-:article_id(\\d+).html' ,  firstpost_articleController.article);
            /*** article consumption ***/
            /*** entertainment Rules ***/
            app.get('/entertainment/:sub_category_name', firstpost_entSubCatController.subCat);
            app.get('/entertainment/:sub_category_name/page/:pg(\\d+)', firstpost_entSubCatController.subCat);
            app.get('/entertainment/movie-reviews', firstpost_entMovieReviewController.movieReview);
            /*** entertainment Rules end ***/
            
            app.get('/error-404',firstpost_errorController.error);
            app.get('/ajaxCalls/:function_name', (req,res) => {
                require('../app/services/ajaxCalls')(req,res);
                });

            /*Search page*/
            
            app.get('/search?:search_slug',firstpost_searchController.search);
            app.get('/auto-suggest/:search_slug',firstpost_searchController.auto_suggest);

            /*Shows Page*/

            app.get('/shows/',firstpost_showsController.shows);

            app.get('/shows/:category_slug' ,  firstpost_showsArticleController.showsCategory);  
            app.get('/shows/:category_slug/page/:pg(\\d+)', firstpost_showsArticleController.showsCategory);

            /* Do not change the position of this rule */
            app.get('/photos/:category_name', firstpost_categoryController.category);

            /* feed url 301 redirection */
            app.get('/feed/rss' , function(request, response){
                response.set('location', '/rss');
                response.status(301).send();
            });
            app.get('/feed' , function(request, response){
                response.set('location', '/rss');
                response.status(301).send();
            });
            /* feed url 301 redirection */
            /* article 301 redirection rule */
            
            app.get('/firstcricket/sports-news/:postSlug-:postid(\\d+).html/active' , function(request , response){
                response.set('location', '/firstcricket/sports-news/'+request.params.postSlug+'-'+request.params.postid+'.html');
                response.status(301).send();
            });

            app.get('/firstcricket/sports-news/:postSlug-:postid(\\d+).html/feed' , function(request , response){
                response.set('location', '/firstcricket/sports-news/'+request.params.postSlug+'-'+request.params.postid+'.html');
                response.status(301).send();
            });
            app.get('/:category_slug/:article_slug-:article_id(\\d+).html/feed' , function(request , response){
                response.set('location', '/'+request.params.category_slug+'/'+request.params.article_slug+'-'+request.params.article_id+'.html');
                response.status(301).send();
            });
            app.get('/:category_slug/:subcategory_slug/:article_slug-:article_id(\\d+).html/feed' , function(request , response){
                response.set('location', '/'+request.params.category_slug+'/'+request.params.subcategory_slug+'/'+request.params.article_slug+'-'+request.params.article_id+'.html');
                response.status(301).send();
            });
            app.get('/:category_slug/:subcategory_slug/:subcategory1_slug/:article_slug-:article_id(\\d+).html/feed' , function(request , response){
                response.set('location', '/'+request.params.category_slug+'/'+request.params.subcategory_slug+'/'+request.params.subcategory1_slug+'/'+request.params.article_slug+'-'+request.params.article_id+'.html');
                response.status(301).send();
            });
            app.get('/:category_slug/:subcategory_slug/:subcategory1_slug/:subcategory2_slug/:article_slug-:article_id(\\d+).html/feed' , function(request , response){
                response.set('location', '/'+request.params.category_slug+'/'+request.params.subcategory_slug+'/'+request.params.subcategory1_slug+'/'+request.params.subcategory2_slug+'/'+request.params.article_slug+'-'+request.params.article_id+'.html');
                response.status(301).send();
            });
            /* article 301 redirection rule */
            
            /* tag 301 redirection rule */

            // !NOTE: DUPLICATE CODE BELOW
            // app.get('/tag/:tag_name/feed', function(request , response){
            //     response.set('location', '/tag/'+ request.params.tag_name);
            //     response.status(301).send();
            // });
            // app.get('/tag/:tag_name/feed', function(request , response){
            //     response.set('location', '/tag/'+ request.params.tag_name);
            //     response.status(301).send();
            // });

            app.get('/tag/:tag_name/feed', function(request , response){
                response.set('location', `/tag/${common.removeSpecialCharacters(request.params.tag_name)}`);
                response.status(301).send();
            });
            app.get('/tag/:tag_name/feed/page/:pg(\\d+)', function(request , response){
                response.set('location', '/tag/'+ common.removeSpecialCharacters(request.params.tag_name)+'/page/'+common.removeSpecialCharacters(request.params.pg));
                response.status(301).send();
            });
            /* tag 301 redirection rule */
            
            /*This rule should always be the last one, no rules will execute after this*/
            app.get('/category/:category_name/feed' , function(request, response){
                response.set('location', '/category/'+ request.params.category_name);
                response.status(301).send();
            });
            app.get('/:category_name/feed' , function(request, response){
                response.set('location', '/category/'+ request.params.category_name);
                response.status(301).send();
            });
            app.get('/:category_name' , function(request, response){
                response.set('location', '/category/'+ request.params.category_name);
                response.status(301).send();
            });
            
            /* author 301 redirection */
            app.get('/author/:author_slug/feed/page/:pageno' , function(request, response){
                response.set('location', '/author/'+ request.params.author_slug);
                response.status(301).send();
            });

            app.get('/author/:author_slug/feed' , function(request, response){
                response.set('location', '/author/'+ request.params.author_slug);
                response.status(301).send();
            });
            /* author 301 redirection */
            app.get('/bollywood/bigg-boss-season-10/feed' , function(request, response){
                response.set('location', '/entertainment/bollywood');
                response.status(301).send();
            });
            
            /*
             *==================================================================
             * Create All routes in above block
             *=================================================================
            */
            callbackMain();
        }
    });
    
    //app.get(/^\/(.*)\/(.*)-(\d{4,})(-\d|).html$/ims ,  article.article);
    // app.get('/:category_id/:article_slug-:article_id(\\d+).html' ,  article.article);
    // app.get('/signup', home.signup);
    /*app.get('/', home.loggedIn, home.home);//home
    app.get('/home', home.loggedIn, home.home);//home*/
    /*app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/home', // redirect to the secure profile section
        failureRedirect: '/signup', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));
    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/home', // redirect to the secure profile section
        failureRedirect: '/login', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));*/
}