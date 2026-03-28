import {Router} from 'express'

const router = Router()

router.get('/', (req,res)=>{
    res.json({message:'get all users'})
})
router.get('/:id', (req,res)=>{
    res.json({message:'get a user'})
})
router.put('/:id', (req,res)=>{
    res.json({message:'updated a user'})
})
router.delete('/:id', (req,res)=>{
    res.json({message:'delete a user'})
})

export default router