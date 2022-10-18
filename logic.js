//logic.js handles the drawing of organisms and the organism class itself
//Some inspiration from BrainXYZ's particle simulator

import {organism} from "./OrganismClass.js";
import {findOrganism, IterateTowardsOrganism} from "./CheckOrganism.js";

var master = document.getElementById("sim").getContext('2d')

function draw(x,y,colour,size){
    master.fillStyle = colour
    master.fillRect(x, y, size, size)
}
// ^ Draw each particle

var organisms = []
// ^ Array holding all organisms

function random(){
    return Math.random()*50 + 25
}
// random number (for location)

function create(number, rgb){
    var group=[]
    for(let i=0; i< number; i++){
        var a = Math.trunc(random())
        var b = Math.trunc(random())
        //console.log("a: ",a,"b:", b)
        group.push(new organism(rgb, a, b))
        organisms.push(group[i])
    }
    return group
} //creates a number of organisms of a certain colour in random places


//Define particles below

var test = create(10, "#8051a8")
var test2 = create(10, "#7afbff")

//Define particles above


function update(){ //updates frame
    master.clearRect(0,0,100,100)
    draw(0,0, "black", 100)
    
    for(let i=0; i<organisms.length; i++){
        var valuesArray = findOrganism((organisms[i].aggro * 10) + 5, organisms[i].x, organisms[i].y) //definitely works
        //returns in form 'return [x, y, output]'

        if (valuesArray[0] != 0 && valuesArray[1] != 0){ //&& colour != organisms[i].rgb <== add to prevent movement towards same colour

            /*
            console.log(organisms[i].x, organisms[i].y)
            console.log(valuesArray[0], valuesArray[1])
            console.log("--------")
            */

            //console.log(valuesArray[0], valuesArray[1], valuesArray[2])
            var valuesArray2 = IterateTowardsOrganism(valuesArray[0], valuesArray[1], organisms[i])
            //console.log(valuesArray2[0], valuesArray2[1]);
            organisms[i].update(valuesArray2[0], valuesArray2[1])
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