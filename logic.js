//logic.js handles the drawing of organisms and the organism class itself
//Some inspiration from BrainXYZ's particle simulator
//Yes its one long piece of code but importing functions is a bit dodgy

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
class organism{ //logic for class organism
    constructor(rgb, x, y){
        //rgb string is hex format (#-_-_-_), (x,y) is just the starting coordinate
        this.redhex = rgb.substring(1,3)
        this.greenhex = rgb.substring(4,6)
        this.bluehex = rgb.substring(6,8)

        this.x = x
        this.y = y
        this.rgb = rgb

        this.aggro = parseInt(this.redhex, 16) / 255 //finds agressiveness of an organism
        this.speed = parseInt(this.greenhex, 16) / 255 //finds speed of an organism
        this.rr = parseInt(this.bluehex, 16) / 255 //finds reproduction rate of an organism

        let avg = (this.aggro + this.speed + this.rr) / 3

        this.size = Math.trunc(avg * 5) + 1 //finds size of an organism (higher stats = larger)
        this.life = Math.trunc(100 - (avg * 100)) + 1 //maximum lifespan is 100 seconds (lower stats = live longer)
        this.hungertime = 1/avg //longer hunger time the lower the stats (less need to eat)
    }

    update=(x, y)=>{ //updates x & y position
        this.x = x
        this.y = y
    }
}

draw=(x,y,colour,size)=>{
    master.fillStyle = colour
    master.fillRect(x, y, size, size)
}
// ^ Draw each particle

organisms = []
// ^ Array holding all organisms

random=()=>{
    return Math.random()*900 + 50
}
// random number (for location)

create=(number, rgb)=>{
    group=[]
    for(let i=0; i< number; i++){
        group.push(new organism(rgb, Math.trunc(random()), Math.trunc(random())))
        organisms.push(group[i])
    }
    return group
} //creates a number of organisms of a certain colour in random places

//Define particles below

test = create(100, "#8051a8")
test2 = create(100, "#04668c")

//Define particles above

update=()=>{ //updates frame
    master.clearRect(0,0,1000,1000)
    draw(0,0, "black", 1000)
    for(i=0; i<organisms.length; i++){
        check = findOrganism(organisms[i].aggro, organisms[i].x, organisms[i].y)

        if (check[0] != 0 && check[1] != 0 && check[2] != organisms[i].rgb){ //won't attack organisms of the same colour (for now)
            values = IterateTowardsOrganism(check[0], check[1], organisms[i])
            organisms[i].update(values[0], values[1])
        }
        /*
        else{//moves a random amount
            organisms[i].update(organisms[i].x + Math.trunc((Math.random() - 0.5) * 5), organisms[i].y + Math.trunc((Math.random() - 0.5) * 5))
        }
        */

        draw(organisms[i].x, organisms[i].y, organisms[i].rgb, organisms[i].size)
    }
    requestAnimationFrame(update)
}

update();
