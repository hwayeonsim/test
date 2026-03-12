$(document).ready(function () {
  // 헤더, 푸터 로드
  $("#header_container").load("/includes/header.html", function () {
    // 헤더 로드 후 이벤트 연결
    initHeaderEvents();
  });
  $("#footer_container").load("/includes/footer.html");
  $("#contents").load("/pages/main.html", function() {
    headerMainScroll('body');
  });
});

// --------------------------
// 헤더 관련 기능
// --------------------------
function initHeaderEvents() {
 
  var clickNum = 0;

  // 모바일 햄버거 버튼 클릭
  $(document).on("click", ".mob-header .gnb-btn", function () {
    clickNum++;
    if (clickNum % 2 === 1) {
      $(this).addClass("active");
      $(".mob-gnb-wrap").fadeIn("fast");
      $(".mob-gnb-wrap .inner").animate({ right: "0%" }, 500);
      $("body, html").css("overflow-y", "hidden");
    } else {
      closeMobileMenu();
      clickNum = 0;
    }
  });

  // 모바일 메뉴 항목 클릭 시 닫기
  $(document).on("click", ".mob-gnb-wrap a", function () {
    closeMobileMenu();
    clickNum = 0;
  });
}

// --------------------------
// 모바일 메뉴 강제 닫기
// --------------------------
function closeMobileMenu() {
  $(".mob-gnb-wrap .inner").animate({ right: "-80%" }, 500, function () {
    $(".mob-gnb-wrap").fadeOut("fast");
  });
  $(".mob-header .gnb-btn").removeClass("active");
  $("body, html").css("overflow", "inherit");
}

// --------------------------
// 서브 탭 이벤트 초기화
// --------------------------
function initTabEvents() {
  $(".sub-tab").off().on("click", function () {
    const tabName = $(this).data("tab");

    // 모든 탭 & 내용 비활성화
    $(".sub-tab").removeClass("active");
    $(".sub-tab-content").removeClass("active");

    // 클릭한 탭 & 내용 활성화
    $(this).addClass("active");
    $("#" + tabName).addClass("active");
  });
}

// --------------------------
// 페이지 전환
// --------------------------
function movePage(pageUrl) {
  $("#contents").load(pageUrl, function () {
    $("html, body").scrollTop(0);
    $(".header").removeClass("on");
    $(".mob-header").removeClass("on");
    initTabEvents();

    if (pageUrl == '../pages/main.html') {
      
      headerMainScroll(window);
      
      
    } else {
      headerSubScroll();
    }
  });
  closeMobileMenu();
}

// --------------------------
// 헤더 스크롤 이벤트 (메인)
// --------------------------
function headerMainScroll(el) {
  let numEventSec1 = false;
  let numEventSec2= false;
  let scrollFlagMain = false;
  $(el).off("scroll").on("scroll", function(){
    if ($('.section-main1').length > 0) {
      if ($(window).scrollTop() >= $('.section-main1').offset().top) {
          if (!scrollFlagMain) {
            $(".header").addClass("on");
            $(".mob-header").addClass("on");
            scrollFlagMain = true;
          }
          if (!numEventSec1) {
            counterEvent('.counter1');
            numEventSec1 = true;
          }

          if ($(window).scrollTop() >= $('.section-main2').offset().top) {
            if (!numEventSec2) {
              counterEvent('.counter2')
              numEventSec2 = true;
            }
          }
      } else {
        if (scrollFlagMain) {
          $(".header").removeClass("on");
          $(".mob-header").removeClass("on");
          scrollFlagMain = false;
        }
      }
    }
  });
}

// --------------------------
// 헤더 스크롤 이벤트 (스크롤)
// --------------------------
function headerSubScroll() {
  let scrollFlagSub = false;
  $(window).on("scroll", function(){
    if($('.sub-tabs').length > 0) {
      if ($(window).scrollTop() >= $('.sub-tabs').offset().top) {
        if (!scrollFlagSub) {
          $(".header").addClass("on");
          $(".mob-header").addClass("on");
          scrollFlagSub = true;
        }
      } else {
        if (scrollFlagSub) {
          $(".header").removeClass("on");
          $(".mob-header").removeClass("on");
          scrollFlagSub = false;
        }
      }
    } 
  });
}

// --------------------------
// 카운터 이벤트
// --------------------------
function counterEvent(el) {
  document.querySelectorAll(el).forEach(counter => {
    const target = +counter.dataset.target;
    let current = 0;
    const duration = 1300;
    const frameRate = 30;
    const increment = target / (duration / frameRate);

    const update = () => {
      current += increment;
      if (current < target) {
        counter.innerText = Math.floor(current).toLocaleString();
        setTimeout(update, frameRate);
      } else {
        counter.innerText = target.toLocaleString();
      }
    };

    update();
  });
}



