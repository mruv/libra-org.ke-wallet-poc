export default (theme) => {
    return {
        MuiButton: {
            root: {
                fontSize: 13, margin: theme.spacing(0),
                // padding: '3px 10px 3px 10px',
                borderRadius: 20,
                minHeight: 'auto',
            },
            label: {
                textTransform: 'none',
                //fontSize: 12,
                fontWeight: 500,
            },
            outlined: {
                // padding: '3px 10px',
            },
            outlinedPrimary: {
                borderColor: theme.palette.primary.main,
            },
            contained: {
                boxShadow: theme.shadows[0],
                '&$focusVisible': {
                    boxShadow: theme.shadows[0],
                },
                '&:active': {
                    boxShadow: theme.shadows[0],
                },
                '&$disabled': {
                    boxShadow: theme.shadows[0],
                },
            },
            containedPrimary: {
                color: theme.palette.common.white,
            },
        }
    }
}