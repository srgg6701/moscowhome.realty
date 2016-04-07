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
                    filtersSet = $('#filters-set'),
                    checkboxes = $('input[type="checkbox"]', filtersSet),
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

                var filterManager = $('#filter-manager'),
                    // блок с "избранным"
                    filterFavorites = $('#filter-favorites'),
                    // контейнер для объектов в Избранном
                    favoritesContainer = $('#favorites-container'),
                    showFilters = $('[data-action="show-filters"]', filterManager),
                    // Блок управления избранным
                    sendByEmailBox = $('>.send-by-email', filterManager),
                    // "Кнопка" "Отправить на емэйл"
                    sendByEmail = $('[data-action="send-by-email"]', filterManager),
                    // Ссылка "скрыть"
                    emailHide = $('[data-action="hide"]', filterManager),
                    // "Звёздочка"/колич. в "Избранном"
                    showFavorites = $('[data-action="show-favorites"]', filterManager),
                    // счётчик избранного в Избранном
                    favoritesCounterBox = $('h4>span', filterFavorites),
                    // Звёздочка/счётчик Избранного на его пенели
                    lodestar = $('#lodestar'),
                    // счётчик избранного на панели Избранного
                    lodestarCnt = $('>.cnt', lodestar),
                    // Форма отправки
                    emailForm = $('form', filterManager),
                    hiddenClass = 'hidden',
                    body = $('body'),
                    sTop;

                // свернуть/развернуть фильтр
                function collapseFilter(check){
                    if(check){
                        if(filtersSet.is(':visible'))
                            filtersSet.slideUp();
                    }else
                        filtersSet.slideToggle();
                }

                $('#filters-set-commands').on('click', collapseFilter);

                // добавить в Избранное или удалить из него
                $('#body-filtered').on('click', '.img-block-icon:not(#lodestar)', function(event){
                    var realtyObject = $(this).parents('a').eq(0),
                        imgSrc = realtyObject.find('img').attr('src');

                    /*console.log({
                        imgSrc:imgSrc,
                        imgSrcFavorites: $('img[src="'+imgSrc+'"]', favoritesContainer),
                        realtyObject:realtyObject
                    });*/

                    function handleIcons(ob, remove){
                        var actionGreen='addClass',
                            iconToAdd='fa-check',
                            iconToRemove='fa-star-o',
                            cnt=+favoritesCounterBox.text(),
                            lodestarCounter=lodestar.hasClass('counter');
                        if(remove){
                            actionGreen='removeClass';
                            if(remove===true){
                                iconToAdd ='fa-star-o';
                                favoritesCounterBox.text(--cnt);
                            }else
                                iconToAdd = remove;
                            iconToRemove='fa-check';
                            if(lodestarCounter&&cnt==0) lodestar.removeClass('counter');
                        }else{
                            favoritesCounterBox.text(++cnt);
                            if(!lodestarCounter) lodestar.addClass('counter');
                        }

                        lodestarCnt.text(cnt);
                        /*console.log({
                            '0 ob':ob,
                            actionGreen:actionGreen,
                            iconToAdd:iconToAdd,
                            iconToRemove:iconToRemove,
                            iconToRemoveClass:ob.find('.i')
                        });*/
                        ob[actionGreen]('green');
                        ob.find('i').removeClass(iconToRemove).addClass(iconToAdd);
                    }

                    // Удаляем из Избранного
                    if($(this).find('i.fa-close').length){
                        //console.log('remove from Favorites');
                        realtyObject.remove();
                        var source=$('#realty-objects')
                            .find('img[src="'+imgSrc+'"]')
                            .parent().find('.img-block-icon');
                        //
                        handleIcons(source, true);

                    }else if(filterFavorites.length){ // Добавляем в избранное
                        // выберем для сравнения картинку из объекта
                        if(!$('img[src="'+imgSrc+'"]', favoritesContainer).length){

                            handleIcons($(this));

                            var clone = realtyObject.clone();
                            favoritesContainer.prepend(clone);
                            handleIcons(clone.find('.img-block-icon'), 'fa-close');
                        }
                    }
                });

                filterManager.on('click', function(event){

                    switch (event.target) {
                        // Показать фильтры
                        case showFilters[0]:
                            showFilters.addClass(hiddenClass);
                            sendByEmailBox.removeClass(hiddenClass);
                            filtersSet.slideDown(10, function(){
                                sTop = body.scrollTop();
                                /*console.log('showFilters', {
                                    body: body,
                                    height: filtersSet.height(),
                                    sTop: sTop
                                });*/
                                body.animate({
                                    scrollTop:filtersSet.height()+sTop-160
                                }, 300);
                            });
                            //console.log({showFilters:showFilters, sendByEmail:sendByEmail});
                            break;
                        case sendByEmail[0]:
                            //console.log('sendByEmail');
                            sendByEmail.addClass(hiddenClass);
                            emailForm.slideDown();
                            break;
                        case showFavorites[0]:
                            //console.log('showFavorites');
                            filterFavorites.slideToggle();
                            break;
                        case emailHide[0]: // скрыть секцию отправки на емэйл и фильтр
                            console.log('emailHide');
                            emailForm.slideUp();
                            // свернуть фильтр, если развёрнут
                            collapseFilter(true);
                            showFilters.removeClass(hiddenClass);
                            sendByEmail.removeClass(hiddenClass);
                            sendByEmailBox.addClass(hiddenClass);
                            break;
                    }
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