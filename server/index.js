
const {PORT} = require('../config');
const { connectDatabase } = require('./boot/database');
const app = require('./boot/app');

// setup
const main = async () => {
    await connectDatabase();
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

main();
