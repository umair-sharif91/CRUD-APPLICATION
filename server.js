// const mysql = require("mysql");
// const express = require('express');
// const path = require('path');

// const app = express();


// //creat connection
// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '123Qwerty',
//     database: 'test'
// });

// db.connect((err) => {
//  if (err) throw err;
//  console.log('MySQL connected.');
 
// });
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// //server static file from current directory

// app.use(express.static(path.join(__dirname)));
 
//  app.get('/data', (req, res) => {
//     let sql = 'SELECT * FROM users';
//     db.query(sql, (err, result) => {
//         if (err) throw err;
//         res.json(result);
//     });
//  });

//  app.post('/add-data', (req, res) => {
//     const { name, email } = req.body;
//     let sql = 'INSERT INTO users (name, email) VALUES (?, ?)';
//     db.query(sql, [name, email], (err, results) => {
//         if (err) throw err;
//         res.send('data added successfully');
//     });
//  });
//  app.delete('/delete-user/:id', (req, res) => {
//     const id = req.params.id;
//     const sql = 'DELETE FROM users WHERE id = ?';
//     db.query(sql, [id], (err, result) => {
//         if (err) throw err;
//         res.json({ message: 'User deleted successfully' });
//     });

//     app.put('/update-user/:id', (req, res) => {
//         const id = req.params.id;
//         const {name, email} =req.body;
//         const sql = 'update users SET name = ?, email =? WHERE id = ?';
//         db.query(sql,[name,email,id], (err, result) => {
//             if (err ) throw err;
//             res.json({message: 'user updated successfully'});
//         });
//     });
// });
 
//  app.listen (3000, () =>{
//     console.log(`server is running on http://localhost:3000`);
    
// });