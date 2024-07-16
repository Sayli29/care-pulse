import { ID, Query } from "node-appwrite"
import { users } from "../appwrite.config"

export const createUser =  async (user: CreateUserParams) => {
    console.log('user', user);
    try{
        const newuser = await users.create(
            ID.unique(),
            user.email,
            user.phone,
            undefined,
            user.name
          );
        console.log(newuser, 'newuser');
        console.log('try')

    } catch(error: any) {
        console.log('error')
        if(error && error?.code === 409) {
            const documents = await users.list([Query.equal(`email`, [user.email])])
            return documents?.users[0]
        }
        
    }
}