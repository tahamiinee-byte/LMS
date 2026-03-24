const path = require('path')
const {pool} = require(path.resolve(__dirname,'../config/dbcon.js'))
const multer = require('multer')
const fs = require('fs')

fs.mkdirSync('./storage', { recursive: true })
const upload = multer({ dest : './storage'})

const getUserInfo = async (req, res) => {
    const result = await pool.query(
        'select firstname,lastname from person where id = $1',
        [req.session.UserID]
    )
    const user = result.rows[0]
    res.status(200).json(user)
}

const getUserModules = async (req, res) => {
    if (req.session.Type === 'student') {
        const semester = await pool.query('select semester from student where id = $1', [req.session.UserID]);
        const result = await pool.query(
            'select module_name from (module_semester ms join module m on ms.module_id = m.module_id ) where ms.semester = $1',
            [semester.rows[0].semester]
        )
        res.status(200).json(result.rows);
    }
    else if (req.session.Type === 'professor'){
        const result = await pool.query(`
            select m.module_name 
            from module m join teacher_group_module tgm
            on m.module_id = tgm.module_id
            where tgm.id = $1     
        `,[req.session.UserID])
        res.status(200).json(result.rows)
    }
}

const getFiles = async (req,res) => {
    const {name , type} = req.params

    const result = await pool.query(`
        select title from 
        resources r join module m
        on r.module_id = m.module_id
        where m.module_name = $1 
        and r.type = $2
    ` , [name,type])

    if(!result.rowCount){
        return res.sendStatus(404)
    }

    res.json(result.rows.map(r=>r.title))
}

const SubmitFiles = [
  upload.single('file'),
  async (req, res) => {
    const tmpPath = req.file?.path;
    try {
      const {
        module_name,
        title,
        type,
        description = '',
        scope,
        group_encodings,
      } = req.body;

      if (!req.file)    return res.status(400).json({ error: 'No file uploaded.' });
      if (!module_name) return res.status(400).json({ error: 'module_name is required.' });
      if (!title)       return res.status(400).json({ error: 'title is required.' });
      if (!type)        return res.status(400).json({ error: 'type is required.' });
      if (!scope)       return res.status(400).json({ error: 'scope is required.' });

      let groups = [];
      try { groups = JSON.parse(group_encodings || '[]'); } catch { groups = []; }
      if (scope === 'group' && groups.length === 0)
        return res.status(400).json({ error: 'At least one group is required.' });

      const modRow = await pool.query(
        'SELECT module_id FROM module WHERE module_name = $1',
        [module_name]
      );
      if (!modRow.rows.length)
        return res.status(404).json({ error: `Module "${module_name}" not found.` })

      const module_id = modRow.rows[0].module_id;
      const commiter_id = req.session?.UserID ?? null;

      const ext      = path.extname(req.file.originalname).toLowerCase();
      const baseName = `${module_name}-${type}-${title}`.replace(/[^a-zA-Z0-9._-]/g, '_');
      const finalDir  = path.resolve('./storage');
      const finalPath = path.join(finalDir, baseName + ext);

      fs.mkdirSync(finalDir, { recursive: true });
      fs.renameSync(tmpPath, finalPath);

      if (scope === 'module') {
        await pool.query(
          `INSERT INTO resources
             (filepath, module_id, type, title, description, scope, group_encoding, commiter_id)
           VALUES ($1, $2, $3, $4, $5, $6, 'all', $7)`,
          [finalPath, module_id, type, title, description, scope, commiter_id]
        );
      } else {
        const inserts = groups.map(group =>
          pool.query(
            `INSERT INTO resources
               (filepath, module_id, type, title, description, scope, group_encoding, commiter_id)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
            [finalPath, module_id, type, title, description, scope, group, commiter_id]
          )
        );
        await Promise.all(inserts);
      }

      return res.status(201).json({ message: 'Resource uploaded successfully.' });

    } catch (err) {
      if (tmpPath && fs.existsSync(tmpPath)) fs.unlinkSync(tmpPath);
      console.error('postResource error:', err);
      return res.status(500).json({ error: 'Internal server error.' });
    }
  },
];

module.exports = { getUserInfo, getUserModules, getFiles, SubmitFiles }