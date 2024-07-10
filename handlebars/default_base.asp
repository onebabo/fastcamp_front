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
	<title>배움사이버평생교육원.</title>
	<!-- #include virtual= "/include/commonMeta.asp"-->
	<!-- #include virtual= "/include/commonScript.asp"-->
	<link href="/css/common/main.css" rel="stylesheet"/>
	<link href="/css/studySupport.css" rel="stylesheet"/>
	<script type="text/javascript" src="/js/studySupport/speedConsult.js"></script>
</head>
<body>
	<div id="page">
		<div id="gDimmed"></div>
		<!-- #include virtual= "/include/header.asp"-->
		<article>
			<%Dim naviTitle : naviTitle = "학습상담지원"%>
			<!-- #include virtual= "/include/commonNav.asp"-->
			<div class="bl_cst">
				<div class="speedTitle">빠른상담</div>
				<form action="" method="post" id="frm-form" novalidate>
					<input type="hidden" name="funnels" value="<%= req_funnels_value %>">
					<div id="cont-article__result"></div>
					<ul class="couplebtn mt50" id="cont-article__footer">
						<li>
							<a href="#" class="el_cst__applyBtn bluebtn3" data-button="submit">상담신청</a>
						</li>
					</ul>
				</form>
			</div>
		</article>
		<!-- #include virtual= "/include/footer.asp"-->
	</div>
	<!-- #include virtual= "/include/leftPanel.asp"-->
	<!-- #include virtual= "/include/rightPanel.asp"-->
	<!-- #include virtual= "/include/commonScriptPanel.asp"-->


	
    <script id="tmpl-article__result" type="text/x-handlebars-template">
		{{# with article }}
		<table summary="빠른상담" class="bl_cstTB brnone blnone">
			<caption class="WA">빠른상담</caption>
			<colgroup>
				<col style="width:20%"/>
				<col/>
			</colgroup>
			<tbody>
				<tr>
					<th scope="row" class="bl_cstTH">상담선택<span class="bl_cstTB__star">*</span></th>
					<td class="bl_cstTD bl_cstTD__ttl">
						<div class="ly_flex">
						{{# each answer_methods }}
						<label class="bl_radioCircle">
							<input class="bl_radioCircle__radioInput" type="radio" name="answer_method"
								value="{{ value }}"
								data-code="{{ code }}"
								{{# if checked }}checked{{/ if }}
								{{# if disabled }}disabled{{/ if }}
								>
							<span class="bl_radioCircle__checkmark"></span> {{ label }}상담 {{# if_con code 'b' }}<br>(회원전용){{/ if_con }}
						</label>
						{{/ each }}
						<input type="hidden" name="answer_method_value" id="input-answer_method_value">
						</div>
					</td>
				</tr>
				<!-- 게시판상담 일때 노출 -->
				<tr class="bl_cstTR">
					<th scope="row" class="bl_cstTH"><label for="input-name">이름</label><span class="bl_cstTB__star">*</span></th>
					<td class="bl_cstTD"><input type="text" class=""
							name="name"
							id="input-name"
							required
							title="이름을 입력해 주세요"
							placeholder="이름을 입력해 주세요"
							value="{{ creator_name }}"
							/></td>
				</tr>
				<tr class="bl_cstTR" id="wrap-contact">
					<th scope="row" class="bl_cstTH"><label id="label-contact" for="input-contact">연락처</label><span class="bl_cstTB__star">*</span></th>
					<td class="bl_cstTD"><input type="text" class="contact" 
						name="contact"
						id="input-contact"
						required
						title="연락처를 입력해 주세요"
						placeholder="연락처를 입력해 주세요" 
						value="{{# if answer_email }}{{ email }}{{ else }}{{ phone }}{{/ if }}" />
						<div class="" id="input_phone_check_desc"></div>
						</td>
				</tr>
				<!-- // 게시판상담 일때 노출 -->
				<tr class="bl_cstTR">
					<th scope="row" class="bl_cstTH">문의유형<span class="bl_cstTB__star">*</span></th>
					<td class="bl_cstTD">
						<div class="bl_cstTab">
							{{# each categories }}
								<input type="radio" name="category" id="input-category-{{ value }}" value="{{ value }}"
									class="bl_cstTab__checkbox WA"
									{{# if checked }}checked{{/ if }}
									{{# unless is_enable_category }}disabled{{/ unless }}
									>
								<label for="input-category-{{ value }}"
									class="bl_cstTab__btn {{ tabClass @index }} {{# unless is_enable_category }}hp_inactive{{/ unless }}"
									>
									<span class="bl_cstTab__btnWrap">{{ label }}
										{{# unless is_enable_category }}<div class="mt5"><small>(수강생 전용입니다.)</small></div>{{/ unless }}
									</span>
								</label>
								<div class="bl_cstTab__cont">
									{{# each children }}
										<label class="bl_radioCircle">
											<input class="bl_radioCircle__radioInput" type="radio" name="extra_category" value="{{ value }}"
												{{# if checked }}checked{{/ if }}
												>
											<span class="bl_radioCircle__checkmark"></span> {{ label }}
										</label>
									{{/ each }}
								</div>
							{{/ each }}
						</div>
					</td>
				</tr>
				<!-- 게시판상담 일때 노출 -->
				<tr class="bl_cstTR">
					<th scope="row" class="bl_cstTH"><label for="input-title">제목</label><span class="bl_cstTB__star">*</span></th>
					<td class="bl_cstTD"><input type="text" class=""
						name="title"
						id="input-title"
						required
						title="제목을 입력해 주세요"
						placeholder="제목을 입력해 주세요"
						value="{{ title }}"
						></td>
				</tr>
				<!-- // 게시판상담 일때 노출 -->
				<tr class="bl_cstTR">
					<th scope="row" class="bl_cstTH"><label for="input-content">문의내용</label><span class="bl_cstTB__star">*</span></th>
					<td class="bl_cstTD"><textarea class=""
						name="content"
						id="input-content"
						required
						title="내용을 입력해 주세요"
						placeholder="내용을 입력해 주세요"
						>{{ content }}</textarea></td>
				</tr>
				<tr class="bl_cstTR">
					<th scope="row" class="bl_cstTH">
						<input class="bl_fileUp__originInput" id="input-file" type="file">
						<label for="input-file" class="bl_fileUp__fileBtn">파일첨부<b class="bl_fileUp__plusIcon"></b></label>
					</th>
					<td class="bl_cstTD">
						<div class="bl_fileUp">
							<div class="bl_fileUp__box" id="cont-file__list" style="min-height: 30px;">
								{{# each files }}
								<div class="bl_fileUp__list" >
									<button type="button" class="bl_fileUp__deleteBtn"
										data-file="delete"
										data-value="{{ file_id }}"
										><b class="WA">삭제</b></button>
									<a href="#" class="bl_fileUp__filename wauto" data-file="download" data-value="{{ file_id }}">{{ name }}</a>
								</div>
								{{/ each }}
							<div>
						</div>
					</td>
				</tr>
				{{# unless answer_phone }}
				<!-- 메일, 게시판상담 일때 노출 -->
				<tr class="bl_cstTR" id="wrap-allow_sms">
					<th scope="row" class="bl_cstTH">
						<label class="bl_checkBx">
							<input type="checkbox" class="bl_checkBx__checkInput"
								name="allow_sms"
								value="1"
								{{# if allow_sms }}checked{{/ if }}
								>
							<span class="bl_checkBx__checkmark"></span> 
						</label>
					</th>
					<td class="bl_cstTD">
						<div class="ly_flex">
							<span style="flex: 0 0 82px">답변문자수신 : </span>
							<input type="text"  title="휴대전화 번호를 입력해 주세요" placeholder="휴대전화 번호를 입력해 주세요"
								name="phone"
								value="{{ phone }}"
								/>
						</div>
					</td>
				</tr>
				<!-- // 메일, 게시판상담 일때 노출 -->
				{{/ unless }}
			</tbody>
		</table>
		<div class="bl_cst__note">입력하신 이름, 이메일, 연락처 등 개인정보는 개인정보처리방침에 따라 보호됩니다. <br/>개인정보는 상담문의 및 교육과정 안내 시에만 사용되며 그 외 용도로 사용되지 않습니다.
			<p class="mt5">※ 단, 동일한 정보(이름, 이메일, 연락처 등) 회원가입 시 상담내역은 연동 됩니다.</p>
			<div class="right mt20">
				<a class="blackColor wauto margin0" href="//auth.baeoom.com/auth/terms/terms_personal.jsp">개인정보처리방침 자세히보기 &gt;</a>
			</div>
		</div>
		<div class="bl_cstAgree">
			<div class="bl_cstAgree__wrap">
				<label class="bl_checkBx mr10">
					<input type="checkbox" class="bl_checkBx__checkInput"
						name="agree"
						value="1"
						{{# if article_id }}checked{{/ if }}
						>
					<span class="bl_checkBx__checkmark"></span>
					개인정보 수집 및 이용 동의
				</label>
			</div>
				<a class="blueColor wauto" href="javascript:;" title="새창팝업" onclick="window.open('//career.baeoom.com/popup/popup_cs_tomaster.asp','window_name','width=600,height=350,location=no,status=no,scrollbars=yes');">내용보기 &gt;</a>
		</div>
		{{/ with }}
    </script>
	<script id="tmpl-article__footer" type="text/x-handlebars-template">
		
		<li>
			<a href="#" class="el_cst__applyBtn bluebtn3" data-button="submit">상담신청</a>
		</li>
	</script>
	<script id="tmpl-file__list" type="text/x-handlebars-template">
		{{# each files }}
		<div class="bl_fileUp__list" >
			<button type="button" class="bl_fileUp__deleteBtn"
				data-file="delete"
				data-value="{{ file_id }}"
				><b class="WA">삭제</b></button>
			<a href="#" class="bl_fileUp__filename wauto" data-file="download" data-value="{{ file_id }}">{{ name }}</a>
		</div>
		{{/ each }}
	</script>

	<script src="/resources/js/vendor/handlebars-v4.7.6.js"></script>
	<script src="/resources/js/vendor/moment.min.js"></script>
	<script src="/resources/js/vendor//locale/ko.js" charset="utf-8"></script>
	<script src="/resources/js/vendor/partial.min.js"></script>
	<script src="/resources/js/vendor/axios.min.js"></script>
	<script src="/resources/js/dw/dw.fn.js"></script>
	<script src="/resources/js/dw/dw.tmpl.js"></script>
	<script src="/resources/js/dw/authorization.js"></script>

	<script src="https://cdnjs.cloudflare.com/ajax/libs/qs/6.11.0/qs.min.js" integrity="sha512-/l6vieC+YxaZywUhmqs++8uF9DeMvJE61ua5g+UK0TuHZ4TkTgB1Gm1n0NiA86uEOM9JJ6JUwyR0hboKO0fCng==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="/js/studySupport/cst_write.js"></script>
</body>
</html>