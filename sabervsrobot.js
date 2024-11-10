console.log("hi");

AFRAME.registerComponent(
  "fly",

  init,
  function () {
    var data = this.data;
    var el = this.el; // <a-box>
    var defaultColor = el.getAttribute("position");

    (function loop() {
      el.setAttribute("position", defaultColor + { x: 0, y: 1, z: 0 });
    });
  }
);
