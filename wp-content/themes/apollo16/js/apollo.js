jQuery(document).ready(function($) {
  $(document).delegate('.pricing .rwmb-input input[type="text"]', 'blur paste change', function(){
    var raw = $(this).val();
    $(this).val(accounting.formatMoney(raw));
  });
});
