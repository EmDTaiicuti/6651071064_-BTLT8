'use strict';
$('input[name="passport"]').on('change',function(){$('#passportField').prop('hidden',this.value!=='yes')});$('input[name="credit"]').on('change',function(){$('#creditField').prop('hidden',this.value!=='yes')});
