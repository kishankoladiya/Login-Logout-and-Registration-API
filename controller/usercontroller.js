var usermodel = require('../model/usermodel');
const storage = require('node-persist');

// var login_status=0;

exports.register = async (req,res) => {

    var data = await usermodel.find({"email" : req.body.email});

    if(data.length!=0){
        res.status(200).json({
            status:"user is alredy register"
        })
    }else{
        usermodel.create(req.body);

        res.status(200).json({
            status:"user successful register"
        })
    }
   
}

exports.login = async (req,res) => {

    var data = await usermodel.find({"email" : req.body.email});

    // if(login_status==0){

        if(data.length!=0)
        {
            if(data[0].password==req.body.password)
             {
                await storage.init();
                var id = await storage.getItem('user_id');

                if(id != undefined){
                    res.status(200).json({
                        status: "user is already login"
                    });
                }else{ 
                    await storage.setItem('user_id', data[0].id);
                    res.status(200).json({
                        status:"login Successfully."
                    })
                }
            }
            else
            {
                res.status(200).json({
                    status:"plz Check Your email and password."
                })
            }
        }
        else
        {
            res.status(200).json({
                status:"Plz Check Your email and password."
            })
        }

    // }
    // else
    // {
    //     res.status(200).json({
    //         status:"user is alredy login."
    //     })
    // }

    

}

exports.logout = async (req,res) => {

    // login_status=1;

    await storage.init();
    await storage.clear();

    res.status(200).json({
        status:"user logout Successfully."
    })
    
}

exports.select = async (req,res) => {

    var data = await usermodel.find();

    res.status(200).json({
        status:"success",
        data
    })
}