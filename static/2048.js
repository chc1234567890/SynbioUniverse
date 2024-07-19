function toHome() {
  window.location.href = "/";
}
function toEdit() {
  window.location.href = "/edit";
}
const prefix = "/SynbioUniverse/static/";

var Func = [];
function fnClose(res) {
  document.getElementById("modal").setAttribute("class", "hidden");
  document.getElementById("modal-cover").setAttribute("class", "hidden");
  document.getElementById("modal-img").setAttribute("class", "hidden");
  Func[res]();
}
function MessageBox(
  title,
  content,
  btnText1,
  btnText2,
  img,
  box_width = "300px"
) {
  var modal = document.getElementById("modal");
  var modalCover = document.getElementById("modal-cover");
  var modalImg = document.getElementById("modal-img");
  modal.removeAttribute("class");
  modalCover.removeAttribute("class");
  modalImg.removeAttribute("class");
  var divTitle = modal.children[0],
    divContent = modal.children[1].children[0],
    btn1 = modal.children[2].children[0],
    btn2 = modal.children[2].children[1];
  divTitle.innerHTML = title;
  divContent.innerHTML = content;
  btn1.innerHTML = btnText1;
  if (btnText2 != undefined) {
    btn2.setAttribute("class", "close-but");
    btn2.innerHTML = btnText2;
  } else {
    btn2.setAttribute("class", "hidden");
  }
  modalImg.setAttribute("src", prefix + img + ".png");
  modal.style.width = box_width;
}

const LEFT = 37;
const UP = 38;
const RIGHT = 39;
const DOWN = 40;
const KEYS = [LEFT, RIGHT, UP, DOWN];
const RNUM = 4;
const CNUM = 4;
const nProtein = 5;
const mp = {
  0: "",
  2: "脱氧核苷酸",
  4: "寡核苷酸链",
  8: "长核苷酸链",
  16: "单链DNA",
  32: "双链DNA",
  64: "mRNA",
  128: "多肽链",
  256: "蛋白质",
};
const knowledge = {
  0: "",
  2: "就像是基因的“乐高积木”，它们是DNA的基本构建单位，每个脱氧核苷酸由一个磷酸、一个脱氧核糖和一个碱基组成。",
  4: "想象一下这是一个短短的“乐高积木链”，由少数几个脱氧核苷酸连接在一起，通常用于实验室中的基因研究和诊断。",
  8: "这是一个更长的“乐高积木链”，由许多脱氧核苷酸连接而成。",
  16: "一条完整的“乐高积木链”，它是DNA的一半，通常在复制和转录过程中出现。",
  32: "这是两条“乐高积木链”相互缠绕形成的双螺旋结构，是我们通常所说的DNA的形态，包含了所有遗传信息。",
  64: "这是基因表达的“信使”，它携带着DNA的指令，从细胞核到细胞质，指导蛋白质的合成。核糖体附着在mRNA上，以它为模板合成多肽链。",
  128: "由mRNA的指令合成的分子，这是一个由另一种“积木”——氨基酸组成的长链。多肽链是蛋白质的前身，通过折叠和修饰，最终形成功能完整的蛋白质。",
  256: "最终的“产品”，执行细胞中的各种功能，比如充当支架、抵御病毒入侵、和其他细胞交流等。",
};

var rect, protein;
function rand(l, r) {
  return Math.floor(Math.random() * (r - l + 1)) + l;
}
function Move0(tb) {
  ret_score = 0;
  for (var i = 0; i < tb.length; i++) {
    for (var j = 0, k; j < tb[i].length; j++) {
      if (tb[i][j] == 0) continue;
      for (k = j + 1; k < tb[i].length && tb[i][k] == 0; k++);
      if (k < tb[i].length && tb[i][j] == tb[i][k]) {
        tb[i][j] <<= 1;
        ret_score += tb[i][j];
        tb[i][k] = 0;
      }
      j = k - 1;
    }
    var v = new Array();
    for (var j = 0; j < tb[i].length; j++) if (tb[i][j] != 0) v.push(tb[i][j]);
    for (var j = 0; j < tb[i].length; j++) tb[i][j] = j < v.length ? v[j] : 0;
  }
  return ret_score;
}
function Move(tb, key) {
  ret_score = 0;
  if (key == LEFT) {
    ret_score = Move0(tb);
  }
  if (key == RIGHT) {
    for (var i = 0; i < tb.length; i++) tb[i].reverse();
    ret_score = Move0(tb);
    for (var i = 0; i < tb.length; i++) tb[i].reverse();
  }
  if (key == UP) {
    var t = new Array(tb[0].length);
    for (var j = 0; j < tb[0].length; j++) {
      t[j] = new Array();
      for (var i = 0; i < tb.length; i++) {
        t[j].push(tb[i][j]);
      }
    }
    for (var i = 0; i < t.length; i++)
      for (var j = 0; j < t[0].length; j++) tb[i][j] = t[i][j];
    ret_score = Move0(tb);
    t = new Array(tb[0].length);
    for (var j = 0; j < tb[0].length; j++) {
      t[j] = new Array();
      for (var i = 0; i < tb.length; i++) {
        t[j].push(tb[i][j]);
      }
    }
    for (var i = 0; i < t.length; i++)
      for (var j = 0; j < t[0].length; j++) tb[i][j] = t[i][j];
  }
  if (key == DOWN) {
    var t = new Array(tb[0].length);
    for (var j = 0; j < tb[0].length; j++) {
      t[j] = new Array();
      for (var i = 0; i < tb.length; i++) {
        t[j].push(tb[i][j]);
      }
    }
    for (var i = 0; i < t.length; i++)
      for (var j = 0; j < t[0].length; j++) tb[i][j] = t[i][j];
    for (var i = 0; i < tb.length; i++) tb[i].reverse();
    ret_score = Move0(tb);
    for (var i = 0; i < tb.length; i++) tb[i].reverse();
    t = new Array(tb[0].length);
    for (var j = 0; j < tb[0].length; j++) {
      t[j] = new Array();
      for (var i = 0; i < tb.length; i++) {
        t[j].push(tb[i][j]);
      }
    }
    for (var i = 0; i < t.length; i++)
      for (var j = 0; j < t[0].length; j++) tb[i][j] = t[i][j];
  }
  return ret_score;
}
function setRect(i, val) {
  var div = rect[i].children[0];
  // div.innerHTML = val == 0 ? "" : mp[val];
  rect[i].setAttribute("class", "r" + val + " r");
  if (val != 0) {
    div.style.backgroundImage = "url(" + prefix + "r" + val + ".png)";
  } else div.style.backgroundImage = "";
}
function copy(t) {
  var t1 = new Array(RNUM);
  for (var i = 0; i < RNUM; i++) {
    t1[i] = new Array();
    for (var j = 0; j < CNUM; j++) t1[i].push(t[i][j]);
  }
  return t1;
}
function showCard(rec) {
  var num = Number(rec.getAttribute("id").slice(1));
  num = table[Math.floor(num / RNUM)][num % RNUM];
  Func = [() => {}, () => {}];
  MessageBox(
    mp[num],
    "　　" + knowledge[num],
    "继续游戏",
    undefined,
    "r" + num
  );
}
function addScore(add_score) {
  var nav_score = document.getElementById("nav-score");
  nav_score.innerHTML = String(Number(nav_score.innerHTML) + add_score);
}

function Pr(num) {
  console.log("Protein! " + String(num));
  protein[++cntProtein].setAttribute("src", prefix + "protein.png");
  table[Math.floor(num / RNUM)][num % RNUM] = 0;
  var rPr = document.getElementById("rPr");
  rPr.style.display = "flex";
  rPr.style.top = String(2 + Math.floor(num / RNUM) * 12.5) + "vmin";
  rPr.style.left = String(2 + (num % RNUM) * 12.5) + "vmin";
  rPr.style.height = rPr.style.width = "10.5vmin";
  rPr.className = "rPr r256 r";
  setTimeout(() => {
    rPr.className = "r256 r";
    rPr.style.display = "none";
    if (cntProtein == 5) {
      Func = [toHome, init];
      MessageBox(
        "通关！",
        "恭喜你，成功合成了 5 个蛋白质！你花费的时间是：" +
          document.getElementById("nav-time").innerHTML +
          "，得分是：" +
          document.getElementById("nav-score").innerHTML +
          "分！",
        "返回主页",
        "再来一轮"
      );
      return;
    }
  }, 1500);
}

var timer;
var cntProtein;
var table, table1;
function init() {
  rect = new Array(RNUM * CNUM);
  ps = new Array(RNUM * CNUM);
  table = new Array(RNUM);
  for (var i = 0; i < RNUM; i++) table[i] = new Array();
  var vec = new Array();
  for (var i = 0; i < 2; i++) {
    var tmp = rand(0, RNUM * CNUM);
    while (vec.indexOf(tmp) != -1) tmp = rand(0, RNUM * CNUM);
    vec.push(tmp);
  }

  var rPr = document.getElementById("rPr");
  rPr.style.display = "none";
  rPr.style.position = "absolute";
  rPr.style.zIndex = 10;
  rPr.className = "r256 r";
  rPr.innerHTML = "蛋白质";

  for (var i = 0; i < RNUM * CNUM; i++) {
    rect[i] = document.getElementById("r" + i);
    var val = vec.indexOf(i) != -1 ? 2 : 0;
    setRect(i, val);
    rect[i].setAttribute("onclick", "showCard(this)");
    table[Math.floor(i / RNUM)].push(val);
  }
  window.onkeydown = function (evt) {
    if (!document.getElementById("modal").hasAttribute("class")) return;
    var key = evt.keyCode;
    if (key != UP && key != DOWN && key != LEFT && key != RIGHT) return;
    table1 = copy(table);
    add_score = Move(table1, key);
    addScore(add_score);
    if (table1.toString() == table.toString()) {
      var table2;
      var flag = false;
      for (var i of KEYS) {
        if (
          i != key &&
          ((table2 = copy(table)),
          Move(table2, i),
          table2.toString() != table.toString())
        ) {
          flag = true;
          break;
        }
      }
      if (!flag) {
        Func = [init, toHome];
        MessageBox(
          "游戏结束",
          "啊哦，没有可移动的方块了!请点击确定，再来一轮吧！",
          "再来一轮",
          "返回主页",
          "ecoli_..o"
        );
        return;
      }
    }
    table = copy(table1);
    for (var i = 0; i < RNUM; i++)
      for (var j = 0; j < CNUM; j++)
        if (table[i][j] == 256) {
          Pr(i * RNUM + j);
        }
    var v = new Array();
    for (var i = 0; i < RNUM; i++)
      for (var j = 0; j < CNUM; j++) if (table[i][j] == 0) v.push(i * RNUM + j);
    if (v.length > 0) {
      var tmp = rand(0, v.length - 1);
      table[Math.floor(v[tmp] / RNUM)][v[tmp] % RNUM] = 2;
      for (var i = 0; i < RNUM * CNUM; i++) {
        setRect(i, table[Math.floor(i / RNUM)][i % RNUM]);
      }
    }
  };
  /* reset the counter */
  document.getElementById("nav-time").innerHTML = "00 : 00";
  document.getElementById("nav-score").innerHTML = "0";

  document.getElementById("modal").setAttribute("class", "hidden");
  document.getElementById("modal-cover").setAttribute("class", "hidden");
  document.getElementById("modal-img").setAttribute("class", "hidden");

  protein = new Array(nProtein);
  cntProtein = 0;
  for (var i = 1; i <= nProtein; i++) {
    protein[i] = document.getElementById("protein-" + i);
    protein[i].setAttribute("src", prefix + "protein-empty.png");
  }
  Func = [() => {}, () => {}];

  if (timer) clearInterval(timer);

  MessageBox(
    "蛋白质合成实验室",
    "欢迎来到蛋白质合成实验室！<br>\
在这里，你将逐步地了解基因表达的过程——转录和翻译。通过合并相同的方块，你将从DNA的基本单位——脱氧核苷酸开始，\
经过DNA、RNA，最终合成基因表达的产物——蛋白质。\
要通过这一关，你需要<strong>合成 5 个蛋白质</strong>哦！<br>\
单击方块可以查看方块类型的介绍。\
<br>按键盘上的“↑”“↓”“←”“→”方向键，可以朝不同方向合并方块。\
还等什么？快开始合成吧！",
    "⌨️开始！",
    undefined,
    "ecoli_..D",
    "500px"
  );

  timer = setInterval(() => {
    var timer_ele = document.getElementById("nav-time");
    var str = timer_ele.innerHTML;
    var tmin = Number(str.slice(0, 2)),
      tsec = Number(str.slice(5));
    if (++tsec == 60) {
      ++tmin;
      tsec = 0;
    }
    timer_ele.innerHTML =
      (tmin < 10 ? "0" : "") + tmin + " : " + (tsec < 10 ? "0" : "") + tsec;
  }, 1000);
}
