const fs=require("fs");
const express=require('express');
const { json } = require("stream/consumers");
const app=express();
app.use(express.json());

fs.readFile('todo.json',"utf-8",function(err,data){
    let file=JSON.parse(data);

})

app.get('/',function(req,res){
    fs.readFile('todo.json','utf-8',function(err,data){
        const file=JSON.parse(data);
        res.status(200).json(file);
    })
})

app.post('/',function(req,res){
    const newTask=req.body.newTodo;
    fs.readFile('todo.json','utf-8',function(err,data){
        let file=JSON.parse(data);
        const newTodo={
            task : newTask
        }
        file.push(newTodo);
        fs.writeFile('todo.json', JSON.stringify(file),function(err){
            if(err){
                return res.status(404).send("some thing went wrong")
            }
            else{
                res.json(file);
            }
        })
    })

})

app.delete('/',function(req,res){
    const deleteTodo=req.body.newTodo;
    fs.readFile('todo.json','utf-8',function(err,data){
        let file=JSON.parse(data);
        const totalTodos=file.length;
        for(let i=0;i<totalTodos;i++){
            if(file[i].task===deleteTodo){
                file.splice(i,1);
                break;
            }
        }
        fs.writeFile('todo.json', JSON.stringify(file), function(err){
            if(err) {
                console.log("error found");
            }
            else{
                return res.json(file);
            }
        })
        
    })
})

app.put("/",function(req,res){
    const oldTask=req.body.oldTask;
    const newTask=req.body.newTask;

    fs.readFile('todo.json','utf-8',function(err,data){
        let file=JSON.parse(data);
        const totalTodos=file.length;
        for(let i=0;i<totalTodos;i++){
            if(file[i].task===oldTask){
                const oldTemp={
                    task : oldTask
                }
                const newTemp={
                    task : newTask
                }
                file.splice(i,1,newTemp);
                break;
            }
        }
        fs.writeFile('todo.json',JSON.stringify(file),function(err){
            if(err){
                console.log("Error found");
            }
            else{
                return res.json(file);
            }
        })
    })
})


app.listen(3000);