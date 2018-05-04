
$(document).ready(function(){

  var marginPlus = 30;
  var marginMinus = 50;
  var device;

  if($( window ).width()<480){
    device="phone";
  }
  else if($( window ).width()<950)
  {
    device="tablet";
  }
  else
  {
    device="desktop";
  }

  var firstLoad =true;
  // Nav - go to link on second click.
  $(".droppable").click(function(){
    if(!$(this).hasClass('clicked')){
      event.preventDefault();
    } else {
      return true;
    };
    $(this).toggleClass('clicked');
    $("#"+$(this).data().name).parent().addClass('selected');
    $('.selected .data-depth-one').removeClass('hidden');
    showMegaMenu();
    if(firstLoad)
      addChildrenSymbols();
    firstLoad=false;
    event.stopPropagation();
  });


  $(".kitkat-menu").click(function() {
    if(!$(this).hasClass('clicked')){
      event.preventDefault();
    } else {
      return true;
    };

    marginPlus = 35;
    marginMinus = 0;

    $(this).toggleClass('clicked');
    $("#about-us").parent().addClass('selected');
    $('.selected .data-depth-one').removeClass('hidden');
    showMegaMenu();
    if(firstLoad)
      addChildrenSymbols();
    firstLoad=false;
    event.stopPropagation();
  });


  $(".mega-menu a").click(function(){
    event.stopPropagation();
  });


  /*------------------ Hide Mega Menu-----------*/
  $(".nav-underlay").click(function(){
    hideMegaMenu();
    step=0;
  });

  /* ----------------- On Mega Menu link Clicked ------------------*/
  var step=0;
  $(".ul-reset li a").click(function(event) {
    step=onLabelClick(event, step, marginPlus, marginMinus);
  });
});

var navSetup = function () {
  $('#overlay-search-site input[type=text]').attr('placeholder', 'What can we help you find?');
  $('#toggle-search-site, #overlay-search-site .close').on('click', function (e) {
    e.preventDefault();
    $('#overlay-search-site').toggleClass('active');

    setTimeout(function () {
      // sorry.
      if ($('#overlay-search-site').hasClass('active')) {
        $('#overlay-search-site input[type=text]').focus();
      }
    }, 500);
  });

  $('#toggle-nav-site').on('click', function (e) {
    e.preventDefault();
    var navIsOpen = $('#nav-site').hasClass('open');

    if (navIsOpen) {
      $(this).removeClass('toggled');
      $('#nav-site').removeClass('open');
    } else {
      $(this).addClass('toggled');
      $('#nav-site').addClass('open');
    }
  });
};

function addChildrenSymbols (){
  $(".data-depth-one li,.data-depth-two li,.data-depth-three li").each(function( index ) {
    if($(this).find("ul").length){
      $(this).children("a").append(' >')
    }
  });
}


function depthPlus (step, marginPlus, marginMinus){
  $('.nav-sub').animate({
    "margin-left": '-='+marginPlus+'vw'
  });

  $('.nav-sub').animate({
    "margin-left": '+='+marginMinus+'px'
  });
  manageRightLeftGravity(step)
  return step+=1;
}

function manageRightLeftGravity(step){
 if(step==0){
  rightColumn(".data-depth-one");
}
if(step==1){
  rightColumn(".data-depth-two");
}
if(step==2){
  rightColumn(".data-depth-three");
}
if(step==3){
  rightColumn(".data-depth-four");
}
}

function depthMinus (step, marginPlus, marginMinus){
  $('.nav-sub').animate({
    "margin-left": '+='+marginPlus+'vw'
  });

  $('.nav-sub').animate({
    "margin-left": '-='+marginMinus+'px'
  });
  leftColumn(step);
  resetColumnOpacity(step);
  return step-=1;
}


function hideMegaMenu(){
  $('.droppable').removeClass('clicked');
  $(".wrap").removeClass('mega-menu-opened');
  $(".nav-underlay").toggle();
  resetMegaMenu();
}

function showMegaMenu(){
  $('.meta-mega').hide();
  $(".wrap").addClass('mega-menu-opened');
  $(".nav-underlay").toggle();
}

function resetMegaMenu(){

 $('.selected').removeClass('selected');
 $('.nav-sub').css({"margin-left": '0px'});
 $('.data-depth-one, .data-depth-two,.data-depth-three, .data-depth-four').addClass('hidden');
 leftColumnAll();
 $(".ul-reset").each(function( index ) {
  $( this ).find("li a").css("opacity","inherit");
});
}

function rightColumn(columnDepth){
  $(columnDepth).children('li').each(function( index ) {
    var a =  $(this).find('a').first();
    a.css('position', 'relative').animate({ left: $(this).width() - a.width()-40
    } , function() {
     $(columnDepth+">li>a").css("opacity","0.5");
     $(columnDepth+">li>a").css("text-align","right");
   });
  });
}

function leftColumn(step){
  var columnDepth;
  if(step==1){
    columnDepth=".data-depth-one";
  }
  if(step==2){
    columnDepth=".data-depth-two";
  }
  if(step==3){
    columnDepth=".data-depth-three";
  }
  $(columnDepth).children('li').each(function( index ) {
    $(this).find('a').first().animate({ left:0 });
  });
}

function resetColumnOpacity(step){
  if(step==1){
    columnDepth=".data-depth-one";
  }
  if(step==2){
    columnDepth=".data-depth-two";
  }
  if(step==3){
    columnDepth=".data-depth-three";
  }
  $(columnDepth).find("li a").css("opacity","inherit");
}

function leftColumnAll(){
  $(".data-depth-one").find('li').each(function( index ) {
    $(this).find('a').first().animate({ left:0 });
  });
}

function hasChildren(clickedLink){
  return clickedLink.parent().children('ul').length
}

function onLabelClick(event, step, marginPlus, marginMinus){
  $('.meta-mega').show();
  $("#meta-title").html($(event.target).data("title"));
  $("#meta-description").html($(event.target).data("description"));
  $(event.target).parent().parent().find("li a").removeClass("selected");
  $(event.target).addClass("selected");
  var clickedStep = $(event.target).parent().parent()[0].dataset.depth;
  console.log("clickedStep "+clickedStep);
  console.log("step "+step);
  if(clickedStep>step)
  {
    if($(event.target).parent().children("ul").removeClass('hidden').length){
      if(step>0){
        step= depthPlus(step, marginPlus, marginMinus);
      }
      else{
        manageRightLeftGravity(step);
        step+=1;
      }
    }
  }
  else if(clickedStep==step){
   if(step==0){
      //$('.data-depth-one, .data-depth-two,.data-depth-three, .data-depth-four');
      //step=depthMinus(step, marginPlus, marginMinus);
    }
    if(step==1){
      $(' .data-depth-two,.data-depth-three, .data-depth-four').addClass('hidden').addClass('hidden').find("li a").css("opacity","inherit");
      if(!hasChildren($(event.target))){
        leftColumn(step);
        resetColumnOpacity(step);
        return step-=1;
      }
    }
    if(step==2){
      $('.data-depth-three, .data-depth-four').addClass('hidden').addClass('hidden').find("li a").css("opacity","inherit");
      step=depthMinus(step, marginPlus, marginMinus);
    }

    $(event.target).parent().children("ul").removeClass('hidden').length
     
    
  }
  else {
    if($(event.target).parent().children("ul").addClass('hidden').length)
     step=depthMinus(step, marginPlus, marginMinus);
 }
 return step;
}

