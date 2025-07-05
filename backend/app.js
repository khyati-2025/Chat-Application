const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const message_path = ('./data/message.json')


const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));


//Helper function
function getMessages() {
    const data = fs.readFileSync(message_path, 'utf-8');
    return JSON.parse(data);
};
function saveMessages(messages){
    fs.writeFileSync(message_path, JSON.stringify(messages, null, 2), 'utf-8');
};
function clearAllMessages() {
    fs.writeFileSync(message_path, JSON.stringify([], null, 2), 'utf-8');
}
function deleteUser(){
    fs.writeFileSync(message_path, JSON.stringify([], null, 2), 'utf-8');
}
function loginCredentials(user, pwd) {
    const data = JSON.parse(fs.readFileSync(message_path, 'utf-8'));
    const userExists = data.find(u => u.user === user && u.pwd === pwd);
    return userExists;
}
function signUp(userData) {
    fs.writeFileSync(message_path, JSON.stringify(userData, null, 2), 'utf-8');
}


//Routes

app.post('/api/v1/login', (req, res)=>{
    try{
        const {user, pwd} = req.body;
        const isValid = loginCredentials(user, pwd);
        if(!isValid) { throw new Error ('Invalid user or password') }
        res.status(200).json({
            status: "success",
            message: "Login successful"
            });
    }catch (error) {
        res.status(401).json({
            status: "failed",
            message: error.message
            });
    }
})
app.post('/api/v1/sign-up', (req, res)=>{
    try{
        const {user, pwd} = req.body;
       /*  const isValid = loginCredentials(user, pwd);
        if(isValid) { throw new Error ('User already exists') }; */
        if(!user || !pwd) {throw new Error("Please fill the user or pwd section")}
        let acc = getMessages();
        let newAcc = {
            "user" : user,
            "pwd" : pwd,
            "messageHistory": []
        };
        acc.push(newAcc);
        signUp(acc);
        res.status(200).json({
            status: "success",
            user,
            pwd
        });
    }catch (err) {
        console.error(err);
        res
            .status(400)
            .json({
                status: "failed",
                message: err.message
            })
    }
})

app.get('/api/v1/', (req,res) => {
   try{
    const msg = getMessages();
    res
        .status(200)
        .json({
            status: "success",
            message: msg
        })

   }catch(error) {
        console.error(error);
        res
            .status(400)
            .json({
                status: "failed",
                message: error.message
            })
   }
});

app.get('/api/v1/:user', (req, res) => {
    try{
        const user = req.params.user;
        const message = getMessages()
        const index = message.findIndex(u => u.user === user);
        if(!user) { throw new Error("User does'nt exist")};
        res
            .status(200)
            .json({
                status: "success",
                message: message[index].messageHistory
            })
    }catch (err) {
        console.error(err);
        res
            .status(400)
            .json({
                status: "failed",
                message: err.message
            })
    }
})

app.post('/api/v1/message/:id', (req, res) => {
    try{
        const { message } = req.body;
        const user = req.params.id;
        if(!message){
            throw new Error("Message are required");
        }
        let messages = getMessages();
        const index = messages.findIndex(u => u.user===user);
        const newMessage = {
            "msg" : message,
            "time" : new Date().toISOString()
             
        }; 
        messages[index].messageHistory.push(newMessage);
        saveMessages(messages);
        res
            .status(201)
            .json({
                status: "success",
                message: newMessage
            });

    }catch(error) {
        console.error(error);
        res
            .status(400)
            .json({
                status: "failed",
                message: error.message
            })
    }
})


app.delete('/api/v1/messages/:id', (req, res) => {
    try{
        let messages = getMessages();
        const index = messages.findIndex(u =>u.user ===req.params.id);
        messages[index].messageHistory = [];
        saveMessages(messages);
       
        res
            .status(200)
            .json({
                status: "success",
                message: "All messages deleted"
            });
    }catch(error) {
        console.error(error);
        res
            .status(400)
            .json({
                status: "failed",
                message: error.message
            })
    }
})

app.delete('/api/v1/:id', (req, res) => {
    try{
        let users = getMessages();
        const index = users.findIndex( u=> u.user === req.params.id);
        users.splice(index, 1);
        saveMessages(users);
        res
            .status(200)
            .json({
                status: "success",
                message: "User deleted"
            })

    }catch (error) {
        console.error(error);
        res
            .status(400)
            .json({
                status: "failed",
                message: error.message
            })
    }
})

app.delete('/api/v1/messages', (req, res) => {
    try{
        clearAllMessages();
        res
            .status(200)
            .json({
                status: "success",
                message: "All messages deleted"
            });
    }catch(error) {
        console.error(error);
        res
            .status(400)
            .json({
                status: "failed",
                message: error.message
            })
    }
})



module.exports = app;