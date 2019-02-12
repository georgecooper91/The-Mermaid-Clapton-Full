document.getElementById("emailSignUp").addEventListener('click', getAge);
var email = document.getElementById("email");
var dob = document.getElementById("signUpDate");

//form age validation, must be > 18. If over 18 send email to Chimpmailer
function getAge(event) {
    event.preventDefault();

    //check age form has been filled in
    if(dob.value === ""){
        alert("Please enter your date of birth");
        return;
    }

    //check age
    var today = new Date();
    var birthDate = new Date(dob.value);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    if(age > 18){
        console.log("Success");
        chimpMailer();
    } else {
        alert("Too young, recipients must be over 18");
    }
}

//send email to app.js via AJAX
function chimpMailer(event){
    //event.preventDefault();
    //getAge(dateString);

    const xhl = new XMLHttpRequest();
    xhl.open("POST", "/", true);
    xhl.onload = function(){
        if(this.status == 200){
            console.log(this.responseText);
        }
    }
    const requestData = `email=${email.value}`;
    xhl.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhl.send(requestData);
}