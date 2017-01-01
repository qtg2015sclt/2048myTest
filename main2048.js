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
}
