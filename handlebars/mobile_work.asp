<style>
	img{vertical-align:middle;}
	.header{background:#fff;}
	.header{position:relative;text-align:center;height:60px!important;}
	.header .leftMenu{position:absolute;top:0;left:0;margin-left:10px;line-height:60px;}
	.header .rightMenu{position:absolute;top:0;right:0;margin:36px 10px 0 0;}
	.header .rightMenu a{font-size:11px;padding-top:28px;background:no-repeat center top;margin-left:3px;font-family:NanumBarunGothic,AppleSDGothicNeo,Dotum,Arial,Helvetica,sans-serif;letter-spacing:-1px;}
	.header .centerMenu a{display:inline-block;height:60px;box-sizing:border-box;}
</style>
<header class="header">
	<div>
		<div class="leftMenu">
			<a id="leftPanelLink" href="#left-panel">
				<img src="/resources/images/mobile/icon/icon_menu.png" width="22" height="16" alt="메뉴"/>
			</a>
		</div>
		<div class="centerMenu">
			<a href="/">
				<img src="/resources/images/mobile/common/logo.png" alt="허브원격평생교육원" style="max-width:180px;padding-top:14px;"/>
			</a>
		</div>
		<div class="rightMenu">
			<% if (blank(userid)) then %>
			<!-- 로그인 전 -->
			<a href="/join/" style="background-image:url(/resources/images/mobile/common/icon_join.png);background-size:35px">회원가입</a>
			<a href="/users/login.asp" style="background-image:url(/resources/images/mobile/common/icon_login.png);background-size:26px">로그인</a>
			<% else %>
			<!-- 로그인 후 -->
			<a href="/classRoom/classRoomMain.asp" style="background-image:url(/resources/images/mobile/common/icon_lecture.png); background-size: 24px;">나의강의실</a>
			<% end if %>
		</div>
	</div>
</header>
