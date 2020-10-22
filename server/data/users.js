const bcrypt = require('bcryptjs')

const users = [ 
    {
        name:'Admin user',
        email:'admin@example.com',
        password:bcrypt.hashSync('123456',10),
        isAdmin:true
    },
    {
        name:'Jane DOe',
        email:'jane@example.com',
        password:bcrypt.hashSync('123456',10),
    },
    {
        name:'John DOe',
        email:'john@example.com',
        password:bcrypt.hashSync('123456',10),
    }
]

module.exports = users;