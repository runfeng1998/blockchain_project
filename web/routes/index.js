var express=require('express');
var bodyParser=require('body-parser')

var router=express.Router();
var urlParser=bodyParser.urlencoded({extended:false});

const controller=require('../../nodejs-sdk/packages/cli/controller');

router.get('/*', function(req, res, next) {
    var array=[1, 2, 3]
    res.render('main',{msg:'default message'})
})

router.post('/query', urlParser, function(req, res, next) {
    console.log("query");
    console.log(req.body.company);
    msg='company '+req.body.company+"'s score is "
    controller.query(req.body.company)
    .then(
        result => {
            console.log(result);
            console.log("post query", result);
            res.render('main', {msg:msg+result.toString()});
        }
    )
    .catch(
        err => {
            console.log(err);
        }
    )

})

router.post('/transaction', urlParser, function(req, res, next) {
    console.log('transaction')
    console.log(req.body)
    var msg=req.body.A_com+" transaction "+req.body.B_com + " "+req.body.money;
    controller.transaction(req.body.A_com, req.body.B_com, Number(req.body.money))
    .then(
        result => {
            console.log(result);
            console.log("post transaction");
            res.render('main', {msg:msg+' and transaction successful'});
        }
    )
    .catch(
        err => {
            console.log(err);
            res.render('main', {msg:msg+' and transaction fail'});
        }
    )
})

router.post('/finance', urlParser, function(req, res, next) {
    console.log('finance')
    var msg=req.body.A_com+" company finance from bank " +req.body.money;
    controller.finance_bank(req.body.A_com, Number(req.body.money))
    .then(
        result => {
            console.log("post finance bank");
            res.render('main', {msg:msg+' and finance from bank successful'});
        }
    )
    .catch(
        err => {
            console.log(err);
            res.render('main', {msg:msg+' and finance from bank fail'});
        }
    )
})

router.post('/pay_bill', urlParser, function(req, res, next) {
    console.log('pay_bill')
    var msg=req.body.A_com+" pay bill to "+req.body.B_com + " "+req.body.money;
    controller.return_money(req.body.A_com, req.body.B_com, Number(req.body.money))
    .then(
        result => {
            console.log("post return money");
            res.render('main', {msg:msg+' and pay bill successful'});
        }
    )
    .catch(
        err => {
            console.log(err);
            res.render('main', {msg:msg+' and pay bill fail'});
        }
    )
})

module.exports=router;