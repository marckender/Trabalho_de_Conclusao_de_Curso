import { IUser } from "../interfaces/user-interface";
import userRepository from "../repositories/user-repository";
import ApiError from "../utils/api-error";
import encryptPassword from "../utils/encryptPaswword";

class UserAction {
    async create(user: IUser, res) {
        const email = user?.email?.replace( /\s/g, '').toLowerCase()
        
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

}

export default new UserAction();