
import User from "../models/users.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export const signIn = async (req,res) => {
   const { email, password } = req.body;

   try {
    
        const existingUser = await User.findOne({email});
        if(!existingUser) return res.status(404).json({ message: 'User does not exist'});

        const isPasswordCorrect = bcrypt.compare(password, existingUser.password);
        if(!isPasswordCorrect) return res.status(400).json({ message: 'Password is not correct'});

       // test is secret key
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id}, 'test', { expiresIn: '1h'} );

        return res.status(200).json({ result: existingUser, token });

   } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Something went wrong.'});
   }

};

export const signUp = async (req,res) => {
    const { firstName, lastName, email, password, confirmPassword } = req.body;
   //  console.log(req);
    try {

       const existingUser = await User.findOne({email});

       if(existingUser) return res.status(400).json({ message: 'User already exist'});

       if( password !== confirmPassword) return res.status(400).json({message: 'Password do not match'});

       const hashPassword =  await bcrypt.hash(password, 12);
      //  console.log(hashPassword);

       const result = await User.create({ name: `${firstName} ${lastName}`, email, password: hashPassword });

       // test is secret key
       const token = jwt.sign({ email: result.email, id: result._id }, 'test', { expiresIn: '1h' } );

       return res.status(200).json({ result, token });

    } catch (error) {
        console.log(error);
        return r.status(400).json({message: 'Something went wrong. '});
    }
};