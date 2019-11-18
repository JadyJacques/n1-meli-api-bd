const mongoose = require('mongoose');

const AlunasSchema = new mongoose.Schema({
    nome: {type: String},
    dateOfBirth: {type: String},//date
    nasceuEmSp: {type: String},//bollean
    livros:[{
        _id:false,
        titulo: String,
        leu: String
}]},{
versionKey: false
})
//ex: para consumir devemos chamar como alunas
const Alunas = mongoose.model('Alunas', AlunasSchema)

module.exports = Alunas

//exemplo de schema com campos obrigatórios
//var sampleSchema = new Schema({ name: { type: String, required: true } });