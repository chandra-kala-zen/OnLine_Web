import ImagesModel from '@/models/image';
import connect from '@/utils/db';
import { NextResponse } from 'next/server';

// Connect to the database
const connectToDatabase = async () => {
    await connect();
};

// POST action for uploading an image
export async function POST(request: Request) {
    await connectToDatabase();
    const { Image } = await request.json(); // Assuming you're sending the image URL or path

    if (!Image) {
        return NextResponse.json({ message: 'Image is required.' }, { status: 400 });
    }

    try {
        const newImage = new ImagesModel({ Image });
        const savedImage = await newImage.save();
        return NextResponse.json(savedImage, { status: 201 });
    } catch (error) {
        console.error('Error saving image:', error);
        return NextResponse.json({ message: 'Error saving image.' }, { status: 500 });
    }
}

// GET action for fetching all images
export async function GET() {
    await connectToDatabase();

    try {
        const images = await ImagesModel.find({});
        return NextResponse.json(images, { status: 200 });
    } catch (error) {
        console.error('Error fetching images:', error);
        return NextResponse.json({ message: 'Error fetching images.' }, { status: 500 });
    }
}
