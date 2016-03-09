(function($){


    function resizeSlider(){
        if($('#top-slider').length > 0){
            setTimeout(
                function(){
                    if($('.slider-block-descr').length > 0){
                        $('.slider-block-descr').height($('.owl-wrapper-outer').height());
                        $('.slider-descr-abs').height($('.owl-wrapper-outer').height());
                        $('.slider-block-opacity').height($('.owl-wrapper-outer').height()*0.36);
                        $('.slider-block-descr-textblock').height($('.owl-wrapper-outer').height()*0.36);
                        $('.owl-controls').height($('.owl-wrapper-outer').height()*0.36);
                        $('.slider-arrow-left').css('margin-top', $('.owl-controls').height()/2-25+'px');
                        $('.slider-arrow-right').css('margin-top', $('.owl-controls').height()/2-25+'px');

                    }

                    if($('.slider-block-descr-object').length > 0){
                        $('.slider-block-descr-object').height($('.owl-wrapper-outer').height());
                        $('.slider-descr-abs').height($('.owl-wrapper-outer').height());
                        $('.slider-block-opacity').height($('.owl-wrapper-outer').height());
                        $('.slider-block-descr-textblock').height($('.owl-wrapper-outer').height());
//                        $('.owl-controls').height($('.owl-wrapper-outer').height());
//                        $('.slider-arrow-left').css('margin-top', $('.owl-controls').height()/2-25+'px');
//                        $('.slider-arrow-right').css('margin-top', $('.owl-controls').height()/2-25+'px');

                    }


//                    $('.slider-block-descr').height($('.owl-item').height());
//                    $('.slider-descr-abs').height($('.owl-item').height());
//                    $('.slider-block-opacity').height($('.owl-item').height()*0.36);
//                    $('.slider-block-descr-textblock').height($('.owl-item').height()*0.36);
//                    $('.owl-controls').height($('.owl-item').height()*0.36);
//                    $('.slider-arrow-left').css('margin-top', $('.owl-controls').height()/2-25+'px');
//                    $('.slider-arrow-right').css('margin-top', $('.owl-controls').height()/2-25+'px');
                }, 500
            )

        }
    }

    $(document).ready(function(){

        //$(".slider-block-descr-textblock-info").fitText();


        if($('#top-slider').length > 0){
            $('#top-slider').owlCarousel(
                {
                    items:1 ,
                    singleItem: true,
                    pagination: false,
                    navigation: true,
                    navigationText: ['<i class="fa fa-chevron-left"></i>','<i class="fa fa-chevron-right"></i>']

                }
            );

            var slider = $('#top-slider').data('owlCarousel');


            $('.owl-controls').html(
                '<div class="slider-descr-abs">'+
                    '<div class="container">'+
                        '<div class="row slider-block-descr-main">'+
                            '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 ">'+
                                '<div class="slider-arrow-left"><i class="fa fa-chevron-left"></i></div>'+
                                '    <div class="slider-arrow-right"><i class="fa fa-chevron-right"></i></div>'+
                            '</div>'+
                        '</div>'+
                    '</div>'


            );

            $('.fa-chevron-right').on('click', function(){
                //debugger;
                slider.next();
            });
            $('.fa-chevron-left').on('click', function(){
                slider.prev();
            });
        }



       $('.top-block_menu-hide-button').on('mouseover',function(){
           $(this).css('border-bottom', '1px solid #fff');
           var menuhide = $('.top-block_menu-hide');
           //menuhide.css('margin-top', '96px');
//debugger;
           menuhide.show();
       });

        $('.top-block_menu-hide-button').on('mouseout',function(){
            var menuhide = $('.top-block_menu-hide');
            $(this).css('border-bottom', '1px solid #e9e9e9');
            menuhide.hide();
        });

        resizeSlider();


        //$('#demo-htmlselect').ddslick();

        $('.btn-more-object').on('click', function(){
            var pre1 = $(this).parent().find('.description-block-text');
            var pre2 = $(this).parent().find('.description-block-text-inner');

            if($(this).hasClass('btn-object-close')){
               pre2.css({'height': '100%'});
               pre1.css({'height': pre2.height()});
               pre1.removeClass('description-block-text-shadow');
               $(this).css('margin-top', '10px');
               $(this).html('Скрыть описание');
               $(this).removeClass('btn-object-close');
               $(this).addClass('btn-object-open');
           }else{
                pre2.css({'height': '80px'});
                pre1.css({'height': '80px'});
                pre1.addClass('description-block-text-shadow');
                $(this).css('margin-top', '0');
                $(this).html('Полное описание');
                $(this).removeClass('close');
                $(this).addClass('btn-object-close');
                $(this).removeClass('btn-object-open');
           }
        });


        //$('#dropdownselect').dropdown();


        $('.select-own-box').on('click', function(){
            $('.select-hidden-box').toggle();

            $('.select-item').on('click', function(){
               var selectedval = $(this).data('val');
                var html = $(this).html();
                $('.select-selected-text').html(html);
                $('[name=select-own-val]').val(selectedval);
               //console.log($(this).data('val'));
            });
        });


        $('.favourites-btn-send').on('click', function(){
            $('.toggle-block-1').hide();
            $('.toggle-block-2').show();
        });

        $('.cancel-btn').on('click', function(){
            $('.toggle-block-1').show();
            $('.toggle-block-2').hide();
        });


        function getRotationDegrees(obj) {
            var matrix = obj.css("-webkit-transform") ||
                obj.css("-moz-transform")    ||
                obj.css("-ms-transform")     ||
                obj.css("-o-transform")      ||
                obj.css("transform");
            if(matrix !== 'none') {
                var values = matrix.split('(')[1].split(')')[0].split(',');
                var a = values[0];
                var b = values[1];
                var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
            } else { var angle = 0; }
            return (angle < 0) ? angle + 360 : angle;
        }

        if($('.loadingpage .icon').length > 0){
            setInterval(function(){
                //debugger;

                var angle = getRotationDegrees($('.loadingpage .icon'))+1;//$('.loadingpage .icon').rotationInfo().deg+1;//
                //angle++;
                //if(angle < 0 ) angle--; else angle++;
                $('.loadingpage .icon').css({'transform' : 'rotate('+angle+'deg)'});
            }, 1);

        }


        if($('.favourites-block-inner-title').length > 0){
            $('.favourites-block-inner-title').on('click', function(){

                //opening box
                if($(this).hasClass('closebox')){
                    $('.favourites-open-box').animate({
                        top: '-500px'
                    }, 300);
                    $(this).find('.close').show();
                    $(this).find('.open').hide();
                    $(this).removeClass('closebox');
                    $(this).addClass('openbox');
                }else

                //closing box
                {
                    $('.favourites-open-box').animate({
                        top: '0'
                    }, 300);
                    $(this).find('.close').hide();
                    $(this).find('.open').show();
                    $(this).removeClass('openbox');
                    $(this).addClass('closebox');
                }
            });
        }


        //Развернутый поиск
        $('.options-block').on('click', function(){

            if($(this).hasClass('closeblock')){
                //debugger;
                $(this).closest('.toggletab').find('.adding-field-search').show();

                $(this).removeClass('closeblock');
                $(this).addClass('openblock');
                $(this).html('Обычный поиск');
            }else{
                $(this).closest('.toggletab').find('.adding-field-search').hide();

                $(this).removeClass('openblock');
                $(this).addClass('closeblock');
                $(this).html('Расширенный поиск');
            }

        });


        if($('.tab').length > 0){
            $('.toggletab').hide();
            $('.toggletab.tab-active ').show();

            //Табы
            $('.tab').on('click', function(){
                var tab_id = $(this).data('tab');
                resetTab();
                //debugger;
                $(this).addClass('active');
                var active_tab = $('.toggletab[data-tab='+tab_id+']');
                active_tab.addClass('tab-active');
                active_tab.show();

                $('.toggletab').find('.adding-field-search').hide();

                $('.options-block').removeClass('openblock');
                $('.options-block').addClass('closeblock');
                $('.options-block').html('Расширенный поиск');
            });

        }

        $('.allroad-btn').on('click', function(){
            //debugger;
            var roadblock = $(this).closest('.adding-field-search').find('.allroad-block');
            if (roadblock.hasClass('hideroad')){
                roadblock.removeClass('hideroad');
                roadblock.addClass('showroad');
                roadblock.show();
                $(this).html('Скрыть все');
            }else{
                roadblock.removeClass('showroad');
                roadblock.addClass('hideroad');
                roadblock.hide();
                roadblock.find('.filter-item').removeClass('active');
                $(this).html('Показать все');
            }

        });



        if($('.specfilter').length > 0){
            $('.specfilter .filter-item').on('click', function(){
                //debugger;
                var filter_id = $(this).data('filter');
                var filterbox = $('.specfilter-box[data-filter='+filter_id+']');

                if(filterbox.hasClass('hiddenbox')){
                    $(this).addClass('active');

                    filterbox.removeClass('hiddenbox');
                    filterbox.addClass('openbox');
                    filterbox.show();
                }else{
                    $(this).removeClass('active');
                    filterbox.removeClass('openbox');
                    filterbox.addClass('hiddenbox');
                    filterbox.hide();

                }
            });
        }



        if($('.main-news-item').length > 0){
            $('.main-news-item a').on('click', function(e){
                e.preventDefault();
                var item= $(this).data('news');
                $('.news-introtext').hide();
                $('.main-news-item').css('background-color', '#ffffff');

                var block = $(this);

                $('.main-news-item a').each(function(){
                    if($(this) != block){
                        $(this).removeClass('open');
                    }
                });
                $('.news-close').hide();


                if(!$(this).hasClass('open')){
                    $(this).parent().css('background-color', '#f4f4f4');
                    $(this).prev().show();
                    $(this).addClass('open');
                    $(this).parent().find('.news-introtext').show();
                    $('.news-block-inv').show();
                    $('.news-item-inv').hide();
                    $('.news-item-inv[data-news='+item+']').show();
                }else{
                    $(this).parent().css('background-color', '#ffffff');
                    $(this).removeClass('open');
                    $(this).parent().find('.news-introtext').hide();
                    $('.news-block-inv').hide();
                    $('.news-item-inv').hide();
                }
            });

            $('.news-close').on('click', function(){
                $('.news-close').hide();
                $('.main-news-item').css('background-color', '#ffffff');

                $('.main-news-item a').removeClass('open');
                $('.news-introtext').hide();
                $('.news-block-inv').hide();
                $('.news-item-inv').hide();
            });

        }



        $('.price-val .fa').on('click', function(e){
            e.preventDefault();
        });
    });

    function resetTab(){
        $('.toggletab').removeClass('tab-active');
        $('.tab').removeClass('active');
        $('.toggletab').hide();
        $('.adding-field-search .allroad-block').removeClass('showroad');
        $('.adding-field-search .allroad-block').addClass('hideroad');
        $('.adding-field-search .allroad-block').hide();
        $('.allroad-btn').html('Показать все');

    }

    $(window).resize(function(){
        resizeSlider();
    });

    $.fn.rotationInfo = function() {
        var el = $(this),
            tr = el.css("-webkit-transform") || el.css("-moz-transform") || el.css("-ms-transform") || el.css("-o-transform") || '',
            info = {rad: 0, deg: 0};
        if (tr = tr.match('matrix\\((.*)\\)')) {
            tr = tr[1].split(',');
            if(typeof tr[0] != 'undefined' && typeof tr[1] != 'undefined') {
                info.rad = Math.atan2(tr[1], tr[0]);
                info.deg = parseFloat((info.rad * 180 / Math.PI).toFixed(1));
            }
        }
        return info;
    };

})(jQuery);
