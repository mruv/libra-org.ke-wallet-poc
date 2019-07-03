export default (theme) => {

    return {
        MuiInput: {
            root: {
                height: 'auto',
                fontSize: 13,
                fontWeight: 400,
                // color: theme.palette.textPrimary,
                /*[`& .${ICON.root}, & input::placeholder`]: {
                    color: '#657786',
                    opacity: 1,
                },*/
                '&$focused': {
                    // backgroundColor: "#e6ecf0",
                    // border: `1px solid ${theme.palette.primary.main}`,
                    /*[`& input, & .${ICON.root}`]: {
                        color: theme.palette.primary.main,
                    },*/
                    color: theme.palette.primary.main
                },
            },
        },
        MuiInputAdornment: {
            positionStart: {
                margin: theme.spacing(0),
                fontSize: 12,
            },

            positionEnd: {
                margin: theme.spacing(0),
                fontSize: 12,
            }
        },
    }
}