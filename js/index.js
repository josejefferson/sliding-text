const ls = localStorage
const form = document.forms[0]
const formEls = form.elements

// Eventos
window.addEventListener('load', () => {
	document.body.classList.remove('preload')
})

window.addEventListener('scroll', () => {
	if (document.scrollingElement.scrollTop > window.innerHeight) {
		document.querySelector('.start.floating').classList.remove('hidden')
	} else {
		document.querySelector('.start.floating').classList.add('hidden')
	}
})

document.addEventListener('contextmenu', () => false)
document.querySelectorAll('a').forEach(e => e.addEventListener('click', loading))
document.querySelectorAll('.start').forEach(e => {
	e.addEventListener('contextmenu', () => {
		document.querySelector('.hiddenOptions').style.display = 'flex'
	})
})

const $loading = document.querySelector('.loadingScreen')
function loading() {
	$loading.classList.add('visible')
}

const options = {}
const opts = localStorage.getItem('sliding-text.options')
try { Object.assign(options, JSON.parse(opts)) } catch { }

for (const option in options) {
	if (typeof options[option] === 'boolean') {
		formEls[option].checked = options[option]
	} else {
		formEls[option].value = options[option]
	}
}

// Salvar opções
document.forms[0].addEventListener('submit', function (e) {
	e.preventDefault()
	const elems = this.elements

	const options = {
		text: elems.text.value,
		direction: +elems.direction.value,
		alternate: elems.alternate.checked,
		easing: elems.easing.value === 'custom' ? elems.customEasing.value : elems.easing.value,
		duration: elems.duration.value,
		fontSize: +elems.fontSize.value,
		padding: +elems.padding.value,
		background: elems.background.value,
		color: elems.color.value,
		opacity: elems.opacity.value,
	}

	localStorage.setItem('sliding-text.options', JSON.stringify(options))

	loading()
	location.href = 'text.html'
})

// Cores
const colors = {
	background: createPickr('background', '#000'),
	color: createPickr('color', '#FFF'),
}

// document.querySelector('.resetColors').addEventListener('click', () => {
// 	colors.background.setColor('#000')
// 	colors.color.setColor('#FFF8')
// 	colors.border.setColor('#FFF8')
// 	colors.active.setColor('#FFF3')
// })

function createPickr(el, defaultColor, opacity) {
	return Pickr.create({
		el: `.pickr-${el}`,
		theme: 'classic',
		default: options[el] || defaultColor,
		defaultRepresentation: 'HEXA',
		comparison: false,
		autoReposition: true,
		components: {
			preview: true,
			opacity: true,
			hue: true,
			interaction: {
				input: true,
				save: true
			}
		},
		i18n: {
			'btn:save': 'Fechar',
		},
		swatches: [
			'#F44336',
			'#E91E63',
			'#9C27B0',
			'#673AB7',
			'#3F51B5',
			'#2196F3',
			'#03A9F4',
			'#00BCD4',
			'#009688',
			'#4CAF50',
			'#8BC34A',
			'#CDDC39',
			'#FFEB3B',
			'#FFC107',
			'#FF9800',
			'#FF5722',
			'#795548',
			'#9E9E9E',
			'#607D8B',
			'#FFFFFF',
			'#000000'
		].map(e => e + (opacity || ''))

	}).on('change', color => {
		color = color.toRGBA().toString()
		const $input = formEls[el]
		$input.value = color
		$input.parentElement.querySelector('.pickr button')
			.style.setProperty('--pcr-color', color)
	}).on('save', (color, instance) => {
		instance.hide()
	})
}