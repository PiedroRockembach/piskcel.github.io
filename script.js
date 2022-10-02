

window.onload = function () {
    let btn = document.querySelector("#btn");
let input = document.querySelector("input");
let btnGrid = document.querySelector("btnGrid");
let num = 0;
let body = document.body;
let color = 'black';
resizeScrean(); 
    
    
    btn.addEventListener("click", function (){
        num = input.value;
        resizeScrean();
    });
   
    function resizeScrean() {
        document.querySelector("#main").remove();
        let table = document.createElement('section');
        table.id = 'main';
        body.appendChild(table);
        
        table.style.width = num *10 + 'px';
       
        for (let index = 0; index < num * num; index += 1) {
            let liItem = document.createElement('div');
            liItem.classList.add('pixelPoint');
            liItem.id = index;            
            table.appendChild(liItem);
        }

        
        document.querySelector("#main").addEventListener('mousedown', function (event){
        
            let obj = event.target;
            obj.style.backgroundColor = color;
         });
         

         
        

         
         
    }
    
    let black = document.querySelector('#black');
    let white = document.querySelector('#white');
    let gray = document.querySelector('#gray');

    black.addEventListener("click", function(){
        let remover = document.querySelector('.selected');
        remover.classList.remove('selected');
        black.classList.add('selected');
        color = 'black';
    });
    white.addEventListener("click", function(){
        let remover = document.querySelector('.selected');
        remover.classList.remove('selected');
        white.classList.add('selected');
        color = 'white';    
    });
    gray.addEventListener("click", function(){
        let remover = document.querySelector('.selected');
        remover.classList.remove('selected');
        gray.classList.add('selected');
        color = 'gray';   
    });

   
    
      
    

}

let grid = false;
btnGrid.addEventListener("click",   function () {
    
    let grids = document.querySelectorAll('.pixelPoint');
    let main = document.querySelector('#main');
    num = input.value; 
    console.log(grids);
    if (grid){
        for (let index = 0; index < grids.length; index += 1) {
            grids[index].style.border = '0px solid black';
            main.style.width = num * 10+ 'px';
        }
        grid = false;
    } else if (!grid) {
        for (let index = 0; index < grids.length; index += 1) {
            grids[index].style.border = '1px solid black';
            main.style.width = num * 12 + 'px';
        }
        grid = true;
    }
  });