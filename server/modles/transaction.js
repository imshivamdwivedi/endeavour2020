const mongoose = require('mongoose');
const User = require('./user');
const EVent = require('./event');

var transactionSchema = mongoose.Schema({
      order_id:{
          type:String,
          require:true
      },
      head_id:{
          type:String,
          require:true
      },
      event_id:{
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'Event'
      },
      status:{
          type:Number,
          require:true
      },
      Txn_amount:{
        type:Number,
        require:true
      },
      created_at: {
        type: Date,
        default: Date.now()
      },
      updated_at: {
        type: Date,
        default: null
      }
});

var Transaction = mongoose.model('Transaction',transactionSchema);

Transaction.create({
    order_id:'123',
    head_id:'ENDVR199058933387',
    event_id:'76274387472847987982',
    status:'01',
    Txn_amount:'400'

});

module.exports = Transaction;