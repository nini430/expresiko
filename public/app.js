const todoInput=document.querySelector(".todo-input");
const addBtn=document.querySelector(".add");
const todoList=document.querySelector('.list');


const functions={
    addToDo:(event)=>{
        event.preventDefault();
        if(!todoInput.value||todoInput.value.trim().length===0) {
            alert("no input!")
        }else{
            let todo=todoInput.value;
        let newTodo={
            task:todo,
            status:false,
            edit:false
        }

        todoInput.value="";

        todoServices.addToDo(newTodo);
        functions.appendElement(newTodo);
        pagination.showPag();
        pagination.render();
        pagination.gotToLastPage();
    
        }
        
        
        
       

    },
    appendElement:(newTodo)=> {
        const item=functions.getItemView(newTodo);
        todoList.appendChild(item);
    },

    removeTodo:(elem,itemId)=>{
        todoServices.removeTodo(itemId);
            functions.removeElement(elem.parentNode);
            let fragmented=todoServices.getPageData(pagination.currentPage,pagination.recordPerPage);
            if(fragmented.length===0&&pagination.currentPage>1) {
                    pagination.prev();
                    fragmented=todoServices.getPageData(pagination.currentPage,pagination.recordPerPage);
                  
            }
            functions.render(fragmented);
            pagination.showPag();  
            pagination.render(); 
              

    },

    removeElement:(elemParent)=>{
        todoList.removeChild(elemParent);
    },

    toggleComplete:(elem,itemId)=>{
        const todo=todoServices.toggleComplete(itemId);
        functions.updateElement(elem.parentNode,todo);
    },

    updateElement:(elemParent,todo)=>{
            const item=functions.getItemView(todo);
            todoList.replaceChild(item,elemParent);
            elemParent.remove();
    },
    
    getItemView:(newtodo)=>{
        let todoLi=document.createElement("li");
        const wrapperElement=document.createElement("span");
        wrapperElement.classList.add("non-overflow")
        if(newtodo.task.length>40) {
            const fragmentedWord=newtodo.task.substring(0,80)+"...";
            wrapperElement.innerText=fragmentedWord;
        }else{
            wrapperElement.innerText=newtodo.task;
        }

        todoLi.appendChild(wrapperElement);


       
        
        let editBtn=document.createElement("button");
        editBtn.innerHTML=`<i class="fa-solid fa-pen-to-square"></i>`;
        editBtn.addEventListener("click",()=>functions.toggleEdit(todoLi,newtodo.id));
        editBtn.classList.add("edit-btn");
        let removeBtn=document.createElement("button");
        removeBtn.innerHTML='<i class="fa-solid fa-trash"></i>';
        removeBtn.classList.add("remove-btn");
        removeBtn.addEventListener("click",()=>functions.removeTodo(removeBtn,newtodo.id));
        const checkbox=document.createElement("input");
        checkbox.setAttribute("type","checkbox");
        checkbox.classList.add("checkbox");
        checkbox.addEventListener("click",()=>functions.toggleComplete(checkbox,newtodo.id))
        todoLi.prepend(checkbox);
        todoLi.appendChild(editBtn);
        todoLi.appendChild(removeBtn);
        todoLi.setAttribute("id",newtodo.id);
        todoLi.classList.add("primary");

        if(newtodo.status) {
            wrapperElement.classList.add("line-through");
            checkbox.checked=true;
        }
       
        if(newtodo.edit) {
            todoLi.classList.add("alt");
           todoLi.innerHTML=`
            <input onkeyup="functions.updateData(event,${newtodo.id})" type="text"
            value='${newtodo.task}'></input>
            <button onclick="functions.save(event,${newtodo.id})"  >Save</button>
            <button onclick="functions.cancel(event,${newtodo.id})">Cancel</button>
           `


        }
        return todoLi;
    },

    onToggleEvent:(event)=>{
        
        if(event.target.tagName.toLowerCase()==="span") {
            const itemId=event.target.parentElement.id;
        const numId=+itemId;
        functions.toggleEdit(event.target.parentElement,numId);
        };
        


        
    },
    toggleEdit:(target,itemId)=>{
        const todo=todoServices.toggleEdit(itemId);
        functions.updateElement(target,todo);
    },
    updateData:(event,itemId)=>{
        if(event.which===27) {
            functions.toggleEdit(event.target.parentNode,itemId);
        }
        else if(event.which===13) {
            todoServices.updateValue(itemId,event.target.value);
            functions.toggleEdit(event.target.parentNode,itemId);
            
        }
    },
    save:(event,itemId)=>{
        const elemParent=event.target.parentNode;
        if(elemParent.firstElementChild.value.trim().length===0||!elemParent.firstElementChild.value) {
                        alert("empty input!")
        }else{
            const value=elemParent.firstElementChild.value;
            todoServices.updateValue(itemId,value);
            functions.toggleEdit(elemParent,itemId)
        }
       
    },
    cancel:(event,itemId)=>{
        const elemParent=event.target.parentNode;
        functions.toggleEdit(elemParent,itemId);
    },
    render:(todosList)=>{
        todoList.innerHTML="";
        if(todosList.length===0) {
            todoList.innerText="No new todo yet, be cool and add new one"
        }else{
            todosList.forEach(item=>{
                const todo=functions.getItemView(item);
                todoList.appendChild(todo);
            })
        }
    },

}


// event listeners

addBtn.addEventListener("click",functions.addToDo);
todoList.addEventListener("dblclick",functions.onToggleEvent);

functions.render(todoServices.getPageData(1,pagination.recordPerPage));


