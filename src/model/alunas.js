const mongoose = require ("mongoose");

const AlunasSchema = new mongoose.Schema ({
    nome: {type: String},
    nasceuEmSp: {type: Boolean},
    id: {type: Number},
    livros: [{
        titulo: String,
        leu: Boolean,
    }]
    

})