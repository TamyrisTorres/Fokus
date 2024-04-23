const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const startPauseBt = document.querySelector('#start-pause')
const startPauseImg = document.querySelector('.app__card-primary-butto-icon')
const iniciarOuPausarBT = document.querySelector('#start-pause span')
const tempoNaTela = document.querySelector('#timer')

const musicaFocoInput = document.querySelector('#alternar-musica')
const musica = new Audio('C:/Users/Tamyres/Desktop/Projetos/CursoJavaScript/Fokus/Fokus/sons/luna-rise-part-one.mp3')
const playMusica = new Audio('C:/Users/Tamyres/Desktop/Projetos/CursoJavaScript/Fokus/Fokus/sons/play.wav')
const pauseMusic = new Audio('C:/Users/Tamyres/Desktop/Projetos/CursoJavaScript/Fokus/Fokus/sons/pause.mp3')
const finishMusic = new Audio('C:/Users/Tamyres/Desktop/Projetos/CursoJavaScript/Fokus/Fokus/sons/beep.mp3')
musica.loop = true

let tempoDecorridoEmSegundos = 1500
let intervadoId = null

musicaFocoInput.addEventListener('change', () => {
    if(musica.paused){
        musica.play()
    } else {
        musica.pause()
    }
})



focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500
    alterarContexto(('foco'), (`Otimize sua produtividade,<br>
    <strong class="app__title-strong">mergulhe no que importa.</strong>`))
    focoBt.classList.add('active')
})

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300
    alterarContexto(('descanso-curto'), (`Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!`))
    curtoBt.classList.add('active')
})

longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900
    alterarContexto(('descanso-longo'), (`Hora de voltar à superfície.<strong class="app__title-strong">Faça uma pausa longa.`))
    longoBt.classList.add('active')
})

function alterarContexto(contexto, mensagem) {
    mostrarTempo()
    botoes.forEach(function (contexto){
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `C:/Users/Tamyres/Desktop/Projetos/CursoJavaScript/Fokus/Fokus/imagens/${contexto}.png`)
    switch(contexto){
        case "foco":
            titulo.innerHTML = mensagem
            break;
        case "descanso-curto":
            titulo.innerHTML = mensagem
            break;
        case "descanso-longo":
            titulo.innerHTML = mensagem
            break;
        default:
            break;
    }
}

const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos<= 0){
       finishMusic.play()
        zerar()
        return
    }
    tempoDecorridoEmSegundos-= 1
    mostrarTempo()
}

startPauseBt.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar() {
    if(intervadoId){
        zerar()
        pauseMusic.play()
        startPauseImg.setAttribute('src', 'C:/Users/Tamyres/Desktop/Projetos/CursoJavaScript/Fokus/Fokus/imagens/play_arrow.png')
        return
    }
    playMusica.play()
    iniciarOuPausarBT.textContent = "Pausar"
    startPauseImg.setAttribute('src', 'C:/Users/Tamyres/Desktop/Projetos/CursoJavaScript/Fokus/Fokus/imagens/pause.png')
    intervadoId = setInterval(contagemRegressiva, 1000)
}

function zerar(){
    clearInterval(intervadoId)
    iniciarOuPausarBT.textContent = "Começar"
    intervadoId = null
}

    function mostrarTempo(){
        const tempo = new Date(tempoDecorridoEmSegundos * 1000)
        const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute:'2-digit', second: '2-digit'})
        tempoNaTela.innerHTML = `${tempoFormatado}` 
    }

    mostrarTempo()

