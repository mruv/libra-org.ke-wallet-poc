import { Box, Typography, Button } from "@material-ui/core"
import { DoneOutlineOutlined, ErrorOutlineOutlined } from "@material-ui/icons"

export default ({ isSuccess, onGoBack }) => {
    return (
        <Box
            display="flex" flexDirection="column" minWidth="75%"
            justifyContent="center" alignItems="center">
            <Box p={2}>
                {isSuccess ? <DoneOutlineOutlined fontSize="large" color="primary" /> :
                    <ErrorOutlineOutlined fontSize="large" color="secondary" />}
            </Box>
            <Box p={2}>
                <Typography variant="body1">
                    {isSuccess ? "Transfer successful." : "Transfer failed."}
                </Typography>
            </Box>
            <Box p={2}>
                <Button fullWidth size="large" variant="outlined" color="primary" onClick={onGoBack}>
                    Back
                </Button>
            </Box>
        </Box>
    )
}