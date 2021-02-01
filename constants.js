var canvas = document.getElementById('renderer');
// const 1366 = window.innerWidth;
// const 768 = window.innerHeight;
const vertices = [
  {
    dots: {
      zoom: [
        {
          x: -88.77702499947053,
          y: 117.4835862605675,
          z: 120.06584569969787
        },
        {
          x: 24.521863331955558,
          y: 130.16107238017483,
          z: 223.82402469815293
        }
      ],
      products: [[{
        x: -83.25972934404649,
        y: 88.95254505194096,
        z: 103.95314898113917,
        info: { name: 'Manh bui', price: 1000 }
      }, {
        x: -60.37162121293286,
        y: 105.22851567099622,
        z: 77.8913298051006, info: { name: 'Manh bui', price: 1000 }
      }], [{
        x: 30.136604147823093,
        y: 99.91050998779214,
        z: 239.18640922518756, info: { name: 'Manh bui', price: 1000 }
      }, {
        x: 65.95840077927299,
        y: 114.37500176980748,
        z: 158.28917913711803,
        info: { name: 'Manh bui', price: 1000 }
      }]]
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
      zoom: [{
        x: -257.6024234286597,
        y: 126.64735677509807,
        z: -421.59138740189934
      }, {
        x: -207.98752896982225,
        y: 153.00380962764538,
        z: -79.00163774834142
      }],
      products: [[{
        x: -179.77034656633435,
        y: 95.06696372163245,
        z: -393.94502043990246, info: { name: 'Manh bui', price: 1000 }
      }, {
        x: -227.7968996664643,
        y: 92.75910601866774,
        z: -302.7638058435406, info: { name: 'Manh bui', price: 1000 }
      }], [{
        x: -197.48276072993778,
        y: 147.8808263158075,
        z: -54.04371814729173, info: { name: 'Manh bui', price: 1000 }
      }]]
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
      zoom: [{
        x: 123.28108625027754,
        y: 181.85945280661073,
        z: 12.444068397104877
      }],
      products: [[{
        x: 132.68636039449828,
        y: 175.69900002217386,
        z: 97.37099408729453,
        info: { name: 'Manh bui', price: 1000 }
      },
      {
        x: 90.71406761208667,
        y: 113.34610330908205,
        z: -69.09092122171286,
        info: { name: 'Manh bui', price: 1000 }
      }]]
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


var container = document.getElementById('container');