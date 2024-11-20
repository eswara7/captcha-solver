import { PrismaClient } from "@prisma/client";
import express from "express";
import cors from "cors"
const PORT = 3000;
const app = express();
const prisma = new PrismaClient()

app.use(cors())
app.use(express.json())

//servng a captcha

app.get("/api/v1/captcha",async(req,res)=>{
    const captcha = Math.random().toString(36).substring(2,8).toUpperCase() 
    return res.json({success:true,captcha})
})
app.get("/api/v1/balance",async(req,res)=>{
        const user = await prisma.user.findUnique({
            where:{
                id:1
            }
        })
        return res.json({success:true,coinBalance:user.coinBalance})
})

//verifing capcha and update coins

app.post("/api/v1/verify",async(req,res)=>{
    const {input,captcha} = req.body
    if(input === captcha){
        const user = await prisma.user.findUnique({
            where:{
                id:1
            }
        })
        if(!user){
            const newUser = await prisma.user.create({
                data:{
                    email:`user@gmail.com`,
                    coinBalance:1
                }
            })
            return res.json({success:true,coinBalance:newUser.coinBalance})
        }
        const updatedUser = await prisma.user.update({
            where:{
                id:1
            },
            data:{
                coinBalance:user.coinBalance+1
            }
        })
        res.json({success:true,coinBalance:updatedUser.coinBalance})
    }
    else{
        res.json({success:false})
    }
})

app.use((err,req,res,next)=>{
    return res.status(500).json({messege:"somthing broke at the back!"})
})
app.listen(PORT,()=>{
    console.log(`server started at port ${PORT}`)
})