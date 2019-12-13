const controller=require('./controller');

controller.add_company('E', 3, 1000, "0xfa5d3d4704ccafeaebe43fdba6ced9bef468c23e")

controller.query('A');
controller.query('B');

controller.transaction('A', 'B', 1);

controller.finance_bank('A', 5);

controller.return_money('A', 'B', 7);