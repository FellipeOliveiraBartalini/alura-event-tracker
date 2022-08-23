import { selector } from "recoil";
import { IEvento } from "../../../interfaces/IEvento";
import { filtroDeEventos, listaDeEventosState } from "../../atom";

const eventosFiltradosState = selector({
    key: 'eventosFiltradosState',
    get: ({ get }) => {
        const filtro = get(filtroDeEventos);
        const todosOsEventos = get(listaDeEventosState);

        const eventosFiltradosPorData = todosOsEventos.filter(evento => {
            if (!filtro.data) {
              return true;
            } else {
              const ehOMesmoDia = filtro.data.toISOString().slice(0, 10) === evento.inicio.toISOString().slice(0, 10);
              return ehOMesmoDia;
            }
        })

        const eventosFiltradosPorEstado = eventosFiltradosPorData.filter(evento => {
            if (!filtro.estado) {
              return true;
            } else {
              const eventosFiltrados = filtro.estado === evento.completo;
              return eventosFiltrados;
            }
        })
        return eventosFiltradosPorEstado;
    }
});

export default eventosFiltradosState;

export const eventosAsync = selector({
  key: 'eventosAsync',
  get: async () => {
    const respostaHttp = await fetch('http://localhost:8070/eventos');
      const eventosJson: IEvento[] = await respostaHttp.json();
      return eventosJson.map(evento => ({
        ...evento,
        inicio: new Date(evento.inicio),
        fim: new Date(evento.fim),
      }))
  }
})
