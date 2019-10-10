const useStyles = theme => ({
  card: {
    maxWidth: 100
  },
  root: {
    width: 500,
    margin: 50
  },
  filterContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
    // alignContent: "center"
  },
  root: {
    height: 180
  },
  container: {
    display: "flex"
  },
  paper: {
    margin: theme.spacing(1)
  },
  svg: {
    width: 100,
    height: 100
  },
  polygon: {
    fill: theme.palette.common.white,
    stroke: theme.palette.divider,
    strokeWidth: 1
  }
});

export default useStyles;
