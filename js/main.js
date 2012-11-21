

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
    
    var v = 25
    var theta = 0
    
    CAAT.enableDeviceMotion();
    
    CAAT.registerKeyListener( function kl( keyEvent ) {
    
        if ( keyEvent.getKeyCode()===CAAT.Keys.UP ) {
            keyEvent.preventDefault();
            
            v += 10
            
            //keys[2]= ( keyEvent.getAction()==='up' ) ? 0 : 1;
        }
        if ( keyEvent.getKeyCode()===CAAT.Keys.DOWN ) {
            keyEvent.preventDefault();
            
            v -= 10
            //keys[3]= ( keyEvent.getAction()==='up' ) ? 0 : 1;
        }
        if ( keyEvent.getKeyCode()===CAAT.Keys.LEFT ) {
            keyEvent.preventDefault();
            
            theta -= 9
            
            //keys[0]= ( keyEvent.getAction()==='up' ) ? 0 : 1;
        }
        if ( keyEvent.getKeyCode()===CAAT.Keys.RIGHT ) {
            keyEvent.preventDefault();
            
            theta += 9
            //keys[1]= ( keyEvent.getAction()==='up' ) ? 0 : 1;
        }
    
    });

    var prevTime= -1;
    
    scene.onRenderEnd = function(director, time) { 
                var ax = CAAT.rotationRate.alpha;
                if (Math.abs(ax) < 1)
                    ax =0
                
                var rx = CAAT.rotationRate.gamma;
                if (Math.abs(rx) < 1)
                    rx =0
                
                var bx = CAAT.rotationRate.beta;
                if (Math.abs(bx) < 1)
                    bx = 0
                
                theta += rx/5
                v += bx/10
                
                v = Math.min(v,50)
                v = Math.max(v,0)
            };
    
    var angle_index = [5,6,7,8,9,0,11,12,13,14,15,16,17,18,19,1,10,2,3,4]
    
    scene.createTimer( scene.time, Number.MAX_VALUE, null,
        function(time, ttime, timerTask) {
    
    
            var selected = red_car
            
            var pixelsPerSecond = 76
    
            var ottime= ttime;
            if ( -1!=prevTime ) {
                ttime-= prevTime;
                
                var vX = v * Math.cos(theta * Math.PI / 180)
                var vY = v * Math.sin(theta * Math.PI / 180)
                
                var dx = (ttime/1000)*(vX)
                var dy = (ttime/1000)*(vY)
                
                var ang = theta
                
                var a2 = (((ang+9)%360)+360)%360
                
                var div_angle = Math.floor(a2/18)
                
                var index = angle_index[div_angle]
                
                console.log(Math.floor((ang-9)/18))
                console.log(index)
                selected.setSpriteIndex(index)
    
                selected.x += dx
                selected.y += dy
    
                if ( selected.x > director.width-20 ) {
                    selected.x= director.width-20;
                } else if ( selected.x<-20 ) {
                    selected.x= -20;
                }
                if ( selected.y > director.height-20 ) {
                    selected.y= director.height-20;
                } else if ( selected.y<-20 ) {
                    selected.y= -20;
                }
            }
            prevTime= ottime;
        },
        null
    );
        
        
    bg.addChild(actor_base);
    bg.addChild(blue_car);
    bg.addChild(red_car);
    bg.addChild(yellow_car);
    //bg.addChild(actor_shadows);
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
        )
        
    actorSplash.mouseClick = function(e) {
                director.switchToNextScene(
                        2000,
                        true,
                        true
                )
            }
            
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
                opening_scene(director);
                race_scene(director);
                CAAT.loop(60);
            }
        }
    );
}
