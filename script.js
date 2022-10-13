

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
let boardSize = [];
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
    boardSize = JSON.parse(localStorage.getItem('pixelBoard'));
    console.log(boardSize);
    createPixelBoard(boardSize);

}
function createPixelBoard(reference) {
    for (let index = 0; index < allPixels.length; index += 1) {
        if (reference[index] == '' || reference[index] == 'white' ) {
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
let selectedSize;
// let allPixels= pixelBoard.childNodes; *já declarada anteriormente*
// let pixelBoard = document.querySelector('#pixel-board'); *já declarada anteriormente*

// adiciona escutador de evento de clique ao botão '#generate-board' que chama a função 'resizeBoard()'
resizeButton.addEventListener('click', takeBoardSize);

// função para mudar o tamanho da board 
function takeBoardSize() {
    selectedSize = Math.floor(resizeInput.value);
    resizeBoard(selectedSize);
}
function resizeBoard(selectedSize) {
    // pega todos os valores que serão usados
    
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
//======================= CARREGA OS DESENHOS SALVOS ==================================
//=====================================================================================
let objectSaveDraws = {};
//cria LocalStorage ou carrega já existente
if (localStorage.getItem('savedDraws') == null) {
    localStorage.setItem('savedDraws', JSON.stringify({}));
} else {
    objectSaveDraws = JSON.parse(localStorage.getItem('savedDraws'));
    let loadSize = Object.values(objectSaveDraws).length;
    if (loadSize != 0) {
        for (let index = 0; index < loadSize; index += 1) {
            console.log(Object.values(objectSaveDraws)[index]);
            let obj = Object.values(objectSaveDraws)[index]['id'];
            addSaveListItem(obj)
            console.log(obj);
        }
    }

}



//=====================================================================================
//============================ SALVA OS DESENHOS ======================================
//=====================================================================================
let menuContainer = document.querySelector('#container');
let clickmenu = document.querySelector('#click-menu');
let menuSavedDraws = document.querySelector('#savedDraws');
let inputDrawname = document.querySelector('#drawName');
let buttonDrawSave = document.querySelector('#save');
let arrow = document.querySelector('#arrow');
let testeClick = 1;

// alterna entre reduzir e expandir menu
clickmenu.addEventListener('mousedown', () => {
    if (testeClick == 1){
        menuContainer.style.display = 'flex';
        menuContainer.style.flexFlow = 'column';
        arrow.innerHTML = '&#9650';
        testeClick = 2;
    } else {
        menuContainer.style.display = 'none';
        arrow.innerHTML = '&#9660';
        testeClick = 1;
    }
    
});

// cria a div que lista os desenhos
buttonDrawSave.addEventListener('click', saveNewDraw);

function saveNewDraw(event) {
    if (inputDrawname.value != null && inputDrawname.value != undefined ) {
    event.preventDefault();
    let currentBoardSize = JSON.parse(localStorage.getItem('boardSize'));
    let drawName = inputDrawname.value;
    let newDrawReference = localStorage.getItem('pixelBoard');
    addSaveListItem(drawName);
    localSaveDraw(drawName, currentBoardSize, newDrawReference);
    }
}


// salva informações do novo desenho
function localSaveDraw(name, size, code) {
    let newIndex = Object.values(objectSaveDraws).length += 1;
    objectSaveDraws[name] = {'id':name, 'size':size, 'code':code, 'index':newIndex,}
    localStorage.setItem('savedDraws', JSON.stringify(objectSaveDraws))
    console.log(newIndex);


}

// adiciona div na lista
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
let eraseButton = document.querySelector('#erase');

eraseButton.addEventListener('click', eraseDraw);

function eraseDraw() {
    let selectedDraw = document.querySelector('.listDrawSelected')
    let id = selectedDraw.id;
    delete objectSaveDraws[`${id}`];
    localStorage.setItem('savedDraws', JSON.stringify(objectSaveDraws));
    selectedDraw.remove();
}


//=====================================================================================
//============================ APLICA DESENHOS ========================================
//=====================================================================================
let load = document.querySelector('#load');

load.addEventListener('click', loadDraw);

function loadDraw() {
    let id = document.querySelector('.listDrawSelected').id;
    let lsItem = JSON.parse(localStorage.getItem('savedDraws'));
    let obj = lsItem[id]
    let code = JSON.parse(obj['code']);
    let size = obj['size'];
    resizeBoard(size);
    createPixelBoard(code);
    console.log(code);
}



//chamadas