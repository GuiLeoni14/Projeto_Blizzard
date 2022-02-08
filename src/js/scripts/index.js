AOS.init({
    once: true,
    disable: 'mobile',
});
var slide_thumbnail = new Swiper(".slide-thumbnail", {
    slidesPerView: 5,
    direction: 'vertical',
    spaceBetween: 20,
    watchSlidesProgress: true
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