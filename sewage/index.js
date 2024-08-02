function toHome() {
  window.location.href = "../index.html";
}

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
  modalImg.setAttribute("src", "../static/" + img + ".png");
  modal.style.width = box_width;
}

const MAX_SCORE = 200;

document.body.onload = () => {
  Func = [
    () => {
      document.getElementById("script-1").src = "ct.9adb326b8e.js";
    },
    () => {},
  ];
  MessageBox(
    "流水星球",
    "欢迎来到流水星球！<br>\
本来，这里山清水秀，但是几座化工厂的到来破坏了河流的生态环境！工厂排放的污水含有大量重金属离子，\
对河流里的鱼儿有致命的伤害，也非常不利于人类的健康！\
在“智能星球”上，我们已经制造了可以战胜重金属离子的“武器”——\
蛋白质。现在，小细菌已经整装待发，等着你喂给它吃重金属离子啦！<br><br>\
<br>按键盘上的“↑”“↓”“←”“→”或 AWSD 键，可以朝不同方向移动小细菌，让它吃掉重金属离子。<br>\
吃掉不同的重金属离子会得到不同的<strong>得分</strong>，同时细菌损失一定的<strong>能量</strong>。<br>\
当剩余的能量不足以吃掉对应的重金属离子时，你需要<strong>按下空格键消化重金属</strong>。\
消化完成后，需要间隔15秒才能再一次消化。<br>\
要通过这一关，你需要<strong>得到至少 " +
      MAX_SCORE +
      " 分</strong>。<br>\
还等什么？快开始吧！",
    "⌨️开始！",
    undefined,
    "ecoli_..D",
    "500px"
  );
};

const ENTER = "Enter";
window.onkeydown = function (evt) {
  var key = evt.key;
  if (!document.getElementById("modal").hasAttribute("class")) {
    if (key == ENTER) {
      fnClose(0);
    }
    return;
  }
};
