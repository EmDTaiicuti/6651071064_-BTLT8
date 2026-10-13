'use strict';
$('#togglePassword').on('click',function(){const p=$('#password'),show=p.attr('type')==='password';p.attr('type',show?'text':'password');$(this).attr({'aria-pressed':String(show),'aria-label':show?'Ẩn mật khẩu':'Hiện mật khẩu'}).text(show?'◎':'◉')});
