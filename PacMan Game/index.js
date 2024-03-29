const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
const score = document.getElementById('score')
console.log(c)
const reset = document.getElementById( 'reset' )


canvas.width = innerWidth
canvas.height = innerHeight

class Boundary {
	static width = 40
	static height = 40
	constructor({ position, image }) {
		this.position = position
		this.width = 40
		this.height = 40
		this.image = image
	}

	draw() {
		//c.fillStyle = 'blue'
		//c.fillRect(this.position.x, this.position.y, this.width, this.height)
		c.drawImage(this.image, this.position.x, this.position.y)
	}

}

class Player {
	constructor({ position, velocity }) {
		this.position = position
		this.velocity = velocity
		this.radius = 15
	}
	draw() {
		c.beginPath()
		c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
		c.fillStyle = 'yellow'
		c.fill()
		c.closePath()
	}

	update() {
		this.draw()
		this.position.x += this.velocity.x
		this.position.y += this.velocity.y
	}
}

class Ghost {
	constructor({ position, velocity }) {
		this.position = position
		this.velocity = velocity
		this.radius = 15
		this.prevCollisions = []
	}
	draw() {
		c.beginPath()
		c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
		c.fillStyle = 'red'
		c.fill()
		c.closePath()
	}

	update() {
		this.draw()
		this.position.x += this.velocity.x
		this.position.y += this.velocity.y
	}
}
const keys = {
	w: {
		pressed: false
	},
	a: {
		pressed: false
	},
	s: {
		pressed: false
	},
	d: {
		pressed: false
	}
}

class Pellet {
	constructor({ position }) {
		this.position = position

		this.radius = 4
	}
	draw() {
		c.beginPath()
		c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
		c.fillStyle = 'yellow'
		c.fill()
		c.closePath()
	}


}
let lastkey = ' '
let int = 0;
const ghosts = [
	new Ghost({
		position: {
			x:  (Boundary.width + Boundary.width / 2) *5,
			y:  (Boundary.height + Boundary.height / 2)
		},
		velocity: {
			x: -5,
			y: 0
		}
	}),
	new Ghost({
		position: {
			x:  (Boundary.width + Boundary.width / 2) *3,
			y:  (Boundary.height + Boundary.height / 2)
		},
		velocity: {
			x: -5,
			y: 0
		}
	})
]
const pellets = [];
const map = [
	['1', '-', '-', '-', '-', '-', '-','-', '-', '-', '-', '-', '-','-', '-', '-', '-', '-', '-','-', '-', '-', '-', '-', '-', '2'],
	['|', ' ', '.', '.', '.', '.','.','', '.', 'b', 'b', 'b', 'b',' ', '.', '.', '.', '.','.',' ', '.', 'b', '.', '.', '.', '|'],
	['|', '.', 'b', '.', 'b', 'b', '.','b', '.', 'b', '.', '.', '.','.', 'b', '.', 'b', 'b', '.','b', '.', '.', '.', 'b', '.', '|'],
	['|', '.', '.', '.', '.', '.', '.',' ', '.', 'b', '.', 'b', 'b','.', '.', '.', '.', '.', '.',' ', '.', 'b', '.', 'b', '.', '|'],
	['|', '.', 'b', '.', 'b', 'b', '.','b', '.', 'b', '.', 'b', 'b','.', 'b', '.', 'b', 'b', '.','b', '.', '.', '.', '.', '.','|'],
	['|', '.', 'b', '.', 'b', 'b', '.','b', '.', 'b', '.', '.', '.','.', 'b', '.', 'b', 'b', '.','b', '.', 'b', '.', 'b', '.', '|'],
	['|', '.', 'b', '.', 'b', 'b', '.','b', '.', 'b', '.', 'b', 'b', '.', 'b', '.', 'b', 'b', '.','b', '.', 'b', '.', 'b', '.','|'],
	['|', '.', '.', '.', '.', '.', '.','b', '.', '.', '.', '.', '.','.', '.', '.', '.', '.', '.',' ', '.', 'b', '.', '.', '.', '|'],
	['4', '-', '-', '-', '-', '-', '-','-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-','-', '-', '-', '-', '-', '-','3']
];
const boundaries = []
const player = new Player({
	position: {
		x: 600,
		y: 300
	},
	velocity: {
		x: 0,
		y: 0
	}
})

function createImage(src) {
	const image = new Image()
	image.src = src
	return image
}

map.forEach((row, i) => {
	row.forEach((symbol, j) => {
		switch (symbol) {
			case '-':
				boundaries.push(
					new Boundary({
						position: {
							x: Boundary.width * j,
							y: Boundary.height * i
						},
						image: createImage('./Img/pipeHorizontal.png')
					})
				)
				break
			case '|':
				boundaries.push(
					new Boundary({
						position: {
							x: Boundary.width * j,
							y: Boundary.height * i
						},
						image: createImage('./Img/pipeVertical.png')
					})
				)
				break
			case '1':
				boundaries.push(
					new Boundary({
						position: {
							x: Boundary.width * j,
							y: Boundary.height * i
						},
						image: createImage('./Img/pipeCorner1.png')
					})
				)
				break
			case '2':
				boundaries.push(
					new Boundary({
						position: {
							x: Boundary.width * j,
							y: Boundary.height * i
						},
						image: createImage('./Img/pipeCorner2.png')
					})
				)
				break
			case '3':
				boundaries.push(
					new Boundary({
						position: {
							x: Boundary.width * j,
							y: Boundary.height * i
						},
						image: createImage('./Img/pipeCorner3.png')
					})
				)
				break
			case '4':
				boundaries.push(
					new Boundary({
						position: {
							x: Boundary.width * j,
							y: Boundary.height * i
						},
						image: createImage('./Img/pipeCorner4.png')
					})
				)
				break
			case 'b':
				boundaries.push(
					new Boundary({
						position: {
							x: Boundary.width * j,
							y: Boundary.height * i
						},
						image: createImage('./Img/block.png')
					})
				)
				break
			case '.':
				pellets.push(
					new Pellet({
						position: {
							x: j * Boundary.width + Boundary.width / 2,
							y: i * Boundary.height + Boundary.height / 2
						},

					})
				)
				break
		}
	})
})

const boundary = new Boundary({
	position: {
		x: 0,
		y: 0
	}
})
boundaries.forEach((boundary) => {
	boundary.draw()
})

function circleCollidesWithRectangle({
	circle,
	rectangle
}) {
	const padding = Boundary.width /2 - circle.radius - 1
	return (circle.position.y - circle.radius + circle.velocity.y
		<=
		rectangle.position.y + rectangle.height &&
		circle.position.x + circle.radius + circle.velocity.x
		>=
		rectangle.position.x -padding &&
		circle.position.y + circle.radius + circle.velocity.y >=
		rectangle.position.y - padding && circle.position.x - circle.radius + circle.velocity.x
		<= rectangle.position.x + rectangle.width + padding)
}
let animationID
function animate() {
	animationID = requestAnimationFrame(animate)
	c.clearRect(0, 0, canvas.width, canvas.height)


	if (keys.w.pressed && lastkey === 'w') {
		for (let i = 0; i < boundaries.length; i++) {
			const boundary = boundaries[i]
			if (
				circleCollidesWithRectangle({
					circle: {
						...player, velocity: {
							x: 0,
							y: -5
						}
					},
					rectangle: boundary
				})
			) {
				player.velocity.y = 0
				break
			} else {
				player.velocity.y = -5
			}
		}
	} else if (keys.a.pressed && lastkey === 'a') {
		for (let i = 0; i < boundaries.length; i++) {
			const boundary = boundaries[i]
			if (
				circleCollidesWithRectangle({
					circle: {
						...player, velocity: {
							x: -5,
							y: 0
						}
					},
					rectangle: boundary
				})
			) {
				player.velocity.x = 0
				break
			} else {
				player.velocity.x = -5
			}
		}
	} else if (keys.s.pressed && lastkey === 's') {
		for (let i = 0; i < boundaries.length; i++) {
			const boundary = boundaries[i]
			if (
				circleCollidesWithRectangle({
					circle: {
						...player, velocity: {
							x: 0,
							y: 5
						}
					},
					rectangle: boundary
				})
			) {
				player.velocity.y = 0
				break
			} else {
				player.velocity.y = 5
			}
		}
	} else if (keys.d.pressed && lastkey === 'd') {
		for (let i = 0; i < boundaries.length; i++) {
			const boundary = boundaries[i]
			if (
				circleCollidesWithRectangle({
					circle: {
						...player, velocity: {
							x: 5,
							y: 0
						}
					},
					rectangle: boundary
				})
			) {
				player.velocity.x = 0
				break
			} else {
				player.velocity.x = 5
			}
		}
	}
	boundaries.forEach((boundary) => {
		boundary.draw()
		if (
			circleCollidesWithRectangle({
				circle: player,
				rectangle: boundary
			})
		) {
			player.velocity.x = 0
			player.velocity.y = 0
		}
	})
	pellets.forEach((Pellet, i) => {
		Pellet.draw()

		if (Math.hypot(Pellet.position.x - player.position.x,
			Pellet.position.y - player.position.y) < Pellet.radius + player.radius) {
			pellets.splice(i, 1)
			int++
			score.innerHTML = int
		}

	})

	player.update()


	ghosts.forEach((Ghost) => {
		Ghost.update()

		if (Math.hypot(Ghost.position.x - player.position.x,
			Ghost.position.y - player.position.y) < Ghost.radius + player.radius) {
			cancelAnimationFrame(animationID)
		}
		const collisions = []
		boundaries.forEach((boundary) => {
			if (
				!collisions.includes('right') &&
				circleCollidesWithRectangle({
					circle: {
						...Ghost, velocity: {
							x: 5,
							y: 0
						}
					},
					rectangle: boundary
				})
			) {
				collisions.push('right')
			}
			if (
				!collisions.includes('left') &&
				circleCollidesWithRectangle({
					circle: {
						...Ghost, velocity: {
							x: -5,
							y: 0
						}
					},
					rectangle: boundary
				})
			) {
				collisions.push('left')
			}
			if (
				!collisions.includes('up') &&
				circleCollidesWithRectangle({
					circle: {
						...Ghost, velocity: {
							x: 0,
							y: -5
						}
					},
					rectangle: boundary
				})
			) {
				collisions.push('up')
			}
			if (
				!collisions.includes('down') &&
				circleCollidesWithRectangle({
					circle: {
						...Ghost, velocity: {
							x: 0,
							y: 5
						}
					},
					rectangle: boundary
				})
			) {
				collisions.push('down')
			}
			console.log(collisions)
		})
		if (collisions.length > Ghost.prevCollisions.length)
			Ghost.prevCollisions = collisions

		if (JSON.stringify(collisions) !== JSON.stringify(Ghost.prevCollisions)) {

			if (Ghost.velocity.x > 0) Ghost.prevCollisions.push('right')
			else if (Ghost.velocity.x < 0) Ghost.prevCollisions.push('left')
			else if (Ghost.velocity.y > 0) Ghost.prevCollisions.push('down')
			else if (Ghost.velocity.y < 0) Ghost.prevCollisions.push('up')

			const pathways = Ghost.prevCollisions.filter(collision => {
				return !collisions.includes(collision)
			})
			
			const direction = pathways[Math.floor(Math.random() * pathways.length)]
		
			switch (direction) {
				case 'down':
					
				Ghost.velocity.y = 5
					Ghost.velocity.x = 0
					break
				case 'up':
					Ghost.velocity.y = -5
					Ghost.velocity.x = 0
					break
				case 'left':
					Ghost.velocity.y = 0
					Ghost.velocity.x = -5
					break
				case 'right':
					Ghost.velocity.y = 0
					Ghost.velocity.x = 5
					break
			}

			Ghost.prevCollisions = [];
			
		}
		
	})
}




animate()








addEventListener('keydown', ({ key }) => {
	switch (key) {
		case 'w':
			keys.w.pressed = true
			lastkey = 'w'
			break
		case 's':
			keys.s.pressed = true
			lastkey = 's'
			break
		case 'a':
			keys.a.pressed = true
			lastkey = 'a'
			break
		case 'd':
			keys.d.pressed = true
			lastkey = 'd'
			break
	}
})

addEventListener('keyup', ({ key }) => {
	switch (key) {
		case 'w':
			keys.w.pressed = false
			break
		case 's':
			keys.s.pressed = false
			break
		case 'a':
			keys.a.pressed = false
			break
		case 'd':
			keys.d.pressed = false
			break
	}
})
reset.addEventListener('click', function(){
	window.location.reload();
})