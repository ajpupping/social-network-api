const express = require('express');
const connectDB = require('./config/connection');
const routes = require('./routes');

const PORT = process.env.PORT || 3001;
const app = express();

const userRoutes = require('./routes/api/userRoutes')
const thoughtRoutes = require('./routes/api/thoughtRoutes')

app.use(express.json());
app.use(routes);
app.use('/api', userRoutes);
app.use('/api', thoughtRoutes);

connectDB().then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});