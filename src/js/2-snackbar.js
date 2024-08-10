//npm install izitoast --save
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('form');

form.addEventListener('submit', event => {
  event.preventDefault();
  const delay = parseInt(event.target.elements.delay.value);
  const state = event.target.state.value;

  const promise = new Promise((resolve, reject) => {
    if (state === 'fulfilled') {
      resolve(delay);
    } else {
      reject(delay);
    }
  });

  promise
    .then(delayRes => {
		setTimeout(()=>{
			iziToast.success({
				title: 'Ok',
				message: `Fulfilled promise in ${delayRes}ms`,
				position: 'topRight',
				color: '#59a10d',
				titleColor: '#fff',
				titleSize: '16px',
				titleLineHeight: '150%',
				messageColor: '#fff',
				messageSize: '16px',
				messageLineHeight: '150%',
			  });
		}, delayRes)
    })
    .catch(delayRes => {
		setTimeout(()=>{
			iziToast.error({
				title: 'Error',
				message: `Rejected promise in ${delayRes}ms`,
				position: 'topRight',
				color: '#ef4040',
				titleColor: '#fff',
				titleSize: '16px',
				titleLineHeight: '150%',
				messageColor: '#fff',
				messageSize: '16px',
				messageLineHeight: '150%',
			  });
		},delayRes)
    });
});
