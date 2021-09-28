//#region API 
const data = getData(`https://api.themoviedb.org/3/list/7103886?api_key=43964cdbd7f3d015d80dc6c64f7a9c9c&language=pt-BR`)
function getData(url){
    let request = new XMLHttpRequest();
    request.open('GET',url,false);
    request.send();
    return request.responseText
}

const objMovies = JSON.parse(data); //converter para JSON
const movies = objMovies['items'] //Obter lista de filmes

//#endregion

//#region Criar Carrosel 
function createCarousel() {
    const divCarousel = document.querySelector('div.carrosel')
    for (let idMovie in movies) {
        const newDivItem = document.createElement('div');
        newDivItem.setAttribute('class', 'item');

        const newImg = document.createElement('img');
        newImg.setAttribute('class', 'box-filme')
        newImg.setAttribute('src', `https://www.themoviedb.org/t/p/w220_and_h330_face${movies[idMovie].poster_path}`)
        newImg.setAttribute('onClick', `updateMainMovie(${idMovie})`)

        newDivItem.appendChild(newImg)

        divCarousel.appendChild(newDivItem);
    }
}
//#endregion

//#region Atualizar Filme Principal 
function randomMainMovie(){
    const min = Math.ceil(0);
    const max = Math.floor(movies.length - 1);
    const randomIdMovie = Math.floor(Math.random() * (max - min + 1)) + min;
    updateMainMovie(randomIdMovie)
}


function updateMainMovie(idMovie){
    const d = document.documentElement
    d.style.setProperty('--filmePrincipal', `url(https://www.themoviedb.org/t/p/original${movies[idMovie].backdrop_path})`)
    document.querySelector('h3.titulo').innerHTML = movies[idMovie].name
    document.querySelector('p.descricao').innerHTML = movies[idMovie].overview
    controlVideos = idMovie;
    const buttonInfo = document.querySelector('a#info')
    buttonInfo.setAttribute('target',`_blank`)
    buttonInfo.setAttribute('href',`https://www.themoviedb.org/tv/${movies[idMovie].id}`)
}

let controlVideos;
const linkVideos = [
    {title: 'As Aventuras de Jackie Chan', videoId: 'bgi5Nyy8a24'},
    {title: 'Tico e Teco: Defensores da Lei', videoId: '7bkG11kqwq0'},
    {title: 'Power Rangers', videoId: 'l-u_QDcmOv0'},
    {title: 'Dragon Ball Z', videoId: '1YWryp40UEA'},
    {title: 'Caverna do Dragão', videoId: 'xE2UAQbi8VM'},
    {title: 'Teletubbies', videoId: 'WqvyYFiTW3M'},
    {title: 'Sítio do Picapau Amarelo', videoId: 'GO94XCuXEqs'},
    {title: 'Os Padrinhos Mágicos', videoId: 'X4kY7v5RboQ'},
    {title: 'Kim Possible', videoId: '88dk2hyIwCM'},
    {title: 'Três Espiãs Demais!', videoId: 'xdNNVBxU8Oo'},
    {title: 'Martin Mystère', videoId: 'qM3KIMFwogc'},
    {title: 'Hamtaro', videoId: 'B_4y1oBMM2Y'},
    {title: 'Rocket Power', videoId: 'QT3vQTEFJMU'},
    {title: 'Rugrats: Os Anjinhos', videoId: 'hwzCBLDE2jk'},
    {title: 'As Múmias Vivas', videoId: '6xKXUPrsLAw'},
    {title: 'Kamen Rider: O Cavaleiro Dragão', videoId: 'Qo7F7jrpS1g'},
    {title: 'Digimon Digital Monsters', videoId: 'AiVlM7J_6zw'},
    {title: 'Beyblade', videoId: '1U6Ht74wO1I'},
    {title: 'Yu-Gi-Oh! Zero', videoId: '5fUa75OWUlY'},
    {title: 'Sakura Card Captors', videoId: 'xvf_6bpOSH4'},
    {title: 'Luluzinha', videoId: 'cX8IqnJgT28'},
    {title: 'Medabots', videoId: 'eegbFcWnZgI'},
    {title: 'Danny Phantom', videoId: 'aug6fvp0L10'},
    {title: 'InuYasha', videoId: '25vdjvGO6Pc'},
    {title: 'O Point do Mickey', videoId: 'YiqMMRyZgoo'},
    {title: 'Zatch Bell!', videoId: 'LzhZEq2xJTc'}
]

function toggle(n){
    const trailer = document.querySelector('.trailer')
    trailer.classList.toggle('active')

    const movie = document.querySelector('iframe')
    const baseLink = 'https://www.youtube.com/embed'
    const autoplay = `autoplay=${n}`
    const start = 't=0'
    movie.setAttribute('width','1280px')
    movie.setAttribute('height','720px')
    if(n === 0){
        movie.setAttribute('src',``)
    }else{
        movie.setAttribute('src',`${baseLink}/${linkVideos[controlVideos].videoId}?${autoplay}&${start}s`)
        console.log(`${baseLink}/${linkVideos[controlVideos].videoId}?${autoplay}&${start}s`)
    }
}
    
//#endregion

//#region Hamburger MENU
const mainMenu = document.querySelector('.mainMenu');
const checkbox = document.querySelector('#checkbox-menu')

checkbox.addEventListener('click',check);

function check() {
    if (checkbox.checked) {
        show()
        console.log(checkbox.checked)
    } else {
        close()
        console.log(checkbox.checked)
    }
}

function show(){
    mainMenu.style.display = 'flex';
    mainMenu.style.right = '0%';
    
}
function close(){
    mainMenu.style.right = '-100%';
}
//#endregion

/*const t = document.querySelector('#ttest')
var a = document.documentElement
a.setAttribute('onresize','red();')
console.log(`a -> ${a}`)
function red(){
console.clear()
var alturaMonitor = window.screen.height;
var larguraMonitor = window.screen.width;
console.log(`Altura Monitor -> ${alturaMonitor}`);
console.log(`Largura Monitor -> ${larguraMonitor}`);

var larguraBrowser = window.innerWidth
|| document.documentElement.clientWidth
|| document.body.clientWidth;
var alturaBrowser = window.innerHeight
|| document.documentElement.clientHeight
|| document.body.clientHeight;

console.log(`Altura Browser -> ${alturaBrowser}`);
console.log(`Largura Browser -> ${larguraBrowser}`);
t.innerHTML = `Altura Monitor -> ${alturaMonitor}
Largura Monitor -> ${larguraMonitor}
Altura Browser -> ${alturaBrowser}
Largura Browser -> ${larguraBrowser}`
}
*/
createCarousel()