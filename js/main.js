(function() {
    function __scene(director) {
    
        var scene= director.createScene();
    
        var bg = new CAAT.ActorContainer().
                setBounds(0,0,director.width,director.height).
                setFillStyle('#222');
    
        scene.addChild(bg);
    
        // create a sprite image of 1 row by 6 columns
        var starsImage= new CAAT.SpriteImage().
                initialize(director.getImage('stars'), 1,6 );
    
        var T= 1000;
    
        var mouseStars= function(mouseEvent) {
    
            var actorStar= new CAAT.Actor().
                // set background image to be a reference of a SpriteImage instance
                // and set actor's size equal to a SpriteImage's subimage size
                    setBackgroundImage(
                        starsImage.getRef(), true ).
                // set background as a random SpriteImage's subimage.
                    setSpriteIndex( (Math.random()*6)>>0 ).
                // center the actor on mouse position
                    centerOn( mouseEvent.point.x, mouseEvent.point.y).
                // when the actor expires, remove in from the director
                    setDiscardable(true).
                // avoid mouse event handling.
                    enableEvents(false).
                // make this actor last to T milliseconds (1000)
                    setFrameTime(scene.time, T).
                // add a scaling behavior
                    addBehavior(
                        new CAAT.ScaleBehavior().
                            setFrameTime(scene.time, T).
                            setValues( 1,5, 1,5 ).
                            setInterpolator(
                                new CAAT.Interpolator().createExponentialInInterpolator(
                                    3,
                                    false)
                            )
                    ).
                // add an alpha behavior so the actor takes 1000 ms to fade out to zero alpha
                    addBehavior(
                        new CAAT.AlphaBehavior().
                            setFrameTime(scene.time, T).
                            setValues( 1, 0 ) );
    
            // add the actor.
            bg.addChild(actorStar);
        };
    
        // set background's mouse handlers.
        bg.mouseMove= mouseStars;
        bg.mouseDrag= mouseStars;
    }
    
    function __init()   {
    
        var director = new CAAT.Director().
                initialize(1600,900,document.getElementById('main')).
                setClear(false);
    
        director.enableResizeEvents(16);
    
        $(window).load(function() {
            $(window).bind('resize',function(event){
                window.scrollTo(0,0);
                director.windowResized($(window).width(), $(window).height());
                
                topOffset = ($(window).height() - $("#main").height())/2
                leftOffset = ($(window).width() - $("#main").width())/2
                
                $("#main").css({ 
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
    
        new CAAT.ImagePreloader().loadImages(
            [
                {id:'stars',    url:'http://labs.hyperandroid.com/static/CAAT-Samples/demos/demo-resources/img/stars.png'}
            ],
            function( counter, images ) {
                director.setImagesCache(images);
                __scene(director);
            }
        );
    
        CAAT.loop(60);
    }
    
    __init();
})();
