import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017", {});
    console.log("Conectado a la base de datos");
  } catch (error) {
    console.log("Hubo un erro ", error);
  }
};
