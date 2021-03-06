$(document).ready(function(){
    var post_title = $('#post_title').val();
    var post_url = $('#post_url').val();
    var commUrl = $('#commUrl').val();
    var fullUrl = $('#fullUrl').val();

    var socialshare = '<div class="thumb-social-wrap">';
    socialshare += '<ul class="thumb-social">';
    socialshare += '<li class="thumb-list">';
    socialshare += '<a href="javascript:void(0);" class="fb sc-icon shareicon" title="'+post_title+'"  data-url="'+post_url+'" data-title="'+post_title+'" data-sitename="facebook">';
    socialshare += '<svg id="" data-name="Layer 1" viewBox="0 0 24 24"><defs></defs><g id="Group_7" data-name="Group 7"><g id="Ellipse_32" data-name="Ellipse 32"><circle style="fill:#fff;" cx="12" cy="12" r="12"/><circle style="fill:none;stroke:#585858;" cx="12" cy="12" r="11.5"/></g><path id="Icon_feather-facebook" data-name="Icon feather-facebook" style="fill:none;stroke:#585858;stroke-linecap:round;stroke-linejoin:round;" d="M231.92,362.94h-2.27a3.79,3.79,0,0,0-3.79,3.79V369h-2.28v3h2.28v6.06h3V372h2.27l.76-3h-3v-2.27a.76.76,0,0,1,.76-.76h2.27Z" transform="translate(-215.48 -358.52)"/></g></svg>';
    socialshare += '</a>';
    socialshare += '</li>';
    socialshare += '<li class="thumb-list">';
    socialshare += '<a href="javascript:void(0);" class="tw sc-icon shareicon" title="'+post_title+'"  data-url="'+post_url+'" data-title="'+post_title+'" data-sitename="twitter">';
    socialshare += '<svg id="" data-name="Layer 1" viewBox="0 0 24 24"><defs></defs><g id="Group_2" data-name="Group 2"><g id="Ellipse_31" data-name="Ellipse 31"><circle style="fill:#fff;" cx="12" cy="12" r="12"/><circle style="fill:none;stroke:#585858;" cx="12" cy="12" r="11.5"/></g><path id="Icon_feather-twitter" data-name="Icon feather-twitter" style="fill:none;stroke:#585858;stroke-linecap:round;stroke-linejoin:round;" d="M234.56,364.21a7,7,0,0,1-2,1,2.93,2.93,0,0,0-5.13,2v.65a7,7,0,0,1-5.87-3s-2.6,5.87,3.26,8.48a7.54,7.54,0,0,1-4.56,1.3c5.87,3.26,13,0,13-7.5a3.29,3.29,0,0,0,0-.54A5.06,5.06,0,0,0,234.56,364.21Z" transform="translate(-215.48 -358.52)"/></g></svg>';
    socialshare += '</a>';
    socialshare += '</li>';
    socialshare += '<li class="thumb-list">';
    socialshare += '<a href="javascript:void(0);" class="wa sc-icon shareicon" title="'+post_title+'"  data-url="'+post_url+'" data-title="'+post_title+'" data-sitename="whatsapp">';
    socialshare += '<svg id="" data-name="Layer 1" viewBox="0 0 24 24"><g id="Group_5" data-name="Group 5"><g id="Ellipse_36" data-name="Ellipse 36"><circle style="fill:#fff;" cx="12" cy="12" r="12"/><circle style="fill:none;stroke:#585858;" cx="12" cy="12" r="11.5"/></g><path id="Icon_awesome-whatsapp" data-name="Icon awesome-whatsapp" style="fill:#585858;" d="M233.1,365.51a6.77,6.77,0,0,0-10.66,8.17l-1,3.51,3.59-.95a6.68,6.68,0,0,0,3.24.83h0a6.83,6.83,0,0,0,6.83-6.77A6.75,6.75,0,0,0,233.1,365.51Zm-4.79,10.42a5.59,5.59,0,0,1-2.87-.79l-.2-.12-2.13.56.57-2.08-.13-.21a5.64,5.64,0,1,1,9.64-5.86,5.79,5.79,0,0,1,.82,2.87A5.7,5.7,0,0,1,228.31,375.93Zm3.09-4.22c-.17-.08-1-.49-1.16-.55s-.27-.08-.38.09a8,8,0,0,1-.54.66c-.1.12-.2.13-.36,0a4.54,4.54,0,0,1-2.3-2c-.18-.3.17-.28.5-.92a.32.32,0,0,0,0-.3l-.52-1.26c-.14-.34-.28-.28-.38-.29h-.33a.6.6,0,0,0-.45.21,1.89,1.89,0,0,0-.59,1.41,3.27,3.27,0,0,0,.68,1.75,7.61,7.61,0,0,0,2.9,2.56,3.33,3.33,0,0,0,2,.42,1.71,1.71,0,0,0,1.14-.8,1.4,1.4,0,0,0,.1-.81C231.68,371.84,231.57,371.79,231.4,371.71Z" transform="translate(-215.48 -358.52)"/></g></svg>';
    socialshare += '</a>';
    socialshare += '</li>';
    socialshare += '<li class="thumb-list">';
    socialshare += '<a href="javascript:void(0);" class="ln sc-icon shareicon" title="'+post_title+'"  data-url="'+post_url+'" data-title="'+post_title+'" data-sitename="linkedin">';
    socialshare += '<svg id="" data-name="Layer 1" viewBox="0 0 24 24"><defs></defs><g id="Group_3" data-name="Group 3"><g id="Ellipse_34" data-name="Ellipse 34"><circle style="fill:#fff;" cx="12" cy="12" r="12"/><circle style="fill:none;stroke:#585858;" cx="12" cy="12" r="11.5"/></g><g id="Icon_feather-linkedin" data-name="Icon feather-linkedin"><path id="Path_1352" data-name="Path 1352" style="fill:none;stroke:#585858;stroke-linecap:round;stroke-linejoin:round;" d="M230.85,367.36a3.79,3.79,0,0,1,3.79,3.79v4.42h-2.53v-4.42a1.26,1.26,0,0,0-2.52,0v4.42h-2.53v-4.42A3.79,3.79,0,0,1,230.85,367.36Z" transform="translate(-215.48 -358.52)"/><path id="Path_1353" data-name="Path 1353" style="fill:none;stroke:#585858;stroke-linecap:round;stroke-linejoin:round;" d="M222,368h2.52v7.58H222Z" transform="translate(-215.48 -358.52)"/><path id="Path_1354" data-name="Path 1354" style="fill:none;stroke:#585858;stroke-linecap:round;stroke-linejoin:round;" d="M224.53,364.84a1.26,1.26,0,1,1-1.26-1.27h0A1.26,1.26,0,0,1,224.53,364.84Z" transform="translate(-215.48 -358.52)"/></g></g></svg>';
    socialshare += '</a>';
    socialshare += '</li>';
    socialshare += '</ul>';
    socialshare += '<div class="button-social" onclick="socialShare(this)">';
    socialshare += '<svg enable-background="new 0 0 58.999 58.999" version="1.1" viewBox="0 0 58.999 58.999" xml:space="preserve"><path d="m19.479 12.019c0.256 0 0.512-0.098 0.707-0.293l8.313-8.313v35.586c0 0.553 0.447 1 1 1s1-0.447 1-1v-35.586l8.272 8.272c0.391 0.391 1.023 0.391 1.414 0s0.391-1.023 0-1.414l-9.978-9.978c-0.092-0.093-0.203-0.166-0.327-0.217-0.244-0.101-0.519-0.101-0.764 0-0.123 0.051-0.234 0.125-0.326 0.217l-10.018 10.019c-0.391 0.391-0.391 1.023 0 1.414 0.195 0.196 0.451 0.293 0.707 0.293z"/><path d="m36.499 15.999c-0.553 0-1 0.447-1 1s0.447 1 1 1h13v39h-40v-39h13c0.553 0 1-0.447 1-1s-0.447-1-1-1h-15v43h44v-43h-15z"/></svg>';
    socialshare += '</div>';
    socialshare += '</div>';

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
                            liveBlog += '<div class="blog-entry-wrap timeline-content" data-id="live-blog-'+dateRaw+'">';

                            liveBlog += '<div class="blog-inner-wrap">';
                            liveBlog += '<div class="h-timestamp"><h6 class="time-txt">' +time.substr(0,2)+':' +time.substr(2,2)+' (IST)</span></h6></div>';
                            liveBlog += '<div class="blog-txt">';
                        
                            if(typeof results['data'][key]['post']['img'] !== "undefined" && results['data'][key]['post']['img'] != ""){
                                liveBlog += '<div class="blog-img"><img src="https://images.firstpost.com/wp-content/uploads/firstcricket/milestones/2020/'+results['data'][key]['post']['img']+'.png" /></div>';
                            }
                            liveBlog += '<div class="blog-txt-wrap">'+results['data'][key]['post']['title']+'</div></div>';

                            if(results['data'][key]['post']['data_type'] == 'new_embedded' &&  (results['data'][key]['post']['source'].indexOf('embed') >= 0)  ){
                                
                                liveBlog += '<p class="blog-source"><div class="embed-responsive embed-responsive-16by9"><iframe class="embed-responsive-item" src="'+results['data'][key]['post']['source']+'"></iframe></div></p>';

                            } else if(results['data'][key]['post']['source'] != "" && results['data'][key]['post']['source'] != null  && results['data'][key]['post']['source'] != 'null' )  {
                                
                                liveBlog += '<p class="blog-source">' + results['data'][key]['post']['source'] + '</p>';
                            }
                            liveBlog += '<div class="blog-author-div">';
                            if(results['data'][key]['author_image'] != null){
                                liveBlog += '<div class="blog-auth-img"><img src="'+results['data'][key]['author_image']+'" /></div>';
                            }
                            liveBlog += '<div class="blog-auth-details">';
                            if(results['data'][key]['author_name'] != ""){
                                liveBlog += '<h4 class="auth-blog-name">' + results['data'][key]['author_name'] + '</h4>';     
                            }
                            liveBlog += '</div>';
                            liveBlog += '</div>';
                            liveBlog += '<div class="blog-btn-div">';
                            liveBlog += '<div class="full-score-btn">';
                            liveBlog += '<a href="'+fullUrl+'" title="Full Scorecard">';
                            liveBlog += 'Full Scorecard';
                            liveBlog += '</a>';
                            liveBlog += '</div>';
                            liveBlog += '<div class="blog-share"><div class="share-wrap">';
                            liveBlog += socialshare;
                            liveBlog += '</div>';
                            liveBlog += '</div>';
                            liveBlog += '</div>';
                            
                            liveBlog += '</div>';
                            liveBlog += '</div>';
                            crcLiCount ++;
                        }
                        if(crcLiCount > 0)
                        {   
                            $(".blogClass").remove();
                            var tophtml ="<a href='#blogDivScroll' class='blogClass'>"+crcLiCount+" new updates <svg version='1.1' id='Capa_1' x='0px' y='0px' width='16px' height='16px' viewBox='0 0 268.831 268.832' style='enable-background:new 0 0 268.831 268.832;' xml:space='preserve'><g><path d='M223.255,83.659l-80-79.998c-4.881-4.881-12.797-4.881-17.678,0l-80,80c-4.883,4.882-4.883,12.796,0,17.678   c2.439,2.44,5.64,3.661,8.839,3.661s6.397-1.221,8.839-3.661l58.661-58.661v213.654c0,6.903,5.597,12.5,12.5,12.5   c6.901,0,12.5-5.597,12.5-12.5V42.677l58.661,58.659c4.883,4.881,12.797,4.881,17.678,0   C228.137,96.455,228.137,88.541,223.255,83.659z' fill='#FFFFFF'/></g></svg></a>";
                            $(".timelineContent").prepend(tophtml);
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

                            highlights += '<div class="highlight-block"><a href="#live-blog-'+hdateRaw+'" class="clearfix">';
                            highlights += '<div class="h-timestamp">';
                            highlights += '<h6 class="time-txt">' +htime.substr(0,2)+':' +htime.substr(2,2)+' <span>(IST)</span></h6><svg height="22" viewBox="0 0 382.04857 382" width="22" fill="#000"><path d="m321.050781 51.128906c-75.28125-69.972656-192.429687-67.832031-265.105469 4.839844-72.675781 72.675781-74.8125 189.824219-4.839843 265.105469zm-223.679687 207.621094-11.523438 11.527344c-2.734375 2.734375-7.167968 2.734375-9.902344 0-2.734374-2.734375-2.734374-7.167969 0-9.902344l11.527344-11.523438c2.734375-2.734374 7.167969-2.734374 9.898438 0 2.734375 2.734376 2.734375 7.164063 0 9.898438zm28.8125-28.8125-11.523438 11.523438c-2.734375 2.734374-7.164062 2.734374-9.898437 0-2.734375-2.734376-2.734375-7.167969 0-9.898438l11.523437-11.527344c2.734375-2.734375 7.167969-2.734375 9.902344 0 2.730469 2.734375 2.730469 7.167969 0 9.902344zm28.8125-28.8125-11.523438 11.527344c-2.734375 2.734375-7.167968 2.734375-9.902344 0-2.730468-2.734375-2.730468-7.167969 0-9.902344l11.527344-11.523438c2.734375-2.734374 7.164063-2.734374 9.898438 0 2.734375 2.734376 2.734375 7.164063 0 9.898438zm28.816406-28.8125-11.527344 11.523438c-2.730468 2.734374-7.164062 2.734374-9.898437 0-2.734375-2.734376-2.734375-7.167969 0-9.902344l11.527343-11.523438c2.734376-2.734375 7.164063-2.734375 9.898438 0s2.734375 7.164063 0 9.898438zm28.8125-28.816406-11.523438 11.527344c-2.734374 2.730468-7.167968 2.730468-9.902343 0-2.730469-2.734376-2.730469-7.167969 0-9.902344l11.527343-11.523438c2.734376-2.734375 7.167969-2.734375 9.898438 0 2.734375 2.734375 2.734375 7.164063 0 9.898438zm28.816406-28.8125-11.527344 11.527344c-2.734374 2.730468-7.164062 2.730468-9.898437 0-2.734375-2.734376-2.734375-7.167969 0-9.902344l11.523437-11.527344c2.734376-2.730469 7.167969-2.730469 9.902344 0 2.734375 2.734375 2.734375 7.167969 0 9.902344zm28.8125-28.8125-11.527344 11.523437c-2.734374 2.734375-7.164062 2.734375-9.898437 0-2.734375-2.730469-2.734375-7.164062 0-9.898437l11.523437-11.527344c2.734376-2.734375 7.167969-2.734375 9.898438 0 2.734375 2.734375 2.734375 7.167969 0 9.902344zm28.171875-38.070313c2.734375 2.730469 2.734375 7.164063 0 9.898438l-11.523437 11.523437c-2.734375 2.734375-7.167969 2.734375-9.902344 0-2.730469-2.734375-2.730469-7.164062 0-9.898437l11.527344-11.523438c2.734375-2.734375 7.164062-2.734375 9.898437 0zm-38.710937-5.765625 11.519531-11.523437c2.734375-2.734375 7.167969-2.734375 9.898437 0 2.734376 2.734375 2.734376 7.164062 0 9.898437l-11.523437 11.527344c-2.734375 2.734375-7.164063 2.734375-9.898437 0-2.734376-2.734375-2.734376-7.167969 0-9.902344zm-28.171875 28.175782 11.523437-11.527344c2.734375-2.734375 7.164063-2.734375 9.898438 0s2.734375 7.167968 0 9.902344l-11.523438 11.523437c-2.734375 2.734375-7.167968 2.734375-9.902344 0-2.730468-2.734375-2.730468-7.167969 0-9.898437zm-28.816407 28.8125 11.527344-11.527344c2.734375-2.734375 7.164063-2.734375 9.898438 0s2.734375 7.167968 0 9.902344l-11.527344 11.523437c-2.730469 2.734375-7.164062 2.734375-9.898438 0-2.734374-2.734375-2.734374-7.167969 0-9.902344zm-28.8125 28.8125 11.523438-11.527344c2.734375-2.730469 7.167969-2.730469 9.898438 0 2.734374 2.734375 2.734374 7.167968 0 9.902344l-11.523438 11.523437c-2.734375 2.734375-7.164062 2.734375-9.898438 0-2.734374-2.730469-2.734374-7.164063 0-9.898437zm-28.816406 28.816406 11.527344-11.53125c2.734375-2.730469 7.167969-2.730469 9.902344 0 2.734375 2.734375 2.734375 7.167968 0 9.902344l-11.527344 11.527343c-2.734375 2.734375-7.167969 2.734375-9.902344 0s-2.734375-7.164062 0-9.898437zm-28.8125 28.808594 11.523438-11.523438c2.734375-2.734375 7.167968-2.734375 9.902344 0 2.734374 2.730469 2.734374 7.164062 0 9.898438l-11.527344 11.523437c-2.734375 2.734375-7.164063 2.734375-9.898438 0-2.734375-2.730469-2.734375-7.164063 0-9.898437zm-28.8125 28.8125 11.523438-11.523438c2.734375-2.734375 7.167968-2.734375 9.902344 0 2.734374 2.734375 2.734374 7.167969 0 9.902344l-11.527344 11.523437c-2.730469 2.734375-7.164063 2.734375-9.898438 0s-2.734375-7.164062 0-9.898437zm-28.8125 28.8125 11.523438-11.523438c2.734375-2.734375 7.167968-2.734375 9.898437 0 2.734375 2.734375 2.734375 7.164062 0 9.898438l-11.523437 11.527343c-2.734375 2.734375-7.167969 2.734375-9.902344 0-2.730469-2.734375-2.730469-7.167969 0-9.898437zm-23.222656 40.125c-2.832031 0-5.386719-1.707032-6.46875-4.320313-1.085938-2.617187-.484375-5.628906 1.515625-7.628906l11.527344-11.527344c2.734375-2.734375 7.164062-2.734375 9.898437 0s2.734375 7.167969 0 9.902344l-11.527344 11.523437c-1.308593 1.3125-3.089843 2.050782-4.945312 2.050782zm12.335938 5.335937 11.523437-11.523437c2.734375-2.734376 7.167969-2.734376 9.902344 0 2.734375 2.730468 2.734375 7.164062 0 9.898437l-11.527344 11.527344c-2.730469 2.734375-7.164063 2.734375-9.898437 0-2.734376-2.730469-2.734376-7.164063 0-9.898438zm0 0"/><path d="m61.003906 330.972656c75.277344 69.96875 192.425782 67.824219 265.09375-4.851562 72.679688-72.667969 74.820313-189.820313 4.851563-265.097656zm223.679688-207.621094 11.523437-11.527343c2.734375-2.730469 7.167969-2.730469 9.902344 0 2.730469 2.734375 2.730469 7.167969 0 9.902343l-11.527344 11.523438c-2.734375 2.734375-7.167969 2.734375-9.902343 0-2.734376-2.734375-2.734376-7.164062 0-9.898438zm-28.816406 28.8125 11.527343-11.523437c2.730469-2.734375 7.164063-2.734375 9.898438 0 2.734375 2.730469 2.734375 7.164063 0 9.898437l-11.523438 11.523438c-2.734375 2.734375-7.167969 2.734375-9.902343 0-2.734376-2.730469-2.734376-7.164062 0-9.898438zm-28.8125 28.8125 11.527343-11.527343c2.734375-2.730469 7.164063-2.730469 9.898438 0 2.734375 2.734375 2.734375 7.167969 0 9.902343l-11.523438 11.523438c-2.734375 2.734375-7.167969 2.734375-9.898437 0-2.734375-2.734375-2.734375-7.164062 0-9.898438zm-28.8125 28.8125 11.523437-11.523437c2.734375-2.734375 7.167969-2.734375 9.902344 0s2.734375 7.164063 0 9.898437l-11.527344 11.527344c-2.734375 2.734375-7.167969 2.734375-9.898437 0-2.734376-2.734375-2.734376-7.167968 0-9.898437zm-28.816407 28.816407 11.527344-11.527344c2.734375-2.730469 7.164063-2.730469 9.898437 0 2.734376 2.734375 2.734376 7.167969 0 9.902344l-11.523437 11.523437c-2.734375 2.734375-7.167969 2.734375-9.902344 0s-2.734375-7.164062 0-9.898437zm-28.8125 28.8125 11.527344-11.523438c2.730469-2.734375 7.164063-2.734375 9.898437 0 2.734376 2.730469 2.734376 7.164063 0 9.898438l-11.527343 11.527343c-2.734375 2.734376-7.164063 2.734376-9.898438 0-2.734375-2.734374-2.734375-7.167968 0-9.902343zm-28.808593 28.8125 11.523437-11.523438c2.734375-2.734375 7.164063-2.734375 9.898437 0 2.734376 2.734375 2.734376 7.164063 0 9.898438l-11.523437 11.527343c-2.734375 2.730469-7.164063 2.730469-9.898437 0-2.734376-2.734374-2.734376-7.167968 0-9.902343zm-23.222657 40.121093c-2.832031 0-5.386719-1.707031-6.46875-4.320312-1.082031-2.617188-.484375-5.628906 1.515625-7.628906l11.527344-11.527344c2.734375-2.734375 7.164062-2.734375 9.898438 0 2.734374 2.734375 2.734374 7.167969 0 9.902344l-11.527344 11.527344c-1.3125 1.3125-3.089844 2.046874-4.945313 2.046874zm33.761719 3.710938-11.523438 11.527344c-2.734374 2.734375-7.167968 2.734375-9.902343 0s-2.734375-7.164063 0-9.898438l11.527343-11.527344c2.730469-2.734374 7.164063-2.734374 9.898438 0 2.734375 2.734376 2.734375 7.167969 0 9.902344zm28.171875-28.171875-11.523437 11.523437c-2.734376 2.734376-7.167969 2.734376-9.902344 0-2.730469-2.734374-2.730469-7.164062 0-9.898437l11.527344-11.527344c2.734374-2.730469 7.164062-2.730469 9.898437 0 2.734375 2.734375 2.734375 7.167969 0 9.902344zm28.8125-28.8125-11.527344 11.527344c-2.734375 2.734375-7.167969 2.734375-9.898437 0-2.734375-2.734375-2.734375-7.167969 0-9.902344l11.523437-11.523437c2.734375-2.734376 7.167969-2.734376 9.902344 0 2.734375 2.734374 2.734375 7.167968 0 9.902343zm28.8125-28.8125-11.523437 11.527344c-2.734376 2.734375-7.167969 2.734375-9.902344 0s-2.734375-7.167969 0-9.902344l11.527344-11.523437c2.730468-2.734376 7.164062-2.734376 9.898437 0 2.734375 2.734374 2.734375 7.164062 0 9.898437zm28.816406-28.816406-11.53125 11.53125c-2.734375 2.730469-7.164062 2.730469-9.898437 0-2.734375-2.734375-2.734375-7.167969 0-9.902344l11.527344-11.527344c2.734374-2.734375 7.167968-2.734375 9.898437 0 2.734375 2.734375 2.734375 7.167969 0 9.898438zm28.8125-28.8125-11.527343 11.527343c-2.730469 2.734376-7.164063 2.734376-9.898438 0-2.734375-2.734374-2.734375-7.167968 0-9.902343l11.527344-11.523438c2.734375-2.734375 7.164062-2.734375 9.898437 0s2.734375 7.164063 0 9.898438zm28.8125-28.8125-11.527343 11.527343c-2.734376 2.734376-7.164063 2.734376-9.898438 0-2.734375-2.734374-2.734375-7.167968 0-9.902343l11.523438-11.523438c2.734374-2.734375 7.167968-2.734375 9.902343 0s2.734375 7.164063 0 9.898438zm28.8125-28.8125-11.523437 11.523437c-2.734375 2.734375-7.167969 2.734375-9.902344 0-2.734375-2.730468-2.734375-7.164062 0-9.898437l11.527344-11.527344c2.734375-2.730469 7.164062-2.730469 9.898437 0 2.734375 2.734375 2.734375 7.167969 0 9.902344zm28.171875-38.070313c2.734375 2.730469 2.734375 7.164063 0 9.898438l-11.523437 11.523437c-2.734375 2.734375-7.167969 2.734375-9.898438 0-2.734375-2.730469-2.734375-7.164062 0-9.898437l11.523438-11.523438c2.734375-2.734375 7.167969-2.734375 9.898437 0zm-17.285156-7.390625-11.527344 11.527344c-2.734375 2.734375-7.164062 2.734375-9.898437 0s-2.734375-7.167969 0-9.902344l11.523437-11.523437c2.734375-2.734375 7.167969-2.734375 9.902344 0 2.730469 2.734375 2.730469 7.164062 0 9.898437zm0 0"/></svg></div><div class="highlight-txt">'+results['kf'][hkey]['title'];
                            highlights += '</div></a></div>';
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
            liveBlog += '<div class="blog-entry-wrap timeline-content" data-id="live-blog-'+dateRaw+'">';

            liveBlog += '<div class="blog-inner-wrap">';
            liveBlog += '<div class="h-timestamp"><h6 class="time-txt">' +time.substr(0,2)+':' +time.substr(2,2)+' (IST)</span></h6></div>';
            liveBlog += '<div class="blog-txt">';
        
            if(typeof results['data'][key]['post']['img'] !== "undefined" && results['data'][key]['post']['img'] != ""){
                liveBlog += '<div class="blog-img"><img src="https://images.firstpost.com/wp-content/uploads/firstcricket/milestones/2020/'+results['data'][key]['post']['img']+'.png" /></div>';
            }
            liveBlog += '<div class="blog-txt-wrap">'+results['data'][key]['post']['title']+'</div></div>';
            if(results['data'][key]['post']['data_type'] == 'new_embedded' &&  (results['data'][key]['post']['source'].indexOf('embed') >= 0)  ){
                
                liveBlog += '<p class="blog-source"><div class="embed-responsive embed-responsive-16by9"><iframe class="embed-responsive-item" src="'+results['data'][key]['post']['source']+'"></iframe></div></p>';

            } else if(results['data'][key]['post']['source'] != "" && results['data'][key]['post']['source'] != null  && results['data'][key]['post']['source'] != 'null' )  {
                
                liveBlog += '<p class="blog-source">' + results['data'][key]['post']['source'] + '</p>';
            }
            liveBlog += '<div class="blog-author-div">';
            if(results['data'][key]['author_image'] != null){
                liveBlog += '<div class="blog-auth-img"><img src="'+results['data'][key]['author_image']+'" /></div>';
            }
            liveBlog += '<div class="blog-auth-details">';
            if(results['data'][key]['author_name'] != ""){
                liveBlog += '<h4 class="auth-blog-name">' + results['data'][key]['author_name'] + '</h4>';
            }
            liveBlog += '</div>';
            liveBlog += '</div>';
            liveBlog += '<div class="blog-btn-div">';
            liveBlog += '<div class="full-score-btn">';
            liveBlog += '<a href="'+fullUrl+'" title="Full Scorecard">';
            liveBlog += 'Full Scorecard';
            liveBlog += '</a>';
            liveBlog += '</div>';
            liveBlog += '<div class="blog-share"><div class="share-wrap">';
            liveBlog += socialshare;
            liveBlog += '</div>';
            liveBlog += '</div>';
            liveBlog += '</div>';
            
            liveBlog += '</div>';
            liveBlog += '</div>';
        }
        $(".refresh-live-blog").html(liveBlog);

        for (var hkey in results['kf']) {

            var hdateRaw = results['kf'][hkey]['date'];
            var htime = hdateRaw.substr(hdateRaw.length-6, 4);

            highlights += '<div class="highlight-block"><a href="#live-blog-'+hdateRaw+'" class="clearfix">';
            highlights += '<div class="h-timestamp">';
            highlights += '<h6 class="time-txt">' +htime.substr(0,2)+':' +htime.substr(2,2)+' <span>(IST)</span></h6><svg height="22" viewBox="0 0 382.04857 382" width="22" fill="#000"><path d="m321.050781 51.128906c-75.28125-69.972656-192.429687-67.832031-265.105469 4.839844-72.675781 72.675781-74.8125 189.824219-4.839843 265.105469zm-223.679687 207.621094-11.523438 11.527344c-2.734375 2.734375-7.167968 2.734375-9.902344 0-2.734374-2.734375-2.734374-7.167969 0-9.902344l11.527344-11.523438c2.734375-2.734374 7.167969-2.734374 9.898438 0 2.734375 2.734376 2.734375 7.164063 0 9.898438zm28.8125-28.8125-11.523438 11.523438c-2.734375 2.734374-7.164062 2.734374-9.898437 0-2.734375-2.734376-2.734375-7.167969 0-9.898438l11.523437-11.527344c2.734375-2.734375 7.167969-2.734375 9.902344 0 2.730469 2.734375 2.730469 7.167969 0 9.902344zm28.8125-28.8125-11.523438 11.527344c-2.734375 2.734375-7.167968 2.734375-9.902344 0-2.730468-2.734375-2.730468-7.167969 0-9.902344l11.527344-11.523438c2.734375-2.734374 7.164063-2.734374 9.898438 0 2.734375 2.734376 2.734375 7.164063 0 9.898438zm28.816406-28.8125-11.527344 11.523438c-2.730468 2.734374-7.164062 2.734374-9.898437 0-2.734375-2.734376-2.734375-7.167969 0-9.902344l11.527343-11.523438c2.734376-2.734375 7.164063-2.734375 9.898438 0s2.734375 7.164063 0 9.898438zm28.8125-28.816406-11.523438 11.527344c-2.734374 2.730468-7.167968 2.730468-9.902343 0-2.730469-2.734376-2.730469-7.167969 0-9.902344l11.527343-11.523438c2.734376-2.734375 7.167969-2.734375 9.898438 0 2.734375 2.734375 2.734375 7.164063 0 9.898438zm28.816406-28.8125-11.527344 11.527344c-2.734374 2.730468-7.164062 2.730468-9.898437 0-2.734375-2.734376-2.734375-7.167969 0-9.902344l11.523437-11.527344c2.734376-2.730469 7.167969-2.730469 9.902344 0 2.734375 2.734375 2.734375 7.167969 0 9.902344zm28.8125-28.8125-11.527344 11.523437c-2.734374 2.734375-7.164062 2.734375-9.898437 0-2.734375-2.730469-2.734375-7.164062 0-9.898437l11.523437-11.527344c2.734376-2.734375 7.167969-2.734375 9.898438 0 2.734375 2.734375 2.734375 7.167969 0 9.902344zm28.171875-38.070313c2.734375 2.730469 2.734375 7.164063 0 9.898438l-11.523437 11.523437c-2.734375 2.734375-7.167969 2.734375-9.902344 0-2.730469-2.734375-2.730469-7.164062 0-9.898437l11.527344-11.523438c2.734375-2.734375 7.164062-2.734375 9.898437 0zm-38.710937-5.765625 11.519531-11.523437c2.734375-2.734375 7.167969-2.734375 9.898437 0 2.734376 2.734375 2.734376 7.164062 0 9.898437l-11.523437 11.527344c-2.734375 2.734375-7.164063 2.734375-9.898437 0-2.734376-2.734375-2.734376-7.167969 0-9.902344zm-28.171875 28.175782 11.523437-11.527344c2.734375-2.734375 7.164063-2.734375 9.898438 0s2.734375 7.167968 0 9.902344l-11.523438 11.523437c-2.734375 2.734375-7.167968 2.734375-9.902344 0-2.730468-2.734375-2.730468-7.167969 0-9.898437zm-28.816407 28.8125 11.527344-11.527344c2.734375-2.734375 7.164063-2.734375 9.898438 0s2.734375 7.167968 0 9.902344l-11.527344 11.523437c-2.730469 2.734375-7.164062 2.734375-9.898438 0-2.734374-2.734375-2.734374-7.167969 0-9.902344zm-28.8125 28.8125 11.523438-11.527344c2.734375-2.730469 7.167969-2.730469 9.898438 0 2.734374 2.734375 2.734374 7.167968 0 9.902344l-11.523438 11.523437c-2.734375 2.734375-7.164062 2.734375-9.898438 0-2.734374-2.730469-2.734374-7.164063 0-9.898437zm-28.816406 28.816406 11.527344-11.53125c2.734375-2.730469 7.167969-2.730469 9.902344 0 2.734375 2.734375 2.734375 7.167968 0 9.902344l-11.527344 11.527343c-2.734375 2.734375-7.167969 2.734375-9.902344 0s-2.734375-7.164062 0-9.898437zm-28.8125 28.808594 11.523438-11.523438c2.734375-2.734375 7.167968-2.734375 9.902344 0 2.734374 2.730469 2.734374 7.164062 0 9.898438l-11.527344 11.523437c-2.734375 2.734375-7.164063 2.734375-9.898438 0-2.734375-2.730469-2.734375-7.164063 0-9.898437zm-28.8125 28.8125 11.523438-11.523438c2.734375-2.734375 7.167968-2.734375 9.902344 0 2.734374 2.734375 2.734374 7.167969 0 9.902344l-11.527344 11.523437c-2.730469 2.734375-7.164063 2.734375-9.898438 0s-2.734375-7.164062 0-9.898437zm-28.8125 28.8125 11.523438-11.523438c2.734375-2.734375 7.167968-2.734375 9.898437 0 2.734375 2.734375 2.734375 7.164062 0 9.898438l-11.523437 11.527343c-2.734375 2.734375-7.167969 2.734375-9.902344 0-2.730469-2.734375-2.730469-7.167969 0-9.898437zm-23.222656 40.125c-2.832031 0-5.386719-1.707032-6.46875-4.320313-1.085938-2.617187-.484375-5.628906 1.515625-7.628906l11.527344-11.527344c2.734375-2.734375 7.164062-2.734375 9.898437 0s2.734375 7.167969 0 9.902344l-11.527344 11.523437c-1.308593 1.3125-3.089843 2.050782-4.945312 2.050782zm12.335938 5.335937 11.523437-11.523437c2.734375-2.734376 7.167969-2.734376 9.902344 0 2.734375 2.730468 2.734375 7.164062 0 9.898437l-11.527344 11.527344c-2.730469 2.734375-7.164063 2.734375-9.898437 0-2.734376-2.730469-2.734376-7.164063 0-9.898438zm0 0"/><path d="m61.003906 330.972656c75.277344 69.96875 192.425782 67.824219 265.09375-4.851562 72.679688-72.667969 74.820313-189.820313 4.851563-265.097656zm223.679688-207.621094 11.523437-11.527343c2.734375-2.730469 7.167969-2.730469 9.902344 0 2.730469 2.734375 2.730469 7.167969 0 9.902343l-11.527344 11.523438c-2.734375 2.734375-7.167969 2.734375-9.902343 0-2.734376-2.734375-2.734376-7.164062 0-9.898438zm-28.816406 28.8125 11.527343-11.523437c2.730469-2.734375 7.164063-2.734375 9.898438 0 2.734375 2.730469 2.734375 7.164063 0 9.898437l-11.523438 11.523438c-2.734375 2.734375-7.167969 2.734375-9.902343 0-2.734376-2.730469-2.734376-7.164062 0-9.898438zm-28.8125 28.8125 11.527343-11.527343c2.734375-2.730469 7.164063-2.730469 9.898438 0 2.734375 2.734375 2.734375 7.167969 0 9.902343l-11.523438 11.523438c-2.734375 2.734375-7.167969 2.734375-9.898437 0-2.734375-2.734375-2.734375-7.164062 0-9.898438zm-28.8125 28.8125 11.523437-11.523437c2.734375-2.734375 7.167969-2.734375 9.902344 0s2.734375 7.164063 0 9.898437l-11.527344 11.527344c-2.734375 2.734375-7.167969 2.734375-9.898437 0-2.734376-2.734375-2.734376-7.167968 0-9.898437zm-28.816407 28.816407 11.527344-11.527344c2.734375-2.730469 7.164063-2.730469 9.898437 0 2.734376 2.734375 2.734376 7.167969 0 9.902344l-11.523437 11.523437c-2.734375 2.734375-7.167969 2.734375-9.902344 0s-2.734375-7.164062 0-9.898437zm-28.8125 28.8125 11.527344-11.523438c2.730469-2.734375 7.164063-2.734375 9.898437 0 2.734376 2.730469 2.734376 7.164063 0 9.898438l-11.527343 11.527343c-2.734375 2.734376-7.164063 2.734376-9.898438 0-2.734375-2.734374-2.734375-7.167968 0-9.902343zm-28.808593 28.8125 11.523437-11.523438c2.734375-2.734375 7.164063-2.734375 9.898437 0 2.734376 2.734375 2.734376 7.164063 0 9.898438l-11.523437 11.527343c-2.734375 2.730469-7.164063 2.730469-9.898437 0-2.734376-2.734374-2.734376-7.167968 0-9.902343zm-23.222657 40.121093c-2.832031 0-5.386719-1.707031-6.46875-4.320312-1.082031-2.617188-.484375-5.628906 1.515625-7.628906l11.527344-11.527344c2.734375-2.734375 7.164062-2.734375 9.898438 0 2.734374 2.734375 2.734374 7.167969 0 9.902344l-11.527344 11.527344c-1.3125 1.3125-3.089844 2.046874-4.945313 2.046874zm33.761719 3.710938-11.523438 11.527344c-2.734374 2.734375-7.167968 2.734375-9.902343 0s-2.734375-7.164063 0-9.898438l11.527343-11.527344c2.730469-2.734374 7.164063-2.734374 9.898438 0 2.734375 2.734376 2.734375 7.167969 0 9.902344zm28.171875-28.171875-11.523437 11.523437c-2.734376 2.734376-7.167969 2.734376-9.902344 0-2.730469-2.734374-2.730469-7.164062 0-9.898437l11.527344-11.527344c2.734374-2.730469 7.164062-2.730469 9.898437 0 2.734375 2.734375 2.734375 7.167969 0 9.902344zm28.8125-28.8125-11.527344 11.527344c-2.734375 2.734375-7.167969 2.734375-9.898437 0-2.734375-2.734375-2.734375-7.167969 0-9.902344l11.523437-11.523437c2.734375-2.734376 7.167969-2.734376 9.902344 0 2.734375 2.734374 2.734375 7.167968 0 9.902343zm28.8125-28.8125-11.523437 11.527344c-2.734376 2.734375-7.167969 2.734375-9.902344 0s-2.734375-7.167969 0-9.902344l11.527344-11.523437c2.730468-2.734376 7.164062-2.734376 9.898437 0 2.734375 2.734374 2.734375 7.164062 0 9.898437zm28.816406-28.816406-11.53125 11.53125c-2.734375 2.730469-7.164062 2.730469-9.898437 0-2.734375-2.734375-2.734375-7.167969 0-9.902344l11.527344-11.527344c2.734374-2.734375 7.167968-2.734375 9.898437 0 2.734375 2.734375 2.734375 7.167969 0 9.898438zm28.8125-28.8125-11.527343 11.527343c-2.730469 2.734376-7.164063 2.734376-9.898438 0-2.734375-2.734374-2.734375-7.167968 0-9.902343l11.527344-11.523438c2.734375-2.734375 7.164062-2.734375 9.898437 0s2.734375 7.164063 0 9.898438zm28.8125-28.8125-11.527343 11.527343c-2.734376 2.734376-7.164063 2.734376-9.898438 0-2.734375-2.734374-2.734375-7.167968 0-9.902343l11.523438-11.523438c2.734374-2.734375 7.167968-2.734375 9.902343 0s2.734375 7.164063 0 9.898438zm28.8125-28.8125-11.523437 11.523437c-2.734375 2.734375-7.167969 2.734375-9.902344 0-2.734375-2.730468-2.734375-7.164062 0-9.898437l11.527344-11.527344c2.734375-2.730469 7.164062-2.730469 9.898437 0 2.734375 2.734375 2.734375 7.167969 0 9.902344zm28.171875-38.070313c2.734375 2.730469 2.734375 7.164063 0 9.898438l-11.523437 11.523437c-2.734375 2.734375-7.167969 2.734375-9.898438 0-2.734375-2.730469-2.734375-7.164062 0-9.898437l11.523438-11.523438c2.734375-2.734375 7.167969-2.734375 9.898437 0zm-17.285156-7.390625-11.527344 11.527344c-2.734375 2.734375-7.164062 2.734375-9.898437 0s-2.734375-7.167969 0-9.902344l11.523437-11.523437c2.734375-2.734375 7.167969-2.734375 9.902344 0 2.730469 2.734375 2.730469 7.164062 0 9.898437zm0 0"/></svg></div><div class="highlight-txt">'+results['kf'][hkey]['title'];
            highlights += '</div></a></div>';
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
