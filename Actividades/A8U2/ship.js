
function Ship() {
  this.x = 0;
  this.y = 0;
  this.rotation = -Math.PI / 2;

  this.width = 60;
  this.height = 60;

  this.image = new Image();
  this.image.src = "hoja.png";

  this.ripples = [];
  this.rippleTimer = 0;
}

Ship.prototype.draw = function (context) {
  context.save();

  context.translate(this.x, this.y);
  context.rotate(this.rotation);

  if (this.image.complete && this.image.naturalWidth > 0) {
    context.drawImage(
      this.image,
      -this.width / 2,
      -this.height / 2,
      this.width,
      this.height
    );
  }

  context.restore();
};

Ship.prototype.createRipple = function () {
  var angle = this.rotation;

  this.ripples.push({
    x: this.x - Math.cos(angle) * 18,
    y: this.y - Math.sin(angle) * 18,
    radius: 5,
    alpha: 0.8
  });
};

Ship.prototype.drawRipples = function (context) {
  for (var i = this.ripples.length - 1; i >= 0; i--) {
    var ripple = this.ripples[i];

    // Ondas más grandes y de expansión más lenta
    ripple.radius += 0.22;

    // Desaparecen más lentamente
    ripple.alpha -= 0.0025;

    if (ripple.alpha <= 0) {
      this.ripples.splice(i, 1);
      continue;
    }

    context.beginPath();

    context.ellipse(
      ripple.x,
      ripple.y,
      ripple.radius * 1.7,
      ripple.radius * 0.75,
      0,
      0,
      Math.PI * 2
    );

    context.strokeStyle =
      "rgba(235, 253, 255, " + ripple.alpha + ")";

    context.lineWidth = 1.5;
    context.stroke();
  }
};
