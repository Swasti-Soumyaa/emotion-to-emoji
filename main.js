prediction_1="";
prediction_2="";

Webcam.set({
    width:300,
    height:300,
    image_format:"png",
    png_quality:100
});

camera=document.getElementById("camera");
Webcam.attach(camera);

function takeSnapshot(){
    Webcam.snap(function(image){
        document.getElementById("result").innerHTML="<img id='captured_image' src='"+image+"'>";
    });
}

console.log(ml5.version);

classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/RFJIYzibY/model.json",modelLoaded);

function modelLoaded(){
console.log("modelLoaded!");
}

function speak(){
    synth=window.speechSynthesis;
    speakData1="The first prediction is"+prediction_1;
    speakData2="The second prediction is"+prediction_2;
    var utter_this=new SpeechSynthesisUtterance(speakData1+speakData2);
    synth.speak(utter_this);
}

function check(){
    img=document.getElementById("captured_image");
    classifier.classify(img,gotResult);
}

function gotResult(error,result){
    if(error){
        console.log(error)
    }
    else{
        console.log(result);

        prediction_1=result[0].label;
        prediction_2=result[1].label;
        document.getElementById("emotion1").innerHTML=prediction_1;
        document.getElementById("emotion2").innerHTML=prediction_2;
        speak();

        if(prediction_1=="crybaby"){
            document.getElementById("emoji1").innerHTML="&#128557"
        }

        if(prediction_1=="happy"){
            document.getElementById("emoji1").innerHTML="&#128522"
        }
        if(prediction_1=="angry"){
            document.getElementById("emoji1").innerHTML="&#128548"
        }

        if(prediction_1=="surprise"){
            document.getElementById("emoji1").innerHTML="&#128562"
        }

        if(prediction_1=="sad"){
            document.getElementById("emoji1").innerHTML="&#128532"
        }


        if(prediction_2=="crybaby"){
            document.getElementById("emoji2").innerHTML="&#128557"
        }

        if(prediction_2=="happy"){
            document.getElementById("emoji2").innerHTML="&#128522"
        }
        if(prediction_2=="angry"){
            document.getElementById("emoji2").innerHTML="&#128548"
        }

        if(prediction_2=="surprise"){
            document.getElementById("emoji2").innerHTML="&#128562"
        }

        if(prediction_2=="sad"){
            document.getElementById("emoji2").innerHTML="&#128532"
        }

    

    }
}



