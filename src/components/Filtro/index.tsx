import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { IFiltroDeEventos } from '../../interfaces/IFiltroDeEventos';
import { filtroDeEventos } from '../../state/atom';
import style from './Filtro.module.scss';

const Filtro: React.FC = () => {

  const [data, setData] = useState('');
  const [estado, setEstado] = useState('');
  const setFiltroDeEvento = useSetRecoilState<IFiltroDeEventos>(filtroDeEventos);

  const submeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();

    const filtro: IFiltroDeEventos = {}
    if (data) {
      filtro.data = new Date(data);
    } else {
      filtro.data = null;
    }

    switch (estado) {
      case 'completo':
        filtro.estado = true;
        break;

      case 'incompleto':
        filtro.estado = false;
        break;

      default:
        filtro.estado = null;
    }

    setFiltroDeEvento(filtro);
  }

  return (
    <form className={style.Filtro} onSubmit={submeterForm}>
      <h3 className={style.titulo}>Filtrar por data</h3>
      <input
        type="date"
        name="data"
        className={style.input}
        onChange={evento => setData(evento.target.value)}
        placeholder="Por data"
        value={data} />

      <h3 className={style.titulo}>Filtrar por Status</h3>
      <select
        className={style.input}
        name="estado"
        id="input-estado"
        onChange={evento => setEstado(evento.target.value)}
      >
        <option value="todos">Todos</option>
        <option value="completo">Completo</option>
        <option value="incompleto">Incompleto</option>
      </select>

      <button className={style.botao}>
        Filtrar
      </button>

    </form>)
}

export default Filtro