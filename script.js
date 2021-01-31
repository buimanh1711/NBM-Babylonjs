

const createZoomDots = () => {
  vertices.forEach((room, roomId) => {
    console.log(room)
    room.dots.zoom.forEach((item, index) => {
      console.log(1)
      let box = document.createElement('div');
      box.id = `room${roomId + 1}_dot_container_${index + 1}`
      container.appendChild(box)
      let dot = `<div id='room${roomId + 1}_zoom_${index+1}' class='room${roomId+1}_zoom dot-container hidden' style='top: ${item.y * 100}%; left: ${item.x * 100}%'>
                  <div class='dot'>
                  </div>
                  <span></span>
                </div>`
      box.innerHTML = dot;
    })
  })
}

createZoomDots();

const room1_zoom = Array.from(document.getElementsByClassName('room1_zoom'));
const room2_zoom = Array.from(document.getElementsByClassName('room2_zoom'));
const room3_zoom = Array.from(document.getElementsByClassName('room3_zoom'));

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