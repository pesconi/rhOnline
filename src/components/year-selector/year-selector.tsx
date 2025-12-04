import React, { Dispatch, SetStateAction, useState } from 'react';
import { IProcessamentos, AnoMesAvailable, ContrachequeData } from '../../pages/contracheque/contracheque-interfaces';

interface YearSelectorProps {
    openYear: number | null;
    setOpenYear: (year: number | null) => void;
    anosAvailable: number[];

}

interface MappedMonths extends AnoMesAvailable {
    mappedMonth: string;
}

const YearSelector: React.FC<YearSelectorProps> = ({
    openYear,
    setOpenYear,
    anosAvailable
}) => {


    const toggleYear = (year: number) => {
        setOpenYear(openYear === year ? null : year);
    };



    return (
        <div className="contracheque">
            <div className="contracheque-sidemenu">
                {anosAvailable.map(year => (
                    <div key={year}>
                        <div onClick={() => toggleYear(year)} className="year">
                            {year}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default YearSelector;