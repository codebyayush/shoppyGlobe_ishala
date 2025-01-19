import { AppDataSource } from "../data-source";
import { Users } from "../entities/user";
import bcrypt from "bcrypt";
import { createToken } from "../service/auth";


export const handleCreateNewUser = async (req, res) => {
    const { fname, lname, address, phone, email, password } = req.body;
  
    const userRepo = AppDataSource.getRepository(Users);
  
    //check if user already exists in db
    const user = await userRepo.findOne({ where: { email } });
  
    console.log("user--", user);
  
    if (!user) {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
  
      const newUser = userRepo.create({
        firstname: fname,
        lastname: lname,
        email: email,
        password: hashedPassword,
        phone: phone,
        address: address,
      });
  
      console.log(newUser);
  
      const result = await userRepo.save(newUser);
  
      const token = createToken({ id: result.id });
  
      console.log("l 36", token);
  
      res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000,
      });
  
      res.status(201);
      console.log("Success: new user created", result.id);
      return;
    } else {
      res.status(201);
      console.log(`user already exists ${user}`);
      return;
    }
};