import connectDb from "@/config/db";
import Property from '@/models/Property'
export const GET = async(req) => {
    try {
        await connectDb();

        const properties = await Property.find({})
        
        // console.log(properties)
        return new Response(JSON.stringify(properties),{status:200,});
    }catch(err){
        console.log(err);
        return new Response('Something wrong', {status:500});
    }
}