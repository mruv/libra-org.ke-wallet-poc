
export default (theme) => {

    return {
        MuiAvatar: {
            root: {
                //backgroundColor: '#e6ecf0' 
                backgroundColor: '#fff',
                color: theme.palette.secondary.light,
                borderRadius: 0
            },
            colorDefault: {
                // backgroundColor: theme.palette.grey[400],
                backgroundColor: '#fff',
                color: '#000',
            }
        }
    }
}