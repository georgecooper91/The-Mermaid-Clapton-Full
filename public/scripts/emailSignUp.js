document.getElementById("emailSignUp").addEventListener("click", chimpMailer);
//var dateString = document.getElementById("signUpDate").value;

var email = document.getElementById("email");
var dob = document.getElementById("signUpDate").value;

//send email to app.js via AJAX
function chimpMailer(event){
    event.preventDefault();
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

//form age validation, must be > 18
// function getAge(dateString) {
//     var today = new Date();
//     var birthDate = new Date(dateString);
//     var age = today.getFullYear() - birthDate.getFullYear();
//     var m = today.getMonth() - birthDate.getMonth();
//     if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
//         age--;
//     }
//     return age;
// }