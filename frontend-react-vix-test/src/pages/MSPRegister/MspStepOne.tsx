import { LabelInputMsp } from "./LabelInputMsp";

export const MspStepOne = ({
  companyName,
  setCompanyName,
  location,
  setLocation,
  cnpj,
  setCnpj,
  phone,
  setPhone,
  sector,
  setSector,
  contactEmail,
  setContactEmail,
  minValue,
  setMinValue,
  discount,
  setDiscount,
// eslint-disable-next-line @typescript-eslint/no-explicit-any
}: any) => {
  return (
    <div>
      <div
        style={{
          width: "75%",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "24px",
        }}
      >
        <LabelInputMsp
          label="Nome da empresa"
          required="(Obrigatório)"
          value={companyName}
          onChange={setCompanyName}
          placeholder="Vituax"
        />

        <LabelInputMsp
          label="Localização"
          required="(Obrigatório)"
          value={location}
          onChange={setLocation}
          placeholder="Brasil"
        />

        <LabelInputMsp
          label="CNPJ"
          required="(Obrigatório)"
          value={cnpj}
          onChange={setCnpj}
          placeholder="00.000.000/0001-00"
        />

        <LabelInputMsp
          label="Telefone"
          value={phone}
          onChange={setPhone}
          placeholder="(00) 00000-0000"
        />

        <LabelInputMsp
          label="Setor de atuação"
          required="(Obrigatório)"
          value={sector}
          onChange={setSector}
          placeholder="Telecom"
        />

        <LabelInputMsp
          label="E-mail de contato"
          required="(Obrigatório)"
          type="email"
          value={contactEmail}
          onChange={setContactEmail}
          placeholder="contato@empresa.com"
        />
      </div>
      <hr className="my-8" />
      <div
        style={{
          width: "75%",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "24px",
        }}
      >
        <LabelInputMsp
          label="Consumo mínimo para MSP"
          required="(em R$)"
          value={minValue}
          onChange={setMinValue}
          placeholder="R$ 0,00"
          format="currency"
        />

        <LabelInputMsp
          label="Porcentagem de desconto"
          required="(%)"
          value={discount}
          onChange={setDiscount}
          placeholder="0%"
          format="percentage"
        />
      </div>
    </div>
  );
};