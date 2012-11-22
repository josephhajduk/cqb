
function race_scene(director) {
    var scene = director.createScene();
    var hash= new CAAT.SpatialHash().initialize( director.width, director.height, 10, 16 );
    
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
        .centerAt(120,40)
        
    var yellow_car = new CAAT.Actor()
        .setBackgroundImage(car_yellow.getRef(),true)  
        .setSpriteIndex(12)
        .centerAt(280,180)
    
    var v = 25
    var theta = 0
    
    var walls = [
        [0,0,10,209],
        [10,0,2,122],
        [12,0,2,92],
        [14,0,2,75],
        [16,0,2,60],
        [18,0,2,40],
        [20,0,2,25],
        [22,0,2,22],
        [24,0,2,19],
        [26,0,4,16],
        [30,0,4,13],
        [34,0,5,10],
        [39,0,4,8],
        [43,0,4,6],
        [47,0,233,5],
        [280,0,10,7],
        [290,0,5,10],
        [295,0,5,12],
        [300,0,5,16],
        [305,0,5,20],
        [310,0,2,25],
        [312,0,2,40],
        [314,0,2,60],
        [316,0,2,80],
        [318,0,2,100],
        [320,0,2,109],
        [322,0,2,129],
        [324,0,2,149],
        [10,180,2,29],
        [12,190,2,19],
        [14,195,2,14],
        [16,197,2,12],
        [18,200,2,9],
        [20,202,2,7],
        [22,204,2,5],
        [24,206,5,3],
        [29,207,5,2],
        [32,208,5,1],
        [122,207,8,2],
        [130,205,5,4],
        [135,202,5,7],
        [140,199,3,10],
        [143,197,2,12],
        [145,193,2,16],
        [147,190,2,19],
        [149,186,3,23],
        [151,123,2,86],
        [149,122,2,38],
        [147,122,2,18],
        [153,125,4,18],
        [157,129,4,18],
        [161,133,4,18],
        [165,138,4,18],
        [169,141,4,18],
        [173,144,4,18],
        [177,149,4,18],
        [181,153,4,18],
        [185,157,4,18],
        [189,161,4,18],
        [193,165,4,18],
        [197,169,4,18],
        [201,172,4,18],
        [205,176,4,18],
        [209,179,4,18],
        [213,183,4,18],
        [217,186,4,18],
        [220,189,4,18],
        [223,192,4,18],
        [226,195,4,18],
        [229,197,4,18],
        [232,202,4,18],
        [235,206,4,18],
        [165,65,4,8],
        [169,65,4,10],
        [173,65,4,12],
        [177,65,4,15],
        [181,65,4,18],
        [185,65,4,22],
        [189,65,4,26],
        [193,67,4,29],
        [197,69,4,31],
        [201,72,4,32],
        [205,75,4,32],
        [209,78,4,33],
        [213,80,4,35],
        [217,83,4,36],
        [221,85,4,38],
        [225,88,4,39],
        [229,92,4,38],
        [233,95,4,39],
        [237,100,4,39],
        [241,103,4,40],
        [245,107,2,39],
        [247,109,2,39],
        [249,115,2,35],
        [251,118,2,34],
        [253,120,2,33],
        [255,126,2,30],
        [257,132,2,24],
        [259,138,2,16],
        [296,206,10,3],
        [306,203,10,10],
        [316,198,5,15],
        [321,189,5,20],
        [326,0,10,220],
        [0,209,336,5],
        [84,64,81,8],
        [77,126,2,29],
        [79,108,2,49],
        [81,81,2,73],
        [83,72,2,82],
        [85,80,2,62],
        [87,80,2,38],
        [89,80,2,16],
        [91,80,2,7],
        [93,72,2,11],
        [95,72,2,9],
        [97,72,2,7],
        [99,72,2,5],
        [101,72,2,4],
        [103,72,2,2],
    ]
    
    var wall_actors = []
    var wall_rects = []
    
    for(var i = 0; i < walls.length; i++) {
        var twall = walls[i]
    
        var wallBlock = new CAAT.Actor()
            .setPosition(twall[0],twall[1])
            .setSize(twall[2],twall[3])
            .setFillStyle("#ff10fc")  
            .setAlpha(.5)
            
        wall_rects.push( { AABB : new CAAT.Rectangle().setBounds(twall[0],twall[1],twall[2],twall[3]) } );
            
        wall_actors.push(wallBlock)
    }
    
    var wall_collision = new CAAT.Module.Collision.QuadTree().create( 0,0,336,240, wall_rects);
    
    //CAAT.enableDeviceMotion();
    
    var throtle = 0
    var steer_left = 0
    var steer_right = 0
    
    CAAT.registerKeyListener( function kl( keyEvent ) {
    
        if ( keyEvent.getKeyCode()===CAAT.Keys.UP ) {
            keyEvent.preventDefault();
            
            //v += 10
            
            throtle = ( keyEvent.getAction()==='up' ) ? -1.5 : 1;
        }
        /*if ( keyEvent.getKeyCode()===CAAT.Keys.DOWN ) {
            keyEvent.preventDefault();
            
            throtle = ( keyEvent.getAction()==='up' ) ? 0 : 1;
        }*/
        if ( keyEvent.getKeyCode()===CAAT.Keys.LEFT ) {
            keyEvent.preventDefault();
            
            //theta -= 9
            
            steer_left = ( keyEvent.getAction()==='up' ) ? 0 : 1;
            
            //keys[0]= ( keyEvent.getAction()==='up' ) ? 0 : 1;
        }
        if ( keyEvent.getKeyCode()===CAAT.Keys.RIGHT ) {
            keyEvent.preventDefault();
            
            steer_right = ( keyEvent.getAction()==='up' ) ? 0 : 1;
            //theta += 9
            //keys[1]= ( keyEvent.getAction()==='up' ) ? 0 : 1;
        }
    
    });

    var prevTime= -1;
    /*
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
            */
            
            
            
    // COLLISION
    
    var r0 = new CAAT.Rectangle();
    
    var angle_index = [5,6,7,8,9,0,11,12,13,14,15,16,17,18,19,1,10,2,3,4]
    
    scene.createTimer( scene.time, Number.MAX_VALUE, null,
        function(time, ttime, timerTask) {
    
    
            var selected = red_car
            
            var pixelsPerSecond = 76
    
            var ottime= ttime;
            if ( -1!=prevTime ) {
                ttime-= prevTime;
                
                v += throtle *1.5 //accel factor
                
                v = Math.min(v,90) // 75 is max speed
                v = Math.max(v,0)
                
                theta += steer_right *2.5 - steer_left*2.5  // 1.1 is the steering factor
                
                
                var vX = v * Math.cos(theta * Math.PI / 180)
                var vY = v * Math.sin(theta * Math.PI / 180)
                
                var dx = (ttime/1000)*(vX)
                var dy = (ttime/1000)*(vY)
                
                var ang = theta
                
                var a2 = (((ang+9)%360)+360)%360
                
                var div_angle = Math.floor(a2/18)
                
                var index = angle_index[div_angle]
                
                //console.log(Math.floor((ang-9)/18))
                //console.log(index)
                selected.setSpriteIndex(index)
    
                
                // collision
                hash.clearObject();
                
                var wall_colide = wall_collision.getOverlappingActors(
                                    r0.setBounds( selected.x + selected.width/2 + dx - 4, selected.y + selected.height/2 - 4 +dy, 8 , 8 ) 
                                    );
                                    
                if (wall_colide.length) {
                    v = v*0.8;
                    
                    
                    var dcX = 5 * Math.cos((theta+180) * Math.PI / 180)
                    var dcY = 5 * Math.sin((theta+180) * Math.PI / 180)
                    
                    // TODO verify that the new position isn't in a collided state
                    
                    selected.x += dcX
                    selected.y += dcY
                    
                } else {
                    selected.x += dx
                    selected.y += dy
                }
    
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
    
    for (var j = 0; j < wall_actors.length; j++) {
        //bg.addChild(wall_actors[j]);
    }

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
                //opening_scene(director);
                race_scene(director);
                CAAT.loop(60);
            }
        }
    );
}
