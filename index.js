const toCel = (radians) => {
  return radians / Math.PI * 180;
}

const FRAME = 10;
const ACCEL = 0.024;

const timeToFrame = (time) => time / 10;

class Model {
  constructor(path) {
    this.path = path;
    this.canvas;
    this.model;
    this.scene;
    this.light;
    this.camera;
    this.engine;
    this.mainLight;

    this.box = null;

    this.init();
  }

  init() {
    //create main components
    this.canvas = document.createElement('canvas');
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    document.body.appendChild(this.canvas);

    this.engine = new BABYLON.Engine(this.canvas, true);

    this.scene = new BABYLON.Scene(this.engine);

    this.camera = new BABYLON.ArcRotateCamera("Camera", BABYLON.Tools.ToRadians(120), 3 * Math.PI / 8, 1000, new BABYLON.Vector3(0, 0, 0), this.scene);
    console.log(this.camera);

    this.createScene();

    this.scene.onPointerObservable.add((evt) => {
      // if (evt.type === BABYLON.PointerEventTypes.POINTERMOVE) {
      //   console.log(evt)
      // }

      if (evt.type === BABYLON.PointerEventTypes.POINTERPICK) {
        let x = evt.pickInfo.pickedPoint._x;
        let y = evt.pickInfo.pickedPoint._y;
        let z = evt.pickInfo.pickedPoint._z;
        console.log(x, y, z);

        this.moveCam(0, {x: x < 0 && x - 100 || x + 100, y: y < 0 && y - 100 || y + 100, z: z < 0 && z - 100 || z + 100});
      }
    })

    this.engine.runRenderLoop(() => {
      this.scene.render();
    });

  }

  createScene() {
    this.camera.attachControl(this.canvas, true);
    this.scene.ambientColor = new BABYLON.Color3(1, 1, 1);
    // this.light = new BABYLON.PointLight("pointLight", new BABYLON.Vector3(1000, 1000, 1000), this.scene);

    BABYLON.SceneLoader.ImportMesh("", "./model1/model2/", "gift_giving.gltf", this.scene, (meshes, particleSystems, skeletons, animationGroups) => {

      setTimeout(() => {
        this.moveCameraRight(toCel(this.camera.alpha), 0, 0, timeToFrame(1000));
      }, 2000);
      setTimeout(() => {
        this.moveCameraRight(toCel(this.camera.alpha), 0, 0, timeToFrame(1000));
      }, 5000);
      setTimeout(() => {
        this.moveCameraRight(toCel(this.camera.alpha), 0, 0, timeToFrame(1000));
      }, 8000)
    });

    this.scene.createDefaultEnvironment();

    return this.scene;
  }

  moveCameraLeft(s, v, t0, t) {
    console.log(s);
    s = s - v;
    t0 = t0 + 1;
    v = ACCEL * t0;
    setTimeout(() => {
      this.camera.alpha = BABYLON.Tools.ToRadians(s);
      if (t0 <= t) {
        this.moveCameraLeft(s, v, t0, t);
      } else {
        console.log(s);
      }
    }, FRAME)
  }

  moveCameraRight(s, v, t0, t) {
    console.log(s);
    s = s + v;
    t0 = t0 + 1;
    v = ACCEL * t0;
    setTimeout(() => {
      this.camera.alpha = BABYLON.Tools.ToRadians(s);
      if (t0 <= t) {
        this.moveCameraRight(s, v, t0, t);
      }
    }, FRAME)
  }

  moveCam = (f, camPos) => {
    setTimeout(() => {
      if (f < 10) {
        this.camera.position = BABYLON.Vector3.Lerp(this.camera.position, new BABYLON.Vector3(camPos.x, camPos.y, camPos.z), 0.1);
        f++;
        this.moveCam(f, camPos);
      } else {
        f = 0;
      }
    }, 15)
  }
  
  // rotateLeft()

}

var myModel = new Model('hhh');