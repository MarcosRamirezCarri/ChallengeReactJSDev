import {  useAppSelector } from "../../hooks/hooks";
import { selectCases } from "../../features/casesSlice";
import { useState } from "react";
import DatePicker from "./DatePicker/DatePicker";
import ConversationModal from "./Conversation/ConversationModal";

interface DateProps {
  value: any;
  setValue: any;
}

const Table: React.FC<DateProps> = ({ value, setValue }) => {
  const { cases, loading, error, idFromCase } = useAppSelector(selectCases);
  const [open, setOpen] = useState<boolean>(false);
  const [converState, setConverState] = useState<number | null>(null);

  const handleConvers = (id: number) => {
    setOpen(!open);
    setConverState(id);
  };

  return (
    <div className="w-[100%] col-span-4 flex flex-col gap-3 py-5">
      <div className="flex flex-row justify-between w-[100%]">
        <p className="text-2xl font-semibold pt-1">
          Detalles de los casos y reportes
        </p>

        <DatePicker idProp={idFromCase} value={value} setValue={setValue} />
      </div>

      <table className="border-spacing-2  table-auto border-collapse top-2">
        <thead>
          <tr className="bg-cyan-400 select-none shadow-inner">
            <th className="rounded-tl-xl shadow-inner p-3 text-black-50 text-xl font-medium">
              Gestionado
            </th>
            <th className="border-cyan-500 shadow-inner p-3 text-black-50 text-xl font-medium">
              ID Caso
            </th>
            <th className="border-cyan-500 shadow-inner p-3 text-black-50 text-xl font-medium">
              Telefono
            </th>
            <th className="border-cyan-500 shadow-inner p-3 text-black-50 text-xl font-medium">
              Dni
            </th>
            <th className="border-cyan-500 shadow-inner p-3 text-black-50 text-xl font-medium">
              Tiempo
            </th>
            <th className="border-cyan-500 shadow-inner p-3 text-black-50 text-xl font-medium">
              Estado
            </th>
            <th className="rounded-tr-xl shadow-inner border-cyan-500 p-3 text-black-50 text-xl font-medium"></th>
          </tr>
        </thead>
        <tbody className="bg-black-50 rounded-b-xl content-center">
          {!loading &&
            !error &&
            cases.map((caseItem: any) => (
              <tr key={caseItem.id}>
                <td className="border-2  p-1 text-xl">
                  {caseItem.last_updated}
                </td>
                <td className="border-2 p-1 text-lg font-semibold">
                  {caseItem.id}
                </td>
                <td className="border-2 p-1 text-md font-semibold">
                  {caseItem.phone}
                </td>
                <td className="border-2 p-1 text-md font-semibold">
                  {caseItem.extra_metadata.dni}
                </td>
                <td className="border-2 p-1 text-lg ">
                  {caseItem.case_duration}
                </td>
                <td className="border-2 p-1 text-xl font-semibold">
                  {caseItem.status}
                </td>
                <td className="border-2">
                  <button onClick={() => handleConvers(caseItem.id)}>
                    Ver conversación
                  </button>
                </td>
                {converState == caseItem.id ? (
                  <ConversationModal
                    id={caseItem.id}
                    conversation={caseItem.case_log.responses}
                    open={open}
                    setOpen={setOpen}
                  />
                ) : null}
              </tr>
            ))}
        </tbody>
      </table>
      {loading && (
        <div className="absolute select-none  left-[55%] top-[88%] w-[100%]">
          <h1 className="bg-black-100 py-5 px-10 rounded-xl shadow-md absolute text-5xl font-semibold">
            <p className="animate-spin ">.</p>
          </h1>
        </div>
      )}
      {!loading && !error && cases.length === 0 && (
        <div className="absolute select-none  left-[55%] top-[88%] w-[100%]">
          <h1 className="bg-black-100 py-5 px-10 rounded-xl shadow-md absolute text-xl font-semibold">
            No hay casos
          </h1>
        </div>
      )}
      {error && (
        <div className="absolute left-[55%] top-[88%] w-[100%]">
          <h1 className="bg-black-100 py-5 px-10 rounded-xl shadow-md absolute text-xl font-semibold">
            Error: {error}
          </h1>
        </div>
      )}
    </div>
  );
};

export default Table;
