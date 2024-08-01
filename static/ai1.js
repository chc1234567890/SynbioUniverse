function toHome() {
  window.location.href = "./index.html";
}
const prefix = "./static/";

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
