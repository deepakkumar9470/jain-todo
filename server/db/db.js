import mongoose from 'mongoose'

const ConnectToDb =  async () => {
    try {
      mongoose.connect(process.env.MONGO_URL)
      console.log('MongoDB connected successfully..')
    } catch (error) {
      console.log(error)
    }

}


export default ConnectToDb;