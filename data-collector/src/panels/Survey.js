import {
  Panel,
  PanelHeader,
  Text,
  FormItem,
  Button,
  Checkbox,
} from "@vkontakte/vkui";
import { useState } from "react";

function Survey({ setActivePanel, setSurvey }) {
  const [tech, setTech] = useState(false);
  const [food, setFood] = useState(false);
  const [cosmetics, setCosmetics] = useState(false);
  const [games, setGames] = useState(false);
  const [tickets, setTickets] = useState(false);
  const [clothes, setClothes] = useState(false);
  const [merch, setMerch] = useState(false);

  return (
    <Panel className="Survey">
      <PanelHeader>Выбери несколько</PanelHeader>
      <Text>На что из этого вы откладываете деньги?</Text>
      <FormItem>
        <Checkbox
          onClick={(e) => {
            setTech(e.target.checked);
          }}
        >
          Техника и аксессуары для нее
        </Checkbox>
        <Checkbox
          onClick={(e) => {
            setFood(e.target.checked);
          }}
        >
          Еда (кофейни, рестораны, фастфуд)
        </Checkbox>
        <Checkbox
          onClick={(e) => {
            setCosmetics(e.target.checked);
          }}
        >
          Косметика, парфюмерия
        </Checkbox>
        <Checkbox
          onClick={(e) => {
            setGames(e.target.checked);
          }}
        >
          Игры и донат
        </Checkbox>
        <Checkbox
          onClick={(e) => {
            setTickets(e.target.checked);
          }}
        >
          Билеты на концерты, кино
        </Checkbox>
        <Checkbox
          onClick={(e) => {
            setClothes(e.target.checked);
          }}
        >
          Кросы, одежда, украшения
        </Checkbox>
        <Checkbox
          onClick={(e) => {
            setMerch(e.target.checked);
          }}
        >
          Мерч (например, k-pop)
        </Checkbox>
      </FormItem>
      <FormItem>
        <Button
          size="l"
          stretched
          onClick={async (e) => {
            e.preventDefault();

            console.log(tech, food, cosmetics, games, tickets, clothes, merch);
            setSurvey({
              tech: tech,
              food: food,
              cosmetics: cosmetics,
              games: games,
              tickets: tickets,
              clothes: clothes,
              merch: merch,
            });

            setActivePanel("thanks");
          }}
        >
          Отправить
        </Button>
      </FormItem>
    </Panel>
  );
}

export default Survey;
