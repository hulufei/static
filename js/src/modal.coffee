###
 * Modal Component
 * @author hulufei
###
window.Mo = window.Mo or {}
class Mo.Modal
  defaults:
    backdrop: true
    keyboard: true
    show: true

  constructor: (content, options) ->
    this.$modal = $(content)
    @options = $.extend({}, @defaults, options)

    # bind events
    this.$modal.on 'click', '.close', =>
      @hide()
    # show immediately
    if @options.show
      @show()

  show: ->
    if @options.backdrop
      @backdrop = @backdrop or $('<div class="modal-backdrop"/>').appendTo('body')
      # For IE6
      if $('html').hasClass('lt-ie7')
        $('html').css overflow: 'hidden'
        @backdrop.css
          height: $(window).height()
      @backdrop.show()
    this.$modal.fadeIn()
    @isShown = true

    # bind escape
    if @options.keyboard
      $(document).on 'keyup.modal', (e) =>
        e.which is 27 and @hide()
    # fire show event
    this.$modal.trigger('show')

  hide: ->
    if @isShown
      this.$modal.fadeOut =>
        if @backdrop
          @backdrop.fadeOut()
      @isShown = false

    # unbind escape
    $(document).off 'keyup.modal'
    # trigger hide event
    this.$modal.trigger('hide')
