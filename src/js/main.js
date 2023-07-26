(function () {
  const doc = document.documentElement
  doc.classList.remove('no-js')
  doc.classList.add('js')
	
	
  // Start Button
  var  startbutton = document.getElementsByClassName("landing-cta")[0];
	startbutton.addEventListener("click", onStartButtonClick), false;
	
	function onStartButtonClick(e){

		e.stopPropagation();	
		e.preventDefault();

		var drawingContainer = document.getElementsByClassName("features-inner")[0];
		drawingContainer.scrollIntoView({ behavior: "smooth", inline: "nearest" });
	}
	
	
  // Reveal animations
  if (document.body.classList.contains('has-animations')) {
    /* global ScrollReveal */
    const sr = window.sr = ScrollReveal()

    sr.reveal('.landing-title, .landing-paragraph, .landing-cta', {
      duration: 1000,
      distance: '40px',
      easing: 'cubic-bezier(0.5, -0.01, 0, 1.005)',
      origin: 'left',
      interval: 150
    });

    sr.reveal('.landing-illustration', {
      duration: 1000,
      distance: '40px',
      easing: 'cubic-bezier(0.5, -0.01, 0, 1.005)',
      origin: 'right',
      interval: 150
    });

    sr.reveal('.feature', {
      duration: 1000,
      distance: '40px',
      easing: 'cubic-bezier(0.5, -0.01, 0, 1.005)',
      interval: 100,
      origin: 'bottom',
      scale: 0.9,
      viewFactor: 0.5
    });
	
	sr.reveal('.drawing, .drawing-table-header', {
      duration: 500,
      distance: '20px',
      easing: 'cubic-bezier(0.5, -0.01, 0, 1.005)',
      interval: 100,
      origin: 'bottom',
      scale: 0.9,
      viewFactor: 0.5
    });
  }
}())
