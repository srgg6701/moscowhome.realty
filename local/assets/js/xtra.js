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
        handleBlock=function(target, place, actionCheck, reverse){//, actionDo
            if(target.length&&place.length){
                console.groupCollapsed('handleBlock');
                    console.log('Both target & place have found',
                        { target:target, place:place });
                if(actionCheck=='has' && !place.has(target).length){
                    console.log(target);console.log('appendTo');console.log(place);
                    target.appendTo(place);
                }else{
                    var actionDo='insert',
                        checkAction=(reverse)? 'before':'after',
                        elementToGet=target[actionCheck]();
                    actionDo+=(actionCheck==checkAction)? 'Before':'After';

                    /*console.groupCollapsed('%ccheck target or place', 'background-color:yellow');
                        console.log({
                            '-1 actionCheck':actionCheck,
                            '0 target':target,
                            '1 place':place,
                            '2 target[actionCheck]()[0]':target[actionCheck]()[0],
                            '3 place[0]':place[0],
                            arguments:arguments
                        });
                        console.trace();
                    console.groupEnd();*/

                    // target[after]()[0].id!=place[0].id
                    //   target[insertBefore](place);
                    // target[before]()[0].id!=place[0].id
                    //   target[insertAfter](place);

                    if(!elementToGet[0] ||
                        elementToGet[0].id!=place[0].id ) {
                        //console.log(place[actionCheck](target)[0].id+'=='+place[0].id);
                        console.log('%cПерестановка', 'color: brown', {
                            '0 target':target,
                            '1 actionDo':actionDo,
                            '2 place':place
                        });
                        target[actionDo](place);
                    }
                }
                console.groupEnd();
            }
        };
    window.applyResizeChanges = function(){
        var windowWidth     =window.innerWidth,
            objTagsBlock    =$('.object-tags-block').eq(0),
            owlWrapperOuter =$('.owl-wrapper-outer').eq(0),
            formObjectBlock =$('.form-object-block').eq(0),
            objPhotoBlock   =$('#object-photo-block'),
            villageHeader   =$('#village-header'),
            villageCard     =$('#village-card'),
            villageInfo     =$('#village-info'),
            desktop = windowWidth>=mobilePoint;

        //console.info('applyResizeChanges resize, windowWidth', { windowWidth:windowWidth});

        $('#test-box').html(windowWidth); //console.log({ windowWidth: windowWidth, place: place });
        // go desktop
        if(desktop) {
            //console.log('applyResizeChanges >='+mobilePoint+', windowWidth: %c'+windowWidth, 'color:violet', { searchBox:searchBox, action:'insertBefore', found: found, 'sliderBlockDescrObj':sliderBlockDescrObj, objPhotoBlock:objPhotoBlock, objectTagsBlock:objTagsBlock });
            handleBlock(searchBox, found, 'after'); // defined on the top
            handleBlock(sliderBlockDescrObj, objectDescribeWrapper, 'has');
            // фото на стр. объекта
            handleBlock(objPhotoBlock, objTagsBlock, 'after', true);
            handleBlock(villageHeader, villageCard, 'after');
            handleBlock(villageInfo, villageCard, 'has');
        }else{ // go mobile
            //console.log('applyResizeChanges <'+mobilePoint+', windowWidth: %c'+windowWidth, 'color:violet', { searchBox:searchBox, action:'insertAfter', found: found, 'sliderBlockDescrObj':sliderBlockDescrObj, objPhotoBlock:objPhotoBlock, objectTagsBlock:objTagsBlock });
            handleBlock(searchBox, found, 'before');
            handleBlock(sliderBlockDescrObj, owlWrapperOuter, 'before');
            // фото на стр. объекта
            handleBlock(objPhotoBlock, formObjectBlock, 'before', true);
            handleBlock(villageHeader, villageCard, 'before');
            handleBlock(villageInfo, villageHeader, 'has');
        }
        window.handleContactsPanel(desktop);
    };
    applyResizeChanges();
}