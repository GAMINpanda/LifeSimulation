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
        group.push(new organism(rgb, a, b))
        organisms.push(group[i])
    }
    return group
} //creates a number of organisms of a certain colour in random places


//Define particles below

var test = create(5, "#8051a8")
var test2 = create(5, "#7afbff")

//Define particles above


function update(){ //updates frame
    master.clearRect(0,0,100,100)
    draw(0,0, "black", 100)
    
    for(let i=0; i<organisms.length; i++){
        var valuesArray = findOrganism((organisms[i].aggro * 10) + 5, organisms[i].x, organisms[i].y)
        //returns in form 'return [x, y, output]'

        if (valuesArray[0] != 0 && valuesArray[1] != 0){ //&& valuesArray[2] != organisms[i].rgb <== add to prevent movement towards same colour
            var valuesArray2 = IterateTowardsOrganism(valuesArray[0], valuesArray[1], organisms[i])
            organisms[i].update(valuesArray2[0], valuesArray2[1])
        }
        /*
        else{//moves a random amount
            organisms[i].update(organisms[i].x + Math.trunc((Math.random() - 0.5) * 5), organisms[i].y + Math.trunc((Math.random() - 0.5) * 5))
        }
        */
       let xinput = organisms[i].x
       let yinput = organisms[i].y
       let colourinput = organisms[i].rgb
       let sizeinput = organisms[i].size

        //console.log("xinput: ",xinput,"yinput: ",yinput,"colourinput: ",colourinput,"sizeinput: ",sizeinput, "i: ",i)
        draw(xinput, yinput, colourinput, sizeinput)
    }
    requestAnimationFrame(update)
}

update();