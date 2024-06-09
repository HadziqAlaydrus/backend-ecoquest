const { query } = require("express");
const db = require("../config/db");

//get user
const getPickUp = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM pickup');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error( error);
        res.status(500).send('Internal server error');
    }
};

const createForm = async (req,res) => {
    try{
        const {nama, no_telp, alamat, tanggal_pengambilan, waktu_pengambilan, jenis_sampah, berat_sampah} = req.body;
        await db.query(
            'insert into pickup (nama, no_telp, alamat, tanggal_pengambilan, waktu_pengambilan, jenis_sampah, berat_sampah) values ($1, $2, $3, $4, $5, $6, $7)',
            [nama, no_telp, alamat, tanggal_pengambilan, waktu_pengambilan, jenis_sampah, berat_sampah]
        );
        res.status(201).send('Form Created')
    }catch(error) {
        console.error(error);
        res.status(500).send('Internal server error');

    }
}

const deletedFormById = async (req,res) => {
    try{
        const {id} = req.params;
        await db.query('delete from pickup where id = $1', [id]);
        res.status(200).send('Form Deleted');

    }catch (error){
        console.error(error);
        res.status(500).send('Internal server error')
    }
}

const getFormById = async (req,res) => {
    try{
        const {id} = req.params;
        const result = await db.query('select * from pickup where id = $1', [id]);
        if (result.rows.length > 0 ){
            res.status(200).json(result.rows[0]);
        } else{
            res.status(404).send('Form Not Found');
        }

    }catch(error){
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = {
    getPickUp,
    createForm,
    deletedFormById,
    getFormById
}