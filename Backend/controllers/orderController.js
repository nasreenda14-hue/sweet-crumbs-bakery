import Order from "../models/Order.js"

const createOrder=async (req,res)=>{
    try{
        const {name,phone,product,quantity,message}=req.body

        const newOrder=Order({
            name,
            phone,
            product,
            quantity,
            message
        })

        const savedOrder=await newOrder.save();

        res.status(201).json({
            message:"Order submitted successfully",
            order:savedOrder
        })
    }catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}

const getAllOrders=async (req,res)=>{
    try{
        const orders=await Order.find()

        res.status(200).json(orders)
    }catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}

// PUT /api/orders/:id/status
const updateStatus= async (req, res) => {
  try {
    const { status } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json(updatedOrder);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export {createOrder,getAllOrders,updateStatus}