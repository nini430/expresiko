const todoInput=document.querySelector(".todo-input");
const todoList=document.querySelector('.list');
const loadingFlag=document.querySelector(".loading-flag");
const todoForm=document.querySelector(".todo-container");




const getToDoCount=async()=>{
    const {data:{todos}}=await axios.get('/api/v1/todos');
    return todos.length;
}

const showTodos=async(id)=>{
    try {
        todoList.innerText="";
        const {data:{todos}}=await axios.get(`/api/v1/todos/paginated?page=${id}`);
        console.log(todos);
        todos.map(todo=>{
            const item=getItemView(todo);
            todoList.appendChild(item);
            
          
        })
        pagination.paginationRender();
       
       
       
    }catch(err) {
        todoList.innerText="something went wrong"
    }
}



const deleteTodo=async(elem,id)=>{
        try {
            await axios.delete(`/api/v1/todos/${id}`)
            todoList.removeChild(elem.parentElement);
            pagination.paginationRender();
        }catch(err) {
            console.log(err);
        }
}

todoForm.addEventListener("submit",async(e)=>{
    e.preventDefault();
    const name=todoInput.value;
    try {
        
        const {data:{todo}}=await axios.post('/api/v1/todos',{name})
        goToLastPage();
        pagination.paginationRender();
     
        
        
        

    }catch(err) {
            console.log(err);
    }
})

const getToDo=async(id)=>{
    const {data:{todo}}=await axios.get(`/api/v1/todos/${id}`);
    return todo;
    
}

const updateToDo=async(elem,id)=>{
    const {data:{todo}}=await axios.patch(`/api/v1/todos/${id}`,{edit:true});
    const item=getItemView(todo);
    todoList.replaceChild(item,elem.parentElement)
}

const save=async(elem,id)=>{
    const input=elem.parentElement.firstElementChild;
    const {data:{todo}}=await axios.patch(`/api/v1/todos/${id}`,{name:input.value,edit:false});
    const item=getItemView(todo);
    console.log(item,elem.parentElement)
    todoList.replaceChild(item,elem.parentElement);
}

const cancel=async(elem,id)=>{
    const {data:{todo}}=await axios.patch(`/api/v1/todos/${id}`,{edit:false});
    const item=getItemView(todo);
    todoList.replaceChild(item,elem.parentElement);

}

const toggleComplete=async(elem,id)=>{
    const checked=elem.checked;
    console.log(checked);
    const {data:{todo}}=await axios.patch(`/api/v1/todos/${id}`,{completed:checked});
    const item=getItemView(todo);
    todoList.replaceChild(item,elem.parentElement)

}

const getItemView=(todo)=>{
    
    let todoLi=document.createElement("li");
    const wrapperElement=document.createElement("span");
    wrapperElement.classList.add("non-overflow")
     wrapperElement.innerText=todo.name;
    todoLi.appendChild(wrapperElement);
    let editBtn=document.createElement("button");
    editBtn.innerHTML=`<i class="fa-solid fa-pen-to-square"></i>`;
    editBtn.classList.add("edit-btn");
    editBtn.addEventListener("click",()=>updateToDo(editBtn,todo._id));
    let removeBtn=document.createElement("button");
    removeBtn.innerHTML='<i class="fa-solid fa-trash"></i>';
    removeBtn.classList.add("remove-btn");
    removeBtn.addEventListener("click",()=>deleteTodo(removeBtn,todo._id))
    const checkbox=document.createElement("input");
    checkbox.setAttribute("type","checkbox");
    checkbox.classList.add("checkbox");
    checkbox.addEventListener("change",()=>toggleComplete(checkbox,todo._id));
    todoLi.prepend(checkbox);
    todoLi.appendChild(editBtn);
    todoLi.appendChild(removeBtn);
    todoLi.classList.add("primary");

    
   if(todo.completed) {
        wrapperElement.classList.add('line-through');
        checkbox.checked=true;
   }
    if(todo.edit) {
        todoLi.innerText="";
        todoLi.classList.add("alt");
        const editInput=document.createElement("input");
        editInput.setAttribute("type","text")
        editInput.value=todo.name;
        const saveBtn=document.createElement("button");
        saveBtn.addEventListener("click",()=>save(saveBtn,todo._id))
        saveBtn.innerText="Save";
        const cancelbtn=document.createElement("button");
        cancelbtn.innerText="Cancel";
        cancelbtn.addEventListener("click",()=>cancel(cancelbtn,todo._id))
        todoLi.appendChild(editInput);
        todoLi.appendChild(saveBtn);
        todoLi.appendChild(cancelbtn)


    }
    
    return todoLi;
}

showTodos(1);



