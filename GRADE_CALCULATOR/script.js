function checkMarks() {

    let marks = Number(document.getElementById("text").value);
    let Grade = document.getElementById("Grade");

    if(marks>90){
        Grade.innerHTML = "A+";
    }
    else if(marks>75 && marks<90){
        Grade.innerHTML="A";
    }else if(marks>60 && marks<75){
        Grade.innerHTML="B";
    }else if(marks>40 && marks<60){
        Grade.innerHTML="C";
    }
    else{
        Grade.innerHTML="Fail";
    }


}