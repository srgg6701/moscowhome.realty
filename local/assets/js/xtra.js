var mobilePoint=970;

window.onload=function(){

    if(!jQuery){
        var jq=document.createElement('script');
        document.getElementsByTagName('head')[0].appendChild(jq);
        jq.src="assets/js/libs/jquery-2.2.2.min.js";
    }

    var i= 0,
        intrvl=setTimeout(function(){
            if(jQuery){
                var $=jQuery,
                    checkboxes = $('#filters-set input[type="checkbox"]'),
                    contactsPanel = $('#contacts'),
                    classFixed = 'fixed',
                    contactsPanelOffsetTop=contactsPanel.offset().top,
                    doc = $(document);

                window.removeFixed = function(){
                    if(contactsPanel.hasClass(classFixed)){
                        contactsPanel.removeClass(classFixed);
                        return true;
                    }else{
                        return false;
                    }
                };

                window.handleContactsPanel = function (desktop){
                    /*console.log({
                     'document.scrollTop()':document.scrollTop(),
                     contactsOffsetTop:contactsPanelOffsetTop });*/
                    // Зафиксировать/расфиксировать панель контактов
                    if(desktop){
                        return removeFixed();
                    }

                    if(doc.scrollTop()==contactsPanelOffsetTop){
                        if(window.innerWidth>=mobilePoint)
                            return removeFixed();
                    }

                    if(doc.scrollTop()>=contactsPanelOffsetTop){
                        if( window.innerWidth<mobilePoint
                            && !contactsPanel.hasClass(classFixed) )
                            contactsPanel.addClass(classFixed);
                    }else{
                        removeFixed();
                    }
                };

                window.handleContactsPanel();

                applyResizeChanges(jQuery);

                window.onresize = applyResizeChanges;
                window.onscroll = function(){
                    window.handleContactsPanel();
                };

                $('#test-box').on('dblclick', function(){
                    $(this).toggle('transparent')
                });
                checkboxes.on('click', function(){
                    $(this).toggleClass('checked');
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
        objectDescribeWrapper = $('#object-descr-textblock-wrapper'),
        sliderBlockDescrObj=$('#slider-block-descr-object'),
        searchBox=$('#search-box'),
        handleBlock=function(target, place, actionCheck){//, actionDo
            if(target.length&&place.length){
                console.log('Both target & place have found',
                    { target:target, place:place });
                if(actionCheck=='has' && !place.has(target).length){
                    console.log(target+' appendTo '+place);
                    target.appendTo(place);
                }else{
                    var actionDo='insert';
                    actionDo+=(actionCheck=='after')? 'Before':'After';
                    if(target[actionCheck]()[0].id!=place[0].id) {
                        console.log(place[actionCheck](target)[0].id+'=='+place[0].id,
                            target + actionDo + place);
                        target[actionDo](place);
                    }
                }
            }
        };
    window.applyResizeChanges = function(){
        var windowWidth     =window.innerWidth,
            objPhotoBlock   =$('.object-photo-block').eq(0),
            objTagsBlock    =$('.object-tags-block').eq(0),
            owlWrapperOuter =$('.owl-wrapper-outer').eq(0),
            formObjectBlock =$('.form-object-block').eq(0),
            desktop = windowWidth>=mobilePoint;

        //console.info('applyResizeChanges resize, windowWidth', { windowWidth:windowWidth});

        $('#test-box').html(windowWidth); //console.log({ windowWidth: windowWidth, place: place });

        if(desktop) {
            //console.log('applyResizeChanges >='+mobilePoint+', windowWidth: %c'+windowWidth, 'color:violet', { searchBox:searchBox, action:'insertBefore', found: found, 'sliderBlockDescrObj':sliderBlockDescrObj, objPhotoBlock:objPhotoBlock, objectTagsBlock:objTagsBlock });
            handleBlock(searchBox, found, 'after');
            handleBlock(sliderBlockDescrObj, objectDescribeWrapper, 'has');
            handleBlock(objPhotoBlock, objTagsBlock, 'before');
        }else{
            //console.log('applyResizeChanges >='+mobilePoint+', windowWidth: %c'+windowWidth, 'color:violet', { searchBox:searchBox, action:'insertAfter', found: found, 'sliderBlockDescrObj':sliderBlockDescrObj, objPhotoBlock:objPhotoBlock, objectTagsBlock:objTagsBlock });
            handleBlock(searchBox, found, 'before');
            handleBlock(sliderBlockDescrObj, owlWrapperOuter, 'before');
            handleBlock(objPhotoBlock, formObjectBlock, 'after');
        }
        window.handleContactsPanel(desktop);
    };
    applyResizeChanges();
}