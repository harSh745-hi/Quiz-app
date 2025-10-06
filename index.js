const express = require('express');
const app = express();
const quizRoutes = require('./routes/quizRoutes');

app.use(express.json());
app.use('/api', quizRoutes);

app.listen(4000,()=> {
    console.log(" running on port 4000");
})
module.exports = app;
