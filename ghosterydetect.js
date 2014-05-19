//Code to detect Ghostery. Script calls Google Analytics server to find out if Ghostery is being used to block tracking scripts.

(function ($) {
    $.GhosteryDetect = function() {
        var options = $.extend({
            support: false,
            detected: function() {},
            undetected: function() {}
        }, arguments[0] || {});

        var element = $('<IFRAME/>', {
            id: 'adserver',
            src: 'http://www.google-analytics.com/analytics.js',
            height: '300',
            width: '300',
            style: 'position: absolute; top: -1000px; left: -1000px;'
        });

        $('body').append(element);
        if (options.support)
        {
            $(options.support).append('Ghostery detected.');
        }
        setTimeout(function () {
            var adserver = $('#adserver');
            if (adserver.css('visibility') === 'hidden' || adserver.css('display') === 'none')
            {
                options.detected.call(this);
            }
            else
            {
                options.undetected.call(this);
            }
            element.remove();
        }, 300);
    };
})(jQuery);
