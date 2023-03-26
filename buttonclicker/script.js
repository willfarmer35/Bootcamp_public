let add = document.getElementById('counter');
let add2 = document.getElementById('counter2');
let Login = document.getElementById('Login');
let definition = document.getElementById('adddef')

let log =('Logout')
let int2 = 0;
let integer = 0;
add.addEventListener('click',function(){

    integer++
    add.innerHTML = integer +(' likes')
   alert("Ninja was Liked!")
})
add2.addEventListener('click',function(){

    int2++
    add2.innerHTML = int2 +(' likes')
    alert("Ninja was Liked!")
    
})
Login.addEventListener('click',function(){
    if(log==('Logout')) {
        log=('Login')
        Login.innerHTML = log;
    } else{
        log=('Logout')
        Login.innerHTML = log;
    }
    
})
definition.addEventListener('click',function(){

   definition.remove()
   
    
})
