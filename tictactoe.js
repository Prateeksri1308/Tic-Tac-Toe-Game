// URL = "https://php-noise.com/noise.php?";

let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset-button");
let msg = document.querySelector("#msg");
let msgconatiner = document.querySelector(".msg-container");
let newbtn = document.querySelector("#new-button");
let msgBox = document.querySelector(".msg-box");
let bgImage = document.querySelector(".container-bg");
let msgBoxText = document.querySelector(".msg-box span");

// const img = document.querySelector(".msg-container img");




const resetGame = () =>{
    turnO = true;
    enableBoxes();
    msgconatiner.classList.add("hide");
    count = 0;
    SetBackgroundImage();
    Quote();
    QuoteText();
};

let count = 0;

let turnO = true;

const winPattern = [
    [0,1,2],
    [0,3,6],
    [3,4,5],
    [6,7,8],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];


boxes.forEach((box) =>{
    box.addEventListener("click",() =>{
        if(turnO === true){
            box.innerText = "X";
            turnO = false;
            // console.log("true")
        } else {
            box.innerText = "O";
            turnO = true;
        }
        count++;
        box.disabled = true;
        checkWinner();
        // console.log(count);

    });
});

const disableBoxes = () =>{
    for(let box of boxes){
        box.disabled = true;        
    }
}
const enableBoxes = () =>{
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}

const showWinner = async (winner, newImg) => {
    msg.innerText = `Congratulations , Winner is ${winner}`;
    msgconatiner.classList.remove("hide");
    disableBoxes();
}
// showWinner();

const drawGame = () =>{
    msg.innerText = "The Match was Draw";
    msgconatiner.classList.remove("hide");
    count = 0;
}



const checkWinner = async () =>{

    for(pattern of winPattern){
    let val1 = boxes[pattern[0]].innerText;
    let val2 =  boxes[pattern[1]].innerText;
    let val3 =  boxes[pattern[2]].innerText;
    
    if(val1 != "" && val2 != "" && val3 != ""){
        if(val1 === val2 && val2 === val3){
            showWinner(val1);
        }if(count === 9){
            drawGame();
            count=0;
        }
    }
}


/* et img = element.msgconatiner.querySelector("img");
let img.src = "" */
};

newbtn.addEventListener("click", resetGame);
resetbtn.addEventListener("click", resetGame);


let currBlobUrl = null;
async function SetBackgroundImage() {

    const randomUrl = `https://php-noise.com/noise.php?t=${Date.now()}`;

    let response = await fetch(randomUrl);
    let blob = await response.blob();
    const imageUrl = URL.createObjectURL(blob);

    // URL.createObjectURL(blob);
    // console.log(blob);
    
    
    if (currBlobUrl) {
        URL.revokeObjectURL(currBlobUrl);
    }
    
   currBlobUrl = imageUrl;
    
    // console.log("image.url",URL)
    const bgBox = document.getElementById("bg-box");
    bgBox.style.backgroundImage = `url(${imageUrl})`;
    bgBox.style.backgroundSize = "cover";
    bgBox.style.backgroundPosition = "center";
}

// SetBackgroundImage();

window.onload = () => {
    // SetBackgroundImage();
    resetGame();
}

async function Quote() {
    const RandomColorUrl = "https://x-colors.yurace.pro/api/random/228";
    let response = await fetch(RandomColorUrl);
    let data =  await response.json();

    // console.log(data.hex);

    msgBox.style.backgroundColor = data.hex;
}

async function QuoteText() {
    const RandomQuoteUrl = "https://quotes-api-self.vercel.app/quote"
    let respose = await fetch(RandomQuoteUrl);
    let data  = await respose.json();

    // console.log(data.quote);
    let innerText = data.quote;
    msgBoxText.innerText = data.quote;
}

async function SetBgColor() {
    const RandomBgUrl = "https://cors-anywhere.herokuapp.com/https://api.nekosapi.com/v4/images/random";
    
    let response = await fetch(RandomBgUrl);
    let blob = await response.blob();
    const imgUrl = URL.createObjectURL(blob);


    let cont = document.querySelector(".container-bg");

    cont.style.backgroundImage = `url(${imgUrl})`;
    console.log("bg = ",  blob);

}
SetBgColor();

// QuoteText();