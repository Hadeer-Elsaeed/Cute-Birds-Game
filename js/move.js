$(function() {
  
    setInterval(function(){
        value =Math.floor((window.innerWidth-120)*Math.random());
        tvalue=Math.floor((window.innerHeight-120)*Math.random());
        $("img").animate({'left' : value-100,'top' : "40px"},2000);
        $("img").animate({'left' : "150",'top' : tvalue-35},2000);
        $("img").animate({'left' : value,'top' : tvalue-10},2000);
       

    },1000);



});


