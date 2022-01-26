import app, { initRoutes } from './routes';
import dotenv from 'dotenv';

dotenv.config();
initRoutes();
app.listen(process.env.PORT || 8080, () => {
    console.log(`Server is running on port ${process.env.PORT || 8080}`);
});
