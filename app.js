const express=require("express");
const app=express();
const bodyParser=require('body-parser');
const date=require(__dirname+"/date.js");
console.log(date.getDate());
const { resourceLimits } = require("worker_threads");

//when we post the data that comes from html we use urlencoded,
// extended is to post nested objects
//body-parser to read the values from webpage
app.use(bodyParser.urlencoded({extended : true}))

app.set('view engine', 'ejs');
app.use(express.static("public"))
var todoList=["HTML","CSS","JAVASCRIPT"];
var workItems=[];
app.get('/', (req, res) => {
    let day=date.getDate();

res.render("list",{listTitle:day,todolist: todoList});
});

app.post('/post', (req, res) => {
    console.log(req.body);
    if(req.body.button==="work"){
        workItems.push(req.body.todo);
        res.redirect("/work");

    }
    else{
    todoList.push(req.body.todo);
    res.redirect("/");
    }
    // res.render('list', {todolist: todoList});
    
});

app.get('/work', (req, res) => {
    res.render("list",{listTitle:"work List",todolist:workItems});
});

app.get('/layout', (req, res) => {
    res.render("testlayout");
});

// if(currentDay===6||currentDay===0){
//     day="weekend";
// }
// else{
//     day="weekday";
// }
//   res.render('list', {kindOfDay: day});
// });

app.listen(3000,function(){
    console.log("server is starting at port 3000")
});