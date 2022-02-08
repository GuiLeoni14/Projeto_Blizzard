AOS.init({
    once: true,
    disable: 'mobile',
});
var slide_thumbnail = new Swiper(".slide-thumbnail", {
    slidesPerView: 5,
    spaceBetween: 20,
    watchSlidesProgress: true,
    breakpoints: {
        320: {
            direction: 'horizontal',
        },
        1150: {
            direction: 'vertical',
        }
    }
  });

var slide_hero = new Swiper(".slide-principal", {
    effect: 'fade',
    thumbs: {
        swiper:slide_thumbnail,
    },
    autoplay: {
        delay: 5000,
        disableOnInteraction: false, // quando passar passar os slide manualmente para não desativar o autoplay(por padrão TRUE ele desativa)
    }
});

const allFilters = document.querySelectorAll('.js-nav-games li a');
const allTabPaneGames = document.querySelectorAll('.tab-pane-games');
console.log(allTabPaneGames);
allFilters.forEach((item, index) => {
    item.addEventListener('click', (event) =>{
        event.preventDefault();
        allFilters.forEach((item, index) => {
            console.log(allTabPaneGames[index])
            allTabPaneGames[index].classList.remove('active');
            item.classList.remove('active');
        });
        item.classList.add('active');
        allTabPaneGames[index].classList.add('active')
    } );
});