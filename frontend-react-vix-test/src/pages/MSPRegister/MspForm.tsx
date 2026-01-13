import { Stack, Button } from "@mui/material";
import { useState } from "react";
import { MspStepOne } from "./MspStepOne";
import { MspStepTwo } from "./MspStepTwo";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const MspForm = ({ onSubmit }: { onSubmit: (data: any) => void }) => {
  const [step, setStep] = useState(0);

  // ====== STEP 1 ======
  const [companyName, setCompanyName] = useState("");
  const [location, setLocation] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [phone, setPhone] = useState("");
  const [sector, setSector] = useState("");
  const [contactEmail, setContactEmail] = useState("");

  // ====== STEP 2 ======
  const [adminName, setAdminName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPhone, setAdminPhone] = useState("");
  const [username, setUsername] = useState("");

  const handleNext = () => setStep((s) => s + 1);
  const handleBack = () => setStep((s) => s - 1);

  const handleSubmit = () => {
    const payload = {
      company: {
        companyName,
        location,
        cnpj,
        phone,
        sector,
        contactEmail,
      },
      admin: {
        adminName,
        adminEmail,
        adminPhone,
        username,
      },
    };

    onSubmit(payload);
  };

  return (
    <Stack gap="32px">
      {step === 0 && (
        <MspStepOne
          companyName={companyName}
          setCompanyName={setCompanyName}
          location={location}
          setLocation={setLocation}
          cnpj={cnpj}
          setCnpj={setCnpj}
          phone={phone}
          setPhone={setPhone}
          sector={sector}
          setSector={setSector}
          contactEmail={contactEmail}
          setContactEmail={setContactEmail}
        />
      )}

      {step === 1 && (
        <MspStepTwo
          adminName={adminName}
          setAdminName={setAdminName}
          adminEmail={adminEmail}
          setAdminEmail={setAdminEmail}
          adminPhone={adminPhone}
          setAdminPhone={setAdminPhone}
          username={username}
          setUsername={setUsername}
        />
      )}

      {/* ====== AÇÕES ====== */}
      <Stack direction="row" gap="16px">
        {step > 0 && (
          <Button variant="outlined" onClick={handleBack}>
            Voltar
          </Button>
        )}

        {step === 0 && (
          <Button variant="contained" onClick={handleNext}>
            Continuar
          </Button>
        )}

        {step === 1 && (
          <Button variant="contained" onClick={handleSubmit}>
            Confirmar cadastro
          </Button>
        )}
      </Stack>
    </Stack>
  );
};