export default (theme) => ({
  '@global': {
    html: {
      fontFamily: 'Helvetica !important',
      padding: 0,
    },
    body: {
      boxSizing: 'border-box',
      backgroundColor: theme.colors[4],
    },
  },
});
