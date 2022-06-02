import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'flatpickr/dist/themes/dark.css';

let selectedTime = null;
const refs = {
  inputDate: document.querySelector('#datetime-picker'),
  startButton: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
function pad(value) {
  return String(value).padStart(2, '0');
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: Date.now(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
      Notify.failure('Please choose a date in the future');
      selectedDates[0] = new Date();
    } else {
      refs.startButton.disabled = false;
      selectedTime = selectedDates[0];
    }
  },
};

class Timer {
  constructor() {
    this.intervalId = null;
    this.isActive = false;
    // this.onTick = onTick;
    refs.startButton.disabled = true;
  }
  start() {
    if (this.isActive) {
      return;
    }
    // const startTime = Date.now();
    this.isActive = true;
    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = selectedTime - currentTime;
      const convertedTime = convertMs(deltaTime);
      this.updateClockFace(convertedTime);
      if (deltaTime <= 0) {
        this.stop();
      }
    }, 1000);
  }

  updateClockFace({ days, hours, minutes, seconds }) {
    refs.days.textContent = days;
    refs.hours.textContent = hours;
    refs.minutes.textContent = minutes;
    refs.seconds.textContent = seconds;
  }
  stop() {
    clearInterval(this.intervalId);
    //this.isActive = false;
  }
}
const timer = new Timer();
flatpickr(refs.inputDate, options);
refs.startButton.addEventListener('click', () => {
  timer.start();
});
// timer.start;
