'use strict';

const currencyOne = document.getElementById('currency-1')
const currencyTwo = document.getElementById('currency-2')
const inputOne = document.querySelector('.number-1')
const inputTwo = document.querySelector('.number-2')
const rate = document.querySelector('.rate')
const swap = document.getElementById('swap-btn')


class App {
	#cur_1 ;
	#cur_2;
	constructor(){
		this.#convert();

		currencyOne.addEventListener('change', this.#convert.bind(this))
		currencyTwo.addEventListener('change', this.#convert.bind(this))
		inputOne.addEventListener('input', this.#convert.bind(this))
		inputTwo.addEventListener('input', this.#convert.bind(this))
		swap.addEventListener('click', this.#swap.bind(this))

	}
	#convert(){
		this.#cur_1 = currencyOne.value;
		this.#cur_2 = currencyTwo.value;
		this.fetchAPI();
	}

	// fetch API
	fetchAPI(){
		fetch(`https://api.exchangerate-api.com/v4/latest/${this.#cur_1}`)
		.then(req => req.json())
		.then(data => {
			this.#utilizing(data)
		})
	}

	// utilzing data from API (promise)
	#utilizing(data){
		const excRate = data.rates[this.#cur_2];
			rate.textContent = `1 ${this.#cur_1} = ${excRate} ${this.#cur_2}`
			inputTwo.value = (excRate * +inputOne.value).toFixed(2);
	}

	//swap
	#swap(){
		const intCur_1 = currencyOne.value;
		currencyOne.value = currencyTwo.value;
		currencyTwo.value = intCur_1;
		this.#convert();
	}
}

const app = new App();