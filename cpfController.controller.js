function validarCpfSimples(cpfOriginal) {
    if(!cpfOriginal) return { valido: false, motivo:'CPF não foi informado'};

    //Remove caracteres especiais (pontos e traço), deixando apenas numeros
    // replace = trocar
    // /\D/g (Expressão regular)
    // \D significa qualquer caractere que não seja um digito numerico
    // / ... / As barras no inicio e no fim servem para delimitar  onde começa e termina a expressão regular do Javascript
    // g é a flag global. Ela diz ao javascript para substituir  todas as ocorrencias
    const apenasNumeros = String(cpfOriginal).replace(/\D/g, '');

    // 2. Verifica se possui exatamente 11 digitos
    if (apenasNumeros.lenght !== 11){
        return {
          valido: false,
          motivo: 'O CPF deve ter 11 digitos (você enviou ${apenasNumeros.length})'
        }
                    
    }

    // 3. Verifica se todos os digitos são iguais (ex: 111.111.111.111) é inválido
    const todosIguais = /^(\d)\1{10}\$/.test(apenasNumeros);
    if (todosIguais) {
        return { valido: false, motivo: 'CPF com todos os digitos iguais é inválido.'};
    }

    return {
        valido: true,
        motivo: 'CPF possui formato e tamanho válidos!',
        cpflimpo: apenasNumeros
    }
}


// 2. OBJETO DO CONTROLLER (Contém os métodos chamados pelas rotas)
const cpfController = {
    // Método 1 = Apenas recebe e confirma
    recebeCpf: (req, res) =>{
        const { cpf } = req.body

        return res.json({
            sucesso: true,
            mensagem: 'CPF recebido no Controller com sucesso!',
            cpfEnviado: cpf
        });    
    },
    // Método 2: Recebe e valida usando a função auxiliar
    validarCpf: (req, res) =>{
        const { cpf } = req.body
        // LIGAÇÃO: A função do controller CHAMA a função auxiliar criada la no topo!
        const resultado = validarCpfSimples(cpf);
        if (!resultado.valido){
            return res.status(400).json({
                status:'erro',
                valido:false,
                cpfEnviado:cpf,
                mensagem: resultado.motivo
            })
        }
    }
}

module.exports = cpfController;