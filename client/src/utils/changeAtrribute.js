const click = () => {
	const pickers = document.querySelectorAll('[id$=date-picker-range-end]');
	for (let picker of pickers) {
		picker.setAttribute("isvisited", "true")
	}
}

const focus = (event) => {
	if (event.target.className === 'arrowUp' || event.target.className === 'arrowDown') {
		event.target.style.opacity = 1;
	}
}

const focusout = (event) => {
	if (event.target.className === 'arrowUp' || event.target.className === 'arrowDown') {
		event.target.style.opacity = 0;
	}
	if (event.target.classList.contains('flatpickr-next-month')) {
		const pickers = document.querySelectorAll('[id$=date-picker-range-end]');
		for (let picker of pickers) {
			if (!picker.getAttribute("isvisited")) {
				picker.setAttribute("isvisited", "true")
				picker.focus();
			} else {
				picker.removeAttribute("isvisited")
			}
		}
	}
}

export const changeRoleByDiv = () => {
	const divs = document.getElementsByTagName('div');
	for (let i = 0; i < divs.length; i++) {
		if (divs[i].getAttribute('data-name') === 'legend-items') {
			divs[i].setAttribute('role', 'presentation')
		}
		if (divs[i].getAttribute('role') === 'toolbar') {
			divs[i].setAttribute('aria-label', 'toolbar' + [i])
		}
	}

	const datePickerInput = document.getElementsByClassName('bx--date-picker bx--date-picker--light bx--date-picker--range bx--date-picker--nolabel');
	const calendar = document.getElementsByClassName('flatpickr-calendar');

	for (let i = 0; i < datePickerInput.length; i++) {
		datePickerInput[i].appendChild(calendar[i])
	}
}

export const changeRoleByUnorderedList = () => {
	const uls = document.getElementsByTagName('ul');
	for (let i = 0; i < uls.length; i++) {
		uls[i].setAttribute('role', 'menu')
	}
}

export const changeIdByPtag = () => {
	const ps = document.getElementsByTagName('p');
	for (let i = 0; i < ps.length; i++) {
		if (ps[i].getAttribute('id') === 'modal-title') {
			ps[i].setAttribute('aria-labelledby', 'modal-title')
			ps[i].setAttribute('id', 'modal-title' + [i])
		} if (ps[i].getAttribute('id') === 'modal-description') {
			ps[i].setAttribute('aria-describedby', 'modal-description')
			ps[i].setAttribute('id', 'modal-description' + [i])
		}
	}
}

const clickTableButton = () => {
	setTimeout(() => {
		const tables = document.getElementsByTagName('table')
		for (let i = 0; i < tables.length; i++) {
			tables[i].setAttribute("tabindex", "0")
		}
	}, 500)

}

export const listenByButton = () => {
	const buttons = document.getElementsByTagName('button');
	for (let i = 0; i < buttons.length; i++) {
		if (buttons[i].getAttribute('aria-label') === 'Show as table') {
			buttons[i].addEventListener('click', clickTableButton, true)
		}
	}
}

export const listenDatePickerRangeEnd = () => {
	const pickers = document.querySelectorAll('[id$=date-picker-range-end]');
	for (let picker of pickers) {
		picker.addEventListener('click', click, true)
	}
}

export const changeRoleBySpan = () => {
	const spans = document.getElementsByTagName('span');
	for (let i = 0; i < spans.length; i++) {
		if (spans[i].innerHTML === 'Focus sentinel') {
			spans[i].setAttribute('role', 'presentation')
		}
		if (spans[i].className === 'flatpickr-prev-month' || spans[i].classList.contains('flatpickr-next-month')
			|| spans[i].className === 'arrowUp' || spans[i].className === 'arrowDown') {
			spans[i].setAttribute('tabindex', '0')
			spans[i].addEventListener('focus', focus, true)
			spans[i].addEventListener('focusout', focusout, true)
			if (spans[i].className === 'flatpickr-prev-month' || spans[i].classList.contains('flatpickr-next-month')) {
				spans[i].addEventListener('click', click, true)
			}
		}
	}
}