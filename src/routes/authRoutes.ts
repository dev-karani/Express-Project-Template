// import {Router} from 'express']
import express from 'express'
import type {Request, Response, Router} from 'express'

const router:Router = express.Router()

router.post('/register', (req:Request, res:Response):void=>{
    res.status(201).json({message:'User signed up'})
})

router.post('/login', (req:Request, res:Response):void=>{
    res.status(201).json({message:'user logged in'})
})

export default router