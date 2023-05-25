import { makeStyles, shorthands, tokens } from "@fluentui/react-components"


const useStyles = makeStyles({
    root: {
        backgroundColor: tokens.colorSubtleBackground,
        height: "100vh",
        width: '100vw'

    },
    container: {
        width: '1440px',
        height: "80%",
        ...shorthands.margin("auto")
    }
})

export const Dashboard: React.FC = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.container}>
                Hello world
            </div>
        </div>
    )
}