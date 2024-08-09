import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const inputData = document.getElementById('datetime-picker');
const buttonStart = document.querySelector('button[data-start]');

const timerDays = document.querySelector('span[data-days]');
const timerHours = document.querySelector('span[data-hours]');
const timerMinutes = document.querySelector('span[data-minutes]');
const timerSeconds = document.querySelector('span[data-seconds]');

let myTimer = null;
let selectedDate = null;
buttonStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (new Date().getTime() > selectedDates[0].getTime()) {
      iziToast.error({
        title: 'Error',
        message: `Please choose a date in the future`,
        position: 'topRight',
        color: '#ef4040',
        titleColor: '#fff',
        titleSize: '16px',
        titleLineHeight: '150%',
        messageColor: '#fff',
        messageSize: '16px',
        messageLineHeight: '150%',
      });
    } else {
      selectedDate = selectedDates[0];
      buttonStart.disabled = false;
    }
  },
};

buttonStart.addEventListener('click', () => {
  if (selectedDate) {
    buttonStart.disabled = true;
    myTimer = setInterval(() => {
      const difference = selectedDate.getTime() - new Date().getTime();
      if (difference < 1000) {
        clearInterval(myTimer);
        timerSeconds.textContent = '00';
      } else {
        timerDays.textContent = addZero(convertMs(difference).days);
        timerHours.textContent = addZero(convertMs(difference).hours);
        timerMinutes.textContent = addZero(convertMs(difference).minutes);
        timerSeconds.textContent = addZero(convertMs(difference).seconds);
      }
    }, 1000);
  }
});

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addZero(value) {
  return value.toString().padStart(2, '0');
}

flatpickr(inputData, options);
