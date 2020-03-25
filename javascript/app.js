var container = document.querySelector('.container');
var intro = document.getElementById('intro');

function responsiveWidth() { // for responsive (width = height)
  if (window.innerWidth <= 400) { 
    container.style.width = window.innerWidth + 'px';
    container.style.height = window.innerWidth + 'px';
    container.style.visibility = 'visible';
  }else {
    container.style.cssText = 'width: 400px; height: 400px;visibility: visible';
  }
}

function withFriend() {  // made up his mind to play (with me or his friend)
  container.addEventListener('click', manual);
  intro.style.opacity = '0';
  intro.style.visibility = 'hidden';
  topChooseIcon.parentNode.style.cssText = 'visibility: visible; opacity: 1';
  responsiveWidth();
}

var saveToCheck = [];
var s = saveToCheck; // To simplify the code writing
var xOro = '<span>x</span>';
function manual(event) { 
  if (event.target.nodeName == 'DIV' && event.target.textContent == "") {
    event.target.innerHTML = xOro;
    saveToCheck[event.target.className[6]-1] = xOro;
    if (xOro == '<span>x</span>') { /*Switch between x , o*/
      xOro = '<span>o</span>';
    }else {
      xOro = '<span>x</span>';
    }
  }else {
    return;
  }
  check();
}

/*This function is a tool that regroup the array(saveToCheck) after dismantling it */
var num;                    
function checkToChoose(a, b, logic) {
  if (s[0] == undefined && (logic[a][b] == (logic[0][0] || logic[3][0] || logic[6][0]))) {
      num = 0;
    }else if (s[1] == undefined && (logic[a][b] == (logic[0][1] || logic[4][0]))) {
      num = 1;
    }else if (s[2] == undefined && (logic[a][b] == (logic[0][2] || logic[5][0] || logic[7][0]))) {
      num = 2;
    }else if (s[3] == undefined && (logic[a][b] == (logic[1][0] || logic[3][1]))) {
      num = 3;
    }else if (s[4] == undefined && (logic[a][b] == (logic[1][1] || logic[4][1] || logic[6][1] || logic[7][1]))) {
      num = 4;
    }else if (s[5] == undefined && (logic[a][b] == (logic[1][2] || logic[5][1]))) {
      num = 5;
    }else if (s[6] == undefined && (logic[a][b] == (logic[2][0] || logic[3][2] || logic[7][2]))) {
      num = 6;
    }else if (s[7] == undefined && (logic[a][b] == (logic[2][1] || logic[4][2]))) {
      num = 7;
    }else if (s[8] == undefined && (logic[a][b] == (logic[2][2] || logic[5][2] || logic[6][2]))) {
      num = 8;
    }
}
/*If he choose to play with me*/
var choose = document.querySelector('.choose-two');
function withMe() { // if he choose with me
  intro.style.opacity = '0';
  intro.style.visibility = 'hidden';
  choose.style.opacity = '1';
  choose.style.visibility = 'visible';
  container.addEventListener('click', playWithMe);
}

var hisChoose;
var myChoose;
function chooseXO(event) { // choose between 'x , o' to play
  if(event.target.textContent == 'X') {
    hisChoose = '<span>x</span>';
    myChoose = '<span>o</span>';
  }else if (event.target.textContent == 'O') {
    hisChoose = '<span>o</span>';
    myChoose = '<span>x</span>';
  }
  choose.style.cssText = 'opacity: 0;visibility: hidden; ';
  topChooseIcon.parentNode.style.cssText = 'visibility: visible; opacity: 1';
  container.addEventListener('click', playWithMe);
  container.style.pointerEvents = 'visible';
  responsiveWidth();
}
choose.addEventListener('click', chooseXO);

/*Create a method that makes playing with some logic*/
function playWithMe(event) {
  if (event.target.nodeName == 'DIV' && event.target.textContent == "") { 
    event.target.innerHTML = hisChoose;
    saveToCheck[event.target.className[6]-1] = hisChoose;
    check();

  var logicOfWinning = [[s[0],s[1],s[2]],[s[3],s[4],s[5]],[s[6],s[7],s[8]],[s[0],s[3],s[6]],
                     [s[1],s[4],s[7]],[s[2],s[5],s[8]],[s[0],s[4],s[8]],[s[2],s[4],s[6]]]; // This variable breaks the group down into win and lose situations
  for (var x = 0; x < 8; x++) {
    if ((logicOfWinning[x][0] == myChoose && logicOfWinning[x][1] == myChoose && logicOfWinning[x][2] == undefined) ||
    (logicOfWinning[x][0] == myChoose && logicOfWinning[x][2] == myChoose && logicOfWinning[x][1] == undefined) ||
    (logicOfWinning[x][1] == myChoose && logicOfWinning[x][2] == myChoose && logicOfWinning[x][0] == undefined)) {
      /*A set of steps arranged to determine where my step will be*/
      for (var y = 0; y < 3; y++) {  //first Check to win
        if (logicOfWinning[x][y] == undefined) {
           logicOfWinning[x][y] = myChoose;
           checkToChoose(x, y, logicOfWinning);
           s[num] = logicOfWinning[x][y];
           container.children[num].innerHTML = logicOfWinning[x][y];
           container.children[num].firstElementChild.style.cssText = ' color : transparent;animation: show 0.8s 0.1s forwards';
           check();
           return;
        }
      }
    }
  }
  for (var x = 0; x < 8; x++) { // second Check to make him lose
    if ((logicOfWinning[x][0] == hisChoose && logicOfWinning[x][1] == hisChoose && logicOfWinning[x][2] == undefined) ||
       (logicOfWinning[x][0] == hisChoose && logicOfWinning[x][2] == hisChoose && logicOfWinning[x][1] == undefined) ||
       (logicOfWinning[x][1] == hisChoose && logicOfWinning[x][2] == hisChoose && logicOfWinning[x][0] == undefined)) {

      for (var y = 0; y < 3; y++) {
        if (logicOfWinning[x][y] == undefined) {
           logicOfWinning[x][y] = myChoose;
           checkToChoose(x, y, logicOfWinning);
           s[num] = logicOfWinning[x][y];
           container.children[num].innerHTML = logicOfWinning[x][y];
           container.children[num].firstElementChild.style.cssText = ' color : transparent;animation: show 0.8s 0.1s forwards';
           check();
           return;
        }
      }
    }
  }

  for (var x = 0; x < 8; x++) {  //thrid Play logically
    if ((logicOfWinning[x][0] == undefined && logicOfWinning[x][1] == undefined && logicOfWinning[x][2] == myChoose) ||
      (logicOfWinning[x][0] == undefined && logicOfWinning[x][2] == undefined && logicOfWinning[x][1] == myChoose) ||
      (logicOfWinning[x][1] == undefined && logicOfWinning[x][2] == undefined && logicOfWinning[x][0] == myChoose)) {

      for (var y = 0; y < 3; y++) {
        if (logicOfWinning[x][y] == undefined) {
           logicOfWinning[x][y] = myChoose;
           checkToChoose(x, y, logicOfWinning);
           s[num] = logicOfWinning[x][y];
           container.children[num].innerHTML = logicOfWinning[x][y];
           container.children[num].firstElementChild.style.cssText = ' color : transparent;animation: show 0.8s 0.1s forwards';
           return;
        }
      }
    }
  }

      var randomChoose = Math.floor(Math.random() * (8 - 1 + 1) + 1);
      if (s[randomChoose] == undefined) {  //This is my first step to play
        s[randomChoose] = myChoose;
        container.children[randomChoose].innerHTML = myChoose;
        container.children[randomChoose].firstElementChild.style.cssText = ' color : transparent;animation: show 0.8s 0.1s forwards';
        return;
      }
  }
}

/*Make the ability to change the game style available to the player during game play*/
var topChooseIcon = document.querySelector('.top-choose');
    topChooseIcon.children[0].style.left = '0px';

function open() { 
  if (topChooseIcon.children[0].style.left == '0px') {
    topChooseIcon.children[0].style.left = '66.6%';
    topChooseIcon.children[1].style.left = '33.3%';
    topChooseIcon.parentNode.lastElementChild.style.width = '100%';
    container.style.pointerEvents = 'none';
  }else {
    topChooseIcon.children[0].style.left = '0px';
    topChooseIcon.children[1].style.left = '0px';
    topChooseIcon.parentNode.lastElementChild.style.width = '0';
    container.style.pointerEvents = 'visible';
  }
}
topChooseIcon.addEventListener('click', open);

function refreshWithFriend() {  //if he changed his mind while playing 
  topChooseIcon.parentNode.lastElementChild.style.width = '0';
  for (var x = 0; x < 9; x++) {
    container.children[x].textContent = '';
    saveToCheck[x] = undefined;
    s[x] = undefined
  }
  container.removeEventListener('click', playWithMe);
  container.addEventListener('click', manual);
  myChoose = null;
  hisChoose = null;
  message.style.cssText = 'visibility: hidden;opacity: 0;';
  choose.style.cssText = 'opacity: 0; visibility: hidden;';
  open()
  responsiveWidth()
}

function refreshWithMe() { //if he changed his mind while playing
  topChooseIcon.parentNode.lastElementChild.style.width = '0';
  choose.style.cssText = 'opacity: 1;visibility: visible; ';
  choose.style.visibility = 'visible';
  for (var x = 0; x < 9; x++) {
    container.children[x].textContent = '';
    saveToCheck[x] = undefined;
    s[x] = undefined;
  }
  container.removeEventListener('click', playWithMe);
  container.removeEventListener('click', manual);
  message.style.cssText = 'visibility: hidden; opacity: 0;';
  open();
  container.style.pointerEvents = 'none';
}

/*This function checks for win and lose*/
var message = document.getElementById('message');
function check() {
  var logicOfWinning = [[s[0],s[1],s[2]],[s[3],s[4],s[5]],[s[6],s[7],s[8]],[s[0],s[3],s[6]],
                     [s[1],s[4],s[7]],[s[2],s[5],s[8]],[s[0],s[4],s[8]],[s[2],s[4],s[6]]];
  var z = 0;
  for (var x = 0; x < 8; x++) {
      if ((logicOfWinning[x][0] != undefined && logicOfWinning[x][1] != undefined && logicOfWinning[x][2] != undefined) &&
      (logicOfWinning[x][0] == logicOfWinning[x][1] && logicOfWinning[x][0] == logicOfWinning[x][2])) {
        for (var y = 0; y < 3; y++) {
          var win
          if ((x == 0 && y == 0) || (x == 3 && y == 0) || (x == 6 && y == 0)) {
            win = 0;
          }else if ((x == 0 && y == 1) || (x == 4 && y == 0)) {
            win = 1;
          }else if ((x == 0 && y == 2) || (x == 5 && y ==0) || (x == 7 && y == 0)) {
            win = 2;
          }else if ((x == 1 && y == 0) || (x == 3 && y == 1)) {
            win = 3;
          }else if ((x == 1 && y == 1) || (x == 4 && y == 1) ||(x == 6 && y == 1) || (x == 7 && y == 1)) {
            win = 4;
          }else if ((x == 1 && y == 2) || (x == 5 && y == 1)) {
            win = 5;
          }else if ((x == 2 && y == 0) || (x == 3 && y == 2) || (x == 7 && y == 2)) {
            win = 6;
          }else if ((x == 2 && y == 1) || (x == 4 && y == 2)) {
            win = 7;
          }else if ((x == 2 && y == 2) || (x == 5 && y == 2) || (x == 6 && y == 2)) {
            win = 8;
          }

          container.children[win].firstElementChild.style.cssText = 'color: #f1404b';
          if (logicOfWinning[x][0] == myChoose) {
            message.style.cssText = 'visibility: visible;opacity: 1;';
            message.innerHTML = 'Whoever wants my signature 😎<br> you are a loser 😝';
            container.style.pointerEvents = 'none';
          }else if (logicOfWinning[x][0] == hisChoose) {
            myChoose = null;
            message.style.cssText = 'visibility: visible;opacity: 1;';
            message.textContent = 'You won congratulations ⭐️';
            container.style.pointerEvents = 'none';
          }else if (logicOfWinning[x][0] == '<span>x</span>') {
            message.style.cssText = 'visibility: visible;opacity: 1;';
            message.innerHTML = 'Player <span style="color: #f1404b;font-size: 1.4em">X</span> is the winner';
            container.style.pointerEvents = 'none';
          }else {
            message.style.cssText = 'visibility: visible;opacity: 1;';
            message.innerHTML = 'Player <span style="color: #f1404b;font-size: 1.4em"">O</span> is the winner';
            container.style.pointerEvents = 'none';
          }
        }
        return;
      }
      if ((logicOfWinning[x][0] != undefined && logicOfWinning[x][1] != undefined && logicOfWinning[x][2] != undefined) &&
      (logicOfWinning[x][0] != logicOfWinning[x][1] || logicOfWinning[x][0] != logicOfWinning[x][2])) {
        z += 1;
      }
  }
  if (z == 8) {
    message.style.cssText = 'visibility: visible;opacity: 1;';
    message.textContent = 'There is no winner';
    container.style.pointerEvents = 'none';
  }
}