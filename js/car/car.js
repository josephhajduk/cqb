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

    this.deltaA = function(car_direction,force,velocity,mass,engine) {
            var ax = engine.x * car_direction.x
            var ay = engine.y * car_direction.y

            var fx = force.x
            var fy = force.y

            return {x:ax+fx,y:ay+fy}
    }

    this.deltaV = function(a,car_direction,velocity,traction,time,break_pedal) {

        var v_x = velocity.x
        var v_y = velocity.y
        var v_abs = Math.sqrt(v_x*v_x+v_y*v_y)

        //console.log(time)

        // accelerate the car
        var d_x = a.x * time
        var d_y = a.y * time

        var t_x = 0
        var t_y = 0

        if(v_abs != 0) {
            // break the car
            // should depend on mass (100-1000)
            // and breaks (100 - 1000)
            t_x -= velocity.x * 0.1 *(0.02+break_pedal)
            t_y -= velocity.y * 0.1 *(0.02+break_pedal)

            // turn the car
            // traction is 0-1
            // tires are 100-1000
            // mass is 100-1000

            // certain amount of v will remain in it's direction
            skid = Math.max(v_abs - 4,0)    // 0.02 determines at what speed we will skid

            //console.log("SKID:"+skid)

            var s_x = skid/v_abs*v_x
            var s_y = skid/v_abs*v_y

            // rest gets turned
            t_x += (v_abs-skid)*car_direction.x + s_x
            t_y += (v_abs-skid)*car_direction.y + s_y
        }

        return {x:d_x+t_x-v_x,y:d_y+t_y-v_y}
    }

    this.stats = {
        engine_force: function(speed){
            if(speed < 100)
                return 80//1000*(1/(speed+1))
            else
                return 0
        },
        aerodynamics: function(car_direction,velocity,wind) { return 0 },
        breaks: 100,
        tires: 100,
        mass: 100
    }

    this.prevTime = -1
    
    // updates velocity of the car
    this.physics = function(time,ttime,track_def) {
        var ottime= ttime;
        if ( -1!=this.prevTime ) {
            ttime-= this.prevTime;

            // do steering control
            this.direction += this.steer_right*4.5 - this.steer_left*4.5

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
            
            var force = {x:f_x,y:f_y}

            var traction = 1

            // tire physics
            var a = this.deltaA(car_direction,force,this.velocity,this.stats.mass,engine)
            var v = this.deltaV(a,car_direction,this.velocity,traction, (ttime/1000) , this.break_pedal )

            // physics !!
            this.velocity.x += v.x
            this.velocity.y += v.y
        }
        this.prevTime = ottime;
    }
} 