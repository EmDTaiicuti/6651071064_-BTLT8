'use strict';
$('.tab').on('click',function(){const target=this.dataset.tab;$('.tab').removeClass('active').attr('aria-selected','false');$(this).addClass('active').attr('aria-selected','true');$('.tab-panel').prop('hidden',true);$('#'+target).prop('hidden',false)});
