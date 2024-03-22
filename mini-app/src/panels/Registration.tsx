import { Div, Image, NavIdProps, Panel, PanelHeader } from "@vkontakte/vkui";
import { useEffect, useState } from "react";
import { QSmokeType } from "./questions/QSmokeType";
import { QSmokeTypeExact } from "./questions/QSmokeTypeExact";
import { QJuice } from "./questions/QJuice";
import { QVaporizer } from "./questions/QVaporizer";
import { QReason } from "./questions/QReason";
import { QCigs } from "./questions/QCigs";
import { DEFAULT_VIEW_PANELS } from "../routes";
import { QDisposablePrice } from "./questions/QDisposablePrice";
import { QDisposableCount } from "./questions/QDisposableCount";
import { BackgroundWaves, Kitten } from "../components";
import "./questions/common.css";

export type QuestionType =
  | "smoketype"
  | "smoketype-exact"
  | "juice"
  | "vaporizer"
  | "reason"
  | "cigs"
  | "disposablePrice"
  | "disposableCount"
  | "kitten"
  | "end";

export type QuestionProps = {
  data: any;
  setData: React.Dispatch<any>;
  setPage: React.Dispatch<React.SetStateAction<QuestionType>>;
};

export const Registration: React.FC<
  NavIdProps & {
    setPanel: React.Dispatch<
      React.SetStateAction<
        (typeof DEFAULT_VIEW_PANELS)[keyof typeof DEFAULT_VIEW_PANELS]
      >
    >;
  }
> = ({ id, setPanel }) => {
  const [data, setData] = useState<any>({});
  const [page, setPage] = useState<QuestionType>("smoketype");

  useEffect(() => {
    console.log(data);
  }, [data]);

  useEffect(() => {
    if (page === "end") {
      setPanel("home");
    }
  }, [page]);

  return (
    <Panel id={id}>
      <PanelHeader />
      <Div
        id="test"
        style={{
          margin: "auto",
        }}
      >
        <BackgroundWaves
          style={{
            position: "absolute",
            top: "0px",
            left: "-38px",
            zIndex: 5,
          }}
        />
        <Div
          style={{
            position: "relative",
            zIndex: 10,
          }}
        >
          {page === "smoketype" && (
            <QSmokeType setPage={setPage} data={data} setData={setData} />
          )}
          {page === "smoketype-exact" && (
            <QSmokeTypeExact setPage={setPage} data={data} setData={setData} />
          )}
          {page === "juice" && (
            <QJuice setPage={setPage} data={data} setData={setData} />
          )}
          {page === "vaporizer" && (
            <QVaporizer setPage={setPage} data={data} setData={setData} />
          )}
          {page === "reason" && (
            <QReason setPage={setPage} data={data} setData={setData} />
          )}
          {page === "cigs" && (
            <QCigs setPage={setPage} data={data} setData={setData} />
          )}
          {page === "disposablePrice" && (
            <QDisposablePrice setPage={setPage} data={data} setData={setData} />
          )}
          {page === "disposableCount" && (
            <QDisposableCount setPage={setPage} data={data} setData={setData} />
          )}
          {page === "kitten" && <Kitten />}
        </Div>
      </Div>
    </Panel>
  );
};
