import ProfsData from './data.json';
const mongoose = require(mongoose);
const Prof = require('../models/prof');

const addProfs = async () => {
    ProfsData.map(profData => {
        let professor = await Prof.findOne({scholar_id: profData.scholar_id});
        try {
            if(!professor){
                const newProf = new Prof(profData);
                await newProf.save();
            }
        } catch (error) {
            console.error('Error');
        }
    })
};

module.exports = addProfs;