let todoState = {
    todos: []
};



let todoServices={
    addToDo:(newToDo)=> {
        newToDo.id=Math.random();
        todoState.todos=[...todoState.todos,newToDo];
    },
    removeTodo:(itemId)=> {
        const filtered=todoState.todos.filter(item=>item.id!== +itemId);

        todoState.todos=[...filtered];
    },
    toggleComplete:(itemId)=> {
        let currenttodo;
        const completeToggled=todoState.todos.map(item=>{
            if(item.id===+itemId) {
                currenttodo=item;
                currenttodo={...item,status:!item.status};
                return currenttodo;
            }
            return item;
        })

        todoState.todos=[...completeToggled];
        return currenttodo;
    },
    findTodo:(itemId)=>{
        const todo=todoState.todos.find(item=>{
            return item.id===+itemId;
        })
        return todo;
    },
    toggleEdit:(itemId)=>{
        const todo=todoServices.findTodo(itemId);
        todo.edit=!todo.edit;
        return todo;
    },
    updateValue:(itemId,value)=>{
        const newTodo=todoState.todos.map(item=>{
            if(item.id===+itemId) {
                item.task=value;

                let currenttodo=item;
            }
            return item;
        })


        todoState.todos=[...newTodo];
    

    },
    getTodoCount:()=> todoState.todos.length
,
    getPageData:(pageNumber,perPage)=>{
        let start=(pageNumber-1)*perPage;
        let end=start+perPage;
        const fragmented=todoState.todos.slice(start,end);
        return fragmented;

    }
}