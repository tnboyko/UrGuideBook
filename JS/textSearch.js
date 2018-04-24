/*$("#search").click(function () {
    var request = $("#textField").value;
    alert(request);
});*/

var inText;
function onload() {
    inText = document.getElementById('textField');
}
function showText(){
    alert(inText.value);
}