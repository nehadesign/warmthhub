const Product = require("../models/product");

// router.get('/product', controllerProduct.getAllProducts);
// router.get('/product/:id', controllerProduct.getProductById);
// router.post('/product', controllerProduct.addProduct);
// router.put('/product', controllerProduct.updateProduct);
// router.delete('/product:/id', controllerProduct.deleteProductById);

// Fetch all the records from the db,
// Todo: Put pagination
const getAllProducts = (req, res) => {
  Product.find().exec(function (err, productData) {
    if (err) {
      res.status(500).json({
        success: false,
        message: "Error occured",
        error: err,
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Records found",
      data: productData,
    });
  });
};

const getProductById = (req, res) => {
  if (req && req.params && req.params.id) {
    Book.findById(req.params.id).exec((err, productData) => {
      if (err) {
        res.status(500).json({
          success: false,
          message: "Record is not found or some error is occured",
          error: err,
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: "Record is found",
        data: productData,
      });
    });
  } else {
    res.status(400).json({
      success: false,
      message: "Record id is not passed, id is required for data fetch",
    });
  }
};

const deleteProductById = (req, res) => {
  if (req && req.params && req.params.id) {
    Book.findByIdAndRemove(req.params.id).exec((err, productData) => {
      if (err) {
        res.status(500).json({
          success: false,
          message: "Some error occured",
          error: err,
        });

        return;
      } else if (!productData) {
        res.status(404).json({
          success: false,
          message: "Record is not found",
          error: err,
        });
        return;
      }

      res.status(201).json({
        success: true,
        message: "Record deleted",
      });
    });
  } else {
    res.status(400).json({
      success: false,
      message: "Id is not passed",
    });

    return;
  }
};

module.exports = {
  getProductById,
  getAllProducts,
  deleteProductById,
};
