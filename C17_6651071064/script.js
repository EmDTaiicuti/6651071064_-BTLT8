'use strict';
$('.accordion-head').on('click',function(){const clicked=this,open=$(this).attr('aria-expanded')!=='true';$('.accordion-head').each(function(){const active=this===clicked&&open;$(this).attr('aria-expanded',String(active)).toggleClass('active',active).find('span').text(active?'−':'+');$(this).next('.accordion-body').prop('hidden',!active)});});
