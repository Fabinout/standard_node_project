class Fourmi {
  constructor(tailleMonde) {
    this.position = { x: tailleMonde.w / 2, y: tailleMonde.h / 2 }
    this.direction = { x: 0, y: -1 }
  }

  tourneAGauche() {
    let xtemp = this.direction.x;
    this.direction.x = this.direction.y;
    this.direction.y = -xtemp;
  }

  avance() {
    this.position = {
      x: (this.position.x + this.direction.x),
      y: this.position.y + this.direction.y,
    }
  }

  tourneADroite() {
    this.tourneAGauche();
    this.tourneAGauche();
    this.tourneAGauche();
  }
}

class Monde {
  constructor(canvas) {
    this.tailleMonde = { w: canvas.width, h: canvas.height }
    this.screen = canvas.getContext('2d');
    this.fourmi = new Fourmi(this.tailleMonde);
    this.drawFourmi(canvas);
    console.log(this.fourmiSurCaseNoire())
    this.vasY();
    console.log(this.fourmi.position)
    let tour = 0;

    setInterval(() => this.vasY(), 1);
  }


  drawFourmi() {
    this.screen.fillStyle = "black";
    this.screen.fillRect(this.fourmi.position.x, this.fourmi.position.y, 1, 1);
  }

  paintEnBlancLaCaseFourmi() {
    this.screen.clearRect(this.fourmi.position.x, this.fourmi.position.y, 1, 1);
  }

  fourmiSurCaseNoire() {
    let color = this.screen.getImageData(this.fourmi.position.x, this.fourmi.position.y, 1, 1).data[3];
    return color === 255;
  }


  vasY() {
    if (this.fourmiSurCaseNoire()) {
      this.fourmi.tourneAGauche();
      this.paintEnBlancLaCaseFourmi(this.screen)
      this.fourmi.avance();
    } else {
      this.fourmi.tourneADroite();
      this.drawFourmi(this.screen)
      this.fourmi.avance();
    }
  }
}

let monde = new Monde(document.getElementById('langton'));


