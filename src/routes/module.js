const express = require("express")
const path = require("path")
const router = express.Router();
const requireAuth = require('../middleware/middleware.js')
const {downloadData} = require('../controllers/module.js')


router.use(requireAuth)

const template = (req ,res) => { 
   
    const Type = req.session.Type
    if (Type === 'student'){
        res.sendFile(path.resolve(__dirname,'../../public/modules.html'));
    }
    else if (Type=== 'teacher'){
        res.sendFile(path.resolve(__dirname,'../../public/teacherModule.html'))
    }
}

router.get('/:module_name/:type/:fileName/download', downloadData)
router.get('/:module_name/:type/:fileName',template)
router.get('/:module_name/:type',template)
router.get('/:module_name',template)



module.exports = router  