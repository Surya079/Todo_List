import express from 'express';
import bodyParser from 'body-parser';
import pg from 'pg';

const app = express();
const port = 3000;

const db = new pg.Client({
    user : "postgres",
    host : "localhost",
    database : "TodoList",
    password : "Suryavme@005",
    port :5432
})

db.connect();

app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));

// function getCurrentTime(){
//     var date = new Date(); 
//     var hh = date.getHours(); 
//     var mm = date.getMinutes(); 
//     let curr_time = '';
//     hh = hh < 10 ? '0'+hh : hh; 
//     mm = mm < 10 ? '0'+mm : mm;

//     curr_time = hh+':'+mm;
//     return curr_time;
// }



let data = [
    {id : 1, title : 'react Js', curtime : "09:45"},
    {id : 2, title : 'Node js', curtime : "09:45"},
]

const date = new Date().toDateString();console.log(date);

app.get('/', async  (req, res)=>{
   try {
    const result = await db.query("select * from datas_items order by id asc" ) ;
    data = result.rows;
    res.render("index.ejs", {
        items : data
    })   
    } catch (error) {
    console.log(error);
   }
})

app.post('/add', async (req, res)=>{
    const Title = req.body['title'];
    console.log(Title);
    await db.query("insert into datas_items (title, curdate) values ($1, $2)", [Title, date]);
    res.redirect('/')
})

app.post('/edit', async (req, res)=>{
    const id = req.body["UpdatedId"];
    const title = req.body["Updatedtitle"];
    try {
        await db.query("update datas_items set title = ($1), curdate = ($2) where id = ($3)",[title,date, id]);
        res.redirect('/')
    } catch (error) {
        console.log(error);
    }
})

app.post('/delete', async (req, res)=>{
    const Del_Id = req.body["deleteId"];

    try {
        await db.query("delete from datas_items where id = ($1)", [Del_Id]);
        res.redirect('/')
    } catch (error) {
        console.log(error);
    }
})

app.listen(port, (req, res)=>{
    console.log("PORT :", port);
})