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

document.body.onload = () => {
  Func = [() => {}, () => {}];
  MessageBox(
    "净化重金属污水",
    "欢迎来到蛋白质合成实验室！<br>\
在这里，你将逐步地了解基因表达的过程——转录和翻译。通过合并相同的方块，你将从DNA的基本单位——脱氧核苷酸开始，\
经过DNA、RNA，最终合成基因表达的产物——蛋白质。\
要通过这一关，你需要<strong>合成 5 个蛋白质</strong>哦！<br>\
单击方块可以查看方块类型的介绍。\
<br>按键盘上的“↑”“↓”“←”“→”或 AWSD 键，可以朝不同方向合并方块。\
还等什么？快开始合成吧！",
    "⌨️开始！",
    undefined,
    "ecoli_..D",
    "500px"
  );
};
