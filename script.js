

//=====================================================================================
// =========================== CRIA LÓGICA DA PÁGINA ==================================
//=====================================================================================

// Declarações
let pallet = document.querySelector('#color-palette');
let colors = pallet.childNodes;
let buttonRandomColors = document.querySelector('#button-random-color');
let title = document.querySelector('title');
let colorsPallet = [];
let colorToPaint = 'black';
let selected = document.querySelector('#selected')
let reference = [];
// verifica se existe banco de dados e decide quais cores a peleta terá;
if (localStorage.getItem('colorPalette') == null) {
    colorsPallet = [randomColor(),randomColor(),randomColor()];
} else {
    colorsPallet = localStorage.getItem('colorPalette').split(',');
}
// aplica as cores na paleta
for (let index = 1; index < 4; index += 1) {
    colors[index].style.backgroundColor = colorsPallet[index - 1];
}

// Botão que muda as cores da paleta de forma aleatória
buttonRandomColors.addEventListener('click', () => {
    colorsPallet = [randomColor(),randomColor(),randomColor()];
    for (let index = 1; index < 4; index += 1) {
        colors[index].style.backgroundColor = colorsPallet[index - 1];
    }

    localStorage.setItem('colorPalette', colorsPallet);
});



// Gera cores aleatórias
function randomColor() {
    let chars = '0123456789ABCDEF';
    let colorHex = '#'
    for (let index = 0; index < 6; index += 1){
        colorHex += chars[Math.floor(Math.random() * 16)];
    } 
    return colorHex;
}

//=====================================================================================
// ========================== CRIA QUADRO DE PIXELS ===================================
//=====================================================================================

// declarações
let pixelBoard = document.querySelector('#pixel-board');
let pixel = document.querySelector('#pixel');
let black =  document.querySelector('#black');
let color1 = document.querySelector('#color1');
let color2 = document.querySelector('#color2');
let color3 = document.querySelector('#color3');
let savedDraw = [];

// verifica se há um tamanho de pixels salvo 
if (localStorage.getItem('boardSize') == null) {
    localStorage.setItem('boardSize', JSON.stringify(5));    
    startNumberOfPixels = 5;
} else {
    startNumberOfPixels = JSON.parse(localStorage.getItem('boardSize'));
}

// cria os pixels

function createPixels(size) {
    pixelBoard.style.width = `${42 * size}px`
    let nums = size * size;
    for (let index = 0; index < nums; index += 1) {
        let newPixel = document.createElement('div');
        newPixel.setAttribute('id', index);
        newPixel.setAttribute('class', 'pixel')
        newPixel.addEventListener('mousedown', paint);
        pixelBoard.appendChild(newPixel);
    }
}
createPixels(startNumberOfPixels);
// Define o preto como cor inicial


black.classList.add('selected');




//=====================================================================================
// =========================== CRIA PINTURA DOS PIXELS ================================
//=====================================================================================
let btnReset = document.querySelector('#clear-board');
// Seleciona cor na paleta
black.addEventListener("click", setSelected);
color1.addEventListener("click", setSelected);
color2.addEventListener("click", setSelected);
color3.addEventListener("click", setSelected);
    

black.style.backgroundColor = 'black';

function setSelected(event) {
    let clicked = event.target;
    let toRemove = document.querySelector('.selected');
    toRemove.classList.remove('selected');
    clicked.classList.add('selected');
    colorToPaint = clicked.style.backgroundColor;


}
function paint(event) {
    let target = event.target;
    target.style.backgroundColor = colorToPaint;
    saveDraw();
    

}

// limpa os pixels

btnReset.addEventListener('click',clearPixels);

let allPixels= pixelBoard.childNodes;

function clearPixels() {
    for (let index = 0; index < allPixels.length; index += 1) {
        allPixels[index].style.backgroundColor = 'white';
        
    }   
    savedDraw = [];
    localStorage.setItem('pixelBoard', JSON.stringify(savedDraw));
    console.log(localStorage.getItem('pixelBoard'));
}

//=====================================================================================
// =========================== SALVA DESENHOS NA PÁGINA ===============================
//=====================================================================================

 
  
// desenha na tela ao carregar a página
for (let index = 0; index < allPixels.length; index += 1) {
    
}


// salva as cores no Local storage
localStorage.setItem('colorPalette', colorsPallet);

function saveDraw() {
    savedDraw = [];
    for (let index = 0; index < allPixels.length; index += 1) {
        savedDraw.push(allPixels[index].style.backgroundColor);
    }

    localStorage.setItem('pixelBoard', JSON.stringify(savedDraw));
    // console.log(reference);
   
};



// verifica se há desenho para carregar
if (localStorage.getItem('pixelBoard') === null) {
    localStorage.setItem('pixelBoard', JSON.stringify(savedDraw));
} else {
    reference = JSON.parse(localStorage.getItem('pixelBoard'));
    for (let index = 0; index < allPixels.length; index += 1) {
       if (reference[index] == '') {
        allPixels[index].style.backgroundColor =   'white';
       } else {
        allPixels[index].style.backgroundColor = reference[index];
       }
    }
}
   
//=====================================================================================
//============================ ALTERA TAMANHO DO CANVAS ===============================
//=====================================================================================
let resizeInput = document.querySelector('#board-size');
let resizeButton = document.querySelector('#generate-board');
// let allPixels= pixelBoard.childNodes; *já declarada anteriormente*
// let pixelBoard = document.querySelector('#pixel-board'); *já declarada anteriormente*

// adiciona escutador de evento de clique ao botão '#generate-board' que chama a função 'resizeBoard()'
resizeButton.addEventListener('click', resizeBoard);

// função para mudar o tamanho da board 
function resizeBoard() {
    // pega todos os valores que serão usados
    let selectedSize = Math.floor(resizeInput.value);
    if (selectedSize === 0) {
        return alert('Board inválido!')
    }
    if (selectedSize < 5) {
        selectedSize = 5;
    }
    if (selectedSize > 50) {
        selectedSize = 50;
    }
    
    let sizeOfFor = allPixels.length;
    console.log(selectedSize);
    // exclui os pixels e limpa o local storage
    for (let index = 0; index < sizeOfFor; index += 1) {
        let pixelToRemove = document.getElementById(index);
        pixelToRemove.remove();
    }
   
    // muda o tamanho da board
    pixelBoard.style.width = `${42 * selectedSize}px`
    
    //cria os pixels novamente
    createPixels(selectedSize);

    //salva o numero atual no local storage
    localStorage.setItem('boardSize', JSON.stringify(selectedSize));


}


//=====================================================================================
//============================ SALVA OS DESENHOS ======================================
//=====================================================================================
let menuContainer = document.querySelector('#container');
let clickmenu = document.querySelector('#click-menu');
let menuSavedDraws = document.querySelector('#savedDraws');
let inputDrawname = document.querySelector('#drawName');
let buttonDrawSave = document.querySelector('#save');
let testeClick = 1;

// alterna entre reduzir e expandir menu
clickmenu.addEventListener('mousedown', () => {
    if (testeClick == 1){
        menuContainer.style.display = 'flex';
        menuContainer.style.flexFlow = 'column';
        testeClick = 2;
    } else {
        menuContainer.style.display = 'none';
        testeClick = 1;
    }
    
});

// cria a div que lista os desenhos
buttonDrawSave.addEventListener('click', saveNewDraw);

function saveNewDraw(event) {
    console.log(inputDrawname.value);
    if (inputDrawname.value != null && inputDrawname.value != undefined ) {
    event.preventDefault();
    let drawName = inputDrawname.value;
    let newDrawReference = localStorage.getItem('pixelBoard');
    localStorage.setItem(drawName, newDrawReference);
    addSaveListItem(drawName);
    }
}

function addSaveListItem(name) {
    let newDiv = document.createElement('div');
    newDiv.id = name;
    newDiv.classList.add('draw-item');
    newDiv.innerHTML = name;
    newDiv.addEventListener('click', setListSelected);
    draws.appendChild(newDiv)


}

function setListSelected(event) {
    let target = event.target;
    if (target.classList.contains('listDrawSelected')) {
        target.classList.remove('listDrawSelected');
    } else {
        target.classList.add('listDrawSelected');
        
    }

}

//=====================================================================================
//============================ APAGA OS DESENHOS ======================================
//=====================================================================================


//chamadas