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

    this.cameraTarget = {
      x: 0,
      y: 0,
      z: 0
    }

    this.init();
  }

  init() {
    //create main components

    LOADING.classList.add('active');

    this.canvas = document.createElement('canvas');
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    document.body.appendChild(this.canvas);

    this.engine = new BABYLON.Engine(this.canvas, true);

    this.scene = new BABYLON.Scene(this.engine);

    this.camera = new BABYLON.ArcRotateCamera("Camera", BABYLON.Tools.ToRadians(120), 3 * Math.PI / 8, 800, new BABYLON.Vector3(0, 0, 0), this.scene);
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

        this.moveCam({ x: x < 0 && x - 80 || x + 80, y: y < 0 && y - 80 || y + 80, z: z < 0 && z - 80 || z + 80 });
      }
    })

    this.engine.runRenderLoop(() => {
      this.scene.render();
    });

  }

  createScene() {
    this.camera.attachControl(this.canvas, true);
    this.scene.ambientColor = new BABYLON.Color3(1, 1, 1);
    this.light = new BABYLON.HemisphericLight("Hemis", new BABYLON.Vector3(1000, 1000, 1000), this.scene);
    console.log(this.light);
    this.light.diffuse = new BABYLON.Color3(0.64, 0.64, 0.32);
    this.light.intensity = 0.8;

    BABYLON.SceneLoader.ImportMesh("", "./model/model1/", "gift_giving.gltf", this.scene, (meshes, particleSystems, skeletons, animationGroups) => {

      LOADING.classList.remove('active');

      console.log(this.scene.getMeshByName('group3'))
      let zoom1 = {
        group1: this.scene.getMeshByName('group3'),
      }
      console.log(zoom1.group1)
      meshes.forEach(item => {
        if (item.name === 'ventole') {
          item.rotationQuaternion = null;
          this.rotateModelX(item, 4);
        } else if (item.name === 'pale_ventola') {
          item.rotationQuaternion = null;
          this.rotateModelY(item, 4);
        } else if (item.name === 'festone_dx' || item.name === 'festone_sx') {
          item.rotationQuaternion = null;
          this.rotateModelY(item, 0.1);
        } else if (item.name === 'cono1.001') {
          item.material.emissiveColor = new BABYLON.Color3(0.64, 0.64, 0.33);
          item.rotationQuaternion = null;
          this.rotateModelY(item, 0.05);
        }
      });

      // setTimeout(() => {
      //   this.moveCameraRight(toCel(this.camera.alpha), 0, 0, timeToFrame(1000));
      // }, 2000);
      // setTimeout(() => {
      //   this.moveCameraRight(toCel(this.camera.alpha), 0, 0, timeToFrame(1000));
      // }, 5000);
      // setTimeout(() => {
      //   this.moveCameraRight(toCel(this.camera.alpha), 0, 0, timeToFrame(1000));
      // }, 8000);\

      x.addEventListener('change', (e) => {
        this.cameraTarget.x = Number(e.target.value);
        this.camera.target = new BABYLON.Vector3(this.cameraTarget.x, this.cameraTarget.y, this.cameraTarget.z);
        console.log(this.cameraTarget)
      });

      y.addEventListener('change', (e) => {
        this.cameraTarget.y = Number(e.target.value);
        this.camera.target = new BABYLON.Vector3(this.cameraTarget.x, this.cameraTarget.y, this.cameraTarget.z);
        console.log(this.cameraTarget)
      });

      z.addEventListener('change', (e) => {
        this.cameraTarget.z= Number(e.target.value);
        this.camera.target = new BABYLON.Vector3(this.cameraTarget.x, this.cameraTarget.y, this.cameraTarget.z);
        console.log(this.cameraTarget)
      });

      // rightBtn.addEventListener('click', () => {
      //   this.camera.target = new BABYLON.Vector3(this.cameraTarget.x, this.cameraTarget.y, this.cameraTarget.z);
      //   console.log(this.cameraTarget)

      //   // if (!isClicked) {
      //   //   isClicked = true;
      //   //   this.camera.target = new BABYLON.Vector3(0, 0, 0);
      //   //   this.moveCameraRight(toCel(this.camera.alpha), 0, 0, timeToFrame(1000));
      //   // }
      // });
      // leftBtn.addEventListener('click', () => {
      //   this.cameraTarget.y -= 10;
      //   this.camera.target = new BABYLON.Vector3(this.cameraTarget.x, this.cameraTarget.y, this.cameraTarget.z);
      //   console.log(this.cameraTarget)

      //   // if (!isClicked) {
      //   //   isClicked = true;
      //   //   this.camera.target = new BABYLON.Vector3(0, 0, 0);
      //   //   this.moveCameraLeft(toCel(this.camera.alpha), 0, 0, timeToFrame(1000));
      //   // }
      // });

      // midBtn.addEventListener('click', () => {
      //   this.cameraTarget.z -= 10;
      //   this.camera.target = new BABYLON.Vector3(this.cameraTarget.x, this.cameraTarget.y, this.cameraTarget.z);
      //   console.log(this.cameraTarget)
      //   // if (!isClicked) {
      //   //   console.log(zoom1.group1)
      //   //   this.camera.target = new BABYLON.Vector3(200, 200, 200);
      //   // }
      // });
    });

    // this.scene.createDefaultEnvironment();
    console.log(this.scene)
    this.scene.ambientColor = new BABYLON.Color3(1, 1, 1)
    return this.scene;
  }

  zoomOn(camPos) {
    setTimeout(() => {
      if (Math.abs(this.camera.position.x - camPos.x) > 5) {
        console.log(camPos.x, this.camera.position.x)
        this.camera.position = BABYLON.Vector3.Lerp(this.camera.position, new BABYLON.Vector3(camPos.x, camPos.y, camPos.z), 0.1);
        this.moveCam(camPos);
      } else {
        console.log('stop!')
      }
    }, 15)
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
        isClicked = false;
      }
    }, FRAME)
  }

  rotateModelX(model, v) {
    setTimeout(() => {
      model.rotation.x += v;
      this.rotateModelX(model, v)
    }, 30)
  }

  rotateModelY(model, v) {
    setTimeout(() => {
      model.rotation.y += v;
      this.rotateModelY(model, v)
    }, 30)
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
      } else {
        isClicked = false;
      }
    }, FRAME)
  }

  moveCam = (camPos) => {
    setTimeout(() => {
      if (Math.abs(this.camera.position.x - camPos.x) > 5) {
        console.log(camPos.x, this.camera.position.x)
        this.camera.position = BABYLON.Vector3.Lerp(this.camera.position, new BABYLON.Vector3(camPos.x, camPos.y, camPos.z), 0.1);
        this.moveCam(camPos);
      } else {
        console.log('stop!')
      }
    }, 15)
  }

  // rotateLeft()

}

var myModel = new Model('hhh');