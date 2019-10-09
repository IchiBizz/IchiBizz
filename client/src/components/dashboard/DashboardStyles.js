import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  },
  requesterRoot: {
    flexGrow: 1,
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto",
    maxWidth: 500,
    margin: "2%",
    padding: "2%"
  },
  table: {
    minWidth: 700
  },
  fab: {
    margin: theme.spacing(1)
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  },
  requesterContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap"
  }
}));

export default useStyles;
