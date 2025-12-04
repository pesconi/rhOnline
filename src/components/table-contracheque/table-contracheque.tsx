import React, { useMemo, useState } from 'react';
import { ContrachequeData, IEventos } from '../../pages/contracheque/contracheque-interfaces';
import api from '../../services/api';
import { LoadingSpinner } from '../loading/loading';


interface ITableContrachequeProps {
    data: ContrachequeData;
    openMonth: number | null;
    openYear: number | null;
}

const TableContracheque: React.FC<ITableContrachequeProps> = ({ data: { lancamento, municipio, processamento, eventos, usuario }, openMonth, openYear }) => {
    const brasao64Image = btoa(String.fromCharCode(...new Uint8Array(municipio.brasao.data)));
    const brasao = `data:${municipio.brasao.type};base64,${brasao64Image}`;
    const [loading, setLoading] = useState(false);

    const getMonthName = (monthNumber: number | null): string => {
        const months = [
            "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
            "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
        ];
        if (!monthNumber) return "Mês inválido";
        return months[monthNumber - 1] || "Mês inválido";
    };

    const getCredit = eventos.filter(evento => (evento.vl_vencimento)) ?? [];

    const getDebit = eventos.filter(evento => (evento.vl_desconto)) ?? [];

    const handlePrint = () => {
        setLoading(true);
        api
            .get("/contracheque-pdf", {
                params: {
                    usuario: 56332/* user?.id_usuario */,
                    processamento: processamento.id_processamento,
                },
            })
            .then((response) => {
                const urlPdf = response.data.pdf
                const pdfWindow = window.open(urlPdf, '_blank');
                if (pdfWindow) {
                    pdfWindow.focus();
                } else {
                    console.error("Failed to open PDF in a new window.");
                }
                setLoading(false);
            });
    }


    return (
        <>
            {loading && <LoadingSpinner />}
            <div className="contracheque__table">
                <div className="exp">
                    {/* <img id="ei1" className="expImp" src="./assets/images/logo.png" alt="Imprimir" /> */}
                </div>
                <button
                    onClick={handlePrint}
                    className="btnPrint"
                >
                    <img id="ei1" className="expImp" src="./assets/images/print.png" alt="Imprimir" />
                </button>
                <div id="cc1" className="cContainer">
                    <div className="cHeader">

                        <img src={brasao} alt="Brasão" className="cBrasao" />
                        <p className="cEstado">{processamento.uf_extenso_cliente}</p>
                        <p className="cOrgao">{processamento.no_cliente}</p>
                        <p className="cEnd1">{processamento.end_cliente}</p>
                        <p className="cEnd2">{`${processamento.cidade_cliente} - ${processamento.uf_cliente}, CNPJ: ${processamento.cnpj_cliente}`}</p>
                        <div className="cDireita">
                            <p className="cTit">Recibo de Pagamento</p>
                            <p className='cData'>{`Data de Pagamento: ${new Date(processamento.dt_pagamento).toLocaleDateString('pt-BR')} `}</p>
                            <p className="cTipo">{`${processamento.tp_proc} / ${getMonthName(openMonth)} de ${openYear}`}</p>
                        </div>
                        <div className="ccLinhaHeader"></div>
                        <p className="cLabel clMatricula">Nº Matrícula:</p>
                        <p className="cCampo ccMatricula">{lancamento.nr_matricula}</p>
                        <p className="cLabel clServidor">Servidor:</p>
                        <p className="cCampo ccServidor">{lancamento.no_servidor}</p>
                        <p className="cLabel clPis">PIS/PASEP:</p>
                        <p className="cCampo ccPis">{lancamento.nr_pis_pasep}</p>
                        <p className="cLabel clCpf">CPF:</p>
                        <p className="cCampo ccCpf">{usuario.nr_cpf}</p>
                        <p className="cLabel clCargo">Cargo Atual:</p>
                        <p className="cCampo ccCargo">{lancamento.no_cargo}</p>
                        <p className="cLabel clCbo">C.B.O.:</p>
                        <p className="cCampo ccCbo">{lancamento.cbo_cargo}</p>
                        <p className="cLabel clTipo">Tipo Admissão:</p>
                        <p className="cCampo ccTipo">{lancamento.no_vinculo}</p>
                        <p className="cLabel clDep">Departamento:</p>
                        <p className="cCampo ccDep">{lancamento.no_depto}</p>
                        <p className="cLabel clLot">Lotação:</p>
                        <p className="cCampo ccLot">{lancamento.no_depto}</p>
                        <p className="cLabel clAdm">Dt.Adm:</p>
                        <p className="cCampo ccAdm">{new Date(lancamento.dt_admissao).toLocaleDateString('pt-BR')}</p>
                        <div className="ccLinha"></div>
                        <div className="cBand">
                            <div className="cBand1">
                                <p className="cLabel cbDesc1">Descrição</p>
                                <p className="cLabel cbParc1">Parc.</p>
                                <p className="cLabel cbRef1">Ref.</p>
                                <p className="cLabel cbProv">Proventos</p>
                            </div>
                            <div className="cBand2">
                                <p className="cLabel cbDesc2">Descrição</p>
                                <p className="cLabel cbParc2">Parc.</p>
                                <p className="cLabel cbRef2">Ref.</p>
                                <p className="cLabel cbDesc">Descontos</p>
                            </div>
                        </div>
                    </div>
                    <div className="cDados">
                        <div className="cEvento">
                            <div className="cEvento1">
                                {getCredit.map((evento) => (
                                    <div className="citem1" key={evento.id_evento}>
                                        <p className="cCampo ceDesc1">{evento.no_evento}</p>
                                        <p className="cCampo ceParc1">{evento.nr_parcela}</p>
                                        <p className="cCampo ceRef1">{evento.nr_referencia}</p>
                                        <p className="cCampo ceProv">{evento.vl_vencimento}</p>

                                    </div>
                                ))}
                            </div>
                            <div className="cEvento2">
                                {getDebit.map((evento) => (
                                    <div className="citem2" key={evento.id_evento}>
                                        <p className="cCampo ceDesc2">{evento.no_evento}</p>
                                        <p className="cCampo ceParc2">{evento.nr_parcela}</p>
                                        <p className="cCampo ceRef2">{evento.nr_referencia}</p>
                                        <p className="cCampo ceDesc">{evento.vl_desconto}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="cTotal">
                            <div className="cTotal1">
                                <p className="cLabel ctDesc1">Total de Proventos :</p>
                                <p className="cLabel ctProv">{lancamento.tot_vencimento}</p>
                            </div>
                            <div className="cTotal2">
                                <p className="cLabel ctDesc2">Total de Descontos :</p>
                                <p className="cLabel ctDesc">{lancamento.tot_desconto}</p>
                            </div>
                        </div>
                        <div className="cMsg">
                            <div className="cMsg1">
                                <p className="cLabel cmMsg">Mensagem:</p>
                                <p className="cLabel cmTextoMsg">{processamento.txt_mensagem}</p>
                            </div>
                            <div className="cMsg2">
                                <p className="cCampo cmLiq">LÍQUIDO A RECEBER:</p>
                                <p className="cCampo cmValorLiq">{lancamento.vl_liquido}</p>
                            </div>
                        </div>
                        <div className="cRod">
                            <div className="cRod1">
                                <p className="cLabel cr">Salário Contratual</p>
                                <p className="cCampo cr">{lancamento.vl_salario}</p>
                            </div>
                            <div className="cRod2">
                                <p className="cLabel cr">Dep.IRRF</p>
                                <p className="cCampo cr">{lancamento.vl_ded_irrf}</p>
                            </div>
                            <div className="cRod3">
                                <p className="cLabel cr">Base IRRF</p>
                                <p className="cCampo cr">{lancamento.vl_base_irrf}</p>
                            </div>
                            <div className="cRod4">
                                <p className="cLabel cr">Base Prev.</p>
                                <p className="cCampo cr">{lancamento.vl_base_inss}</p>
                            </div>
                            <div className="cRod5">
                                <p className="cLabel crl1">Base FGTS</p>
                                <p className="cCampo crc1">{lancamento.vl_base_fgts}</p>
                                <p className="cLabel crl2">Valor FGTS</p>
                                <p className="cCampo crc2">{lancamento.vl_fgts}</p>
                            </div>
                            <div className="cRod6">
                                <p className="cLabel cr">Margem Consign.</p>
                                <p className="cCampo cr">{lancamento.vl_margem}</p>
                            </div>
                            <p className="cLabel crl crl3">Banco:</p>
                            <p className="cCampo crc3">{lancamento.no_banco}</p>
                            <p className="cLabel crl crl4">Agência:</p>
                            <p className="cCampo crc4">{lancamento.nr_agencia}</p>
                            <p className="cLabel crl crl5">Número da Conta:</p>
                            <p className="cCampo crc5">{lancamento.nr_conta}</p>
                        </div>
                    </div>
                    <div className="c2">
                        <p>{`Recebi em ${new Date(processamento.dt_pagamento).toLocaleDateString('pt-BR')}`}</p>
                    </div>
                    <div className="fenix">
                        <p className="cLabel">Fênix.com - Conteúdo e Tecnologia ©</p>
                    </div>

                </div>
            </div>
        </>
    );
};

export default TableContracheque;