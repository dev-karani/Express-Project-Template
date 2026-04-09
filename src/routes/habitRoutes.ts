import express from 'express'
import type {NextFunction, Request, Response, Router} from 'express'
import { validateBody, validateParams } from '../middleware/validation.js'
import {z} from 'zod'

const createHabitSchema = z.object({
    name:z.string()
})
const paramsSchema = z.object({
    id:z.string()
})

const router:Router = express.Router()

router.get('/', (req:Request, res:Response):void=>{
    res.json({message:'habits'})
})

router.get('/:id',(req:Request, res:Response):void=>{
    res.json({message: 'got one habit'})
})

router.post('/',  validateBody(createHabitSchema),validateParams(paramsSchema),(req:Request, res:Response):void=>{
    res.json({message:'created a habit'})
})

router.delete('/:id', (req:Request, res:Response, next:NextFunction):void=>{
    res.json({message: 'deleted habit'})
})
export default router
// import {Router} from 'express'
// const router = Router() 