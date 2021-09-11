// , "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js"
var izCacheVer = 1; 
importScripts("https://cdn.izooto.com/scripts/workers/00acb2139b7de30d5754c91bdabbe2d808c2e453.js");
importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

addEventListener('install', function (e) {
  console.log('Sw Installed');
});

const JS_CACHE = 'js-cache';
const CSS_CACHE = 'css-cache';
const IMG_CACHE = 'image-cache';
const HOME_HTML_CACHE = 'homepage-html-cache';
const CRICKET_HTML_CACHE = 'cricket-html-cache';
const TECH_HTML_CACHE = 'tech-html-cache';
const CATEGORY_HTML_CACHE = 'category-html-cache';
const ARTICLE_HTML_CACHE = 'article-html-cache';

const FALLBACK_HTML_URL = '/offline.html';

var catergoryRegex = new RegExp('https:\/\/www.firstpost.com\/category\/(.*)');
var articleRegex = new RegExp('https:\/\/www.firstpost.com\/.*?([0-9]{5,})\.html');

if (workbox) {
    console.log("Yay! Workbox is loaded");
    
    // precache offline assets
    workbox.precaching.precacheAndRoute([
        { url: '/offline.html' },
    ]);
    
    //Home page html cache
    workbox.routing.registerRoute('\/' ,
        async ({event}) => {
            try {
                return await workbox.strategies.networkFirst({
                    cacheName: HOME_HTML_CACHE,
                    plugins: [new workbox.expiration.Plugin({
                      maxEntries: 1,
                      maxAgeSeconds: 24 * 60 * 60 // 1 days
                    })]
                }).handle({event});
            }catch (error) {
                return caches.match(FALLBACK_HTML_URL);
            }
        }
    );
    
    //Cricket page html cache
    workbox.routing.registerRoute('https:\/\/www.firstpost.com\/firstcricket\/' ,
      async ({event}) => {
          try {
              return await workbox.strategies.networkFirst({
                  cacheName: CRICKET_HTML_CACHE,
                  plugins: [new workbox.expiration.Plugin({
                    maxEntries: 1,
                    maxAgeSeconds: 24 * 60 * 60 // 1 days
                  })]
              }).handle({event});
          }catch (error) {
              return caches.match(FALLBACK_HTML_URL);
          }
      }
    );
    
    //Tech 2 page html cache
    workbox.routing.registerRoute('https:\/\/www.firstpost.com\/tech' ,
        async ({event}) => {
            try {
                return await workbox.strategies.networkFirst({
                    cacheName: TECH_HTML_CACHE,
                    plugins: [new workbox.expiration.Plugin({
                      maxEntries: 1,
                      maxAgeSeconds: 24 * 60 * 60 // 1 days
                    })]
                }).handle({event});
            }catch (error) {
                return caches.match(FALLBACK_HTML_URL);
            }
        }
    );
    
    //Category page html cache
    var catergoryMatch = function(route) {
        return catergoryRegex.test(route.url.href);
    };
    
    workbox.routing.registerRoute(catergoryMatch ,
        async ({event}) => {
            try {
                return await workbox.strategies.networkFirst({
                    cacheName: CATEGORY_HTML_CACHE,
                    plugins: [new workbox.expiration.Plugin({
                      maxEntries: 30,
                      maxAgeSeconds: 24 * 60 * 60 // 1 days
                    })]
                }).handle({event});
            }catch (error) {
                return caches.match(FALLBACK_HTML_URL);
            }
        }
    );
    //Category page html cache end
    
    //Article page html cache
    var articleMatch = function(route) {
        return articleRegex.test(route.url.href);
    };
    
    workbox.routing.registerRoute(articleMatch ,
        async ({event}) => {
            try {
                return await workbox.strategies.networkFirst({
                    cacheName: ARTICLE_HTML_CACHE,
                    plugins: [new workbox.expiration.Plugin({
                      maxEntries: 30,
                      maxAgeSeconds: 24 * 60 * 60 // 1 days
                    })]
                }).handle({event});
            }catch (error) {
                return caches.match(FALLBACK_HTML_URL);
            }
        }
    );
    
    // static caching for 1 day
    /*workbox.routing.registerRoute(
        /https:\/\/www.firstpost.com/,
        new workbox.strategies.NetworkFirst({
            // Use a custom cache name.
            cacheName: 'static-cache',
            plugins: [
                new workbox.expiration.Plugin({
                    // Cache only 20 images.
                    maxEntries: 200,
                    // Cache for a maximum of a day.
                    maxAgeSeconds: 24 * 60 * 60,
                })
            ],
        })
    );*/

    // static caching for 1 day
    workbox.routing.registerRoute(
        /https:\/\/images.firstpost.com/,
        new workbox.strategies.NetworkFirst({
            // Use a custom cache name.
            cacheName: 'images-static-cache',
            plugins: [
                new workbox.expiration.Plugin({
                    // Cache only 20 images.
                    maxEntries: 200,
                    // Cache for a maximum of a day.
                    maxAgeSeconds: 24 * 60 * 60,
                })
            ],
        })
    );
    
    // static caching for 1 day
    workbox.routing.registerRoute(
        /https:\/\/www.firstpost.com\/assets/,
        new workbox.strategies.NetworkFirst({
            // Use a custom cache name.
            cacheName: 'assets-static-cache',
            plugins: [
                new workbox.expiration.Plugin({
                    // Cache only 20 images.
                    maxEntries: 200,
                    // Cache for a maximum of a day.
                    maxAgeSeconds: 24 * 60 * 60,
                })
            ],
        })
    );
    
    // static caching for 1 day
    workbox.routing.registerRoute(
        /https:\/\/www.firstpost.com\/assets_mobile/,
        new workbox.strategies.NetworkFirst({
            // Use a custom cache name.
            cacheName: 'assets-mob-static-cache',
            plugins: [
                new workbox.expiration.Plugin({
                    // Cache only 20 images.
                    maxEntries: 200,
                    // Cache for a maximum of a day.
                    maxAgeSeconds: 24 * 60 * 60,
                })
            ],
        })
    );
    
    // js caching for 1 day
    workbox.routing.registerRoute(
        new RegExp(/(^https:\S*\.js)\W/, 'gims'), //literal function
        new workbox.strategies.NetworkFirst({
            // Use a custom cache name.
            cacheName: JS_CACHE,
            plugins: [
                new workbox.expiration.Plugin({
                    // Cache only 20 images.
                    //maxEntries: 20,
                    // Cache for a maximum of a day.
                    maxAgeSeconds: 24 * 60 * 60,
                })
            ],
        })
    );
    
    // css caching for 1 day
    workbox.routing.registerRoute(
        /\.css.*?/,
        new workbox.strategies.NetworkFirst({
            // Use a custom cache name.
            cacheName: CSS_CACHE,
            plugins: [
                new workbox.expiration.Plugin({
                    // Cache only 20 images.
                    //maxEntries: 20,
                    // Cache for a maximum of a day.
                    maxAgeSeconds: 24 * 60 * 60,
                })
            ],
        })
    );
    
    // image caching for 1 day
    workbox.routing.registerRoute(
        /\.(png|jpg|jpeg|svg|gif).*?/,
        new workbox.strategies.NetworkFirst({
            // Use a custom cache name.
            cacheName: IMG_CACHE,
            plugins: [
                new workbox.expiration.Plugin({
                    // Cache only 20 images.
                    maxEntries: 20,
                    // Cache for a maximum of a day.
                    maxAgeSeconds: 24 * 60 * 60,
                })
            ],
        })
    );
    
    // static caching for 1 day
    workbox.routing.registerRoute(
        /https:\/\/www.firstpost.com\/static/,
        new workbox.strategies.NetworkFirst({
            // Use a custom cache name.
            cacheName: 'revamp-assets-static-cache',
            plugins: [
                new workbox.expiration.Plugin({
                    // Cache only 20 images.
                    maxEntries: 200,
                    // Cache for a maximum of a day.
                    maxAgeSeconds: 24 * 60 * 60,
                })
            ],
        })
    );
    
    // Offline Google Analytics
    //workbox.googleAnalytics.initialize();
} else {
  console.log("Boo! Workbox didn't load");
}
