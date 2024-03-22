import productModal from "../models/productModal.js";
import categoryModel from "../models/categoryModel.js";
import fs from 'fs';
import dotenv from "dotenv";
import slugify from "slugify";
import braintree from "braintree";
import orderModel from "../models/orderModel.js";
dotenv.config();

//payment gateway
var gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId:`${process.env.B_MERCHANT_ID}`,
    publicKey:`${process.env.B_PUBLIC_KEY}`,
    privateKey:`${process.env.B_PRIVET_KEY}`,
});

export const createProductController = async (req, res) => {
    try {
        const { name, slug, description, price, category, quantity, shipping } = req.fields;
        const { photo } = req.files;

        switch (true) {
            case !name:
                return res.status(500).send({ message: 'Name is required' });
            case !description:
                return res.status(500).send({ message: 'Desctription is required' });
            case !price:
                return res.status(500).send({ message: 'Price is required' });
            case !category:
                return res.status(500).send({ message: 'Category is required' });
            case !quantity:
                return res.status(500).send({ message: 'quantity is required' });
            case !photo && photo > 1000000:
                return res.status(500).send({ message: 'Photo is required and shoulld be less then 1mb' });

        }

        const products = new productModal({ ...req.fields, slug: slugify(name) });
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        }
        await products.save();
        res.status(201).send({
            success: true,
            message: "product created Successfully",
            products,
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in creating product",
        });
    }
}

//get All Product
export const getProductController = async (req, res) => {
    try {
        const products = await productModal.find({}).populate('category').select("-photo").limit(12).sort({ createdAt: -1 });
        res.status(200).send({
            success: true,
            totalCount: products.length,
            message: "All product",
            products,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in getting product',
            error: error.message
        })

    }
}

//get single product
export const getSingleProductController = async (req, res) => {
    try {

        const product = await productModal.findOne({ slug: req.params.slug }).populate('category').select("-photo").limit(12).sort({ createdAt: -1 });
        res.status(200).send({
            success: true,
            message: "Single product",
            product,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error while getting single product',
            error: error.message
        })

    }
}

//get photo
export const productPhotoController = async (req, res) => {
    try {
        const product = await productModal.findById(req.params.pid).select("photo");
        if (product.photo.data) {
            res.set('Content-type', product.photo.contentType);
            return res.status(200).send(
                product.photo.data
            )
        }

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error while getting product photo',
            error
        })
    }
}

//delete controller
export const deleteProductController = async (req, res) => {
    try {
        await productModal.findByIdAndDelete(req.params.pid).select("-photo");
        res.status(200).send({
            success: true,
            message: 'Product Deleted Successfully'
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error while deleting product',
            error
        })
    }
}

//update controller

export const updateProductController = async (req, res) => {
    try {
        const { name, slug, description, price, category, quantity, shipping } = req.fields;
        const { photo } = req.files;

        switch (true) {
            case !name:
                return res.status(500).send({ message: 'Name is required' });
            case !description:
                return res.status(500).send({ message: 'Desctription is required' });
            case !price:
                return res.status(500).send({ message: 'Price is required' });
            case !category:
                return res.status(500).send({ message: 'Category is required' });
            case !quantity:
                return res.status(500).send({ message: 'quantity is required' });
            case !photo && photo > 1000000:
                return res.status(500).send({ message: 'Photo is required and shoulld be less then 1mb' });

        }

        const products = await productModal.findByIdAndUpdate(req.params.pid, { ...req.fields, slug: slugify(name) }, { new: true });
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        }
        await products.save();
        res.status(201).send({
            success: true,
            message: "Product updated Successfully",
            products,
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in update product",
        });
    }
}

//Filter product
export const productFiltersController = async (req, res) => {
    try {
        const { checked, radio } = req.body;
        let args = {};
        if (checked.length > 0) args.category = checked;
        if (radio.length > 0) args.price = { $gte: radio[0], $lte: radio[1] };
        const products = await productModal.find(args);
        res.status(200).send({
            success: true,
            products,
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error while Filtering Product",
            error
        })
    }
}

//product count 
export const productCountController = async (req, res) => {
    try {
        const total = await productModal.find({}).estimatedDocumentCount();
        res.status(200).send({
            success: true,
            total,
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "error in product count",
            error,
        })
    }
}

//productt list based on page 
export const productListController = async (req, res) => {
    try {
        const perPage = 8;
        const page = req.params.page ? req.params.page : 1;
        const products = await productModal.find({}).select("-photo").skip((page - 1) * perPage).limit(perPage).sort({ createdAt: -1 });
        res.status(200).send({
            success: true,
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error in per page controller",
            error,
        })
    }
}

//Search product
export const searchProductController = async (req, res) => {
    try {
        const { keyword } = req.params;
        const results = await productModal.find({
            $or: [
                { name: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ]
        }).select("-photo");
        res.json(results);
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: true,
            message: "Error in Search Product API",
            error,
        });
    }
}

//Related product
export const relatedProductController = async (req, res) => {
    try {
        const { pid, cid } = req.params;
        const products = await productModal.find({
            category: cid,
            _id: { $ne: pid },
        }).select("-photo").limit(6).populate("category");
        res.status(200).send({
            success: true,
            products,
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: true,
            message: "Error while geting related product",
            error,
        })
    }
}

//category wise product
export const productCategoryController = async (req, res) => {
    try {
        const category = await categoryModel.findOne({ slug: req.params.slug });
        const products = await productModal.find({ category }).populate('category');
        res.status(200).send({
            success: true,
            category,
            products,
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: true,
            message: "Error while geting category wise product",
            error,
        })
    }
}

//payment controller
//token 
export const braintreeTokenController = async (req, res) => {
    try {
        gateway.clientToken.generate({}, function (err, response) {
            if (err) {
                res.status(500).send(err);
            }
            else {
                res.send(response);
            }
        });
    } catch (error) {
        console.log(error);
    }
}

//payment
export const braintreePaymentController = async (req, res) => {
    try {
        const { cart, nonce } = req.body;
        let total = 0;
        cart.map((i) => {
            total += i.price;
        });
        let newTransaction = gateway.transaction.sale({
            amount: total,
            paymentMethodNonce: nonce,
            options: {
                submitForSettlement: true
            }
        },
            function (error, result) {
                if (result) {
                    const order = new orderModel({
                        products: cart,
                        payment: result,
                        buyer: req.user._id
                    }).save()
                    res.json({ ok: true })
                }
                else {
                    res.status(500).send(error);
                }
            }
        )
    } catch (error) {
        console.log(error);
    }
}