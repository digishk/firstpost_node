$(document).ready(function(){
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
                            console.log(dateRaw+"-> "+firtstlitime[2]); 
                            /*if(firtstlitime[2] >= dateRaw)
                            {                                           
                                break;
                            }  */                              
                            var time = dateRaw.substr(dateRaw.length-6, 4);
                            keyClass = '';
                           if(results['data'][key]['author_name'] != undefined) {
                                if( (results['data'][key]['kf'] == 'kf') && ( results['data'][key]['author_name'].length > 1) ) keyClass = 'keyRow';    
                            }
                            liveBlog += '<div data-id="live-blog-'+dateRaw+'" class="'+keyClass+'">';

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

                            liveBlog += '<p>';
                            liveBlog += '<div class="social-sharing clearfix"> ';

                            liveBlog += '<a title="'+post_title+'" href="javascript:;" data-url="'+post_url+'" data-title="'+post_title+'" data-sitename="facebook" class="shareicon"><svg class="grey-fill" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 155.139 155.139" style="enable-background:new 0 0 155.139 155.139;" xml:space="preserve"><g><path id="f_1_" style="fill:#666;" d="M89.584,155.139V84.378h23.742l3.562-27.585H89.584V39.184c0-7.984,2.208-13.425,13.67-13.425l14.595-0.006V1.08C115.325,0.752,106.661,0,96.577,0C75.52,0,61.104,12.853,61.104,36.452v20.341H37.29v27.585h23.814v70.761H89.584z"/></g></svg></a>';
                            liveBlog += '<a title="'+post_title+'" href="javascript:;" data-url="'+post_url+'" data-title="'+post_title+'" data-sitename="twitter" class="shareicon"><svg class="grey-fill"  version="1.1"  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 612 612" style="enable-background:new 0 0 612 612;" xml:space="preserve"><g><path style="fill:#666;" d="M612,116.258c-22.525,9.981-46.694,16.75-72.088,19.772c25.929-15.527,45.777-40.155,55.184-69.411c-24.322,14.379-51.169,24.82-79.775,30.48c-22.907-24.437-55.49-39.658-91.63-39.658c-69.334,0-125.551,56.217-125.551,125.513c0,9.828,1.109,19.427,3.251,28.606C197.065,206.32,104.556,156.337,42.641,80.386c-10.823,18.51-16.98,40.078-16.98,63.101c0,43.559,22.181,81.993,55.835,104.479c-20.575-0.688-39.926-6.348-56.867-15.756v1.568c0,60.806,43.291,111.554,100.693,123.104c-10.517,2.83-21.607,4.398-33.08,4.398c-8.107,0-15.947-0.803-23.634-2.333c15.985,49.907,62.336,86.199,117.253,87.194c-42.947,33.654-97.099,53.655-155.916,53.655c-10.134,0-20.116-0.612-29.944-1.721c55.567,35.681,121.536,56.485,192.438,56.485c230.948,0,357.188-191.291,357.188-357.188l-0.421-16.253C573.872,163.526,595.211,141.422,612,116.258z"/></g></svg></a>';

                            liveBlog += '<a title="'+post_title+'" href="javascript:;" data-url="'+post_url+'" data-title="'+post_title+'" data-sitename="google" class="shareicon"><svg class="grey-fill" fill="#666" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px"><path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032 s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2 C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/></svg></a>';

                            liveBlog += '</div></p></div>';
                            crcLiCount ++;
                        }
                        if(crcLiCount > 0)
                        {   
                            $(".blogClass").remove();
                            var tophtml ="<a href='#blogDivScroll' class='blogClass'>"+crcLiCount+" new updates <svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' id='Capa_1' x='0px' y='0px' width='16px' height='16px' viewBox='0 0 268.831 268.832' style='enable-background:new 0 0 268.831 268.832;' xml:space='preserve'><g><path d='M223.255,83.659l-80-79.998c-4.881-4.881-12.797-4.881-17.678,0l-80,80c-4.883,4.882-4.883,12.796,0,17.678   c2.439,2.44,5.64,3.661,8.839,3.661s6.397-1.221,8.839-3.661l58.661-58.661v213.654c0,6.903,5.597,12.5,12.5,12.5   c6.901,0,12.5-5.597,12.5-12.5V42.677l58.661,58.659c4.883,4.881,12.797,4.881,17.678,0   C228.137,96.455,228.137,88.541,223.255,83.659z' fill='#FFFFFF'/></g></svg></a>";
                            $(".right-content").prepend(tophtml);
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

                            highlights += '<li>';
                            highlights += '<a href="#live-blog-'+hdateRaw+'" class="clearfix">';
                            highlights += '<span>' +htime.substr(0,2)+':' +htime.substr(2,2)+' </span> (IST)<br />'+results['kf'][hkey]['title'];
                            highlights += '</a></li>';
                        }
                        
                        $(".refresh-highlight-blog").html(highlights);
                        
                        $(".blogClass").on("click", function(){
                            crcLiCount = 0;
                            $(".blogClass").addClass('blogClickClass');        
                            var target = $(this.hash);
                            target = target.length ? target : $('[name=' + this.hash.substr(1) +']');                                
                            if (target.length) {
                                $('html,body').animate({
                                  scrollTop: target.offset().top
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
                
                
                liveBlog += '<div data-id="live-blog-'+dateRaw+'" class="'+keyClass+'">';
                
                if(results['data'][key]['author_name'] == "" ||  results['data'][key]['author_name'] == null || results['data'][key]['author_name'] == 'null' || results['data'][key]['author_name'] == undefined){
                    
                    liveBlog += '<p class="date-time">' +time.substr(0,2)+':' +time.substr(2,2)+' <span>(IST)</span></p>';
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
                liveBlog += '<div class="social-sharing clearfix"> ';
                liveBlog += '<a title="'+post_title+'" href="javascript:void(0);" data-url="'+post_url+'" data-title="'+post_title+'" data-sitename="facebook" class="shareicon"><svg class="black-fill" width="17px" height="17px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 155.139 155.139" style="enable-background:new 0 0 155.139 155.139;" xml:space="preserve"><g><path id="f_1_" class="" d="M89.584,155.139V84.378h23.742l3.562-27.585H89.584V39.184 c0-7.984,2.208-13.425,13.67-13.425l14.595-0.006V1.08C115.325,0.752,106.661,0,96.577,0C75.52,0,61.104,12.853,61.104,36.452 v20.341H37.29v27.585h23.814v70.761H89.584z"/></g></svg></a>';
                
                liveBlog += '<a title="'+post_title+'" href="javascript:void(0);" data-url="'+post_url+'" data-title="'+post_title+'" data-sitename="twitter" class="shareicon"><svg class="black-fill"  width="17px" height="17px" version="1.1"  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 612 612" style="enable-background:new 0 0 612 612;" xml:space="preserve"><g><path class="" d="M612,116.258c-22.525,9.981-46.694,16.75-72.088,19.772c25.929-15.527,45.777-40.155,55.184-69.411 c-24.322,14.379-51.169,24.82-79.775,30.48c-22.907-24.437-55.49-39.658-91.63-39.658c-69.334,0-125.551,56.217-125.551,125.513 c0,9.828,1.109,19.427,3.251,28.606C197.065,206.32,104.556,156.337,42.641,80.386c-10.823,18.51-16.98,40.078-16.98,63.101 c0,43.559,22.181,81.993,55.835,104.479c-20.575-0.688-39.926-6.348-56.867-15.756v1.568c0,60.806,43.291,111.554,100.693,123.104 c-10.517,2.83-21.607,4.398-33.08,4.398c-8.107,0-15.947-0.803-23.634-2.333c15.985,49.907,62.336,86.199,117.253,87.194 c-42.947,33.654-97.099,53.655-155.916,53.655c-10.134,0-20.116-0.612-29.944-1.721c55.567,35.681,121.536,56.485,192.438,56.485 c230.948,0,357.188-191.291,357.188-357.188l-0.421-16.253C573.872,163.526,595.211,141.422,612,116.258z"/></g></svg></a>';

                liveBlog += '<a title="'+post_title+'" href="javascript:void(0);" data-url="post_url" data-title="'+post_title+'" class="shareicon" data-sitename="whatsapp"><svg version="1.1" class="black-fill" width="17px" height="17px" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24px" height="24px" viewBox="0 0 90 90" style="enable-background:new 0 0 90 90;" xml:space="preserve"><g><path class="" id="WhatsApp" d="M90,43.841c0,24.213-19.779,43.841-44.182,43.841c-7.747,0-15.025-1.98-21.357-5.455L0,90l7.975-23.522 c-4.023-6.606-6.34-14.354-6.34-22.637C1.635,19.628,21.416,0,45.818,0C70.223,0,90,19.628,90,43.841z M45.818,6.982 c-20.484,0-37.146,16.535-37.146,36.859c0,8.065,2.629,15.534,7.076,21.61L11.107,79.14l14.275-4.537 c5.865,3.851,12.891,6.097,20.437,6.097c20.481,0,37.146-16.533,37.146-36.857S66.301,6.982,45.818,6.982z M68.129,53.938 c-0.273-0.447-0.994-0.717-2.076-1.254c-1.084-0.537-6.41-3.138-7.4-3.495c-0.993-0.358-1.717-0.538-2.438,0.537 c-0.721,1.076-2.797,3.495-3.43,4.212c-0.632,0.719-1.263,0.809-2.347,0.271c-1.082-0.537-4.571-1.673-8.708-5.333 c-3.219-2.848-5.393-6.364-6.025-7.441c-0.631-1.075-0.066-1.656,0.475-2.191c0.488-0.482,1.084-1.255,1.625-1.882 c0.543-0.628,0.723-1.075,1.082-1.793c0.363-0.717,0.182-1.344-0.09-1.883c-0.27-0.537-2.438-5.825-3.34-7.977 c-0.902-2.15-1.803-1.792-2.436-1.792c-0.631,0-1.354-0.09-2.076-0.09c-0.722,0-1.896,0.269-2.889,1.344 c-0.992,1.076-3.789,3.676-3.789,8.963c0,5.288,3.879,10.397,4.422,11.113c0.541,0.716,7.49,11.92,18.5,16.223 C58.2,65.771,58.2,64.336,60.186,64.156c1.984-0.179,6.406-2.599,7.312-5.107C68.398,56.537,68.398,54.386,68.129,53.938z"/></g></svg></a>';

                liveBlog += '</div></div>';

        }

        $(".refresh-live-blog").html(liveBlog);

        for (var hkey in results['kf']) {

            var hdateRaw = results['kf'][hkey]['date'];
            var htime = hdateRaw.substr(hdateRaw.length-6, 4);

            highlights += '<div>';
            highlights += '<a href="#live-blog-'+hdateRaw+'" class="clearfix">';
            highlights += '<span>' +htime.substr(0,2)+':' +htime.substr(2,2)+' </span> (IST)<br />'+results['kf'][hkey]['title'];
            highlights += '</a></div>';
        }

        $(".refresh-highlight-blog").html(highlights);

        $(".refresh-live-blog").data('live-blog-page', pageId);
        $(".btn-panel").hide();
    }
    });    

});
});
function isLiElementInViewport (el) {                                
var rect = el.getBoundingClientRect();                                            
return (rect.top >= 0 && rect.left >= 0 && rect.bottom >= 0 && rect.right <= $(window).width());
}