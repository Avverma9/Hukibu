const enquiryModel=require("../Models/enquiriesModel")


const createEnquiry = async function (req, res) {
  try {
    const { message } = req.body;
    const { id } = req.params; 

    const existingEnquiry = await enquiryModel.findById(id);

    if (!existingEnquiry) {
      return res.status(404).json({ error: 'Enquiry not found' });
    }

    existingEnquiry.message = message;
    await existingEnquiry.save();

    const updatedEnquiries = await enquiryModel.find({});
    res.json(updatedEnquiries);
  } catch (error) {
    console.error('Error updating enquiry:', error);
    res.status(500).json({ error: 'Failed to update enquiry' });
  }
};
  
  const getEnquiry = async function (req, res) {
    try {
      const getData = await enquiryModel.find();
      res.json(getData);
    } catch (error) {
      console.error('Error fetching enquiries:', error);
      res.status(500).json({ error: 'Failed to fetch enquiries' });
    }
  };
  
  const deleteEnquiry = async function (req, res) {
    try {
      const { id } = req.params;
      await enquiryModel.findByIdAndDelete(id);
  
      // Fetch the updated list of enquiries after deletion
      const updatedData = await enquiryModel.find();
  
      res.status(200).json(updatedData);
    } catch (error) {
      console.error('Error deleting enquiry:', error);
      res.status(500).json({ error: 'Failed to delete enquiry' });
    }
  };

module.exports={createEnquiry,getEnquiry,deleteEnquiry}