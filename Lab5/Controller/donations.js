const donationService = require('../Service/donations');
const APIError = require('../helpers/APIError');

const createDonation = async (req, res) => 
{
    const { amount } = req.body;
    let session;
    try 
    {
        session = await donationService.createPaymentSessionFromProvider(amount);
    } catch (error) 
    {
        throw new APIError("service unavailable", 503);
    }
    const donationData = {
        sessionId: session._id,
        orderId: session.paymentParams.order,
        amount: session.paymentParams.amount,
        sessionURL: session.sessionUrl,
    }
    const donation = await donationService.createDonation(donationData);

    res.status(200).json({
        message: "Donation Link created successfully",
        Data: {
            sessionURL: donation.sessionURL,
        }
    });
};


const webhook = async (req, res) => 
{
    const { data, event } = req.body;
    const kashierSignature = req.header('x-kashier-signature');
    const isValid = donationService.handelWebhook(data, kashierSignature);
    if (!isValid) 
    {
        throw new APIError("invalid signature", 400);
    }

    await donationService.updateDonationStatus(req.body);

    res.status(200).json({
        message: "Webhook received successfully",
    });
};

module.exports = {
    createDonation,
    webhook
};
