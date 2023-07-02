import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { IUser } from "../interfaces/user-interface";
import { JWT_EXPIRATION, JWT_SECRET } from "../config/constants";
import apiLogger from "./api-logger";
import userAction from "../actions/user-action";

const getAccessToken = async (user: IUser)=> {
    apiLogger.info(
        `[AuthAction] - getAccessToken - user => ${JSON.stringify(user)}`
    );

    const userdata = {
        access_token : jwt.sign(
            {
            userId: user._id,
            email: user.email
            }, 
            JWT_SECRET,
            {expiresIn: JWT_EXPIRATION}
        ),
        user: {
            _id: user._id,
            name: user.name,
            email:user.email,
        }
    }
    await userAction.findByIdAndUpdate(user._id,  {
        token : userdata.access_token,
    });
    
    return userdata;
}

export default getAccessToken;