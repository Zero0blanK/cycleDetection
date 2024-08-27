import { LinkedList } from "./graph.js";


let linkedData;
let ll;
const hare = document.getElementById("hare");
const turtle = document.getElementById("turtle");
const cycleAnimation = document.getElementById("cycleAnimation");
const result = document.getElementById("result");
const logsButton = document.getElementById('fullLogs')
let hareAnimation
let turtleAnimation
const box1 = document.getElementById('box1')
const box2 = document.getElementById('box2')
const box3 = document.getElementById('box3')
const box4 = document.getElementById('box4')

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
    clearAnimation()
    clearBoxValue()
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

function hideLogsButton(){
  logsButton.classList.remove('active')
}

function clearBoxValue(){
  box1.textContent = '1'
  box2.textContent = '2'
  box3.textContent = '3'
  box4.textContent = '4'  
  result.textContent = ''
  hideLogsButton()
}

(function renderFullLogsButton(){
  const container = document.getElementById('container')
  const title = document.getElementById('title')
  const fullLogsContainer = document.getElementById('fullLogsContainer')
  logsButton.addEventListener('click',()=>{
    container.classList.add('hidden')
    fullLogsContainer.innerHTML = ''
    title.textContent = 'Cycle Detection (Logs)'
    const nodeNumber  = ll.getLength()
    const isCycle = ll.checkCycle()
    let row;
    let node;
    let pointer = ll.head;
    for(let i = 0;i< nodeNumber;i++){
      
      const quotient = Math.floor(i/5)
      const remainder = i % 5
      if(quotient % 2 !== 1 && (remainder === 5 || remainder === 0)){
        row = document.createElement('div')
        row.classList.add('graphContainer')
        row.classList.add('row')
      }else if(quotient % 2 === 1 && remainder === 0){
        row = document.createElement('div')
        row.classList.add('graphContainer')
        row.classList.add('rowReverse')
      }
      if(i === 0){
        node = document.createElement('div')
        node.classList.add('graph') 
        node.textContent = pointer.data
        const headText = document.createElement('span')
        headText.classList.add('headText')
        headText.textContent = 'Head'
        node.appendChild(headText)
        const headIcon = document.createElement('span')
        headIcon.classList.add('headIcon')
        node.appendChild(headIcon)
      }else if((remainder === 5 || remainder === 0)){
        node = document.createElement('div')
        node.classList.add('graph')
        node.textContent = pointer.data
      }else if(quotient % 2 !== 1 && remainder > 0){
        node = document.createElement('div')
        node.classList.add('graph')
        node.textContent = pointer.data
        const leftArrow = document.createElement('span')
        leftArrow.classList.add('leftArrow')
        node.appendChild(leftArrow)
      }else if(quotient % 2 === 1 && remainder > 0){
        node = document.createElement('div')
        node.classList.add('graph')
        node.textContent = pointer.data
        const rightArrow = document.createElement('span')
        rightArrow.classList.add('rightArrow')
        node.appendChild(rightArrow)
      }

      const quotientOfLenght = Math.floor(nodeNumber/5) 
      if(remainder === 4 && quotient !== quotientOfLenght && nodeNumber > 5){
        const downArrow = document.createElement('span')
        downArrow.classList.add('downArrow')
        node.appendChild(downArrow)
      }
      
      
      node.setAttribute('data-id',pointer.id)
      row.appendChild(node)
      
      if(remainder === 4 || i === nodeNumber - 1){
        fullLogsContainer.appendChild(row)
      }
      
      if(isCycle && i === nodeNumber-1){
        const endNodeId = isCycle.endPoint.id
        node = document.querySelector(`.graph[data-id="${endNodeId}"]`)
        const redDownArrow = document.createElement('span')
        redDownArrow.classList.add('redDownArrow')
        node.appendChild(redDownArrow)
        const starterCycleNode = isCycle.startPoint
        const starterCycleElement = document.querySelector(`.graph[data-id="${starterCycleNode.id}"]`)
        const endPointPos = node.getBoundingClientRect()
        const startPointPos = starterCycleElement.getBoundingClientRect()
        const xOffset = endPointPos - startPointPos
      }


      pointer = pointer.next

    }
  })
})()

function clearAnimation(){
  if(turtleAnimation)turtleAnimation.cancel()
  turtle.style.transform = 'transform(-120px,-30px)'
  if(hareAnimation)hareAnimation.cancel()
  hare.style.transform = 'transform(-120px,-30px)'
}

function activate() {
  const errorText = document.getElementById('errorText')
  result.textContent = ''
  clearBoxValue()
  clearAnimation()
// let say ang kaning timer is execution sa cycle detection if cycle detected e true niya ang condition else kay false 
  linkedData = getTableData()
  ll = new LinkedList()
  ll.createGraph(linkedData)
  let isCycle = ll.checkCycle();
  const threeNodes = ll.getLastThreeNodes()
  if(linkedData === false 
    || linkedData === undefined 
    || linkedData ===null
    || linkedData.length === 0) {
      errorText.classList.add('active')
      return
    }
  errorText.classList.remove('active')
  box1.textContent = ll.head.data
  if(isCycle){
    box2.textContent = isCycle?isCycle.startPoint.data:'2'
    box3.textContent = isCycle?isCycle.middlePoint.data:'3'
    box4.textContent = isCycle?isCycle.endPoint.data :'4'
  }else if(threeNodes){
    box2.textContent = threeNodes.startPoint.data
    box3.textContent = threeNodes.middlePoint.data
    box4.textContent = threeNodes.endPoint.data
  }
  setTimeout(() => {
    
    
    
    cycleAnimation.classList.remove("hidden");
    if (isCycle) {
      hare.animate(fast, hareTiming);
      turtle.animate(slow, turtleTiming);
      
      setTimeout(() => {
        hareAnimation = hare.animate(fast_2, hareTiming_2);
        turtleAnimation = turtle.animate(slow_2, turtleTiming);
      }, 2000);
      
      setTimeout(()=>{
        result.textContent = "CYCLE DETECTED!"
        logsButton.classList.add('active')
      },4500);
      return;
    }else{
      hareAnimation = hare.animate(fast, hareTiming);
      turtleAnimation = turtle.animate(slow_3, turtleTiming_2);
      setTimeout(()=>{
        result.textContent = "NO CYCLE DETECTED!"
        logsButton.classList.add('active')
      },3500);

    }

  }, 500);

}

window.activate = activate

export {clearAnimation,clearBoxValue,hideLogsButton}