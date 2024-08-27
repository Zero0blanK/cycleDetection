
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
      }else{
        this.insertNode(data.id,data.data,data.next)
      }                                                                                                                              
    });
  }

  getNode(nextId){
    if(this.head === null) return
    let pointer = this.head
    while(pointer.next !==null){
      if(pointer.id === nextId) return pointer
      pointer = pointer.next
    }
    return null
  }

  insertNode(id,data,next){
    if(this.checkCycle()) return
    if(this.head === null) return
    let pointer = this.head
    while(pointer.next !== null){
      pointer = pointer.next
    }
    pointer.next = new Node(id,data,null)
    if(next !== 'null'){
       pointer = pointer.next
       pointer.next = this.getNode(next)
    }
  }

  checkIfIdExisted(id){
    if(this.head === null || this.head.next ===null) return false
    let pointer = this.head.next
    while(pointer.next !== null  ) {
      if(pointer.next === id) return true
      pointer = pointer.next
    }
    return false
  }
  

}

export{LinkedList}