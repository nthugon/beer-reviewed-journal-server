const mongoose = require( 'mongoose' );

const dbURI = process.env.MONGODB_URI || 'mongodb://localhost/beers'; 

mongoose.Promise = Promise;
mongoose.connect( dbURI ); 

mongoose.connection.on('connected', function () {  
    console.log( 'Mongoose default connection open to ' + dbURI );
}); 

mongoose.connection.on('error',function (err) {  
    console.log( 'Mongoose default connection error: ' + err );
}); 

mongoose.connection.on('disconnected', function () {  
    console.log( 'Mongoose default connection disconnected' ); 
});

process.on('SIGINT', function() {  
    mongoose.connection.close(function () { 
        console.log( 'Mongoose default connection disconnected through app termination' ); 
        process.exit(0); 
    }); 
});

module.exports = mongoose.connection;
