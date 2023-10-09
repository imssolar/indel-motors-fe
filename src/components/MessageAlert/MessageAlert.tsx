import { Box,Typography } from "@mui/material"
import ErrorIcon from "@mui/icons-material/Error";

interface Props {
    messageToShow: string | undefined
}

export const MessageAlert: React.FC<Props> = ({  messageToShow }) => {
    return (
        <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  width:"498.33px",
                  height:"20px",
                  mt:3,
                  mb:3
                }}
              >
                <ErrorIcon sx={{ color: "red", mr: 1 }} />
                <Typography
                  component="h6"
                  variant="h6"
                  sx={{ color: "red", fontSize: "15px", fontStyle: "italic"}}
                >
                  {messageToShow}
                </Typography>
              </Box>
    )
}