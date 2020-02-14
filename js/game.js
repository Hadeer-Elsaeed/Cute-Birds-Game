var username;
var mydata;
var saving;
var score = 0;
var counter=0;

//function getting the playername that stored in local storage 
$(function () {
    username = window.localStorage.getItem("name");
    console.log("username:"+username);
    $("#welcome").text("\"Welcome " + username + " In Cute Birds Game\""); 

});

//main function to start game "Hadeer Elsaeed"
$(function () {
    $("#start").on("click", function () {
        $("body").css({cursor: "url() 16 16,crosshair"})
        $("#start").hide();
        $("#maxScore").hide();
        $("#playerData").hide();
        $("#welcome").hide();
        $("#scoreText").text("Score");
        $("#timer").fadeIn().append('<span></span>');
        $("#playerName").fadeIn().text(username);
        $("#scoreValue").fadeIn();
        
        gunSound = new Audio(src="../sound/gun.mp3");
        bumpSound = new Audio(src="../sound/bumpSound.mp3");
        backSound = new Audio(src="../sound/backSound.mp3");
        backSound.play();
        mybirds = setInterval(function () {
            createBirds();
            movement();
            createBomb();
        }, 2000);
    });
    $("#maxScore").on("click",function(){
       $("#playerData").fadeToggle(1000);
        mydata =  JSON.parse(window.localStorage.getItem('added-items'));
        console.log(mydata);
        if(mydata.Name == username){
            $("#playerData").text("Max Score = "+mydata.MaxScore );
        }
        else{
            $("#playerData").text("Max Score ="+0 );
        }
    });
});
$(function () {

    var sec = 60;
    var timer = setInterval(function () {
        sec--;
        if (sec == -1) {
            clearInterval(timer);
            clearInterval(mybirds);
            backSound.pause();
            $("img").stop(true, true);
            popup.confirm({
                    content: "Do you want to play again?"
                },
                function (config) {
                    if (config.proceed) {
                        location = window.location;
                        console.log('confirm true');
                    } else {
                        window.location.replace("../login.html");
                        console.log('confirm false');
                    }
                }

            );
            console.log("Time out");
        }
    }, 1000);


})
  //function to generate random values
function random() {
    /* create random number from 0-3 for normal birds*/
    normal = Math.floor(3 * Math.random());

    /* create random number from 0-2 for golden birds*/
    golden = Math.floor(2 * Math.random());

    /* create random number from 0-2 for black birds*/
    black = Math.floor(2 * Math.random());

    value = Math.floor((window.innerWidth - 130) * Math.random());
    tvalue = Math.floor((window.innerHeight - 130) * Math.random());

    bombObjects = Math.floor(2 * Math.random());

};
normCounter = 0;
goldCounter = 0;
blackCounter = 0;
var birdsArr=[];
// create birds 
function createBirds() {
    random();
    for (let i = 0; i < normal; i++) {
        normCounter +=1 ;
        let myNormalBird = $('<img class="birds normalclass" id="normal'+normCounter+'" src="../images/10.png"/>');
        birdsArr.push(myNormalBird);
        myNormalBird.on("click", killNormalBird);
        $("body").append(myNormalBird);
        $(".normalclass").css({top:tvalue});
    }

    for (let i = 0; i < golden; i++) {
        goldCounter +=1 ;
        let myGoldenBird = $('<img class="birds goldenclass" id="golden'+goldCounter+'" src="../images/30.png"/>');
        birdsArr.push(myGoldenBird);
        myGoldenBird.on("click", killGoldenBird);
        $("body").append(myGoldenBird);
        $(".goldenclass").css({top:tvalue+100});

    }

    for (let i = 0; i < black; i++) {
        blackCounter+=1;
        let myBlackBird = $('<img class="birds blackclass" id="black'+blackCounter+'" src="../images/20.png"/>');
        birdsArr.push(myBlackBird);
        myBlackBird.on("click", killBlackBird);
        $("body").append(myBlackBird);
        $(".blackclass").css({top:tvalue-100});
    }
}
//birds movement Hadeer
function movement() {
    random();
    $(".normalclass").animate({
        'left': value-80,
        'top': tvalue - 80
    }, 4000);

    $(".goldenclass").animate({
        'left': value +100,
        'top': tvalue 
    }, 3000);
 
    $(".blackclass").animate({
        'left': value,
        'top': tvalue+50 
    }, 7000);

}
// shot birds 
function killNormalBird() {
    gunSound.play();
    score = score + 5;
    $("#scoreValue").text(score);
    let oldimg = event.target;
    birdsArr.splice( birdsArr.indexOf(oldimg));
    $(event.target).hide();
    counter++;
    winner();
   
}

function killGoldenBird() {
    gunSound.play();
    score = score + 10;
    $("#scoreValue").text(score);
    let oldimg = event.target;
    birdsArr.splice( birdsArr.indexOf(oldimg));
    $(event.target).hide();
    counter++;
    winner();
   
   
}


function killBlackBird() {
    gunSound.play();
    score = score - 10;
    $("#scoreValue").text(score);
    let oldimg = event.target;
    birdsArr.splice( birdsArr.indexOf(oldimg));
    $(event.target).hide();
    counter++;
    winner();
}
//shot bumps and kill surrounding birds 
function shotBumps(){
    bumpSound.play();
    let bump = event.target;
    let boom = $(bump).offset();  
    for (i in birdsArr)
    {
     if((parseInt(boom.top)+80+120)>parseInt($(birdsArr[i]).css("top")) && parseInt(birdsArr[i].css("top"))>parseInt(boom.top-120))
       {       
            if((parseInt(boom.left)+80+120)>parseInt($(birdsArr[i]).css("left")) && parseInt(birdsArr[i].css("left"))>parseInt(boom.left-120))
            {
                birdsArr[i].hide();
              var className = $(birdsArr[i]).attr("class");
              switch(className)
              {
                case"birds blackclass":
                score = score - 10;
                $("#scoreValue").text(score);
                break;
                case"birds normalclass":
                score = score +5;
                $("#scoreValue").text(score);
                break;
                case"birds goldenclass":
                score = score + 10;
                $("#scoreValue").text(score);
                break;

              }
                console.log("hidden occure");
            }
        }   
    }
    let oldimg = $(bump);
    let newimg = $(oldimg).attr('src',"../images/boom.png");
    $(oldimg ).stop();
    $(newimg).stop();
    $(newimg).fadeOut(500);

}

function winner() {

    //saving playername with his score
    saving ={'Name':username,'MaxScore':score};
    localStorage.setItem('added-items', JSON.stringify(saving));



    //pop up for winner 
    if(counter==20 &&score>=50){
        clearInterval(timer);
        clearInterval(mybirds);
        backSound.pause();
        $("img").stop(true, true);

        popup.confirm({
            content: "Congratulations ! Would you like to play again?"
        },
        function (config) {
            if (config.proceed) {
                location = window.location;

            } else {
                window.location.replace("../login.html");
                
            }
        }
    );
      }
  }


function createBomb() {
    random();
    for (let i = 0; i < bombObjects; i++) {
        let myBump= $('<img  id="bomb"  style="width:80px" src="../images/bump.png"/>');
        myBump.on("click",shotBumps);
        $("body").append(myBump);
        $("img[id*='bomb']").addClass("bombclass");
        $("img[id*='bomb']").css({left:value});
    }
    $(".bombclass").animate({
        'left': value,
        'top': "100%"
    }, 5000);

}

