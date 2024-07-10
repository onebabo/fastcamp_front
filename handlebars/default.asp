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
</head>
<body>
	<div id="page">
		<div id="gDimmed"></div>
		<!-- #include virtual= "/include/header.asp"-->
		<article>
			<%Dim naviTitle : naviTitle = "학습현황"%>
			<!-- #include virtual= "/include/commonNav.asp"-->
			<div class="bl_cst">
				<div class="speedTitle">학습현황</div>



<%' html 시작 %>
				<div class="contentBox mybaeoom" id="shortcutToBody">
        <%' 나의 강의실 info 시작   %>
          <ol class="sub_menu">
						<li>HOME</li>
						<li>나의 강의실</li>
						<li class="blueColor">나의 강의실 info</li>
					</ol>
					<h1 class="bbnone">나의 강의실 info</h1>
					<div class="blueBord2 flex">
						<div class="p20 blueBack relative" style="flex: 1 240px; max-width: 240px;">
                            <h2 class="mt0 f34"><%= login_name %> <span class="f18" style="color:#CCEEF7">님</span></h2>
							<div class="selectArrow">
								<select name="opening" id="cont-opening__fetch" title="개강일 선택">
									<option value="">개강일 선택</option>
								</select>
							</div>
						</div>
						<div class="p20 flex" style="flex: 2 520px">
							<div class="innerBox" style="min-width: 220px;">
								<h2 class="mt0">학습현황</h2>
								<ul class="dash" id="cont-count__fetch">
									<li class="b"><span class="grayColor n">학습중인 과목</span> <b class="blueColor">-</b> 과목</li>
									<li class="b"><span class="grayColor n">학습예정 과목</span> <b class="blueColor">-</b> 과목</li>
									<li class="b"><span class="grayColor n">학습질문</span> <a href="#" class="blueColor wauto">-</a> 건</li>
									<li class="b"><span class="grayColor n">무료특강</span> <a href="#" class="wauto">-</a> 강좌</li>
								</ul>
							</div>
							<div class="innerBox1" style="min-width: 300px;">
								<h2 class="mt0">학습설계<a href="/plan/plan_list.asp" class="graybtn3 fr n f12"><span class="WA">학습설계</span>더보기 +</a></h2>
								<ul class="dash" id="cont-design__fetch">
									<li>불러오는 중...</li>
								</ul>
							</div>
						</div>
					</div>
					<div class="mt10 left redColor font_bold f13">한 학기 최대 8과목(24학점), 1년 내 최대 14과목(42학점) 까지만 학점인정 가능<br/>전문학사학위 과정의 경우 교육기관 최대 20과목, 학사학위 과정의 경우 최대 35과목 까지만 수강 가능 </div>
			
        <%' 나의 강의실 info 끝  %> 




					<!-- 20220804 dj 대면수업 및 실습수업 일정 -->
          <!--
					-->
					<div id="cont-face_schedule"></div>
          <!-- // 20220804 dj 대면수업 및 실습수업 일정 -->

					<div class="w100 hide classroom-popup mt50" id="classroom-guide">
						<div class="grayBord padding0 lightgrayBack btg">
							<div class="flex" style="padding:15px 0;">
								<dl class="w100">
									<dt class="f16 b mb5"><a class="bluebtn p5 mb5 w75 " href="/mybaeoom/mybaeoom_changeinfo.asp" target="_self">개인정보 수정하기</a></dt>
									<dd class="f13">학습자님의 학사지도를 위해 <br/>정확한 개인정보확인이 필요합니다.</dd>
								</dl>
								<dl class="w100 blg">
									<dt class="f16 b mb5"><a class="bluebtn p5 mb5 w75 " href="/customer/cs_gate_info.asp">공동인증서 안내</a></dt>
									<dd class="f13">학습 진행을 위하여 반드시 범용공동 <br/>인증서(개인범용) 로그인이 필요합니다.</dd>
								</dl>
								<dl class="w100 blg">
									<dt class="f16 b mb5"><a class="bluebtn p5 mb5 w75 " href="/mybaeoom/my_com.asp">수강컴퓨터 등록</a></dt>
									<dd class="f13">학습을 진행하기 전에 <br/>수강컴퓨터 등록이 필요합니다.</dd>
								</dl>
							</div>
							<div class="closeDay btg lightgrayBack2 right p5">
								<a href="#" class="wauto f13 ml30 b" data-button="today" data-value="14">2주간 보지 않기</a>
								<a href="#" class="wauto f13 ml30 b" data-button="close">닫기 X</a>
							</div>
						</div>
					</div><!-- //.classroom-popup -->

					<div class="viewbtnWrap right mt40">
						<div class="viewbtnZip grayBord inblock">
							<button type="button" class="simplyviewBtn" data-button="viewmode" data-value="simpleView">간단히보기</button>
							<button type="button" class="detailviewBtn" data-button="viewmode" data-value="">자세히보기</button>
						</div>
					</div>
					
					<div id="cont-classroom__fetch"></div>


				</div><!-- //#mybaeoom.contentBox -->

<%' html 끝 %>




			</div>
		</article>
		<!-- #include virtual= "/include/footer.asp"-->
	</div>
	<!-- #include virtual= "/include/leftPanel.asp"-->
	<!-- #include virtual= "/include/rightPanel.asp"-->
	<!-- #include virtual= "/include/commonScriptPanel.asp"-->






<%' script 시작 %>
<form action="/plan/plan_online10.asp" method="POST" id="frm-design" enctype="multipart/form-data">
		<input type="hidden" name="plantype" value="">
		<input type="hidden" name="num" value="">
		<input type="hidden" name="ModType" value="1">
	</form>

	<script id="tmpl-count__fetch" type="text/x-handlebars-template">
		<li class="b"><span class="grayColor n">학습중인 과목</span> <b class="blueColor">{{ comma classroom_cnt }}</b> 과목</li>
		<li class="b"><span class="grayColor n">학습예정 과목</span> <b class="blueColor">{{ comma classroom_before_cnt }}</b> 과목</li>
		<li class="b"><span class="grayColor n">나의질문</span> <a href="/mybaeoom/my_qustion.asp" class="blueColor wauto">{{ comma learning_qna_cnt }}</a> 건</li>
		<li class="b"><span class="grayColor n">무료특강</span> <a href="/NonContents/list_class.asp" class="wauto">{{ comma free_classroom_cnt }}</a> 강좌</li>
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
  <script id="tmpl-opening__fetch" type="text/x-handlebars-template">
		<option value="">개강일 선택</option>
    {{# rows }}
    <option value="opening_{{ opening_id }}">{{ opening_year }}년 {{ opening_semester}}학기 {{ formatDate opened_at 'MM월 DD일'}} 개강</option>
    {{/ rows }}
  </script>
	<script id="tmpl-classroom__fetch" type="text/x-handlebars-template">
		{{# unless rows }}
		<div class="cbEx center">
			<p class="mb20 f16 center">학습중인 강의 없습니다.</p>
			<a href="/LectureN/" class="btn btn-blue f16 wauto">수강신청하기</a>
		</div>
		{{/ unless }}
		{{# rows }}
		<div id="opening_{{ opening_id }}" class="opening mb70">
			<h2 class="pb10 b opening__title">
				{{ opening_year }}년 {{ opening_semester}}학기 {{ formatDate opened_at 'MM월 DD일'}} 개강 
				<b class="grayColor ml10">| 학습기간 : {{ formatDate opened_at 'YYYY.MM.DD'}} ~ {{ formatDate closed_at 'YYYY.MM.DD'}} | 총 <span class="orangeColor">{{ comma count }}</span> 과목</b>
				<ul class="colorBoard fr mt5">
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
			<div class="mt50 row">
				<div class="fl">
					<a href="/eduN/?{{ classid }}" class="course__title wauto mt0">{{ course_name }}({{ room }}반)</a>
				</div>
				<ul class="fr">
				{{# if loaded }}
					<li class="inblock">현재 출석률 {{ attend_percent }}% |</li>
					<li class="inblock orangeColor">미출석 교시 {{ absent_count }}교시</li>
				{{/ if }}
					<li class="inblock ml5"><a href="/eduN/record/?{{ classid }}" class="graybtn4 f13">성적확인</a></li>
					<li class="inblock ml5"><a href="/eduN/?{{ classid }}" class="bluebtn f13" style="padding:4px 10px;">과목홈 가기</a></li>
				</ul>
			</div>
			<div class="lightgrayBack p10">
				<ol class="flex-wrapper" >
					{{# weeks }}
						{{# if is_view }}
							{{# if_con learnable -1 }}
								<li class="attend-circle">
									<p><b>{{ weeks }}</b><span class="week_txt">주차</span></p><span class="WA">학습예정</span>
							{{ else }}
								<li class="attend-circle {{# if learnable }}ver2{{ else }}ver1{{/ if }}">
									<svg viewBox="0 0 36 36" class="circular-chart blue" tabindex="-1" focusable="false">
										<path class="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
										{{# if attend_percent }}
										<path class="circle" stroke-dasharray="{{ attend_percent }}, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
										{{/ if }}
									</svg>
									<a href="/eduN/timetable/?classid={{ classid }}&weeks={{ weeks }}"><p><b>{{ weeks }}</b><span class="week_txt">주차</span></p><span class="WA">{{# if learnable }}학습중{{ else }}학습종료{{/ if }} {{ attend_percent }}% 진행{{# unless learnable}}(복습가능){{/ unless }}</span></a>
							{{/ if_con }}
							</li>
						{{ else }}
							<li class="attend-circle bnone"></li>
						{{/ if }}
					{{/ weeks }}
				</ol>
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
			</div><!-- //.lightgrayBack -->
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

<%' script 끝%>


















	

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
  <script src="./app.js?ver=<%=now()%>" charset="utf-8"></script>
</body>
</html>