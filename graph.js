
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
    tortoise = this.head
    let endPoint = null
    while(tortoise.id !== hare.id){
      endPoint = hare
      tortoise = tortoise.next
      hare = hare.next
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