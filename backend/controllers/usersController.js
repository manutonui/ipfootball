const User = require('../models/User')
const jwt = require('jsonwebtoken')
const dateFormat = require('dateformat');
const shortCode = process.env.MPESA_SHORTCODE
const amount = process.env.AMOUNT

const loginUser = async (req, res) => {
    const {identity, password} = req.body // deconstruct id & pwd from req
    try {
        const user = await User.login(identity, password) // login()
        const token = createToken(user._id)
        res.status(200).json({identity,token,duedate: user.duedate})
    } catch (e) { console.log(e);res.status(400).json({error: e.message}) }
}
// update last login

const signupUser = async (req, res) => {
    const {identity, password} = req.body
    try {
        const user = await User.signup(identity, password)
        const token = createToken(user._id) // for auto login on signup
        res.status(200).json({identity,token,duedate:user.duedate})
    } catch (e) { res.status(400).json({error: e.message}) }
}

const subscribe = async (req, res) => {
    // let user = await User.findOne({_id:req.user_id})
    // if (user.type == 'public') {
        // initiate stk push
        const {phone} = req.body
        
        try {
            const transaction = await stkRequest(phone)

            if (transaction) {
                if (transaction.ResponseCode) {
                    if (transaction.ResponseCode === '0') {
                        console.log("4. STK dispatched [ok]")
                        res.status(200).json({
                            tx: transaction.CheckoutRequestID,
                            msg: 'Request sent'
                        })
                    } else {
                        console.log("10. Other STK dispatch response [error]")
                    }
                }
                if (transaction.errorCode) {
                    console.log("400. STK dispatch [error]")
                    res.status(400).json({error: transaction.errorMessage})
                }
            }


            console.log("TX Details: ", transaction)
        } catch (e) {
            console.log("Network Error. Try again")
            // console.log("Error details: ", e)
            res.status(400).json({error: "Network Error. Retry."})
        }
    
}

const checkPayment = async (req, res) => {
    const {code} = req.body
    try {
        const stkquery = await queryStk(code)
        if (stkquery) {
            if (stkquery.errorCode) {
                console.log("400. STK Query [error]")
                // console.log('Networkk error. Try again')
                res.status(400).json({error: stkquery.errorMessage})
            }
            if (stkquery.ResponseCode) {
                if (stkquery.ResponseCode === '0') {
                    if (stkquery.ResultCode) {
                        if (stkquery.ResultCode === '0') {
                            // change status in db to sub - find and update user
                            try {
                                const dueby = new Date()
                                dueby.setDate(dueby.getDate()+30)
                                const user = await User.findOneAndUpdate({_id:req.user_id}, {duedate:dueby}, {new: true})
                                // response
                                res.status(200).json({
                                    msg: stkquery.ResultDesc,
                                    code: stkquery.ResultCode,
                                    user: { duedate: user.duedate }
                                })
                            } catch (e) {
                                res.status(400).json({error: e.message})
                            }
                        } else { // not success
                            res.status(200).json({ msg: stkquery.ResultDesc, code: stkquery.ResultCode})
                        }
                    }
                }
            }
        }

    } catch (e) {
        res.status(400).json({error: "Network error"})
    }
}

const fetchUsers = async (req, res) => {
    const users = await User.find()
    res.status(200).json(users)
}

const getAuth = async () => {
    const string = process.env.CONSUMER_KEY+':'+process.env.CONSUMER_SECRET
    const bufferObj = Buffer.from(string, 'utf8') // converts the string to hex
    const base64string = bufferObj.toString("base64") // to cipher
    const response = await fetch('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', {
        headers: {'Authorization': 'Basic '+base64string}
    })
    const token = await response.json()
    console.log("1. Access Token [ok]")
    return token
}

const stkRequest = async (phone) => { // ensure stk push is successful, retry if failed
    const params = await stkParams()
    console.log("2. STK Auth params [ok]")
    const request = {
        BusinessShortCode: shortCode,
        Password: params.password,
        Timestamp: params.timestamp,
        TransactionType: 'CustomerPayBillOnline',
        Amount: amount,
        PartyA: phone,
        PartyB: shortCode,
        PhoneNumber: phone,
        CallBackURL: 'https://ipfootball.xyz/stk',
        AccountReference: 'IPFootball Premium',
        TransactionDesc: 'Premium channel service'
    }

    const response = await fetch('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
	        'Authorization': 'Bearer '+params.token
        },
        body: JSON.stringify(request)
    })

    if (!response.ok) {
        console.log("500. STK Fecth [error]")
    }

    const stkJsonResponse = await response.json()
    console.log("3. STK dispatch response [ok]")
    return stkJsonResponse
}

const stkParams = async () => {
    const timestamp = dateFormat(new Date(), 'yyyymmddHHMMss')
    const authToken = await getAuth()
    const passKey = process.env.PASS_KEY
    const string = shortCode+passKey+timestamp
    const bufferObj = Buffer.from(string, 'utf8') // string to hex
    const password = bufferObj.toString("base64") // to cipher
    return {
        token: authToken.access_token,
        timestamp,
        password
    }
}

const queryStk = async (transaction) => {
    const params = await stkParams()
    const request = {
        BusinessShortCode: shortCode,
        Password: params.password,
        Timestamp: params.timestamp,
        CheckoutRequestID: transaction
    }
    const response = await fetch('https://sandbox.safaricom.co.ke/mpesa/stkpushquery/v1/query', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
	        'Authorization': 'Bearer '+params.token
        },
        body: JSON.stringify(request)
    })
    const json = await response.json()
    return json
}


// returns jwt token of signs user id with a secret key
const createToken = (user_id) => jwt.sign({id: user_id }, process.env.SECRET, {expiresIn: '3d'})

module.exports = { loginUser, signupUser, subscribe, fetchUsers, checkPayment }