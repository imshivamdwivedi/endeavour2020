const mongoose = require('mongoose');
const User = require('./user');
const EVent = require('./event');

var transactionSchema = mongoose.Schema({
      ORDERID:{
          type:String,
          require:true
      },
      TXNID:{
          type:String,
          require:true
      },
      EVENT_ID:{
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'Event'
      },
      STATUS:{
          type:String,
          require:true
          
      },
      TXNAMOUNT:{
        type:Number,
        require:true
      },
      RESPCODE:{
        type:Number,
        require:true,
        min:1,
        max:4
      },
      CUST_ID:{
        type:String,
        require:true
      }
});

var Transaction = mongoose.model('Transaction',transactionSchema);

//Transaction.create({
 // ORDERID: 'ENDE201580823712',
  //TXNID: '20200204111212800110168137611833090',
  //TXNAMOUNT: '1.00',
  //PAYMENTMODE: 'UPI',
  //CURRENCY: 'INR',
  //TXNDATE: '2020-02-04 19:11:54.0',
  //STATUS: 'TXN_SUCCESS',
  //RESPCODE: '01',
  //RESPMSG: 'Txn Success',
  //GATEWAYNAME: 'PPBLC',
  //BANKTXNID: '003509187237',
  //IS_CHECKSUM_VALID: 'Y',
  //error: 'false',
  //CUST_ID: 'ENDVR209058936387'
//});

module.exports = Transaction;