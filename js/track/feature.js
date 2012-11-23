var feature = function() {

    this.actor = new CAAT.Actor()     // override this with the new actor

    this.assets = [
        {id:'asset_name',  url:'location'}
    ]

    this.dynamic_path = function(t) {
        // return a path
    }

    this.obstacle = function(time,car,check_point_progress) {
        // do shit to the car
        // if we did something return true
        return false
    }

    this.force_field = function(time,position) {
        // return force vector
    }

    this.wind = function(time,position) {
        // return wind vector
    }

}