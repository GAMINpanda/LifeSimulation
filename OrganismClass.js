class organism{ //logic for class organism
    constructor(rgb, x, y){
        //rgb string is hex format (#-_-_-_), (x,y) is just the starting coordinate
        this.redhex = rgb.substring(1,3)
        this.greenhex = rgb.substring(4,6)
        this.bluehex = rgb.substring(6,8)

        this.x = x
        this.y = y
        this.rgb = rgb

        this.aggro = (parseInt(this.redhex, 16) / 255) //finds agressiveness of an organism
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