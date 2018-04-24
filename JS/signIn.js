$(document).ready(function () {
    logOutButton.css("display", "none");
});

var signInButton = $(".g-signin2");
var logOutButton = $("#logOut");

signInButton.click(function () {
    logOutButton.css("display", "inline-block");
    signInButton.css("display", "none");
});

logOutButton.click(function () {
    logOutButton.css("display", "none");
    signInButton.css("display", "inline-block");
});

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}
function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
}