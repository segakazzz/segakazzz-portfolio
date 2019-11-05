const css = require('./../scss/index.scss')
const Granim = require('granim')
const Masonry = require('masonry-layout')
const $ = require('jquery')
const { works } = require('./data')
// const img = require('./../img/scene-it.png')

console.log(__webpack_public_path__)

const navbar = document.querySelector('nav#main-navbar')
const granim = document.querySelector('#canvas-basic')
const granimAbout = document.querySelector('#canvas-basic-about')
const granimPortfolio = document.querySelector('#canvas-basic-portfolio')
const allGrids = document.querySelector('#portfolioMain .grid')
const portfolio = document.querySelector('#Portfolio')
const about = document.querySelector('#About')
const cover = document.querySelector('#Cover')

const imageLoadedCount = 0
// granim.style.height = `${Math.round(navbar.clientHeight / window.innerHeight * 100)}%`

works.map(function (obj) {
  // console.log(obj.img)
  const loadedImage = require(`${obj.img}`)
  const img = new Image()
  img.src = loadedImage
  const divGridItem = document.createElement('div')
  divGridItem.classList.add('grid-item')
  // divGridItem.innerHTML = '<i class="fab fa-github"></i>'
  divGridItem.appendChild(img)
  allGrids.appendChild(divGridItem)
  // const img = document.createElement
})

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

function afterImageLoaded () {
  masonry()
  setHeightAndLocation(granim, cover)
  setHeightAndLocation(granimAbout, about)
  setHeightAndLocation(granimPortfolio, portfolio)
  let granimInstance = new Granim({
    element: '#canvas-basic',
    direction: 'left-right',
    isPausedWhenNotInView: true,
    states: {
      'default-state': {
        gradients: [
          ['#e1eec3', '#f05053'],
          ['#ff9966', '#ff5e62'],
          ['#00F260', '#0575E6']
        ]
      }
    }
  })

  let granimInstance2 = new Granim({
    element: '#canvas-basic-about',
    direction: 'left-right',
    isPausedWhenNotInView: true,
    states: {
      'default-state': {
        gradients: [
          ['#00F260', '#0575E6'],
          ['#e1eec3', '#f05053'],
          ['#ff9966', '#ff5e62']
        ]
      }
    }
  })

  let granimInstance3 = new Granim({
    element: '#canvas-basic-portfolio',
    direction: 'left-right',
    isPausedWhenNotInView: true,
    states: {
      'default-state': {
        gradients: [
          ['#ff9966', '#ff5e62'],
          ['#00F260', '#0575E6'],
          ['#e1eec3', '#f05053']
        ]
      }
    }
  })
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
