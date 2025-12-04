export interface ListaContracheque {
    id_processamento: number;
    year: number;
    month: number;
    tp_proc: string;
}

export interface AnoMesAvailable {
    year: number;
    month: number;
    tp_proc: IProcessamentos[];
}

export interface ContrachequeData {
    lancamento: ILancamentos;
    processamento: IProcessamentoData;
    eventos: IEventos[];
    usuario: IUsuario;
    municipio: IMunicipio;
}

export interface ILancamentos {
    id_lancamento: number;
    id_processamento: number;
    id_usuario: number;
    ano_mes: string;
    nr_matricula: string;
    no_servidor: string;
    dt_nascimento: string;
    dt_admissao: string;
    nr_pis_pasep: string;
    no_banco: string;
    nr_agencia: string;
    nr_conta: string;
    cd_cargo: string;
    no_cargo: string;
    cbo_cargo: string;
    cd_depto: string;
    no_depto: string;
    cd_setor: string;
    no_setor: string;
    no_vinculo: string;
    cd_situacao: number;
    nr_ato_nomeacao: string;
    dt_ato_nomeacao: string;
    in_estavel: number;
    nr_ato_inativo: string;
    dt_ato_inativo: string;
    no_institui_pensao: string;
    nr_ato_pensao: string;
    dt_ato_pensao: string;
    tot_vencimento: string;
    tot_desconto: string;
    vl_liquido: string;
    vl_salario: string;
    vl_base_fgts: string;
    vl_fgts: string;
    vl_base_inss: string;
    vl_base_irrf: string;
    vl_ded_irrf: string;
    vl_margem: string;
    qt_hora_semanal: number;
}

export interface IProcessamentoData {
    id_processamento: number;
    id_proc_folha: number;
    id_municipio: string;
    no_cliente: string;
    end_cliente: string;
    cidade_cliente: string;
    uf_cliente: string;
    cnpj_cliente: string;
    dt_pagamento: string;
    tp_proc: string;
    txt_mensagem: string;
    uf_extenso_cliente: string;
}

export interface IEventos {
    id_evento: number;
    id_usuario: number;
    id_lancamento: number;
    id_processamento: number;
    cd_evento: string;
    no_evento: string;
    nr_referencia: string;
    vl_vencimento: string;
    vl_desconto: string;
    nr_parcela: string;
}

export interface IUsuario {
    id_usuario: number;
    cd_cliente: number;
    nr_cpf: string;
    senha: string;
    no_usuario: string;
    email: string;
    ativo: number;
    ativo_dt: string;
    ativo_id: string;
}

export interface IMunicipio {
    id: number;
    id_municipio: string;
    brasao: {
        type: string;
        data: any[];
    };
    no_municipio: string;
}

export interface IProcessamentos {
    description: string;
    idProcessamento: number
}
