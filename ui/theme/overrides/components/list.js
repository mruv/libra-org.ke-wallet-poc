export default (theme) => {
    return {
        MuiListSubheader: {
            root: {
                fontSize: 19,
                fontWeight: 600,
                color: theme.palette.text.primary,
                padding: '0 15px',
                textAlign: 'left',
                lineHeight: '25px',
                borderBottom: '1px solid #e6ecf0',
            },
            gutters: {
                [theme.breakpoints.up('sm')]: {
                    padding: '8px 16px',
                    paddingLeft: 5,
                    paddingRight: 5,
                },
            },
        },
        MuiListItemText: {
            root: {
                fontSize: 12,
                padding: '8px',
            },
        },
        primary: {
            fontWeight: 600,
            lineHeight: 1.3125,
        },
        secondary: {
            lineHeight: 1.3125,
            // color: '#657786',
        },
        MuiListItem: {
            root: {
                userSelect: 'initial',
                // background: "#fff",
                '&$focusVisible': {
                    // backgroundColor: 'rgba(230, 236, 240, 0.7)',
                }
            },
            /*gutters: {
                padding: '4px 8px',
                paddingLeft: 10,
                paddingRight: 10,
                [theme.breakpoints.up('sm')]: {
                    padding: '4px 8px',
                    paddingLeft: 10,
                    paddingRight: 10,
                },
            },
            button: {
                '&:hover': {
                    backgroundColor: '#f5f8fa',
                },
            },*/
        },
        MuiList: {
            root: {
                background: "#fff",
            },
            padding: {
                paddingTop: 0,
                paddingBottom: 0,
                margin: 0
            },
        },
    }
}