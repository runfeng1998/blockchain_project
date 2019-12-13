pragma solidity ^0.4.2;

/// @title 委托投票
contract finance {

    struct company {
        string name;
        uint id;
    }


    struct owe {
        address company;
        uint money;
    }
    
    struct list {
        owe[] owes;
    }

    
    mapping(uint => address) get_address_by_id;
    mapping(string => address) get_address_by_name;
    mapping(address => list ) from;
    mapping(address => list ) to;
    mapping(address => uint) public credit;
    
    function add_company(string name, uint id, uint score, address addr) public returns (uint state){
        get_address_by_id[id]=addr;
        get_address_by_name[name]=addr;
        credit[addr]=score;
        state=1;
    }


    address public chair_bank;
    
    constructor ()public {
        chair_bank=msg.sender;
    }

    function query(string name) public view returns (uint can_pay) {
        require(get_address_by_name[name]!=address(0));
        address x=get_address_by_name[name];
        uint sum=0;
        for(uint i=0; i<from[x].owes.length; i++) {
            uint owe_money=from[x].owes[i].money;
            sum+=owe_money;
        }
        for(i=0; i<to[x].owes.length; i++) {
            uint give_money=to[x].owes[i].money;
            sum-=give_money;
        }
        can_pay=sum+credit[x];//can_pay always greater than 0
    }

    //交易 A owe B money
    function transaction(string from_name, string to_name, uint owe_money) public returns(string state){
        require(get_address_by_name[from_name]!=address(0));
        require(get_address_by_name[to_name]!=address(0));
        address from_com=get_address_by_name[from_name];
        address to_com=get_address_by_name[to_name];
        from[to_com].owes.push(owe({
            company:from_com,
            money:owe_money
        }));
        to[from_com].owes.push(owe({
            company:to_com,
            money:owe_money
        }));
        state=from_name;
    }

    //转让



    //向银行融资
    function finance_bank(string name, uint owe_money) public returns(string from_com, uint begin, uint _after){
        require(get_address_by_name[name]!=address(0));
        uint can_pay=query(name);
        require(can_pay > owe_money, "score too low");
        address com=get_address_by_name[name];
        begin=query(name);
        from[chair_bank].owes.push(owe({
            company:com,
            money:owe_money
        }));
        to[com].owes.push(owe({
            company:chair_bank,
            money:owe_money
        }));
        from_com=name;
        _after=query(name);
    }
    

    //结算
    function return_money(string from_name, string to_name, uint owe_money) public returns(string state){
        require(get_address_by_name[from_name]!=address(0));
        require(get_address_by_name[to_name]!=address(0));
        address from_com=get_address_by_name[from_name];
        address to_com=get_address_by_name[to_name];
        from[from_com].owes.push(owe({
            company:to_com,
            money:owe_money
        }));
        to[to_com].owes.push(owe({
            company:from_com,
            money:owe_money
        }));
        state=from_name;
    }
}