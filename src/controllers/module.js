const {exec}= require('child_process')
const query = require("../db/connection.js");
const path  =require('path')

const getModuleData = async (req,res) => {
    const name = req.params.module_name
    const type = req.params.type
    const dirPath= path.join(__dirname, '../../modules', name, type);


    let module_id = await query("select module_id from module where module_name = $1" ,[name])
    module_id = module_id.rows[0].module_id; 

    let filesName = await query("select title from resources where module_id= $1 AND type = $2 AND scope = $3 " , [module_id ,type , "module"])
    
    const result = filesName.rows.map(obj => Object.values(obj)[0]);
    //console.log(result)
    res.json(result)
    /*exec(`ls -t ${dirPath}`, (error,stdout,stderr) =>{
        if(error) {
            console.error('EXEC ERROR', error.message)
            return res.status(500).json({error : "Failed to read module data"})
        }
        if (stderr){
            console.error("STDERR:", stderr);
        }
        
        const filesName = stdout.split('\n').filter(Boolean)
        res.json(filesName);
    })*/
}
const downloadData =  async (req,res)=>{
    const {module_name, type} = req.params
    const fileName = decodeURIComponent(req.params.fileName)
    let module_id = await query("select module_id from module where module_name = $1 ;" ,[module_name])
    module_id = module_id.rows[0].module_id; 
    let  result = await query("select filepath from resources where module_id = $1 AND type = $2 AND title = $3 AND scope = $4 ; ",
        [module_id , type , fileName, 'module'] );
    const filepath = path.join(__dirname , '../../' + result.rows[0].filepath)
    res.download(filepath ,(err) =>{
        if (err) res.status(404).send(`${fileName} Not found`)
    })
}
const SeeData = async (req,res)=>{
    const {module_name, type } = req.params
    const fileName = decodeURIComponent(req.params.fileName)
    let module_id = await query("select module_id from module where module_name = $1 ;" ,[module_name])
    module_id = module_id.rows[0].module_id; 
    let  result = await query("select filepath from resources where module_id = $1 AND type = $2 AND title = $3 AND scope = $4 ; ",
        [module_id , type , fileName, 'module'] );
    const filepath = path.join(__dirname , '../../' + result.rows[0].filepath)
    res.status(200).sendFile(filepath);
}
module.exports = {getModuleData,downloadData ,SeeData}
