let add = document.getElementById('counter');
let int = document.getElementById('likecounter')
let add2 = document.getElementById('counter2');
let int2 = document.getElementById('likecounter2')
let add3 = document.getElementById('counter3');
let int3 = document.getElementById('likecounter3')

let integer = 0;
let integer2 = 0;
let integer3 = 0;


add.addEventListener('click', function () {

    integer++
    int.innerHTML = integer + (' like(s)');

})

add2.addEventListener('click', function () {

    integer2++
    int2.innerHTML = integer2 + (' like(s)');
})

add3.addEventListener('click', function () {

    integer3++
    int3.innerHTML = integer3 + (' like(s)');
})