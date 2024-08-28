// console.log(11)

/**
 * 검색창 제어
 */
// 검색창 요소(.search) 찾기.

/*
// common.js 이동함 
const searchEl = document.querySelector('.search');
const searchInputel = searchEl.querySelector('input');


searchEl.addEventListener('click',function(){
  // login
  searchInputel.focus();
});

searchInputel.addEventListener('focus', function(){
  searchEl.classList.add('focused');
  searchInputel.setAttribute('placeholder','통합검색');
});


searchInputel.addEventListener('blur', function(){
  searchEl.classList.remove('focused');
  searchInputel.setAttribute('placeholder','');
});
*/


/**
 * 페이지 스크롤에 따른 요소 제어
 */


// 일정하단으로 내려가면 배지 영역 숨기기
const badegeEl = document.querySelector('header .badges');
const toTopEl = document.querySelector('#to-top')

// 상단으로 스크롤 버튼을 클릭하면,
toTopEl.addEventListener('click', function () {
  // 페이지 위치를 최상단으로 부드럽게(0.7초 동안) 이동.
  gsap.to(window, .7, {
    scrollTo: 0
  })
})


//window 객체 :화면자체
/*
window.addEventListener('scroll', function(){
  console.log('scroll!');
});
*/


//window.addEventListener('scroll', _.throttle() );


window.addEventListener('scroll', _.throttle(function(){
  //console.log('scroll!');
  //console.log('window.screenY=' + window.screenY );
  //console.log('window.scrollY=' + window.scrollY );
  if( window.scrollY >500){
    //배지 숨기기
    // badegeEl.style.display ='none' ;
    //gsap.to(요소,지속시간(초), 옵션); 
    gsap.to(badegeEl, .6, { 
      opacity : 0 ,  //투명화  (실제로는 존재함)
      display : 'none'
    } ); 

    // 상단으로 스크롤 버튼 보이기!
    gsap.to(toTopEl, .2, {
      x: 0    //X축을  제어 
    })

  // 페이지 스크롤 위치가 500px이 넘지 않으면.
  }else{
    // 배지 보이기
    // badegeEl.style.display ='block' ;
    gsap.to(badegeEl, .6, { 
      opacity : 1  ,  // 표시
      display : 'block'
    } ); 

    // 상단으로 스크롤 버튼 숨기기!
    gsap.to(toTopEl, .2, {
      x: 100   //X축을  제어 
    })

  }

}, 300 ) );     // 0.3S  

// _.throttle( 함수, 시간) 







const fadeEls = document.querySelectorAll('.visual .fade-in');

fadeEls.forEach(function(fadeEl,index) {   // 요소,  index
    
    //gsap.to(요소,지속시간(초), 옵션); 
  gsap.to(fadeEl,1,{
    //delay :  .7 ,  // 지연시간 초
    delay :  (index+1)*.7 ,  // 지연시간 초    0.7  1.4   2.1  2.7
    opacity :1

  }); 
});


/**
 * 슬라이드 요소 관리
 */
// 생성자
// Swiper      인식 : 선택자   ,  객체데이터        
//new Swiper('.notice-line .swiper-container', {
//new Swiper('.notice-line .swiper-container', {
/*
new Swiper('.notice-line .swiper-container', {
  direction: 'vertical', // 수직 슬라이드
  autoplay: true, // 자동 재생 여부
  loop: true // 반복 재생 여부
})
*/

// new Swiper('.swiper', {
//   // Optional parameters
//   direction: 'vertical'
// });

new Swiper('.notice-line .swiper-container', {
  direction: 'vertical', // 수직 슬라이드
  autoplay: true, // 자동 재생 여부
  loop: true // 반복 재생 여부
})


new Swiper('.promotion .swiper-container', {
  // direction: 'horizontal', // 수평 슬라이드
  autoplay: { // 자동 재생 여부
    delay: 5000 // 5초마다 슬라이드 바뀜
  },
  loop: true,         // 반복 재생 여부
  slidesPerView: 3,   // 한 번에 보여줄 슬라이드 개수
  spaceBetween: 10,   // 슬라이드 사이 여백
  centeredSlides: true, // 1번 슬라이드가 가운데 보이기
  pagination: {         // 페이지 번호 사용 여부
    el: '.promotion .swiper-pagination',   // 페이지 번호 요소 선택자
    clickable: true                        // 사용자의 페이지 번호 요소 제어 가능 여부   (클릭:가능여부)
  },
  navigation: { // 슬라이드 이전/다음 버튼 사용 여부
    prevEl: '.promotion .swiper-prev',  // 이전 버튼 선택자
    nextEl: '.promotion .swiper-next'   // 다음 버튼 선택자
  }
})
new Swiper('.awards .swiper-container', {
  // direction: 'horizontal', // 수평 슬라이드
  autoplay: true, // 자동 재생 여부
  loop: true, // 반복 재생 여부
  spaceBetween: 30, // 슬라이드 사이 여백
  slidesPerView: 5, // 한 번에 보여줄 슬라이드 개수
  // slidesPerGroup: 5, // 한 번에 슬라이드 할 개수(전체 개수로 나뉘어야 함)
  navigation: { // 슬라이드 이전/다음 버튼 사용 여부
    prevEl: '.awards .swiper-prev', // 이전 버튼 선택자
    nextEl: '.awards .swiper-next' // 다음 버튼 선택자
  }
})


/**
 * Promotion 슬라이드 토글 기능
 */
// 슬라이드 영역 요소 검색!
const promotionEl = document.querySelector('.promotion')
// 슬라이드 영역를 토글하는 버튼 검색!
const promotionToggleBtn = document.querySelector('.toggle-promotion')
// 슬라이드 영역 숨김 여부 기본값!
let isHidePromotion = false
// 토글 버튼을 클릭하면,
promotionToggleBtn.addEventListener('click', function () {
  // 슬라이드 영역 숨김 여부를 반댓값으로 할당!
  isHidePromotion = !isHidePromotion   /* 반대값으로 변경 */
  // 요소를 숨겨야 하면,
  if (isHidePromotion) {
    promotionEl.classList.add('hide')    /* 숨김처리 */
  // 요소가 보여야 하면,
  } else {
    promotionEl.classList.remove('hide')
  }
})



/**
 * 부유하는 요소 관리 
 */
// 범위 랜덤 함수(소수점 2자리까지)
function random(min, max) {
  // `.toFixed()`를 통해 반환된 '문자 데이터'를,
  // `parseFloat()`을 통해 소수점을 가지는 '숫자 데이터'로 변환
  return parseFloat((Math.random() * (max - min) + min).toFixed(2))
}

// 부유하는(떠 다니는) 요소를 만드는 함수
//youtobe 
function floatingObject(selector, delay, size) {

  //gsap.to( 요소,시간, 옵션{} )
  gsap.to(
    selector, // 선택자
    random(1.5, 2.5), // 애니메이션 동작 시간
    {
      y: size,                  //  `transform: translateY(수치);`와 같음. 수직으로 얼마나 움직일지 설정.
      repeat: -1,               // 몇 번 반복하는지를 설정, `-1`은 무한 반복.
      yoyo: true,               // 한번 재생된 애니메이션을 다시 뒤로 재생.
      ease: Power1.easeInOut,    // Easing 함수 적용.   타임밍   easeInOut --> Power1
      delay: random(0, delay)  // 얼마나 늦게 애니메이션을 시작할 것인지 지연 시간을 설정.
    }
  )
}
floatingObject('.floating1', 1, 15)
floatingObject('.floating2', .5, 15)
floatingObject('.floating3', 1.5, 20)


/**
 * 요소가 화면에 보여짐 여부에 따른 요소 관리
 */
// 관리할 요소들 검색!
const spyEls = document.querySelectorAll('section.scroll-spy')
// 요소들 반복 처리!


spyEls.forEach(function (spyEl) {

/*
  //new ScrollMagic.Scene().setClassToggle.add();
  new ScrollMagic
        .Scene({
          triggerElement: spyEl,
          triggerHook: .8 
        })
        .setClassToggle
        .add();

*/


  new ScrollMagic
    .Scene({                  // 감시할 장면(Scene)을 추가
      triggerElement: spyEl,  // 보여짐 여부를 감시할 요소를 지정
      triggerHook: .8         // 화면의 80% 지점에서 보여짐 여부 감시  (0~1 사이값)     0.8인 경우 setClassToggle() 실행
    })
    .setClassToggle(spyEl, 'show')        // 요소가 화면에 보이면 show 클래스 추가
    .addTo(new ScrollMagic.Controller())  // 컨트롤러에 장면을 할당(필수!)


    // 
})


/**
 * 올해가 몇 년도인지 계산
 */
/*  // common.js 이동함
const thisYear = document.querySelector('.this-year')
thisYear.textContent = new Date().getFullYear()
*/