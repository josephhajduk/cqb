// todo this should just be storage,  things that are functions should be encapsulated in some kind of entitiy

var track_definition = function(director) {
    this.track_name = "The City";
    this.track_description = "Long description, maybe use html";
    
    /// assets
    // list of assets to use in the imagepreloader
    this.assets = [
        {id:'asset_name',  url:'location'}
    ]
    
    this.cars = []

    /// background
    /// image id
    this.background_image_id = "" 
    
    this.background_actor = new CAAT.SpriteImage()
                .initialize(director.getImage(this.background_image_id),1,1)
    
    /// foreground
    /// image id
    this.foreground_image_id = ""
    
    this.foreground_actor = new CAAT.SpriteImage()
                .initialize(director.getImage(this.foreground_image_id),1,1)

    // list of actors to add to scene for animations
    this.background_animations = []
    this.foreground_animations = []
    
    // wall paths
    // list of paths
    this.wall_paths = []
    
    // walls that are time dependant
    this.dynamic_paths = function (t) {
        
        // called every frame
        // should probably use the animations actors to build this
        // so we can use their behaviors
        
        return []
    }
    
    this.obstacles = function(time,car,check_point_progress) {
        // called every frame to check for obstacles that are map dependant
        // i.e. a pit, or a gap that needs to be jumped
        // gives the current time (to sync with animations)
        // also gives the car (this method is called for each car)
        // and an int showing how far into check_points the car is
    }
    
    this.force_field = function(time,position) {
        // this will be entirely based on features
    
        return {x:0,y:0}
    }
    
    this.get_wind = function(time,position) {
        
        // behind each car have wind "following" the car for a projection backwards by its direction for a distance proportional to it's velocity
        
        // also we can have features that produce wind
            
        return {x:0,y:0}
    }
    
    // starting line 
    // array of int coordinates [x1,y1,x2,y2]
    // cars will be evenly spaced along this line
    this.start_line = [0,0,0,0]
    
    // vector to point the cars
    this.start_direction = [0,0]

    // checkpoint lines
    // array of array of [x1,y1,x2,y2]
    // must be crossed (left when pointed from x to y) in order before crossing start_line again
    // will display a light arrow perpendicular to the line and centered for   
    // the next checkpoint
    this.check_points = []

}