import {Router} from 'express'

const router = Router()

router.get('/', (req,res)=>{
    // console.log('got all users')
    res.json({message:'get all users'})
})
router.get('/:id', (req,res)=>{
    // console.log('got a user')
    res.json({message:'get a user'})
})
router.put('/:id', (req,res)=>{
    // console.log('update a user');
    res.json({message:'updated a user'})
})
router.delete('/:id', (req,res)=>{
    // console.log('deleted a user')
    res.json({message:'delete a user'})
})

export default router