// Initialize global variables.
var dictionary;
var template_book;

//import json data.
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        myObj = JSON.parse(this.responseText);
    }
};
xmlhttp.open("GET", "data.json", true);
xmlhttp.send();

xmlhttp.onload = function() {
    dictionary = new Dictionary(myObj[0]);
	template_book = new Template_Book(myObj[1]);
    document.getElementById("button").innerHTML = "Generate!";
};

// Button function.
function generate_haiku() {
    if (document.getElementById("button").innerHTML == "Generate!") {
        var h = new Haiku(dictionary, template_book);
        document.getElementById("text").innerHTML = h.to_str();
    }
}