
class Node{
  constructor(id,data,next){
    this.id = id;
    this.data = data
    this.next = next
  }
}

class LinkedList{
  constructor(){
    this.head = null
    this.tail = null
    this.nodeMap = {  }
  }

  getLength(){
    const cycle = this.checkCycle()
    let counter = 0;
    if(cycle){
      let pointer = this.head
      counter++
      while(pointer.id !== cycle.endPoint.id){
        pointer = pointer.next
        counter++;
      }
      return counter

    }else{
      let pointer = this.head
      counter++
      while(pointer.next !== null){
        pointer = pointer.next
        counter++
      }
      return counter
    } 
  }

  getLastThreeNodes(){
    if(this.head?.next?.next?.next === null||
      this.head?.next?.next?.next === undefined
      |this.checkCycle() !== false
    ) return false
    let startPoint = this.head.next
    let middlePoint = this.head.next.next
    let  endPoint = this.head.next.next.next
    while(endPoint.next !== null){
      startPoint = startPoint.next
      middlePoint = middlePoint.next
      endPoint = endPoint.next
    }
    return{startPoint:startPoint,middlePoint:middlePoint,endPoint:endPoint}
  }
  checkCycle(){
    if(this.head === null) return false
    let tortoise = this.head
    let hare = this.head
    while(hare !== null && hare.next !==null){
      tortoise = tortoise.next
      hare = hare.next.next
      // If they meet, there is a cycle
      if (tortoise === hare) {
        break;
      }
    }
    if (hare === null || hare.next === null) {
      return false;
    }
    tortoise = this.head;
    while (tortoise !== hare) {
      tortoise = tortoise.next;
      hare = hare.next;
    }
    // Now, `tortoise` (or `hare`) is at the start of the cycle.
  
    // Step 3: Find the node that points back to the cycle start (the endPoint).
    let endPoint = hare; // Start at the cycle start.
    while (endPoint.next !== tortoise) {
      endPoint = endPoint.next;
    }
      
    return{startPoint:tortoise,middlePoint:tortoise.next,endPoint:endPoint}
  }

  createGraph(array){
    if(array === undefined||array.length === 0) return

    array.forEach((data,index) => {
      if(index === 0){
        this.head = new Node(data.id,data.data,null)
        this.tail = this.head;
        this.nodeMap[data.id] = this.head
      }else{  
        this.insertNode(data.id,data.data,data.next)
        
      }                                                                                                                              
      })

    
  }

  getNode(nextId){
    if(this.head === null) return
    let node = this.nodeMap[nextId]
    if(node){
      return node
    }
    return null
  }

  insertNode(id,data,next){
    if(this.tail.next !== null) return

    if(this.head === null) return
    let temp = new Node(id,data,null)
    this.tail.next = temp;
    this.tail = temp
    this.nodeMap[id] = temp
    
    if(next !== 'null'){
       this.tail.next = this.getNode(next)
    }
  }

  checkIfIdExisted(id){
    if(this.head === null || this.head.next ===null) return false
    let pointer = this.nodeMap[id]
    if(pointer && pointer !== undefined) return true
    return false
  }
  

}

export{LinkedList}