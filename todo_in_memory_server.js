const express=require("express")
const app=express();
app.use(express.json())

let todoList=[];
let globalId=1;

app.get('/',function(req,res){
    res.json({
        todoList
    })

})

app.post('/',function(req,res){
    const newTodo=req.body.newTodo;
    let todo={
        task : newTodo,
        id : globalId
    }
    todoList.push(todo);
    globalId++;

    res.status(200).json(todoList)
})

app.put('/',function(req,res){
    const oldTask=req.body.oldTask;
    const newTask=req.body.newTask;
    const totalTodos=todoList.length;
    for(let i=0;i<totalTodos;i++){
        if(todoList[i].task===oldTask){
            let oldTemp={
                task : todoList[i].task,
                id : todoList[i].id
            }
            let newTemp = {
                task: newTask,
                id: todoList[i].id
            }
            todoList.splice(i,oldTemp,newTemp);
            break;
        }
    }
    res.json(todoList)
})

app.delete('/',function(req,res){
    const deleteTask=req.body.deleteTask;
    const totalTodos=todoList.length;
    for(let i=0;i<totalTodos;i++){
        if(todoList[i].task===deleteTask){
            todoList.splice(i,1);
            break;
        }
    }
    res.status(200).send("Delete Done")
})



app.listen(3000)