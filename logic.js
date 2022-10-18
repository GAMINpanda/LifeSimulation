//logic.js handles the drawing of organisms and the organism class itself
//Some inspiration from BrainXYZ's particle simulator

import {organism} from "./OrganismClass.js";
import {findOrganism, IterateTowardsOrganism} from "./CheckOrganism.js";

master = document.getElementById("sim").getContext('2d')

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
        check = findOrganism(organisms[i].aggro * 10, organisms[i].x, organisms[i].y)

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
    console.log("successfully updated")
    requestAnimationFrame(update)
}

update();