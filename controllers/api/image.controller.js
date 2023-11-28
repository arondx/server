const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: 'dmyn7vpwh',
    api_key: '983264812428261',
    api_secret: 'zx22kz5ngWplR-sCJ-3U2D_MeCs',
  });

const uploadImage = async (req, res) => {
    try {
        // Upload the file to Cloudinary
        const dataUri = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`
        const result = await cloudinary.uploader.upload(dataUri, {
          resource_type: 'auto', // Detect the resource type automatically (image, video, etc.)
        });
    
        // Extract the public URL from the Cloudinary response
        const cloudinaryUrl = result.secure_url;
        const publicId = result.public_id;

        console.log(cloudinaryUrl)
        console.log('Public ID:', publicId);
        // Send the Cloudinary URL in the response
        res.json({ cloudinaryUrl, publicId });
      } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        res.status(500).send('An error occurred while uploading to Cloudinary');
      }
}

const deleteImage = async (req, res) => {
    const toDelete = req.body.publicId
    if (toDelete) {
      cloudinary.api.delete_resources(toDelete, (error, result) => {
        if (error) {
          res.status(500).json({ "message": `${error}` })
        } else {
          res.status(200).json({ result })
        }
      })
    } else {
      res.status(400).json({ "mesagge": "Public id is required." })
    }
  }

  module.exports = { uploadImage, deleteImage }