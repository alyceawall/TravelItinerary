import UserModel from './userModel';
import mongoose from 'mongoose';
import promptSync from 'prompt-sync';

const prompt = promptSync();

export async function addFriend(): Promise<void> {
  try {
    const user1Username = prompt('Enter the username of user 1: ');
    const user2Username = prompt('Enter the username of user 2: ');

    // Find user1 and user2 in the database
    const user1 = await UserModel.findOne({ username: user1Username });
    const user2 = await UserModel.findOne({ username: user2Username });

    if (!user1 || !user2) {
      throw new Error('User not found');
    }

    // Check if user2 is already in user1's friends list
    if (user1.friends.includes(user2._id)) {
      console.log(`${user2.name} and ${user1.name} are already friends!`);
        return;
    }

    // Add user2 to user1's friends list and vice versa
    user1.friends.push(user2._id);
    user2.friends.push(user1._id);

    // Save changes to the database
    await user1.save();
    await user2.save();
    
    console.log(`Friendship established between ${user1.name} and ${user2.name}`);
  } catch (error) {
    console.error('Error adding friend:', error);
    throw error;
  }
}
