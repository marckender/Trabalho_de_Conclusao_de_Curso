import * as bcrypt from "bcrypt";

const encryptPassword = async (password: string)=> {
    const saltRound = 10; // remove later
    const salt = await bcrypt.genSaltSync(saltRound);
    return await bcrypt.hashSync(password.toString(), salt);
}

export default encryptPassword;