// script pour un jeux de morpion par tpg

// selection et declaration des variables init

const box=document.querySelector('#box')
const timer =document.querySelector('.time')
const timer2 =document.querySelector('.timem')
const scoore_j1=document.querySelector('#scoore-j1')
const scoore_j2=document.querySelector('#scoore-j2')
const case_j1=document.querySelector('#case-j1')
const case_j2=document.querySelector('#case-j2')
const react_j1=document.querySelector('#react-j1')
const react_j2=document.querySelector('#react-j2')
let scoore_1=0
let scoore_2=0
let case_1=0
let case_2=0
let times =0
let timem =0
let time_cur=0
let tim_temp1=0
let tim_temp2=0
let tim_tab1=[0,]
let tim_tab2=[0,]
const board = [
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
]
let player=1

// gestion du temps 
setInterval(() => {
    times++
    if (times>=60) {
        times=0
        timem++
    }
    if (timem<10) {
        timer2.innerHTML='0'+timem
    }
    else{
        timer2.innerHTML=timem
    }
    if (times<10) {
        timer.innerHTML='0'+times
    }
    else{
        timer.innerHTML=times
    }

}, 1000);

// reactivite
function react(joueur) {
    timeall=timem*60 +times
    //console.log(timeall)
    if (joueur===1){
        tim_temp1=timeall
        time_cur1=tim_temp1- tim_temp2
        console.log((time_cur1+tim_tab1[tim_tab1.length])/2)
        console.log(tim_tab1,tim_tab1.length,time_cur1)
        tim_tab1.push(time_cur1)
    }
    else if (joueur===2){
        tim_temp2=timeall
        time_cur=tim_temp2-tim_temp1
        
    }
    console.log(time_cur)

}

// mis a jour des case cote logique
function case_log(joueur) {
    //console.log('joueur = '+joueur)
    if(joueur==2)
    case_1++
    else if (joueur==1)
    case_2++
    case_j1.innerHTML=case_1
    case_j2.innerHTML=case_2
}

// mis a jour des scoores cote ui
function scoore(joueur,scoore_1,scoore_2) {
    scoore_j1.innerHTML=scoore_1
    scoore_j2.innerHTML=scoore_2
    
}

// mis a jour des scoores cote logique
function scoore_log(joueur) {
    if(joueur==1)
    scoore_1++
    else if (joueur==2)
    scoore_2++
}

// reinitialiser le tableau
function clean () {
    document.querySelector('#box').innerHTML=''
    
    
    board.forEach((line,colone)=>{
        line.forEach((value,sqindex)=>{
            board[colone][sqindex]=0
        })
    })
    cont()
}

//double boucle pour recuperer le contenu du tableau
function boucle() {
    board.forEach((line,colone)=>{
        line.forEach((value,sqindex)=>{
                board[colone][sqindex]
               
        })
        //console.log(line,colone)
    })
}

// toute la logique du jeux  
function logiq (colone,sqindex){
    //console.log( board[colone])
    
    const val =0
    const tab2=[0,1,2,3,4,5]
    
    board[colone].forEach((index)=>{
        //console.log(index)
    })
    
    for (let index = 0; index <=board[0].length-3; index++) {
        const colone2=0
        //console.log('val'+index)
        // verification par ligne
        tab2.forEach((indexo)=>{
            //console.log(indexo)
        if ((board[colone2+indexo][index]==board[colone2+indexo][index+1] && board[colone2+indexo][index]==board[colone2+indexo][index+3] &&  board[colone2+indexo][index]==board[colone2+indexo][index+2]) && board[colone2+indexo][index]!=0 ){
            let winer=board[colone2+indexo][index]
            alert('joueur '+winer+' a gagner')
            scoore_log(winer)
            scoore(winer,scoore_1,scoore_2)
            clean()
        }
    })
    }

    for (let index = 0; index <=board[0].length-3; index++) {
        var colone2=index
        //console.log('colone'+index)
    // verification par colone
    tab2.forEach((indexo)=>{
        if ((board[colone2][val+indexo]==board[colone2+1][val+indexo] &&  board[colone2][val+indexo]==board[colone2+3][val+indexo] &&  board[colone2][val+indexo]==board[colone2+2][val+indexo]) && board[colone2][val+indexo]!=0 ){
            alert('joueur '+board[colone2][val+indexo]+' a gagner')
            scoore_log(board[colone2][val+indexo])
            scoore(board[colone2][val+indexo],scoore_1,scoore_2)
            clean()
        }
    })
    }
    
}


//creation et controle de chaque case
function cont(){
board.forEach((line,colone)=>{
    const lineDiv=document.createElement('div')
    lineDiv.classList.add('line')
    box.appendChild(lineDiv)
    line.forEach((value,sqindex)=>{
        const square = document.createElement('div')
        square.classList.add('square')
        square.dataset.state= value
        lineDiv.appendChild(square)
        square.addEventListener('click',()=>{
            if (value!==0) return
            if (square.dataset.state==0){
                board[colone][sqindex]=player
                player = player===1?2:1
                square.dataset.state= player
                //console.log(player)
                react(player)
                case_log(player)
            }
            else if (square.dataset.state!=0){
                return
            }
            logiq(colone,sqindex)
        })
    })
})
}
cont()