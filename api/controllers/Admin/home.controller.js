


const home = async (req, res) => {
    try {
      res.status(200).json({message:"home route" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  module.exports = home;