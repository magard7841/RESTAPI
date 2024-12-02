const Example = require('../models/exampleModel');

exports.getExamples = async (req, res) => {
    try {
        const examples = await Example.find();
        res.status(200).json(examples);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createExample = async (req, res) => {
    try {
        const newExample = new Example(req.body);
        await newExample.save();
        res.status(201).json(newExample);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
