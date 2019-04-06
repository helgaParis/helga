(function($) {
    $.fn.diaporama = function(duration) {
        var outilsDiaporama = {
            ajoutEtiquette: function(cibles) {
                for (var i=0;cibles[i]; i++) {
                    $blockDiaporama.find(cibles[i]).each(function(index,element) {
                        $(element).attr('data','etiquette' + (index + 1));
                    });
                }
            },
            hauteurDiaporama: function() {
                $blockDiaporama.height($blockDiaporama.width() * this.ratio);
            },
            changementDiapo: function() {
                if ( $blockDiaporama.children('.active').nextAll('img').length) {
                    var $imageActive =  $blockDiaporama.children('.active');
                    $imageActive.fadeOut('calm').removeClass('active').nextAll('img').first().fadeIn('calm').addClass('active');
                    $blockDiaporama.children('p[data="' + $imageActive.attr('data') + '"]').fadeOut('calm').nextAll('p').first().fadeIn('calm');
                } else {
                    var $imageActive =  $blockDiaporama.find('.active');
                    $imageActive.fadeOut('calm').removeClass('active').parent().children('img').first().fadeIn('calm').addClass('active');
                    $blockDiaporama.children('p[data="' +  $imageActive.attr('data') + '"]').fadeOut('calm').parent().children('p').first().fadeIn('calm');
                }
            },
            debut: function() {
                jQuery.fx.speeds.calm = 600;
                this.ajoutEtiquette(['p','img']);
                $blockDiaporama.find('img').first().addClass('active');
                this.ratio = $blockDiaporama.find('img').first().height() / $blockDiaporama.find('img').first().width();
                this.hauteurDiaporama();
            },
            action: function() {
                this.debut();
                $(window).resize(function() {
                    outilsDiaporama.hauteurDiaporama();
                });
                setInterval(outilsDiaporama.changementDiapo,duration);
            }
        };
        var $blockDiaporama;
        return this.each(function() {
            if (typeof(duration) != 'number') {
                duration = 5000;
            }
            $blockDiaporama = $(this);
            outilsDiaporama.action();
        });
    };
})(jQuery);