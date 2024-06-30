import connectDB from '@/config/db';
import Property from '@/models/Property';

// GET /api/properties/:id
export const GET = async (request, { params }) => {
  try {
    await connectDB();
    console.log(params.id,'api properties')
    const property = await Property.findById(params.id);

    if (!property) return new Response('Property Not Found', { status: 404 });

    return new Response(JSON.stringify(property), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response('Something Went Wrong', { status: 500 });
  }
};