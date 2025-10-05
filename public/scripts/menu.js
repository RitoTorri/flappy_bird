const MenuInteraction = () => {
    const btnStart = document.getElementById("btn_start")

    btnStart.addEventListener("click", () => {
        window.location.href = "./public/views/game.html"
    })
}

// Redirección del botón
document.getElementById('btn_start').addEventListener('click', function () {
    window.location.href = './public/views/game.html'; // Cambia por la ruta correcta
});

// Efecto interactivo en el título
const title = document.querySelector('.title');
title.addEventListener('click', function () {
    this.style.animation = 'none';
    setTimeout(() => {
        this.style.animation = 'bounce 2.5s infinite alternate';
    }, 10);
});

// Efecto sutil al pasar el mouse sobre el botón
const startBtn = document.getElementById('btn_start');
startBtn.addEventListener('mouseenter', function () {
    this.style.transform = 'translateY(-2px) scale(1.02)';
});

startBtn.addEventListener('mouseleave', function () {
    this.style.transform = 'translateY(0) scale(1)';
});

addEventListener("load", () => {
    MenuInteraction()
})