
import { compare, hash } from "bcrypt";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(),"src","data","userData.json");
const productPath = path.join(process.cwd(),"src","data","products.json");

export function getUser(){
    const data = fs.readFileSync(filePath);
    return(JSON.parse(data));
}


export function getByEmail(email){
    const data = getUser();
    return(data.find(user=>user.email.toLowerCase() === email.toLowerCase()));
}


export async function saveUser({fullName,email,password,phone}){
    const found = getByEmail(email);
    if(found){
        throw new Error("User already exixts")
    }
    const data = getUser();
    const hashedPass = await hash(password,12);
    data.push({
        id:data.length +1,
        fullName,email,phone, 
        password:hashedPass,
    })
    fs.writeFileSync(filePath,JSON.stringify(data));
}


export async function verifyPass(password,hashedPass){
    const isValid = await compare (password,hashedPass);
    return isValid;
}


export async function updatedPass({email,password}){
    const data = getUser();
    const userFind = data.find(user=>user.email === email);
    if(!userFind){
        throw new Error("User not found");
    }
    const newHashedPass = await hash(password,12);
    userFind.password = newHashedPass;
    
    fs.writeFileSync(filePath,JSON.stringify(data));
}


export function getProducts(){
    const products = fs.readFileSync(productPath);
    return (JSON.parse(products))
} 