const hamburger = document.querySelector('.cabecalho .navbar .nav-list .hamburger');
const mobile_menu = document.querySelector('.cabecalho .navbar .nav-list ul');
const menu_item = document.querySelectorAll('.cabecalho .navbar .nav-list ul li a');
const cabecalho = document.querySelector('.cabecalho.container ');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active'); /*evento de click na pagina principal*/
    mobile_menu.classList.toggle('active');

});

document.addEventListener('scroll', () => {
    var scroll_position = window.scrollY;
    if (scroll_position > 550) {
        cabecalho.style.backgroundColor = '#06091a'; /*cor da barra nav*/
    } else {
        cabecalho.style.backgroundColor = 'transparent';
    }
});

menu_item.forEach((item) => {
    item.addEventListener('click', () => {
        hamburger.classList.toggle('active'); /*evento de click na pagina menu mobile (botao canto superior direito)*/
        mobile_menu.classList.toggle('active');
    });
});
const carousel = document.querySelector('.carousel_div');
const slider = document.querySelector('.slider');
const list = Array.from(document.querySelectorAll('.slider section'))

const next = document.querySelector('.next');
const prev = document.querySelector('.prev');
let direction = 1;
let position = 0;
let times = 0;

next.addEventListener('click', function() {
    // direction = -1;
    //  slider.style.transform = 'translate(-40%)';
    translate(1)
});

prev.addEventListener('click', function() {
    // direction = 1;
    // slider.style.transform = 'translate(0%)';
    translate(-1)

});

function translate(time) {
    direction = -time
    const ta = -(40 + 20 * time)
    slider.style.transform = `translate(${ta}%)`
    times = Math.abs(time)
}

slider.addEventListener('transitionend', function() {
    //animação de transição
    toggleDot()

    position -= direction;
    if (position == list.length) {
        position = 0;
    } else if (position < 0) {
        position = list.length - 1;

    }
    toggleDot()

    if (direction > 0) {
        for (let index = 0; index < times; index++) {
            slider.prepend(slider.lastElementChild);
        }
    } else {
        for (let index = 0; index < times; index++) {
            slider.appendChild(slider.firstElementChild);
        }
    }

    slider.style.transition = 'none';

    slider.style.transform = 'translate(-40%)';

    setTimeout(() => {
        slider.style.transition = 'all 0.5s';
    })
}, false);

function toggleDot() {
    const dot = document.querySelector(`#dots li[data-index="${position}"]`);
    dot.classList.toggle('selected');
}
//dot
const indicatorParent = document.querySelector('.controls ul');
const indicators = document.querySelectorAll('.controls li');

indicators.forEach((indicator, i) => {
    indicator.addEventListener('click', () => { //ação de clique
        //  slider.style.transform = 'translate(' + (i) * -20 + '%)'; //mudar slide
        translate(i - position)
    });
});
//drag & drop
let pressed = false;
let startx;
let x;

slider.addEventListener('mousedown', (e) => {
    pressed = true;
    startx = e.offsetX = carousel.offsetLeft;
    slider.style.cursor = 'grabbing'
});
slider.addEventListener('mouseenter', () => {
    slider.style.cursor = 'grab'
});
//slider.addEventListener('mosueleave', () => {
//    slider.style.cursor = 'default'
//})
slider.addEventListener('mouseup', () => {
    slider.style.cursor = 'grab'

});

window.addEventListener('mouseup', () => {
    pressed = false;
});

slider.addEventListener('mousemove', (e) => {
    if (!pressed) return;
    e.preventDefault();
    console.log(e.clientX)

    x = e.offsetX
    var compare = 0;
    if (e.movementX < compare) { //comparar movimento com o 0 sendo o mouse, se for pra esquerda ( -X) vá para direita, se for ( +X) vá para esquerda
        translate(1)
    } else if (e.movementX > compare) {
        translate(-1)
    }
});

//touchmove
slider.addEventListener('touchmove', dragMove);

function dragMove() {

    let novo_touch_x;
    let novo_touch_y;
    let touch_X;
    let touch_Y;
    document.addEventListener('touchstart', function(e) {

        let touch = e.changedTouches[0];
        touch_X = touch.pageX;
        touch_Y = touch.pageY;
    }, false);

    document.addEventListener('touchmove', function(e) {

        let touch = e.changedTouches[0];
        novo_touch_x = touch.pageX - touch_X; // deslocamento na horizontal
        novo_touch_y = touch.pageY - touch_Y; // deslocamento na vertical

        if (Math.abs(novo_touch_x) > Math.abs(novo_touch_y)) {
            // é horizontal
            if (novo_touch_x < 0) {
                translate(1)
                    // é para esquerda
            } else {
                translate(-1)
                    // é para direita
            }
        }
    }, false);

};