import dbConnect from "@/lib/dbConnect";
import userModel from "@/model/User";
import { success, z } from "zod";
import { usernameValidation } from "@/schemas/signUpSchema";
import { messageSchema } from "@/schemas/messageSchema";


const UsernamQuerySchema = z.object({
    username: usernameValidation
})

export async function GET(request: Request){
    await dbConnect()
    try {
        const {searchParams} = new URL(request.url)
        const queryParam = {
            username: searchParams.get('username')
        }
        //validate with zod
        const result = UsernamQuerySchema.safeParse(queryParam)
        console.log(result)
        if(!result.success) {
            const usernameErrors = result.error.format().
            username?._errors || []
            return Response.json({
                success: false,
                message: usernameErrors.length > 0 ?
                usernameErrors.join(', ') 
                : 'Invalid query parameters'
            })
        }
    } catch (error) {
        console.error("Error checking username", error)
        return Response.json(
            {
                success : false,
                message: "Error checking username"
            },
            { status : 500}
        )
    }
}