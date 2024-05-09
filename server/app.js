require('dotenv').config()


const connectDB = require('./db/connect')
const express = require('express')
const cors = require('cors')
const app = express()
const Admin = require('./router/admin')
const Employee = require('./router/employee')

const bodyParser = require('body-parser')
app.use(bodyParser.json({limit:'100mb'}))

app.use(express.json())
app.use(cors())

app.use("/api/admin",Admin)
app.use("/api",Employee)

const port = process.env.PORT || 2000

const start = async ()=>{
    try {
        await connectDB(process.env.MONGODB_COMPASS_URL).then(r =>{console.log("\nDatabase Connected\n")}).catch(e=>{console.log(e)})

        app.listen(port,()=>{
            console.log(`\nhttp://localhost:${port}\n`)
        })
        
    } catch (error) {
        console.log(error)
    }
}

start()