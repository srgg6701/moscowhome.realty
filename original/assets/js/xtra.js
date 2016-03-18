window.onload=function(){
    if(!jQuery){
        var jq=document.createElement('script');
        document.getElementsByTagName('head')[0].appendChild(jq);
        jq.src="assets/js/libs/jquery-2.2.2.min.js";
    }
    var i= 0,
        intrvl=setTimeout(function(){
            if(jQuery){
                applyResizeChanges(jQuery);
                var $=jQuery;
                window.onresize=applyResizeChanges;
                $('#test-box').on('dblclick', function(){
                    $(this).toggle('transparent')
                });

                clearInterval(intrvl);
            }
            i++;
            if(i>50){
                console.warn('jQuery не установлена');
                clearInterval(intrvl);
            }
        }, 200);
};

function applyResizeChanges(jQuery){
    var found=jQuery('#found');
    (function($){
        console.log('$', $);
        window.applyResizeChanges = function(){
            var iw=window.innerWidth, place;
            $('#test-box').html(iw);
            console.log({ iw: iw, place: place });
            place=(iw>=967)? 'after':'before';
            $('#search-box')[place](found);
        }
    }(jQuery));
}