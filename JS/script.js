let prev = "0",
  input = "";
let res = 0;
let currOp = "";
let sgn = 1;
const output = document.querySelector(".output");
function add(a, b) {
  return +a + +b;
}
let errFlg = false;

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
    case "-/+":
      return -b;
    case "clr":
      return 0;
  }
}
const op2Listener = (evt) => {
  if (input === "") {
    input = res;
  }
  res = operator(currOp, res, input + "") + "";
  currOp = evt.target.textContent;
  input = "";
  output.innerHTML = res;
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
};
const opInListener = (evt) => {
  if (input === "") input = res;
  input = operator(evt.target.innerHTML, input, input);
  output.innerHTML = input;
};

const nmListener = (evt) => {
  input += evt.target.textContent;
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
  itm.addEventListener("click", op1Listener);
});

document.querySelector(".calculator").addEventListener(
  "click",
  (evt) => {
    if (evt.target.classList.contains("button") && errFlg) clrErr();
  },
  true
);
