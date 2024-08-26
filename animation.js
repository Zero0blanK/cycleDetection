import { LinkedList } from "./graph.js";


let linkedData;

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


(function renderSelectFileButton(){
  const selectFileButton = document.getElementById('selectFile')
  if(selectFileButton){
    selectFileButton.addEventListener('click',async ()=>{
      linkedData = await getFile()
    })
  }
})();

async function getFile(){
    const [fileHandle] = await window.showOpenFilePicker({
      types: [
        {
          description: 'Text Files',
          accept: {
            'text/plain': ['.txt']
          }
        }
      ],
      multiple: false // Only allow single file selection
    });{
  
}

    // Get the file object from the file handle
    const file = await fileHandle.getFile();
    const textField = document.getElementById('textField')
    textField.classList.add('active')
    textField.value = fileHandle.name
    
    // Read the file content
    const fileContent = await file.text();
    const formattedArray = fileContent.split('|')
    const linkedListObjects = []
    for(let i = 0;i<formattedArray.length;i++){
      const linkedListValue = formattedArray[i].split(',')
      if(linkedListValue.length  === 3){
        linkedListObjects.push({id:linkedListValue[0],data:linkedListValue[1],next:linkedListValue[2]})

      }
    }
    return linkedListObjects
}


function getTableData(){
  const table = document.getElementById('dataTable')?.getElementsByTagName('tbody')[0];
  if(table){
    const tableData = Array.from((table.getElementsByTagName('tr'))).map((row)=>{
      return {id:(row.children[0]).innerHTML,data:(row.children[1]).innerHTML,next:(row.children[2]).innerHTML}
    })
    return tableData
  }
  return linkedData
}
function activate() {
  const errorText = document.getElementById('errorText')
  result.textContent = ''
// let say ang kaning timer is execution sa cycle detection if cycle detected e true niya ang condition else kay false 
  linkedData = getTableData()
  const ll = new LinkedList()
  ll.createGraph(linkedData)
  let isCycle = ll.checkCycle();
  
  if(linkedData === false 
    || linkedData === undefined 
    || linkedData ===null
    || linkedData.length === 0) {
      errorText.classList.add('active')
      return
    }
  errorText.classList.remove('active')
  setTimeout(() => {



    cycleAnimation.classList.remove("hidden");
    
    if (isCycle) {
      hare.animate(fast, hareTiming);
      turtle.animate(slow, turtleTiming);
      
      setTimeout(() => {
        hare.animate(fast_2, hareTiming_2);
        turtle.animate(slow_2, turtleTiming);
      }, 2000);
      
      setTimeout(()=>result.textContent = "CYCLE DETECTED!",4500);
      // Hide animation after 15 secs
      setTimeout(() => cycleAnimation.classList.add("hidden"), 15000);
      return;
    }else{
      hare.animate(fast, hareTiming);
      turtle.animate(slow_3, turtleTiming_2);
      setTimeout(()=>result.textContent = "NO CYCLE DETECTED!",3500);

    }

  }, 100);

}

window.activate = activate