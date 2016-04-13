(function ($) {

  Drupal.behaviors.google_badge_preview = {
    attach: function() {

      var style = $('#edit-google-plusone-badge-style').find(':checked').val();
      var width = $('#edit-google-plusone-badge-width').val();
      var page_id = $('#edit-google-plusone-badge-page-id').val();
      var theme = $('#edit-google-plusone-badge-theme').find(':checked').val();
      var custom_name = $('#edit-google-plusone-badge-custom-name').val();

      var query_string = '';
      var badge = '';
      var warning = '';
      var refresh_iframe = function() {
        query_string = '?pid_=' + encodeURIComponent(page_id)
                         + '&sty_=' + encodeURIComponent(style)
                         + '&wd_=' + encodeURIComponent(width)
                         + '&thm_=' + encodeURIComponent(theme)
                         + '&cm_=' + encodeURIComponent(custom_name);

        if (page_id === ''){
          warning = Drupal.t('Fill the page Id to see this preview.');
        }
        badge = warning + '<br/><iframe src="' + Drupal.settings.google_plusone_preview + query_string + '" height="560px" width="360px" frameborder="0" >Do not read this.</iframe>';
        $('#badge_preview').show().find('#demo').html(badge);
      }

      // Bindings for real time preview of the badge \o/

      $('#edit-google-plusone-badge-page-id').bind('keyup', function(){
         page_id = $(this).val();
         refresh_iframe();
      });
      $('#edit-google-plusone-badge-style').bind('change', function(){
         style = $(this).find(':checked').val();
         refresh_iframe();
      });
      $('#edit-google-plusone-badge-width').bind('keyup', function(){
         width = $(this).val();
         refresh_iframe();
      });
      $('#edit-google-plusone-badge-theme').bind('change', function(){
         theme = $(this).find(':checked').val();
         refresh_iframe();
      });
      $('#edit-google-plusone-badge-custom-name').bind('keyup', function(){
         custom_name = $(this).val();
         refresh_iframe();
      });

      // In the first load of the page, also, show the preview
      refresh_iframe();

    }
  };

})(jQuery);