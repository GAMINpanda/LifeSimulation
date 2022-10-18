master = document.getElementById("sim").getContext('2d')

findOrganism=(aggro, x, y)=>{//looks for first case of organism in the radius
    let values = "#000000"
    let yOriginal = y
    let xOriginal = x
    let yNonTrunc = 0
    let xNonTrunc = 0
    for(let i = 0; i < Math.trunc(aggro * Math.PI); i++){ //draws out lines for each value in circumference
        //in this case i determines the orientation of our 'beams' - the point on circumference the 'beam' will land on

        xNonTrunc = xOriginal-aggro
        x = Math.trunc(xNonTrunc)
        yNonTrunc = Math.tan(i/Math.PI * aggro) + yOriginal //y = mx + c
        y = Math.trunc(yNonTrunc) //truncates


        if (x < xOriginal && (x**2 + y**2 >= aggro**2)){ //if x in quadrant 3 or 4 and larger radius larger than circle ==> will break out of loop otherwise
            while (x < xOriginal && (x**2 + y**2 >= aggro**2)){
            xNonTrunc++ //x iterates
            x = Math.trunc(xNonTrunc) //skips forward to a value of x that works
            }
        }

        while (x**2 + y**2 < aggro**2){ //while inside circle boundaries (pythagoras obvs)

            yNonTrunc = Math.tan(i/Math.PI * aggro) + yOriginal //y = mx + c
            y = Math.trunc(yNonTrunc) //truncates

            values = checkOrganism(x, y) //checks to see if an organism exists at a given point
            if (values[0]){
                console.log(x, y, values[1])
                return (x, y, values[1])
            }

            xNonTrunc++ //x iterates
            x = Math.trunc(xNonTrunc)
        }
    }
    return (0, 0, values[1])
}

checkOrganism=(x, y)=>{ //should check if an organism is at a certain point

    var data = master.getImageData(x, y, 1, 1).data;

    //code below from https://www.tutorialspoint.com/Get-pixel-color-from-canvas-with-HTML
    var index = (Math.floor(y) * 1000 + Math.floor(x)) * 4

    // color in rgba
    var r = data[index]
    var g = data[index + 1]
    var b = data[index + 2]
    var a = data[index + 3]
    // Code above ^^

    if (r == 0 && g == 0 && b == 0){ //if black then not an organism
        return (false, "#000000")
    }
    else{
        return (true, "#"+toString(r)+toString(b)+toString(g))
    }
}

IterateTowardsOrganism=(x, y, organismAttacking)=>{//(x,y) of enemy organism
    organismx = organismAttacking.x
    organismy = organismAttacking.y

    const ydif = organismy - y
    const xdif = organismx - x
    const m = ydif / xdif
    
    if (xdif < 0){
        x = x - organismAttacking.speed
        y = (m * x) + organismy //y = mx + c
    }

    else{
        x = x + organismAttacking.speed
        y = (m * x) + organismy
    }

    return (x, y)
}