const ToDo=require("../models/Todo")



const getAllToDos=async(req,res)=>{
        try {
        const todos=await ToDo.find({});
        res.status(200).json({todos})
        }catch(err) {
                res.status(500).json({msg:err})
        }
        

}


const getPaginatedToDos=async(req,res)=>{
        const page=req.query.page;
        console.log(page)
        const todoPerPage=5;
        try {
                const todos=await ToDo.find({}).skip((page-1)*todoPerPage).limit(todoPerPage);
                res.status(200).json({todos})
        }catch(err) {
                res.status(500).json({msg:err})
        }
       
}

const getToDo=async(req,res)=>{
    try {
        const {id:todoId}=req.params;
        const todo=await ToDo.findOne({_id:todoId});
        if(!todo) {
            return res.status(404).json({msg:`The todo item with id of ${todoId} could not be found`})
        }
        res.status(200).json({todo})
    }catch(err) {
        res.status(500).json({msg:err})
        console.log(err);
    }
    
}

const createToDo=async(req,res)=>{
        try {
            const todo=await ToDo.create(req.body);
            res.status(201).json({todo})
        }catch(err) {
            res.status(500).json({msg:err})
        }
}

const updateToDo=async(req,res)=>{
    try {
        const {id:todoId}=req.params;
        const todo=await ToDo.findByIdAndUpdate({_id:todoId},req.body,{
            new:true,
            runValidators:true
        });
        if(!todo) {
            return res.status(404).json({msg:`The todo item with id of ${todoId} could not be found`})
        }
        res.status(200).json({todo})

    }catch(err) {
        res.status(500).json({msg:err})
    }
}

const deleteToDo=async(req,res)=>{
    try {
        const {id:todoId}=req.params;
        const todo=await ToDo.findOneAndDelete({_id:todoId});
        if(!todo) {
            return res.status(404).json({msg:`The todo item with id of ${todoId} could not be found`})
        }
        res.status(200).json({todo})
    }catch(err) {
        res.status(500).json({msg:err})
    }
}

module.exports={getAllToDos,getPaginatedToDos,getToDo,createToDo,updateToDo,deleteToDo};