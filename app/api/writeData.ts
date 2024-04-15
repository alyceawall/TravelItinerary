import { MongoClient } from "mongodb";
//from: https://javascript.plainenglish.io/storing-data-to-mongodb-with-nextjs-6372319d498b

export default async function handler(req, res) {  
    if (req.method === "POST") {
        const client = await 
        MongoClient.connect(
          "mongodb+srv://316:316Password@cluster0.pqdli.mongodb.net/LBT?retryWrites=true&w=majority"); 
          const db = client.db();  
          const yourCollection = db.collection("events"); 
          const result = await yourCollection.insertOne(req.body);  
          console.log(result); 
          client.close();  
          res.status(201).json({ message: "Data inserted successfully!" });
        }
      }

// async function itineraryHandler(req, res, itinerary) {  
//     if (req.method === "POST") {
//         const client = await 
//         MongoClient.connect(
//             "mongodb+srv://316:316Password@cluster0.pqdli.mongodb.net/LBT?retryWrites=true&w=majority"); 
//             const db = client.db();  
//             const yourCollection = db.collection("itineraries"); 
//             const result = await yourCollection.insertOne(itinerary);  
//             console.log(result); 
//             client.close();  
//             res.status(201).json({ message: "Data inserted successfully!" });
//         }
//     }

// export {eventHandler, itineraryHandler}
