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




function socialShare(shareIcon) {
    document.querySelectorAll('.thumb-social').forEach((elem) => {
      if(shareIcon.previousElementSibling !== elem){
        elem.classList.remove('open')
      }
  });
  
    shareIcon.previousElementSibling.classList.toggle('open');
}


if(checkElement('topSlider')){
  var topglide = new Glide('#topSlider',{
    type: 'slider',
    perView: 1,
    rewind: true
  });
  
  topglide.mount()
}

if(checkElement('cricketScore')){
  var cricWidgetglide = new Glide('#cricketScore',{
    type: 'slider',
    perView: 1,
    rewind: true
  });
  
  cricWidgetglide.mount()
}

/*Accordion*/
var accItem = document.getElementsByClassName('accordionItem');
var accHD = document.getElementsByClassName('accordionItemHeading');
for (i = 0; i < accHD.length; i++) {
    accHD[i].addEventListener('click', toggleItem, false);
}
function toggleItem() {
    var itemClass = this.parentNode.className;
    for (i = 0; i < accItem.length; i++) {
        accItem[i].className = 'accordionItem close';
    }
    if (itemClass == 'accordionItem close') {
        this.parentNode.className = 'accordionItem open';
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
    var radioValue = $("input[name='cricType']:checked").val();
    $(".schedule-block-cell").hide();
    $(".schedule-block-wrap").hide();    
    $(".cric_"+radioValue).show();    
});
var radioValue = $("input[name='cricType']:checked").val();
if(radioValue){
  $(".schedule-block-cell").hide();
  $(".cric_"+radioValue).show();
  $('.schedule-block-wrap').each(function () {
    var thisIDClass = $("#cric_"+this.id).val();
    $("#"+this.id).addClass(thisIDClass);    
  });
}

if ($(".ajax_widget").length > 0 ) {
var matchStatus = $("#matchStatus").val();
setInterval(function () {
    if(matchStatus != "" && matchStatus != 'Match Ended' && matchStatus != 'Match Abandoned'){            
        getMatchCommentarynew();
    }
}, 15000);
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

