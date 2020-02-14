window.addEventListener('load',function(){
    aboutDiv = document.querySelector(".aboutDiv"); 
    textArea = document.getElementById("txtarea");
    textArea.value="";
    about();
  
});
function saveName(){
    localStorage.setItem("name", textArea.value);
}
// show and hide info about game
function about(){
    if(aboutDiv.value=="true")
    {
      aboutDiv.style.display = "block";
      aboutDiv.value="false"  
    }
    else{
        aboutDiv.style.display = "none";  
        aboutDiv.value="true"
    }
}

    