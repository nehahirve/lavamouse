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
window.addEventListener('scroll', logoMoveUp)
logo.addEventListener('click', logoMoveDown)

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

svg.addEventListener('mouseover', startAnimation)
svg.addEventListener('mouseleave', stopAnimation)

// if we scroll up past a certain point animate the logo
window.onscroll = function (e) {
  if (this.oldScroll > this.scrollY && this.scrollY < 60) {
    logoMoveDown()
  }
  this.oldScroll = this.scrollY
}

warp.interpolate(7)
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

function logoMoveUp (event) {
  event.preventDefault()
  anime({
    targets: [logo],
    translateY: -395,
    translateX: 12,
    scale: 0.15,
    duration: 2000,
    loop: false
  })
}

function logoMoveDown () {
  window.removeEventListener('scroll', logoMoveUp)
  anime({
    targets: [svg, originalsvg, logo],
    translateY: 0,
    translateX: 0,
    scale: 1,
    duration: 2000,
    loop: false,
    complete: function (anim) {
      window.addEventListener('scroll', logoMoveUp)
    }
  })
}

// animating the heart
const heart = document.querySelector('#heart')

heart.addEventListener('mouseover', animateHeart)

function animateHeart () {
  anime({
    targets: heart,
    translateX: 250,
    translateY: 50,
    scale: 4, // -> '250px'
    rotate: 780,
    duration: 5000 // -> '540deg'
  })
}
