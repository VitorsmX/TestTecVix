import { FormControl, InputLabel, SxProps } from "@mui/material";
import { TextRob18Font2M } from "../../components/Text2M";
import { TextRob14Font1Xs } from "../../components/Text1Xs";
import { SimpleInput } from "../../components/Inputs/SimpleInput";
import { useZTheme } from "../../stores/useZTheme";

type InputFormat = "text" | "currency" | "percentage";

interface Props {
  value: string;
  onChange: (value: string) => void;
  label: string;
  placeholder?: string;
  required?: string;
  type?: string;
  disabled?: boolean;
  sx?: SxProps;
  format?: InputFormat;
}

export const LabelInputMsp = ({
  value,
  onChange,
  label,
  placeholder,
  required,
  type = "text",
  disabled = false,
  sx = {},
  format = "text",
}: Props) => {
  const { theme, mode } = useZTheme();
  const id = `input-${label.replace(/\s/g, "-").toLowerCase()}`;

  const handleChange = (val: string) => {
    // ===== REAL =====
    if (format === "currency") {
      const onlyNumbers = val.replace(/\D/g, "");
      const formatted = (Number(onlyNumbers) / 100).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });

      onChange(formatted === "R$ 0,00" ? "" : formatted);
      return;
    }

    // ===== PORCENTAGEM =====
    if (format === "percentage") {
      const onlyNumbers = val.replace(/\D/g, "");
      const num = Math.min(Number(onlyNumbers), 100);

      onChange(num ? `${num}%` : "");
      return;
    }

    // ===== TEXTO NORMAL =====
    onChange(val);
  };

  return (
    <FormControl variant="standard" sx={sx}>
      <InputLabel
        shrink
        htmlFor={id}
        sx={{ color: theme[mode].dark, display: "flex", gap: "8px" }}
      >
        <TextRob18Font2M>{label}</TextRob18Font2M>
        {required && (
          <TextRob14Font1Xs sx={{ color: theme[mode].gray }}>
            {required}
          </TextRob14Font1Xs>
        )}
      </InputLabel>

      <SimpleInput
        id={id}
        type={type}
        disabled={disabled}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        inputSx={{
          height: "48px",
          borderRadius: "12px",
        }}
      />
    </FormControl>
  );
};