//const alunas = require("../model/alunas.json")

const Alunas = require("../model/alunas");

const fs = require('fs');

exports.get = (req, res) => {
  // console.log(req.url)
  // res.status(200).send(alunas)
  Alunas.find(function(err, alunas){//funcao call back - retorno de documento
    if (err) res.status(500).send(err)
    res.status(200).send(alunas)
  })
}
exports.get = (req, res) => {
  Alunas.find((err, alunas) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).send(alunas);
  });
}

exports.getById = (req, res) => {
  const id = req.params.id
  Alunas.findById(id, (err, aluna) => {
    if (err) return res.status(500).send(err);
    if (!aluna) {
      return res.status(500).send({ message: `Não localizei a aluna de id ${id}` });
    }
    res.status(200).send(aluna);
  });
}

exports.getBooks = (req, res) => {
  const id = req.params.id;
  Alunas.findById(id, (err, aluna) => {
    if (err) return res.status(500).send(err);

    if (!aluna) {
      return res.status(500).send({ message: `Não localizei a aluna de id ${id}` });
    }

    const livrosAluna = aluna.livros;
    const livrosLidos = livrosAluna.filter(livro => livro.leu == "true");
    const tituloLivros = livrosLidos.map(livro => livro.titulo);
    res.status(200).send(tituloLivros);
  });
}

exports.getSp = (req, res) => {
  // const nasceuSp = alunas.filter(aluna => aluna.nasceuEmSp == "true")
  Alunas.find({"nasceuEmSp": true}, (err, paulistas) => {
    if (err) res.status(500).send(err);
    const meninasSp = paulistas.map(aluna => aluna.nome);
    console.log(paulistas);
    res.status(200).send(meninasSp);
  });
}

exports.getAge = (req, res) => {
  const id = req.params.id;
  Alunas.findById(id, (err, aluna) => {
    if (err) return res.status(500).send(err);
    if (!aluna) {
      return res.status(500).send({ message: `Não localizei a aluna de id ${id}` });
    }
    const dataNasc = aluna.dateOfBirth
    const arrData = dataNasc.split("/")
    const dia = arrData[0]
    const mes = arrData[1]
    const ano = arrData[2]
    const idade = calcularIdade(ano, mes, dia)
    res.status(200).send({ idade })
  })
}  

function calcularIdade(anoDeNasc, mesDeNasc, diaDeNasc) {
  const now = new Date()
  const anoAtual = now.getFullYear()
  const mesAtual = now.getMonth() + 1
  const hoje = now.getDate()

  let idade = anoAtual - anoDeNasc

  if (mesAtual < mesDeNasc || (mesAtual == mesDeNasc && hoje < diaDeNasc)) {
    idade -= 1
  }
  return idade
}

/*
exports.getById = (req, res) => {
  const id = req.params.id
  if (id > 34 || id <= 0) {
    res.redirect(301, "https://en.wikipedia.org/wiki/Man-in-the-middle_attack")
  }
  res.status(200).send(alunas.find(aluna => aluna.id == id))
}

exports.getBooks = (req, res) => {
  const id = req.params.id
  const aluna = alunas.find(aluna => aluna.id == id)
  if (!aluna) {
    res.send("Nao encontrei essa garota")
  }
  const livrosAluna = aluna.livros
  const livrosLidos = livrosAluna.filter(livro => livro.leu == "true")
  const tituloLivros = livrosLidos.map(livro => livro.titulo)
  res.send(tituloLivros)
}
  //const nasceuSp = alunas.filter(aluna => {
    //console.log(aluna)
   // return aluna.nasceuEmSp == "true"
  
 // const meninasSp = nasceuSp.map(aluna => aluna.nome)

exports.getSp = (req, res) => {
  Alunas.find({"nasceuEmSp": "true"},(function(err, alunas){
    if (err) res.status(500).send(err)
 
    res.status(200).send(alunas)
  })
)}
  



exports.getAge = (req, res) => {
  const id = req.params.id
  const aluna = alunas.find(item => item.id == id)
  const dataNasc = aluna.dateOfBirth
  const arrData = dataNasc.split("/")
  const dia = arrData[0]
  const mes = arrData[1]
  const ano = arrData[2]
  const idade = calcularIdade(ano, mes, dia)
  res.status(200).send({ idade })
}


function calcularIdade(anoDeNasc, mesDeNasc, diaDeNasc) {
  const now = new Date()
  const anoAtual = now.getFullYear()
  const mesAtual = now.getMonth() + 1
  const hoje = now.getDate()

  let idade = anoAtual - anoDeNasc

  if (mesAtual < mesDeNasc || (mesAtual == mesDeNasc && hoje < diaDeNasc)) {
    idade -= 1
  }
  return idade
}

*/


exports.post = (req, res) => {
  let aluna = new Alunas(req.body)

  aluna.save(function(err){
    if(err) res.status(500).send(err)

    res.status(201).send(aluna)

  })
}
/*
exports.post = (req, res) => { 
  const { nome, dateOfBirth, nasceuEmSp, id, livros } = req.body;
  alunas.push({ nome, dateOfBirth, nasceuEmSp, id, livros });

  fs.writeFile("./src/model/alunas.json", JSON.stringify(alunas), 'utf8', function (err) {
    if (err) {
      return res.status(500).send({ message: err });
    }
    console.log("The file was saved!");
  }); 

  return res.status(201).send(alunas);
}
*/


exports.postBooks = (req,res) => {
const alunaId = req.params.id

Alunas.findById(alunaId, function(err,aluna){//retorna apenas uma aluna conforme o id da aluna
  if (err) return res.status(500).send(err.message)//

  if(!aluna){
    return res.status(200).send({message: `Infelizmente nao localizei essa garota`})
  }
  
  const livro = req.body;//pega os valores da requisição 
  (aluna.livros).push(livro);// insere os livros da requisição aqui
  
  aluna.save(function(err){ //aqui ele salva os novos livros mas mantem tudo o que tinha
    if (err) res.status(500).send(err) // manda erro
    res.status(201).send(aluna)
  })
})}



// let aluna = new Alunas(req.body)
// aluna,save(function(err){
//   if(err) res.status(500).send(err)
//   res.status(201).send(aluna)
// })


// exports.postBooks = (req, res) => {
//   const id = req.params.id
//   const aluna = alunas.find(aluna => aluna.id == id)
//   if (!aluna) {
//     res.send("Nao encontrei essa garota")
//   }
//   const { titulo, leu } = req.body;
//   alunas[aluna.id - 1].livros.push({ titulo, leu });
  
//   fs.writeFile("./src/model/alunas.json", JSON.stringify(alunas), 'utf8', function (err) {
//     if (err) {
//         return res.status(500).send({ message: err });
//     }
//     console.log("The file was saved!");
//   });

//   res.status(201).send(alunas[aluna.id - 1].livros);}