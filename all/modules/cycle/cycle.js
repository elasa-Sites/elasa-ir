(function ($) {
  Drupal.behaviors.cycle = {
    attach: function(context, settings) {
      $.each(settings.cycle, function(id, settings) {
        $('[data-cycle-setting=' + id + ']').drupalCycle(settings);
      });
    }
  };

  var methods = {
    init: function(options) {
      if (this.children().length < 2) {
        return;
      }
      var _this = this;
      this.drupalCycle('wrap');
      this.data(options.cycle_settings);
      this.data('before', function(c, n) {
         _this.drupalCycle('before', n);
      });
      if(options.navigation) {
        this.drupalCycle('addNavigation');
      }
      if (options.pager) {
        this.drupalCycle('addPager');
        this.data('pagerAnchorBuilder', methods.pagerAnchorBuilder);
      }
      this.drupalCycle('checkDimensions');

      var images = $('img', this);

      if (images.length == 0) {
        _this.cycle(_this.data());
      } else {
        images.one('load error', function() {
          _this.drupalCycle('reset', options);
        }).each(function() {
          if(this.complete) {
            $(this).load();
          }
        });
      }
      if (options.reset_on_resize) {
        $(window).bind('resize', function() {
          _this.drupalCycle('reset', options);
        });
      }
      if (options.slide_on_hover) {
        _this.hover(function() {
          _this.cycle('resume');
        }, function() {
          _this.cycle('pause');
        }).cycle('pause');
      }
      if (options.slide_on_click) {
        _this.click(function() {
          _this.cycle('next');
        });
      }
    },
    before: function(n) {
      var index = $(n).index();
      this.data('startingSlide', index);
    },
    addNavigation: function() {
      var _this = this;
      var e = '<span />';
      var navigation = {
        'prev': $(e).addClass('cycle-prev').html(Drupal.t('Previous')),
        'next': $(e).addClass('cycle-next').html(Drupal.t('Next'))
      };
      $.each(navigation, function(k,v) {
        _this.data(k,v).after(v);
      });
    },
    addPager: function() {
      var pager = $('<ul />').addClass('cycle-pager');
      if(typeof(this.data('pager_thumbnails')) == 'object') {
        pager.addClass('image-pager');
      }
      this.before(pager);
      this.data('pager', pager);
    },
    pagerAnchorBuilder: function(i) {
      var _this = $(this);
      var label = i + 1;
      _this.data('updateActivePagerLink', methods.updateActivePagerLink);

      if(typeof(_this.data('pager_thumbnails')) == 'object') {
        var thumbnails = _this.data('pager_thumbnails');
        label = $('<img/>').attr('src', thumbnails[i]);
      }

      return $('<li />').html(label);
    },
    updateActivePagerLink: function(pager, currSlide) {
      var clsName = 'active';
      pager.children().removeClass(clsName).eq(currSlide).addClass(clsName);
    },
    checkDimensions: function() {
      var dimensions = new Array('height', 'width');
      var _this = this;
      $.each(dimensions, function(k, v) {
        var dimension = _this.data(v);
        if(typeof(dimension) != 'undefined') {
          _this.css({width: dimension});
        }
      });
    },
    reset: function(options) {
      this.children('.slide').removeAttr('style').end()
      .removeAttr('style').cycle('destroy').cycle(this.data());
      if (options.slide_on_hover) {
        this.cycle('pause');
      }
    },
    wrap: function() {
      if (this.parent('.cycle-wrapper').length == 0) {
        var wrapper = $('<div />').addClass('cycle-wrapper');
        this.wrap(wrapper);
      }
    }
  };

  $.fn.drupalCycle = function(method) {
    if (methods[method]) {
      return methods[ method ].apply(this, Array.prototype.slice.call(arguments,1));
    }
    else if (typeof method === 'object' || ! method) {
      return methods.init.apply(this, arguments);
    }
  };

}) (jQuery);
