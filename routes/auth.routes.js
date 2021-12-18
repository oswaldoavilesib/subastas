const router = require("express").Router();
const User = require('../models/User.model')

const bycryptjs = require('bcryptjs')

/* GET signuop */
router.get("/signup", (req, res, next) => {

    res.render("auth/signup");
});

// POST signup page validate data
router.post("/signup", async (req, res, next) => {
    try{
        const {username,email,password,profile_pic,...rest} = req.body;
        if(!email || !password){
            res.render('auth/signup',{errorMessage:'No te hagas, llena bien los campos!'})
            return;
        }

        //Validación del password
        const regex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8})$/;
        if(!regex.test(password)){
            res.render('auth/signup',{errorMessage: "La contraseña debe tener una mayúscula, una minúscula, un número y un signo"});
            return;
        }

        const salt = bcryptjs.genSaltSync(10)
        const passHash = await bycriptjs.hashSync(password,salt);

        //CREAMOS AL USUARIO
        const user = await User.create({username,email,profile_pic,password:passHash})

        //Aquí vamos a pegar para que haga login después del registro y meterlo en automático a la app

        res.redirect('/login')

    }
    catch(error){
        console.log('ERROR EN POST DE SIGNUP',error)
        next(error)
    }

});

/* GET LOGIN FORM*/
router.get("/login", (req, res, next) => {
    res.render("auth/login");
});


//POST LOGIN
router.post("/login", async (req, res, next) => {
    //Necesitamos comparar el email y el password. Un método de mongo que es find. 
    try{
        const {email,password,...rest} = req.body;
        if(!email || !password){
            res.render('auth/login',{errorMessage:'No te hagas, llena bien los campos!'})
            return;
        }

        const user = await User.findOne({email})
        if(!user){
            res.render('auth/login',{errorMessage:'El correo o la contraseña no son válidas'})
            return; 
        }

        if(bcryptjs.compareSync(password,user.password)){
            req.session.user = user //Estamos guardando al usuario que se acaba de loggear
            res.redirect('/home')
        } else{
            res.render('auth/login',{errorMessage:'El correo o la contraseña no son válidas'})
            return; 
        }

    }
    catch(error){
        console.log('ERROR EN POST DE LOGIN',error)
        next(error)
    }


    router.get("/logout", (req, res, next) => {
        req.session.destroy();
        res.redirect('/login')
    });


});



module.exports = router;
