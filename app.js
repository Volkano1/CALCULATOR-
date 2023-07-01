const prevDisp = document.querySelector(".previous-display");
const currDisp = document.querySelector(".current-display");

const btnContainer = document.querySelector(".buttons-container");

let currOperand='';
let previousOperand='';
let operation='';

//butonları taşıyan container için event tanımlaması//
btnContainer.addEventListener("click", (e) => {
 //console.log(e.target);//
 if(e.target.classList.contains('num')) {
    //console.log(e.target.textContent);//
    appendNumber(e.target.textContent);
    updateDisplay();}

    //herhangi bir operator butonuna tıklanıldı (+ - / *) ise//
  if(e.target.classList.contains('operator')) {
      chooseoperator(e.target.textContent);
      updateDisplay();
   }

   // eşittir butonuna tıklanıldı ise//
   if(e.target.classList.contains('equal')) {
    calculate();
    updateDisplay();
 }
 //ac butonuna tıklanıldı ise//
 if(e.target.classList.contains('ac')) {
  previousOperand='';
  currOperand='';
  operation='';
  updateDisplay();
}
//pm butonuna tıklanıldı ise - ye çevirme// 
if(e.target.classList.contains('pm')) {
  if(!currOperand) return; // direk bastığımızda ilkin bu fonk yoksa 0 ile başlıyordu bunu engellemek için bu fonk yazdık//
  currOperand *= -1;
  updateDisplay();
}
// percent tıklanıldığında//
if(e.target.classList.contains('percent')) {

  if(!currOperand) return;
  currOperand = currOperand /100;
  updateDisplay();
}
});

const appendNumber = (num) => {
  //eğer önceden 0 girilmişse ve tekrardan 0 girilirse geri dön//
  if(currOperand==="0" && num === '0') return;

//? eğer ilk olarak 0 girilmişse ve sonrasında da . haricinde 
//?başka bir sayı girilmişse sadece girilen yeni sayıyı değişkene aktar 
//?örn: 09 = > 9, 03 => 3, 01 => 1

  if(currOperand === "0" && num !== '.'){
    currOperand = num;
    return;
  }

  if(num==='.' && currOperand.includes(".")) return;

  if(currOperand.length> 10) return;

  currOperand += num;

};

const updateDisplay = () => {
  if(currOperand.toString().length > 11){
    currOperand = Number(currOperand).toExponential(3);
  }
 currDisp.textContent = currOperand;
 //prevDisp.textContent = previousOperand + operation;//
 prevDisp.textContent =`${previousOperand} ${operation}`;

};

const chooseoperator = (op) => {
 //if(!currOperand) return;// 
 //ilk sayı girişinden sonraki şlemleri gerçekleştir//
 if(previousOperand) {
  calculate();
 }
 //değişken swapling takaslama yaptık//
 operation = op;
previousOperand = currOperand;
currOperand= '';

};

const calculate = () => {
let calculation = 0;
const prev = Number(previousOperand);
const current = Number(currOperand);  

switch (operation) {
  case '+':
    calculation = prev + current;
    break;
  case '-':
    calculation = prev - current;
    break;
  case 'x':
      calculation = prev * current;
      break;
  case '÷':
    calculation = prev / current;
    break;
  default:
    return;
}

currOperand = calculation;

// eşittir butonuna tıklanıldığında ekranda gözükmemesi için previousOperand ına ve operationu silmemiz gerekli//
previousOperand='';
operation = '';

};

