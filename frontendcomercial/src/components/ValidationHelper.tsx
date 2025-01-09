// ValidationHelper.tsx
export const validateRegisterPage = (data: {
    loginPatrocinador: string;
    loginDesejado: string;
    senha: string;
    repetirSenha: string;
    nomeCompleto: string;
    email: string;
    dataNascimento: string;
  }) => {
    const errors: { [key: string]: string } = {};
  
    if (!data.loginPatrocinador) {
      errors.loginPatrocinador = 'Login do patrocinador é obrigatório.';
    }
    if (!data.loginDesejado) {
      errors.loginDesejado = 'Login desejado é obrigatório.';
    }
    if (!data.senha) {
      errors.senha = 'Senha é obrigatória.';
    } else if (data.senha !== data.repetirSenha) {
      errors.repetirSenha = 'As senhas não coincidem.';
    }
    if (!data.nomeCompleto) {
      errors.nomeCompleto = 'Nome completo é obrigatório.';
    }
    if (!data.email) {
      errors.email = 'E-mail é obrigatório.';
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = 'E-mail inválido.';
    }
    if (!data.dataNascimento) {
      errors.dataNascimento = 'Data de nascimento é obrigatória.';
    }
  
    return errors;
  };
  
  export const validateSecondRegisterPage = (data: {
    endereco: string;
    numero: string;
    bairro: string;
    pais: string;
    cep: string;
    complemento: string;
  }) => {
    const errors: { [key: string]: string } = {};
  
    if (!data.endereco) {
      errors.endereco = 'Endereço é obrigatório.';
    }
    if (!data.numero) {
      errors.numero = 'Número é obrigatório.';
    }
    if (!data.bairro) {
      errors.bairro = 'Bairro é obrigatório.';
    }
    if (!data.pais) {
      errors.pais = 'País é obrigatório.';
    }
    if (data.pais === 'BR' && !data.cep) {
      errors.cep = 'CEP é obrigatório para o Brasil.';
    }
  
    return errors;
  };