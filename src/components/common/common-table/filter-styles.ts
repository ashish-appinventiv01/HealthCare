const commonFilterStyles = {
  filterWrapper: {
    maxWidth: 'min-content'
  },
  modalHeading: {
    textAlign: 'center',
    borderTopLeftRadius: '8px',
    borderTopRightRadius: '8px',
    padding: '0.875rem',
    backgroundColor: '#DDE0D7',
    position: 'relative'
  },
  formWrapper: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '10px',
    padding: '1.25rem'
  },
  iconColor: { color: 'fff' },
  paper: {
    width: 'fit-content',
    marginTop: '4px',
    borderRadius: '4px'
  },
  heading: {
    color: '#000'
  },
  filterLabel: {
    display: 'inline-block',
    textAlign: 'start',
    color: '#000',
    fontWeight: '500',
    marginBottom: '10px'
  },
  actionButtons: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '1.25rem',
    columnGap: '1rem',
    paddingTop: '0px'
  }
};
export default commonFilterStyles;
