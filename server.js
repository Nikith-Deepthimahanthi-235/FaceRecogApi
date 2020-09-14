const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const app = express();
const signIn = require('./controllers/signIn');
const register = require('./controllers/register');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
app.use(cors());
app.use(express.json());


const db =knex({
	client : 'pg' ,
	connection: {
	    host : '127.0.0.1',
		user : 'nikith',
		password : 'roopnikki@123',
		database : 'smart-brain'
	}
});



app.get('/', (req, res)=>{res.send(db.users)})
app.post('/signin', (res, req )=> {signIn.handlesignIn(res, req, db , bcrypt)} )
app.post('/register', (res, req) => {register.handleRegister(res, req, db, bcrypt)} )
app.get('/profile/:id' , (res, req) => {profile.handleProfileGet(res, req, db)})
app.put('/image', (res, req)=> {image.handleImage(res,req,db)})
app.post('/imageurl', (res, req)=> {image.handleAPIcall(res,require)})

app.listen(3001, (err)=>{
	if (err) {console.log(err)}
			console.log("the app is running smoothly on port 3001")
})


