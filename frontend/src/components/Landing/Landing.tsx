import React, { useState, useEffect } from "react";
import { login, selectAuth } from "../../features/autchSlice";
import SideBar from "../SideBar/SideBar";
import dayjs, { Dayjs } from "dayjs";
import { DateRange } from "@mui/x-date-pickers-pro";
import Table from "../Table/Table";
import imgInceptia from "../../app/inceptia_portadalinkedin-01.png";
import { fetchBots, selectBots } from "../../features/botSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

const Landing: React.FC = () => {
  const staticEmail = "reactdev@iniceptia.ai";
  const staticPassword = "4eSBbHqiCTPdBCTj";
  const [value, setValue] = useState<DateRange<Dayjs>>([
    dayjs("2021-04-17"),
    dayjs("2024-04-21"),
  ]);
  const dispatch = useAppDispatch();
  const { token, error: loginError } = useAppSelector(selectAuth);
  const { bots, error: botsError } = useAppSelector(selectBots);

  const handleLogin = (email: string, password: string) => {
    dispatch(login({ email, password }));
  };
  useEffect(() => {
    handleLogin(staticEmail, staticPassword);
    if (token) {
      dispatch(fetchBots(token));
    }
  }, [token, dispatch]);

  return (
    <div className="flex flex-col w-[100%] h-[100%] bg-scroll items-center gap-y-4">
      <p className="absolute text-xl select-none  z-[100] left-0  p-10 font-semibold">
        React Developer Challenge
      </p>
      <p className="absolute text-md select-none  z-[100] left-0 top-6  p-10 font-medium">
        Marcos Nicolás Ramírez Carrivali
      </p>
      <div className="w-[110vw] select-none  h-72">
        <img
          className="relative object-cover  p-5 w-[100%] h-[100%]"
          height={1000}
          width={700}
          src={imgInceptia}
        />
      </div>

      <div className="grid grid-cols-5 w-[90%] ">
        <SideBar setValue={setValue} arrayBot={bots} token={token} />
        <Table value={value} setValue={setValue} />
        {loginError ? (
          <div className="absolute left-[50%] top-[88%] w-[100%]">
            <h1 className="bg-black-100 py-5 px-10 rounded-xl shadow-md absolute text-xl font-semibold">
              Error: {loginError}
            </h1>
          </div>
        ) : null}
        {botsError ? (
          <div className="absolute left-[50%] top-[88%] w-[100%]">
            <h1 className="bg-black-100 py-5 px-10 rounded-xl shadow-md absolute text-xl font-semibold">
              Error: {botsError}
            </h1>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Landing;
