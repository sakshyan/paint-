var drawingball, i;
var database, pos, piece, button;

var trajectory=[];

function setup(){
    createCanvas(4000,4000);

    database=firebase.database();

    piece=loadImage("piece.png");

    button=createButton("clearAll");
    

    drawingball = createSprite(250,250,10,10);
    drawingball.shapeColor = "red";

    database.ref("drawingball/position").on("value",readPos, showErr);
}

function draw(){
    background("white");
    drawSprites();

    var position = [drawingball.x, drawingball.y];
    trajectory.push(position);


    for(i=0; i<trajectory.length; i++){
        image(piece, trajectory[i][0], trajectory[i][1]);
    }

    button.mousePressed(function(){
        trajectory=[];
    });

    database.ref("drawingball").set({
        drawings:trajectory
    })

    
}

function changePosition(){
    database.ref("drawingball/position").set({
        x:trajectory[i][0],
        y:trajectory[i][1]
    })
}

function mouseDragged(){
    drawingball.x=mouseX;
    drawingball.y=mouseY;

    database.ref("drawingball/position").set({
        x:mouseX,
        y:mouseY
    })
}

function mouseReleased(){
}

function readPos(data){
    pos=data.val();
    drawingball.x=pos.x;
    drawingball.y=pos.y;
}

function showErr(){
    console.log("Error OOCCUURREEDD");
}
