import * as bcrypt from "bcrypt";
import { ILogin, IUser } from "../interfaces/user-interface";
import ApiError from "../utils/api-error";
import UserAction from "./user-action";
import getAccessToken from "../utils/getAccessToken";

class AuthAction {
    async login(body: ILogin) {
        
        const isUserExist = await UserAction.findByEmail(body.email)

        if (isUserExist) {
            
            const isPasswordMatched = await bcrypt.compare(
                body?.password,
                isUserExist.password
            );

            if(isPasswordMatched) {
                return getAccessToken(isUserExist)
            }
        }

        throw new ApiError(
            "Invalid email or password.",
            500
        );
    }

}

export default new AuthAction();