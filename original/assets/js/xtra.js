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
        //contactsBlock=$('.contacts-block').eq(0),
        found=$('#found'),
        searchBox=$('#search-box');
    window.applyResizeChanges = function(){
        var windowWidth=window.innerWidth, place;

        console.info('applyResizeChanges resize, windowWidth', windowWidth);

        $('#test-box').html(windowWidth); //console.log({ windowWidth: windowWidth, place: place });

        if(windowWidth>=967) {
            console.info('applyResizeChanges >=967, windowWidth: %c'+windowWidth, 'color:violet');
            searchBox.after(found);
            //prevBlock=$('#investor-block2');
        }else{
            searchBox.before(found);
            //prevBlock=$('.contacts-map')[0];
        }
        //console.log({ contactBlock:contactsBlock, prevBlock:prevBlock });
        //contactsBlock.after(prevBlock);
    };
    applyResizeChanges();
}

