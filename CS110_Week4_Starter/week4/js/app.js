"use strict";

// Structure: 3d.html. Appearance: css/styles.css. Scene logic: this file.
const canvas = document.getElementById("renderCanvas");
const statusText = document.getElementById("scene-status");
const resetButton = document.getElementById("reset-view");
let engine;

function createScene() {
  const scene = new BABYLON.Scene(engine);
  scene.clearColor = new BABYLON.Color4(0.08, 0.14, 0.17, 1);

  const camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);
  camera.setTarget(BABYLON.Vector3.Zero());
  camera.attachControl(canvas, true);
  camera.speed = 0.18;

  
  // EXPERIMENT HERE. Change one value, predict the result, save, and reload.
  const sphere = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: 1.35, segments: 32 }, scene);
  sphere.position.y = 4;

const cone = BABYLON.MeshBuilder.CreateCylinder("cone", {
    diameterTop: 0,         // Setting this to 0 turns the cylinder into a cone
    diameterBottom: 1,      // The width of the base of the cone
    height: 1.4,              // The total height of the cone
    tessellation: 24        // Higher numbers make the cone look smoother/rounder
}, scene);
cone.position.y = 1
cone.rotation.x = Math.PI;

const cylinder = BABYLON.MeshBuilder.CreateCylinder("cylinder", {
    diameterTop: 1,         // Setting this to 0 turns the cylinder into a cone
    diameterBottom: 1,      // The width of the base of the cone
    height: 1.4,              // The total height of the cone
    tessellation: 24        // Higher numbers make the cone look smoother/rounder
}, scene);
cylinder.position.y = 2.50

const lilhat = BABYLON.MeshBuilder.CreateCylinder("lilhat", { 
  diameterTop: 0,
  diameterBottom: 1,
  height: 1.4,
  tessellation: 24
}, scene);
lilhat.position.y = 4.75
lilhat.rotation.x = 45
lilhat.position.z = 1.24

const wall = BABYLON.MeshBuilder.CreatePlane("wall", {width: 20, height: 12 }, scene);
wall.position.y = 4
wall.position.z = 5

  const ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 20, height: 12 }, scene);

  // COLORS //
  if(!ground.Material) {
    ground.material = new BABYLON.StandardMaterial("ground.Material", scene)
    ground.material.diffuseColor = BABYLON.Color3.FromHexString("#018519")
  }

 if(!wall.Material) {
  wall.material = new BABYLON.StandardMaterial("wall.Material", scene)
  wall.material.diffuseColor = BABYLON.Color3.FromHexString("#00b7ff")
 }

  if (!cylinder.Material) {
    cylinder.material = new BABYLON.StandardMaterial("cylinder.Material", scene)
    cylinder.material.diffuseColor = BABYLON.Color3.FromHexString("#FC0303")
  }

  if(!cone.Material) {
    cone.material = new BABYLON.StandardMaterial("cone.Material", scene)
    cone.material.diffuseColor = BABYLON.Color4.FromHexString("#012985")
  }

  if(!sphere.Material) {
    sphere.material = new BABYLON.StandardMaterial("sphere.Material", scene)
    sphere.material.diffuseColor = BABYLON.Color3.FromHexString("#FFFFFF")
  }

  if (!lilhat.Material) {
    lilhat.material = new BABYLON.StandardMaterial("lilhat.Material", scene);
    lilhat.material.diffuseColor = BABYLON.Color3.FromHexString("#FC0303");
  }

  //Lights//
  const light2 = new BABYLON.DirectionalLight("DirectionalLight", new BABYLON.Vector3(0, -1, 0), scene);
  const light3 = new BABYLON.DirectionalLight("Backlight", new BABYLON.Vector3(0, 0, 1), scene);
  const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
  light.intensity = 0.7;

  // Optional extension: add a differently named object and give it its own position.
  // Keep one scene creation, one render loop, and one resize listener.

  // Supplied camera recovery. A new custom button is not required for Week 4.
  resetButton.addEventListener("click", () => {
    camera.position.set(0, 5, -10);
    camera.setTarget(BABYLON.Vector3.Zero());
    statusText.textContent = "Camera reset to the starting view.";
  });
  return scene;
}

try {
  if (!window.BABYLON || !BABYLON.Engine.isSupported()) {
    throw new Error("The Babylon.js engine or WebGL is unavailable.");
  }
  engine = new BABYLON.Engine(canvas, true);
  const scene = createScene();
  engine.runRenderLoop(() => scene.render());
  window.addEventListener("resize", () => engine.resize());
  resetButton.disabled = false;

  // INTRO PRACTICE: replace these messages with your own accurate context.
  console.log("Week 4: sphere and ground scene loaded.");
  statusText.textContent = "Scene ready: a sphere on a ground plane.";
} catch (error) {
  if (engine) engine.dispose();
  canvas.hidden = true;
  statusText.textContent = "The 3D view could not start. Keep the whole week4 folder together, reload, and check the browser console. If this device cannot run WebGL, ask your instructor for the supported lab route.";
  console.error("Scene startup:", error);
}
