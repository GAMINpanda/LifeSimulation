var master = document.getElementById("sim").getContext('2d')

export function findOrganism(aggro, x, y){//looks for first case of organism in the radius
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


        if (x < xOriginal && ((x - xOriginal)**2 + (y - yOriginal)**2 >= aggro**2)){ //if x in quadrant 3 or 4 and larger radius larger than circle ==> will break out of loop otherwise
            while (x < xOriginal && ((x - xOriginal)**2 + (y - yOriginal)**2 >= aggro**2)){
            xNonTrunc++ //x iterates
            x = Math.trunc(xNonTrunc) //skips forward to a value of x that works
            }
        }

        //console.log(x, y)
        //console.log(x - xOriginal, y - yOriginal)

        while ((x - xOriginal)**2 + (y - yOriginal)**2 < aggro**2){ //while inside circle boundaries (pythagoras obvs)

            yNonTrunc = Math.tan(i/Math.PI * aggro) + yOriginal //y = mx + c
            y = Math.trunc(yNonTrunc) //truncates

            var output = checkOrganism(x, y) //checks to see if an organism exists at a given point
            if (output != "#000000"){
                //console.log(x, y, output)
                return [x, y, output];
            }

            xNonTrunc++ //x iterates
            x = Math.trunc(xNonTrunc)
        }
    }
    return [0, 0,"#000000"];
}

function checkOrganism(x, y){ //should check if an organism is at a certain point
    var data = master.getImageData(x, y, 1, 1).data;

    //code below from https://www.tutorialspoint.com/Get-pixel-color-from-canvas-with-HTML (not including new values)

    // color in rgba
    var r = data[0]
    var rnew = Number(r).toString(16)

    var g = data[1]
    var gnew = Number(g).toString(16)

    var b = data[2]
    var bnew = Number(b).toString(16)
    // Code above ^^

    if (rnew == "0"){ rnew = "00"}
    if (gnew == "0"){ gnew = "00"}
    if (bnew == "0"){ bnew = "00"}

    if (rnew == "00" && gnew == "00" && bnew == "00"){ //if black then not an organism
        return "#000000"
    }
    else{
        //console.log("r: ",r ,"g: ", g,"b: ", b)
        //console.log(data)
        //console.log("#"+rnew+gnew+bnew)
        return "#"+rnew+gnew+bnew
    }
}

export function IterateTowardsOrganism(x, y, organismAttacking){//(x,y) of enemy organism
    const organismx = organismAttacking.x
    const organismy = organismAttacking.y

    const speed = Math.trunc(organismAttacking.speed * 5)

    //console.log(speed)

    //console.log("x: ", x, "y: ", y)  //using arbitrary size rather than pixel number
    //console.log("organismx: ",organismx,"organismy: ", organismy)

    var ydif = organismy - y
    var xdif = organismx - x

    if (xdif == 0){
        xdif = 1
    }
    if (ydif == 0){
        ydif = 1
    }
    //console.log("xdif: ", xdif, "ydif: ", ydif)

    const m = parseInt(ydif * 100) / parseInt(xdif * 100)
    
    //console.log("m: ",m)
    if (xdif < 0){ //if have to go backwards negative
        x = x - speed
        y = (m * x) + organismy //y = mx + c
    }

    else{
        x = x + speed
        y = (m * x) + organismy
    }
    x = Math.trunc(x)
    y = Math.trunc(y) 

    //console.log(x, y)
    return [x, y];
}