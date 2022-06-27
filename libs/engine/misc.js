function id(elementId) {
    return document.getElementById(elementId);
}

function $hide(el){

    if(typeof el === 'string')
        el = document.getElementById(el);

    el.style.opacity = 0;

    setTimeout(function(){
        el.display='none';
    }, 500);
}

function $show(el){

    if(typeof el === 'string')
        el = document.getElementById(el);

    el.style.opacity = 0;
    el.style.display = 'block';

    setTimeout(function(){
        el.style.opacity = 1;
    }, 100);
}

function $showEl(elementId) {
    document.getElementById(elementId).classList.remove('nodisplay');
}

function $hideEl(elementId) {
    document.getElementById(elementId).classList.add('nodisplay');
}

async function sleep(ms){

    await new Promise((resolve, reject) => {
        setTimeout(() => { resolve(1);}, ms);
    });

}

function percentage(value, max, min=0) {
    return 100 * (value - min) / (max - min)
}
