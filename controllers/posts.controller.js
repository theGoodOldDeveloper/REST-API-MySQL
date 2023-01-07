const pool = require('../database/index.js')
const postsController = {

    getAll: async (req, res) => {
        try {
            const [rows, fields] = await pool.query("select * from posts ORDER BY id ASC")
            //res.json({ mesage: 'getAll posts ok' })
            //res.json({ data: rows })
            res.json(rows)
        } catch (error) {
            console.log(error)
            res.json({
                status: "error"
            })
        }
    },
    getById: async (req, res) => {
        try {
            const { id } = req.params
            const [rows, fields] = await pool.query("select * from posts where id = ?", [id])
            //res.json({ data: rows })
            res.json(rows)
        } catch (error) {
            console.log(error)
            res.json({
                status: "error"
            })
        }
    },
    create: async (req, res) => {
        try {
            const { title, content } = req.body

            console.log(title)
            console.log(content)

            const sql = "insert into posts (title, content) values (?, ?)"
            const [rows, fields] = await pool.query(sql, [title, content])
            //res.json({ data: rows })
            //res.json(rows)
            res.redirect('/')
        } catch (error) {
            console.log(error)
            res.json({
                status: "error"
            })
        }
    },
    update: async (req, res) => {
        try {
            const { title, content } = req.body
            const { id } = req.params
            const sql = " update posts set title = ?, content = ? where id = ?"
            const [rows, fields] = await pool.query(sql, [title, content, id])
            //res.json({ data: rows })
            res.json(rows)
        } catch (error) {
            console.log(error)
            res.json({
                status: "error"
            })
        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.params
            const [rows, fields] = await pool.query("delete from posts where id = ?", [id])
            //res.json({ data: rows })
            res.json(rows)
        } catch (error) {
            console.log(error)
            res.json({
                status: "error"
            })
        }
    }
}

module.exports = postsController