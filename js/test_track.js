
var test_track = function(director) {
    track = new track_definition(director)

    track.track_name = "Test Track"
    track.track_description = "This is the track that will be used as a test bed"

    track.assets = [
            {id:'thecity_base',     url:'img/thecity/base.png'},
            {id:'thecity_above',    url:'img/thecity/above.png'}
    ]

    track.background_image_id = "thecity_base"
    track.foreground_image_id = "thecity_above"

    track.start_line = [10,10,20,20]

    return track
}
