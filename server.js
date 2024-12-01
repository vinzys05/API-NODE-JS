// server.js
const app = require('./app');
const db = require('./_Config/db');
const PORT = process.env.PORT || 5000;

(async () => {
    try {
        await db.authenticate();
        console.log('Database connected successfully...');

        const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

        //untuk Mematikan server di debug console : await global.close()
        const close = async () => {
            console.log('\nInitiating server shutdown...');
            try {
                await db.close();
                console.log('Database connection closed successfully.');
            } catch (dbError) {
                console.error('Error while closing the database connection:', dbError);
            }

            await new Promise((resolve, reject) => {
                server.close((err) => {
                    if (err) {
                        console.error('Error while closing the server:', err);
                        return reject(err);
                    }
                    console.log('HTTP server closed.');
                    resolve();
                });
            });

            console.log('Shutdown complete. Goodbye!');
            process.exit(0);
        };

        process.on('SIGINT', close);
        process.on('SIGTERM', close);
        global.close = close;

    } catch (error) {
        console.error('Failed to connect to the database:', error);
        process.exit(1);
    }
})();
