var project_vec = function(a,b) {
    var ax = a.x
    var ay = a.y
    var bx = b.x
    var by = b.y

    var adotb = ax*bx+ay*by
    var bdotb = bx*bx+by*by

    var c = 0

    if(bdotb != 0)
        var c = adotb/bdotb

    return {x:c*bx,y:c*by}
}

var car = function(director,color) {
    this.car_image = new CAAT.SpriteImage()
        .initialize(director.getImage("car_"+color),1,20)
        
    this.actor = new CAAT.Actor()
        .setBackgroundImage(this.car_image.getRef(),true)
        .centerAt(0,0)
        
    this.point_car = function(point_direction) {
        var angle_index = [5,6,7,8,9,0,11,12,13,14,15,16,17,18,19,1,10,2,3,4]
        
        var a2 = (((point_direction+9)%360)+360)%360
        var div_angle = Math.floor(a2/18)
        
        var index = angle_index[div_angle]
        
        this.actor.setSpriteIndex(index)
    }

        
    this.velocity = {x:0,y:0}
    this.direction = 0

    // these two are used to steer with keyboard or other non sensitive methods leave them 0 if you arn't using them
    this.steer_right = 0
    this.steer_left = 0

    this.point_car(this.direction)

    // throttle and direction will be adjusted by the control function
    this.throttle = 0
    this.break_pedal = 0
    
    this.setPosition = function (x,y) {
        this.actor.centerAt(x,y)
    }
    
    this.prevTime = -1;
    
    this.stats = {
        engine_force: function(speed){return (1/(speed+1))/10},
        aerodynamics: function(car_direction,velocity,wind) { return 1 },
        breaks: 5,
        tires: function(car_direction,force,velocity,mass,engine){

            var ax = engine.x * car_direction.x
            var ay = engine.y * car_direction.y

            var slowdown = 1.2

            var wx = slowdown * -1 * velocity.x
            var wy = slowdown * -1 * velocity.y

            var fx = force.x + wx;
            var fy = force.y + wy;

            if(Math.abs(velocity.x) > 0.01 || Math.abs(velocity.y) > 0.01) {
                var tiref = 1;

                var cv = project_vec(car_direction,velocity)

                var perpcd = {x: car_direction.x-cv.x,y: car_direction.y-cv.y}

                var tx = tiref * perpcd.x
                var ty = tiref * perpcd.y

                return {x:ax+fx+tx,y:ay+fy+ty}
            } else {
                return {x:ax+fx,y:ay+fy}
            }
        },
        mass: 100
    }

    this.prevTime = -1
    
    // updates velocity of the car
    this.physics = function(time,ttime,track_def) {
        var ottime= ttime;
        if ( -1!=this.prevTime ) {

            // do steering control
            this.direction += this.steer_right*4.5 - this.steer_left*4.5

            ttime-= this.prevTime;
            var seconds = (ttime/1000)
            
            var car_direction = {
                                    x: Math.cos(this.direction * Math.PI / 180), 
                                    y: Math.sin(this.direction * Math.PI / 180)
                                }
            
            var v_abs = Math.sqrt( this.velocity.x*this.velocity.x + this.velocity.y*this.velocity.y )
            
            var velocity_norm = {
                                    x:this.velocity.x/v_abs,
                                    y:this.velocity.y/v_abs
                                }
            
            var position = {x: this.actor.x, y: this.actor.y}
            
            var f_x = 0
            var f_y = 0
            
            // engine acceleration (in direction of the car)
            var engine_x = this.throttle * this.stats.engine_force(v_abs)
            var engine_y = this.throttle * this.stats.engine_force(v_abs)
            var engine = {x:engine_x,y:engine_y}

            var bx = this.break_pedal * this.stats.breaks * -1 * this.velocity.x
            var by = this.break_pedal * this.stats.breaks * -1 * this.velocity.y

            // air resistance (in direction of travel)  ~ v^2
            f_x -= this.stats.aerodynamics(
                        this.direction,
                        velocity_norm,
                        track_def.get_wind(ttime,position)
                    ) * this.velocity.x*this.velocity.x
                    
            f_y -= this.stats.aerodynamics(
                        this.direction,
                        velocity_norm,
                        track_def.get_wind(ttime,position)
                    ) * this.velocity.y*this.velocity.y
                    
            // track global force field
            f_x += track_def.force_field(ttime,position).x;
            f_y += track_def.force_field(ttime,position).y;
            
            var force = {x:f_x+bx,y:f_y+by}
                    
            // tire physics
            a_x = this.stats.tires(car_direction,force,this.velocity,this.stats.mass,engine).x
            a_y = this.stats.tires(car_direction,force,this.velocity,this.stats.mass,engine).y
            
            // physics !!
            this.velocity.x += a_x * (ttime/1000)  
            this.velocity.y += a_y * (ttime/1000)        
        }
        this.prevTime = ottime;
    }
} 