import { getByEmail, verifyPass } from "@/src/services/users";
import NextAuth from "next-auth/next";
import  CredentialsProvider  from "next-auth/providers/credentials";

const authOptions = {
    session:{
        jwt:true,
    },
    
    providers:[
        CredentialsProvider({
            async authorize({email,password}){
                const user = getByEmail(email);

                if(!user){
                    throw new Error("User not found");
                }
                const isValid = await verifyPass(password,user.password);
                if(!isValid){
                    throw new Error("Incorrect Password");
                }
                return(email);
            }
        })
    ]
}
export default NextAuth(authOptions);