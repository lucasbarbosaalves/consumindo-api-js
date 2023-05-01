async function buscaEndereco(cep) {
    const mensagemErro = document.getElementById('erro')
    mensagemErro.innerHTML = "";
  try {
    const consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const consultaConvertida = await consultaCEP.json();
    if (consultaConvertida.erro) {
        throw Error('CEP não existente')
    }
    const cidade = document.getElementById('cidade');
    const logradouro = document.getElementById('endereco');
    const estado = document.getElementById('estado');

    cidade.value = consultaConvertida.localidade;
    logradouro.value = consultaConvertida.logradouro;
    estado.value = consultaConvertida.uf;

    console.log(consultaConvertida);
    return consultaConvertida
  } catch (erro) {
    mensagemErro.innerHTML = `<p> CEP inválido. Tente novamente </p>`
    console.log(erro);
  }
}

const cep = document.getElementById('cep');
cep.addEventListener("focusout", () => buscaEndereco(cep.value)); //focusout - evento quando é tirado o clique do campo
 