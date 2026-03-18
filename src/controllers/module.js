const {exec}= require('child_process')
const path  =require('path')

const getModuleData = (req,res) => {
    // I Need to get data form the path public/{module_name}/{module_type_data}
    const name = req.params.module_name
    const type = req.params.type
    const dirPath= path.join(__dirname, '../../modules', name, type);
    exec(`ls -t ${dirPath}`, (error,stdout,stderr) =>{
        if(error) {
            console.error('EXEC ERROR', error.message)
        }
        else if (stderr){
            console.error("STDERR:", stderr);
        }
        
        const filesName = stdout.split('\n').filter(Boolean)
        console.log(filesName)
        res.json(filesName);
    })
}
const downloadData = (req,res)=>{
    const {module_name, type , fileName} = req.params
    const filepath = path.join(__dirname ,`../../modules/${module_name}/${type}/${fileName}`)
    res.download(filepath ,(err) =>{
        if (err) res.status(404).send(`${fileName} Not found`)
    })
}
const SeeData = (req,res)=>{
    const {module_name, type , fileName} = req.params
    const filepath = path.join(__dirname ,`../../modules/${module_name}/${type}/${fileName}`)
    res.status(200).sendFile(filepath);
}
module.exports = {getModuleData,downloadData ,SeeData}
