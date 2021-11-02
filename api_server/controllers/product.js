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

const getProductsByCategory = (req, res) => {
  console.log("Category : ", req.params.category);
  if (req && req.params && req.params.category) {
    Product.find({ category: req.params.category }).exec((err, productData) => {
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

const getProductById = (req, res) => {
  if (req && req.params && req.params.id) {
    Product.findById(req.params.id).exec((err, productData) => {
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
    Product.findByIdAndRemove(req.params.id).exec((err, productData) => {
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

const addProduct = (req, res) => {
  if (req) {
    console.log("Body ", req.body);
    console.log("Image ", req.body.productImages);
    if (!req.body.name) {
      res.status(400).json({
        success: false,
        message: "Name is required",
      });
    } else {
      if (!req.body.category) {
        res.status(400).json({
          success: false,
          message: "Category is required",
        });
      } else {
        if (!req.body.price) {
          res.status(400).json({
            success: false,
            message: "Price is required",
          });
        } else {
          if (!req.body.description) {
            res.status(400).json({
              success: false,
              message: "Decription is required",
            });
          } else {
            Product.create(
              {
                name: req.body.name,
                category: req.body.category,
                price: req.body.price,
                description: req.body.description,
                hidden: req.body.hidden,
                comments: req.body.comments,
                inventory: req.body.inventory,
                productImages: req.body.productImages,
                size: req.body.size,
                color: req.body.color,
                rating: req.body.rating,
              },
              (err, productData) => {
                if (err) {
                  res.status(400).json({
                    success: false,
                    message: "Failure in creating record",
                    error: err,
                  });
                  return;
                } else {
                  res.status(201).json({
                    success: true,
                    message: "Record is created",
                    data: productData,
                  });
                }
              }
            );
          }
        }
      }
    }
  }
};

module.exports = {
  getProductById,
  getAllProducts,
  deleteProductById,
  addProduct,
  getProductsByCategory,
};
