//===========================================================//
// 1. FUNÇÕES AUXILIARES / UTILITÁRIAS (Ficam fora do controller)
//===========================================================//

function validarCpfSimples(cpfOriginal) {
    if(!cpfOriginal) return { valido: false, motivo:'CPF não foi informado'};
    
    // 1. Remove caracteres especiais (pontos e traço), deixando apenas números
    // replace = trocar
    // \/D/g (Expressão regular)
    // \D significa qualquer caractere que não seja um dígito numérico
    // / ... / As barras no inicio e no fim servem para delimitar onde começa e termina a expressão regular do Javascript
    // g é a flag global. Ela diz ao javascript para substituir todas as ocorrências
    const apenasNumeros = String(cpfOriginal).replace(/\D/g, '');
    
    // 2. Verifica se possui exatamente 11 dígitos
    if (apenasNumeros.length !== 11){
        return {
            valido: false,
            motivo: `O CPF deve ter 11 dígitos (você enviou ${apenasNumeros.length})`
        }
    }

    // 3. Verifica se todos os dígitos são iguais (ex: 111.111.111-11) é inválido
    const todosIguais = /^(\d)\1{10}$/.test(apenasNumeros);
    if (todosIguais) {
        return { valido: false, motivo: 'CPF com todos os dígitos iguais  é inválido.'};
    }

    return {
        valido: true,
        motivo: 'CPF possui formato e tamanho válidos!',
        cpfLimpo: apenasNumeros
    }
                                            
}

//=========================================================//
// 2. OBJETO DO CONTROLLER (Contém os metodos chamados pelas rotas)
//=========================================================//
const cpfController = {
    // Método 1 = Apenas recebe e confirma
    recebeCpf: (req, res) =>{
        const { cpf } = req.body

        // AQUI ESTA A LIGAÇÃO COM A FUNÇÃO DE VALIDAÇÃO
        const resultado = validarCpfSimples(cpf)

        // Se o CPF for inválido (por exemplo, "111.111.111-11")
        if (!resultado.valido){
            return res.status(400).json({
                sucesso: false,
                mensagem: resultado.motivo,
                cpfEnviado:cpf
            })
        }
        // Se for válido
        return res.json({
            sucesso: true,
            mensagem: resultado.motivo,
            cpfEnviado: cpf
        });
    },
    // Método 2: Recebe e valida usando a função auxiliar 
    validarCpf: (req, res) =>{
        const { cpf } = req.body
        // LIGAÇÃO: A função do controller CHAMA a função auxiliar criada lá no topo!
        const resultado = validarCpfSimples(cpf);
        if (!resultado.valido){
            return res.status(400).json({
                status:'erro',
                valido:false,
                cpfEnviado:cpf,
                mensagem: resultado.motivo
            })
        }
        return res.json({
            sucesso: true,
            mensagem: resultado.motivo,
            cpfEnviado: cpf
        });
    }
}

module.exports = cpfController;