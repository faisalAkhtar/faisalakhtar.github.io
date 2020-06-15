const switchh = document.querySelector('.switch-ip');
const initialState = localStorage.getItem('switchState') == 'true';
switchh.checked = initialState;

function openMenu(arg) {
	arg.classList.toggle('openMenu')
	document.querySelector("header ul").classList.toggle('openMenu')
}

let x = 15, wave=0
function wavingHand() {
	wave++
	if(wave==1 || wave==2) {
		document.getElementById('waving-hand').style.transform = "rotate("+(x=-x)+"deg) translate(2.5px,-2.5px)"
	} else if(wave==3 || wave==4) {
		x /= 2
		document.getElementById('waving-hand').style.transform = "rotate("+(x=-x)+"deg) translate(2.5px,-2.5px)"
	} else if(wave==8) {
		x = 15
		wave=0
	}
}

var i=0, txt='Faisal Akhtar'
function typeWriter() {
	if (i < txt.length) {
		document.querySelector(".loading div span").innerHTML += txt.charAt(i)
		i++
		setTimeout(typeWriter, 200)
	} else if(i == txt.length) {
		document.querySelector(".loading div").style.transform = "none"
		document.querySelector(".loading div").style.top = document.querySelector("a.logo").offsetTop+"px"
		document.querySelector(".loading div").style.left = "5%"
		document.querySelector(".loading div").style.fontSize = "1.5em"
		setTimeout(function() { document.getElementsByClassName('loading')[0].style.opacity = "0" }, 500)
		setTimeout(function() {
			document.getElementsByClassName('loading')[0].remove()
			setInterval(wavingHand, 200)
		}, 1000)
	}
}

var projectIndex = 1;
function nextProject(n) { showProjects(projectIndex += n); }
function currentProject(n) { showProjects(projectIndex = n); }
function showProjects(n) {
	var i;
	var projects = document.getElementsByClassName("aProject");
	var dots = document.getElementsByClassName("dot");
	if (n > projects.length) {projectIndex = 1}		
	if (n < 1) {projectIndex = projects.length}
	for(i=0;i<projects.length;i++) {
			projects[i].style.display = "none";	
	}
	for(i=0;i<dots.length;i++) {
			dots[i].className = dots[i].className.replace(" active","");
	}
	projects[projectIndex-1].style.display = "block";	
	dots[projectIndex-1].className += " active";
}

window.onload = function() {
	document.querySelector(".project-wrapper").addEventListener("mouseover",function() {
		if(document.querySelector("body").clientWidth>1050) {
			document.querySelector(".prev").style.left = "0"
			document.querySelector(".next").style.right = "0"
		}
	})

	document.querySelector(".project-wrapper").addEventListener("mouseout",function() {
		if(document.querySelector("body").clientWidth>1050) {
			document.querySelector(".prev").style.left = "-50%"
			document.querySelector(".next").style.right = "-50%"
		}
	})

	switchh.addEventListener('change', function() {
		localStorage.setItem('switchState', switchh.checked);
		if(switchh.checked)	document.querySelector('body').classList.add('dark')
					else	document.querySelector('body').classList.remove('dark')
	})

	if(switchh.checked)	document.querySelector('body').classList.add('dark')
				else	document.querySelector('body').classList.remove('dark')

	let dots = ""
	for (var i=1;i<=document.getElementsByClassName("aProject").length;i++) {
		dots += "<span class='dot' onclick='currentProject("+i+")'></span> "
	}
	document.querySelector("#dots").innerHTML = dots
	projectIndex = 1;
	showProjects(projectIndex);

	typeWriter()
}

AOS.init({duration:600});