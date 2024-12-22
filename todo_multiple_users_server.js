const fs = require("fs").promises
const express =require("express")
const app=express();
app.use(express.json())

// let file;
// fs.readFile("todoDataBase.json","utf-8",function(err,data){
//     console.log(data)
//     file=JSON.parse(data);
//     file.ram=[
//         {
//             task: "dinner"
//         },
//         {
//             task : "family time"
//         }
//     ]
//     console.log(file);
// })

// async function readingFile(){
//     // console.log("started")
//     let file= await fs.readFile("todoDataBase.json");
//     let data =JSON.parse(file);
//     console.log(data);
// }
// readingFile();
// console.log('completed')

app.get("/",async function(req,res){
    const file = JSON.parse(await fs.readFile('todoDataBase.json'));
    res.status(200).json(file);
})

app.get('/:user',async function(req,res){
    const user = req.params.user;
    const file =JSON.parse(await fs.readFile("todoDataBase.json"));
    if(file[user]){
        res.status(200).json(file[user]);
    }
    else{
        res.status(404).send("user not found")
    }
})

app.post('/:user',async function(req,res){
    const user = req.params.user;
    const userBody =req.body.user;
    let file = JSON.parse(await fs.readFile('todoDataBase.json','utf-8'));
    file[user]=userBody;
    await fs.writeFile("todoDataBase.json",JSON.stringify(file))
    res.json(file);
})

app.post('/:user/:task',async function(req,res){
    const user = req.params.user;
    const task =req.params.task;
    const newTask={
        task: task
    }
    let file =JSON.parse(await fs.readFile('todoDataBase.json'));
    file[user].push(newTask);
    await fs.writeFile('todoDataBase.json',JSON.stringify(file));
    res.json(file[user]);
})

app.delete('/:user',async function(req,res){
    const user = req.params.user;
    let file = JSON.parse(await fs.readFile('todoDataBase.json'));
    delete file[user];
    await fs.writeFile("todoDataBase.json",JSON.stringify(file));
    res.json(file);
})

app.delete('/:user/:task',async function(req,res){
    const user = req.params.user;
    const task =req.params.task;
    let file = JSON.parse(await fs.readFile('todoDataBase.json'));
    const totalTodos=file[user].length;
    for(let i=0;i<totalTodos;i++){
        if(file[user][i].task===task){
            file[user].splice(i,1);
            break;
        }
    }
    await fs.writeFile('todoDataBase.json',JSON.stringify(file));
    res.json(file[user]);
})

app.listen(3000);