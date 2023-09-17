import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";
import orderModel from "../models/orderModel.js";


export const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address, question } = req.body;

        //validation
        if (!name) { return res.send({ message: "Name is Required" }) };
        if (!email) { return res.send({ message: "Email is Required" }) };
        if (!password) { return res.send({ message: "Password is Required" }) };
        if (!phone) { return res.send({ message: "Phone no. is Required" }) };
        if (!address) { return res.send({ message: "Address is Required" }) };
        if (!question) { return res.send({ message: "Sports name is Required" }) };

        //check user 
        const exisitingUser = await userModel.findOne({ email });
        //check for exisisting user
        if (exisitingUser) {
            return res.status(200).send({
                success: false,
                message: "Already Resister please login"
            });
        }

        //Register user
        const hashedPassword = await hashPassword(password);
        //save
        const user = await new userModel({ name, email, password: hashedPassword, phone, address, question }).save();
        res.status(201).send({
            success: true,
            message: "User Registration Successfully",
            user
        })


    } catch (error) {
        console.log("123")
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in registration",
            error
        });
    }
};

//POST LOGIN
export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        //Validation
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: "Invalid email or password"
            })
        }

        //Check User
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Email is not registerd"
            })
        }

        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(200).send({
                success: false,
                message: "Invalid Password"
            })
        }

        //Token
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        res.status(200).send({
            success: true,
            message: "Login Successfully",
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role,
            },
            token,
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in login',
            error
        });
    };
}


//Forgot password Controller
export const forgotController = async (req, res) => {
    try {
        const { email, newPassword, question } = req.body;
        if (!email) {
            return res.status(400).send({ success: false, message: "Email is required" });
        }
        if (!newPassword) {
            return res.status(400).send({ success: false, message: "New Password is required" });
        }
        if (!question) {
            return res.status(400).send({ success: false, message: "favorite sports is required" });
        }
        //CHECK 
        const user = await userModel.findOne({ email, question });

        //validation
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Wrong Email or Question"
            });
        }

        const hashed = await hashPassword(newPassword);
        await userModel.findByIdAndUpdate(user._id, { password: hashed });
        res.status(200).send({
            success: true,
            message: "Password reset Successfully",
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Something went wrong",
            error
        });
    }
};

//test controller 
export const testController = (req, res) => {
    try {
        res.send("Protected Routes")
    } catch (error) {
        console.log(error);
        res.send({ error });
    }
}

//profile update
export const updateProfileController = async (req, res) => {
    try {
        const { name, email, password, address, phone } = req.body;
        const hashedPassword = password ? await hashPassword(password) : undefined;
        const updatedUser = await userModel.findByIdAndUpdate(req.user._id, {
            name: name || user.name,
            password: hashedPassword || user.password,
            phone: phone || user.phone,
            address: address || user.address,
        }, { new: true });
        res.status(200).send({
            success: true,
            message: "Profile Updated Successfully",
            updatedUser,
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Something went wrong",
            error
        });
    }
}

//Orders Controller
export const getOrdersController = async (req, res) => {
    try {
        const orders = await orderModel
            .find({ buyer: req.user._id })
            .populate("products", "-photo")
            .populate("buyer", "name");
        res.json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error WHile Geting Orders",
            error,
        });
    }
};

//All Orders Controller
export const getAllOrdersController = async (req, res) => {
    try {
        const orders = await orderModel
            .find({})
            .populate("products", "-photo")
            .populate("buyer", "name")
            .sort({ createdAt: "-1" });
        res.json(orders);

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: true,
            message: "Error while Gettting Orders"
        })
    }
}

//order status
export const orderStatusController = async (req, res) => {
    try {
      const { orderId } = req.params;
      const { st } = req.body;
      console.log(st, orderId)
  
      const orders = await orderModel.findByIdAndUpdate(
        orderId,
        { status: st },
        { new: true }
      );
  
      if (!orders) {
        res.status(404).send({
          success: false,
          message: "Order not found",
        });
      } else {
        res.status(200).json(orders);
      }
    } catch (error) {
      console.error("Error updating order:", error);
      res.status(500).send({
        success: false,
        message: "Error while updating order status",
      });
    }
  };
  
