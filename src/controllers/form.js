const { query } = require("express");
const db = require("../config/db");

//format date
const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString("en-CA", options);
};

//get user
const getPickUp = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM pickup');
        const formattedData = result.rows.map(item => ({
            ...item,
            tanggal_pengambilan: formatDate(item.tanggal_pengambilan),
            status: item.status || "Belum Diambil"
        }));
        res.status(200).json(formattedData);
    } catch (error) {
        console.error(error);
        res.status(500).send('Connection Error');
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
            const item = result.rows[0];
            item.tanggal_pengambilan = formatDate(item.tanggal_pengambilan);
            res.status(200).json(result.rows[0]);
        } else{
            res.status(404).send('Form Not Found');
        }

    }catch(error){
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

const updateStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        console.log(`Received request to update status for ID: ${id} to ${status}`);

        if (!['Belum Diambil', 'Sudah Diambil'].includes(status)) {
            console.error('Invalid status value');
            return res.status(400).send('Invalid status value');
        }

        const result = await db.query('UPDATE pickup SET status = $1 WHERE id = $2', [status, id]);
        if (result.rowCount > 0) {
            res.status(200).send("Status updated successfully");
        } else {
            res.status(404).send("Form Not Found");
        }
    } catch (error) {
        console.error('Error updating status:', error);
        res.status(500).send('Internal server error');
    }
};

module.exports = {
    getPickUp,
    createForm,
    deletedFormById,
    getFormById,
    updateStatus
}