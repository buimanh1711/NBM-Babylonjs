const scrWIDTH = window.innerWidth;
const scrHEIGHT = window.innerHeight;
const vertices = [
  {
    dots: {
      zoom: [{ x: 727 / scrWIDTH, y: 279 / scrHEIGHT }, { x: 528 / scrWIDTH, y: 289 / scrHEIGHT }],
      products: [[{ x: 724 / scrWIDTH, y: 375 / scrHEIGHT, info: { name: 'Manh bui', price: 1000 } }, { x: 621 / scrWIDTH, y: 317 / scrHEIGHT, info: { name: 'Manh bui', price: 1000 } }], [{ x: 581 / scrWIDTH, y: 362 / scrHEIGHT, info: { name: 'Manh bui', price: 1000 } }]]
    },
    isActive: true,
    init: {
      x: -369.55181300451454,
      y: 306.14674589207186,
      z: 640.0825161530125
    },
    focus1: {
      isActive: false,
      target: {
        x: 58.88465040027688,
        y: 90.70476687799774,
        z: 194.81715054469714
      },
      vertice: {
        x: -116.56795834287578,
        y: 152.82188736593525,
        z: 218.83038183089832
      }
    },
    focus2: {
      isActive: false,
      target: {
        x: -80.34484093764175,
        y: 80.160511463427,
        z: 2.178588867187557
      },
      vertice: {
        x: -66.26952213483393,
        y: 127.31282000961048,
        z: 273.73173987393574
      }
    }
  },
  {
    dots: {
      zoom: [{ x: 706 / scrWIDTH, y: 457 / scrHEIGHT }, { x: 485 / scrWIDTH, y: 295 / scrHEIGHT }],
      products: [[{ x: 831 / scrWIDTH, y: 370 / scrHEIGHT, info: { name: 'Manh bui', price: 1000 } }, { x: 649 / scrWIDTH, y: 229 / scrHEIGHT, info: { name: 'Manh bui', price: 1000 } }], [{ x: 720 / scrWIDTH, y: 226 / scrHEIGHT, info: { name: 'Manh bui', price: 1000 } }]]
    },
    isActive: false,
    init: {
      x: -356.0658873717494,
      y: 306.14674589207186,
      z: -647.6814447163543
    },
    focus1: {
      isActive: false,
      target: {
        x: -203.4935111128526,
        y: 77.64155649200946,
        z: -341.7460334836038
      },
      vertice: {
        x: -180.41716916269206,
        y: 130.25104081439164,
        z: -492.42708020904854,
      }
    },
    focus2: {
      isActive: false,
      target: {
        x: -186.0433378623809,
        y: 109.306718097061434,
        z: -46.34354078335883
      },
      vertice: {
        x: -275.4837239978697,
        y: 214.04596103626398,
        z: -137.59964149772065
      }
    }
  },
  {
    dots: {
      zoom: [{ x: 705 / scrWIDTH, y: 264 / scrHEIGHT }],
      products: [[{ x: 911 / scrWIDTH, y: 238 / scrHEIGHT, info: { name: 'Manh bui', price: 1000 } }, { x: 486 / scrWIDTH, y: 238 / scrHEIGHT, info: { name: 'Manh bui', price: 1000 } }]]
    },
    isActive: false,
    init: {
      x: 738.941528370044,
      y: 306.14674589207186,
      z: -15.478618473192869
    },
    focus1: {
      isActive: false,
      target: {
        x: 57.47327739531357,
        y: 77.99095887526948,
        z: 8.873003967722042
      },
      vertice: {
        x: 242.21301438736265,
        y: 213.18339756658025,
        z: 168.52970725961828
      }
    },
  }

]

const LOADING = document.getElementById('loading-icon');

var isClicked = false;

const leftBtn = document.getElementById('rotate-left');
const rightBtn = document.getElementById('rotate-right');
const midBtn = document.getElementById('zoom-on');


var canvas = document.getElementById('renderer');
var container = document.getElementById('container')