img="";
status="";
objects=[];

function preload() {
    img=loadImage("living-room.jpg");
}

function setup() {
    canvas=createCanvas(640,420);
    canvas.center();
    objectdetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status:Detecting Objects";
}

function modelLoaded(){
    console.log("model loaded!");
    staus=true;
    objectdetector.detect(img,gotresult);
}

function gotresult(error,results) {
    if(error) {
        console.error(error);
    }
    else {
        console.log(results);
        objects=results;
    }
} 

function draw() {
    image(img,0,0,640,420);

    if(status != "") {

        for(i=0;i < objects.length; i++) {
            document.getElementById("status").innerHTML="There Are 3 Big Object And cocossd Has Detected "+objects.length;
            fill('#FF0000');
            percentage=floor(objects[i].confidence * 100);
            text(objects[i].label + " " +percentage +"%",objects[i].x +15,objects[i].y +15);
            noFill();
            stroke('#FF0000');
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
}