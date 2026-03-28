import express from 'express'
import type {Request, Response, Router} from 'express'

const router:Router = express.Router()

router.get('/', (req:Request, res:Response):void=>{
    res.json({message:'habits'})
})

router.get('/:id',(req:Request, res:Response):void=>{
    res.json({message: 'got one habit'})
})

router.post('/', (req:Request, res:Response):void=>{
    res.json({message:'created a habit'})
})

export default router
// import {Router} from 'express'
// const router = Router()