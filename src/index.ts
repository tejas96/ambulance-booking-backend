import app, { initRoutes } from './routes';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

// create application/json parser
var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

// apply the body parser middleware to all incoming requests
app.use(jsonParser);
app.use(urlencodedParser);

dotenv.config();
initRoutes();
app.listen(process.env.PORT || 8080, () => {
    console.log(`Server is running on port ${process.env.PORT || 8080}`);
});
