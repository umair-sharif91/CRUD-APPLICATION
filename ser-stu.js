const mysql = require("mysql");
const express = require('express');
const path = require('path');

const app = express();


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123Qwerty',
    database: 'test' 
});


db.connect((err) => {
    if (err) {
        console.error('MySQL connection error:', err);
        return;
    }
    console.log('MySQL connected.');
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static(path.join(__dirname)));


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index1.html');
});


app.get('/student', (req, res) => {
    const sql = 'SELECT * FROM students'; 
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error fetching students:', err);
            return res.status(500).json({ message: 'Error fetching students' });
        }
        res.json(result);
    });
});


app.post('/add-student', (req, res) => {
    const { name, CNIC, Course, Grade, GPA } = req.body;
    const sql = 'INSERT INTO students (name, CNIC, Course, Grade, GPA) VALUES (?, ?, ?, ?, ?)'; 
    db.query(sql, [name, CNIC, Course, Grade, GPA], (err, results) => {
        if (err) {
            console.error('Error adding student:', err);
            return res.status(500).json({ message: 'Error adding student' });
        }
        res.send('Data added successfully');
    });
});


app.delete('/delete-student/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'DELETE FROM students WHERE id = ?'; 
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error deleting student:', err);
            return res.status(500).json({ message: 'Error deleting student' });
        }
        res.json({ message: 'Student deleted successfully' });
    });
});



app.put('/update-student/:id', (req, res) => {
    const id = req.params.id;
    const { name, CNIC, Course, Grade, GPA } = req.body;
    const sql = 'UPDATE students SET name = ?, CNIC = ?, Course = ?, Grade = ?, GPA = ? WHERE id = ?'; 
    db.query(sql, [name, CNIC, Course, Grade, GPA, id], (err, result) => {
        if (err) {
            console.error('Error updating student:', err);
            return res.status(500).json({ message: 'Error updating student' });
        }
        res.json({ message: 'Student updated successfully' });
    });
});


app.listen(3000, () => {
    console.log(`Server is running on http://localhost:3000`);
});
