import React, { Dispatch, SetStateAction, useState } from 'react';
import { IProcessamentos, AnoMesAvailable, ContrachequeData } from '../../pages/contracheque/contracheque-interfaces';

interface PanelMonthSelectorProps {
    openYear: number | null;
    setOpenYear: (year: number | null) => void;
    setProcesamentos: (processamentos: IProcessamentos[]) => void;
    anoMesAvailable: AnoMesAvailable[];
    setOpenMonth: (month: number) => void;
    openMonth: number | null;
    setOpenProcessamento: Dispatch<SetStateAction<ContrachequeData | undefined>>;
}

interface MappedMonths extends AnoMesAvailable {
    mappedMonth: string;
}

const PanelMonthSelector: React.FC<PanelMonthSelectorProps> = ({
    openYear,
    setOpenYear,
    anoMesAvailable,
    setProcesamentos,
    setOpenMonth,
    openMonth,
    setOpenProcessamento
}) => {

    const years = Array.from(new Set(anoMesAvailable.map(({ year }) => year)));
    const meses = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];

    const getMappedMeses = (year: number): MappedMonths[] => {
        const mesesDisponiveis = anoMesAvailable.filter((anoMes) => anoMes.year === year);
        const mappedMeses = mesesDisponiveis.map((anoMes) => {
            return { ...anoMes, mappedMonth: meses[anoMes.month - 1] };
        });
        return mappedMeses;
    }
    const toggleYear = (year: number) => {
        setOpenYear(openYear === year ? null : year);
    };

    const toggleMonth = (processamento: AnoMesAvailable) => {
        setOpenMonth(processamento.month);
        setProcesamentos(processamento.tp_proc);
        setOpenProcessamento(undefined);
    }

    return (
        <div className="contracheque">
            <div className="contracheque-sidemenu">
                {years.map(year => (
                    <div key={year}>
                        <div onClick={() => toggleYear(year)} className="year">
                            {year}
                        </div>
                        {openYear === year && (
                            <div className="months">
                                {getMappedMeses(year).map((month, idx) => (
                                    <div key={`${idx}-${month.month}`} className={`month ${openMonth === month.month ? "month--active" : ""}`} onClick={() => toggleMonth(month)}>
                                        {month.mappedMonth}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PanelMonthSelector;