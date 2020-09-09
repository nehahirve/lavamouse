// grab some variables

const flexbox = document.querySelectorAll('.flex-container')
const logo = document.getElementById('logo')
const svg = document.getElementById('svg-element')
const originalsvg = document.getElementById('svg-original')
const warp = new Warp(svg)

originalsvg.setAttribute('display', 'none')

// smooth scroll for safari
/*
const links = document.querySelectorAll('.scrolly')

links.forEach(link => link.addEventListener('click', smoothScroll))

function smoothScroll (event) {
  event.preventDefault()
  const href = event.target.getAttribute('href')
  const offsetTop = document.querySelector(href).offsetTop

  scroll({
    top: offsetTop,
    behavior: 'smooth'
  })
}
*/

// event listeners

flexbox.forEach(box => box.addEventListener('mousemove', cursorHandler))
flexbox.forEach(box => box.addEventListener('click', scrollHandler))


// scrolls left and right within flexbox (i should nest this in cursorhandler)

function scrollHandler (event) {
  event.preventDefault()
  if (event.clientX > window.innerWidth / 5 * 4) {
    console.log('clickright')
    this.scrollBy({
      left: +900,
      behavior: 'smooth'
    })
  } else if (event.clientX < window.innerWidth / 5) {
    console.log(this)
    this.scrollBy({
      left: -900,
      behavior: 'smooth'
    })
  }
}

// turns cursor to svg

function cursorHandler (event) {
  if (event.clientX > window.innerWidth / 5 * 4) {
    event.target.style.cursor = 'url("media/svg/arrowright.svg"), pointer'
  } else if (event.clientX < window.innerWidth / 5) {
    event.target.style.cursor = 'url("media/svg/arrowleft.svg"), pointer'
  } else {
    event.target.style.cursor = 'pointer'
  }
}

// animating the logo
logo.addEventListener('click', logoMoveDown)
svg.addEventListener('mouseover', startAnimation)
svg.addEventListener('mouseleave', stopAnimation)

// if we scroll up past a certain point animate the logo
/*
window.onscroll = function (e) {


  if (this.oldScroll > this.scrollY && this.scrollY < 60) {
    logoMoveDown()
  } else if (this.oldScroll < this.scrollY && this.scrollY > 60) {
    logoMoveUp()
  }
  this.oldScroll = this.scrollY
}
*/

window.addEventListener('scroll', event => {
  if (this.scrollY < 60) {
    console.log(this.scrollY)
    logoMoveDown(event)
  } else {
    logoMoveUp(event)
  }
})

warp.interpolate(4)
warp.transform(([x, y]) => [x, y, y])
let offset = 0
let running = true

function startAnimation () {
  originalsvg.setAttribute('display', 'none')
  svg.setAttribute('display', 'block')
  running = true
  animate()
}

function animate () {
  warp.transform(([x, y, oy]) => [x, oy + 4 * Math.sin(x / 16 + offset), oy])
  offset += 0.05
  if (running) {
    requestAnimationFrame(animate)
  }
}

function stopAnimation () {
  running = false
  svg.setAttribute('display', 'none')
  originalsvg.setAttribute('display', 'block')
  originalsvg.addEventListener('mouseover', startAnimation)
}

let yUpValue, scale
const width = window.innerWidth

switch (true) {
  case (width > 2000):
    yUpValue = -430
    scale = 0.12
    break
  case (width < 600):
    yUpValue = -420
    scale = 0.25
    break
  case (width > 600 && width < 700):
    yUpValue = -390
    scale = 0.25
    break
  case (width > 700 && width < 800):
    yUpValue = -400
    scale = 0.23
    break
  case (width > 800 && width < 1000):
    yUpValue = -430
    scale = 0.16
    break
  case (width > 1000 && width < 1200):
    yUpValue = -400
    scale = 0.18
    break
    case (width > 1200 && width < 1400):
      yUpValue = -420
      scale = 0.16
      break
  case (width > 1300 && width < 1400):
    yUpValue = -420
    scale = 0.16
    break
  case (width > 1400 && width < 1600):
    yUpValue = -380
    scale = 0.16
    break
  default:
    yUpValue = -395
    scale = 0.15
}

function logoMoveUp (event) {
event.preventDefault()
window.removeEventListener('scroll', logoMoveDown)
  anime({
    targets: [logo],
    translateY: yUpValue,
    translateX: 12,
    scale: scale,
    duration: 2000,
    loop: false,
    complete: function () {
      window.addEventListener('scroll', logoMoveDown)
    }
  })
}

function logoMoveDown () {
  window.removeEventListener('scroll', logoMoveUp)
  anime({
    targets: [logo],
    translateY: 0,
    translateX: 0,
    scale: 1,
    duration: 2000,
    loop: false,
    complete: function () {
      window.addEventListener('scroll', logoMoveUp)
    }
  })
}

// animating the heart

const heart = document.querySelector('#heart')
const newheart = document.querySelector('#newheart')

heart.addEventListener('mouseover', animateHeart)

function animateHeart () {
  anime({
    targets: heart,
    translateX: 250,
    translateY: 50, // -> '250px'
    scale: 4,
    rotate: 780, // -> '540deg'
    duration: 5000
  })
}

// make heart draggable

let mouseIsDown = false

heart.addEventListener('mousedown', function () {
  mouseIsDown = true
})

document.addEventListener('mouseup', function () {
  mouseIsDown = false
})

document.addEventListener('mousemove', function (event) {
  event.preventDefault()
  if (mouseIsDown) {
    heart.style.position = 'fixed'
    heart.style.zIndex = '400'
    heart.style.left = (event.clientX - 250) + 'px'
    heart.style.top = (event.clientY - 50) + 'px'
    newheart.style.display = 'block'
  }
})
