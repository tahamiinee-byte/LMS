const path = require('path')
const app = require(path.resolve(__dirname, 'src/app.js'))

app.listen(5000, ()=>{
    console.log(`server runnning on ${5000}`)
})