if( ! process.env.NODE_ENV === 'production'){
  console.log('Looks like we are in development mode! Loading .env');
  require('dotenv').config();
}


