(function() {
    function __scene(director) {
    
        var scene= director.createScene();
    
        var bg = new CAAT.ActorContainer().
                setBounds(0,0,director.width,director.height).
                setFillStyle('#000');
    
        scene.addChild(bg);
        
        var badImage = new CAAT.SpriteImage().initialize(director.getImage('splash_bad'),1,1);
        var landsImage = new CAAT.SpriteImage().initialize(director.getImage('splash_lands'),1,1);
        var carImage = new CAAT.SpriteImage().initialize(director.getImage('splash_car'),1,1);
        var splashImage = new CAAT.SpriteImage().initialize(director.getImage('splash_splash'),1,1);

        var actorBad = new CAAT.Actor()
            .setBackgroundImage(badImage.getRef(),true)
            .addBehavior(
                new CAAT.AlphaBehavior()
                    .setFrameTime(scene.time,1000)
                    .setValues(0,1)
                );  
                      
        var actorLands = new CAAT.Actor()
            .setBackgroundImage(landsImage.getRef(),true)
            .setAlpha(0)
            .addBehavior(
                new CAAT.AlphaBehavior()
                    .setFrameTime(scene.time+500,1500)
                    .setValues(0,1)
                );
                
            
        var carPath = new CAAT.Path().setLinear(350,12, 10,12); 
        var yellowPath = new CAAT.Path().setLinear(350,21, 10,21); 
        
        var actorCarYellow = new CAAT.Actor()
            .centerAt(350,20)
            .setSize(400,6)
            .setFillStyle("#fbcb00")
            .addBehavior(
                new CAAT.PathBehavior()
                    .setFrameTime(scene.time+1000,1000)
                    .setPath(yellowPath)
                );   
            
        
        var actorCar = new CAAT.Actor()
            .centerAt(350,20)
            .setBackgroundImage(carImage.getRef(),true)
            .addBehavior(
                new CAAT.PathBehavior()
                    .setFrameTime(scene.time+1000,1000)
                    .setPath(carPath)
                );   
                
        var actorSplash = new CAAT.Actor()
            .setAlpha(0)
            .setBackgroundImage(splashImage.getRef(),true)
            .addBehavior(
                new CAAT.AlphaBehavior()
                    .setFrameTime(scene.time+2000,2000)
                    .setValues(0,1)
            );
                
        bg.addChild(actorBad)
        bg.addChild(actorLands)
        bg.addChild(actorCarYellow)
        bg.addChild(actorCar)
        bg.addChild(actorSplash)
            
    }
    
    function __init()   {
        CAAT.DEBUG=1;
        
        canvas = document.createElement("canvas");
        canvas.setAttribute("id","main");
        document.getElementById("screen_area").appendChild(canvas)
        
        var director = new CAAT.Director().
                initialize(336,240,document.getElementById('main')).
                setClear(false);
    
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
    
        new CAAT.ImagePreloader().loadImages(
            [   
                {id:'splash_bad',    url:'img/bad.png'},
                {id:'splash_lands',    url:'img/lands.png'},
                {id:'splash_car',    url:'img/car.png'},
                {id:'splash_splash',    url:'img/splash.png'},
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
