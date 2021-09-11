function openNav() {
	var slideNav = document.getElementById("sidenav-wrap");
	slideNav.classList.add("open");
	document.body.style.overflow = "hidden";	
}

function closeNav() {
	//e.stopPropagation();
  	var slideNav = document.getElementById("sidenav-wrap");
	slideNav.classList.remove("open");
	document.body.style.overflow = "auto";
}		

function tabs(e, cityName) {
  var i, tabcontent, tablinks, parentEle, tabContainer;
  //Selecting the clicked elements parent
  parentEle = e.parentNode;
  //Parent Wrapper
  tabContainer = e.parentNode.parentNode;
  tablinks = parentEle.children;
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  if (e.classList.contains('active')) {
    e.classList.remove('active');
  } else {
    e.classList.add('active');
  }

  /*Show Hide tabcontent which is direct descendant. Will not execute for inner tab structure*/
  tabcontent = Array.from(tabContainer.children).filter(function (x) {
    return x.matches('.tabcontent');
  });

  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  document.getElementById(cityName).style.display = "block";
}

function searchBox() {
  
   var search = document.getElementById("mySEARCH");
   search.classList.toggle("active");
}

function socialShare(shareIcon) {
  document.querySelectorAll('.thumb-social').forEach((elem) => {
    if(shareIcon.previousElementSibling !== elem){
      elem.classList.remove('open')
    }
  });

  shareIcon.previousElementSibling.classList.toggle('open');

  /*if(shareIcon.previousElementSibling.classList.contains('open')){
      shareIcon.previousElementSibling.classList.remove('open');
  } else {
    shareIcon.previousElementSibling.classList.add('open');
  }*/
}

//Check if element exists in the page
function checkElement(element){
  return document.body.contains(document.getElementById(element))
}

if(checkElement('podcastSlider')){
  var podslide = new Glide('#podcastSlider',{
    type: "carousel",
    startAt: 0,
    perView: 2,
    rewind: false,
    gap: 20,
    autoplay: "10000",
  });
  
  podslide.mount()
}

if(checkElement('mainstoryslider')){
  window.addEventListener('load', ()=>{
    setTimeout(()=>{
      var topglide = new Glide('#mainstoryslider',{
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
      
      topglide.mount()
    }, 3000)
  })
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

if(checkElement('videosslider')){
  var videoslide = new Glide('#videosslider',{
   type: "carousel",
   perView:3,
   startAt: 0,
   rewind:false,
   slidesToScroll: 1,
   autoplay: false,
   duration: 5000,
   animationDuration: 600,
   animationTimingFunc: 'linear',
   gap:20,
  });
  
  videoslide.mount()
}

if(checkElement('showtickerslider')){
  var showglide = new Glide('#showtickerslider',{
    type: 'carousel',
  perView:3,
  startAt: 0,
  rewind:false,
  slidesToScroll: 1,
  autoplay: false,
  duration: 5000,
  animationDuration: 600,
  animationTimingFunc: 'linear',
  });
  
  showglide.mount()
}

if(checkElement('logoGlide')){
  var logoglide = new Glide('#logoGlide', {
    type: 'carousel',
    autoplay: 3000,
    perView: 1
    })
    
    logoglide.mount();
}

if($(".readMore").length > 0){
$(document).on('click', '.readMore', function (e) {
      e.preventDefault()
      var dvid = $(this).data('postid');

      $('.article-full-content_' + dvid).css('height', 'auto');
      $('.hideCont').show();
      $(this).hide();
      $('#fade_' + dvid).css('display', 'none');
  });
}
$(document).ready(function (){
	/*if($(".article-full-content").length > 0){	
		$(".article-full-content").addClass("hideCont");
	}*/	
});
$.fn.isInViewport = function() {
  var elementTop = $(this).offset().top;
  var elementBottom = elementTop + $(this).outerHeight();
  var viewportTop = $(window).scrollTop();
  var viewportBottom = viewportTop + $(window).height();
  return elementBottom > viewportTop && elementTop < viewportBottom;
  };

  
if($('.article-sect').length > 0){
	$(window).on('resize scroll', function() {
		
		$('.article-sect').each(function () {
			if ($(this).isInViewport()) {
        $(this).prev('.floating-social-div').show('slow');
				$(this).prev('.floating-social-div').addClass('slide-in');
			} else {
        $(this).prev('.floating-social-div').hide('slow');
				$(this).prev('.floating-social-div').removeClass('slide-in');
			}
		});
	});
}
if ($(".ajax_strip_widget").length > 0 ) {
	getStripScoreData();
  setInterval(function () {      
          getStripScoreData();      
  }, 30000);
  function getStripScoreData(){  
      $.ajax({
          url: '/ajaxCalls/getScoreStripData',
          type: 'GET',
          data:{'matchID':"AllStrip"},          
          success:function(data){
              $(".ajax_strip_widget").html(data);              
          }
      })
  }
}

var pageNameVar = JSON.stringify(pageName)
window.onscroll = function() {myFunction()};

function myFunction() {

  if (pageName == 'article' || pageName == 'photoArticle' || pageName == 'showsArticle' || pageName == 'videoArticle' || pageName == 'firstcricket-article' || pageName == 'firstcricket-photoarticle' || pageName == 'long-read'){
    if (document.body.scrollTop > 650 || document.documentElement.scrollTop > 650) {
      document.getElementById("articleHeader").classList.add('displayed');
      document.getElementById("mainHeader").style.opacity = 0;
    } else {
      document.getElementById("mainHeader").style.opacity = 1;
      document.getElementById("articleHeader").classList.remove('displayed'); 
    }
  }
  
}

var mdName = new MobileDetect(window.navigator.userAgent); 

if($('.t-out-span').length > 1){
  $('.covid-tooltip').on('click', function(e){
    $('.div-covid-tooltip').removeClass('displayed');
    $(this).next('.div-covid-tooltip').toggleClass('displayed');


    if(mdName.mobile() == 'iPhone'){
      if($(this).parent().position().left > 150 && $(this).parent().position().left < 200){
        $(this).next('.displayed').css('left','-200%');
      } else if($(this).parent().position().left > 200){
        $(this).next('.displayed').css('left','-285%');
      }
    }   
    
  });

  $('.div-covid-tooltip').on('click', function(){
    $(this).removeClass('displayed');
  });
}

$(document).click(function(e){
  console.log(e.target  )
  if($(e.target).is('.ap-img') || $(e.target).is('.covid-tooltip') || $(e.target).is('.div-covid-tooltip')){
   
  } else {
    $('.displayed').removeClass('displayed')
  }

})