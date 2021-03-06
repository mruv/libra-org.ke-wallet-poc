import { Box, CircularProgress, Typography } from "@material-ui/core"

export default ({ label }) => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            minWidth="75%"
            justifyContent="center"
            alignItems="center">
            <Box p={2}>
                <CircularProgress size={48} />
            </Box>
            <Box p={2}>
                <Typography variant="body1">{ label }</Typography>
            </Box>
        </Box >
    )
}