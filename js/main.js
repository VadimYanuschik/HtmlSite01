const sliderCardContainer = document.querySelector('.slider-cards')
const sliderComments = document.querySelectorAll('.slider-cards__card')
const slidesCount = sliderComments.length
let containerWidth = 0;
const sliderDots = document.querySelectorAll('.dot')
const prevBtn = document.querySelector('#prevBtn')
const nextBtn = document.querySelector('#nextBtn')

let counterComment = 0

const navSlide = () => {
    const burger = document.querySelector('.burger-menu')
    const nav = document.querySelector('.top-menu__navigation')
    const navLink = document.querySelectorAll('.navigation__item')

    burger.addEventListener('click', () => {
        burger.classList.toggle('active')
        nav.classList.toggle('active')
        if(nav.classList.contains('active')) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'initial';
        }

        navLink.forEach((link, index) => {
            if(link.style.animation) {
                link.style.animation = ""
            } else {
                link.style.animation = `navLinkFade 0.1s ease forwards ${index / 6 + 0.33}s`
            }
        })

    })
}

const slideChange = () => {
    nextBtn.addEventListener('click', () => {
        if(counterComment === slidesCount - 1) return
        //Remove current active classes
        clearCurrentActiveComment()

        //Increment counter of slide by + 1
        counterComment += 1

        //Add 'active' classes to new slides
        addNewActiveComment()
    })

    prevBtn.addEventListener('click', () => {
        if(counterComment === 0) return
        //Remove current active classes
        clearCurrentActiveComment()

        //Increment counter of slide by + 1
        counterComment -= 1

        //Add 'active' classes to new slides
        addNewActiveComment()
    })

    sliderComments.forEach((comment, index) => {
        comment.addEventListener('click', () => {
            counterComment = index
            sliderContainerMove()
            changeCurrentActiveComment()
        })
        
    })

    sliderDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            counterComment = index
            sliderContainerMove()
            changeCurrentActiveComment()
        })
    })
}
navSlide()
slideChange()

function changeCurrentActiveComment() {
    sliderComments.forEach((comment, index) => {
        if(counterComment === index) {
            comment.classList.add('card--active')
        } else {
            comment.classList.remove('card--active')
        }
    })

    sliderDots.forEach((dot, index) => {
        if(counterComment === index) {
            dot.classList.add('active')
            dot.style.animation = "dotChange 0.5s ease"
        } else {
            dot.classList.remove('active')
            dot.style.animation = ""
        }
    })
}

function clearCurrentActiveComment() {
    sliderComments[counterComment].classList.remove('card--active')
    sliderDots[counterComment].classList.remove('active')
    sliderDots[counterComment].style.animation = ""
}

function addNewActiveComment() {
    sliderContainerMove()
    sliderComments[counterComment].classList.add('card--active')
    sliderDots[counterComment].classList.add('active')
    sliderDots[counterComment].style.animation = "dotChange 0.5s ease"
}

function sliderContainerMove() {
    sliderCardContainer.style.transition = "transform 0.4s ease-in-out"
    containerWidth = sliderComments[0].clientWidth + 50;
    sliderCardContainer.style.transform = `translateX(${-containerWidth * counterComment}px)`
}