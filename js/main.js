
function race_scene(director) {
    var scene = director.createScene();
    
    var bg = new CAAT.ActorContainer()
        .setBounds(0,0,director.width,director.height)
        .setFillStyle('#000')
        
    scene.addChild(bg);
    
    var map_name = "thecity"
    
    var base = new CAAT.SpriteImage()
        .initialize(director.getImage(map_name+"_base"),1,1)
    
    var shadows = new CAAT.SpriteImage()
        .initialize(director.getImage(map_name+"_shadows"),1,1)
        
    var above = new CAAT.SpriteImage()
        .initialize(director.getImage(map_name+"_above"),1,1)
        
    var car_blue = new CAAT.SpriteImage()
        .initialize(director.getImage("car_blue"),1,20)
    var car_yellow = new CAAT.SpriteImage()
        .initialize(director.getImage("car_yellow"),1,20)
    var car_red = new CAAT.SpriteImage()
        .initialize(director.getImage("car_red"),1,20)
        
    var actor_base = new CAAT.Actor()
        .setBackgroundImage(base.getRef(),true)
          
    var actor_shadows = new CAAT.Actor()
        .setBackgroundImage(shadows.getRef(),true)  
        .setAlpha(.6)
        
    var actor_above = new CAAT.Actor()
        .setBackgroundImage(above.getRef(),true)    
        
    var blue_car = new CAAT.Actor()
        .setBackgroundImage(car_blue.getRef(),true)  
        .setSpriteIndex(5)
        .centerAt(85,50)
        
    var red_car = new CAAT.Actor()
        .setBackgroundImage(car_red.getRef(),true)  
        .setSpriteIndex(1)
        .centerAt(60,120)
        
    var yellow_car = new CAAT.Actor()
        .setBackgroundImage(car_yellow.getRef(),true)  
        .setSpriteIndex(12)
        .centerAt(280,180)
        
    bg.addChild(actor_base);
    bg.addChild(blue_car);
    bg.addChild(red_car);
    bg.addChild(yellow_car);
    bg.addChild(actor_shadows);
    bg.addChild(actor_above);    

}

function opening_scene(director) {

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
            {id:'car_red',         url:'img/car/car_red.png'}, 
        ],
        function( counter, images ) {
            if(counter === images.length) {
                director.setImagesCache(images);
                //opening_scene(director);
                race_scene(director);
                CAAT.loop(60);
            }
        }
    );
}
