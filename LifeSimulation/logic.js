master = document.getElementById("sim").getContext('2d')

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

        this.size = Math.trunc(avg * 5) //finds size of an organism (higher stats = larger)
        this.life = Math.trunc(100 - (avg * 100)) //maximum lifespan is 100 seconds (lower stats = live longer)
        this.hungertime = 1/avg //longer hunger time the lower the stats (less need to eat)
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
        group.push(new organism(rgb, random(), random()))
        organisms.push(group[i])
    }
    return group
} //creates a number of organisms of a certain colour in random places


test = create(100, "#8051a8")

update=()=>{ //updates frame
    master.clearRect(0,0,1000,1000)
    draw(0,0, "black", 1000)
    for(i=0; i<organisms.length; i++){
        draw(organisms[i].x, organisms[i].y, organisms[i].rgb, organisms[i].size)
    }
    requestAnimationFrame(update)
}

update();
