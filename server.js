const path = require('path')
const app = require(path.resolve(__dirname, 'src/app.js'))
const {config} = require(path.resolve(__dirname , "src/config/config.js"))

const port = config.port ; 
app.listen(port, ()=>{
    console.log(`server runnning on ${port}`)
})