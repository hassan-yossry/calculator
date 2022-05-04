let prev = "0",
  input = "";
let res = "0";
let currOp = "";
let sgn = 1;

let errFlg = false;
let dotFlg = true;

const output = document.querySelector(".output span");
const errElm = document.querySelector(".err");

function add(a, b) {
  return +a + +b;
}

const err = function (msg) {
  errFlg = true;
  document.querySelector(".err").innerHTML = msg;
};
const clrErr = function () {
  errFlg = false;
  document.querySelector(".err").innerHTML = "";
};
function sunbtact(a, b) {
  return +a - +b;
}
function mult(a, b) {
  return +a * +b;
}
function div(a, b) {
  if (b == 0) {
    err(`Can't divide by 0`);
    return 0;
  }
  return a / b;
}
function operator(op, a, b) {
  switch (op) {
    case "":
    case "=":
      return b;
    case "cos":
      return Math.cos(b);
    case "sin":
      return Math.sin(b);
    case "exp":
      return Math.exp(b);
    case "+":
      return add(a, b);
    case "-":
      return sunbtact(a, b);
    case "*":
      return mult(a, b);
    case "/":
      return div(a, b);
    case "\u00B1":
      return -b;
    case "clr":
      return 0;
  }
}

const enableDot = () => {
  if (!dotFlg) {
    btn = document.querySelector(".dot");
    dotFlg = true;
    btn.backgrounColor = "white";
  }
};
const op2Listener = (evt) => {
  if (input === "") {
    if (currOp && currOp !== evt.target.textContent) {
      currOp = evt.target.textContent;
      return;
    }
    input = res;
  }
  res = operator(currOp, res, input + "") + "";
  currOp = evt.target.textContent;
  input = "";
  output.innerHTML = res;

  enableDot();
};

const op1Listener = (evt) => {
  if (input === "") {
    input = res;
  }
  input = operator(currOp, res, input + "") + "";
  res = operator(evt.target.textContent, input, input + "") + "";
  currOp = "";
  input = "";
  output.innerHTML = res;

  enableDot();
};
const opInListener = (evt) => {
  if (input === "") input = res;
  input = operator(evt.target.textContent, input, input);
  output.innerHTML = input;
};

const nmListener = (evt) => {
  input += evt.target.textContent;
  if (input.length >= 2 && input[0] == "0") input = input.substring(1);
  output.innerHTML = input;
};

document.querySelectorAll(".num").forEach((itm) => {
  itm.addEventListener("click", nmListener);
});

document.querySelectorAll(".op2").forEach((itm) => {
  itm.addEventListener("click", op2Listener);
});

document.querySelectorAll(".op1").forEach((itm) => {
  itm.addEventListener("click", op1Listener);
});

document.querySelectorAll(".in").forEach((itm) => {
  itm.addEventListener("click", opInListener);
});

document.querySelector(".calculator").addEventListener(
  "click",
  (evt) => {
    if (evt.target.classList.contains("button") && errFlg) clrErr();
  },
  true
);

document.querySelector(".dot").addEventListener("click", (e) => {
  if (dotFlg) {
    nmListener(e);
  }
  dotFlg = false;
});

document.querySelector(".bck").addEventListener("click", () => {
  if (input === "") input = res;
  if (input !== "") {
    const last = input.slice(-1);
    input = input.slice(0, -1);
    if (isNaN(+input)) input = "";
    document.querySelector(".output span").innerHTML = input || "0";
    if (last === ".") {
      dotFlg = true;
    }
  }
});
