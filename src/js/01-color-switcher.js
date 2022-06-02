const refs = {
  startButton: document.querySelector('button[data-start]'),
  stopButton: document.querySelector('button[data-stop]'),
};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function updateBackgroundcolor(color) {
  document.body.style.backgroundColor = color;
}

class ColorSwitcher {
  constructor(updateBackgroundcolor) {
    this.intervalID = null;
    this.isActive = false;
    this.updateBackgroundcolor = updateBackgroundcolor;
    refs.stopButton.disabled = true;
  }

  switchBackgroundColor() {
    if (this.isActive) {
      return;
    }

    refs.startButton.disabled = true;
    refs.stopButton.disabled = false;

    this.isActive = true;
    this.intervalID = setInterval(
      () => updateBackgroundcolor(getRandomHexColor()),
      1000
    );
  }

  stopSwitchBackgroundColor() {
    refs.startButton.disabled = false;
    refs.stopButton.disabled = true;

    clearInterval(this.intervalID);
    this.isActive = false;
  }
}

const colorSwitcher = new ColorSwitcher();

refs.startButton.addEventListener('click', () =>
  colorSwitcher.switchBackgroundColor()
);
refs.stopButton.addEventListener('click', () =>
  colorSwitcher.stopSwitchBackgroundColor()
);
