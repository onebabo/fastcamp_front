<!-- #include virtual= "/include/commonDefine.asp"-->
<%
	dim req_funnels_value
	
	req_funnels_value = Request.QueryString("channel")

	if (not blank(getCookie_EB("inbound_id"))) then req_funnels_value = getCookie_EB("inbound_id")
	if(blank(req_funnels_value))then req_funnels_value = "M"
%>
<!DOCTYPE html>
<html lang="ko">
<head>
	<title>허브원격평생교육원</title>
	<!-- #include virtual= "/include/commonMeta.asp"-->
	<!-- #include virtual= "/include/commonScript.asp"-->
	<link href="/css/common/main.css" rel="stylesheet"/>
	<link href="/css/studySupport.css" rel="stylesheet"/>
	<link href="/css/mybaeoom_simple.css" rel="stylesheet"/>

</head>
<body>
	<div id="page">
		<div id="gDimmed"></div>
		<!-- #include virtual= "/include/header_simple.asp"-->
		<article>
			<%
				Dim naviTitle : naviTitle = ""
				'<!-- #include virtual= "/include/commonNav.asp"-->
			%>
			<div class="contentBox mybaeoom"><% ' bl_cst-> contentBox mybaeoom%>
				<div class="speedTitle">진도현황</div>
				
				<div id="cont-classroom__fetch"></div>
				<div id="cont-face_schedule"></div>


			</div>
		</article>
		<!-- #include virtual= "/include/footer_simple.asp"-->
	</div>
	<!-- #include virtual= "/include/leftPanel.asp"-->
	<!-- #include virtual= "/include/rightPanel.asp"-->
	<!-- #include virtual= "/include/commonScriptPanel.asp"-->



<%' script 시작 %>

	<script id="tmpl-classroom__fetch" type="text/x-handlebars-template">
		{{# unless rows }}
		<div class="cbEx center">
			<p class="mb20 f16 center">학습중인 강의 없습니다.</p>
			<a href="/LectureN/" class="btn btn-blue f16 wauto">수강신청하기</a>
		</div>
		{{/ unless }}
		{{# rows }}
		<div id="opening_{{ opening_id }}" class="opening mb20">
			<h2 class="pb10 b opening__title ml10">
				<div id="opening__title_openinginfo">
					{{ opening_year }}년 {{ opening_semester}}학기 {{ formatDate opened_at 'MM월 DD일'}} 개강 
				</div>
				<b class="grayColor ml0">
						학습기간 : {{ formatDate opened_at 'YYYY.MM.DD'}} ~ {{ formatDate closed_at 'YYYY.MM.DD'}} 
						총 <span class="orangeColor">{{ comma count }}</span> 과목</b>
				<ul class="colorBoard fr mt10 mr10">
					<li class="past">학습종료</li>
					<li class="present blueColor">학습중</li>
					<li class="future">학습예정</li>
				</ul>
			</h2>
			{{# courses }}
			<div class="course {{# unless enable_access }}beforeStart{{/ unless }} {{ ../view_mode }}" id="classroom{{ classid }}">
				{{> classroom__summary }}
			</div><!-- //.section.course -->
			{{/ courses }}
		</div><!-- //.section.opening -->
		{{/ rows }}
	</script>


	
	<script src="/resources/js/vendor/handlebars-v4.7.6.js"></script>
	<script src="/resources/js/vendor/moment.min.js"></script>
	<script src="/resources/js/vendor//locale/ko.js" charset="utf-8"></script>
	<script src="/resources/js/vendor/partial.min.js"></script>
	<script src="/resources/js/vendor/axios.min.js"></script>
	<script src="/resources/js/dw/dw.fn.js"></script>
	<script src="/resources/js/dw/dw.tmpl.js"></script>
	<script src="/resources/js/dw/dw.Remote.js"></script>

	<script src="/resources/js/dw/authorization.js"></script>

	<script src="https://cdnjs.cloudflare.com/ajax/libs/qs/6.11.0/qs.min.js" integrity="sha512-/l6vieC+YxaZywUhmqs++8uF9DeMvJE61ua5g+UK0TuHZ4TkTgB1Gm1n0NiA86uEOM9JJ6JUwyR0hboKO0fCng==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
  <script src="./app_onebabo.js?ver=<%=now()%>" charset="utf-8"></script>
</body>
</html>