import mongoose from 'mongoose';

export const connect = (db: string) => {
  mongoose
    .connect(db, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      return console.log(
        '\x1b[32m%s\x1b[0m',
        '√ Successfully connected to ' + db
      );
    })
    .catch(error => {
      console.error(
        '\x1b[31m',
        '[dbconnect]',
        error.name,
        error.message,
        '\x1b[0m'
      );
      // return process.exit(1);
    });

  mongoose.connection.on('disconnected', connect);
};

export const close = async (callBack: () => void) => {
  await mongoose.disconnect().then(() => {
    callBack();
  });
};
