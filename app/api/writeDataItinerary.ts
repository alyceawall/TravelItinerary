import { MongoClient } from "mongodb";

export default async function itineraryHandler(req, res) {  
    if (req.method === "POST") {
        const client = await MongoClient.connect(
            "mongodb+srv://316:316Password@cluster0.pqdli.mongodb.net/LBT?retryWrites=true&w=majority"); 
        const db = client.db();  
        const yourCollection = db.collection("itineraries"); 

        const result = await yourCollection.insertOne(req.body);  
        console.log(result); 

        client.close();  
        res.status(201).json({ message: "Data inserted successfully!" });
    }
}