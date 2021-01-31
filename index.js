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

    this.zoom = false;

    this.roomIndex = 0;
    this.currentRoom = vertices[this.roomIndex];

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

    this.canvas = document.getElementById('renderer');
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    this.engine = new BABYLON.Engine(this.canvas, true);
    this.scene = new BABYLON.Scene(this.engine);
    this.camera = new BABYLON.ArcRotateCamera("Camera", BABYLON.Tools.ToRadians(120), 3 * Math.PI / 8, 800, new BABYLON.Vector3(0, 0, 0), this.scene);

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
      }
    });

    this.engine.runRenderLoop(() => {
      // console.log(this.camera.position);
      this.scene.render();
    });

  }

  createScene() {
    // this.camera.attachControl(this.canvas, true);
    this.scene.ambientColor = new BABYLON.Color3(1, 1, 1);
    this.light = new BABYLON.HemisphericLight("Hemis", new BABYLON.Vector3(1000, 1000, 1000), this.scene);
    this.light.diffuse = new BABYLON.Color3(0.64, 0.64, 0.32);
    this.light.intensity = 0.9;

    BABYLON.SceneLoader.ImportMesh("", "./model/model1/", "gift_giving.gltf", this.scene, (meshes, particleSystems, skeletons, animationGroups) => {

      LOADING.classList.remove('active');
      changeDotsSize();
      this.displayDotsZoom(0);

      document.getElementById('room1_zoom_1').addEventListener('click', () => {
        this.zoom = true;
        this.camera.target = new BABYLON.Vector3(vertices[0].focus2.target.x, vertices[0].focus2.target.y, vertices[0].focus2.target.z)
        console.log(this.camera.target);
        this.moveCam(vertices[0].focus2.vertice);
        this.hideDotsZoom(0);
      });

      document.getElementById('room1_zoom_2').addEventListener('click', () => {
        this.zoom = true;
        this.camera.target = new BABYLON.Vector3(vertices[0].focus1.target.x, vertices[0].focus1.target.y, vertices[0].focus1.target.z)
        console.log(this.camera.target);
        this.moveCam(vertices[0].focus1.vertice);
        this.hideDotsZoom(0);
      });

      document.getElementById('room3_zoom_1').addEventListener('click', () => {
        this.zoom = true;
        this.camera.target = new BABYLON.Vector3(vertices[2].focus1.target.x, vertices[2].focus1.target.y, vertices[2].focus1.target.z)
        console.log(this.camera.target);
        this.moveCam(vertices[2].focus1.vertice);
        this.hideDotsZoom(2);
      });

      document.getElementById('room2_zoom_1').addEventListener('click', () => {
        this.zoom = true;
        this.camera.target = new BABYLON.Vector3(vertices[1].focus1.target.x, vertices[1].focus1.target.y, vertices[1].focus1.target.z)
        console.log(this.camera.target);
        this.moveCam(vertices[1].focus1.vertice);
        this.hideDotsZoom(1);
      });

      document.getElementById('room2_zoom_2').addEventListener('click', () => {
        this.zoom = true;
        this.camera.target = new BABYLON.Vector3(vertices[1].focus2.target.x, vertices[1].focus2.target.y, vertices[1].focus2.target.z)
        console.log(this.camera.target);
        this.moveCam(vertices[1].focus2.vertice);
        this.hideDotsZoom(1);
      });

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

      rightBtn.addEventListener('click', () => {
        if (!isClicked) {
          this.roomIndex = this.roomIndex < 2 ? this.roomIndex + 1 : 0;
          this.hideDotsZoom(0);
          this.hideDotsZoom(1);
          this.hideDotsZoom(2);
          console.log(this.roomIndex)
          isClicked = true;
          this.camera.target = new BABYLON.Vector3(0, 0, 0);
          this.moveCameraRight(toCel(this.camera.alpha), 0, 0, timeToFrame(1000));
        }
      });

      leftBtn.addEventListener('click', () => {
        if (!isClicked) {
          this.roomIndex = this.roomIndex > 0 ? this.roomIndex - 1 : 2;
          this.hideDotsZoom(0);
          this.hideDotsZoom(1);
          this.hideDotsZoom(2);
          isClicked = true;
          this.camera.target = new BABYLON.Vector3(0, 0, 0);
          this.moveCameraLeft(toCel(this.camera.alpha), 0, 0, timeToFrame(1000));
        } else {
          isClicked = false;
          this.displayDotsZoom(this.roomIndex);
        }
      });

      midBtn.addEventListener('click', () => {
        this.zoom = false;
        this.camera.target = new BABYLON.Vector3(0, 0, 0);
        this.moveCam(vertices[this.roomIndex].init);

        this.displayDotsZoom(this.roomIndex)
        // this.camera.target = new BABYLON.Vector3(vertices[2].focus1.target.x, vertices[2].focus1.target.y, vertices[2].focus1.target.z)
        // console.log(this.camera.target);
        // this.moveCam(vertices[2].focus1.vertice);
        // if (!isClicked) {
        //   console.log(zoom1.group1)
        //   this.camera.target = new BABYLON.Vector3(200, 200, 200);
        // }
      });
    });

    // this.scene.createDefaultEnvironment();
    this.scene.ambientColor = new BABYLON.Color3(1, 1, 1)
    return this.scene;
  }

  zoomOn(camPos) {
    setTimeout(() => {
      if (Math.abs(this.camera.position.x - camPos.x) > 5) {
        this.camera.position = BABYLON.Vector3.Lerp(this.camera.position, new BABYLON.Vector3(camPos.x, camPos.y, camPos.z), 0.1);
        this.moveCam(camPos);
      }
    }, 15)
  }

  moveCameraLeft(s, v, t0, t) {
    s = s - v;
    t0 = t0 + 1;
    v = ACCEL * t0;
    setTimeout(() => {
      this.camera.alpha = BABYLON.Tools.ToRadians(s);
      if (t0 <= t) {
        this.moveCameraLeft(s, v, t0, t);
      } else {
        isClicked = false;
        this.displayDotsZoom(this.roomIndex);
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
    s = s + v;
    t0 = t0 + 1;
    v = ACCEL * t0;
    setTimeout(() => {
      this.camera.alpha = BABYLON.Tools.ToRadians(s);
      if (t0 <= t) {
        this.moveCameraRight(s, v, t0, t);
      } else {
        this.displayDotsZoom(this.roomIndex);
        isClicked = false;
      }
    }, FRAME)
  }

  moveCam = (camPos) => {
    setTimeout(() => {
      if (Math.abs(this.camera.position.x - camPos.x) > 5) {
        this.camera.position = BABYLON.Vector3.Lerp(this.camera.position, new BABYLON.Vector3(camPos.x, camPos.y, camPos.z), 0.1);
        this.moveCam(camPos);
      } else {
      }
    }, 15)
  }

  hideDotsZoom = (room) => {
    if (room === 0) {
      room1_zoom.forEach(item => {
        item.classList.add('hidden');
      })
    } else if (room === 1) {
      room2_zoom.forEach(item => {
        item.classList.add('hidden');
      })
    } else if (room === 2) {
      room3_zoom.forEach(item => {
        item.classList.add('hidden');
      })
    }
  }

  displayDotsZoom = (room) => {
    if (room === 0) {
      room1_zoom.forEach(item => {
        item.classList.remove('hidden');
      })
    } else if (room === 1) {
      room2_zoom.forEach(item => {
        item.classList.remove('hidden');
      })
    } else if (room === 2) {
      room3_zoom.forEach(item => {
        item.classList.remove('hidden');
      })
    }
    return 0
  }

}

var myModel = new Model('hhh');