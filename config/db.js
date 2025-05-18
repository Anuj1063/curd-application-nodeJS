const mongoose = require('mongoose');

class DbConnect {
    async connectDb() {
        try {
            await mongoose.connect(process.env.DB_URI);
            console.log("DB Connected Successfully!")
        }catch(err) {
            console.log(err);
        }
    }
}


module.exports = new DbConnect();