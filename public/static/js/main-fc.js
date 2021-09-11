/*Common Functions*/
function docEleID(element){
    return document.getElementById(element);
}

function docEleClass(element){
    return document.getElementsByClassName(element);
}

function docQuery(element){
    return document.querySelector(element)
}

//Check if element exists in the page
function checkElement(element){
  return document.body.contains(docEleID(element))
}

function socialShare(shareIcon) {
    document.querySelectorAll('.thumb-social').forEach((elem) => {
      if(shareIcon.previousElementSibling !== elem){
        elem.classList.remove('open')
      }
  });
  
    shareIcon.previousElementSibling.classList.toggle('open');
}

if(checkElement('cricketScore')){
  var cricWidgetglide = new Glide('#cricketScore',{
    type: 'slider',
    perView: 1,
    rewind: true
  });
  
  cricWidgetglide.mount()
}

if(checkElement('liveScoreSlider')){
  var liveWidgetglide = new Glide('#liveScoreSlider',{
    type: 'slider',
    perView: 1,
    rewind: true
  });
  
  liveWidgetglide.mount()
}

if(checkElement('topSlider')){
  var topglide = new Glide('#topSlider',{
    type: 'slider',
    perView: 1,
    rewind: true
  });
  
  topglide.mount()
}

/*Accordion*/
var accItem = document.getElementsByClassName('accordionItem');
var accHD = document.getElementsByClassName('accordionItemHeading');
for (i = 0; i < accHD.length; i++) {
    accHD[i].addEventListener('click', toggleItem, false);
}
function toggleItem(currEle) {
    var itemClass = currEle.parentNode.className;
    for (i = 0; i < accItem.length; i++) {
        accItem[i].className = 'accordionItem close';
    }
    if (itemClass == 'accordionItem close') {
      currEle.parentNode.className = 'accordionItem open';
    }
}

document.querySelectorAll('.custom-select-wrapper select').forEach((elem) => {
  elem.addEventListener("change",function(){
    var x = elem.value;
    docEleID(x).scrollIntoView({
      behavior: 'smooth' 
    });
  })  
});

$(".radio-btn").on("click", function(){
    if($(this).attr('data-checked') != '1')
    {
      $("input[name='cricType']").removeAttr('checked');
      $(this).children(".cricType").attr('checked','checked');
    }
    else
    {
      $(this).removeAttr('data-checked');
    }
    
    var radioValue = $(".cricType:checked").val();
    $(".schedule-block-cell").hide();
    $(".schedule-block-wrap").hide();    
    $(".cric_"+radioValue).show();  
    $('.schedule-block-wrap').show();
    $('.sel-month option').show();
    $('.sel-month option[value=""]').prop('selected','selected');
    $('.schedule-block-wrap').each(function () {  
      if($('#'+this.id +' .schedule-block-cell.cric_'+radioValue).length <= 0)
      {
        $(this).hide();
        $('.sel-month option[value="'+this.id+'"]').hide();
      }
    });
    radioValue ="";
    return false;
});
var radioValue = $(".cricType:checked").val();
if(radioValue){
  $(".cricType:checked").parent().attr('data-checked','1');
  $(".cricType:checked").parent(".radio-btn").click();
}
if ($(".ajax_widget").length > 0 ) {
  var matchStatus = $("#matchStatus").val();
  var isMatchLive = $("#isMatchLive").val();
  setInterval(function () {    
      if(isMatchLive == "1" &&  matchStatus != "" && matchStatus != 'Match Ended' && matchStatus != 'Match Abandoned' && matchStatus != 'Stumps'){
          getMatchCommentarynew();
      }
  }, 30000);
  
  function getMatchCommentarynew(){
      var matchFile = $("#matchFile").val();      
      var seriesID = $("#seriesID").val();
      var matchID = $("#matchID").val();
      var pageType = $("#pageType").val();    
      var postSlug = $("#postSlug").val();
      var postId = $("#postId").val();
      $.ajax({
          url: '/ajaxCalls/getScoreData',
          type: 'GET',
          data:{'matchID':matchID,'seriesID':seriesID,'pageType':pageType,'matchFile':matchFile},          
          success:function(data){                            
              $(".team_widget_"+matchFile).html(data);      
              url = postSlug;
              if(postId != "" && postId != null)
              $(".blog-url").attr("href",url);
              else
              $(".blog-url").hide();
          }
      })
  }
}

if ($(".live_slide").length > 0 ) {
    getStripScoreData();      
    setInterval(function () {      
            getStripScoreData();      
    }, 30000);  
  function getStripScoreData(){  
      $.ajax({
          url: '/ajaxCalls/getScoreStripData',
          type: 'GET',
          data:{'matchID':"fchome"},          
          success:function(data){
              $(".ajax_caraousal").html(data);              
          }
      })
  }
}

var devieType = $("#checkDevice").val();
if(devieType == "desktop"){
  /*Common Functions*/
  if(checkElement('score')){
    var scoreglide = new Glide('#score', {
      type: 'slider',
      perView: 3,
    });
    scoreglide.mount();
  }

  if(checkElement('videoSlider')){
    var videoglide = new Glide('#videoSlider',{
      type: 'slider',
      perView: 3,
      rewind: true
    });
    
    videoglide.mount()
  }

  if(checkElement('crickettickerslider')){
    var crickglide = new Glide('#crickettickerslider',{
      type: 'carousel',
      perView:1,
      startAt: 0,
      rewind:false,
      slidesToScroll: 1,
      autoplay: false,
      duration: 5000,
      animationDuration: 600,
      animationTimingFunc: 'linear',
    });
    
    crickglide.mount()
  }

  if(checkElement('flagSlider')){
    var scoreglide = new Glide('#flagSlider', {
      type: 'slider',
      perView: 9,
    });
    scoreglide.mount();
  }
  /* Tabs Code */
  function tabs(e,cityName) {
    var i, tabcontent, tablinks, parentEle, tabContainer;
    parentEle = e.parentNode;
    tabContainer = e.parentNode.parentNode;  
    tablinks = parentEle.children;
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    if(e.classList.contains('active')){
        e.classList.remove('active');
    } else {
      e.classList.add('active');
    }
    tabcontent = tabContainer.querySelectorAll('.tabcontent');
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    document.getElementById(cityName).style.display = "block";
  }
}
if(devieType == "mobile"){  
  //Function for jquery $(document).ready() equivalent
  //
  function docReady(fn) {
    if (document.readyState === "complete" || document.readyState === "interactive") {
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
  }    
  /*Common Functions*/

  if(checkElement('flagSlider')){
    var scoreglide = new Glide('#flagSlider', {
      type: 'slider',
      perView: 4,
    });
    scoreglide.mount();
  }

  if(checkElement('liveScoreSlider')){
    var liveWidgetglide = new Glide('#liveScoreSlider',{
      type: 'slider',
      perView: 1,
      rewind: true
    });
    
    liveWidgetglide.mount()
  }

  // Functions or JS to be executed under $(document).ready()
  docReady(function() {
    /* Function to scroll to active menu element */  
    var activeMenu = docQuery('.inner-menu-list li a.active');
    var x = getElemPosition( activeMenu ).left;
    x=x-67; 
    docQuery('.sport-menu-div').scrollLeft += x;
    /* Function to scroll to active menu element */
  });

  function getElemPosition( elem ) {
    var _x = 0;
    var _y = 0;
    while( elem && !isNaN( elem.offsetLeft ) && !isNaN( elem.offsetTop ) ) {
        _x += elem.offsetLeft - elem.scrollLeft;
        _y += elem.offsetTop - elem.scrollTop;
        elem = elem.offsetParent;
    }
    return { top: _y, left: _x };
  }
}