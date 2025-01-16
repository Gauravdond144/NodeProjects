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
  let fileData = await fs.readFileSync("./tasks.json",'utf8', (err,data) => {
    if(err){console.log(err);} 
  });
  fileData = JSON.parse(fileData);
  return fileData;
}

async function viewTasks(){
  let tasks = await getTasks();
  for(let i=0;i<tasks.myTasks.length;i++){
    console.log(i+1,"  " ,tasks.myTasks[i]);
  }
}

async function addTask(task){
  let tasks = await getTasks();
  // console.log(tasks);
  tasks.myTasks.push(task);
  fs.writeFileSync("./tasks.json",JSON.stringify(tasks));
}

async function updateTask(taskNo){
  let tasks = await getTasks();
  let input = await TakeInput("Enter Updated Task : ");
  tasks.myTasks.splice(taskNo-1,1,input);
  fs.writeFileSync("./tasks.json",JSON.stringify(tasks));

}

async function deleteTask(taskNo){
  let tasks = await getTasks();
  tasks.myTasks.splice(taskNo-1,1);
  fs.writeFileSync("./tasks.json",JSON.stringify(tasks));
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
        addTask(task);      
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
