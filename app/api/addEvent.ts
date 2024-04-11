import eventModel from './eventModel';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function newEvent(req: NextApiRequest, res: NextApiResponse){
    const data = req.body;
    var name = req.body.name;
    var display_name = req.body.name;
    var time_start = req.body.time_start;
    var time_end = req.body.time_end;
    var location = req.body.location;
    var link_to_site = req.body.link_to_site;
    var participants = ["test"];
    var desc = req.body.desc;

    
    var duplicateName = true;
    var nameID = 0;
    var tempName = name;
    var nameChecker
    
    //ensure that the name is unique among events
    while (duplicateName){
        nameChecker = await eventModel.findOne({ name: tempName })
        //if it didn't find anything, the name is unique and we can stop
        if (nameChecker == null){
            duplicateName = false;
        }
        else{
            //concatenate 1 to the end
            if (nameID == 0){
                nameID++;
                tempName = tempName + String(nameID)
            }
            //if there's already a number there, ignore it and use the new number
            else{
                nameID++;
                tempName = tempName.slice(0, -1) + String(nameID)
            }
        }
    }
    //update to the unique name
    name = tempName;

    const newEvent = await eventModel.create({
                   name: name,
                   display_name: display_name,
                   time_start: time_start,
                   time_end: time_end,
                   location: location,
                   link_to_site: link_to_site,
                   participants: participants,
                   desc: desc
               });
    
    //itinerary.events.push(newEvent._id);
    console.log(newEvent._id);

}