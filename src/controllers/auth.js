const { response, request } = require('express')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')


const authCtrl = {}

const User = require('../models/user');
const helpersGoogle = require('../helpers/google_verify');


authCtrl.signIn = async (req = request, res = response) => {

    const { email, password } = req.body;

        const user = await User.findOne({ email })

        if(!user){
            return res.status(400).json({
                msj: `Usuario / Password no son correcto - email`
            })
        }

        if(!user.estado){
            return res.status(400).json({
                msj: `Usuario / Password no son correcto - estado: false`
            })
        }

        const validatorPassword = await bcryptjs.compareSync(password, user.password)
        if(!validatorPassword){
            return res.status(400).json({
                msj: `Usuario / Password no son correcto - password`
            })
        }


      const token = await jwt.sign({id: user.id}, 'secret', {
          expiresIn: 86400
      })

        res.json({
            user,
            token
        })


}

authCtrl.googleSignIn = async (req = request, res = response) => {

    const { id_token } = req.body;

    try {

        const { email, firstName, img } = await helpersGoogle.googleVerify(id_token);

        let user = await User.findOne({ email });

        if ( !user ) {
            const data = {
                firstName,
                email,
                password: '',
                img,
                google: true
            }

            user = new User(data);
            await user.save();
        }

        if( !user.estado ) {
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado'
            })
        }

        const token = await jwt.sign({id: user.id}, 'secret', {
            expiresIn: 86400
        })

        res.json({
            user,
            token
        });

    } catch (error) {

        res.status(400).json({
            ok: 'Token de Google no es válido'
        })

    }



}

module.exports = authCtrl