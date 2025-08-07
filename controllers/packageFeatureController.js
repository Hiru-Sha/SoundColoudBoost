// controllers/packageFeatureController.js
const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

// Create a new feature
const createFeature = async (req, res) => {
    const { name, description } = req.body;

    try {
        const feature = await prisma.packageFeatures.create({
            data: {
                name,
                description,
            },
        });
        res.status(201).json(feature);
    } catch (error) {
        res.status(500).json({ error: "An error occurred while creating the feature." });
    }
};

// Get all features
const getFeatures = async (req, res) => {
    try {
        const features = await prisma.packageFeatures.findMany();
        res.status(200).json(features);
    } catch (error) {
        res.status(500).json({ error: "An error occurred while fetching features." });
    }
};

// Get single feature by ID
const getFeatureById = async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const feature = await prisma.packageFeatures.findUnique({
            where: { id },
        });

        if (!feature) {
            return res.status(404).json({ error: "Feature not found." });
        }

        res.status(200).json(feature);
    } catch (error) {
        res.status(500).json({ error: "An error occurred while fetching the feature." });
    }
};

// Update feature
const updateFeature = async (req, res) => {
    const id = parseInt(req.params.id);
    const { name, description } = req.body;

    try {
        const feature = await prisma.packageFeatures.update({
            where: { id },
            data: {
                name,
                description,
            },
        });
        res.status(200).json(feature);
    } catch (error) {
        res.status(500).json({ error: "An error occurred while updating the feature." });
    }
};

// Soft Delete feature
const deleteFeature = async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        await prisma.packageFeatures.delete({
            where: { id },
        });

        res.json({ message: "Feature deleted successfully." });
    } catch (error) {
        res.status(500).json({ error: "An error occurred while deleting the feature." });
    }
};

module.exports = {
    createFeature,
    getFeatures,
    getFeatureById,
    updateFeature,
    deleteFeature,
};
