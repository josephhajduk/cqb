var registerCarControls = function (player_car){
    CAAT.registerKeyListener( function kl( keyEvent ) {
        if ( keyEvent.getKeyCode()===CAAT.Keys.UP ) {
            keyEvent.preventDefault();
            player_car.throttle = ( keyEvent.getAction()==='up' ) ? 0 : 1;
        }
        if ( keyEvent.getKeyCode()===CAAT.Keys.DOWN ) {
            keyEvent.preventDefault();
            player_car.break_pedal = ( keyEvent.getAction()==='up' ) ? 0 : 1;
        }
        if ( keyEvent.getKeyCode()===CAAT.Keys.LEFT ) {
            keyEvent.preventDefault();
            player_car.steer_left = ( keyEvent.getAction()==='up' ) ? 0 : 1;
        }
        if ( keyEvent.getKeyCode()===CAAT.Keys.RIGHT ) {
            keyEvent.preventDefault();
            player_car.steer_right = ( keyEvent.getAction()==='up' ) ? 0 : 1;
        }
    });

}