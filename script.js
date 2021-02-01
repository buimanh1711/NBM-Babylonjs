

const createZoomDots = () => {
  vertices.forEach((room, roomId) => {
    console.log(room)
    room.dots.zoom.forEach((item, index) => {
      console.log(1)
      let box = document.createElement('div');
      container.appendChild(box)
      let dot = `<div id='room${roomId + 1}_zoom_${index+1}' class='room${roomId+1}_zoom dot-container hidden' style='top: ${item.y * 100}%; left: ${item.x * 100}%'>
                  <div class='dot'>
                  </div>
                  <span></span>
                </div>`
      box.innerHTML = dot;
    });
    room.dots.products.forEach((product, index) => {
      product.forEach(item => {
        let box = document.createElement('div');
        container.appendChild(box)
        let dot = `<div id='room${roomId + 1}_product_${index+1}' class='room${roomId+1}_product_${index + 1} dot-container hidden' style='top: ${item.y * 100}%; left: ${item.x * 100}%'>
                    <div class='dot'>
                    </div>
                    <span></span>
                  </div>`
        box.innerHTML = dot;
      })
    });
  })
}

createZoomDots();

const room1_zoom = Array.from(document.getElementsByClassName('room1_zoom'));
const room2_zoom = Array.from(document.getElementsByClassName('room2_zoom'));
const room3_zoom = Array.from(document.getElementsByClassName('room3_zoom'));

const room1_product_1 = Array.from(document.getElementsByClassName('room1_product_1'));
const room1_product_2 = Array.from(document.getElementsByClassName('room1_product_2'));

const room2_product_1 = Array.from(document.getElementsByClassName('room2_product_1'));
const room2_product_2 = Array.from(document.getElementsByClassName('room2_product_2'));

const room3_product_1 = Array.from(document.getElementsByClassName('room3_product_1'));

const popup = document.getElementById('popup');
const popupCls = document.getElementById('popup-btn');
const popupCt = document.getElementById('popup-content');

popupCls.addEventListener('click', () => {
  popup.classList.add('hidden')
})

var dotSize = 1;
var dots = Array.from(document.getElementsByClassName('dot'));

const changeDotsSize = () => {
  setTimeout(() => {
    if (dotSize === 4.000000000000003) {
      dotSize = 1;
    }
    dotSize += 0.1;
    dots.forEach((item, index) => {
      item.style.transform = `scale(${dotSize})`
    });
    changeDotsSize();
  }, 60);
}