import connectDb from "@/config/db";
import Property from '@/models/Property'
import { getSessionUser } from "@/utils/getSessionUser";
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

export const POST = async(req)=> {
try {
  await connectDb();
  const sessionUser = await getSessionUser();
        if(!sessionUser || !sessionUser.userId){
          return new Response('User Id is required',{status: 401})
        }
        const {userId} = sessionUser;

    const formData = await req.formData();
    const amenities = formData.getAll('amenities');
    const images = formData.getAll('images').filter((image) => image.name !== '');

     // Create propertyData object for database
     const propertyData = {
        type: formData.get('type'),
        name: formData.get('name'),
        description: formData.get('description'),
        location: {
          street: formData.get('location.street'),
          city: formData.get('location.city'),
          state: formData.get('location.state'),
          zipcode: formData.get('location.zipcode'),
        },
        beds: formData.get('beds'),
        baths: formData.get('baths'),
        square_feet: formData.get('square_feet'),
        amenities,
        rates: {
          weekly: formData.get('rates.weekly'),
          monthly: formData.get('rates.monthly'),
          nightly: formData.get('rates.nightly'),
        },
        seller_info: {
          name: formData.get('seller_info.name'),
          email: formData.get('seller_info.email'),
          phone: formData.get('seller_info.phone'),
        },
        owner:userId,
        images,
      };
      console.log(propertyData)
    return new Response(JSON.stringify({message: 'Success'}),
    {status: 200});
} catch (error) {
    return new Response('Failed add property', {status: 500})
}
}