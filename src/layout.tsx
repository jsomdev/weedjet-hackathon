import { makeStyles, tokens, shorthands } from "@fluentui/react-components";
import { PropsWithChildren } from "react";


const useStyles = makeStyles({
    root: {
        backgroundColor: tokens.colorPaletteGreenBackground1,
        height: "100%",
        width: '100%',
        overflowY: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

    },
    container: {
        maxWidth: '1440px',
        width: "100%",        
        height: "100%",
        display: "flex",
        flexDirection: "row",

    },
    mainContent: {
        ...shorthands.flex(1),
         ...shorthands.padding("16px"),
        display: "flex",
        flexDirection: "column",
    },
    sideMenu: {
        display: "flex",        
        flexDirection: "column",
        alignItems: "center",
        rowGap: "32px",
        ...shorthands.padding("16px"),
        ...shorthands.margin("16px"),
        width: "320px",
        ...shorthands.borderRadius("12px"),
        boxShadow: '-5px 0px 12px rgba(0, 0, 0, 0.1)',
        backgroundColor: tokens.colorPaletteGreenBackground2
    }
})

export const Layout: React.FC<PropsWithChildren> = ({children}) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
        <div className={classes.container}>
            {children}
        </div>
    </div>
    )
}

export const MainContent: React.FC<PropsWithChildren> = ({children}) => {

    
    const classes = useStyles();

    return (
        <div className={classes.mainContent}>
           {children}
        </div>
    )

}


export const SideMenu: React.FC<PropsWithChildren> = ({children}) => {
    const classes = useStyles();   
    return (
        <div className={classes.sideMenu}>
           {children}
        </div>
    )

}