import mongoose from 'mongoose';


export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection failed:', error);
        process.exit(1); // Exit the process with failure
    }
};


// eu4ss1KlZ2arCHEU

// mongodb+srv://fahmidakarim2002:eu4ss1KlZ2arCHEU@cluster0.iiofbpt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

// mongodb+srv://fahmidakarim2002:eu4ss1KlZ2arCHEU@cluster0.iiofbpt.mongodb.net/restaurant?retryWrites=true&w=majority&appName=Cluster0
