const app = require('./app');
const { PORT } = require('./config/dotenvConfig').config;

app.listen(PORT, () => {
    console.log(` https://nodejs312.dszcbaross.edu.hu`);
});