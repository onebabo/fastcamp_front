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

	<script id="tmpl-classroom__summary" type="text/x-handlebars-template">
			<div class="mt10 row">
				<div class="fl">
					<a href="/eduN/?{{ classid }}" class="course__title wauto ml10 mt0">{{ course_name }}({{ room }}반)</a>
				</div>
				<ul class="fr">
				{{# if loaded }}
					<li class="inblock">현재 출석률 {{ attend_percent }}% |</li>
					<li class="inblock orangeColor">미출석 교시 {{ absent_count }}교시</li>
				{{/ if }}
				</ul>
			</div>
			<div class="progress-table">
				<table>
					<thead>
						<tr>
							<th>주차</th>
							<th>진도율</th>
						</tr>
					</thead>
					<tbody>
					{{# weeks }}	
					
						{{# if_con learnable -1 }}
							<tr>
								<td><p><b>{{ weeks }}</b><span class="week_txt">주차</span></p></td>
								<td>{{attend_percent}}%</td>
							</tr>
						{{/ if_con }}
					{{/ weeks }}
					</tbody>
				</table>
			</div>

<!--				
<ol class="flex-wrapper" >
    {{# weeks }}
        {{# if is_view }}
            {{# if_con learnable -1 }}
                <li class="attend-circle">
                    <p><b>{{ weeks }}</b><span class="week_txt">주차</span></p><span class="WA">학습예정</span>
                </li>
            {{ else }}
                <li class="attend-circle {{# if learnable }}ver2{{ else }}ver1{{/ if }}">
                    <svg viewBox="0 0 36 36" class="circular-chart blue" tabindex="-1" focusable="false">
                        <path class="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
                        {{# if attend_percent }}
                        <path class="circle" stroke-dasharray="{{ attend_percent }}, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
                        {{/ if }}
                    </svg>
                    <a href="/eduN/timetable/?classid={{ classid }}&weeks={{ weeks }}">
                        <p>
                            <b>{{ weeks }}</b>
                            <span class="week_txt">주차</span>
                        </p>
                        <span class="WA">
                            {{# if learnable }}학습중{{ else }}학습종료{{/ if }} {{ attend_percent }}% 진행{{# unless learnable}}(복습가능){{/ unless }}
                        </span>
                    </a>
                </li>
            {{/ if_con }}

        {{ else }}
            <li class="attend-circle bnone"></li>
        {{/ if }}
    {{/ weeks }}
</ol>
-->
				<!-- 주요 평가항목 시작 -->
	<!--			 
				<ul class="flex-wrapper" style="justify-content: space-between;">
					{{# unless evalueds }}
						<li></li><li></li><li></li><li></li>
					{{/ unless }}
					{{# evalueds }}
						{{# if_con evalued_id 'USR_EVAL_ATTENDANCE' }}
						{{ else }}
						<li>
							<a href="/eduN/{{ parseDir evalued_id }}/?{{ classid }}">{{ menu_name }}
							<span>
							{{# if is_show_status }}
								{{# if_count evalued_id }}{{ status }}건{{ else }}{{{ namedStatus status evalued_id }}}{{/ if_count }}
							{{ else }}
								{{ formatDate opened_at 'MM.DD' }} ~ {{ formatDate closed_at 'MM.DD' }}
							{{/ if }}
							</span></a>
						</li>
						{{/ if_con }}
					{{/ evalueds }}
				</ul>
-->				
				<!-- 주요 평가항목 끝 -->

			</><!-- //.lightgrayBack -->
	</script>



<%' script 끝 %>


<% ' 미사용 시작 %>
	<form action="/plan/plan_online10.asp" method="POST" id="frm-design" enctype="multipart/form-data">
		<input type="hidden" name="plantype" value="">
		<input type="hidden" name="num" value="">
		<input type="hidden" name="ModType" value="1">
	</form>

  <script id="tmpl-opening__fetch" type="text/x-handlebars-template">
		<option value="">개강일 선택</option>
    {{# rows }}
    <option value="opening_{{ opening_id }}">{{ opening_year }}년 {{ opening_semester}}학기 {{ formatDate opened_at 'MM월 DD일'}} 개강</option>
    {{/ rows }}
  </script>

  <script id="tmpl-design__fetch" type="text/x-handlebars-template">
    {{# rows }}
    <li>{{# if_con status '9' }}<span class="ellipsis"><s>{{ goal_name }}</s></span><s>설계 취소</s>
			{{ else }}<a href="{{# if_con status '1' }}/plan/plan_online10_Make.asp{{ else }}/plan/plan_online10.asp{{/ if_con }}" class="ellipsis left" data-button="design" data-value="{{ design_id }}" data-type="{{ design_type }}">{{ goal_name }}</a>{{# if_con status '1' }}<span class="blueColor">설계완료</span>
				{{  else }}진행 중
				{{/ if_con }}
			{{/ if_con }}
		</li>
    {{/ rows }}
  </script>

	<script id="tmpl-count__fetch" type="text/x-handlebars-template">
		<li class="b"><span class="grayColor n">학습중인 과목</span> <b class="blueColor">{{ comma classroom_cnt }}</b> 과목</li>
		<li class="b"><span class="grayColor n">학습예정 과목</span> <b class="blueColor">{{ comma classroom_before_cnt }}</b> 과목</li>
		<li class="b"><span class="grayColor n">나의질문</span> <a href="/mybaeoom/my_qustion.asp" class="blueColor wauto">{{ comma learning_qna_cnt }}</a> 건</li>
		<li class="b"><span class="grayColor n">무료특강</span> <a href="/NonContents/list_class.asp" class="wauto">{{ comma free_classroom_cnt }}</a> 강좌</li>
	</script>

	<script id="tmpl-face_schedule" type="text/x-handlebars-template">
		<div class="bl_schedule">
			<button type="button" class="bl_schedule__btn on">대면수업 및 실습수업 일정 <span class="bl_schedule__btnTxt"></span></button>
			<div class="js_scheduleTB__wrap">
				<table summary="대면수업 및 실습수업 일정" class="bl_scheduleTB">
					<caption class="WA">대면수업 및 실습수업 일정</caption>
					<colgroup>
						<col/>
						<col style="width:33.333%"/>
						<col style="width:33.333%"/>
					</colgroup>
					<thead>
						<tr>
							<th scope="col" class="bl_scheduleTB__th">과목명</th>
							<th scope="col" class="bl_scheduleTB__th">출석일</th>
							<th scope="col" class="bl_scheduleTB__th">강의실</th>
						</tr>
					</thead>
          <%
						'			<li>출석 {{ seq }}회차 {{ formatDate opened_at 'YYYY-MM-DD(dd) HH' }}-{{ formatDate closed_at 'HH' }}시</li>
          %>
					<tbody>
						{{# rows }}
						<tr>
							<th scope="row" class="bl_scheduleTB__subject">{{ course_name }}({{ room }}반)
							{{# if_con course_code '295' }}
								<div class="caution redColor f11 n">종전법(120시간) 대상자의 경우, 1회 온라인 강의 + 2회 결과보고서로 출석 세미나 인정</div>
							{{/ if_con }}
							</th>
							<td class="bl_scheduleTB__date">
								<ul class="bl_scheduleTB__dateList">
                  {{# if schedules }}   
                    {{#   schedules }}
                      {{# if_con ../course_type '3' }}
                      <li>{{ formatDate opened_at 'YYYY-MM-DD(dd)' }}</l>
                      {{ else }}
                          {{# if_con typeValue '2' }} 
                              <li>출석 {{ seq }}회차 {{ formatDate opened_at 'YYYY-MM-DD(dd) HH' }}-{{ formatDate closed_at 'HH' }}시</li>
                            {{ else }}
                              <li>출석일 {{ formatDate opened_at 'YYYY-MM-DD(dd) HH' }}-{{ formatDate closed_at 'HH' }}시</li>
                            {{/ if_con }}
                      {{/ if_con }}
                    {{/ schedules }}
                  {{ else }}
                    미확정 (추후공지)
                 	{{/ if }}
								</ul>
							</td>
							<td><a class="bl_scheduleTB__placeBtn" href="//map.daum.net/link/map/{{ inst_name }},{{ lat }},{{ lng }}" target="_blank">{{ inst_name }}</a></td>
						</tr>
						{{/ rows }}
					</tbody>
				</table>
			</div>
		</div>
	</script>

<% ' 미사용 끝 %>

	
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
  <script src="./app_simple.js?ver=<%=now()%>" charset="utf-8"></script>
</body>
</html>