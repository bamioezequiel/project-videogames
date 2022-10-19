import { Cart } from "../models/Cart" 
import { Order } from "../models/Cart" 

export const newOrder = async (req, res) => {
    const { id } = req.params;
    try {
        const cart = await Cart.findByPk(id);
        if(!cart.cart.length) { return res.status(400).send("The cart is empty") };
        const order = await Order.create({
            total: cart.total,
            cartId: id,
            userId: cart.userId
        });

        res.send(order);
    } catch (error) {
        res.status(404).send(`Error, route <New, NewOrder>: ${error}`);
    }
}
export const getOrder = async (req, res) => {
    const { userId, orderId, cartId } = req.query;
    try {
        let order = null;
        if(userId !== undefined) order = await Order.findOne({ where: { userId } });
        if(cartId !== undefined) order = await Order.findOne({ where: { cartId } });
        if(orderId !== undefined) order = await Order.findOne({ where: { id: orderId } });
    
        res.send(order);
    } catch (error) {
        res.status(404).send(`Error, route <Get, GetOrder>: ${error}`);
    }
}
export const patchStatusOrder = async (req, res) => {
    const { id } = req.params;
    const { status } = req.query;
    try {
        const order = await Order.findByPk(id);
        order.status = status;
        await order.save();
        res.send(order);
    } catch (error) {
        res.status(404).send(`Error, route <Patch, PatchOrder>: ${error}`);
    }
}
export const deleteOrder = (req, res) => {

}