const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');
const app = express();
app.use(express.json());
app.use('/admin', adminRoutes);
app.use('/user', userRoutes);



const PORT = process.env.PORT || 2127;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
