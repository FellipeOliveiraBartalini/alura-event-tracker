import { useSetRecoilState } from "recoil"
import { IEvento } from "../../interfaces/IEvento"
import { obterId } from "../../util";
import { listaDeEventosState } from "../atom"

const useCreateEvento = () => {
    const setListaDeEventos = useSetRecoilState<IEvento[]>(listaDeEventosState);

    const hoje = new Date();

    return (evento: IEvento) => {
        if (evento.inicio < hoje) {
            throw new Error("Eventos não podem ser cadastrados com data menor que a atual!");
        }

        evento.id = obterId();
        return setListaDeEventos(listaAntiga => [...listaAntiga, evento]);
    }
}

export default useCreateEvento;
