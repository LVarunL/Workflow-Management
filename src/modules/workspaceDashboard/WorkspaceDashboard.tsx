import React from "react";
import { Box, Paper, Card, CardActions, CardContent } from "@mui/material";
import MyButtons from "../../common/components/Buttons/Buttons";

export default function WorkspaceDashboard() {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        height: "90vh",
      }}
    >
      <Card
        sx={{
          display: "flex",
          minWidth: "50%",
          height: "50%",
          justifyContent: "space-between",
        }}
      >
        <CardContent>Projects</CardContent>
        <CardActions
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "flex-start",
          }}
        >
          <MyButtons.AddButton width={50} />
        </CardActions>
      </Card>
      <Card
        sx={{
          display: "flex",
          minWidth: "50%",
          height: "50%",
          justifyContent: "space-between",
        }}
      >
        <CardContent>Tasks</CardContent>
        <CardActions
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "flex-start",
          }}
        >
          <MyButtons.AddButton width={50} />
        </CardActions>
      </Card>
      <Card
        sx={{
          display: "flex",
          minWidth: "50%",
          height: "50%",
          justifyContent: "space-between",
        }}
      >
        <CardContent>People</CardContent>
        <CardActions
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "flex-start",
          }}
        >
          <MyButtons.AddButton width={50} />
        </CardActions>
      </Card>
      <Card
        sx={{
          display: "flex",
          minWidth: "50%",
          height: "50%",
          justifyContent: "space-between",
        }}
      >
        <CardContent>Messages</CardContent>
        <CardActions
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "flex-start",
          }}
        >
          <MyButtons.AddButton width={50} />
        </CardActions>
      </Card>
    </Box>
  );
}
