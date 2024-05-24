import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateRangePicker } from "@mui/x-date-pickers-pro";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { selectAuth } from "../../../features/autchSlice";
import { getCases } from "../../../features/casesSlice";

interface IdProps {
  idProp: number;
  value: any;
  setValue: any;
}

const DatePicker: React.FC<IdProps> = ({ idProp, value, setValue }) => {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector(selectAuth);

  const handleDate = () => {
    if (value[0] && value[1]) {
      const fromDate = value[0].format("YYYY-MM-DD");
      const toDate = value[1].format("YYYY-MM-DD");
      if (token) {
        const botId = idProp.toString();
        dispatch(getCases({ token, botId, fromDate, toDate }));
      }
    }
    return { fromDate: null, toDate: null };
  };

  return (
    <div className="flex flex-col items-center self-end w-[50%] gap-2">
      <p className="text-lg font-medium">Filtra casos por fecha</p>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {idProp ? (
          <DateRangePicker
            localeText={{ start: "Desde", end: "Hasta" }}
            className="bg-black-50 p-2 rounded-md shadow-md"
            value={value}
            onChange={(newValue) => setValue(newValue)}
          />
        ) : (
          <DateRangePicker
            className="bg-black-50 p-2 rounded-md shadow-md"
            localeText={{ start: "Desde", end: "Hasta" }}
            disabled
          />
        )}
      </LocalizationProvider>
      <button className="shadow-md" onClick={handleDate}>
        Obtener Casos
      </button>
    </div>
  );
};

export default DatePicker;
