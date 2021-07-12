import React from "react";
import { Box, Paper, Typography } from "@material-ui/core";

function PaperTitle({ title, children }) {
    return (
        <Box>
            <Typography variant="h2">{title}</Typography>
            <Paper>{children}</Paper>
        </Box>
    );
}

export default PaperTitle;
