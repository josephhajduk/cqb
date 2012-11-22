var track_scene = function(director, track_def, player_car) {    
    var scene = director.createScene();
    
    // create a black box actor container to hold our background scene
    var background = new CAAT.ActorContainer()
        .setBounds(0,0,director.width,director.height)
        .setFillStyle('#000')
        
    background.addChild(track_def.background_actor)
    for(var i = 0; i < track_def.background_animations.length; i++) {
        background.addChild(track_def.background_animations[i]);
    }
        
    /// build background
    var action_container = new CAAT.ActorContainer()
        .setBounds(0,0,director.width,director.height)
    
    // create a foreground container
    var foreground = new CAAT.ActorContainer()
        .setBounds(0,0,director.width,director.height)
        
    foreground.addChild(track_def.foreground_actor)
    for(var i = 0; i < track_def.foreground_animations.length; i++) {
        foreground.addChild(track_def.foreground_animations[i]);
    }
        
    var debug = new CAAT.ActorContainer()
        .setBounds(0,0,director.width,director.height)     
    
    scene.addChild(background);
    scene.addChild(action_container);
    scene.addChild(foreground);
    if(RACER.debug) 
        scene.addChild(debug)
}