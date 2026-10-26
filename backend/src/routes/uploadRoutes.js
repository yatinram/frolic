const express = require('express');
const router = express.Router();
const upload = require('../middlewares/uploadMiddleware');
const { authenticate } = require('../middlewares/authMiddleware');
const { successResponse, errorResponse } = require('../utils/responseFormatter');

// POST /api/upload - Single File Upload
router.post('/', upload.single('file'), (req, res, next) => {
  try {
    if (!req.file) {
      return errorResponse(res, 'No file uploaded', 400);
    }

    const fileUrl = `/uploads/${req.file.filename}`;
    return successResponse(res, {
      url: fileUrl,
      filename: req.file.filename,
      originalName: req.file.originalname,
      size: req.file.size,
      mimetype: req.file.mimetype,
    }, 'File uploaded successfully', 201);
  } catch (error) {
    next(error);
  }
});

// POST /api/upload/multiple - Multi-File Upload
router.post('/multiple', upload.array('files', 10), (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      return errorResponse(res, 'No files uploaded', 400);
    }

    const files = req.files.map((file) => ({
      url: `/uploads/${file.filename}`,
      filename: file.filename,
      originalName: file.originalname,
      size: file.size,
      mimetype: file.mimetype,
    }));

    return successResponse(res, files, `${files.length} files uploaded successfully`, 201);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
