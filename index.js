const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Employee = require('./model/employee')
require('dotenv').config()
const path = require('path')

//FOR POST REQUEST WE ARE USING MIDDLEWARE TO CONVERT POST INTO JSON
// app.use(express.json())
app.use(bodyParser.json())

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
},()=>{
    console.log('connected to the db');
})

// const users = [
//     {id:1,user:'smith'},
//     {id:2,user:'starc'},
//     {id:3,user:'stew'}
// ]
app.use('/', express.static(path.resolve(__dirname, 'public')))

// app.get('/',(req,res)=>{
//     res.send('hello world')
// })

app.get('/data',async (req,res)=>{
    
    const employees = await Employee.find()
    console.log('got the data');
    res.send(employees)
})

app.delete('/data/:id',async(req,res)=>{
    console.log(req.params.id);
    Employee
    .findByIdAndRemove(req.params.id)
    .then(doc=>{
        if(!doc){return res.status(404).end()}
        return res.status(204).send({doc})
    })
    .catch(err=>console.log('errorr',err))
   
})

app.put('/data/:id',async(req,res)=>{
        //CHECK USER IS THERE OR NOT
        // const userFound = users.find(c=> c.id === parseInt(req.params.id))
        // if (!userFound) return res.status(404).send('error 404 : given user not found ..')
        const userFound =await  Employee.findById(req.params.id)
        console.log(userFound);
        if (!userFound) return res.status(404).send('error 404 : given user not found ..')
       
        await Employee.findByIdAndUpdate(req.params.id, { name: 'dhinio' }).then(doc=>{
            if(!doc){return res.status(404)}
            return res.status(204).send({doc})
        }).catch(err=>console.log(err))
//                             function (err, docs) { 
//     if (err){ 
//         console.log(err) 
//     } 
//     else{ 
//         console.log("Updated User : ", docs); 
//     } 
// }); 

//         userFound.user=req.body.user
//         res.send(userFound)
    })


app.post('/api/register', async (req, res) => {
    console.log(req.body);
    const { name, email, dept , joiningYear } = req.body

  
    try {
        const response = await Employee.create({
            name , email , dept , joiningYear:parseInt(joiningYear)
        })
        res.json({ status: 'added employee' })
        console.log(response);
    }
    catch (error) {
        console.log(error);
        return res.json({ status: 'error' })
    }


})



const port =process.env.PORT || 5000
app.listen(port,()=>{
    console.log('listning on 5000...');
})