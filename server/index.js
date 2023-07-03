const express = require('express');
const app = express();
const cors = require('cors');
const adminRouter = require('./routes/admin');
const teamsRouter = require('./routes/teams');
require('dotenv').config();

const port = process.env.PORT || 3001;

// middleware
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// handle routes from /admin
app.use('/admin', adminRouter);
app.use('/teams', teamsRouter);

app.listen(port, () => console.log(`Listening on port ${port}.`));
