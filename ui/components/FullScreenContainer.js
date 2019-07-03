import { Box, Container } from "@material-ui/core"

export default ({ children }) => {

    return (
        <Container maxWidth="sm">
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center">
                    {children}
            </Box>
        </Container>
    )
}