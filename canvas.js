let wildcardOptions = ["Possible results for a 'wildcard' slice on the spinning wheel.","Complete a jig-saw puzzle","Pet a dog","Pet a cat",
"Go for a walk with a dog","Go for a walk with a cat","Play rock paper scissors","Purchase a rubber chicken and bother your neighbor with it",
"Frame your face and print it onto a T-shirt","Frame your dog's face and print it onto a T-shirt","Frame your cat's face and print it onto a T-shirt",
"Fill water balloons and have a battle","Change Siri or Alexa to 2x talking speed and ask her 5 questions",
"Start a to-do list of all the things you've been procrastinating","Treat yourself to a delicious bowl of your favorite ice cream",
"Go to the grocery store and race your friend with shopping karts","Listen to your favorite song of the early 2000's",
"Listen to your favorite boy-band song of the early 2000's","Listen to your favorite Backstreet Boys song from the early 2000's",
"Find loose change from around your house and car and visit the gaming arcade","Play catch with a football/baseball/tennis ball. Preferably all three at once.",
"Dust off your favorite book and relax on your favorite piece of furniture","Meditate for 5 minutes and clear your mind of all distractions.",
"Stand up and stretch out your stiff muscles. Take deep breaths."]


var options = ["Cook dinner", "Try again", "Eat out", "Wildcard", "Movies","Cook dinner", "Try again", "Eat out", "Wildcard", "Movies"];

var startAngle = 0;
var arc = Math.PI / (options.length / 2);
var spinTimeout = null;

var spinArcStart = 10;
var spinTime = 0;
var spinTimeTotal = 0;

var wheelSize = getWheelDiameter()
var isMobile = checkMobile()

var ctx;

var canvas = document.getElementById("canvas");


// canvas.width  = window.innerWidth;
// canvas.height = window.innerHeight;



document.getElementById("spin").addEventListener("click", spin);

function byte2Hex(n) {
  var nybHexString = "0123456789ABCDEF";
  return String(nybHexString.substr((n >> 4) & 0x0F,1)) + nybHexString.substr(n & 0x0F,1);
}

function RGB2Color(r,g,b) {
	return '#' + byte2Hex(r) + byte2Hex(g) + byte2Hex(b);
}

function getColor(item, maxitem) {
  var phase = 0;
  var center = 120;
  var width = 120;
  var frequency = Math.PI*2/maxitem;

  red   = Math.sin(frequency*item+2+phase) * width + center;
  green = Math.sin(frequency*item+0+phase) * width + center;
  blue  = Math.sin(frequency*item+4+phase) * width + center;

  return RGB2Color(red,green,blue);
}

// function drawRouletteWheel() {
//   var canvas = document.getElementById("canvas");
//   if (canvas.getContext) {
//     var outsideRadius = 245;
//     var textRadius = 180;
//     var insideRadius = 65;
//
//     ctx = canvas.getContext("2d");
//     ctx.clearRect(0,0,500,500);
//
//     ctx.strokeStyle = "black";
//     ctx.lineWidth = 5;
//
//     ctx.font = 'bold 14px Mali, monospace';
//
//     for(var i = 0; i < options.length; i++) {
//       var angle = startAngle + i * arc;
//       ctx.fillStyle = getColor(i, options.length);
//
//       ctx.beginPath();
//       ctx.arc(250, 250, outsideRadius, angle, angle + arc, false);
//       ctx.arc(250, 250, insideRadius, angle + arc, angle, true);
//       ctx.stroke();
//       ctx.fill();
//
//       ctx.save();
//       ctx.shadowBlur    = 20;
//       ctx.shadowColor   = "rgb(220,220,220)";
//       ctx.fillStyle = "black";
//       ctx.translate(250 + Math.cos(angle + arc / 2) * textRadius,
//                     250 + Math.sin(angle + arc / 2) * textRadius);
//       ctx.rotate(angle + arc / 2 + Math.PI / 2);
//       var text = options[i];
//       ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
//       ctx.restore();
//     }
//
//     //Arrow
//     ctx.fillStyle = "black";
//     ctx.beginPath();
//     ctx.moveTo(250 - 4, 250 - (outsideRadius + 5));
//     ctx.lineTo(250 + 4, 250 - (outsideRadius + 5));
//     ctx.lineTo(250 + 4, 250 - (outsideRadius - 5));
//     ctx.lineTo(250 + 9, 250 - (outsideRadius - 5));
//     ctx.lineTo(250 + 0, 250 - (outsideRadius - 13));
//     ctx.lineTo(250 - 9, 250 - (outsideRadius - 5));
//     ctx.lineTo(250 - 4, 250 - (outsideRadius - 5));
//     ctx.lineTo(250 - 4, 250 - (outsideRadius + 5));
//     ctx.fill();
//   }
// }

function responsiveWheel() {
  var canvas = document.getElementById("canvas");
  if (canvas.getContext) {

    canvas.width  = wheelSize;
    canvas.height = wheelSize;

    var wheelRadius = wheelSize/2

    var outsideRadius = wheelRadius - 40;
    var textRadius = wheelSize/3;
    var insideRadius = wheelRadius / 5;

    ctx = canvas.getContext("2d");
    ctx.clearRect(0,0,wheelSize,wheelSize);

    ctx.strokeStyle = "black";


      ctx.font = 'bold 20px Lobster';

    for(var i = 0; i < options.length; i++) {
      var angle = startAngle + i * arc;
      ctx.fillStyle = getColor(i, options.length);

      ctx.beginPath();
      ctx.arc(wheelRadius, wheelRadius, outsideRadius, angle, angle + arc, false);
      ctx.arc(wheelRadius, wheelRadius, insideRadius, angle + arc, angle, true);
      ctx.stroke();
      ctx.fill();

      ctx.save();
      ctx.shadowBlur    = 20;
      ctx.shadowColor   = "rgb(220,220,220)";
      ctx.fillStyle = "black";
      ctx.translate(wheelRadius + Math.cos(angle + arc / 2) * textRadius,
                    wheelRadius + Math.sin(angle + arc / 2) * textRadius);
      ctx.rotate(angle + arc / 2 + Math.PI / 2);
      var text = options[i];

      if(isMobile == false){
          ctx.font = 'bold 24px Lobster,sans-serif';
          ctx.fillText(text, -ctx.measureText(text).width / 2, 0)
      }
      else{
          ctx.font = 'bold 16px Lobster,sans-serif';
          ctx.fillText(text, -ctx.measureText(text).width / 2, 0)
      }
      ctx.restore();
    }



    //Arrow
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.moveTo(wheelRadius - 4, wheelRadius - (outsideRadius + 5));
    ctx.lineTo(wheelRadius + 4, wheelRadius - (outsideRadius + 5));
    ctx.lineTo(wheelRadius + 4, wheelRadius - (outsideRadius - 5));
    ctx.lineTo(wheelRadius + 9, wheelRadius - (outsideRadius - 5));
    ctx.lineTo(wheelRadius + 0, wheelRadius - (outsideRadius - 13));
    ctx.lineTo(wheelRadius - 9, wheelRadius - (outsideRadius - 5));
    ctx.lineTo(wheelRadius - 4, wheelRadius - (outsideRadius - 5));
    ctx.lineTo(wheelRadius - 4, wheelRadius - (outsideRadius + 5));
    ctx.fill();
  }
}

function spin() {
  spinAngleStart = Math.random() * 10 + 10;
  spinTime = 0;
  spinTimeTotal = Math.random() * 3 + 4 * 1000;
  rotateWheel();
}

function rotateWheel() {
  spinTime += 30;
  if(spinTime >= spinTimeTotal) {

    stopRotateWheel();
    return;
  }
  var spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
  startAngle += (spinAngle * Math.PI / 100);
  responsiveWheel()
  spinTimeout = setTimeout('rotateWheel()', 30);
}

function stopRotateWheel() {
  clearTimeout(spinTimeout);
  var degrees = startAngle * 180 / Math.PI + 90;
  var arcd = arc * 180 / Math.PI;
  var index = Math.floor((360 - degrees % 360) / arcd);
  ctx.save();

  var text = options[index]

  //to show result
  //ctx.fillText(text, 250 - ctx.measureText(text).width / 2, 250 + 10);

  displayPopup(text)

    ctx.restore();
  }

  function showPopUp(el){
      const xButton = el.children[1].children[0]
      var mask = el.children[0]
      xButton.addEventListener('click',()=>hidePopUp(el))
      mask.addEventListener('click',()=>hidePopUp(el))

      el.style.display = 'flex'
      setTimeout(()=>el.style.opacity = 1,100)
  }

  function hidePopUp(el){
      el.style.opacity = 0
      setTimeout(()=>el.style.display = 'none',800)
  }


  const moviePop = document.getElementById('movie-pop')
  const restaurantPop = document.getElementById('restaurant-pop')
  const recipePop = document.getElementById('recipe-pop')
  const wildPop = document.getElementById('wild-pop')
  function displayPopup(selectedtoption){
  if (selectedtoption=="Movies"){
      showPopUp(moviePop)
  }
  if (selectedtoption=="Eat out"){
     showPopUp(restaurantPop)
  }
   if (selectedtoption=="Cook dinner"){
    showPopUp(recipePop)
  }
  if (selectedtoption=="Wildcard"){
      let randomCardOption = Math.floor(Math.random() * wildcardOptions.length)
      let wildCardRand = wildcardOptions[randomCardOption]
      document.getElementById('wild-text').innerHTML=wildCardRand
      showPopUp(wildPop)
    }
  }

function easeOut(t, b, c, d) {
  var ts = (t/=d)*t;
  var tc = ts*t;
  return b+c*(tc + -3*ts + 3*t);
}


function getWheelDiameter(){
  var winHeight = window.innerHeight
  var winWidth = window.innerWidth
  var wheelSize = null

  // if window height is greater than winWidth
  // set wheelSize value to winWidth because it is smaller
  // otherwise set it to winHeigt if it is smaller
  // this will make sure that the circle is never cut off
  if(winHeight > winWidth){
    wheelSize = winWidth
  }
  else{
    wheelSize = winHeight
  }

  return wheelSize
}

window.addEventListener('resize', resizeWindow)

function resizeWindow(){
  wheelSize = getWheelDiameter()
  isMobile = checkMobile()
  responsiveWheel()
}

function checkMobile(){

  if(wheelSize <= 470){
    return true
  }
  else{
    return false
  }
}

window.addEventListener('load',resizeWindow)
