// Generated by CoffeeScript 1.3.3

/*
 * Modal Component
 * @author hulufei
*/


(function() {

  window.Mo = window.Mo || {};

  Mo.Modal = (function() {

    Modal.prototype.defaults = {
      backdrop: true,
      keyboard: true,
      show: true
    };

    function Modal(content, options) {
      var _this = this;
      this.$modal = $(content);
      this.options = $.extend({}, this.defaults, options);
      this.$modal.on('click', '.close', function() {
        return _this.hide();
      });
      if (this.options.show) {
        this.show();
      }
    }

    Modal.prototype.show = function() {
      var _this = this;
      if (this.options.backdrop) {
        this.backdrop = this.backdrop || $('<div class="modal-backdrop"/>').appendTo('body');
        if ($('html').hasClass('lt-ie7')) {
          $('html').css({
            overflow: 'hidden'
          });
          this.backdrop.css({
            height: $(window).height()
          });
        }
      }
      this.backdrop.show();
      this.$modal.fadeIn();
      this.isShown = true;
      if (this.options.keyboard) {
        $(document).on('keyup.modal', function(e) {
          return e.which === 27 && _this.hide();
        });
      }
      return this.$modal.trigger('show');
    };

    Modal.prototype.hide = function() {
      var _this = this;
      if (this.isShown) {
        this.$modal.fadeOut(function() {
          return _this.backdrop.fadeOut();
        });
        this.isShown = false;
      }
      $(document).off('keyup.modal');
      return this.$modal.trigger('hide');
    };

    return Modal;

  })();

}).call(this);
