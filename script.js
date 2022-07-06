window.addEventListener("load", function () {
	const canvas = document.getElementById("canvas1");
	const context = canvas.getContext("2d");
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	// canvas settings
	context.fillStyle = "green";

	
	context.lineCap = "round";
	context.shadowColor = "rgba(0,0,0,0.7)";
	context.shadowOffsetX = 10;
	context.shadowOffsetY = 5;
	context.shadowBlur = 10;

	// effect settings
	let size =
		canvas.width < canvas.height ? canvas.width * 0.3 : canvas.height * 0.3;
	const maxLevel = 3;
	const branches = 2;

	sides = 5;
	spread = 0.5;
	scale = 2.1;
	color = "hsl(" + Math.random() * 360 + ", 100%, 50% )";
	let lineWidth = Math.floor(Math.random() * 20 + 10);

	// controls
	const randomizeButton = document.getElementById("randomizeButton");
	const resetButton = document.getElementById("resetButton");
	const slider_spread = document.getElementById('spread');
	const label_spread = document.querySelector('[for="spread"]');

	slider_spread.addEventListener('change', function(e){
		spread = e.target.value;
		updateSliders()
		drawFractal() 
	})
	slider_sides = document.getElementById('sides');
	label_sides = document.querySelector('[for="sides"]');
	slider_sides.addEventListener('change', function(e){
		sides = e.target.value;
		updateSliders()
		drawFractal() 
	})

	function drawBranch(level) {
		if (level > maxLevel) return;
		context.beginPath();
		context.moveTo(0, 0);
		context.lineTo(size, 0);
		context.stroke();

		for (let i = 0; i < branches; i++) {
			context.save();
			context.translate(size - (size / branches) * i, 0);
			context.scale(scale, scale);

			context.save();
			context.rotate(spread);
			drawBranch(level + 1);
			context.restore();

			context.save();
			context.rotate(-spread);
			drawBranch(level + 1);
			context.restore();
			


			context.restore();
		}
	}

	function drawFractal() {
		context.clearRect(0, 0, canvas.width, canvas.height);

		context.save();
		context.lineWidth = lineWidth;
		context.strokeStyle = color;
		context.translate(canvas.width / 2, canvas.height / 2);

		for (let i = 0; i < sides; i++) {
			context.rotate(((Math.PI / 180) * 360) / sides);
			drawBranch(0);
		}
		context.restore();
		randomizeButton.style.backgroundColor = color;
	}

	drawFractal();

	function randomizeFractal() {
		sides = Math.floor(Math.random() * 7 + 2);
		spread = Math.random() * 2.9 + 0.1;
		scale = Math.random() * 0.2 + 0.4;
		color = "hsl(" + Math.random() * 360 + ", 100%, 50% )";
		lineWidth = Math.floor(Math.random() * 20 + 10);
		
	}
	randomizeButton.addEventListener("click", function(){
		randomizeFractal()
		updateSliders()
		drawFractal();
	});

	function resetFractal(){
		sides = 5;
		spread = 0.7;
		scale = 0.5;
		color = "hsl(290, 100%, 50% )";
		lineWidth = 15;
		
	}

	resetButton.addEventListener('click', function(){
		resetFractal()
		updateSliders()
		drawFractal();
	})


	function updateSliders(){
		slider_spread.value = spread;
		label_spread.innerText = 'Spread: ' + Number(spread).toFixed(2);
		slider_sides.value = sides;
		label_sides.innerText = 'Sides: ' + sides;

	}
	updateSliders()
});
