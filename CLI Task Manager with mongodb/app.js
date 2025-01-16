const mongoose = require('mongoose');
const { rejects } = require('assert');
const { isUtf8 } = require('buffer');
const fs = require('fs');
const { resolve } = require('path');
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

let inp;

mongoose.connect("mongodb://localhost:27017/tasks",{ useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{console.log("connection Establashied with mongoDB")}).catch(()=>{console.log("cant connect with mongoDB")});

const taskSchema = new mongoose.Schema({
  task : {
    type : String,
    required : true
  }
});

const mtask = new mongoose.model('task',taskSchema);

function printOptions(){
    console.log(`
        1. View Tasks 
        2. Add Task 
        3. Update Task
        4. Delete task
        5. Exit `);
}

function TakeInput(prompt){
return new Promise((resolve , reject) => {
    rl.question(prompt, (data) => {  
    resolve(data);
    return data;
  });
});
}

async function getTasks(){
  return mtask.find();
}

async function viewTasks(){
  let tasks = await getTasks();
  tasks.forEach((etask,index) => {
    console.log(`${index +1}  ${etask.task}`)    
  });
}

async function addTask(taskText){
   const htask = new mtask({task : taskText});
  await  htask.save();
  console.log("Task added successfully");
}

async function updateTask(taskNo){
  let tasks = await getTasks();
  let newTask = await TakeInput("Enter Updated Task : ");
  tasks[taskNo -1].task = newTask;
  tasks[taskNo-1].save();
  console.log("Task updated successfully");
}

async function deleteTask(taskNo){
  let tasks = await getTasks();
  try{
    await mtask.findByIdAndDelete(tasks[taskNo-1].id);
    console.log("Task deleted successfully");
  }catch(err){
    console.log('eror in deleting task :', err);
  }
  
}

(async() =>{
  let fileData;
  let task;
  let index =0;

  while(inp != "5"){
    printOptions();
    inp = await TakeInput("Enter input :");
    switch(Number(inp)){
      case 1:
       await viewTasks();
        break;
      case 2:
        task = await TakeInput("Enter Task :");
        await addTask(task);      
        break;
      case 3:
        await viewTasks();
        inp = await TakeInput("Enter Task No :")
         await updateTask(inp);
        break;
      case 4:
        await viewTasks();
        inp = await TakeInput("Enter Task No :")
         await deleteTask(inp);
         break;
      case 5:
        console.log("Exit");
        break;
      default :
      console.log("Invalid option");
      break;
    }
}
rl.close();
})();
