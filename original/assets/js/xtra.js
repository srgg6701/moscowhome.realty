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
    var $=jQuery,
        found=$('#found'),
        searchBox=$('#search-box');
    window.applyResizeChanges = function(){
        var windowWidth=window.innerWidth, place,
            sliderBlockDescrObj=$('.slider-block-descr-object').eq(0),
            objPhotoBlock=$('.object-photo-block').eq(0);

        console.info('applyResizeChanges resize, windowWidth', windowWidth);

        $('#test-box').html(windowWidth); //console.log({ windowWidth: windowWidth, place: place });

        if(windowWidth>=970) {
            console.info('applyResizeChanges >=967, windowWidth: %c'+windowWidth, 'color:violet');
            searchBox.after(found);
            sliderBlockDescrObj.insertAfter($('.breadcrumbs-block').eq(0));
            objPhotoBlock.insertAfter($('.object-tags-block').eq(0));
        }else{
            searchBox.before(found);
            sliderBlockDescrObj.insertAfter($('.owl-wrapper-outer').eq(0));
            objPhotoBlock.insertBefore($('.form-object-block').eq(0));
        }
    };
    applyResizeChanges();
}

