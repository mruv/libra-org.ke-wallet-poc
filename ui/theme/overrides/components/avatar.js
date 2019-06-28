
export default (theme) => {

    return {
        MuiAvatar: {
            root: {
                //backgroundColor: '#e6ecf0' 
                backgroundColor: theme.palette.grey[400],
                color: theme.palette.secondary.light,
            },
            colorDefault: {
                // backgroundColor: theme.palette.grey[400],
                backgroundColor: '#e6ecf0',
                color: theme.palette.secondary.light,
            }
        }
    }
}