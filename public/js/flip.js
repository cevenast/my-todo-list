let rotate = 0 // Indicates the state of the image (how many flips has done (or is doing right now))
let limit = 1  // The maximum amount of consecutive flips it can do. Limit is 2 so it won't go crazy.


function overStyle(object){
    let mask = object.firstElementChild.style // Selects the element that flips. In this case, the mask element that contains the img.

    // Every time the mouse enters or exits, 

    if (rotate < limit){    // There's still room for more flips
    rotate += 1             // So let's do one more flip
    mask.transition = 'transform 1.5s';   // Sets the transform in case it was set to 0 before
    mask.transform = `rotate3d(1, 1, 1,${rotate}turn)` // Sets the turn the element has to reach with its flips
    //mask.transform = //mask.transform = `rotateY(${rotate}turn)`
    // In case we got to the limit of consecutive flips, when the flips are done, it will reset the spin to 0 so it can begin spinning again
    if (rotate == limit){
        setTimeout(_ => {
            mask.transition = 'transform 0s' // The element returns to its original not-spinned state without anyone noticing because it's too fast
            mask.transform = 'rotateY(0turn)' // Original not-spinned state
            rotate = 0                        // Begin counting the spins from 0
        }, 1400) // Waits for the last spin to be almost over, so the user can keep playing
    }
    }
}


function outStyle(object){
    let mask = object.firstElementChild.style

    if (rotate < limit){
    rotate += 1
    mask.transition = 'transform 1.5s';
    mask.transform = `rotate3d(1, 1, 1,${rotate}turn)`
    //mask.transform = //mask.transform = `rotateY(${rotate}turn)`
    if (rotate == limit){
        setTimeout(_ => {
            mask.transition = 'transform 0s'
            mask.transform = 'rotateY(0turn)'
            rotate = 0              
        }, 1400)
    }
    }
}
