'use strict'

const RecentProduct = require('../models/recentproduct')
const User = require('../models/user')
const Product = require('../models/product')


function addRecentProduct(req, res) {
    User.findById(req.user, (err, user) => {
        if (err) return res.status(500).send({ message: err })
        if (!user) return res.status(404).send({ message: "no existe usuario" })
        if (user.role == "EMPRESA") {
                        var recentProduct = new RecentProduct({
                            user: user._id,
                            product: req.params.prod
                        })
                        recentProduct.save();
                        return res.status(201).send({ message: "Se ha añadido correctamente el producto reciente" })
                    }
                    else return res.status(403).send({ message: "No eres administrador" })
    })
}

function removeRecentProduct(req, res) {

    User.findById(req.user, (err, user) => {
        if (err) return res.status(500).send({ message: err })
        if (!user) return res.status(404).send({ message: "no existe usuario" })
        if (user.role) {
            RecentProduct.findOneAndDelete({ user: req.user, product: req.params.prod }, (err, not) => {
                if (err) res.status(500).send(`${err}`)
                else if (not) return res.status(201).send({ message: "Se ha eliminado correctamente el producto reciente" })
            })
        } else return res.status(403).send({ message: "No eres administrador" })
    })
}

function getRecentProduct(req, res) {
    RecentProduct.find({user: req.params.user, product: req.params.product}, (err, transport) => {
        if (err) return res.status(500).send({ message: err })
        if (!transport) return res.status(404).send({ message: "no existe transporte" })
        if (transport) return res.status(200).send({ transport })
    })
}


async function getAllRecentProducts(req, res) {
    RecentProduct.find({user : req.params.user}, (err, favprod) => {
        if (err) return res.status(500).send({ message: err })
        if (!favprod) return res.status(404).send({ message: "no existen transportes" })
        if (favprod){
            var auxList = [];
            getAllProductsAux(favprod).then(function(response){
                auxList = response;
                return res.status(200).send({message : auxList});
            })
        }            
    })
}

async function getAllProductsAux(favprod){
    return new Promise((resolve, reject) =>{
        var prodsId = [];
        for(var j = 0; j < favprod.length; ++j){
            prodsId.push(favprod[j].product);
        }
        Product.find({_id: {$in: prodsId}},(err,prods)=> {
            resolve(prods)
            });
    })
}


module.exports = {
    addRecentProduct,
    removeRecentProduct,
    getRecentProduct,
    getAllRecentProducts
}