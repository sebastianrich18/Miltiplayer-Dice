let buttons = [];
class Button {
    constructor(x, y, w, h, text, func, enabled) {
        this.text = text
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.func = func;
        enabled == undefined ? this.enabled = true : this.enabled = enabled;
        this.color = [255, 255, 255];
        this.boarder = [0, 0, 0];
        buttons.push(this);
        this.ad
    }

    disable() { this.enabled = false; }
    enable() { this.enabled = true; }

    setColor(r, g, b) {
        this.color[0] = r;
        this.color[1] = g;
        this.color[2] = b;
    }

    setStroke(r,g,b) {
        this.boarder = [r,g,b];
    }

    show() {
        fill(255)
        stroke(this.boarder[0], this.boarder[1], this.boarder[2]);
        rectMode(CORNER)
        textSize(28);
        textAlign(CENTER)
        if (this.enabled) {
            fill(this.color[0], this.color[1], this.color[2]);
            rect(this.x, this.y, this.w, this.h);
            fill(0);
            text(this.text, this.x + (this.w / 2), this.y + (this.h / 2) + 8);
        }
        stroke(0);
    }

    pressed() {
        if (this.enabled) {
            this.func();
        }
    }
}

function mousePressed() {
    buttons.forEach(b => {
        if (b.enabled && b.x < mouseX && b.x + b.w > mouseX &&
            b.y < mouseY && b.y + b.h > mouseY) {
            b.pressed();
        }
    });
}

function touchStarted() { // handles touch screen taps
    let touchX = touches[touches.length - 1].x;
    let touchY = touches[touches.length - 1].y;
    buttons.forEach(b => {
        if (b.enabled && b.x < touchX && b.x + b.w > touchX &&
            b.y < touchY && b.y + b.h > touchY) {
            b.pressed();
        }
    });
}