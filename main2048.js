//数据简单，放主逻辑里：
var board = new Array();
var score = 0;

//程序加载完成后运行的主函数，只做一件事：开始游戏newgame
$(document).ready(function()
{
  newgame();
});

function newgame()
{
  //初始化棋盘格
   init();
  //随机在两个格子里生成数字(2 or 4)
  generateOneNumber();
  generateOneNumber();
}

function init()
{
  for(var i = 0;i < 4;i++)
  {
    for(var j = 0;j < 4;j++)
    {
      var gridCell = $('#grid-cell-' + i + "-" + j);
      gridCell.css('top', getPosTop(i, j));
      gridCell.css('left', getPosLeft(i, j));
    }
  }
  for(var i = 0;i < 4;i++)
  {
    board[i] = new Array();
    for(var j = 0;j < 4;j++)
      board[i][j] = 0;
  }
  updateBoardView();
  score = 0;
}
function updateBoardView()
{
  $(".number-cell").remove();
  for(var i = 0;i < 4;i++)
    for(var j = 0;j < 4;j++)
    {
      $("#grid-container").append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
      var theNumberCell = $('#number-cell-'+i+'-'+j);
      if(board[i][j] == 0)
      {
        theNumberCell.css('width', '0px');
        theNumberCell.css('height', '0px');
        theNumberCell.css('top', getPosTop(i, j) + 50);
        theNumberCell.css('left', getPosLeft(i, j) + 50);
      }
      else {
        theNumberCell.css('width', '100px');
        theNumberCell.css('height', '100px');
        theNumberCell.css('top', getPosTop(i, j));
        theNumberCell.css('left', getPosLeft(i, j));
        theNumberCell.css('background-color', getNumberBackgroundColor(board[i][j]));
        theNumberCell.css('color', getNumberColor(board[i][j]));
        theNumberCell.text(board[i][j]);
      }
    }
}
function generateOneNumber() {
  if(nospace(board))
    return false;
  //随机一个位置
  var randx = parseInt(Math.floor(Math.random() * 4));
  var randy = parseInt(Math.floor(Math.random() * 4));
  while(true)
  {
    if(board[randx][randy] == 0)
      break;
    randx = parseInt(Math.floor(Math.random() * 4));
    randy = parseInt(Math.floor(Math.random() * 4));
  }

  //随机一个数
  var randNumber = Math.random() < 0.5 ? 2 : 4;

  //在随机位置显示随机数字
  board[randx][randy] = randNumber;
  showNumberWithAnimation(randx, randy, randNumber);

  return true;
}
$(document).keydown(function(event) {
  switch (event.keyCode) {
    case 37://left
      if(moveLeft())
      {
        setTimeout("generateOneNumber()",250);
        isgameover();
      }
      break;
    case 38://up
      if(moveUp())
      {
        setTimeout("generateOneNumber()",250);
        isgameover();
      }
      break;
    case 39://right
      if(moveRight())
      {
        setTimeout("generateOneNumber()",250);
        isgameover();
      }
      break;
    case 40://down
      if(moveDown())
      {
        setTimeout("generateOneNumber()",250);
        isgameover();
      }
      break;
    default://default
      break;
  }
});
function isgameover() {
  if(nospace(board) && noMove(board))
  {
    gameover();
  }
}
function gameover() {
  alert("gameover!");
}
function moveLeft() {
  if(!canMoveLeft(board))
    return false;

  //moveLeft
  for(var i = 0;i < 4;i++)
    for(var j = 1;j < 4;j++)
    {
      if(board[i][j] != 0)
      {
        for(var k = 0;k < j;k++)
        {
          if(board[i][k] == 0 && noBlockHorizontal(i, k, j, board))
          {
            //move
            showMoveAnimation(i, j, i, k);
            board[i][k] = board[i][j];
            board[i][j] = 0;
            break;//用continue也可以，但是用break更合逻辑
          }
          else if(board[i][k] == board[i][j] && noBlockHorizontal(i, k, j, board))
          {
            //move
            showMoveAnimation(i, j, i, k);
            //add
            board[i][k] += board[i][j];
            board[i][j] = 0;
            //add score
            score += board[i][k];
            updateScore(score);
            break;
          }
        }
      }
    }
  setTimeout("updateBoardView()",200);
  return true;
}
function moveRight() {
  if(!canMoveRight(board))
    return false;

  //moveLeft
  for(var i = 0;i < 4;i++)
    for(var j = 2;j >= 0;j--)
    {
      if(board[i][j] != 0)
      {
        for(var k = 3;k > j;k--)
        {
          if(board[i][k] == 0 && noBlockHorizontal(i, j, k, board))
          {
            //move
            showMoveAnimation(i, j, i, k);
            board[i][k] = board[i][j];
            board[i][j] = 0;
            break;//用continue也可以，但是用break更合逻辑
          }
          else if(board[i][k] == board[i][j] && noBlockHorizontal(i, j, k, board))
          {
            //move
            showMoveAnimation(i, j, i, k);
            //add
            board[i][k] += board[i][j];
            board[i][j] = 0;
            //add score
            score += board[i][k];
            updateScore(score);
            break;
          }
        }
      }
    }
  setTimeout("updateBoardView()",200);
  return true;
}
function moveUp() {
  if(!canMoveUp(board))
    return false;

  //moveUp
  for(var i = 1;i < 4;i++)
    for(var j = 0;j < 4;j++)
    {
      if(board[i][j] != 0)
      {
        for(var k = 0;k < i;k++)
        {
          if(board[k][j] == 0 && noBlockVertical(k, i, j, board))
          {
            //move
            showMoveAnimation(i, j, k, j);
            board[k][j] = board[i][j];
            board[i][j] = 0;
            break;//用continue也可以，但是用break更合逻辑
          }
          else if(board[k][j] == board[i][j] && noBlockVertical(k, i, j, board))
          {
            //move
            showMoveAnimation(i, j, k, j);
            //add
            board[k][j] += board[i][j];
            board[i][j] = 0;
            //add score
            score += board[k][j];
            updateScore(score);
            break;
          }
        }
      }
    }
  setTimeout("updateBoardView()",200);
  return true;
}
function moveDown() {
  if(!canMoveDown(board))
    return false;

  //moveUp
  for(var i = 2;i >= 0;i--)
    for(var j = 0;j < 4;j++)
    {
      if(board[i][j] != 0)
      {
        for(var k = 3;k > i;k--)
        {
          if(board[k][j] == 0 && noBlockVertical(i, k, j, board))
          {
            //move
            showMoveAnimation(i, j, k, j);
            board[k][j] = board[i][j];
            board[i][j] = 0;
            break;//用continue也可以，但是用break更合逻辑
          }
          else if(board[k][j] == board[i][j] && noBlockVertical(i, k, j, board))
          {
            //move
            showMoveAnimation(i, j, k, j);
            //add
            board[k][j] += board[i][j];
            board[i][j] = 0;
            //add score
            score += board[k][j];
            updateScore(score);
            break;
          }
        }
      }
    }
  setTimeout("updateBoardView()",200);
  return true;
}
