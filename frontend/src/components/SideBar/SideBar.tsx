import { useAppDispatch } from "../../hooks/hooks";
import { useAppSelector } from "../../hooks/hooks";
import { selectCases } from "../../features/casesSlice";
import dayjs from "dayjs";
import { getCases } from "../../features/casesSlice";

interface BotsProps {
  arrayBot: any[];
  token: string | null;
  setValue: any;
}

const SideBar: React.FC<BotsProps> = ({ arrayBot, token, setValue }) => {
  const { idFromCase } = useAppSelector(selectCases);
  const dispatch = useAppDispatch();
  const fromDate = "2021-03-01";
  const toDate = "2024-04-21";

  const getFirstCase = (e: any) => {
    const botId = e.target.value;
    if (token) {
      dispatch(getCases({ token, botId, fromDate, toDate }));
      setValue([dayjs("2021-03-01"), dayjs("2024-04-21")]);
    }
  };

  return (
    <div className="col-span-1 w-[70%] gap-5  relative flex flex-col">
      <p className="flex flex-col text-xl font-semibold rounded-xl shadow-inner w-[100%] bg-cyan-400 py-8 items-center">
        Bots Activos
      </p>
      {arrayBot.map((n: any, index) => (
        <div key={index}>
          {idFromCase == n.id ? (
            <button
              className="shadow-md w-[100%] text-lg font-semibold ring-cyan-500 ring-1"
              value={n.id}
              onClick={getFirstCase}
              disabled
            >
              {n.alias}
            </button>
          ) : (
            <button
              className="shadow-md w-[100%] text-lg font-semibold"
              value={n.id}
              onClick={getFirstCase}
            >
              {n.alias}
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default SideBar;
