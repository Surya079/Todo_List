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

let data = [
    {id : 1, title : 'react Js'},
    {id : 2, title : 'Node js'},
]

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
    await db.query("insert into datas_items (title) values ($1)", [Title]);
    res.redirect('/')
})



app.listen(port, (req, res)=>{
    console.log("PORT :", port);
})