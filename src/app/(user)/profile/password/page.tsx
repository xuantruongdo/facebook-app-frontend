import ChangPassword from "@/components/changePassword/profile.password";
import { Container } from "@mui/material";

const PasswordPage = () => {
  return (
    <div
      style={{
        background: "#EFEFEF",
        minHeight: "calc(100vh - 64px)",
        paddingTop: "84px",
      }}
    >
      <Container
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <ChangPassword />
      </Container>
    </div>
  );
};

export default PasswordPage;
