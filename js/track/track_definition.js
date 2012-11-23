// todo this should just be storage,  things that are functions should be encapsulated in some kind of entitiy

var track_definition = function(director) {
    this.track_name = "The City";
    this.track_description = "Long description, maybe use html";
    
    /// assets
    // list of assets to use in the imagepreloader
    this.assets = [
        {id:'asset_name',  url:'location'}
    ]

    // array of the player cars
    this.cars = []

    // array of features
    this.features = []

    /// background
    /// image id
    this.background_image_id = ""

    
    /// foreground
    /// image id
    this.foreground_image_id = ""


    // list of actors to add to scene for animations
    this.background_animations = []
    this.foreground_animations = []
    
    // wall paths
    // list of paths
    this.wall_paths = []
    
    // walls that are time dependant from the features
    this.dynamic_paths = function (t) {
        return this.features.map(function( feature ) { return feature.dynamic_path(t) })
    }
    
    this.obstacles = function(time,car,check_point_progress) {
        var result = false;

        for( var f = 0; f < this.features.length ; f++) {
            result = result || this.features[f].obstacle(time,car,check_point_progress)
        }

        return result
    }
    
    this.force_field = function(time,position) {
        var result = {x:0,y:0}
        for( var f = 0; f < this.features.length ; f++) {
            result.x += this.features[f].force_field(time,position).x
            result.y += this.features[f].force_field(time,position).y
        }
        return result
    }
    
    this.get_wind = function(time,position) {

        var result = {x:0,y:0}
        // behind each car have wind "following" the car for a projection backwards by its direction for a distance proportional to it's velocity
        // TODO: the maths

        for( var f = 0; f < this.features.length ; f++) {
            result.x += this.features[f].get_wind(time,position).x
            result.y += this.features[f].get_wind(time,position).y
        }
        return result
    }
    
    // starting line 
    // array of int coordinates [x1,y1,x2,y2]
    // cars will be evenly spaced along this line
    // cars point left of x1->x2
    this.start_line = [0,0,0,0]

    // checkpoint lines
    // array of array of [x1,y1,x2,y2]
    // must be crossed (left when pointed from x to y) in order before crossing start_line again
    // will display a light arrow perpendicular to the line and centered for   
    // the next checkpoint
    this.check_points = []

    return this
}