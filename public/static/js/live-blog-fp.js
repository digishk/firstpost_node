$(document).ready(function(){
    var post_title = $('#post_title').val();
    var post_url = $('#post_url').val();

    var socialshare = '<ul class="inner-share">';
    socialshare += '<li>';
    socialshare += '<a href="javascript:void(0);" class="fb sc-icon shareicon" title="'+post_title+'"  data-url="'+post_url+'" data-title="'+post_title+'" data-sitename="facebook"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30"><g id="" data-name="Group 1199" transform="translate(-290 -78)"><rect id="" data-name="Rectangle 702" width="30" height="30" rx="15" transform="translate(290 78)" fill="#4968ab"/><path id="" data-name="Icon feather-facebook" d="M18,3H15.954a3.409,3.409,0,0,0-3.409,3.409V8.454H10.5v2.727h2.045v5.454h2.727V11.181h2.045L18,8.454H15.272V6.409a.682.682,0,0,1,.682-.682H18Z" transform="translate(290.563 83.333)" fill="#fff"/></g></svg></a>';
    socialshare += '</li>';
    socialshare += '<li>';
    socialshare += '<a href="javascript:void(0);" class="tw sc-icon shareicon" title="'+post_title+'"  data-url="'+post_url+'" data-title="'+post_title+'" data-sitename="twitter"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30"><g id="" data-name="Group 1200" transform="translate(-296 -132)"><rect id="" data-name="Rectangle 703" width="30" height="30" rx="15" transform="translate(296 132)" fill="#01b0ef"/><path id="" data-name="Icon feather-twitter" d="M15.839,4.491a7.1,7.1,0,0,1-2.047,1A2.92,2.92,0,0,0,8.67,7.444V8.1A6.948,6.948,0,0,1,2.8,5.143S.2,11.009,6.062,13.616A7.587,7.587,0,0,1,1.5,14.92c5.866,3.259,13.036,0,13.036-7.5a2.933,2.933,0,0,0-.052-.541A5.032,5.032,0,0,0,15.839,4.491Z" transform="translate(302.5 136.515)" fill="#fff"/></g></svg></a>';
    socialshare += '</li>';
    socialshare += '<li>';
    socialshare += '<a href="javascript:void(0);" class="wa sc-icon shareicon" title="'+post_title+'"  data-url="'+post_url+'" data-title="'+post_title+'" data-sitename="whatsapp"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30"><g id="" data-name="Group 1201" transform="translate(-290 -45)"><rect id="" data-name="Rectangle 704" width="30" height="30" rx="15" transform="translate(290 45)" fill="#2cb742"/><path id="" data-name="Icon ionic-logo-whatsapp" d="M9.384,2.25A6.854,6.854,0,0,0,2.5,9.077,6.756,6.756,0,0,0,3.492,12.6L2.25,16.264l3.809-1.21A6.892,6.892,0,0,0,16.264,9.077,6.853,6.853,0,0,0,9.384,2.25Zm3.421,9.419a1.777,1.777,0,0,1-1.217.784c-.323.017-.332.25-2.091-.514A7.178,7.178,0,0,1,6.6,9.2a3.374,3.374,0,0,1-.649-1.829,1.949,1.949,0,0,1,.67-1.43.674.674,0,0,1,.476-.2c.139,0,.228,0,.331,0s.256-.021.389.333.452,1.225.493,1.314a.319.319,0,0,1,0,.306,1.2,1.2,0,0,1-.186.284c-.092.1-.193.22-.275.3s-.187.174-.091.353a5.265,5.265,0,0,0,.932,1.243,4.8,4.8,0,0,0,1.379.917c.173.094.275.084.382-.029s.458-.493.582-.662.24-.137.4-.073,1.006.518,1.179.612.288.142.329.216A1.445,1.445,0,0,1,12.805,11.669Z" transform="translate(295.783 50.683)" fill="#fff"/></g></svg></a>';
    socialshare += '</li>';
    socialshare += '<li>';
    socialshare += '<a href="javascript:void(0);" class="ln sc-icon shareicon"  title="'+post_title+'"  data-url="'+post_url+'" data-title="'+post_title+'" data-sitename="linkedin"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30"><g id="" data-name="Group 1202" transform="translate(-296 -166)"><rect id="" data-name="Rectangle 706" width="30" height="30" rx="15" transform="translate(296 166)" fill="#df5b43"/><path id="" data-name="Icon material-email" d="M13.567,6H4.174A1.173,1.173,0,0,0,3.006,7.174L3,14.219a1.178,1.178,0,0,0,1.174,1.174h9.393a1.178,1.178,0,0,0,1.174-1.174V7.174A1.178,1.178,0,0,0,13.567,6Zm0,2.348-4.7,2.935-4.7-2.935V7.174l4.7,2.935,4.7-2.935Z" transform="translate(302 170)" fill="#fff"/></g></svg></a>';
    socialshare += '</li>';
    socialshare += '</ul>';

if ($(".refresh-live-blog").length > 0 ) {
    var crcLiCount = 0;
    var blogId = $(".refresh-live-blog").data('live-blog-id');                
    var pageId = parseInt($(".refresh-live-blog").data('live-blog-page')) ;
    var highlights_blog_id = $(".refresh-highlight-blog").data('highlights-blog-id');

    if(blogId != undefined) {                    
        //Refresh the div after fourty seconds.                    
        setInterval(function () {
            var firstliId = $("div.refresh-live-blog div.timeline-content:first")[0].getAttribute("data-id");                
            var firstElement = $("div.refresh-live-blog div.timeline-content:first");
            var firtstlitime = firstliId.split('-');
            var post_title = $('#post_title').val();
            var post_url = $('#post_url').val();
            var liveBlogKey = $('.live-blog').data("live-blog-id");                        
            var liveBlog = "";
            var highlights = "";
            var keyClass = "";

                if($('#togBtn').val() == '1') {
                    var live_blog_url = 'https://liveblogapi.nw18.com/follow/web/getLiveBlogJson.php?tag='+liveBlogKey+'&p=fp&page=1&time=&d=&count=100';
                    $.ajax({
                        //url: '/service/getLiveBlog?tag='+liveBlogKey+'&p=fp&page=1&time='+firtstlitime[2]+'&d=&count=100&jsonp_callback1=callbackjson_normal'
                         url : live_blog_url,
                         type:'GET',
                         dataType: 'json',
                         jsonpCallback: false,
                         complete:function(results) {                                                                        
                        //var results = $.parseJSON(results);
                        var results = results.responseText.replace('callbackjson_normal(','');
                        results = results.replace('(','');
                        results = results.substring(0, results.length - 1);  // code added for removing last ) bracket
                        results = JSON.parse(results);
                        
                        for (var key in results['data']) {
                            // console.log(firtstlitime);
                            var dateRaw = results['data'][key]['time'];
                            // console.log(dateRaw+"-> "+firtstlitime[2]); 
                            if(firtstlitime[2] >= dateRaw)
                            {                                           
                                break;
                            }                                
                            var time = dateRaw.substr(dateRaw.length-6, 4);
                            keyClass = '';
                           if(results['data'][key]['author_name'] != undefined) {
                                if( (results['data'][key]['kf'] == 'kf') && ( results['data'][key]['author_name'].length > 1) ) keyClass = 'keyRow';    
                            }
                            liveBlog += '<div class="timeline-content big-thumb" data-id="live-blog-'+dateRaw+'">';

                            if(results['data'][key]['author_name'] == "" ||  results['data'][key]['author_name'] == null || results['data'][key]['author_name'] == 'null' || results['data'][key]['author_name'] == undefined ){                                            
                                liveBlog += '<span class="time">' +time.substr(0,2)+':' +time.substr(2,2)+' (IST)</span></span>';
                            } else {
                                liveBlog += '<div class="clearfix">';
                                liveBlog += '<div class="profile-pic">';
                                if(results['data'][key]['author_image'] == "" ||  results['data'][key]['author_image'] == null){
                                    //liveBlog += '<div class="img-wrap"><a href="#"><img src="//placehold.it/80x80" /></a></div>';
                                } else {
                                    //liveBlog += '<div class="img-wrap"><a href="#"><img src="'+results['data'][key]['author_image']+'" /></a></div>';
                                }
                                liveBlog += '<div class="">';
                                liveBlog += '<div class="profile-name"><a href="#">'+results['data'][key]['author_name']+'</a></div>';
                                liveBlog += '<p class="date-time">' +time.substr(0,2)+':' +time.substr(2,2)+' <span>(IST)</span></p>';
                                liveBlog += '</div>';
                                liveBlog += '</div>';
                                liveBlog += '</div>';
                            }                                    
                        /*FIFA BLOG STARTS HERE*/
                        if (results['data'][key]['post']['img'] != undefined) {
                            liveBlog += "<div>"
                            /*Events Start Here*/
                            if (results['data'][key]['post']['img'] == "red_flag") {
                                liveBlog += '<span class="fifa-live-wrapper"><img class="fifa-icon" src="https://images.firstpost.com/wp-content/uploads/fifa-2018/red_card.png"><p class="fifa-live-event-name">RED CARD !</p></span>';
                            };
                            if (results['data'][key]['post']['img'] == "yellow_flag") {
                                liveBlog += '<span class="fifa-live-wrapper"><img class="fifa-icon" src="https://images.firstpost.com/wp-content/uploads/fifa-2018/yellow_card.png"><p class="fifa-live-event-name">YELLOW CARD !</p></span>';
                            };
                            if (results['data'][key]['post']['img'] == "penalty") {
                                liveBlog += '<span class="fifa-live-wrapper"><img class="fifa-icon" src="https://images.firstpost.com/wp-content/uploads/fifa-2018/penalty.png"><p class="fifa-live-event-name">PENALTY !</p></span>';
                            };
                            if (results['data'][key]['post']['img'] == "goal") {
                                liveBlog += '<span class="fifa-live-wrapper"><img class="fifa-icon" src="https://images.firstpost.com/wp-content/uploads/fifa-2018/goal.png"><p class="fifa-live-event-name">GOAL !</p></span>';
                            };
                            /*Events End Here*/
                            liveBlog += "</div>"
                        };
                        /*FIFA BLOG ENDS HERE*/
                        
                            /* CWG block start */
                         // if(blogId == 'cwg_2018_day_1_5ac4fa0d013bf'){
                             var sportsName = results['data'][key]['post']['sports_name'];
                         // if(blogId == 'commonwealth_games_main_5ac549f5115ac'){
                         if(sportsName != undefined){
                             sportsName = sportsName.toLowerCase();
                             sportsName = sportsName.replace(" ", "");
                             sportsName = sportsName.replace("-", "");
                             liveBlog += '<div class="cwg-liveblogs-sport">';
                             if (sportsName != ''){    
                             liveBlog += '<span class="cwg-lb0-lhs"><img src="https://images.firstpost.com/wp-content/uploads/cwg/'+sportsName+'.png?v=2">'+results['data'][key]['post']['sports_name'].toUpperCase();
                             if (results['data'][key]['post']['sports_medal'] != undefined && results['data'][key]['post']['sports_medal'] == "gold"){
                             liveBlog += '<img src="https://images.firstpost.com/wp-content/uploads/cwg/medals-gold.png" style="width: 36px;height: 36px;padding: 0;margin-left:5px" >';}
                             else if (results['data'][key]['post']['sports_medal'] != undefined && results['data'][key]['post']['sports_medal'] == "silver"){
                             liveBlog += '<img src="https://images.firstpost.com/wp-content/uploads/cwg/medals-silver.png" style="width: 36px;height: 36px;padding: 0;margin-left:5px">';}
                             else if (results['data'][key]['post']['sports_medal'] != undefined && results['data'][key]['post']['sports_medal'] == "bronze"){liveBlog += '<img src="https://images.firstpost.com/wp-content/uploads/cwg/medals-bronze.png" style="width: 36px;height: 36px;padding: 0;margin-left:5px">';}                                         liveBlog += '</span>';
                             
                             }
                             liveBlog += '<span class="cwg-lb0-rhs">';
                             
                             
                             if(results['data'][key]['post']['img'] != undefined && results['data'][key]['post']['img'] == "india"){
                             liveBlog += '<img src="https://images.firstpost.com/wp-content/uploads/cwg/ind-flage.png" class="ind-fl"></span>';
                         }
                         liveBlog += '</div>';
                             }
                         /* CWG block end */
                            if(results['data'][key]['post']['img'] == 'wkt'){
                            liveBlog += '<img src="https://images.firstpost.com/wp-content/uploads/liveblog-small-wicket.png" />';
                            } else if(results['data'][key]['post']['img'] == 'six'){
                                liveBlog += '<img src="https://images.firstpost.com/wp-content/uploads/liveblog-small-six.png" />';
                            } else if(results['data'][key]['post']['img'] == 'four'){
                                liveBlog += '<img src="https://images.firstpost.com/wp-content/uploads/liveblog-small-four.png" />';
                            }
                           
                            if(results['data'][key]['post']['url'] === null || results['data'][key]['post']['url'] == "") {
                                liveBlog += results['data'][key]['post']['title'];
                            } else {
                                liveBlog += '<a href="'+results['data'][key]['post']['url']+'">' +results['data'][key]['post']['title'] +'</a>';
                                
                            }
                            
                            if(results['data'][key]['post']['image_path'].length > 1){

                                liveBlog += '<div class="live-blog-image">';
                                liveBlog += '<div class="img-wrap"><img src="'+results['data'][key]['post']['image_path']+'" /></div>';
                                if(results['data'][key]['post']['content'].length > 1){
                                    liveBlog += '<p>'+results['data'][key]['post']['content']+'</p>';
                                }
                                liveBlog += '</div>';
                            }
                            
                            if( results['data'][key]['post']['data_type'] == 'new_embedded' &&  (results['data'][key]['post']['source'].indexOf('embed') >= 0)  ){
                                
                                liveBlog += '<p class="blog-source"><div class="embed-responsive embed-responsive-16by9"><iframe class="embed-responsive-item" src="'+results['data'][key]['post']['source']+'"></iframe></div></p>';

                            } else if(results['data'][key]['post']['source'] != "" && results['data'][key]['post']['source'] != null  && results['data'][key]['post']['source'] != 'null' )  {
                                
                                liveBlog += '<p class="blog-source">' + results['data'][key]['post']['source'] + '</p>';
                            }

                            liveBlog += socialshare;
                            
                            liveBlog += '</div>';
                            crcLiCount ++;
                        }
                        if(crcLiCount > 0)
                        {   
                            $(".blogClass").remove();
                            var tophtml ="<a href='#blogDivScroll' class='blogClass'>"+crcLiCount+" new updates <svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' id='Capa_1' x='0px' y='0px' width='16px' height='16px' viewBox='0 0 268.831 268.832' style='enable-background:new 0 0 268.831 268.832;' xml:space='preserve'><g><path d='M223.255,83.659l-80-79.998c-4.881-4.881-12.797-4.881-17.678,0l-80,80c-4.883,4.882-4.883,12.796,0,17.678   c2.439,2.44,5.64,3.661,8.839,3.661s6.397-1.221,8.839-3.661l58.661-58.661v213.654c0,6.903,5.597,12.5,12.5,12.5   c6.901,0,12.5-5.597,12.5-12.5V42.677l58.661,58.659c4.883,4.881,12.797,4.881,17.678,0   C228.137,96.455,228.137,88.541,223.255,83.659z' fill='#FFFFFF'/></g></svg></a>";
                            $(".timeline").prepend(tophtml);
                            var visible = isLiElementInViewport(firstElement[0]);                                    
                            if (visible == true) {
                                crcLiCount = 0;
                                $(".blogClass").addClass('blogClickClass');
                            } 
                        }
                        
                        $(window).scroll(function () { 
                        var visible = isLiElementInViewport(firstElement[0]);                                
                        if (visible == true) {
                        crcLiCount = 0;
                        $(".blogClass").addClass('blogClickClass');
                        }                                
                        });
                        //console.log(liveBlog);
                        $(".refresh-live-blog").prepend(liveBlog);
                        /*$(".refresh-live-blog").html(liveBlog);*/

                        for (var hkey in results['kf']) {

                            var hdateRaw = results['kf'][hkey]['date'];
                            var htime = hdateRaw.substr(hdateRaw.length-6, 4);

                            highlights += '<div class="indicatorDivs">';
                            highlights += '<a href="#live-blog-'+hdateRaw+'" class="clearfix">';
                            highlights += '<div class="time"><strong>' +htime.substr(0,2)+':' +htime.substr(2,2)+' </strong> (IST)</div>'+results['kf'][hkey]['title'];
                            highlights += '</a></div>';
                        }
                        
                        $(".refresh-highlight-blog").html(highlights);
                        
                        $(".blogClass").on("click", function(){
                            crcLiCount = 0;
                            $(".blogClass").addClass('blogClickClass');        
                            var target = $(this.hash);
                            target = target.length ? target : $('[name=' + this.hash.substr(1) +']');                                
                            if (target.length) {
                                $('html,body').animate({
                                  scrollTop: target.offset().top-100
                                }, 1000);
                                $(".blogClass").remove();
                                return false;                                    
                            }        
                        });
                    }
                    });     
                }

           
        }, 15000);
    }
}

$("#live-blog-update").on("click", function () {
    //alert("Oye");
    $("#live-blog-update").text("Please Wait..");
    var blogId = $(".refresh-live-blog").data('live-blog-id');
    var pageId = (parseInt($(".refresh-live-blog").data('live-blog-page')) + 1) ;
    var post_title = $('#post_title').val();
    var post_url = $('#post_url').val();
    var count = pageId*50;
    var liveBlog = "";
    var highlights = "";
    
    var live_blog_url = 'https://liveblogapi.nw18.com/follow/web/getLiveBlogJson.php?tag='+blogId+'&p=fp&page='+pageId+'&time=&d=&count='+count;
    $.ajax({
        //url: '/live-blog/'+blogId+'/'+pageId
        url : live_blog_url,
        type:'GET',
        dataType: 'json',
        jsonpCallback: false,
        complete:function(results) {
        //var results = JSON.parse(results);
        
        var results = results.responseText.replace('callbackjson_normal(','');
        results = results.replace('(','');
        results = results.substring(0, results.length - 1);  // code added for removing last ) bracket
        
        results = JSON.parse(results);
        //console.log(results+" hiii 444333");
        for (var key in results['data']) {
                
            var dateRaw = results['data'][key]['time'];
            var time = dateRaw.substr(dateRaw.length-6, 4);

            keyClass = '';
                
                if(results['data'][key]['author_name'] != undefined) {
                    if( (results['data'][key]['kf'] == 'kf') && ( results['data'][key]['author_name'].length > 1) ) keyClass = 'keyRow';    
                }
                
                
                            liveBlog += '<div class="timeline-content big-thumb" data-id="live-blog-'+dateRaw+'">';
                
                if(results['data'][key]['author_name'] == "" ||  results['data'][key]['author_name'] == null || results['data'][key]['author_name'] == 'null' || results['data'][key]['author_name'] == undefined){
                    
                                liveBlog += '<span class="time">' +time.substr(0,2)+':' +time.substr(2,2)+' (IST)</span></span>';
                } else {
                    liveBlog += '<div class="clearfix">';
                    liveBlog += '<div class="profile-pic">';
                    if(results['data'][key]['author_image'] == "" ||  results['data'][key]['author_image'] == null){
                        //liveBlog += '<div class="img-wrap"><a href="#"><img src="//placehold.it/80x80" /></a></div>';
                    } else {
                        //liveBlog += '<div class="img-wrap"><a href="#"><img src="'+results['data'][key]['author_image']+'" /></a></div>';
                    }
                    liveBlog += '<div class="">';
                    liveBlog += '<div class="profile-name"><a href="#">'+results['data'][key]['author_name']+'</a></div>';
                    liveBlog += '<p class="date-time">' +time.substr(0,2)+':' +time.substr(2,2)+' <span>(IST)</span></p>';
                    liveBlog += '</div>';
                    liveBlog += '</div>';
                    liveBlog += '</div>';
                }

                if(results['data'][key]['post']['img'] == 'wkt'){
                    liveBlog += '<img src="https://images.firstpost.com/wp-content/uploads/liveblog-small-wicket.png" />';
                    } else if(results['data'][key]['post']['img'] == 'six'){
                        liveBlog += '<img src="https://images.firstpost.com/wp-content/uploads/liveblog-small-six.png" />';
                    } else if(results['data'][key]['post']['img'] == 'four'){
                        liveBlog += '<img src="https://images.firstpost.com/wp-content/uploads/liveblog-small-four.png" />';
                    }
                
                if(results['data'][key]['post']['url'] === null || results['data'][key]['post']['url'] == "") {
                    liveBlog += results['data'][key]['post']['title'];
                } else {
                    liveBlog += '<a href="'+results['data'][key]['post']['url']+'">' +results['data'][key]['post']['title'] +'</a>';
                    
                }
                if(results['data'][key]['post']['image_path'].length > 1){

                    liveBlog += '<div class="live-blog-image">';
                    liveBlog += '<div class="img-wrap"><img src="'+results['data'][key]['post']['image_path']+'" /></div>';
                    if(results['data'][key]['post']['content'].length > 1){
                        liveBlog += '<p>'+results['data'][key]['post']['content']+'</p>';
                    }
                    liveBlog += '</div>';
                }
                
                if( results['data'][key]['post']['data_type'] == 'new_embedded' &&  (results['data'][key]['post']['source'].indexOf('embed') >= 0)  ){
                    
                    liveBlog += '<p class="blog-source"><div class="embed-responsive embed-responsive-16by9"><iframe class="embed-responsive-item" src="'+results['data'][key]['post']['source']+'"></iframe></div></p>';

                } else if(results['data'][key]['post']['source'] != "" && results['data'][key]['post']['source'] != null  && results['data'][key]['post']['source'] != 'null' )  {
                    
                    liveBlog += '<p class="blog-source">' + results['data'][key]['post']['source'] + '</p>';
                }

                //liveBlog += '<p>';
                liveBlog += socialshare;
                            
                            liveBlog += '</div>';

        }

        $(".refresh-live-blog").html(liveBlog);

        for (var hkey in results['kf']) {

            var hdateRaw = results['kf'][hkey]['date'];
            var htime = hdateRaw.substr(hdateRaw.length-6, 4);

            highlights += '<div class="indicatorDivs">';
                            highlights += '<a href="#live-blog-'+hdateRaw+'" class="clearfix">';
                            highlights += '<div class="time"><strong>' +htime.substr(0,2)+':' +htime.substr(2,2)+' </strong> (IST)</div>'+results['kf'][hkey]['title'];
                            highlights += '</a></div>';
        }

        $(".refresh-highlight-blog").html(highlights);

        $(".refresh-live-blog").data('live-blog-page', pageId);
        $("#live-blog-update").text("Load More");
        // $(".btn-panel").hide();
    }
    });       

});
});
function isLiElementInViewport (el) {                                
var rect = el.getBoundingClientRect();      
return (rect.top >= 0 && rect.left >= 0 && rect.bottom >= 0 && rect.right <= $(window).width());
}
