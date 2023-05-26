import {
  Button,
  Caption1,
  Card,
  CardHeader,
  CardPreview,
  Text,
  makeStyles,
  shorthands,
  tokens,
} from "@fluentui/react-components";
import { differenceInCalendarDays, subDays } from "date-fns";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useNavigate } from "react-router-dom";
import { Layout, MainContent, SideMenu } from "../layout";
import {
  ArrowRight16Filled,
} from "@fluentui/react-icons/lib/fonts";

const useStyles = makeStyles({
  viewSessionButton: {
    width: "100%",
    height: "40px",
  },
  sessionInfo: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    rowGap: "8px",
  },
  calendar: {
    ...shorthands.borderRadius("8px"),
    ...shorthands.border("4px", "solid", tokens.colorBrandBackground2),
  },
});

export const Dashboard: React.FC = () => {
  const [selectedSessionIndex, setSelectedSessionIndex] = useState(-1);
  return (
    <Layout>
      <SideMenu>
        <DashboardSideContent selectedSessionIndex={selectedSessionIndex} />
      </SideMenu>
      <MainContent>
        <DashboardContent
          selectedSessionIndex={selectedSessionIndex}
          onSelect={(index) => setSelectedSessionIndex(index)}
        />
      </MainContent>
    </Layout>
  );
};

export const DashboardContent: React.FC<{
  selectedSessionIndex: number;
  onSelect: (index: number) => void;
}> = ({ selectedSessionIndex, onSelect }) => {
  return (
    <>
      <Text weight="semibold" size={900} as="h1">
        Dashboard
      </Text>

      <Text weight="semibold" size={800} as="h1">
        My Recent Sessions
      </Text>
      <RecentSessions
        selectedIndex={selectedSessionIndex}
        onSelect={onSelect}
      />
    </>
  );
};

function isSameDay(a: Date | number, b: Date | number) {
  return differenceInCalendarDays(a, b) === 0;
}
export const DashboardSideContent: React.FC<{
  selectedSessionIndex: number;
}> = ({ selectedSessionIndex }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const now = new Date();
  const highlightedDates = [subDays(now, 5), subDays(now, 1), now];

  return (
    <>
      <Calendar
        className={classes.calendar}
        tileClassName={({ date, view }) => {
          if (
            view === "month" &&
            highlightedDates.find((dDate) => isSameDay(dDate, date))
          ) {
            if (isSameDay(date, now)) {
              return "highlightToday";
            }
            return "highlight";
          }
        }}
      />
      {selectedSessionIndex >= 0 ? (
        <div className={classes.sessionInfo}>
          <Text size={700} weight="semibold">
            Session Info
          </Text>
          <Text size={400}>Lorem ipsum dolor</Text>
          <Button
            className={classes.viewSessionButton}
            appearance="primary"
            onClick={() => {
              navigate("/session");
            }}
          >
            View Session Details
          </Button>
        </div>
      ) : null}
    </>
  );
};

const useRecentSessionsStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "row",
    columnGap: "12px",
    rowGap: "12px",

    flexWrap: "wrap",
  },
  card: {
    width: "300px",
    maxWidth: "100%",
    ...shorthands.borderRadius("8px"),
    height: "fit-content",
  },
  preview: {
    backgroundColor: tokens.colorNeutralBackground3,
    height: "160px",
  },

  caption: {
    marginRight: "8px",
    color: tokens.colorNeutralForeground3,
  },
});

const cards = [
  {
    crop: "Barley",
    sessionId: "24",
    date: "Today",
    time: "09:53",
    imageSrc:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR90o6Ogg-S_RXsRJefe16vkVCnsT63pEW6LCEm9JdXyIslYh7JGj-hdun5af1Fc9dSzM0&usqp=CAU",
  },
  {
    crop: "Rye",
    sessionId: "23",
    date: "Yesterday",
    time: "14:32",
    imageSrc:
      "https://static.country-guide.ca/wp-content/uploads/2021/03/29111534/Pest-Patrol-2021-March-II-Weed-Zapper-offers-an-alternative-solution-for-killing-weeds-weed_zapper_1-PO.jpg",
  },
  {
    crop: "Onions",
    sessionId: "22",
    date: "5 days ago",
    time: "11:09",
    imageSrc:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtsvb3ciLvta9l72hxtf1fyYQAuTHlrJdbsdL8-uHdrPRIjL3zAQtZ1Snd_T7kuxJd_5U&usqp=CAU",
  },
];

export const RecentSessions: React.FC<{
  selectedIndex: number;
  onSelect: (index: number) => void;
}> = (props) => {
  const classes = useRecentSessionsStyles();
  const navigate = useNavigate();
  return (
    <div className={classes.root}>
      {cards.map((card, index) => (
        <Card
          key={card.sessionId}
          className={classes.card}
          selected={props.selectedIndex === index}
          onSelectionChange={() => props.onSelect(index)}
        >
          <CardPreview className={classes.preview}>
            <img src={card.imageSrc}></img>
          </CardPreview>
          <CardHeader
            header={
              <Text weight="semibold">{`${card.crop} Session #${card.sessionId}`}</Text>
            }
            action={
              <Button
                style={{}}
                appearance="primary"
                onClick={() => navigate("/session")}
                icon={<ArrowRight16Filled />}
              />
            }
            description={
              <>
                <Caption1 className={classes.caption}>
                  Date: {`${card.date}`}
                </Caption1>
                <Caption1 className={classes.caption}>
                  Started: {`${card.time}`}
                </Caption1>
              </>
            }
          />
        </Card>
      ))}
    </div>
  );
};
