
var collide_along_path = function(path,car) {
    // find path car is colliding with
    
    // slow down car
    
    // move it along path in direction it was traveling
        // adjust position
        // adjust direction
    
    // return the new position of it moved along the path

    return false;
}

var left = function(linea,lineb) {
    // is b1 to the left of the line from a1 to a2?
    return false
}

var intersect = function(linea,lineb) {
    // do the two lines intersect?
    return false
}

var track_scene = function(director, track_def, player_car) {    
    var scene = director.createScene();
    
    var player_car_checkpoint = 0;
    // setup player_car initial position based on start line
    
    // create a black box actor container to hold our background scene
    var background = new CAAT.ActorContainer()
        .setBounds(0,0,director.width,director.height)
        .setFillStyle('#000')

    var back_actor_img = new CAAT.SpriteImage()
        .initialize(director.getImage(track_def.background_image_id),1,1)
    var back_actor = new CAAT.Actor()
        .setBackgroundImage(back_actor_img.getRef(),true)

        
    background.addChild(back_actor)

    for(var i = 0; i < track_def.background_animations.length; i++) {
        background.addChild(track_def.background_animations[i]);
    }
        
    /// build background
    var action_container = new CAAT.ActorContainer()
        .setBounds(0,0,director.width,director.height)
    
    action_container.addChild(player_car.actor);
    
    // create a foreground container
    var foreground = new CAAT.ActorContainer()
        .setBounds(0,0,director.width,director.height)

    var fore_actor_img = new CAAT.SpriteImage()
        .initialize(director.getImage(track_def.foreground_image_id),1,1)
    var fore_actor = new CAAT.Actor()
        .setBackgroundImage(fore_actor_img.getRef(),true)

    foreground.addChild(fore_actor)

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

    // controls
    registerCarControls(player_car)

    scene.createTimer( scene.time, Number.MAX_VALUE, null,
        function(time, ttime, timerTask) {
            // do physics
            player_car.physics(time,ttime,track_def)

            new_car_x = player_car.actor.x + player_car.velocity.x * (ttime/1000)
            new_car_y = player_car.actor.y + player_car.velocity.y * (ttime/1000)
            new_car_pos = {x:new_car_x, y:new_car_y}

            // do collision with wall paths
            for( var i = 0; i < track_def.wall_paths.length; i++ ) {
                path = track_def.wall_paths[i]

                var collide = collide_along_path(path,car)
                if (collide.x) {
                    new_car_pos = collide
                    break;
                }
            }

            // do collision with dynamic_paths
            for( var i = 0; i < track_def.dynamic_paths.length; i++ ) {
                path = track_def.dynamic_paths[i]

                var collide = collide_along_path(path,car)
                if (collide.x) {
                    new_car_pos = collide
                    break;
                }
            }

            // do obstacles,  if nothing obstacled it will return false
            var obstacle = track_def.obstacles(time,player_car, player_car_checkpoint)
            if (obstacle) {
                 // obstacles can't trigger checkpoints
                 return
            }

            // do checkpoints
            var next_checkpoint_number =  (player_car_checkpoint+1)%track_def.check_points.length
            var next_checkpoint = track_def.check_points[next_checkpoint_number]
            var test_line = [player_car.actor.x, player_car.actor.y, new_car_x, new_car_y]

            if( left(next_checkpoint, test_line) ) {
                if ( intersect(next_checkpoint,test_line ) ) {
                    if(next_checkpoint_number == 0 ) {
                        // OH SHIT NEW LAP
                    }

                    player_car_checkpoint = next_checkpoint_number;
                }
            }

            player_car.actor.x = new_car_x
            player_car.actor.y = new_car_y
            player_car.point_car(player_car.direction)

        }, 
        null
    );

}