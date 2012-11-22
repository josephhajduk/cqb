var car = function(color,start_position,start_direction) {
    this.car_image = new CAAT.SpriteImage()
        .initialize(director.getImage("car_"+color),1,20)
        
    this.actor = new CAAT.Actor()
        .setBackgroundImage(car_blue.getRef(),true)  
        .centerAt(start_position.x,start_position.y)
        
    this.point = function(point_direction) {
        var angle_index = [5,6,7,8,9,0,11,12,13,14,15,16,17,18,19,1,10,2,3,4]
        
        var a2 = (((point_direction+9)%360)+360)%360
        var div_angle = Math.floor(a2/18)
        
        var index = angle_index[div_angle]
        
        selected.setSpriteIndex(index)
    }
    
    this.point(start_direction)
        
    this.velocity = {x:0,y:0}
    this.direction = start_direction
    
    this.throttle = 0
    this.steering_direction = direction
    
    this.setPosition = function (x,y) {
        actor.centerAt(x,y)
    }
    
    this.prevTime = -1;
    
    this.stats = {
        engine_force: function(speed){return 1.5},
        aerodynamics: function(car_direction,velocity,wind) { return 1 },
        tires: function(car_direction,force,mass){ return car_direction },
        mass: 100,
    }
    
    // updates velocity of the car
    this.physics = function(time,ttime,track_def) {
        var ottime= ttime;
        if ( -1!=prevTime ) {
            ttime-= prevTime;
            var seconds = (ttime/1000)
            
            var car_direction = {
                                    x: Math.cos(this.direction * Math.PI / 180), 
                                    y: Math.sin(this.direction * Math.PI / 180)
                                }
            
            var v_abs = Math.sqrt( velocity.x*velocity.x + velocity.y*velocity.y )
            var velocity_norm = {
                                    x:velocity.x/v_abs, 
                                    y:velocity.y/v_abs
                                }
            
            var position = {x: this.actor.x, y: this.actor.y}
            var f_x = 0
            var f_y = 0
            
            // engine acceleration (in direction of the car)
            f_x += throttle * this.stats.engine_force(v_abs) * car_direction.x
            f_y += throttle * this.stats.engine_force(v_abs) * car_direction.y
            
            // air resistance (in direction of travel)  ~ v^2
            f_x -= this.stats.aerodynamics(
                        this.direction,
                        velocity_norm,
                        track_def.get_wind(ttime,position)
                    ) * velocity.x*velocity.x
            f_y -= this.stats.aerodynamics(
                        this.direction,
                        velocity_norm,
                        track_def.get_wind(ttime,position)
                    ) * velocity.y*velocity.y
                    
            // track global force field
            f_x += track_def.force_field(ttime,position).x;
            f_y += track_def.force_field(ttime,position).y;
                    
            var force = {x:f_x,y:f_y}
                    
            // tire physics
            a_x = this.stats.tires(car_direction,force,mass).x * force.x / this.stats.mass
            a_y = this.stats.tires(car_direction,force,mass).y * force.y / this.stats.mass
            
            // physics !!
            this.velocity.x += a_x * (ttime/1000)  
            this.velocity.y += a_y * (ttime/1000)        
        }
    }
} 