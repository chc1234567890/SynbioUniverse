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

const N_PR = 8;
const N_PR_CAT = 7;
const PR_CAT = [4, 4, 4, 4, 3, 2, 3];

var prs, pr_buc, pr_buc_num, belonging_ans, score_ele, ecoli, timer;

function shuffle(array) {
  let currentIndex = array.length;
  while (currentIndex != 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
}

function checkMatch() {
  var i, j;
  for (i = 0; i < 4; i++)
    if (pr_buc[i].getAttribute("class") == "cluster-image buc-click") break;
  for (j = 0; j < N_PR; j++)
    if (prs[j].getAttribute("class") == "pr pr-click") break;
  if (i == 4 || j == N_PR) return;
  if (Math.floor(belonging_ans[j] / 10) == pr_buc_num[i]) {
    score_ele.innerHTML = Number(score_ele.innerHTML - 1);
    if (score_ele.innerHTML == 0) {
      Func = [
        toHome,
        () => {
          location.reload();
        },
      ];
      MessageBox(
        "通关！",
        "恭喜你，成功完成任务！在你的帮助下，小细菌借助人工智能，很快找到了<strong>可以“吸收”和“消化”重金属离子的蛋白质</strong>！你花费的时间是：" +
          document.getElementById("nav-time").innerHTML +
          "！",
        "返回主页",
        "再来一轮",
        "ecoli_^^D"
      );
    }
    pr_buc[i].setAttribute("class", "cluster-image");
    prs[j].style.display = "none";
    ecoli.setAttribute("src", "./static/ecoli_^^D.png");
    setTimeout(() => {
      ecoli.setAttribute("src", "./static/ecoli_..).png");
    }, 800);
    return;
  }
  pr_buc[i].setAttribute("class", "cluster-image");
  prs[j].setAttribute("class", "pr");
  ecoli.setAttribute("src", "./static/ecoli_..o.png");
  setTimeout(() => {
    ecoli.setAttribute("src", "./static/ecoli_..).png");
  }, 800);
}

function init() {
  score_ele = document.getElementById("nav-score");
  score_ele.innerHTML = N_PR;
  ecoli = document.querySelector("#clusters > img");

  prs = document.querySelectorAll(".pr");
  pr_buc_num = new Array(N_PR_CAT);
  for (var i = 0; i < N_PR_CAT; i++) pr_buc_num[i] = i;
  shuffle(pr_buc_num);
  pr_buc_num = pr_buc_num.slice(0, 4);
  belonging_ans = new Array();
  for (var i = 0; i < 4; i++) {
    for (var j = 1; j < PR_CAT[pr_buc_num[i]]; j++) {
      belonging_ans.push(pr_buc_num[i] * 10 + j);
    }
  }
  shuffle(belonging_ans);
  belonging_ans = belonging_ans.slice(0, N_PR);
  pr_buc = document.querySelectorAll(".cluster-image");
  for (var i = 0; i < 4; i++) {
    pr_buc[i].style.backgroundImage =
      "url(" + prefix + "ai/pr" + (pr_buc_num[i] + 1) + "-1.png)";
    pr_buc[i].id = "buc-" + (i + 1);
    pr_buc[i].onclick = (e) => {
      var id = Number(e.target.id.slice(4)) - 1;
      for (var j = 0; j < 4; j++)
        pr_buc[j].setAttribute("class", "cluster-image");
      pr_buc[id].setAttribute("class", "cluster-image buc-click");
      checkMatch();
    };
  }
  for (var i = 0; i < N_PR; i++) {
    prs[i].style.transform = "rotate(" + Math.random() * 360 + "deg)";
    prs[i].style.height = Math.random() * 60 + 80 + "px";
    prs[i].style.left = Math.random() * 60 + 10 + "%";
    prs[i].style.top = Math.random() * 60 + 10 + "%";
    prs[i].setAttribute(
      "src",
      prefix +
        "ai/pr" +
        Math.floor(belonging_ans[i] / 10 + 1) +
        "-" +
        ((belonging_ans[i] % 10) + 1) +
        ".png"
    );
    prs[i].id = "pr-" + (i + 1);
    prs[i].onclick = (e) => {
      var id = Number(e.target.id.slice(3)) - 1;
      for (var j = 0; j < N_PR; j++) prs[j].setAttribute("class", "pr");
      prs[id].setAttribute("class", "pr pr-click");
      checkMatch();
    };
  }
  Func = [() => {}];
  MessageBox(
    "智能星球",
    "欢迎来到智能星球！<br>\
首先恭喜你！你已经了解了基因和蛋白质的基本概念！\
为了拯救流水星球，小细菌想寻找那些能对抗重金属污染的特殊蛋白质。然而，蛋白质的种类实在太多了！\
因此，小细菌希望利用人工智能的力量，把蛋白质分成几类再去寻找！<br>\
但是，在使用人工智能之前，你需要先为它做一个示范！<br>\
画面的下方会有 4 种不同的蛋白质。你的任务是，根据它们的特征，\
将剩下的蛋白质<strong>送回正确的类别</strong>。<br>\
<strong>单击屏幕中央框里的蛋白质</strong>，再<strong>单击屏幕下面对应的蛋白质类别</strong>，\
可以进行归类。\
要通过这一关，你需要<strong>把屏幕中的所有蛋白质都正确归类</strong>哦！<br>\
还等什么？快开始归类吧！",
    "⌨️开始！",
    undefined,
    "ecoli_..D",
    "500px"
  );

  if (timer) clearInterval(timer);
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
