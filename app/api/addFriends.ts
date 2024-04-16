// //Idk if this works yet I did not test it

import userModel from './userModel';

// Define a function that connects friends
export default async function connectFriends(userUsername: string, friendUsernames: string[]) {
    try {
        // Fetch the user from the database based on the username
        const user = await userModel.findOne({ username: userUsername });

        if (!user) {
            throw new Error('User not found');
        }

        // Fetch the friend users from the database based on the friend usernames
        const friends = await userModel.find({ username: { $in: friendUsernames } });

        // Iterate through the list of friends
        for (const friend of friends) {
            // Check if the friend is already in the user's friends list
            if (!user.friends.includes(friend._id)) {
                // If not, add the friend to the user's friends list
                user.friends.push(friend._id);
            }

            // Check if the user is already in the friend's friends list
            if (!friend.friends.includes(user._id)) {
                // If not, add the user to the friend's friends list
                friend.friends.push(user._id);
            }

            // Save the changes to both user and friend documents
            await Promise.all([user.save(), friend.save()]);
        }

        console.log('Friends connected successfully');
    } catch (error) {
        console.error('Error connecting friends:', error.message);
    }
}

export { connectFriends };