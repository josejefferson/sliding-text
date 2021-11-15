const $container = document.querySelector('.container')
const $content = document.querySelector('.content')

const options = {
	container: $container,
	content: $content,
	text: 'Olá José!',
	direction: 1,
	alternate: false,
	easing: 'cubic-bezier(0.68, -0.55, 0.27, 1.55)',
	duration: 0.5,
	fontSize: 10,
	padding: 100,
	background: '',
	color: '',
	opacity: 1,
}

const opts = localStorage.getItem('sliding-text.options')
try { Object.assign(options, JSON.parse(opts)) } catch { }

function start() {
	setTextWidth()
	insertTexts()
	animate()
	setup()
}

start()
window.addEventListener('resize', start)

function setup() {
	document.body.style.backgroundColor = options.background
	document.body.style.color = options.color
	options.container.style.opacity = options.opacity
	if (options.direction === 1) {
		document.body.style.setProperty('--start', `calc(0px - ${options.padding / 2}vw)`)
		document.body.style.setProperty('--end', `calc(${-options.maxScroll}px - ${options.padding / 2}vw)`)
	} else if (options.direction === -1) {
		document.body.style.setProperty('--start', -options.maxScroll + 'px')
		document.body.style.setProperty('--end', '0px')
	}
	document.body.style.setProperty('--anim-time', options.duration * options.textWidth / 100 + 's')
	document.body.style.setProperty('--anim-easing', options.easing)
	document.body.style.setProperty('--anim-dir', options.alternate ? 'alternate' : 'normal')
}

function setTextWidth() {
	const $el = createText()
	document.body.appendChild($el)
	const width = $el.offsetWidth
	options.textWidth = width
	$el.remove()
}

function createText() {
	const $el = document.createElement('div')
	$el.classList.add('text')
	$el.style.fontSize = options.fontSize + 'vh'
	$el.style.paddingLeft = (options.padding / 2) + 'vw'
	$el.style.paddingRight = (options.padding / 2) + 'vw'
	$el.innerHTML = options.text
	return $el
}

function insertTexts() {
	options.content.innerHTML = ''
	const repetitions = options.alternate ? 1 : Math.ceil(innerWidth / options.textWidth) + 1
	for (let i = 0; i < repetitions; i++) {
		const $el = createText()
		options.content.appendChild($el)
	}
}

function animate() {
	if (options.alternate) {
		const repetitions = 1//Math.ceil(innerWidth / options.textWidth)
		options.maxScroll = repetitions * options.textWidth - innerWidth
	} else {
		options.maxScroll = options.textWidth
	}
}