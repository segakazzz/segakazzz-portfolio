const css = require('./../scss/index.scss')
const Granim = require('granim')
const Masonry = require('masonry-layout')
const $ = require('jquery')
const { works } = require('./data')
// const favicon = require('./favicon/favicon.ico')

// console.log(__webpack_public_path__)

const navbar = document.querySelector('nav#main-navbar')
const granim = document.querySelector('#canvas-basic')
const granimAbout = document.querySelector('#canvas-basic-about')
const granimPortfolio = document.querySelector('#canvas-basic-portfolio')
const granimExperience = document.querySelector('#canvas-basic-experience')
const allGrids = document.querySelector('#portfolioMain .grid')
const portfolio = document.querySelector('#Portfolio')
const about = document.querySelector('#About')
const cover = document.querySelector('#Cover')
const experience = document.querySelector('#Experience')

const imgSegakazzz = document.querySelector('#img-segakazzz')
imgSegakazzz.innerHTML = selfPhotoHtml()

function selfPhotoHtml (){
  const loadedImage = require('./img/kazuesasatani.jpg')
  return `<img src="${loadedImage}">`
}

const portfolioHtmlArray = works.map(function(obj){
  const loadedImage = require(`${obj.img}`)
  return `
  <div class="grid-item">
    <div class="grid-item-inner card">
      <div class="portfolio-filter">
      <div class="portfolio-title">${obj.title}</div>
      <div class="portfolio-text"><p>${obj.text}</p></div>
      <div class="portfolio-technologies"><p>${obj.technologies}</p></div>
      <div class="portfolio-links">
        <a href="${obj.url}"><i class="fas fa-external-link-square-alt fa-3x"></i></a>
        <a href="${obj.githubUrl}"><i class="fab fa-github fa-3x"></i></a>
      </div>
      </div>
      <img src="${loadedImage}">
    </div>
  </div>
  `
})

allGrids.innerHTML = portfolioHtmlArray.join('')
// console.log(portfolioHtmlArray)

const imgElements = document.querySelectorAll('img')

const promiseArray = []
imgElements.forEach(function (imgElement) {
  promiseArray.push(imageLoaded(imgElement))
})

const timeout = ms => {
  return new Promise(function (resolveFn, rejectFn) {
    setTimeout(function () {
      rejectFn('Timeout! ' + ms + 'ms')
    }, ms)
  })
}

Promise.race([Promise.all(promiseArray), timeout(1000)])
  .then(function (responseArray) {
    // console.log(responseArray)
    // console.log('All images are loaded....')
  })
  .catch(function (error) {
    container.innerHTML = ''
    console.log(error)
  })
  .finally(function () {
    afterImageLoaded()
  })

function masonry () {
  return new Masonry(document.querySelector('.grid'), {
    itemSelector: '.grid-item',
    columnWidth: 400,
    fitWidth: true
  })
}

function imageLoaded (imgElement) {
  return new Promise(function (resolveFn, rejectFn) {
    imgElement.addEventListener('load', function () {
      resolveFn(imgElement.id)
    })
  })
}

function setHeightAndLocation (element, mirrorElement) {
  const bodyRect = document.body.getBoundingClientRect()
  const mirrorRect = mirrorElement.getBoundingClientRect()
  element.style.height = `${mirrorRect.height}px`
  element.style.top = `${mirrorRect.top - bodyRect.top}px`
}

function generateGranim(elementId, direction, gradientsArray){
  return new Granim({
    element: '#' + elementId,
    direction: direction,
    isPausedWhenNotInView: true,
    states: {
      'default-state': {
        gradients: gradientsArray
      }
    }
  })
}

function generatePortfolio(){
  const portfolio = allGrids.querySelectorAll('.grid-item')
  portfolio.forEach(function(elem){
    const img = elem.getElementsByTagName("IMG")[0]
    const filter = elem.getElementsByClassName("portfolio-filter")[0]
    const imgRect = img.getBoundingClientRect()
    filter.style.width = imgRect.width
    filter.style.height = imgRect.height
    
  })
}

function afterImageLoaded () {
  masonry()
  setHeightAndLocation(granim, cover)
  setHeightAndLocation(granimAbout, about)
  setHeightAndLocation(granimPortfolio, portfolio)
  setHeightAndLocation(granimExperience, experience)

  generateGranim('canvas-basic', 'top-bottom', [
    ['#e1eec3', '#f05053'],
    ['#ff9966', '#ff5e62'],
    ['#00F260', '#0575E6']
  ])

  generateGranim('canvas-basic-about', 'left-right', [
    ['#00F260', '#0575E6'],
    ['#e1eec3', '#f05053'],
    ['#ff9966', '#ff5e62']
  ])

  generateGranim('canvas-basic-portfolio', 'left-right', [
    ['#ff9966', '#ff5e62'],
    ['#00F260', '#0575E6'],
    ['#e1eec3', '#f05053']
  ])

  generateGranim('canvas-basic-experience', 'top-bottom', [
    ['#ff9966', '#ff5e62'],
    ['#00F260', '#0575E6'],
    ['#e1eec3', '#f05053']
  ])

  generatePortfolio()
}

$(function () {
  $('a[href^="#"]').click(function () {
    let speed = 500
    let href = $(this).attr('href')
    let target = $(href == '#' || href == '' ? 'html' : href)
    let position = target.offset().top
    $('html, body').animate({ scrollTop: position }, speed, 'swing')
    return false
  })
})

const burger = document.querySelector('.burger');
const menu = document.querySelector('#'+burger.dataset.target);
burger.addEventListener('click', function() {
    burger.classList.toggle('is-active');
    menu.classList.toggle('is-active');
});

window.onresize = function () {
  afterImageLoaded()
};
