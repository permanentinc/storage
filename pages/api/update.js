import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export default async function handler(req, res) {
    if (req.method === 'POST') {
        return await createContainer(req, res);
    }
    else {
        return res.status(405).json({ message: 'Method not allowed', success: false });
    }
}

async function createContainer(req, res) {
    const body = req.body;
    try {
        const newEntry = await prisma.container.update({
            where: {
                id: body.id,
            },
            data: {
                name: body.name,
                location: body.location
            }
        });
        return res.status(200).json(newEntry, { success: true });
    } catch (error) {
        console.error("Request error", error);
        res.status(500).json({ error: "Error creating container", success: false });
    }
}