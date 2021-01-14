const express = require('express');
const mongoose = require('mongoose');

const faqSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    video_uri: {
      type: String,
    },
  },
  { timestamps: true }
);

const Faq = mongoose.model('faq', faqSchema);

const router = express.Router();

// Get all Items
router.get('/', async (req, res, next) => {
  try {
    const result = await Faq.find();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

// Get Single Item
router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await Faq.findOne({ _id: id });
    res.json(result);
  } catch (error) {
    next(error);
  }
});

// Add Item
router.post('/', async (req, res, next) => {
  try {
    const doc = new Faq(req.body);
    const result = await doc.save();
    res.json(result);
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(422);
    }
    next(error);
  }
});

// Update Item
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Faq.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
      omitUndefined: true,
    });
    res.json(result);
  } catch (error) {
    next(error);
  }
});

// Delete Item
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Faq.deleteOne({ _id: id });
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
