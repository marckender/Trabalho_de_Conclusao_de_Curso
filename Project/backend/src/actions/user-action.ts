import { IUser } from "../interfaces/user-interface";
import userRepository from "../repositories/user-repository";
import ApiError from "../utils/api-error";
import apiLogger from "../utils/api-logger";
import encryptPassword from "../utils/encryptPaswword";

class UserAction {
 
    async create(user: IUser, res) {
        const email: string = user?.email?.replace( /\s/g, '').toLowerCase()
        
        const checkEmail = await this.findByEmail(email);
        if (checkEmail) {
          throw new ApiError("User already exists. Please login.", 500);
        }
        if(!email || !user.password || !user.name) {
          throw new ApiError("Email, Password, Name is required.", 500);

        }
        const encryptedPassword = await encryptPassword(user.password)
        const data = {
            ...user,
            email,
            password: encryptedPassword
        }
        
        let createdUser = await userRepository.create(data);
        if(createdUser._id) {
            return createdUser
        } else {
            throw new ApiError(
                "Failed to Create Account, please retry !",
                500
            );
        }
    }

    async findByEmail(email: string) {
        return await userRepository.findOne({ email });
    }

    async findById(_id: string) {
        const user:IUser = await userRepository.findById({_id})
        apiLogger.error(`[UserAction] - findById - user - ${JSON.stringify(user)}`);
        if(!user) {
            throw new ApiError(
                "User Not Found",
                500
            );
        }
        return user;
    }
    async findAll() {
        return await userRepository.find().select(["-password", "-token"]);
    }

    async findByIdAndUpdate(_id: string, data: any) {
        return await userRepository.findByIdAndUpdate(_id, {
          ...data,
          updatedAt: new Date(),
        });
    }

}

export default new UserAction();