const RechargeModel = require("../../models/recharge_model");
const UserModel = require("../../models/add_user_model");
const currentDate = require("../Others/current_date");
const sendGmail = require("../Others/send_gmail");
const recharge = async (req, res) => {
  try {
    const { rfid, amount } = req.query;
    // if ("alvas123" !== key) {
    //   return res.status(401).json({ error: "invalid key" });
    // }
    const [isUserExists] = await UserModel.find(
      { rfid },
      { _id: 1, balance: 1 }
    );
    if (!isUserExists) {
      return res.status(404).json({ error: "user not found" });
    }

    const { date, time } = currentDate();
    await UserModel.updateOne(
      { rfid },
      {
        $set: {
          balance: Number(isUserExists.balance) + Number(amount),
        },
      }
    );
    const userRechargeHistory = new RechargeModel({
      userId: isUserExists._id.toString(),
      date,
      time,
      amount: Number(amount),
    });
    await userRechargeHistory.save();
    res.status(200).json({ message: "recharge successfull" });
  } catch (error) {
    // await sendGmail(
    //   "magowtham7@gmail.com",
    //   null,
    //   `In recharge.js file ${error.name} was occurred due to ${error.message}`
    // );
    console.log(error);
    return res.status(500).json({ error: "server error" });
  }
};

module.exports = recharge;
