
function openNav() {
	var slideNav = document.getElementById("menunav-wrap");
	slideNav.classList.add("open");
	document.body.style.overflow = "hidden";	
}

function closeNav() {
	//e.stopPropagation();
  	var slideNav = document.getElementById("menunav-wrap");
	slideNav.classList.remove("open");
	document.body.style.overflow = "auto";
}		


function checkElement(element){
  return document.body.contains(document.getElementById(element))
}


function socialShare(shareIcon) {
    document.querySelectorAll('.th-social').forEach((elem) => {
      if(shareIcon.previousElementSibling !== elem){
        elem.classList.remove('open')
      }
  });
  
    shareIcon.previousElementSibling.classList.toggle('open');
  }

if(checkElement('sports')) {
	  var sportsglide = new Glide('#sports', {
	    type: 'slider',
	    gap:0,
	    perView:4,
	  });
	  sportsglide.mount();
};
if(checkElement('top-slider')){
  var topglide = new Glide('#top-slider',{
    type: 'slider',
    perView: 1,
    rewind: true,
    autoplay: 5000
  });
  
  topglide.mount()
}
if(checkElement('latest')){
  var latestglide = new Glide('#latest',{
    type: 'slider',
    perView: 3,
    gap: 26,
    rewind: true,
    breakpoints: {
     600: {
        perView: 3,
        gap:10,
        autoplay: 1500
      },
      480: {
        perView: 2,
        gap:10,
        autoplay: 1500
      },
      320: {
        perView: 1.5,
        gap:10,
        autoplay: 1500
      }
    }
  });
  
  latestglide.mount()
}
if(checkElement('medal')){
  var medalglide = new Glide('#medal',{
    type: 'slider',
    perView: 3,
    gap: 26,
    rewind: true,
    breakpoints: {
     600: {
        perView: 3,
        gap:10,
        autoplay: 1500
      },
      480: {
        perView: 2,
        gap:10,
        autoplay: 1500
      },
      320: {
        perView: 1.5,
        gap:10,
        autoplay: 1500
      }
    }
  });
  
  medalglide.mount()
}
if(checkElement('vdoslider')){
  var videosglide = new Glide('#vdoslider',{
    type: 'slider',
    perView: 3,
    gap: 26,
    rewind: true,
    breakpoints: {
     600: {
        perView: 3,
        gap:10,
        autoplay: 1500
      },
      480: {
        perView: 2,
        gap:10,
        autoplay: 1500
      },
      320: {
        perView: 1.5,
        gap:10,
        autoplay: 1500
      }
    }
  });
  
  videosglide.mount()
}
if(checkElement('phslider')){
  var phglide = new Glide('#phslider',{
    type: 'slider',
    perView: 3,
    gap: 25,
    rewind: true,
    breakpoints: {
     600: {
        perView: 3,
        gap:10,
        autoplay: 1500
      },
      480: {
        perView: 2,
        gap:10,
        autoplay: 1500
      },
      320: {
        perView: 1.5,
        gap:10,
        autoplay: 1500
      }
    }
  });
  
  phglide.mount()
}
if(checkElement('olympslider')){
  var olympsglide = new Glide('#olympslider',{
    type: 'slider',
    perView: 6,
    gap: 5,
    rewind: true,
    breakpoints: {
      800: {
        perView:6,
        gap:10,
        autoplay: 1500
      },
      650: {
        perView:5.5,
        gap:10,
        autoplay: 1500
      },
      600: {
        perView:4.5,
        gap:10,
        autoplay: 1500
      },
      480: {
        perView: 4,
        gap:10,
        autoplay: 1500
      },
     420: {
        perView: 3.5,
        gap:10,
        autoplay: 1500
      },
      360: {
        perView: 3,
        gap:10,
        autoplay: 1500
      },
      320: {
        perView: 3,
        gap:10,
        autoplay: 1500
      }
    }
  });
  olympsglide.mount()
}
if(checkElement('trackerslider')){
  var trackerglide = new Glide('#trackerslider',{
    type: 'slider',
    perView: 7,
    gap: 10,
    rewind: true,
    breakpoints: {
      900: {
        perView: 6,
        gap:10,
        autoplay: 1500
      },
      800: {
        perView: 5,
        gap:10,
        autoplay: 1500
      },
      720: {
        perView: 4.5,
        gap:10,
        autoplay: 1500
      },
     600: {
        perView: 4,
        gap:10,
        autoplay: 1500
      },
     480: {
        perView: 3.2,
        gap:10,
        autoplay: 1500
      },
     460: {
        perView: 2.8,
        gap:10,
        autoplay: 1500
      },
      360: {
        perView: 2.8,
        gap:10,
        autoplay: 1500
      },
      320: {
        perView: 2.5,
        gap:10,
        autoplay: 1500
      }
    }
  });
  trackerglide.mount()
}
if(checkElement('trackerslider1')){
  var trackerglide = new Glide('#trackerslider1',{
    type: 'slider',
    perView: 5,
    gap: 0,
    rewind: true,
    breakpoints: {
      980: {
        perView: 6,
        gap:0,
        autoplay: 1500
      },
      800: {
        perView: 5.2,
        gap:10,
        autoplay: 1500
      },
      720: {
        perView: 4.6,
        gap:10,
        autoplay: 1500
      },
     600: {
        perView: 3.8,
        gap:10,
        autoplay: 1500
      },
     480: {
        perView: 3.5,
        gap:10,
        autoplay: 1500
      },
     460: {
        perView: 3.2,
        gap:10,
        autoplay: 1500
      },
      360: {
        perView: 2.8,
        gap:10,
        autoplay: 1500
      },
      320: {
        perView: 2.5,
        gap:0,
        autoplay: 1500
      }
    }
  });
  trackerglide.mount()
}
if(checkElement('schedule')){
  var scheduleglide = new Glide('#schedule',{
    type: 'slider',
    perView:11,
    gap: 0,
    rewind: true
  });
  scheduleglide.mount()
}
if(checkElement('scheduledata')){
  var scheduledataglide = new Glide('#scheduledata',{
    type: 'slider',
    perView:1,
    gap: 0,
    rewind: true
  });
  scheduledataglide.mount()
}


if(checkElement('schedule', 'scheduledata')){
  scheduleglide.on('move.after', function() {
    scheduledataglide.go('='+(scheduleglide.index))
  })
  $('#schedule li').click(function(){
    sliderNo = $('#schedule .glide__slide').index(this)
    scheduleglide.go('='+(sliderNo))
    scheduledataglide.go('='+(sliderNo))
  })

}

if(checkElement('schedule2')){
  var scheduleglide2 = new Glide('#schedule2',{
    type: 'slider',
    perView:11,
    gap: 0,
    rewind: true
  });
  scheduleglide2.mount()
}
if(checkElement('scheduledata2')){
  var scheduledataglide2 = new Glide('#scheduledata2',{
    type: 'slider',
    perView:1,
    gap: 0,
    rewind: true
  });
  scheduledataglide2.mount()
}


if(checkElement('schedule2', 'scheduledata2')){
  scheduleglide2.on('move.after', function() {
    scheduledataglide2.go('='+(scheduleglide2.index))
  })
  $('#schedule2 li').click(function(){
    sliderNo = $('#schedule2 .glide__slide').index(this)
    scheduleglide2.go('='+(sliderNo))
    scheduledataglide2.go('='+(sliderNo))
  })

}

var questionNo = -1;
var totalQuestions = $(".daily-container .quesItem").length;
var answer=0;

function submitQuiz(){
  //console.log('sd2 ',$('input[name="ques1"]:checked'))

  //console.log('sd3 ',$('input[name="ques1"]:checked').val())

  $(".errOption").hide()
  if (!($('input[name="ques1"]:checked').length > 0)) {
    $('.errOption').attr('style','display: block');
    return
  }

  if($('input[name="ques1"]:checked').val()=="1"){
    answer+=1;
  }
  $(".daily-container").children().hide();
  $('#quiztest .submit-btn').hide();
  $('.quesnos').hide();
  //$(".quizAnswer").show()
  $('.quizAnswer').attr('style','display: block');
  let answerLable = `Your Total Score is : ${answer}`
  $('#answer').html(answerLable);
  //console.log('total= ',answer)
}

function next(){
  
  //$('.quizAnswer').attr('style','display: none');
  //console.log('sd ',$('input[name="ques1"]:checked'))

  //console.log('sd3 ',$('input[name="ques1"]:checked').val())

  $(".errOption").hide()
  //$(".quizAnswer").hide()

  if(questionNo != -1){

    if (!($('input[name="ques1"]:checked').length > 0)) {
      $('.errOption').attr('style','display: block');
      return
    }

  }
 
  if($('input[name="ques1"]:checked').val()=="1"){
     answer+=1;
  }
  if(questionNo < totalQuestions)
  {
    questionNo++;
    $(".daily-container").children().hide();
    $(".daily-container .quesItem:eq("+questionNo+") ").show();
    $('#qsno').html(questionNo+1);
  }

  if(questionNo == totalQuestions - 1){
    $("#quiztest .next-btn").hide();
    $('#quiztest .submit-btn').show();
  }
  if ($(window).width() >= 481){
    if(questionNo > 0 && questionNo <= totalQuestions){
     $("#quiztest .prev-btn").show();

    }else{
     $("#quiztest .prev-btn").hide();

    }
  }
  $('input[name="ques1"]:checked').prop('checked', false);
}
function prev(){
      questionNo--
      $(".daily-container").children().hide();
      $(".daily-container .quesItem:eq("+questionNo+") ").show();
      
      $('#qsno').html(questionNo);
    
    if(questionNo <= 0){
      $("#quiztest .prev-btn").hide();


    } else{
      $("#quiztest .next-btn").show();
      $('#quiztest .submit-btn').hide();
    }
  }


$(document).ready(function(){
	$('#readmore').on('click', function(){
		$(this).hide();
		$('.hidecont').slideDown();
	});
  next();
  readMore();
   /* select change value */
   $("select.selectFormobile").change(function(){
        $(this).find("option:selected").each(function(){
            var optionValue = $(this).attr("value");
            if(optionValue){
                $(".formobile .box").not("." + optionValue).hide();
                $("." + optionValue).show();
            } else{
                $(".formobile .box").hide();
            }
        });
    }).change();
    /* select change value */


	if ($(window).width() < 980){
		if(checkElement('fpexplain')){
		  var fpxglide = new Glide('#fpexplain',{
		    type: 'slider',
		    perView: 1,
		    gap: 10,
		    rewind: true,
        breakpoints: {
          980: {
            perView: 2,
            gap:10,
            autoplay: 1500
          },
          800: {
            perView: 2,
            gap:10,
            autoplay: 1500
          },
          600: {
            perView: 1,
            gap:10,
            autoplay: 1500
          }
        }
		  });
		  
		  fpxglide.mount()
		}
		if(checkElement('partlogoslider')) {
			  var partlogosglide = new Glide('#partlogoslider', {
			    type: 'slider',
			    gap:10,
			    perView: 2,
          breakpoints: {
          980: {
            perView: 2,
            gap:10,
           // autoplay: 1500
          },
          360: {
            perView: 1.9,
            gap:10,
            //autoplay: 1500
          },
          320: {
            perView: 1.7,
            gap:10,
           // autoplay: 1500,
            grow: 20
          }
        }
			  });
			  partlogosglide.mount();
		};
	} else {
		var fpxglide = new Glide('#fpexplain').destroy();
		var partlogosglide = new Glide('#partlogoslider').destroy();
	}
});

// Select all links with hashes
$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // On-page links
     if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top - 50
        }, 1000);
        return false;
      }
    }
  });

function readMore() 
    {
        $('.readmore').on('click', function () {
        if ($(this).find('span').text() == 'more') {
          $(this).find('span').text('less');
          $(this).find('i').removeClass('arwdwn').addClass('arwup');
          $(this).parent().siblings('.lessCont').css('height', 'auto');
          $(this).parent().siblings('.showtext').slideDown();
        } else{
          $(this).find('span').text('more');
          $(this).find('i').removeClass('arwup').addClass('arwdwn');
          $(this).parent().siblings('.lessCont').css('height', '78px');
          $(this).parent().siblings('.showtext').slideUp();
        }
      });
    }



