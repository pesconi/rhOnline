import { jwtDecode } from "jwt-decode";
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import api from "../services/api";

export const isTokenExpired = (token: string) => {
    if (!token) {
        localStorage.removeItem('token')
        localStorage.removeItem('userID')
        return true
    }
    try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        const handleExpired = () => {
            localStorage.removeItem('token')
            localStorage.removeItem('userID')
            return true
        }

        return !decodedToken?.exp || (decodedToken.exp < currentTime) ? handleExpired() : false
    } catch (error) {
        localStorage.removeItem('token')
        console.error('Error decoding token:', error);
        return true;
    }
};


export const baseAnexosURL = "https://www.fenix.com.br/ftp/drive_doc/";
export const baseUrl = "https://www.fenix.com.br/";

export const formatDate = (date: Date) => {
    if (date === null) return '-'
    const formatDT = new Date(date);
    return formatDT.toLocaleDateString("pt-BR");

};

export const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
});

export const handleMaskCredorDoc = (doc: string) => {
    let withMask = '';
    if (doc) {
        const thirdChar = doc[2] === "." ? true : false;
        withMask = thirdChar ? "XX.X" + doc.substring(4) : "XXX" + doc.substring(3);
    }
    return withMask;
};

export const getFileExtension = (filename: string) => {
    const ext = /^.+\.([^.]+)$/.exec(filename);
    return ext == null ? "" : ext[1];
};

export const getFileName = (filename: string) => {
    return filename.replace(/^.*?([^\\/]*)$/, "$1");
};


export const downloadURI = (uri: string) => {
    const link = document.createElement("a");
    link.setAttribute("download", uri);
    link.setAttribute("target", "_blank");
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    link.remove();
};

export const openURI = (uri: string) => {
    const link = document.createElement("a");
    link.setAttribute("href", uri);
    link.setAttribute("target", "_blank");
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    link.remove();
};

const capitalizeFirstLetter = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

export const getMonth = (mes: string, ano: number) => {
    return Number(mes.replace(/[^0-9]/g, "").replace(ano.toString(), ""));
};

export const getNameOfMonth = (mes: string, ano: number) => {
    const onlyMonth = Number(mes.replace(/[^0-9]/g, "").replace(ano.toString(), ""));

    const data = new Date(0, onlyMonth - 1);

    return capitalizeFirstLetter(data.toLocaleString("default", { month: "long" }));
};

export const dateFormattingOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
};

export function renderDate(checkTimeAndDate: any) {
    if (!checkTimeAndDate) {
        return '';
    }
    return new Date(checkTimeAndDate).toLocaleDateString(
        'pt-BR',
        dateFormattingOptions
    );
}

export const clienteMap = {
    'fantasia': '1090',
    'saofranciscodobrejao': '340',
    'melgaco': '405',
    'buritirana': '428',
    'camdavinopolis': '441',
    'teste': '1005'
};

export const SaveCliente = () => {
    const location = useLocation();

    useEffect(() => {
        const path = location.pathname.replace('/', '') as keyof typeof clienteMap;

        const clienteId = clienteMap[path];

        if (clienteId) {
            api
                .get("/cliente", {
                    params: {
                        cliente: clienteId,
                    },
                })
                .then((response) => {
                    const cliente = response.data;
                    console.log(cliente, "cliente");
                    if (cliente && cliente.dvAtivo && cliente.ContraChequeLiberado) {
                        localStorage.setItem('cliente', response.data.Cliente);
                        localStorage.setItem('cd_cliente', clienteId);
                    }
                });
        }

    }, [location]);

    return null; // This component does not render anything
};

