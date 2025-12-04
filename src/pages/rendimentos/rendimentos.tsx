import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import useAuth from '../../hooks/useAuth';
import YearSelector from '../../components/year-selector/year-selector';


interface RendimentosData {
    cnpj: string;
    nome_empresarial: string;
    cpf: string;
    nome_completo: string;
    natureza_rendimento: string;
    total_rendimento: number;
    contribuicao_previdencia_oficial: number;
    pensao_alimenticia: number;
    imposto_renda_retido: number;
    parcela_isenta_proventos: number;
    diaria_ajuda_custo: number;
    outros_isentos_descricao: string;
    outros_isentos_valor: number;
    decimo_terceiro: number;
    imposto_renda_sobre_13: number;
    abono_pecuniario: string;
    nome_responsavel: string;
    data_responsavel: string;
}



const Rendimentos: React.FC = () => {
    const [listAvailableYears, setListAvailableYears] = useState<number[]>([]);
    const [data, setData] = useState<RendimentosData>({} as RendimentosData);
    const [anoSelected, setAnoSelected] = useState<number | null>(null);

    const [loading, setLoading] = useState(false);
    const [loadingLista, setLoadingLista] = useState(false);

    const { user } = useAuth();

    useEffect(() => {
        setLoadingLista(true);
        api.get('/lista-rendimento', {
            params: {
                cpf: user?.nr_cpf,
            },
        })
            .then((response) => {
                setListAvailableYears(response.data);
            })
            .catch((error) => {
                console.error('Error fetching rendimentos data:', error);
            })
            .finally(() => {
                setLoadingLista(false);
            });
    }, [user]);

    useEffect(() => {
        if (!anoSelected) return;
        setLoading(true);
        api
            .get('/comprovante-rendimento', {
                params: {
                    cpf: user?.nr_cpf,
                    ano: anoSelected,
                },
            })
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.error('Error fetching rendimentos data:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [anoSelected, user]);

    const formatCurrency = (value: number) => {
        return value?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

    const getNatureza = (natureza: string) => {
        switch (natureza) {
            case '0561':
                return 'Rendimento do Trabalho Assalariado';
            case '3533':
                return 'Aposentadoria, Reserva, Reforma ou Pensão Pagos por Previdência Pública';
            default:
                return 'Outros Rendimentos';
        }
    };

    return (
        <>
            <div className="rendimentos__sidePanel">
                <YearSelector
                    anosAvailable={listAvailableYears}
                    openYear={anoSelected}
                    setOpenYear={setAnoSelected}
                />
            </div>
            {loading && <p>Loading...</p>}
            {!loading && data && (
                <div className="comprovante">
                    <div className="cabecalho">
                        <img
                            className="brasao"
                            src="./assets/images/brasaobr.png"
                            alt="brasao" />
                        <p className="ministerio ab">Ministério da Fazenda</p>
                        <p className="secretaria ab">
                            Secretaria da Receita Federal do Brasil Imposto Sobre a Renda da
                            Pessoa Física
                        </p>
                        <p className="comp ab">
                            COMPROVANTE DE RENDIMENTOS PAGOS E DE IMPOSTO SOBRE A RENDA RETIDO
                            NA FONTE
                        </p>
                    </div>
                    <div className="cabecalho_aviso">
                        <p>Verifique as condições e o prazo para a apresentação da Declaração do Imposto sobre a Renda da Pessoa Física para este ano-calendário no sítio da Secretaria da Receita Federal do Brasil na internet, no endereço www.receita.fazenda.gov.br.</p>
                    </div>

                    <div className="margemtopo">
                        <p className="pf">1. Fonte Pagadora Pessoa Jurídica</p>
                        <div className="f1">
                            <p className="ptit ab">CNPJ/CPF</p>
                            <p className="ptxt ab">{data.cnpj}</p>
                            <p className="ptit col2 ab">Nome Empresarial/Nome</p>
                            <p className="ptxt col2 ab">{data.nome_empresarial}</p>
                        </div>
                    </div>

                    <div className="margemtopo">
                        <p className="pf">2. Pessoa Física Beneficiária dos Rendimentos</p>
                        <div className="f2">
                            <p className="ptit ab">CPF</p>
                            <p className="ptxt ab">{data.cpf}</p>
                            <p className="ptit col2 ab">Nome Completo</p>
                            <p className="ptxt col2 ab">{data.nome_completo}</p>
                            <p className="ptit titl2 ab">Natureza do Rendimento</p>
                            <p className="ptxt txtl2 ab">
                                {getNatureza(data.natureza_rendimento)}
                            </p>
                        </div>
                    </div>
                    <div className="margemtopo">
                        <p className="pf">3. Rendimentos Tributáveis, Deduções e Imposto Sobre a Renda Retido na Fonte</p>
                        <p className="vr">Valores em Reais</p>
                        <div className="f3">
                            <p className="ptit_linha ptit_linha1 ab">1. Total dos Rendimentos (Inclusive Férias)</p>
                            <p className="ptxt_linha ptit_linha1 ab">{formatCurrency(data.total_rendimento)}</p>
                            <span className="linha1"></span>
                            <p className="ptit_linha ptit_linha2 ab">2. Contribuição Previdenciária Oficial</p>
                            <p className="ptxt_linha ptit_linha2 ab">{formatCurrency(data.contribuicao_previdencia_oficial)}</p>
                            <span className="linha2"></span>
                            <p className="ptit_linha ptit_linha3 ab">3. Contribuição a entidades de previdência complementar e a fundos de aposentadoria prog. individual (Fapi) (preencher também o quadro 7)</p>
                            <p className="ptxt_linha ptit_linha3 ab">0,00</p>
                            <span className="linha3"></span>
                            <p className="ptit_linha ptit_linha4 ab">4. Pensão Alimentícia (informar o beneficiário no quadro 7)</p>
                            <p className="ptxt_linha ptit_linha4 ab">{formatCurrency(data.pensao_alimenticia)}</p>
                            <span className="linha4"></span>
                            <p className="ptit_linha ptit_linha5 ab">5. Imposto sobre a renda retido na fonte</p>
                            <p className="ptxt_linha ptit_linha5 ab">{formatCurrency(data.imposto_renda_retido)}</p>
                            <span className="pipe3"></span>
                        </div>
                    </div>
                    <div className="margemtopo">
                        <p className="pf">4. Rendimentos Isentos e Não Tributáveis</p>
                        <p className="vr">Valores em Reais</p>
                        <div className="f4">
                            <p className="ptit_linha ptit_linha1 ab">1. Parcela isenta dos proventos de aposentadoria, reserva remunerada, reforma e pensão (65 anos ou mais)</p>
                            <p className="ptxt_linha ptit_linha1 ab">{formatCurrency(data.parcela_isenta_proventos)}</p>
                            <span className="linha1"></span>
                            <p className="ptit_linha ptit_linha2 ab">2. Diárias e ajudas de custo</p>
                            <p className="ptxt_linha ptit_linha2 ab">{formatCurrency(data.diaria_ajuda_custo)}</p>
                            <span className="linha2"></span>
                            <p className="ptit_linha ptit_linha3 ab">3. Pensão e proventos de aposentadoria ou reforma por moléstia grave; proventos de aposentadoria ou reforma por acidente em serviço</p>
                            <p className="ptxt_linha ptit_linha3 ab">0,00</p>
                            <span className="linha3"></span>
                            <p className="ptit_linha ptit_linha4 ab">4. Lucros e dividendos, apurados a partir de 1996, pagos por pessoa jurídica (lucro real, presumido ou arbitrado)</p>
                            <p className="ptxt_linha ptit_linha4 ab">0,00</p>
                            <span className="linha4"></span>
                            <p className="ptit_linha ptit_linha5 ab">5. Valores pagos ao titular ou sócio da microempresa ou empresa de pequeno porte, exceto prolabore, aluguéis ou serviços prestados</p>
                            <p className="ptxt_linha ptit_linha5 ab">0,00</p>
                            <span className="linha5"></span>
                            <p className="ptit_linha ptit_linha6 ab">6. Indenizações por rescisão de contrato de trabalho, inclusive a título de PDV, e por acidente de trabalho</p>
                            <p className="ptxt_linha ptit_linha6 ab">0,00</p>
                            <span className="linha6"></span>
                            <p className="ptit_linha ptit_linha7 ab">7. Outros {data.outros_isentos_descricao}</p>
                            <p className="ptxt_linha ptit_linha7 ab">{formatCurrency(data.outros_isentos_valor)}</p>
                            <span className="pipe4"></span>
                        </div>
                    </div>
                    <div className="margemtopo">
                        <p className="pf">5. Rendimentos sujeitos à Tributação Exclusiva (rendimento líquido)</p>
                        <p className="vr">Valores em Reais</p>
                        <div className="f5">
                            <p className="ptit_linha ptit_linha1 ab">1. Décimo terceiro salário</p>
                            <p className="ptxt_linha ptit_linha1 ab">{formatCurrency(data.decimo_terceiro)}</p>
                            <span className="linha1"></span>
                            <p className="ptit_linha ptit_linha2 ab">2. Imposto sobre a renda retido na fonte sobre o 13º salário</p>
                            <p className="ptxt_linha ptit_linha2 ab">{formatCurrency(data.imposto_renda_sobre_13)}</p>
                            <span className="linha2"></span>
                            <p className="ptit_linha ptit_linha3 ab">3. Outros</p>
                            <p className="ptxt_linha ptit_linha3 ab">0,00</p>
                            <span className="pipe5"></span>
                        </div>
                    </div>
                    <div className="margemtopo">
                        <p className="pf">6. Rendimentos Recebidos Acumuladamente - Art. 12-A da Lei nº 7.713, de 1988 (sujeito à tributação exclusiva)</p>
                        <p className="vr vrf6">Valores em Reais</p>
                        <div className="f6">
                            <p className="ptit_linha ptit_linha8 ab">6.1 Número do processo:</p>
                            <span className="linha7"></span>
                            <p className="ptit_linha ptit_linha9 ab">Natureza do rendimento:</p>
                            <span className="pipe6"></span>
                            <p className="ptit_linha ptit_linha9c2 ab">Quantidade de meses</p>
                            <p className="ptxt_linha ptxt_linha9c2 ab">0,00</p>
                            <span className="pipe7"></span>
                        </div>
                        <div className="f61"></div>
                        <p className="ptit_linha ptit_linha1 ab">1. Total dos rendimentos tributáveis (inclusive férias e décimo terceiro salário)</p>
                        <p className="ptxt_linha ptit_linha1 ab">0,00</p>
                        <span className="linha1"></span>
                        <p className="ptit_linha ptit_linha2 ab">2. Exclusão: Despesas com a ação judicial</p>
                        <p className="ptxt_linha ptit_linha2 ab">0,00</p>
                        <span className="linha2"></span>
                        <p className="ptit_linha ptit_linha3 ab">3. Dedução: Contribuição previdenciária oficial</p>
                        <p className="ptxt_linha ptit_linha3 ab">0,00</p>
                        <span className="linha3"></span>
                        <p className="ptit_linha ptit_linha4 ab">4. Dedução: Pensão alimentícia (preencher também o quadro 7)</p>
                        <p className="ptxt_linha ptit_linha4 ab">0,00</p>
                        <span className="linha4"></span>
                        <p className="ptit_linha ptit_linha5 ab">5. Imposto sobre a renda retido na fonte</p>
                        <p className="ptxt_linha ptit_linha5 ab">0,00</p>
                        <span className="linha5"></span>
                        <p className="ptit_linha ptit_linha61 ab">6. Rendimentos isentos de pensão, proventos de aposentadoria ou reforma por moléstia grave ou aposentadoria ou reforma por acidente em serviço</p>
                        <p className="ptxt_linha ptit_linha6 ab">0,00</p>
                        <span className="pipe8"></span>
                    </div>
                    <div className="margemtopo">
                        <p className="pf">7. Informações Complementares</p>
                        <div className="f7">
                            <p className="ptit_linha ptit_linha1 ab">Rendimentos isentos outros:</p>
                            <p className="ptit_linha ptit_linha10 ab">{data.abono_pecuniario}</p>
                            <p className="ptit_linha ptit_linha11 ab">Todos os valores apresentados neste documento referem-se a folha de pagamento. Para obter os valores referentes a prestação de serviços, entre em contato com o departamento de RH do município.</p>
                        </div>
                    </div>
                    <div className="margemtopo">
                        <p className="pf">8. Responsável pelas informações</p>
                        <div className="f8">
                            <p className="ptit ab">Nome</p>
                            <p className="ptxt ab">{data.nome_responsavel}</p>
                            <p className="ptit col2_8 ab">Data</p>
                            <p className="ptxt col2_8 ab">{data.data_responsavel}</p>
                            <p className="ptit col3_8 ab">Assinatura</p>
                            <span className="pipe9"></span>
                            <span className="pipe10"></span>
                        </div>
                        <p className="aprovado">Aprovado pela IN RFB nº 1.215, de 15 de dezembro de 2011.</p>
                    </div>
                </div>
            )}
        </>
    )
};

export default Rendimentos;
