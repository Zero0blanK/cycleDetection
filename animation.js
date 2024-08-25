
const hare = document.getElementById("hare");
const turtle = document.getElementById("turtle");
const cycleAnimation = document.getElementById("cycleAnimation");
const result = document.getElementById("result");


// CYCLE ANIMATION
// first animation for hare
const fast = [
  { transform: "translate(0, -30px)" },
  { transform: "translate(50px, -90px)" },
  { transform: "translate(100px, -30px)" },
  { transform: "translate(140px, -90px)" },
  { transform: "translate(200px, -35px)" },
];

// second animation for hare
const fast_2 = [
    { transform: "translate(200px, -35px)" }, // Start of the curve jump
  { transform: "translate(240px, -25px)" }, // Mid-air
  { transform: "translate(270px, -15px)" }, // Smooth descent
  { transform: "translate(300px, 0)" }, // Touchdown
  { transform: "translate(330px, 15px)" }, // Slight upward motion
  { transform: "translate(350px, 60px)" }, // Peak
  { transform: "translate(340px, 80px)" }, // Begin descent
  { transform: "translate(320px, 100px)" }, // Midway downward
  { transform: "translate(290px, 130px)" }, // More descent
  { transform: "translate(270px, 160px)" }, // Near bottom
  { transform: "translate(250px, 175px)" }, // Bottom curve begins
  { transform: "translate(220px, 185px)" }, // Bottom curve midpoint
  { transform: "translate(200px, 190px)" }, // Low point
  { transform: "translate(170px, 185px)" }, // Begin upward curve
  { transform: "translate(130px, 175px)" }, // Smoother ascent
  { transform: "translate(90px, 150px)" }, // Near final descent
  { transform: "translate(50px, 120px)" }, // Smoother approach
  { transform: "translate(20px, 75px)" }, // Curving to finish
  { transform: "translate(0px, -30px)" }, // Final position

  { transform: "translate(0, -30px)" }, // second jump initial position
  { transform: "translate(50px, -90px)" },
  { transform: "translate(100px, -30px)" },
];

const hareTiming = {
  duration: 1500,
  iterations: 1,
  easing: "ease-in",
  fill: "forwards",
};

const hareTiming_2 = {
  duration: 1500,
  iterations: 1,
  // reference: https://cubic-bezier.com/#0,.97,.45,1.02
  easing: "cubic-bezier(0.6, 0.97, 0.45, 0.9)",
  fill: "forwards",
};

// first animation for turtle
const slow = [
  { transform: "translate(-0px, -20px)" }, // Start at the initial position
  { transform: "translate(50px, -55px)" }, // Move up and to the right
  { transform: "translate(100px, -20px)"} // Move down and to the right
];

// second animation for turtle
const slow_2 = [
  { transform: "translate(100px, -20px)" }, // Start at the initial position
  { transform: "translate(140px, -55px)" }, // Move up and to the right
  { transform: "translate(200px, -20px)" } // Move down and to the right
];

// third animation for turtle
const slow_3 = [
  { transform: "translate(-0px, -20px)" }, // Start at the initial position
  { transform: "translate(50px, -55px)" }, // Move up and to the right
  { transform: "translate(100px, -20px)"},
  { transform: "translate(100px, -20px)" }, // Start at the initial position
  { transform: "translate(140px, -55px)" }, // Move up and to the right
  { transform: "translate(200px, -20px)" },
  { transform: "translate(200px, -20px)" }, // Start at the initial position
];

const turtleTiming = {
  duration: 2000,
  iterations: 1,
  easing: "ease",
  fill: "forwards",
};

const turtleTiming_2 = {
  duration: 3000,
  iterations: 1,
  easing: "ease-in",
  fill: "forwards",
};






function activate() {

// let say ang kaning timer is execution sa cycle detection if cycle detected e true niya ang condition else kay false 
  let isCycle = false;

  setTimeout(() => {

    isCycle = true;

    cycleAnimation.classList.remove("hidden");
    
    if (isCycle) {
      result.textContent = "CYCLE DETECTED!";
      hare.animate(fast, hareTiming);
      turtle.animate(slow, turtleTiming);

      setTimeout(() => {
        hare.animate(fast_2, hareTiming_2);
        turtle.animate(slow_2, turtleTiming);
      }, 2000);

      // Hide animation after 15 secs
      setTimeout(() => cycleAnimation.classList.add("hidden"), 15000);
      return;
    }else{
      hare.animate(fast, hareTiming);
      turtle.animate(slow_3, turtleTiming_2);
      setTimeout(()=>result.textContent = "NO CYCLE DETECTED!",3000);

    }

  }, 100);

}

