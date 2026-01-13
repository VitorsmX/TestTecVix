import { LabelInputMsp } from "./LabelInputMsp";

export const MspStepTwo = ({
  adminName,
  setAdminName,
  adminEmail,
  setAdminEmail,
  adminPhone,
  setAdminPhone,
  username,
  setUsername,
// eslint-disable-next-line @typescript-eslint/no-explicit-any
}: any) => {
  return (
    <div
      style={{
        width: "75%",
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "24px",
      }}
    >
      <LabelInputMsp
        label="Nome completo"
        required="(Obrigatório)"
        value={adminName}
        onChange={setAdminName}
        placeholder="José da Silva"
      />

      <LabelInputMsp
        label="E-mail"
        required="(Obrigatório)"
        type="email"
        value={adminEmail}
        onChange={setAdminEmail}
        placeholder="jose@email.com"
      />

      <LabelInputMsp
        label="Telefone"
        value={adminPhone}
        onChange={setAdminPhone}
        placeholder="(00) 00000-0000"
      />

      <LabelInputMsp
        label="Nome de usuário"
        value={username}
        onChange={setUsername}
        placeholder="jose.silva"
      />
    </div>
  );
};