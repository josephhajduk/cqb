var RACER = {
    debug: true
}

function __init(cocoonjs)   {
    
    if (!cocoonjs)
        CAAT.DEBUG=1;
    
    var director = new CAAT.Director().
            initialize(336,240,document.getElementById('main')).
            setClear(false);

    if(!cocoonjs) {
        director.enableResizeEvents(16);
        $(window).load(function() {
            $(window).bind('resize',function(event){
                window.scrollTo(0,0);
                director.windowResized($(window).width() - 30, $(window).height() - 30);
                
                topOffset = Math.floor(($(window).height() - $("#main").height())/2)
                leftOffset = Math.floor(($(window).width() - $("#main").width())/2)
                
                $("#screen_area").css({ 
                    position: 'absolute',
                    top: topOffset,
                    left: leftOffset
                })
        });
            
        $(window).bind('orientationchange',
            function(event){
                if (window.orientation == 90 || window.orientation == -90 || window.orientation == 270) {
                    $('meta[name="viewport"]').attr('content', 'height=device-width,width=device-height,initial-scale=1.0,maximum-scale=1.0');
                } 
                else {
                    $('meta[name="viewport"]').attr('content', 'height=device-height,width=device-width,initial-scale=1.0,maximum-scale=1.0');
                };
                $(window).trigger('resize');
            }).trigger('orientationchange');
        });
    }

    new CAAT.ImagePreloader().loadImages(
        [
            {id:'splash_bad',       url:'img/bad.png'},
            {id:'splash_lands',     url:'img/lands.png'},
            {id:'splash_car',       url:'img/car.png'},
            {id:'splash_splash',    url:'img/splash.png'},
            {id:'thecity_base',     url:'img/thecity/base.png'},
            {id:'thecity_shadows',  url:'img/thecity/shadows.png'},
            {id:'thecity_above',    url:'img/thecity/above.png'},
            {id:'car_blue',         url:'img/car/car_blue.png'}, 
            {id:'car_yellow',         url:'img/car/car_yellow.png'}, 
            {id:'car_red',         url:'img/car/car_red.png'}
        ],
        function( counter, images ) {
            if(counter === images.length) {
                director.setImagesCache(images);

                test_track_def = test_track(director);
                player_car = new car(director,"blue");

                player_car.setPosition(50,50)

                test_track_def.cars = [player_car];
                track_scene(director,test_track_def,player_car)

                CAAT.loop(60);
            }
        }
    );
}
