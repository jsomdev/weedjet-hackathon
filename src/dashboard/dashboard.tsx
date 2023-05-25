import { makeStyles, shorthands, tokens, Text, Card, CardPreview, Button, Caption1, CardHeader } from "@fluentui/react-components"
import {  differenceInCalendarDays, subDays } from "date-fns";
import { useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
    root: {
        backgroundColor: tokens.colorSubtleBackground,
        height: "95vh",
        width: '100%',
        overflowY: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

    },
    container: {
        width: '1440px',
        height: "80%",
        display: "flex",
        flexDirection: "row",

        alignItems: "stretch",
    },
    mainContent: {
        ...shorthands.flex(1),
        ...shorthands.padding("8px", "24px"),
        display: "flex",
        flexDirection: "column",
        rowGap: "16px",
        borderTopLeftRadius: "12px",
        borderBottomLeftRadius: "12px",
        backgroundColor: tokens.colorPaletteGreenBackground1
    },
    sideMenu: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        rowGap: "32px",
        ...shorthands.padding("16px"),
        width: "480px",
        borderTopRightRadius: "12px",
        borderBottomRightRadius: "12px",
        boxShadow: '-5px 0px 12px rgba(0, 0, 0, 0.1)',
        backgroundColor: tokens.colorPaletteGreenBackground2
    }
})

export const Dashboard: React.FC = () => {
    const classes = useStyles();
    const [selectedSessionIndex, setSelectedSessionIndex] = useState(-1)
    return (
        <div className={classes.root}>
            <div className={classes.container}>
                <MainContent selectedSessionIndex={selectedSessionIndex} onSelect={(index) => setSelectedSessionIndex(index)}/>
                <SideMenu selectedSessionIndex={selectedSessionIndex}/>
            </div>
        </div>
    )
}

export const MainContent: React.FC<{selectedSessionIndex: number, onSelect: (index: number) => void}> = ({selectedSessionIndex,onSelect}) => {

    
    const classes = useStyles();

    return (
        <div className={classes.mainContent}>
            <Text weight="semibold" size={900} as="h1">My Recent Sessions</Text>
            <RecentSessions selectedIndex={selectedSessionIndex} onSelect={onSelect}/>
        </div>
    )

}

function isSameDay(a: Date | number, b : Date | number) {
    return differenceInCalendarDays(a, b) === 0;
  }
export const SideMenu: React.FC<{selectedSessionIndex: number}> = ({selectedSessionIndex}) => {

    const classes = useStyles();
    const navigate = useNavigate();
    
    const now = new Date();
    const highlightedDates = [subDays(now, 5), subDays(now, 1), now]

    return (
        <div className={classes.sideMenu}>
            <Calendar tileClassName={({date, view}) => {
              
                if (view === "month" && highlightedDates.find((dDate) => isSameDay(dDate, date))) {
                    if (isSameDay(date, now)) {
                        return "highlightToday"
                    }
                    return "highlight"
                }

            }} />
            {selectedSessionIndex >= 0 ? 
            <Button onClick={() => {
                navigate("/session")

            }}>View Session</Button>: null}
        </div>
    )

}

const useRecentSessionsStyles = makeStyles({
    root: {
        display: "flex",
        flexDirection: "row",
        columnGap: "12px",
        rowGap: "12px",
        
        flexWrap: "wrap"
    },
    card: {
        width: "240px",
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
})

export const RecentSessions : React.FC<{selectedIndex: number, onSelect: (index: number) => void}> = (props) => {
    const classes = useRecentSessionsStyles();

    return <div className={classes.root}>
        <Card className={classes.card} selected={props.selectedIndex === 0 } onSelectionChange={() => props.onSelect(0)}>
            <CardPreview  className={classes.preview}>
                <img  src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR90o6Ogg-S_RXsRJefe16vkVCnsT63pEW6LCEm9JdXyIslYh7JGj-hdun5af1Fc9dSzM0&usqp=CAU"}>
                </img>
            </CardPreview>
            <CardHeader
        header={<Text weight="semibold">Barley session 24</Text>}
        description={
            <>
          <Caption1 className={classes.caption}>Date: Today</Caption1>
          <Caption1 className={classes.caption}>Started: 09:23</Caption1>
            </>
        }
      
      />
        </Card>
        <Card className={classes.card} selected={props.selectedIndex === 1 } onSelectionChange={() => props.onSelect(1)}>
            <CardPreview className={classes.preview}>
                <img  src={"https://static.country-guide.ca/wp-content/uploads/2021/03/29111534/Pest-Patrol-2021-March-II-Weed-Zapper-offers-an-alternative-solution-for-killing-weeds-weed_zapper_1-PO.jpg"}>
                </img>
            </CardPreview>
            <CardHeader
        header={<Text weight="semibold">Rye session 23</Text>}
        description={
            <>
          <Caption1 className={classes.caption}>Date: Yesterday</Caption1>
          <Caption1 className={classes.caption}>Started: 14:22</Caption1>
            </>
        }
      
      />
        </Card>
        <Card className={classes.card}  selected={props.selectedIndex === 2 } onSelectionChange={() => props.onSelect(2)}>
            <CardPreview className={classes.preview}>
                <img src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtsvb3ciLvta9l72hxtf1fyYQAuTHlrJdbsdL8-uHdrPRIjL3zAQtZ1Snd_T7kuxJd_5U&usqp=CAU"}>
                </img>
            </CardPreview>
            <CardHeader
        header={<Text weight="semibold">Barley session 22</Text>}
        description={
            <>
          <Caption1 className={classes.caption}>Date: Yesterday</Caption1>
          <Caption1 className={classes.caption}>Started: 11:22</Caption1>
            </>
        }
      
      />
        </Card>
    </div>

}