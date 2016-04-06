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

                var filterManager =$('#filter-manager'),
                    showFilters = $('[data-action="show-filters"]', filterManager),
                    sendByEmailBox = $('>.send-by-email', filterManager),
                    sendByEmail = $('[data-action="send-by-email"]', filterManager),
                    showFavorites = $('[data-action="show-favorites"]', filterManager),
                    emailHide = $('[data-action="hide"]', filterManager),
                    emailForm = $('form', filterManager),
                    hiddenClass = 'hidden';

                filterManager.on('click', function(event){

                    switch (event.target) {
                        case showFilters[0]:
                            console.log('showFilters');
                            showFilters.addClass(hiddenClass);
                            sendByEmailBox.removeClass(hiddenClass);
                            //console.log({showFilters:showFilters, sendByEmail:sendByEmail});
                            break;
                        case sendByEmail[0]:
                            console.log('sendByEmail');
                            sendByEmail.addClass(hiddenClass);
                            emailForm.slideDown();
                            //showEmailForm();
                            break;
                        case showFavorites[0]:
                            console.log('showFavorites');
                            break;
                        case emailHide[0]:
                            console.log('emailHide');
                            emailForm.slideUp();
                            showFilters.removeClass(hiddenClass);
                            sendByEmail.removeClass(hiddenClass);
                            sendByEmailBox.addClass(hiddenClass);
                            break;
                    }
                });

                /*function showEmailForm(){
                    console.log('showEmailForm');
                    emailForm.slideUp();
                }*/

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
        handleDOMBlocksOrder=function(target, place, actionCheck, reverse){
            if(target.length&&place.length){
                //console.groupCollapsed('handleDOMBlocksOrder');
                    /*console.log('Both target & place have found',
                        { target:target, place:place });*/
                if(actionCheck=='has' && !place.has(target).length){
                    //console.log(target[0]);console.log('%cappendTo', 'color:blue');console.log(place[0]);
                    target.appendTo(place);
                }else{
                    var actionDo='insert',
                        checkAction=(reverse)? 'before':'after',
                        elementToGet=target[actionCheck]();
                    actionDo+=(actionCheck==checkAction)? 'Before':'After';
                    /*console.group('%ccheck target or place', 'background-color:yellow');
                        console.log({
                            '1 elementToGet[0].id':elementToGet[0].id,
                            '2 place[0].id':place[0].id,
                            '3 reverse':reverse,
                            'actions':{
                                actionCheck:actionCheck,
                                actionDo:actionDo
                            },
                            arguments:arguments
                        }); //console.trace();
                    console.groupEnd();*/
                    // target[after]()[0].id!=place[0].id
                    //   target[insertBefore](place);
                    // target[before]()[0].id!=place[0].id
                    //   target[insertAfter](place);
                    if(!elementToGet[0] ||
                        elementToGet[0].id!=place[0].id ) {
                        //console.log(place[actionCheck](target)[0].id+'=='+place[0].id);
                        /*console.log('%cПерестановка', 'color: brown', {
                            '0 target':target[0],
                            '1 actionDo':actionDo,
                            '2 place':place[0]
                        });*/
                        target[actionDo](place);
                    }
                }
                //console.groupEnd();
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
            //console.log('applyResizeChanges >='+mobilePoint+', windowWidth: %c'+windowWidth, 'color:orange');
            handleDOMBlocksOrder(searchBox, found, 'after'); // defined on the top
            handleDOMBlocksOrder(sliderBlockDescrObj, objectDescribeWrapper, 'has');
            // фото на стр. объекта
            handleDOMBlocksOrder(objPhotoBlock, objTagsBlock, 'after', true);
            handleDOMBlocksOrder(villageHeader, villageCard, 'before', true);
            handleDOMBlocksOrder(villageInfo, villageCard, 'has');
        }else{ // go mobile
            //console.log('applyResizeChanges <'+mobilePoint+', windowWidth: %c'+windowWidth, 'color:violet');
            handleDOMBlocksOrder(searchBox, found, 'before');
            handleDOMBlocksOrder(sliderBlockDescrObj, owlWrapperOuter, 'before');
            // фото на стр. объекта
            handleDOMBlocksOrder(objPhotoBlock, formObjectBlock, 'before', true);
            handleDOMBlocksOrder(villageHeader, villageCard, 'after', true);
            handleDOMBlocksOrder(villageInfo, villageHeader, 'has');
        }
        window.handleContactsPanel(desktop);
    };
    applyResizeChanges();
}