const {exec}= require('child_process')
const path  =require('path')

const getModuleData = (req,res) => {
    const name = req.params.module_name
    const type = req.params.type
    const dirPath= path.join(__dirname, '../../modules', name, type);
    exec(`ls -t ${dirPath}`, (error,stdout,stderr) =>{
        if(error) {
            console.error('EXEC ERROR', error.message)
            return res.status(500).json({error : "Failed to read module data"})
        }
        if (stderr){
            console.error("STDERR:", stderr);
        }
        
        const filesName = stdout.split('\n').filter(Boolean)
        res.json(filesName);
    })
}
const downloadData = (req,res)=>{
    console.log('params:', req.params);
    const {module_name, type} = req.params
    const fileName = decodeURIComponent(req.params.fileName)
    const filepath = path.join(__dirname ,`../../modules/${module_name}/${type}/${fileName}`)
    res.download(filepath ,(err) =>{
        if (err) res.status(404).send(`${fileName} Not found`)
    })
}
const SeeData = (req,res)=>{
    const {module_name, type } = req.params
        const fileName = decodeURIComponent(req.params.fileName)

    const filepath = path.join(__dirname ,`../../modules/${module_name}/${type}/${fileName}`)
    res.status(200).sendFile(filepath);
}
module.exports = {getModuleData,downloadData ,SeeData}
