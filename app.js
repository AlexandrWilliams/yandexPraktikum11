const express = require('express');
const mongoose  = require('mongoose');
const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
	useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
    //useUnifiedTopology: true 
})

app.use(express.static(__dirname +'/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next)=>{
	req.user = {
		_id: '5dfaf19829f74405cc0f7107'
	};
	next();
});

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'))

app.listen(PORT, () => {

    console.log(`App listening on port ${PORT}`)
});
