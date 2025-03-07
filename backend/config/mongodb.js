import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => console.log("Connected to MongoDB"));
    mongoose.connection.on("error", (err) => console.error(`MongoDB connection error: ${err}`));
    mongoose.connection.on("disconnected", () => console.log("Disconnected from MongoDB"));

    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connection established");
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;