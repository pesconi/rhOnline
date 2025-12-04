import React, { useEffect, useState } from 'react';
import PanelMonthSelector from '../../components/panel-selector/panel-selector';
import TableContracheque from '../../components/table-contracheque/table-contracheque';
import api from '../../services/api';
import useAuth from '../../hooks/useAuth';
import { ContrachequeData, IProcessamentos, AnoMesAvailable, ListaContracheque } from './contracheque-interfaces';
import { LoadingSpinner } from '../../components/loading/loading';

const Contracheque: React.FC = () => {
    const { user } = useAuth();
    const [openYear, setOpenYear] = useState<number | null>(null);
    const [openProcessamento, setOpenProcessamento] = useState<ContrachequeData>();
    const [processamentos, setProcessamentos] = useState<IProcessamentos[]>([]);
    const [anoMesAvailable, setAnoMesAvailable] = useState<AnoMesAvailable[]>([]);
    const [openMonth, setOpenMonth] = useState<number | null>(null);
    const [loadingLista, setLoadingLista] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoadingLista(true);
        api
            .get("/lista-contracheque", {
                params: {
                    usuario: 1,
                },
            })
            .then((response) => {
                console.log("Lista Contracheque response:", response);
                const data: ListaContracheque[] = response.data.processamentos;
                setAnoMesAvailable(getAnoMesAvailable(data));
                setLoadingLista(false);
            });
    }, [user]);

    const getContrachequeData = async (id_proc: number): Promise<ContrachequeData | undefined> => {

        let data: ContrachequeData = {} as ContrachequeData;
        await api.get("/contracheque", {
            params: {
                usuario: 1,
                processamento: id_proc,
            },
        }).then((response) => {
            data = response.data;
            return data;
        }).catch((error) => {
            console.error("Error fetching contracheque data:", error);
        });

        return data;

    }

    const handleOpenProcessamento = async (processamento: IProcessamentos) => {
        setLoading(true);
        const contracheque = await getContrachequeData(processamento.idProcessamento);
        setOpenProcessamento(contracheque);
        setLoading(false);
    }

    const isOpen = (processamento: IProcessamentos) => {
        return openProcessamento?.processamento.id_processamento === processamento.idProcessamento;
    }

    console.log()

    if (loadingLista) {
        return (
            <div className="contracheque--loading">
                <LoadingSpinner />
            </div>
        );
    }

    return (
        <div className="contracheque">
            <div className="contracheque--sidePanel">
                <PanelMonthSelector
                    openYear={openYear}
                    setOpenYear={setOpenYear}
                    anoMesAvailable={anoMesAvailable}
                    setProcesamentos={setProcessamentos}
                    setOpenMonth={setOpenMonth}
                    openMonth={openMonth}
                    setOpenProcessamento={setOpenProcessamento}
                />
            </div>
            <div className="contracheque--content">
                {processamentos.length === 0 ? (
                    <div className="contracheque--content__info">
                        <div className="contracheque--content__info--title">
                            Para visualizar o contracheque, selecione um ano e mês disponíveis na lista ao lado.
                        </div>
                        <div className="contracheque--content__info--subtitle">
                            Estão disponíveis apenas os anos e meses que possuem contracheque, caso não encontre o mês desejado, entre em contato com o órgão.
                        </div>
                    </div>
                ) : (
                    <div className="contracheque--content__info">
                        <div className="contracheque--content__info--title">
                            Contracheque disponíveis para o ano e mês selecionado.
                        </div>
                    </div>
                )}
                <div className="contracheque--content__available">
                    {processamentos.map((processamento, idx) => (
                        <button
                            key={`${idx}-${processamento.idProcessamento}`}
                            className={`${isOpen(processamento) ? "active" : ""}`}
                            onClick={() => handleOpenProcessamento(processamento)}
                        >
                            {processamento.description}
                        </button>
                    ))}
                </div>
                {!openProcessamento && loading && (
                    <LoadingSpinner />
                )}

                {openProcessamento &&
                    <div className="contracheque--content__display">
                        <TableContracheque
                            data={openProcessamento}
                            openMonth={openMonth}
                            openYear={openYear}
                        />
                    </div>
                }
            </div>
        </div>
    );
};

export default Contracheque;

const getAnoMesAvailable = (data: ListaContracheque[]): AnoMesAvailable[] => {
    // If data is undefined, null, or not an array, return an empty array
    if (!Array.isArray(data)) {
        console.error("Invalid data passed to getAnoMesAvailable. Expected an array, but got:", data);
        return [];
    }
    return data.reduce((acc: AnoMesAvailable[], item) => {
        const { year, month, tp_proc, id_processamento } = item;
        const existingEntry = acc.find(entry => entry.year === year && entry.month === month);

        if (existingEntry) {
            existingEntry.tp_proc.push({ description: tp_proc, idProcessamento: id_processamento });
        } else {
            acc.push({ year: year, month: month, tp_proc: [{ description: tp_proc, idProcessamento: id_processamento }] });
        }

        return acc;
    }, []);

};
